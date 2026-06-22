# W8 — P3 재무 (2/2)

> **Phase:** P3 · **게이트:** E2E 시나리오 4

## 티켓

| ID | 작업 | Done |
|----|------|:----:|
| P3-ENG-002 | mail→CFO draft | 🟡 |
| P3-FIN-002 | COST_ACTION UAT | 🟡 |

## E2E 시나리오 4

1. `/finance` KPI 로드
2. Invoice draft 생성 (read-only)
3. COST_ACTION 승인 → 등록

## 검증

```bash
node Playground/scripts/e2e-scenarios.mjs  # scenario-4
```
