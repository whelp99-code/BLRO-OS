# W2 — P1 Command Center (1/2)

> **Phase:** P1 · **게이트:** 브리핑 spec v2 · AppShell 12항 중 8항

## 목표

대표가 매일 보는 **업무 브리핑** — health 문자열이 아닌 MailItem·Approval·Project 실데이터.

## Follow-up PR

`cursor/command-v2-real-briefing` (main 기준)

## 티켓

| ID | 작업 | Verification | Done |
|----|------|--------------|:----:|
| P1-PM-001 | 브리핑 5필드 확정 | [spec v2](../p1-command-center-briefing-spec.md) | 🟡 |
| P1-ENG-001 | AppShell 전면 이식 | build | 🟡 |
| P1-ENG-002 | `/mail`·`/sangfor` same-tab AppShell | 37 #7,11 | ☐ |
| P1-ENG-003 | briefing 실데이터 | DB 조회 | 🟡 |
| P1-ENG-004 | SSE | EventSource | ✅ |

## 구현 체크리스트

- [ ] `(shell)/layout.tsx` — `/mail`, `/sangfor`, `/settings` 흡수
- [ ] `buildBriefing()` — urgent mail top 5, pending approvals 상세
- [ ] legacy `/dashboard` → `/command` redirect
- [ ] `p1-command-center-briefing-spec.md` v2 대표 서명

## 검증

```bash
curl -s localhost:3110/api/command/briefing | jq .
open http://localhost:3110/command
```
