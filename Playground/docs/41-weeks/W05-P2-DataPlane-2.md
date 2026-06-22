# W5 — P2 Data Plane (2/3)

> **Phase:** P2 · **Week:** W5 · **기간:** 1주 (D1–D5)  
> **게이트:** mail hook E2E 1건 · from-mail API · Customer seed 3 · dedup 정책 문서  
> **현재 Done:** **미착수** — W4 yaml·registry 선행, hook 스캐폴딩 🟡  
> **진입점:** `http://localhost:3110/command` + mail-intelligence `:3010`  
> **기준 커밋:** BLRO-OS `main` · AIOSv2 `c994213` + W4 merge

---

## 1. 개요

### 주간 목표

**메일 1건 → Project 후보** 파이프라인을 운영화한다. mail-intelligence hook 재기동, 실메일 fixture Bronze ingest, `from-mail` API, Customer seed 3건, dedup 정책(`name-match-dedup`) 검증이 핵심이다.

### CEO 성공 항목 (이번 주 연관)

| # | 항목 | W5 역할 |
|---|------|---------|
| 3 | 메일→Project 후보 | hook E2E step 1–2 (시나리오 2) |

### 핵심 산출

- PR `cursor/data-plane-ops` — hook 운영화 + dedup
- `api/projects/from-mail` E2E 1건
- Customer seed 3건 (영업)
- dedup 정책 문서 (p2-definitions §dedup)

---

## 2. 게이트 (Exit Criteria)

| # | 기준 | 측정 방법 | Pass |
|---|------|-----------|:----:|
| G1 | Mail hook | fixture 1건 → Bronze ingest | ☐ |
| G2 | Project 후보 | from-mail API → 1 Project candidate | ☐ |
| G3 | Redis stream | hook 후 `aios:data-plane:events` 이벤트 | ☐ |
| G4 | Customer seed | 3건 DB insert | ☐ |
| G5 | Dedup 정책 | 중복 subject → `{ duplicate: true }` | ☐ |
| G6 | PR | `cursor/data-plane-ops` review ready | ☐ |

**Exit:** G1–G5 Pass → W6 Silver→Gold 승인 UI.

---

## 3. 선행 조건

| 항목 | 출처 | 상태 |
|------|------|:----:|
| W4 게이트 | [W04-P2-DataPlane-1](W04-P2-DataPlane-1.md) | ☐ |
| p2-definitions v2 | P2-PM-001 | ☐ |
| data-plane package build | P2-ENG-001 | ✅ |
| mail-intelligence :3010 | P0-REP-002 | ✅ |
| Redis :6382 | W1 | ✅ |

---

## 4. PR·브랜치

### 기반

| Repo | PR | 범위 | 상태 |
|------|-----|------|:----:|
| AIOSv2 | #3 | data-plane 패키지 | main `c994213` |

### 이번 주 목표 PR

| Repo | 브랜치 | 범위 | 상태 |
|------|--------|------|:----:|
| AIOSv2 | `cursor/data-plane-ops` | mail hook·from-mail·dedup·seed | **OPEN (W5)** |

```bash
cd /Users/jmpark/Playground/AIOSv2_integration
git checkout -b cursor/data-plane-ops main
gh pr create --title "P2: data-plane ops — mail hook + dedup" \
  --body "W5 gate: 1 mail E2E, customer seed, dedup policy"
```

---

## 5. 티켓 상세

| ID | 담당 | 협업 | 작업 | 산출 | Verification | Done |
|----|------|------|------|------|--------------|:----:|
| P2-ENG-003 | 엔지니어 | — | Prisma B/S/G db 연동 | schema extension | migrate :5435 | ☐ |
| P2-ENG-005 | 엔지니어 | 운영PM | mail-intelligence hook | hook endpoint | 1 mail E2E | 🟡 |
| P2-PM-003 | 운영PM | 영업 | dedup 정책 문서 | p2-definitions §dedup | 영업 서명 | 🟡 |
| P2-ENG-006 | 엔지니어 | 운영PM | Project 후보 job | background/worker | 1 project row | 🟡 |
| P2-SAL-002 | 영업 | 엔지니어 | Customer seed 3건 | seed script | SELECT 3 rows | ☐ |
| P2-ENG-008 | 엔지니어 | 영업 | from-mail API | `from-mail/route.ts` | E2E-2 step 2 | 🟡 |

### 시나리오 2 (W5 범위)

| Step | 액터 | 액션 | 기대 | Done |
|------|------|------|------|:----:|
| 1 | 운영PM | 테스트 메일 1건 수신 | Bronze ingest | ☐ |
| 2 | 시스템 | data-plane-hook | Project 후보 1건 | ☐ |

---

## 6. 일일 실행 (D1–D5)

### D1 — data-plane-ops 브랜치·hook 감사

```bash
cd /Users/jmpark/Playground/AIOSv2_integration
git checkout -b cursor/data-plane-ops
curl -s http://127.0.0.1:3010/api/outlook/status | jq .
cat apps/web/src/app/api/projects/from-mail/route.ts
cat packages/data-plane/src/gold/project-from-mail.ts
```

- mail-intelligence → web hook URL 확정
- P2-ENG-005 hook 스펙 합의

### D2 — fixture 메일·Bronze ingest

```bash
# fixture 메일 POST (hook 또는 수동 ingest)
curl -X POST http://127.0.0.1:3110/api/projects/from-mail \
  -H 'Content-Type: application/json' \
  -d '{
    "organizationId": "default-org",
    "subject": "[프로젝트] ACME 네트워크 구축",
    "from": "sales@acme.com",
    "body": "견적 요청합니다."
  }' | jq .

redis-cli -p 6382 XRANGE aios:data-plane:events - + COUNT 3
```

- P2-ENG-008 from-mail API
- Bronze stream 이벤트 확인

### D3 — Customer seed·Prisma 연동

```bash
cd /Users/jmpark/Playground/AIOSv2_integration
pnpm --filter @aios/db exec prisma migrate dev --name data-plane-bsg  # 필요 시
# seed (영업 제공 데이터)
pnpm --filter @aios/db exec prisma db seed 2>/dev/null || \
  node scripts/seed-customers.mjs

pnpm --filter @aios/db exec prisma studio  # Customer 3건 확인
```

- P2-SAL-002 seed 3건
- P2-ENG-003 B/S/G tables

### D4 — dedup 정책·중복 테스트

```bash
# 동일 subject 재전송
curl -X POST http://127.0.0.1:3110/api/projects/from-mail \
  -H 'Content-Type: application/json' \
  -d '{
    "organizationId": "default-org",
    "subject": "[프로젝트] ACME 네트워크 구축",
    "from": "sales@acme.com",
    "body": "재전송"
  }' | jq '.duplicate, .policy'
```

- 기대: `{ duplicate: true, policy: 'name-match-dedup' }`
- P2-PM-003 dedup 문서 영업 검수

### D5 — E2E·PR

```bash
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm build
node /Users/jmpark/Playground/scripts/c-stack-health.mjs
node /Users/jmpark/Playground/scripts/e2e-scenarios.mjs --scenario 2 2>/dev/null || echo "수동 step 1-2"
gh pr create --base main --head cursor/data-plane-ops
```

- 시나리오 2 step 1–2 Pass
- W6 Silver→Gold UI kickoff

---

## 7. 구현 체크리스트

### AIOSv2_integration

| 경로 | 작업 | Done |
|------|------|:----:|
| `apps/web/src/app/api/projects/from-mail/route.ts` | POST from-mail | 🟡 |
| `packages/data-plane/src/gold/project-from-mail.ts` | dedup + create | 🟡 |
| `packages/data-plane/src/bronze/ingest.ts` | email bronze | ✅ |
| `packages/data-plane/src/publisher.ts` | hook event publish | ✅ |
| `packages/db/prisma/schema.prisma` | Project·Customer B/S/G | 🟡 |
| `packages/db/prisma/seed.ts` | Customer 3건 | ☐ |
| `apps/web/src/lib/blro/default-org.ts` | organizationId default | ✅ |

### mail-intelligence (외부 :3010)

| 항목 | 작업 | Done |
|------|------|:----:|
| webhook URL | `http://127.0.0.1:3110/api/projects/from-mail` | 🟡 |
| fixture 메일 | 테스트 1건 | ☐ |

### Playground

| 경로 | 작업 | Done |
|------|------|:----:|
| `docs/p2-data-plane-definitions.md` | §dedup | 🟡 |
| `scripts/e2e-scenarios.mjs` | 시나리오 2 | 🟡 |

---

## 8. E2E·검증

### 사전 조건

```bash
docker compose -f /Users/jmpark/Playground/docker-compose.c-stack.yml up -d
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm run integration:stack
node /Users/jmpark/Playground/scripts/c-stack-health.mjs
curl -s http://127.0.0.1:3010/api/outlook/status
```

### 시나리오 2 (step 1–2)

```bash
# Step 1: fixture ingest
curl -X POST http://127.0.0.1:3110/api/projects/from-mail \
  -H 'Content-Type: application/json' \
  -d @/tmp/fixture-mail.json

# Step 2: Project 후보 확인
cd /Users/jmpark/Playground/AIOSv2_integration && \
  pnpm --filter @aios/db exec prisma db execute --stdin <<< \
  "SELECT id, name, status FROM \"Project\" ORDER BY \"createdAt\" DESC LIMIT 3;"

# Redis
redis-cli -p 6382 XLEN aios:data-plane:events
```

### Build

```bash
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm build
pnpm --filter @aios/db exec prisma validate
```

---

## 9. 리스크·블로커

| 리스크 | 영향 | 완화 |
|--------|------|------|
| :3010 hook 미연결 | step 1 fail | D1 webhook URL 고정 |
| dedup false negative | 중복 Project | D4 테스트 + 영업 검수 |
| seed 데이터 부재 | FK 오류 | D3 영업 CSV 선제 전달 |
| Prisma migrate 충돌 | :5435 down | W1 migrate 백업 |
| W4 registry 미완 | normalize fail | W4 게이트 block |

---

## 10. Handoff

### W6에 전달

1. **hook green** — 1 mail → 1 Project candidate
2. **dedup** — name-match-dedup 동작·문서
3. **seed** — Customer 3건
4. **미완** — Silver→Gold 승인 UI, 시나리오 2 step 3–4

### W6 선행 확인

- [ ] `cursor/data-plane-ops` merged
- [ ] 시나리오 2 step 1–2 Pass
- [ ] Customer 3건 DB
- [ ] dedup 정책 서명
- [ ] Project 후보 1건 이상 PENDING 상태
