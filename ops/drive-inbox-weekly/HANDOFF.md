# Weekly Cursor handoff — Drive 00_INBOX residual classification

Owner: Cursor. Account: jm.park830202@gmail.com. Protocol: Drive Protocol v1.0.

Run this once per week at Monday 10:00 Asia/Seoul. Read Drive. Propose buckets. Stop.

## Prompt

You are Cursor, owner of the weekly Drive 00_INBOX residual classification. Account `jm.park830202@gmail.com`. Drive Protocol v1.0. Folder ids are in `ops/drive-inbox-weekly/protocol.json`.

1. Read only. List child folder names of `01_PROJECTS` and `02_AREAS`. Build a catalog JSON: `{"projects":[{"name":"...","autoMatch":true}],"areas":["..."]}`. Set `autoMatch` false for `_General` and for any name that starts with `.`. Do not add a project or area that is not in that listing.
2. Read only. List direct children of `00_INBOX` (`10ebaHUsXCwjt_I9siN7UanViD0CnPioA`). Write a manifest JSON: `{"items":[{"id":"...","name":"...","mimeType":"..."}]}`. Names and ids only. Do not download file bodies.
3. Run, from the repo root:

```bash
python3 ops/drive-inbox-weekly/classify_inbox.py \
  --manifest /tmp/inbox-manifest.json \
  --catalog /tmp/inbox-catalog.json \
  --out /tmp/inbox-proposal.json
```

4. Report the stdout summary only: counts for A B C D E, then the UNKNOWN list (bucket E) for 재민 to confirm.
5. Leave every file where it is. Bucket D is a blocked trash proposal. Buckets A, B, and C are move proposals. Bucket E stays in `00_INBOX`.

Do not call trash, delete, update/move, share, or any mail send. Do not pass `--apply`. Do not invent a project folder when the file name matches zero or several catalog names. Do not auto-propose `03_RESOURCES` or `05_ARCHIVES`.

`inbox-triage-batches.md` was not in this repo. Do not reconstruct the 2026-09-17 file list. Historical context only: 81 items; A/B partially moved; D trash 8 stayed blocked; C installers 6 were proposed for `04_INFRA_IMAGES`; E 35 stayed in INBOX.
