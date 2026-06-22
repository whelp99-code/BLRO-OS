# W5 — P2 Data Plane (2/3)

> **Phase:** P2 · **게이트:** mail hook E2E · Project 후보 1건

## Follow-up PR

`cursor/data-plane-ops`

## 티켓

| ID | 작업 | Done |
|----|------|:----:|
| P2-ENG-005 | mail-intelligence hook | 🟡 |
| P2-ENG-006 | Project 후보 job | 🟡 |
| P2-ENG-008 | from-mail API | 🟡 |
| P2-PM-003 | dedup 정책 | 🟡 |
| P2-SAL-002 | Customer seed 3 | ☐ |

## 구현

- [ ] `mail-intelligence` 재기동 — `/api/hooks/data-plane`
- [ ] `POST /api/projects/from-mail` 실메일 fixture
- [ ] dedup: `organizationId` + `name` 정책 문서화
- [ ] Customer seed 3건 (`scripts/seed-c-stack.mjs`)

## 검증

```bash
curl -X POST localhost:3010/api/fixtures/ingest-mail -H 'Content-Type: application/json' -d '{"subject":"W5 test"}'
```
