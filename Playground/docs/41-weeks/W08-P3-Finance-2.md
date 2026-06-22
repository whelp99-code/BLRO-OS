# W8 — P3 재무 (2/2)

> **Phase:** P3 · **Week:** W8 · **기간:** 1주 (D1–D5)  
> **게이트:** E2E 시나리오 4 Pass · mail→CFO draft · COST_ACTION 승인→Invoice  
> **현재 Done:** **미착수** — W7 finance-ui-v2 선행  
> **진입점:** `http://localhost:3110/finance` · `http://localhost:3110/approvals`  
> **기준 커밋:** BLRO-OS `main` · AIOSv2 `c994213` + W7 merge

---

## 1. 개요

### 주간 목표

P3 재무 **마무리**. 메일에서 CFO Invoice draft 생성, 대표 COST_ACTION 승인 후 등록 완료 E2E. CEO 성공 #8 시나리오 4 충족.

### CEO 성공 항목 (이번 주 연관)

| # | 항목 | W8 역할 |
|---|------|---------|
| 4 | 단일 승인 게이트 | COST_ACTION → Invoice 등록 |
| 8 | E2E 4 | 시나리오 4 전체 Pass |

### 핵심 산출

- `api/cfo/mail-draft` E2E 1건
- COST_ACTION UAT (재무+대표)
- P3 phase sign-off

---

## 2. 게이트 (Exit Criteria)

| # | 기준 | 측정 방법 | Pass |
|---|------|-----------|:----:|
| G1 | 시나리오 4 전체 | step 1–3 Pass | ☐ |
| G2 | mail-draft | 1 mail → Invoice draft | ☐ |
| G3 | Read-only draft | 승인 전 CFO 등록 X | ☐ |
| G4 | COST_ACTION | 승인 후 등록 200 | ☐ |
| G5 | P3-FIN-002 | 재무+대표 UAT 서명 | ☐ |
| G6 | Build | `pnpm build` green | ☐ |

**Exit:** G1–G6 Pass → W9 P4 Sangfor 착수.

---

## 3. 선행 조건

| 항목 | 출처 | 상태 |
|------|------|:----:|
| W7 게이트 | [W07-P3-Finance-1](W07-P3-Finance-1.md) | ☐ |
| `finance-ui-v2` merged | W7 PR | ☐ |
| P3-FIN-001 분류 문서 | W7 | ☐ |
| approval-gateway COST_ACTION | W3 | 🟡 |
| CFO :4100 KPI | W7 | ☐ |

---

## 4. PR·브랜치

### W7에서 머지 예정

| Repo | 브랜치 | 범위 | 상태 |
|------|--------|------|:----:|
| AIOSv2 | `cursor/finance-ui-v2` | KPI·/finance UI | W7 merge |

### W8 작업 (finance-ui-v2 연장 또는 main)

| 범위 | 파일 |
|------|------|
| mail-draft | `api/cfo/mail-draft/route.ts` |
| mail bridge | `lib/cfo/mail-bridge.ts` |
| COST_ACTION | approval-gateway 연동 |

```bash
cd /Users/jmpark/Playground/AIOSv2_integration
git checkout cursor/finance-ui-v2  # 또는 main
# mail-draft 커밋
```

---

## 5. 티켓 상세

| ID | 담당 | 협업 | 작업 | 산출 | Verification | Done |
|----|------|------|------|------|--------------|:----:|
| P3-ENG-002 | 엔지니어 | 재무 | mail→CFO draft bridge | mail-draft route | 1 E2E | 🟡 |
| P3-FIN-002 | 재무 | 대표 | COST_ACTION UAT | UAT 기록 | 시나리오 4 | 🟡 |

### 시나리오 4 (전체)

| Step | 액터 | 액션 | 기대 | Done |
|------|------|------|------|:----:|
| 1 | 재무 | `/finance` KPI 로드 | BFF → :4100 | ☐ |
| 2 | 재무 | Invoice draft 생성 | read-only until 승인 | ☐ |
| 3 | 대표 | COST_ACTION 승인 | 등록 완료 | ☐ |

---

## 6. 일일 실행 (D1–D5)

### D1 — mail-bridge·draft API

```bash
cd /Users/jmpark/Playground/AIOSv2_integration
cat apps/web/src/lib/cfo/mail-bridge.ts
cat apps/web/src/app/api/cfo/mail-draft/route.ts

curl -X POST http://127.0.0.1:3110/api/cfo/mail-draft \
  -H 'Content-Type: application/json' \
  -d '{
    "mailId": "fixture-001",
    "subject": "세금계산서 요청",
    "amount": 1100000,
    "vendor": "ACME Corp"
  }' | jq .
```

- P3-ENG-002 draft 생성, status=PENDING_APPROVAL

### D2 — read-only until 승인

```bash
# draft 상태에서 CFO 직접 등록 시도 → block
curl -s http://127.0.0.1:3110/api/cfo/invoices?status=draft | jq .
curl -X POST http://127.0.0.1:4100/api/invoices \
  -H 'Content-Type: application/json' \
  -d '{"draftId":"..."}' -i  # proxy 경유만 허용
```

- ADR-APPROVAL-001 준수
- `/finance`에 draft 목록 표시

### D3 — COST_ACTION 승인 flow

```bash
# 미승인 cost action → 409
curl -X POST http://127.0.0.1:3110/api/cfo/invoices \
  -H 'Content-Type: application/json' \
  -d '{"draftId":"<id>","action":"register"}' -i

# /approvals에서 COST_ACTION 승인
curl -s http://127.0.0.1:3110/api/approvals?type=COST_ACTION | jq .
curl -X PATCH http://127.0.0.1:3110/api/approvals/<id> \
  -d '{"action":"approve"}' | jq .
```

- W3 approval-gateway 재사용

### D4 — 승인 후 등록 E2E

```bash
curl -X POST http://127.0.0.1:3110/api/cfo/invoices \
  -H 'Content-Type: application/json' \
  -d '{"draftId":"<id>","action":"register"}' -i

curl -s http://127.0.0.1:4100/api/invoices/<id> | jq .
```

- P3-FIN-002 재무·대표 UAT 참관

### D5 — 시나리오 4·P3 마감

```bash
node /Users/jmpark/Playground/scripts/e2e-scenarios.mjs --scenario 4 2>/dev/null || echo "수동"
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm build
node /Users/jmpark/Playground/scripts/c-stack-health.mjs
```

- P3 sign-off, `cursor/sangfor-appshell` kickoff

---

## 7. 구현 체크리스트

### AIOSv2_integration

| 경로 | 작업 | Done |
|------|------|:----:|
| `apps/web/src/app/api/cfo/mail-draft/route.ts` | POST draft | 🟡 |
| `apps/web/src/lib/cfo/mail-bridge.ts` | mail parse → draft | 🟡 |
| `apps/web/src/lib/blro/approval-gateway.ts` | COST_ACTION gate | 🟡 |
| `apps/web/src/app/(dashboard)/finance/page.tsx` | draft list UI | 🟡 |
| `apps/web/src/app/(dashboard)/approvals/page.tsx` | COST_ACTION queue | ✅ |

### Playground

| 경로 | 작업 | Done |
|------|------|:----:|
| `docs/36-E2E-SCENARIO-001.md` | 시나리오 4 | ✅ |
| `docs/35-ADR-APPROVAL-001.md` | 승인 후 write | ✅ |

---

## 8. E2E·검증

### 사전 조건

```bash
docker compose -f /Users/jmpark/Playground/docker-compose.c-stack.yml up -d
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm run integration:stack
curl -sf http://127.0.0.1:4100/api/health
node /Users/jmpark/Playground/scripts/c-stack-health.mjs
```

### 시나리오 4 (전체)

```bash
# Step 1
curl -s http://127.0.0.1:3110/api/cfo/kpi | jq .

# Step 2
curl -X POST http://127.0.0.1:3110/api/cfo/mail-draft \
  -H 'Content-Type: application/json' -d '{...}'

# Step 3: 승인 후 register
node /Users/jmpark/Playground/scripts/e2e-scenarios.mjs
```

### Build

```bash
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm build
```

---

## 9. 리스크·블로커

| 리스크 | 영향 | 완화 |
|--------|------|------|
| W7 미완료 | step 1 fail | hard gate |
| COST_ACTION 미연동 | step 3 block | W3 gateway |
| CFO write API 부재 | register fail | :4100 endpoint 협의 |
| mail-draft 파싱 오류 | draft 품질 | P3-FIN-001 분류 적용 |
| 이중 승인 경로 | ADR 위반 | BFF 단일 entry |

---

## 10. Handoff

### W9에 전달

1. **P3 완료** — Finance KPI + COST_ACTION E2E
2. **승인 패턴** — gateway 재사용 (P4/P5)
3. **미완** — `/sangfor` AppShell, device Bronze

### W9 선행 확인

- [ ] 시나리오 4 Pass
- [ ] P3-FIN-002 UAT 서명
- [ ] `finance-ui-v2` final merge
- [ ] Sangfor :3500 health OK
- [ ] `cursor/sangfor-appshell` 브랜치 생성
