# CFO DB Merge (P6) — Additive Plan

**Policy:** additive only into `blro_operating_os` @ `:5435`. No destructive changes.

## Scope

1. Import CFO-AIOS Prisma models as `Cfo*` prefix where names collide
2. Read-only BFF gate until `COST_ACTION` approved
3. Migration: `packages/db/prisma/migrations/*_p6_cfo_additive/` (manual review)

## Verification

- `pnpm --filter @aios/db db:migrate deploy`
- `/finance` loads via `/api/cfo/health`
- E2E scenario 4 pass
