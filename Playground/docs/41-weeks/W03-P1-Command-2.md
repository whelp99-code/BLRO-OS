# W3 — P1 Command Center (2/2)

> **Phase:** P1 · **게이트:** E2E 시나리오 1·3

## 목표

승인 게이트 UAT, 09:00 루틴 1주 시행, P1 PM 서명.

## 티켓

| ID | 작업 | Verification | Done |
|----|------|--------------|:----:|
| P1-ENG-005 | SEND_EMAIL·COST_ACTION 게이트 | 409 → approve → 200/502 | 🟡 |
| P1-PM-002 | 09:00 루틴 | 1주 시행 | ☐ |
| P1-PM-003 | P1 UAT | 대표 서명 | ☐ |

## E2E

```bash
node Playground/scripts/e2e-scenarios.mjs
# scenario-1, scenario-3 PASS
```

## 산출

- [p1-daily-routine.md](../p1-daily-routine.md) 서명본
- P1 버그 리스트 (Notion/이슈)

## W4 handoff

- Data Plane 워크숍 일정
- 5 yaml 운영 합의
