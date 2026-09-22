# Drive 00_INBOX weekly classification

Read-only residual classification for Google Drive folder `00_INBOX` (Drive Protocol v1.0, account `jm.park830202@gmail.com`). The job proposes a bucket for each direct child. It does not change Drive.

## Schedule

Monday 10:00 Asia/Seoul.

This repo had no earlier weekly cadence. GitHub Actions cron is UTC, so the workflow uses `0 1 * * 1` (Monday 01:00 UTC = Monday 10:00 KST, UTC+9, no daylight-saving shift). `workflow_dispatch` runs the same dry-run on demand.

GitHub runs that cron from the repository default branch after this file is merged. Until then, the weekly owner path is the Cursor handoff in `HANDOFF.md`.

## Owner

Cursor.

This job is not a 윤비서 run and not a direct weekly file pass. 재민 (Jae Min Park) assigned the weekly auto job to Cursor.

## Forbidden actions

The classifier and the weekly run stay inside these limits:

- Propose and tag only. `--apply` exits with an error and writes nothing.
- No external email.
- No trash, no delete, and no irreversible delete. Bucket D is recorded as `propose-trash-blocked` and is not executed.
- No live moves. A, B, and C rows are proposals in the JSON artifact.
- No invented project mappings. A project or area is proposed only when the full catalog folder name appears once, bounded by a separator or the ends of the file name. `_General` and names that start with `.` are excluded. `03_RESOURCES` and `05_ARCHIVES` are never auto-proposed.

## UNKNOWN policy

Ambiguous residuals are bucket E. They stay in `00_INBOX`. The weekly stdout lists each one with the reason, for 재민 to confirm. Zero matches and several matches are both UNKNOWN. Copies, photos, zip archives, and `.img` files are UNKNOWN. Installer and virtual-disk extensions (`.exe`, `.msi`, `.iso`, `.dmg`, `.ova`, `.vmdk`, and the rest listed in `classify_inbox.py`) are bucket C, proposed for `04_INFRA_IMAGES`.

## Buckets

| Bucket | Meaning | Proposal |
| --- | --- | --- |
| A | Unique `01_PROJECTS` folder name | Propose move under that folder |
| B | Unique `02_AREAS` folder name | Propose move under that folder |
| C | Installer or virtual-disk file | Propose `04_INFRA_IMAGES` |
| D | OS junk (`.DS_Store`, `Thumbs.db`, `desktop.ini`, `~$` lock files, `.crdownload`, `.tmp`, `.partial`) | Propose trash, execution blocked |
| E | UNKNOWN | Keep in `00_INBOX` |

Protocol roots and folder ids are in `protocol.json`. Area names there were read from Drive. Project names are not stored in this repo; each run builds them from a read-only folder listing.

## Dry-run

```bash
python3 ops/drive-inbox-weekly/classify_inbox.py \
  --manifest ops/drive-inbox-weekly/fixtures/manifest.json \
  --catalog ops/drive-inbox-weekly/fixtures/catalog.json \
  --out /tmp/inbox-proposal.json

python3 ops/drive-inbox-weekly/test_classify_inbox.py
```

Stdout is the short summary (counts, then the UNKNOWN list). `--out` is the proposal record. The fixture catalog uses synthetic project names so the weekly check does not freeze a customer mapping.

The live weekly prompt is `HANDOFF.md`.
