# W3 — P1 Command Center (2/2)

> **Phase:** P1 · **Week:** W3 · **기간:** 1주 (D1–D5)  
> **게이트:** E2E 시나리오 1·3 Pass · P1 UAT 대표 서명 · 09:00 루틴 1주 시행  
> **현재 Done:** **미착수** — W2 AppShell·브리핑 v2 선행 필요  
> **진입점:** `http://localhost:3110/command`  
> **기준 커밋:** BLRO-OS `main` · AIOSv2 `c994213` + W2 merge

---

## 1. 개요

### 주간 목표

P1 Command Center를 **운영 가능** 상태로 마무리한다. 승인 게이트(`COST_ACTION`, `SEND_EMAIL`) UAT, approval-gateway 409→승인→200 플로우, 대표 **09:00 아침 루틴** 1주 시행이 핵심이다.

### CEO 성공 항목 (이번 주 연관)

| # | 항목 | W3 역할 |
|---|------|---------|
| 1 | :3110 한 URL 아침 브리핑 | 09:00 루틴 1주 시행·서명 |
| 4 | 단일 승인 게이트 | 시나리오 3 — 409 → 승인 → 200 |
| 8 | E2E 1·3 | 시나리오 1·3 스크립트/수동 Pass |

### 핵심 산출

- approval-gateway 미들웨어 완성 (`approval-gateway.ts`, `approval-middleware.ts`)
- SEND_EMAIL·COST_ACTION UAT 기록
- [p1-daily-routine](../p1-daily-routine.md) 1주 시행 서명
- P1-PM-003 대표 UAT 서명

---

## 2. 게이트 (Exit Criteria)

| # | 기준 | 측정 방법 | Pass |
|---|------|-----------|:----:|
| G1 | 시나리오 1 | [36-E2E](../36-E2E-SCENARIO-001.md) step 1–3 전체 | ☐ |
| G2 | 시나리오 3 | 미승인 메일 409 → 승인 → 200 | ☐ |
| G3 | approval-gateway | `ApprovalActionType` enum + 409 + approvalId | ☐ |
| G4 | 09:00 루틴 | P1-PM-002 5일 시행 로그 | ☐ |
| G5 | P1 UAT | P1-PM-003 대표 서명 | ☐ |
| G6 | 37 체크리스트 | #5 approval-gateway Pass | ☐ |

**Exit:** G1–G6 Pass → W4 P2 Data Plane 착수.

---

## 3. 선행 조건

| 항목 | 출처 | 상태 |
|------|------|:----:|
| W2 게이트 G1–G6 | [W02-P1-Command-1](W02-P1-Command-1.md) | ☐ |
| `command-v2-real-briefing` merged | W2 PR | ☐ |
| AppShell 6 route same-tab | P1-ENG-002 | ☐ |
| 브리핑 v2 서명 | P1-PM-001 | ☐ |
| ApprovalActionType enum | packages/db | ✅ |

---

## 4. PR·브랜치

### W2에서 머지 예정

| Repo | 브랜치 | 범위 | 상태 |
|------|--------|------|:----:|
| AIOSv2 | `cursor/command-v2-real-briefing` | AppShell + 실데이터 브리핑 | W2 merge 선행 |

### W3 작업 (main 직접 또는 소규모 PR)

| 범위 | 파일 | 내용 |
|------|------|------|
| 승인 게이트 | `approval-gateway.ts`, `approval-middleware.ts` | 409 flow |
| 메일 발송 | `api/mail/send/route.ts` | SEND_EMAIL gate |
| 승인 API | `api/approvals/route.ts` | approve/reject |

```bash
cd /Users/jmpark/Playground/AIOSv2_integration
git checkout main && git pull
git checkout -b cursor/command-v2-approval-uat
```

---

## 5. 티켓 상세

| ID | 담당 | 협업 | 작업 | 산출 | Verification | Done |
|----|------|------|------|------|--------------|:----:|
| P1-ENG-005 | 엔지니어 | 대표 | 승인 게이트 COST_ACTION·SEND_EMAIL | approval-gateway | 409 + approvalId | 🟡 |
| P1-PM-002 | 운영PM | 대표 | 09:00 루틴 1주 시행 | [p1-daily-routine](../p1-daily-routine.md) | 5일 서명 | ☐ |
| P1-PM-003 | 운영PM | 대표 | P1 UAT 종합 | UAT 체크리스트 | 대표 서명 | ☐ |

### 37-BLRO-UI 체크리스트 (W3)

| # | 항목 | Verification | Done |
|---|------|--------------|:----:|
| 5 | approval-gateway | 미승인 액션 409 | 🟡 |
| 6 | ApprovalActionType enum | packages/db 공유 | ✅ |
| 12 | build green | `pnpm build` | ✅ |

### 시나리오 3 상세

| Step | 액터 | 액션 | 기대 | Done |
|------|------|------|------|:----:|
| 1 | 운영PM | 미승인 메일 발송 시도 | HTTP 409 | ☐ |
| 2 | 대표 | `/approvals` SEND_EMAIL 승인 | status=approved | ☐ |
| 3 | 운영PM | 동일 메일 재발송 | HTTP 200 | ☐ |

---

## 6. 일일 실행 (D1–D5)

### D1 — approval-gateway 감사·409 구현

```bash
cd /Users/jmpark/Playground/AIOSv2_integration
cat apps/web/src/lib/blro/approval-gateway.ts
cat apps/web/src/lib/integrations/approval-gate.ts
cat apps/web/src/lib/integrations/approval-middleware.ts
grep -r ApprovalActionType packages/db/
```

- P1-ENG-005: SEND_EMAIL gate on `api/mail/send`
- 미승인 시 `{ status: 409, approvalId }` 응답

### D2 — 승인 UI·API 연동

```bash
curl -s http://127.0.0.1:3110/api/approvals | jq .
# 승인 액션
curl -X PATCH http://127.0.0.1:3110/api/approvals \
  -H 'Content-Type: application/json' \
  -d '{"id":"<approvalId>","action":"approve"}'
```

- `/approvals` 페이지에서 PENDING → APPROVED 전환
- COST_ACTION stub (P3에서 실 Invoice 연동)

### D3 — 시나리오 3 E2E

```bash
# Step 1: 미승인 발송 → 409
curl -X POST http://127.0.0.1:3110/api/mail/send \
  -H 'Content-Type: application/json' \
  -d '{"to":"test@example.com","subject":"UAT","body":"W3"}' -w '\n%{http_code}\n'

# Step 2–3: 승인 후 재발송 → 200
node /Users/jmpark/Playground/scripts/e2e-scenarios.mjs --scenario 3 2>/dev/null || echo "수동 UAT"
```

- 운영PM·대표 참관 UAT

### D4 — 09:00 루틴 시행 (4일차)

| 시간 | 액션 | 담당 |
|------|------|------|
| 09:00 | `:3110/command` 브리핑 확인 | 대표 |
| 09:05 | 긴급 메일·승인 대기 검토 | 대표 |
| 09:10 | 파이프라인·CFO·Sangfor 위젯 | 대표 |
| 09:15 | 이슈 기록 (있을 시) | 운영PM |

- P1-PM-002 일일 로그 작성

### D5 — P1 UAT·게이트

```bash
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm build
node /Users/jmpark/Playground/scripts/c-stack-health.mjs
# 시나리오 1 전체 재검증
open http://localhost:3110/command
```

- P1-PM-003 대표 UAT 서명
- W4 kickoff: p2-data-plane-definitions 워크숍 예약

---

## 7. 구현 체크리스트

### AIOSv2_integration

| 경로 | 작업 | Done |
|------|------|:----:|
| `apps/web/src/lib/blro/approval-gateway.ts` | gate 판정·409 | 🟡 |
| `apps/web/src/lib/blro/approval-service.ts` | ApprovalItem CRUD | 🟡 |
| `apps/web/src/lib/integrations/approval-gate.ts` | action type 매핑 | 🟡 |
| `apps/web/src/lib/integrations/approval-middleware.ts` | route wrapper | 🟡 |
| `apps/web/src/app/api/mail/send/route.ts` | SEND_EMAIL gate | 🟡 |
| `apps/web/src/app/api/approvals/route.ts` | GET/PATCH approvals | ✅ |
| `apps/web/src/app/(dashboard)/approvals/page.tsx` | 승인·거절 UI | ✅ |
| `packages/db/prisma/schema.prisma` | ApprovalActionType enum | ✅ |

### Playground

| 경로 | 작업 | Done |
|------|------|:----:|
| `docs/p1-daily-routine.md` | 09:00 루틴 SSOT | ☐ |
| `docs/36-E2E-SCENARIO-001.md` | 시나리오 1·3 | ✅ |
| `scripts/e2e-scenarios.mjs` | 시나리오 3 자동화 | 🟡 |

---

## 8. E2E·검증

### 사전 조건

```bash
docker compose -f /Users/jmpark/Playground/docker-compose.c-stack.yml up -d
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm run integration:stack
node /Users/jmpark/Playground/scripts/c-stack-health.mjs
```

### 시나리오 1 (전체)

```bash
# Step 1
curl -sf http://127.0.0.1:3110/command -o /dev/null && echo "command OK"
# Step 2
curl -N http://127.0.0.1:3110/api/command/briefing/stream --max-time 20
# Step 3: 브라우저 same-tab 수동
```

### 시나리오 3 (승인 게이트)

```bash
# 자동 (가능 시)
node /Users/jmpark/Playground/scripts/e2e-scenarios.mjs

# 수동 검증
curl -X POST http://127.0.0.1:3110/api/mail/send \
  -H 'Content-Type: application/json' \
  -d '{"to":"uat@test.local","subject":"Gate","body":"W3"}' -i
```

### Build·Health

```bash
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm build
node /Users/jmpark/Playground/scripts/c-stack-health.mjs
```

---

## 9. 리스크·블로커

| 리스크 | 영향 | 완화 |
|--------|------|------|
| W2 미완료 | W3 전체 block | W2 게이트 hard dependency |
| 409 미구현 | 시나리오 3 fail | D1 gateway 집중 |
| 대표 UAT 일정 | G5 delay | D3·D5 고정 슬롯 |
| mail-intelligence down | SEND_EMAIL UAT 불가 | :3010 health 선확인 |
| COST_ACTION 실 Invoice 없음 | P3 선행 테스트만 | stub approval으로 gate 검증 |

---

## 10. Handoff

### W4에 전달

1. **P1 완료** — Command Center 운영 가능, CEO #1·#4·#8(1·3) 충족
2. **승인 인프라** — gateway 재사용 (P3 COST_ACTION Invoice)
3. **데이터 공백** — Project·Customer 실데이터 부족 → W4–6 Data Plane
4. **문서** — p1-daily-routine 서명본, UAT 기록

### W4 선행 확인

- [ ] 시나리오 1·3 Pass
- [ ] P1-PM-003 대표 서명
- [ ] `approval-gateway` 409 동작 확인
- [ ] [p2-data-plane-definitions](../p2-data-plane-definitions.md) 워크숍 일정
