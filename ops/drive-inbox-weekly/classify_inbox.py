#!/usr/bin/env python3
"""Dry-run residual classifier for Google Drive 00_INBOX.

Drive Protocol v1.0. This tool proposes buckets and destinations.
It does not move, trash, delete, or send email. --apply is refused.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

BUCKETS = ("A", "B", "C", "D", "E")

INSTALLER_EXTENSIONS = {
    ".iso",
    ".dmg",
    ".exe",
    ".msi",
    ".msix",
    ".pkg",
    ".deb",
    ".rpm",
    ".ova",
    ".ovf",
    ".vmdk",
    ".qcow2",
    ".vhd",
    ".vhdx",
    ".wim",
}

JUNK_NAMES = {".ds_store", "thumbs.db", "desktop.ini"}
JUNK_EXTENSIONS = {".crdownload", ".tmp", ".partial"}
SEPARATORS = set(" _-.[ ]()（）/+&")
MIN_FOLDER_LEN = 4

HERE = Path(__file__).resolve().parent


def load_json(path: Path) -> dict:
    with path.open(encoding="utf-8") as handle:
        data = json.load(handle)
    if not isinstance(data, dict):
        raise SystemExit(f"{path} must be a JSON object")
    return data


def load_protocol() -> dict:
    return load_json(HERE / "protocol.json")


def folder_entries(catalog: dict, key: str) -> list[dict]:
    entries = catalog.get(key, [])
    if not isinstance(entries, list):
        raise SystemExit(f"catalog.{key} must be a list")
    normalized = []
    for entry in entries:
        if isinstance(entry, str):
            normalized.append({"name": entry, "autoMatch": True})
        elif isinstance(entry, dict) and isinstance(entry.get("name"), str):
            normalized.append(
                {
                    "name": entry["name"],
                    "autoMatch": bool(entry.get("autoMatch", True)),
                }
            )
        else:
            raise SystemExit(f"catalog.{key} entries must be strings or {{name}} objects")
    return normalized


def eligible(entry: dict) -> bool:
    name = entry["name"].strip()
    if not entry.get("autoMatch", True):
        return False
    if name.startswith(".") or name == "_General":
        return False
    return len(name) >= MIN_FOLDER_LEN


def contains_bounded(filename: str, folder_name: str) -> bool:
    haystack = filename.casefold()
    needle = folder_name.casefold().strip()
    if len(needle) < MIN_FOLDER_LEN:
        return False
    start = 0
    while True:
        index = haystack.find(needle, start)
        if index < 0:
            return False
        before_ok = index == 0 or haystack[index - 1] in SEPARATORS
        end = index + len(needle)
        after_ok = end == len(haystack) or haystack[end] in SEPARATORS
        if before_ok and after_ok:
            return True
        start = index + 1


def unique_match(filename: str, entries: list[dict]) -> tuple[dict | None, list[str]]:
    hits = [
        entry
        for entry in entries
        if eligible(entry) and contains_bounded(filename, entry["name"])
    ]
    names = [entry["name"] for entry in hits]
    if len(hits) == 1:
        return hits[0], names
    return None, names


def suffix_of(name: str) -> str:
    dot = name.rfind(".")
    if dot <= 0:
        return ""
    return name[dot:].casefold()


def classify_item(item: dict, catalog: dict, protocol: dict) -> dict:
    name = str(item.get("name") or "").strip()
    file_id = str(item.get("id") or "")
    projects = folder_entries(catalog, "projects")
    areas = folder_entries(catalog, "areas")
    roots = set(protocol.get("roots", {}))

    if not name:
        return proposal(file_id, name, "E", "keep", "00_INBOX", None, "missing name")

    if name in roots:
        return proposal(
            file_id,
            name,
            "E",
            "keep",
            "00_INBOX",
            None,
            "protocol root name is not a residual destination",
        )

    folded = name.casefold()
    if folded in JUNK_NAMES or folded.startswith("~$") or suffix_of(name) in JUNK_EXTENSIONS:
        return proposal(
            file_id,
            name,
            "D",
            "propose-trash-blocked",
            None,
            None,
            "os junk; trash stays blocked",
        )

    if suffix_of(name) in INSTALLER_EXTENSIONS:
        return proposal(
            file_id,
            name,
            "C",
            "propose-move",
            "04_INFRA_IMAGES",
            None,
            "installer or virtual-disk extension",
        )

    project, project_hits = unique_match(name, projects)
    if len(project_hits) > 1:
        joined = ", ".join(project_hits)
        return proposal(
            file_id,
            name,
            "E",
            "keep",
            "00_INBOX",
            None,
            f"multiple project matches: {joined}",
        )
    if project is not None:
        return proposal(
            file_id,
            name,
            "A",
            "propose-move",
            "01_PROJECTS",
            project["name"],
            "unique project folder name",
        )

    area, area_hits = unique_match(name, areas)
    if len(area_hits) > 1:
        joined = ", ".join(area_hits)
        return proposal(
            file_id,
            name,
            "E",
            "keep",
            "00_INBOX",
            None,
            f"multiple area matches: {joined}",
        )
    if area is not None:
        return proposal(
            file_id,
            name,
            "B",
            "propose-move",
            "02_AREAS",
            area["name"],
            "unique area folder name",
        )

    return proposal(
        file_id,
        name,
        "E",
        "keep",
        "00_INBOX",
        None,
        "no unique protocol destination",
    )


def proposal(file_id, name, bucket, action, root, folder, reason) -> dict:
    return {
        "id": file_id,
        "name": name,
        "bucket": bucket,
        "action": action,
        "destinationRoot": root,
        "destinationFolder": folder,
        "reason": reason,
    }


def classify_manifest(manifest: dict, catalog: dict, protocol: dict | None = None) -> dict:
    protocol = protocol or load_protocol()
    items = manifest.get("items", [])
    if not isinstance(items, list):
        raise SystemExit("manifest.items must be a list")
    proposals = [classify_item(item, catalog, protocol) for item in items]
    counts = {bucket: 0 for bucket in BUCKETS}
    for row in proposals:
        counts[row["bucket"]] += 1
    unknown = [
        {"id": row["id"], "name": row["name"], "reason": row["reason"]}
        for row in proposals
        if row["bucket"] == "E"
    ]
    return {
        "mode": "dry-run",
        "owner": "Cursor",
        "protocol": protocol.get("protocol", "Drive Protocol v1.0"),
        "account": protocol.get("account", ""),
        "counts": counts,
        "unknown": unknown,
        "executedMoves": 0,
        "executedDeletes": 0,
        "emailsSent": 0,
        "proposals": proposals,
    }


def format_summary(report: dict) -> str:
    counts = report["counts"]
    count_line = " ".join(f"{bucket}={counts[bucket]}" for bucket in BUCKETS)
    lines = [
        "Drive 00_INBOX weekly classification (dry-run)",
        "owner: Cursor",
        f"protocol: {report['protocol']}",
        f"counts: {count_line}",
        "UNKNOWN (keep in 00_INBOX; 재민 confirmation required):",
    ]
    if report["unknown"]:
        for row in report["unknown"]:
            label = row["name"] or "(unnamed)"
            lines.append(f"- {label} — {row['reason']}")
    else:
        lines.append("- none")
    lines.append(
        f"executed: moves={report['executedMoves']} deletes={report['executedDeletes']} emails={report['emailsSent']}"
    )
    return "\n".join(lines) + "\n"


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Propose Drive 00_INBOX buckets. Dry-run only."
    )
    parser.add_argument("--manifest", required=True, type=Path, help="Inbox item JSON")
    parser.add_argument("--catalog", required=True, type=Path, help="Allowlisted folder JSON")
    parser.add_argument("--out", type=Path, help="Write the full proposal JSON here")
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Refused. Live moves, trash, deletes, and email stay disabled.",
    )
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(sys.argv[1:] if argv is None else argv)
    if args.apply:
        print(
            "refused: apply is disabled. This job stays dry-run "
            "(no moves, trash, deletes, or email).",
            file=sys.stderr,
        )
        return 2
    manifest = load_json(args.manifest)
    catalog = load_json(args.catalog)
    report = classify_manifest(manifest, catalog, load_protocol())
    summary = format_summary(report)
    sys.stdout.write(summary)
    if args.out:
        args.out.write_text(
            json.dumps(report, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
