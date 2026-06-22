# W11 — P5 영업·프리세일즈

> **Phase:** P5 · **게이트:** UAT 3 시나리오

## Follow-up PR

`cursor/presales-desk-v1`

## 티켓

전량 → [41-티켓-전량-상세 §P5](../41-티켓-전량-상세.md#p5--w11)

## UAT 시나리오 (3)

| # | 시나리오 | 기대 |
|---|----------|------|
| 1 | 메일 신호 → 기회 HIGH | presales 위젯 표시 |
| 2 | Proposal Desk 템플릿 선택 | 5종 중 1건 draft |
| 3 | Partner(Customer) CRUD | 5건 seed |

## 검증

```bash
open http://localhost:3110/presales
curl -s localhost:3110/api/presales/opportunities | jq .
```
