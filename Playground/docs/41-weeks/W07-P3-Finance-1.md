# W7 — P3 재무 (1/2)

> **Phase:** P3 · **게이트:** `/finance` 실 KPI

## Follow-up PR

`cursor/finance-ui-v2`

## 머지 PR (스캐폴딩)

AIOSv2 #5 → main — `/api/cfo/*`, `/finance` 스텁

## 티켓

| ID | 작업 | Done |
|----|------|:----:|
| P3-FIN-001 | tax/invoice 분류 문서 | ☐ |
| P3-ENG-001 | CFO BFF KPI | 🟡 |
| P3-ENG-003 | /finance UI 실화 | 🟡 |
| P3-PM-001 | Finance 위젯 검수 | ☐ |

## 구현

- [ ] CFO-AIOS 실 KPI endpoint 연동 (mock 제거)
- [ ] Invoice draft 리스트 UI
- [ ] read-only until COST_ACTION 배너

## 검증

```bash
curl -s localhost:3110/api/cfo/health
open http://localhost:3110/finance
```
