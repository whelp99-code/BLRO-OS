# W11 — P5 영업·프리세일즈

> **Phase:** P5 · **Week:** W11 · **기간:** 1주 (D1–D5)  
> **게이트:** 제안 기회 3 UAT · Proposal Desk 5종 · Partner seed 5건  
> **현재 Done:** **스캐폴딩** — rules-engine·presales page stub (AIOS #5)  
> **진입점:** `http://localhost:3110/presales`  
> **기준 커밋:** BLRO-OS `main` · AIOSv2 `c994213`

---

## 1. 개요

### 주간 목표

**Proposal Desk** 완성. 영업 기회 규칙 10종, 템플릿 5종, rules engine + PresalesReview UI, Partner(Customer PARTNER) seed 5건, 프리세일즈 UAT 3 시나리오.

### CEO 성공 항목 (이번 주 연관)

| # | 항목 | W11 역할 |
|---|------|---------|
| 3 | 파이프라인 (간접) | 제안 기회 → Project 연계 |
| 1 | command 브리핑 | `projects` 필드 실 open count |

### 핵심 산출

- PR `cursor/presales-desk-v1` — Proposal Desk UI + rules
- 기회 규칙 10종 표 (영업)
- 템플릿 5종 (프리세일즈)
- UAT 3 시나리오 문서

---

## 2. 게이트 (Exit Criteria)

| # | 기준 | 측정 방법 | Pass |
|---|------|-----------|:----:|
| G1 | 기회 규칙 10종 | P5-SAL-001 표 서명 | ☐ |
| G2 | Proposal Desk UI | `/presales` 5종 템플릿 | ☐ |
| G3 | rules engine | 10 규칙 unit eval | ☐ |
| G4 | Partner 5건 | Customer PARTNER seed | ☐ |
| G5 | UAT 3 시나리오 | P5-PRE-001 문서화 | ☐ |
| G6 | PR | `presales-desk-v1` review | ☐ |

**Exit:** G1–G6 Pass → W12 P6 QA·Ops.

---

## 3. 선행 조건

| 항목 | 출처 | 상태 |
|------|------|:----:|
| W10 P4 게이트 | [W10-P4-Sangfor-2](W10-P4-Sangfor-2.md) | ☐ |
| P2 Customer model | W5–6 | ☐ |
| P1 AppShell | W2 | ☐ |
| AIOS #5 presales stub | main | 🟡 |
| Project Gold data | W6 | ☐ |

---

## 4. PR·브랜치

### 기반

| Repo | PR | 범위 | 상태 |
|------|-----|------|:----:|
| AIOSv2 | #5 | presales·rules stub | main `c994213` |

### 이번 주 목표 PR

| Repo | 브랜치 | 범위 | 상태 |
|------|--------|------|:----:|
| AIOSv2 | `cursor/presales-desk-v1` | Proposal Desk·rules·Partner CRUD | **OPEN (W11)** |

```bash
cd /Users/jmpark/Playground/AIOSv2_integration
git checkout -b cursor/presales-desk-v1 main
gh pr create --title "P5: Presales Desk v1 — rules + templates + UAT" \
  --body "W11 gate: 10 rules, 5 templates, 3 UAT scenarios"
```

---

## 5. 티켓 상세

| ID | 담당 | 협업 | 작업 | 산출 | Verification | Done |
|----|------|------|------|------|--------------|:----:|
| P5-SAL-001 | 영업 | 프리세일즈 | 기회 규칙 10종 | 규칙 표 | 영업 서명 | ☐ |
| P5-ENG-001 | 엔지니어 | 영업 | rules engine·위젯 | `rules-engine.ts` | 10 rule eval | 🟡 |
| P5-PRE-001 | 프리세일즈 | 엔지니어 | /presales UAT | 3 시나리오 문서 | PM 서명 | 🟡 |
| P5-ENG-002 | 엔지니어 | 프리세일즈 | draft-reply API | API route | POST 200 | ☐ |
| P5-PRE-002 | 프리세일즈 | 영업 | 템플릿 5종 | md templates | presales list | 🟡 |
| P5-ENG-003 | 엔지니어 | 프리세일즈 | Proposal Desk UI | presales/page.tsx | 5종 렌더 | 🟡 |
| P5-SAL-002 | 영업 | 운영PM | Partner seed 5건 | seed script | 5 rows | ☐ |
| P5-ENG-004 | 엔지니어 | 영업 | Partner CRUD UI | partners section | CRUD test | ☐ |
| P5-ENG-005 | 엔지니어 | 영업 | wiki-sync | sync script | run once | ☐ |

### UAT 3 시나리오 (초안)

| # | 시나리오 | 액터 | 기대 |
|---|----------|------|------|
| U1 | 신규 기회 등록 | 영업 | rules engine HIGH priority |
| U2 | 템플릿 제안서 생성 | 프리세일즈 | draft-reply 200 |
| U3 | Partner 연계 | 영업 | PARTNER Customer link |

---

## 6. 일일 실행 (D1–D5)

### D1 — 기회 규칙·브랜치

```bash
cd /Users/jmpark/Playground/AIOSv2_integration
git checkout -b cursor/presales-desk-v1
cat apps/web/src/lib/presales/rules-engine.ts
cat apps/web/src/app/(dashboard)/presales/page.tsx
```

- 영업: P5-SAL-001 규칙 10종 표 (금액·업종·지역·경쟁사·마감일 등)
- 엔지니어: rules JSON schema

### D2 — rules engine·opportunities API

```bash
curl -s http://127.0.0.1:3110/api/presales/opportunities | jq .
curl -X POST http://127.0.0.1:3110/api/presales/opportunities \
  -H 'Content-Type: application/json' \
  -d '{
    "customerName": "ACME",
    "amount": 50000000,
    "industry": "finance",
    "deadline": "2026-07-31"
  }' | jq '.priority, .matchedRules'
```

- P5-ENG-001 10 rules eval
- priority: HIGH | MEDIUM | LOW

### D3 — 템플릿 5종·Proposal Desk UI

```bash
ls apps/web/src/content/presales/templates/ 2>/dev/null || mkdir -p apps/web/src/content/presales/templates
cat apps/web/src/app/(dashboard)/presales/page.tsx
open http://localhost:3110/presales
```

- P5-PRE-002: 견적·제안·RFP·갱신·파트너 5종 md
- P5-ENG-003 UI: 템플릿 선택 → preview

### D4 — Partner seed·CRUD

```bash
# seed
pnpm --filter @aios/db exec prisma db seed 2>/dev/null || node scripts/seed-partners.mjs

curl -s http://127.0.0.1:3110/api/partners | jq 'length'
curl -X POST http://127.0.0.1:3110/api/partners \
  -H 'Content-Type: application/json' \
  -d '{"name":"Partner Co","type":"PARTNER"}' | jq .
```

- P5-SAL-002 seed 5건
- P5-ENG-004 CRUD UI

### D5 — UAT·PR

```bash
# draft-reply
curl -X POST http://127.0.0.1:3110/api/presales/draft-reply \
  -H 'Content-Type: application/json' \
  -d '{"templateId":"proposal","opportunityId":"<id>"}' | jq .

cd /Users/jmpark/Playground/AIOSv2_integration && pnpm build
gh pr create --base main --head cursor/presales-desk-v1
```

- P5-PRE-001 UAT 3 시나리오 문서·서명
- W12 E2E prep

---

## 7. 구현 체크리스트

### AIOSv2_integration

| 경로 | 작업 | Done |
|------|------|:----:|
| `apps/web/src/lib/presales/rules-engine.ts` | 10 rules | 🟡 |
| `apps/web/src/app/(dashboard)/presales/page.tsx` | Proposal Desk UI | 🟡 |
| `apps/web/src/app/api/presales/opportunities/route.ts` | CRUD + eval | 🟡 |
| `apps/web/src/app/api/presales/draft-reply/route.ts` | draft API | ☐ |
| `apps/web/src/app/api/partners/route.ts` | Partner CRUD | 🟡 |
| `apps/web/src/content/presales/templates/*.md` | 5 templates | 🟡 |
| `packages/db/prisma/schema.prisma` | Customer PARTNER type | 🟡 |

### Playground

| 경로 | 작업 | Done |
|------|------|:----:|
| `docs/41-티켓-전량-상세.md` | P5 티켓 | ✅ |

---

## 8. E2E·검증

### 사전 조건

```bash
docker compose -f /Users/jmpark/Playground/docker-compose.c-stack.yml up -d
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm run integration:stack
node /Users/jmpark/Playground/scripts/c-stack-health.mjs
```

### Presales API

```bash
curl -sf http://127.0.0.1:3110/presales -o /dev/null
curl -s http://127.0.0.1:3110/api/presales/opportunities | jq .
curl -X POST http://127.0.0.1:3110/api/presales/opportunities \
  -H 'Content-Type: application/json' -d '{"customerName":"UAT","amount":1e8}'
```

### Command 브리핑 연동

```bash
curl -s http://127.0.0.1:3110/api/command/briefing | jq '.projects'
```

### Build

```bash
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm build
```

---

## 9. 리스크·블로커

| 리스크 | 영향 | 완화 |
|--------|------|------|
| 규칙 미합의 | engine 무의미 | D1 영업 표 고정 |
| 템플릿 품질 | UAT reject | D3 프리세일즈 검수 |
| Partner FK | seed fail | W5 Customer 선행 |
| wiki-sync scope creep | W11 delay | P5-ENG-005 optional/minimal |
| presales route AppShell 밖 | UX 불일치 | `(dashboard)/presales` |

---

## 10. Handoff

### W12에 전달

1. **P5 완료** — Proposal Desk, rules, Partner
2. **UAT 문서** — 3 시나리오
3. **전 Phase 산출** — E2E 1–4 재검증 대상
4. **미완** — CI green, CFO DB merge, runbook 교육

### W12 선행 확인

- [ ] `presales-desk-v1` merged
- [ ] UAT 3 시나리오 Pass
- [ ] Partner 5건 seed
- [ ] rules 10종 서명
- [ ] E2E 스크립트 전체 dry-run
