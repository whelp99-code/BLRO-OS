# Bronze / Silver / Gold — Data Plane (P2)

| Layer | Purpose | Storage |
|-------|---------|---------|
| Bronze | Raw ingest (email, device, invoice…) | Redis stream + optional JSON |
| Silver | Normalized fields per yaml schema | Pipeline memory |
| Gold | Business projection (`Project`, etc.) | BLRO Prisma models |

## 5 YAML entities

`email`, `project`, `device`, `invoice`, `payment` — see `packages/data-plane/schemas/`.

## Mail → Project dedup

- Key: `organizationId` + normalized `project.name` (from subject)
- Duplicate returns `{ duplicate: true, policy: 'name-match-dedup' }`
