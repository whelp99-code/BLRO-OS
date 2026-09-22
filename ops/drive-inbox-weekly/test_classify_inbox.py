#!/usr/bin/env python3
"""Unit tests for the dry-run 00_INBOX classifier."""

from __future__ import annotations

import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

import classify_inbox

HERE = Path(__file__).resolve().parent
FIXTURES = HERE / "fixtures"


class ClassifyInboxTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.protocol = classify_inbox.load_protocol()
        cls.catalog = json.loads((FIXTURES / "catalog.json").read_text(encoding="utf-8"))
        cls.manifest = json.loads((FIXTURES / "manifest.json").read_text(encoding="utf-8"))
        cls.report = classify_inbox.classify_manifest(
            cls.manifest, cls.catalog, cls.protocol
        )
        cls.by_id = {row["id"]: row for row in cls.report["proposals"]}

    def test_unique_project_is_bucket_a(self):
        row = self.by_id["a1"]
        self.assertEqual(row["bucket"], "A")
        self.assertEqual(row["destinationRoot"], "01_PROJECTS")
        self.assertEqual(row["destinationFolder"], "2026_Example_Alpha")
        self.assertEqual(row["action"], "propose-move")

    def test_unique_area_is_bucket_b(self):
        row = self.by_id["b1"]
        self.assertEqual(row["bucket"], "B")
        self.assertEqual(row["destinationRoot"], "02_AREAS")
        self.assertEqual(row["destinationFolder"], "Finance_Accounting")

    def test_installer_is_bucket_c(self):
        row = self.by_id["c1"]
        self.assertEqual(row["bucket"], "C")
        self.assertEqual(row["destinationRoot"], "04_INFRA_IMAGES")
        self.assertIsNone(row["destinationFolder"])

    def test_os_junk_is_blocked_trash_proposal(self):
        for file_id in ("d1", "d2"):
            row = self.by_id[file_id]
            self.assertEqual(row["bucket"], "D")
            self.assertEqual(row["action"], "propose-trash-blocked")
            self.assertIsNone(row["destinationRoot"])

    def test_ambiguous_and_unmatched_stay_unknown(self):
        reasons = {
            "e1": "multiple project matches",
            "e2": "no unique protocol destination",
            "e3": "no unique protocol destination",
            "e4": "no unique protocol destination",
            "e5": "no unique protocol destination",
        }
        for file_id, prefix in reasons.items():
            row = self.by_id[file_id]
            self.assertEqual(row["bucket"], "E", file_id)
            self.assertEqual(row["destinationRoot"], "00_INBOX", file_id)
            self.assertTrue(row["reason"].startswith(prefix), row["reason"])

    def test_partial_area_token_does_not_match(self):
        self.assertNotIn("Sales_Operations", self.by_id["e4"]["reason"])

    def test_counts_and_unknown_list(self):
        self.assertEqual(self.report["counts"], {"A": 1, "B": 1, "C": 1, "D": 2, "E": 5})
        unknown_ids = [row["id"] for row in self.report["unknown"]]
        self.assertEqual(unknown_ids, ["e1", "e2", "e3", "e4", "e5"])

    def test_dry_run_counters_stay_zero(self):
        self.assertEqual(self.report["mode"], "dry-run")
        self.assertEqual(self.report["owner"], "Cursor")
        self.assertEqual(self.report["executedMoves"], 0)
        self.assertEqual(self.report["executedDeletes"], 0)
        self.assertEqual(self.report["emailsSent"], 0)

    def test_summary_lists_unknown_only(self):
        summary = classify_inbox.format_summary(self.report)
        self.assertIn("counts: A=1 B=1 C=1 D=2 E=5", summary)
        self.assertIn("random-scan.pdf", summary)
        self.assertNotIn("notes_2026_Example_Alpha.pdf", summary)
        self.assertIn("moves=0", summary)
        self.assertIn("emails=0", summary)

    def test_general_and_dotfolders_are_not_auto_matched(self):
        item = {"id": "x", "name": "notes__General.pdf"}
        row = classify_inbox.classify_item(item, self.catalog, self.protocol)
        self.assertEqual(row["bucket"], "E")
        hidden = {"id": "y", "name": "cache_.hermes.txt"}
        row = classify_inbox.classify_item(hidden, self.catalog, self.protocol)
        self.assertEqual(row["bucket"], "E")

    def test_apply_is_refused_and_writes_nothing(self):
        with tempfile.TemporaryDirectory() as tmp:
            out = Path(tmp) / "proposal.json"
            completed = subprocess.run(
                [
                    sys.executable,
                    str(HERE / "classify_inbox.py"),
                    "--manifest",
                    str(FIXTURES / "manifest.json"),
                    "--catalog",
                    str(FIXTURES / "catalog.json"),
                    "--out",
                    str(out),
                    "--apply",
                ],
                check=False,
                capture_output=True,
                text=True,
            )
            self.assertEqual(completed.returncode, 2)
            self.assertIn("refused", completed.stderr)
            self.assertFalse(out.exists())
            self.assertEqual(completed.stdout, "")


if __name__ == "__main__":
    unittest.main()
