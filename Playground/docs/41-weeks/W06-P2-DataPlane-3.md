# W6 — P2 Data Plane (3/3)

> **Phase:** P2 · **Week:** W6 · **기간:** 1주 (D1–D5)  
> **게이트:** E2E 시나리오 2 전체 Pass · Silver→Gold 승인 UI · 중복 메일 UAT  
> **현재 Done:** **미착수** — W5 hook·from-mail 선행  
> **진입점:** `http://localhost:3110/command` (후보 검토 UI 추가)  
> **기준 커밋:** BLRO-OS `main` · AIOSv2 `c994213` + W5 merge

---

## 1. 개요

### 주간 목표

P2 Data Plane **마무리**. 영업·운영PM이 Project 후보를 검토·승인(Silver→Gold)하는 UI, Project 상태 API, 중복 메일 재수신 UAT로 시나리오 2 step 3–4를 완료한다.

### CEO 성공 항목 (이번 주 연관)

| # | 항목 | W6 역할 |
|---|------|---------|
| 3 | 메일→Project 후보 | 시나리오 2 전체 Pass |
| 8 | E2E 1–3 (2번) | 시나리오 2 완료 |

### 핵심 산출

- Silver→Gold 승인 UI (후보 검토 페이지)
- Project 상태 API (`PENDING` → `APPROVED` → Gold)
- 중복 메일 재수신 dedup UAT 기록
- CEO #3 충족

---

## 2. 게이트 (Exit Criteria)

| # | 기준 | 측정 방법 | Pass |
|---|------|-----------|:----:|
| G1 | 시나리오 2 전체 | [36-E2E](../36-E2E-SCENARIO-001.md) step 1–4 | ☐ |
| G2 | 승인 UI | 후보 1건 승인 → Gold Project | ☐ |
| G3 | Project API | status PATCH/GET | ☐ |
| G4 | Dedup UAT | 중복 메일 → duplicate, no new row | ☐ |
| G5 | Redis stream | 전 과정 event trace | ☐ |
| G6 | Build | `pnpm build` green | ☐ |

**Exit:** G1–G6 Pass → W7 P3 Finance 착수.

---

## 3. 선행 조건

| 항목 | 출처 | 상태 |
|------|------|:----:|
| W5 게이트 | [W05-P2-DataPlane-2](W05-P2-DataPlane-2.md) | ☐ |
| `data-plane-ops` merged | W5 PR | ☐ |
| Project 후보 1건+ | P2-ENG-006 | ☐ |
| dedup 정책 | P2-PM-003 | 🟡 |
| P1 승인 게이트 | W3 | ☐ |

---

## 4. PR·브랜치

### W5에서 머지 예정

| Repo | 브랜치 | 범위 | 상태 |
|------|--------|------|:----:|
| AIOSv2 | `cursor/data-plane-ops` | hook·from-mail·dedup | W5 merge |

### W6 작업

| 범위 | 내용 |
|------|------|
| 후보 검토 UI | command 또는 `/projects/candidates` |
| Project status API | P2-ENG-007 |
| UAT 기록 | 운영PM·영업 |

```bash
cd /Users/jmpark/Playground/AIOSv2_integration
git checkout -b cursor/data-plane-gold-ui main
```

---

## 5. 티켓 상세

| ID | 담당 | 협업 | 작업 | 산출 | Verification | Done |
|----|------|------|------|------|--------------|:----:|
| P2-ENG-007 | 엔지니어 | 운영PM | Project 상태 API | GET/PATCH `/api/projects` | API test | ☐ |
| P2-PM-003 | 운영PM | 영업 | 중복 메일 UAT | UAT 로그 | 시나리오 2-4 | 🟡 |
| P2-ENG-006 | 엔지니어 | 운영PM | 후보→Gold 승인 flow | UI + service | step 3 pass | 🟡 |

### 시나리오 2 (전체)

| Step | 액터 | 액션 | 기대 | Done |
|------|------|------|------|:----:|
| 1 | 운영PM | 테스트 메일 1건 | Bronze ingest | ☐ |
| 2 | 시스템 | data-plane-hook | Project 후보 1건 | ☐ |
| 3 | 영업 | 후보 검토·승인 | Silver → Gold | ☐ |
| 4 | 운영PM | 중복 메일 재수신 | dedup 적용 | ☐ |

---

## 6. 일일 실행 (D1–D5)

### D1 — Project API·상태 머신

```bash
cd /Users/jmpark/Playground/AIOSv2_integration
find apps/web/src/app/api -name '*project*'
cat packages/data-plane/src/gold/project-from-mail.ts

# API 스캐폴딩
curl -s http://127.0.0.1:3110/api/projects 2>/dev/null | jq . || echo "route TBD"
```

- P2-ENG-007: `PENDING` | `APPROVED` | `REJECTED` 상태
- Gold projection on APPROVED

### D2 — 후보 검토 UI

```bash
# command 페이지에 후보 카드 또는 전용 route
cat apps/web/src/app/(dashboard)/command/page.tsx
pnpm --filter @aios/web build 2>/dev/null || cd apps/web && pnpm build
open http://localhost:3110/command
```

- 승인·거절 버튼 → PATCH `/api/projects/:id`
- P2-ENG-006 UI

### D3 — Silver→Gold E2E (step 3)

```bash
# 후보 목록
curl -s http://127.0.0.1:3110/api/projects?status=PENDING | jq .

# 승인
curl -X PATCH http://127.0.0.1:3110/api/projects/<id> \
  -H 'Content-Type: application/json' \
  -d '{"status":"APPROVED"}' | jq .

# Gold 확인
pnpm --filter @aios/db exec prisma db execute --stdin <<< \
  "SELECT id, name, status FROM \"Project\" WHERE status='APPROVED';"
```

- 영업 참관 UAT

### D4 — 중복 메일 UAT (step 4)

```bash
curl -X POST http://127.0.0.1:3110/api/projects/from-mail \
  -H 'Content-Type: application/json' \
  -d @/tmp/fixture-mail-duplicate.json | jq .

# Project count 변화 없음 확인
pnpm --filter @aios/db exec prisma db execute --stdin <<< \
  "SELECT COUNT(*) FROM \"Project\";"
```

- P2-PM-003 운영PM UAT 서명

### D5 — 시나리오 2 전체·P2 마감

```bash
node /Users/jmpark/Playground/scripts/e2e-scenarios.mjs
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm build
node /Users/jmpark/Playground/scripts/c-stack-health.mjs
redis-cli -p 6382 XRANGE aios:data-plane:events - + COUNT 10
```

- P2 phase sign-off, W7 finance kickoff

---

## 7. 구현 체크리스트

### AIOSv2_integration

| 경로 | 작업 | Done |
|------|------|:----:|
| `apps/web/src/app/api/projects/route.ts` | GET list | ☐ |
| `apps/web/src/app/api/projects/[id]/route.ts` | PATCH status | ☐ |
| `apps/web/src/app/api/projects/from-mail/route.ts` | ingest (W5) | 🟡 |
| `apps/web/src/app/(dashboard)/command/page.tsx` | 후보 카드/링크 | 🟡 |
| `packages/data-plane/src/gold/project-from-mail.ts` | Silver→Gold | 🟡 |
| `packages/db/prisma/schema.prisma` | Project status enum | 🟡 |

### Playground

| 경로 | 작업 | Done |
|------|------|:----:|
| `docs/36-E2E-SCENARIO-001.md` | 시나리오 2 | ✅ |
| `docs/p2-data-plane-definitions.md` | Gold projection | 🟡 |
| `scripts/e2e-scenarios.mjs` | 시나리오 2 자동화 | 🟡 |

---

## 8. E2E·검증

### 사전 조건

```bash
docker compose -f /Users/jmpark/Playground/docker-compose.c-stack.yml up -d
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm run integration:stack
node /Users/jmpark/Playground/scripts/c-stack-health.mjs
```

### 시나리오 2 (전체)

```bash
node /Users/jmpark/Playground/scripts/e2e-scenarios.mjs --scenario 2

# 수동 fallback
curl -X POST http://127.0.0.1:3110/api/projects/from-mail -H 'Content-Type: application/json' -d '{...}'
curl -s http://127.0.0.1:3110/api/projects?status=PENDING | jq .
curl -X PATCH http://127.0.0.1:3110/api/projects/<id> -d '{"status":"APPROVED"}'
```

### Redis·Data Plane

```bash
redis-cli -p 6382 XLEN aios:data-plane:events
redis-cli -p 6382 XRANGE aios:data-plane:events - + COUNT 5
```

### Build

```bash
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm build
```

---

## 9. 리스크·블로커

| 리스크 | 영향 | 완화 |
|--------|------|------|
| W5 hook 미완 | step 1–2 block | hard dependency |
| UI 부재 | step 3 수동 only | D2 UI 우선 |
| status enum 미정 | API 500 | D1 schema 확정 |
| dedup regression | step 4 fail | W5 정책 재검증 |
| 승인 게이트 혼선 | P1/P2 중복 | Project 승인 ≠ SEND_EMAIL |

---

## 10. Handoff

### W7에 전달

1. **P2 완료** — 메일→Project E2E, CEO #3
2. **Project 데이터** — Gold Project 1건+ 운영 DB
3. **Redis trace** — data-plane events 운영 패턴
4. **미완** — `/finance` 실 KPI, CFO mock 제거

### W7 선행 확인

- [ ] 시나리오 2 step 1–4 Pass
- [ ] `cursor/data-plane-ops` + gold-ui merged
- [ ] Project APPROVED 1건 이상
- [ ] CFO :4100 기동 (P0-FIN-001)
- [ ] `cursor/finance-ui-v2` 브랜치 착수
