# W12 — P6 QA·운영·CFO DB merge

> **Phase:** P6 · **Week:** W12 · **기간:** 1주 (D1–D5)  
> **게이트:** CEO 성공 8항목 · E2E 1–4 · CI green · rollback 5분 · 레드팀 ≥9.0  
> **현재 Done:** **부분** — health 8/8·E2E 스크립트 스모크, 제품 통합 미완  
> **진입점:** `http://localhost:3110/command`  
> **기준 커밋:** BLRO-OS `main` · AIOSv2 `c994213` + W2–W11 merges

---

## 1. 개요

### 주간 목표

C-Stack MVP **최종 마감**. E2E 시나리오 1–4 전체 Pass, CI migrate+build+smoke green, CFO DB additive merge, runbook 교육 1회, 레드팀 Round 5 ≥9.0.

### CEO 성공 항목 (전체 8항목 — W12 최종 검증)

| # | 기준 | 담당 W | W12 검증 |
|---|------|--------|----------|
| 1 | :3110 한 URL 아침 브리핑 | W2–3 | 시나리오 1 |
| 2 | 메일·CFO·Sangfor 같은 탭 | W2, W7, W9 | 시나리오 1 step 3 |
| 3 | 메일→Project 후보 | W4–6 | 시나리오 2 |
| 4 | 단일 승인 게이트 | W2–3, W8 | 시나리오 3·4 |
| 5 | Playground 의도적 분리 | W1 | repo 경계 리뷰 |
| 6 | health 전체 pass | W1, W12 | c-stack-health 8/8 |
| 7 | 단일 DB :5435 | W1 | prisma 단일 connection |
| 8 | E2E 1–4 | W3, W6, W8, W12 | e2e-scenarios.mjs |

### 핵심 산출

- E2E 1–4 전체 PASS 기록
- CI pipeline green (AIOS #6)
- [p6-cfo-db-merge-plan](../p6-cfo-db-merge-plan.md) 실행
- [c-stack-runbook](../ops/c-stack-runbook.md) 교육 1회
- 레드팀 Round 5 점수 ≥9.0

---

## 2. 게이트 (Exit Criteria)

| # | 기준 | 측정 방법 | Pass |
|---|------|-----------|:----:|
| G1 | E2E 1–4 | `e2e-scenarios.mjs` exit 0 | ☐ |
| G2 | health 8/8 | `c-stack-health.mjs` | ☐ |
| G3 | CI green | GitHub Actions migrate+build+smoke | ☐ |
| G4 | CFO DB merge | additive migrate :5435 | ☐ |
| G5 | rollback 5분 | compose down → up 복구 | ☐ |
| G6 | runbook 교육 | P6-PM-002 1회 완료 | ☐ |
| G7 | CEO 8항목 | 31 체크리스트 전량 ✅ | ☐ |
| G8 | 레드팀 | Round 5 ≥9.0 | ☐ |

**Exit:** G1–G8 Pass → **MVP Go-Live**

---

## 3. 선행 조건

| 항목 | 출처 | 상태 |
|------|------|:----:|
| W2–W3 P1 | Command Center | ☐ |
| W4–W6 P2 | Data Plane | ☐ |
| W7–W8 P3 | Finance | ☐ |
| W9–W10 P4 | Sangfor | ☐ |
| W11 P5 | Presales | ☐ |
| Follow-up PRs merged | command-v2, data-plane-ops, finance-ui-v2, sangfor-*, presales-desk-v1 | ☐ |

---

## 4. PR·브랜치

### 머지 완료 (P0/P6 기반)

| Repo | PR | 범위 | 상태 |
|------|-----|------|:----:|
| [BLRO-OS](https://github.com/whelp99-code/BLRO-OS) | [#2](https://github.com/whelp99-code/BLRO-OS/pull/2) | infra·health | **MERGED** |
| [BLRO-OS](https://github.com/whelp99-code/BLRO-OS/pull/3) | [#3](https://github.com/whelp99-code/BLRO-OS/pull/3) | docs·e2e | **MERGED** |
| [AIOSv2](https://github.com/whelp99-code/AIOSv2_integration) | #2 | schema M1–M2 | **MERGED** |
| AIOSv2 | #6 | hub-wiring-ci | main `c994213` |

### W2–W11 Follow-up (전량 merge 필요)

| 브랜치 | Week | 게이트 |
|--------|------|--------|
| `cursor/command-v2-real-briefing` | W2 | 시나리오 1 |
| `cursor/data-plane-ops` | W5 | 시나리오 2 |
| `cursor/finance-ui-v2` | W7–8 | 시나리오 4 |
| `cursor/sangfor-appshell` | W9 | same-tab |
| `cursor/sangfor-sample-report` | W10 | 샘플 보고서 |
| `cursor/presales-desk-v1` | W11 | UAT 3 |

### W12 작업 PR (필요 시)

| 범위 | 내용 |
|------|------|
| bugfix | P6-ENG-001 버그 수정 루프 |
| CFO merge | P6-ENG-003 additive schema |
| CI | P6-ENG-002 Actions fix |

---

## 5. 티켓 상세

| ID | 담당 | 협업 | 작업 | 산출 | Verification | Done |
|----|------|------|------|------|--------------|:----:|
| P6-PM-001 | 운영PM | 전원 | E2E 1–4 전체 | PASS 로그 | e2e-scenarios.mjs | 🟡 |
| P6-ENG-001 | 엔지니어 | 운영PM | 버그 수정 루프 | hotfix PRs | PM 재테스트 | ☐ |
| P6-ENG-002 | 엔지니어 | — | CI migrate+build+smoke | GitHub Actions | green | 🟡 |
| P6-ENG-003 | 엔지니어 | 재무·대표 | CFO DB additive merge | migrate | [p6-cfo-merge](../p6-cfo-db-merge-plan.md) | 🟡 |
| P6-PM-002 | 운영PM | 대표 | runbook 교육 1회 | 교육 기록 | 출석 서명 | ☐ |

### E2E 시나리오 매트릭스

| 시나리오 | Phase | Step 수 | W12 Pass |
|----------|-------|---------|:--------:|
| 1 아침 브리핑 | P1 | 3 | ☐ |
| 2 메일→Project | P2 | 4 | ☐ |
| 3 승인 게이트 | P1 | 3 | ☐ |
| 4 CFO 프록시 | P3 | 3 | ☐ |

---

## 6. 일일 실행 (D1–D5)

### D1 — E2E dry-run·버그 triage

```bash
docker compose -f /Users/jmpark/Playground/docker-compose.c-stack.yml up -d
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm run integration:stack
node /Users/jmpark/Playground/scripts/c-stack-health.mjs
node /Users/jmpark/Playground/scripts/e2e-scenarios.mjs 2>&1 | tee /tmp/e2e-w12-d1.log
```

- P6-PM-001: 실패 시나리오·스텝 목록
- P6-ENG-001: P0/P1 blocker 우선 수정

### D2 — 시나리오 1·3 (P1)

```bash
# 시나리오 1
open http://localhost:3110/command
curl -N http://127.0.0.1:3110/api/command/briefing/stream --max-time 20

# 시나리오 3
curl -X POST http://127.0.0.1:3110/api/mail/send \
  -H 'Content-Type: application/json' \
  -d '{"to":"e2e@test.local","subject":"W12","body":"gate"}' -i
```

- same-tab mail·finance·sangfor 재검증
- hotfix loop

### D3 — 시나리오 2·4 (P2·P3)

```bash
node /Users/jmpark/Playground/scripts/e2e-scenarios.mjs --scenario 2
node /Users/jmpark/Playground/scripts/e2e-scenarios.mjs --scenario 4

# CFO merge 준비
cat /Users/jmpark/Playground/docs/p6-cfo-db-merge-plan.md
cd /Users/jmpark/Playground/AIOSv2_integration && \
  pnpm --filter @aios/db exec prisma migrate dev --name cfo-additive
```

- P6-ENG-003 additive only (no destructive)

### D4 — CI·rollback·CFO merge

```bash
# CI 로컬 재현
cd /Users/jmpark/Playground/AIOSv2_integration
pnpm install && pnpm --filter @aios/db exec prisma migrate deploy && pnpm build

# rollback 5분 테스트
cd /Users/jmpark/Playground
time (docker compose -f docker-compose.c-stack.yml down && \
  docker compose -f docker-compose.c-stack.yml up -d && \
  node scripts/c-stack-health.mjs)

# CI 상태
gh run list --repo whelp99-code/AIOSv2_integration --limit 5
```

- P6-ENG-002 Actions green
- rollback ≤5분 확인

### D5 — runbook 교육·레드팀·Go/No-Go

```bash
# 최종 E2E
node /Users/jmpark/Playground/scripts/e2e-scenarios.mjs
node /Users/jmpark/Playground/scripts/c-stack-health.mjs

# 31 체크리스트 동기화
# docs/31-CEO-지시용-티켓-체크리스트.md 전량 ✅
```

- P6-PM-002 runbook 교육 (운영PM 주관)
- 레드팀 Round 5 — [34-레드팀](../34-레드팀-점수화-개선-루프-C방향.md)
- CEO Go/No-Go 서명

---

## 7. 구현 체크리스트

### Playground

| 경로 | 작업 | Done |
|------|------|:----:|
| `docker-compose.c-stack.yml` | 전 서비스 | ✅ |
| `scripts/c-stack-health.mjs` | 8/8 | ✅ |
| `scripts/e2e-scenarios.mjs` | 1–4 | 🟡 |
| `docs/36-E2E-SCENARIO-001.md` | SSOT | ✅ |
| `docs/ops/c-stack-runbook.md` | 교육 자료 | ✅ |
| `docs/p6-cfo-db-merge-plan.md` | CFO merge | 🟡 |
| `docs/31-CEO-지시용-티켓-체크리스트.md` | Done 동기화 | 🟡 |

### AIOSv2_integration

| 경로 | 작업 | Done |
|------|------|:----:|
| `.github/workflows/` | CI migrate+build+smoke | 🟡 |
| `packages/db/prisma/schema.prisma` | CFO additive | 🟡 |
| `apps/web/src/app/(dashboard)/*` | 전 route AppShell | 🟡 |
| `apps/web/src/lib/blro/briefing.ts` | 실데이터 | 🟡 |
| `packages/data-plane/` | E2E 2 | 🟡 |

---

## 8. E2E·검증

자동승인 루프: `구현 → pnpm build → c-stack-health.mjs → E2E → 31 체크리스트 → Go-Live`

```bash
docker compose -f /Users/jmpark/Playground/docker-compose.c-stack.yml up -d
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm run integration:stack
node /Users/jmpark/Playground/scripts/c-stack-health.mjs          # G2
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm build      # G3
pnpm --filter @aios/db exec prisma validate
node /Users/jmpark/Playground/scripts/e2e-scenarios.mjs           # G1
time (docker compose -f docker-compose.c-stack.yml down && \
  docker compose -f docker-compose.c-stack.yml up -d && \
  node scripts/c-stack-health.mjs)                               # G5 rollback
```

### Go/No-Go ([36-E2E](../36-E2E-SCENARIO-001.md))

- [ ] 시나리오 1~4 통과
- [ ] `c-stack-health.mjs` 전체 pass
- [ ] rollback 5분 내 복구
- [ ] CEO 8항목 충족
- [ ] 레드팀 ≥9.0

---

## 9. 리스크·블로커

| 리스크 | 영향 | 완화 |
|--------|------|------|
| W2–W11 미완 | E2E fail | W12 slip — 주차별 gate hard |
| 제품 통합 85%→100% gap | 시나리오 1 fail | command-v2 PR 우선 |
| CFO merge destructive | 데이터 손실 | additive only, p6 plan |
| CI flake | G3 fail | D4 로컬 재현·캐시 |
| 레드팀 <9.0 | Go delay | P6-ENG-001 bug loop |
| rollback >5분 | 운영 리스크 | compose 단순화·문서화 |

---

## 10. Handoff

**MVP Go-Live 후:** 09:00 루틴·일일 health 8/8·Redis stream 모니터링 지속. 레드팀 피드백 → P7+ 백로그.

**Post-MVP:** follow-up PR 전량 main merge · [31 체크리스트](../31-CEO-지시용-티켓-체크리스트.md) 100% ✅ · runbook 교육 기록 · 레드팀 Round 5 보고서 · release tag.
