# P1 Command Center Briefing Spec

**5 fields** returned by `GET /api/command/briefing`:

| Field | Source | Widget link |
|-------|--------|-------------|
| `mail` | mail-intelligence `/api/outlook/status` | `/mail` |
| `approvals` | `ApprovalItem` PENDING count | `/approvals` |
| `projects` | open `Project` count | `/command` |
| `cfo` | CFO-AIOS `/api/health` | `/finance` |
| `sangfor` | sangfor-mcp `/api/system/health` | `/sangfor` |

SSE: `GET /api/command/briefing/stream` — 15s interval refresh.
