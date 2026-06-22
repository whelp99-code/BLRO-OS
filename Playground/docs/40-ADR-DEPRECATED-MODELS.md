# ADR-040: Deprecated Legacy Models (M3)

**Status:** Accepted  
**Date:** 2026-06-22  
**Context:** C-1a BLRO schema is SSOT on `blro_operating_os` @ `:5435`.

## Deprecated (do not use in new code)

| Legacy (AIOS v1 portal) | BLRO replacement |
|-------------------------|------------------|
| `Project.userId` | `Project.organizationId` + `OrganizationMember` |
| `Project.priority` | `Project.opportunity`, `Project.riskLevel` |
| `Partner` | `Customer` with `CustomerStatus.PARTNER` |
| `Result` | `ExecutionRun` |
| `Task.assignee`, `Task.completedAt` | `Task.status`, `ExecutionRun` |
| `migrate-v1.ts` data scripts | Greenfield seed only |

## Application changes (M3)

- `apps/web/.env.local` → `DATABASE_URL` on `:5435`
- `prisma-queries.ts` → organization-scoped queries
- `RESULT_SAFE_SELECT` → alias of `EXECUTION_RUN_SAFE_SELECT`

## Migration policy

No data migration from portal `:5434`. CFO additive merge is P6-only.
