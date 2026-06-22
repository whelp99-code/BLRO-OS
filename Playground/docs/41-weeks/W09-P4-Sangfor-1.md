# W9 — P4 Sangfor (1/2)

> **Phase:** P4 · **게이트:** `/sangfor` AppShell same-tab

## Follow-up PR

`cursor/sangfor-appshell`

## 티켓

| ID | 작업 | Done |
|----|------|:----:|
| P4-ENG-001 | /sangfor BFF :3500 | 🟡 |
| P4-ENG-002 | sangfor-adapter | 🟡 |
| P4-ENG-004 | Device Bronze ingest | 🟡 |

## 구현

- [ ] `/sangfor` → `(shell)` layout 하위 이동
- [ ] BFF routes 정리 (중복 제거)
- [ ] `POST /api/sangfor/device/ingest` 운영 검증

## 검증

```bash
open http://localhost:3110/sangfor  # AppShell 내 동일 탭
curl -X POST localhost:3110/api/sangfor/device/ingest -H 'Content-Type: application/json' -d '{"serialNumber":"SN1"}'
```
