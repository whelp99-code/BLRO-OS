# C-Stack Runbook

## Start

```bash
docker compose -f docker-compose.c-stack.yml up -d
cd AIOSv2_integration && pnpm integration:stack
node scripts/c-stack-health.mjs
```

## Ports

| Service | Port |
|---------|------|
| Hub (web) | 3110 |
| Postgres | 5435 |
| Redis | 6382 |
| Mail | 3010 |
| CFO | 4100 |
| Sangfor MCP | 3500 |

## Rollback

```bash
cd AIOSv2_integration && pnpm integration:stack:stop
docker compose -f docker-compose.c-stack.yml down
```

Re-start should recover within 5 minutes.

## Approval gate

- `MAIL_SEND_KILL_SWITCH=1` — unapproved mail send returns 409 via `/api/mail/send`
- Resolve at `/approvals`

## E2E

```bash
node scripts/e2e-scenarios.mjs
```
