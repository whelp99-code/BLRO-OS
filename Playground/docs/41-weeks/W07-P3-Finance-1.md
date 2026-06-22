# W7 — P3 재무 (1/2)

> **Phase:** P3 · **Week:** W7 · **기간:** 1주 (D1–D5)  
> **게이트:** CFO KPI 실데이터 · `/finance` mock 제거 · tax/invoice 분류 문서  
> **현재 Done:** **스캐폴딩** — AIOS #5 BFF stub, `/finance` placeholder  
> **진입점:** `http://localhost:3110/finance`  
> **기준 커밋:** BLRO-OS `main` · AIOSv2 `c994213`

---

## 1. 개요

### 주간 목표

`/finance` 화면에 **실 KPI**를 표시한다. CFO-AIOS `:4100` BFF 프록시에서 mock을 제거하고, 재무팀 tax/invoice/payment 분류 기준을 문서화한다. P3 전 구간 **read-only** 유지.

### CEO 성공 항목 (이번 주 연관)

| # | 항목 | W7 역할 |
|---|------|---------|
| 2 | 메일·CFO·Sangfor 같은 탭 | `/finance` AppShell 내 BFF |
| 8 | E2E 4 (준비) | 시나리오 4 step 1 KPI 로드 |

### 핵심 산출

- PR `cursor/finance-ui-v2` — CFO KPI 실화
- P3-FIN-001 tax/invoice/payment 분류 문서
- `GET /api/cfo/*` 실 JSON
- Finance 위젯 검수 체크리스트

---

## 2. 게이트 (Exit Criteria)

| # | 기준 | 측정 방법 | Pass |
|---|------|-----------|:----:|
| G1 | CFO KPI | `/finance` 위젯 non-mock | ☐ |
| G2 | BFF proxy | `curl /api/cfo/health` → :4100 | ☐ |
| G3 | Read-only | POST invoice without 승인 → block | ☐ |
| G4 | 분류 문서 | P3-FIN-001 재무 서명 | ☐ |
| G5 | Same-tab | `:3110/finance` AppShell | ☐ |
| G6 | Build | `pnpm build` green | ☐ |

**Exit:** G1–G6 Pass → W8 mail→CFO·COST_ACTION UAT.

---

## 3. 선행 조건

| 항목 | 출처 | 상태 |
|------|------|:----:|
| W6 P2 게이트 | [W06-P2-DataPlane-3](W06-P2-DataPlane-3.md) | ☐ |
| P1 AppShell `/finance` | W2 | ☐ |
| CFO :4100 | P0-FIN-001 | 🟡 |
| ADR-APPROVAL-001 | CFO 프록시 우선 | ✅ |
| AIOS #5 adapters | main 스캐폴딩 | 🟡 |

---

## 4. PR·브랜치

### 기반 (머지됨)

| Repo | PR | 범위 | 상태 |
|------|-----|------|:----:|
| AIOSv2 | #5 | `cursor/adapters-p3-p5` | CFO·presales stub | main `c994213` |

### 이번 주 목표 PR

| Repo | 브랜치 | 범위 | 상태 |
|------|--------|------|:----:|
| AIOSv2 | `cursor/finance-ui-v2` | CFO KPI 실화·/finance UI | **OPEN (W7)** |

```bash
cd /Users/jmpark/Playground/AIOSv2_integration
git checkout -b cursor/finance-ui-v2 main
gh pr create --title "P3: finance UI v2 — real CFO KPIs" \
  --body "W7 gate: remove mocks, BFF /api/cfo/*, read-only finance"
```

---

## 5. 티켓 상세

| ID | 담당 | 협업 | 작업 | 산출 | Verification | Done |
|----|------|------|------|------|--------------|:----:|
| P3-FIN-001 | 재무 | 운영PM | tax/invoice/payment 분류 기준 | 분류 문서 | 재무 서명 | ☐ |
| P3-ENG-001 | 엔지니어 | 재무 | BFF `/api/cfo/*` | `cfo/[...path]/route.ts` | KPI JSON | 🟡 |
| P3-ENG-003 | 엔지니어 | 재무 | `/finance` UI | finance/page.tsx | mock 제거 | 🟡 |
| P3-PM-001 | 운영PM | 재무 | Finance 위젯 검수 | 체크리스트 | PM 서명 | ☐ |

### 시나리오 4 (W7 범위 — step 1)

| Step | 액터 | 액션 | 기대 | Done |
|------|------|------|------|:----:|
| 1 | 재무 | `/finance` KPI 로드 | BFF → :4100 | ☐ |

---

## 6. 일일 실행 (D1–D5)

### D1 — CFO 스택·분류 문서

```bash
curl -s http://127.0.0.1:4100/api/health | jq .
curl -s http://127.0.0.1:4100/api/kpi 2>/dev/null | jq . || echo "kpi endpoint TBD"
```

- 재무: P3-FIN-001 tax/invoice/payment 분류표 작성
- 엔지니어: CFO API endpoint inventory

### D2 — BFF proxy 실화

```bash
cd /Users/jmpark/Playground/AIOSv2_integration
cat apps/web/src/app/api/cfo/[...path]/route.ts
grep -r CFO_URL apps/web/
curl -s http://127.0.0.1:3110/api/cfo/health | jq .
curl -s http://127.0.0.1:3110/api/cfo/kpi | jq .
```

- P3-ENG-001 mock → upstream :4100
- error handling: CFO down → degraded widget

### D3 — /finance UI

```bash
cat apps/web/src/app/(dashboard)/finance/page.tsx
open http://localhost:3110/finance
cd /Users/jmpark/Playground/AIOSv2_integration/apps/web && pnpm build
```

- KPI 카드: 매출·미수·세금·송장 대기 (재무 확정 필드)
- P3-ENG-003 placeholder 제거

### D4 — read-only 검증

```bash
# 승인 없이 invoice 생성 시도 → block 기대
curl -X POST http://127.0.0.1:3110/api/cfo/invoices \
  -H 'Content-Type: application/json' \
  -d '{"amount":1000,"vendor":"test"}' -i
```

- ADR-APPROVAL-001: write는 COST_ACTION 승인 후만 (W8)
- command 브리핑 `cfo` 필드 실 health 반영

### D5 — 검수·PR

```bash
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm build
node /Users/jmpark/Playground/scripts/c-stack-health.mjs
# 시나리오 4 step 1
open http://localhost:3110/finance
gh pr create --base main --head cursor/finance-ui-v2
```

- P3-PM-001 위젯 검수, W8 mail-draft kickoff

---

## 7. 구현 체크리스트

### AIOSv2_integration

| 경로 | 작업 | Done |
|------|------|:----:|
| `apps/web/src/app/api/cfo/[...path]/route.ts` | BFF catch-all proxy | 🟡 |
| `apps/web/src/app/(dashboard)/finance/page.tsx` | KPI 위젯 UI | 🟡 |
| `apps/web/src/lib/cfo/mail-bridge.ts` | mail→CFO (W8) | 🟡 |
| `apps/web/src/lib/blro/briefing.ts` | cfo field real | 🟡 |
| `apps/web/src/lib/integrations/upstream-urls.ts` | CFO_URL :4100 | ✅ |
| `apps/web/next.config.ts` | /finance rewrite | 🟡 |

### Playground

| 경로 | 작업 | Done |
|------|------|:----:|
| `docs/35-ADR-APPROVAL-001.md` | CFO 프록시·승인 | ✅ |
| `docs/36-E2E-SCENARIO-001.md` | 시나리오 4 | ✅ |

### CFO-AIOS (:4100)

| endpoint | 용도 | Done |
|----------|------|:----:|
| `/api/health` | health | 🟡 |
| `/api/kpi` | KPI JSON | ☐ |

---

## 8. E2E·검증

### 사전 조건

```bash
docker compose -f /Users/jmpark/Playground/docker-compose.c-stack.yml up -d
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm run integration:stack
curl -sf http://127.0.0.1:4100/api/health
node /Users/jmpark/Playground/scripts/c-stack-health.mjs
```

### 시나리오 4 step 1

```bash
curl -sf http://127.0.0.1:3110/finance -o /dev/null && echo "finance page OK"
curl -s http://127.0.0.1:3110/api/cfo/kpi | jq 'keys'
# 브라우저: KPI 카드 렌더 확인
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
| CFO :4100 down | KPI blank | P0-FIN-001 D1 기동 |
| mock 잔존 | G1 fail | grep mock finance/page |
| 직접 DB write | ADR 위반 | BFF only, approval gate |
| KPI 필드 불일치 | 재무 검수 fail | P3-FIN-001 선행 |
| W2 finance stub | same-tab broken | next.config 확인 |

---

## 10. Handoff

### W8에 전달

1. **Finance UI green** — 실 KPI, read-only
2. **BFF green** — `/api/cfo/*` proxy
3. **분류 문서** — P3-FIN-001
4. **미완** — mail→CFO draft, COST_ACTION 승인→Invoice

### W8 선행 확인

- [ ] `cursor/finance-ui-v2` merged
- [ ] 시나리오 4 step 1 Pass
- [ ] P3-FIN-001 서명
- [ ] W3 approval-gateway COST_ACTION 동작
- [ ] `mail-bridge.ts` W8 작업 착수
