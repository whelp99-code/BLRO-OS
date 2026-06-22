# W9 — P4 Sangfor (1/2)

> **Phase:** P4 · **Week:** W9 · **기간:** 1주 (D1–D5)  
> **게이트:** `/sangfor` AppShell same-tab · BFF :3500 정리 · device Bronze ingest  
> **현재 Done:** **스캐폴딩** — placeholder page, adapter routes 🟡  
> **진입점:** `http://localhost:3110/sangfor`  
> **기준 커밋:** BLRO-OS `main` · AIOSv2 `c994213`

---

## 1. 개요

### 주간 목표

Sangfor MCP를 **AppShell 하위 same-tab**으로 통합한다. BFF `:3500` 프록시 정리, device yaml → Bronze ingest (P2 연동), 엔지니어 일일 점검 루틴 초안.

### CEO 성공 항목 (이번 주 연관)

| # | 항목 | W9 역할 |
|---|------|---------|
| 2 | 메일·CFO·Sangfor 같은 탭 | `/sangfor` AppShell 내 BFF |
| 6 | health pass | `:3500/api/system/health` registry |

### 핵심 산출

- PR `cursor/sangfor-appshell` — AppShell 통합
- `api/sangfor/device/ingest` Bronze 연동
- same-tab 검증 (시나리오 1 step 3 sangfor 위젯)

---

## 2. 게이트 (Exit Criteria)

| # | 기준 | 측정 방법 | Pass |
|---|------|-----------|:----:|
| G1 | Same-tab | `:3110/sangfor` AppShell, 새 탭 X | ☐ |
| G2 | BFF :3500 | health + proxy routes | ☐ |
| G3 | Device Bronze | ingest API 1건 | ☐ |
| G4 | Briefing sangfor | command 카드 real health | ☐ |
| G5 | Build | `pnpm build` green | ☐ |
| G6 | PR | `sangfor-appshell` review | ☐ |

**Exit:** G1–G6 Pass → W10 샘플 보고서.

---

## 3. 선행 조건

| 항목 | 출처 | 상태 |
|------|------|:----:|
| W8 P3 게이트 | [W08-P3-Finance-2](W08-P3-Finance-2.md) | ☐ |
| P1 AppShell | W2 | ☐ |
| Sangfor :3500/:3400 | P0-ENG-003 | ✅ |
| device.yaml | P2-PRE-001 | ✅ |
| data-plane Bronze | W4–5 | ☐ |

---

## 4. PR·브랜치

### 기반

| Repo | PR | 범위 | 상태 |
|------|-----|------|:----:|
| AIOSv2 | #5 | sangfor adapter stub | main `c994213` |

### 이번 주 목표 PR

| Repo | 브랜치 | 범위 | 상태 |
|------|--------|------|:----:|
| AIOSv2 | `cursor/sangfor-appshell` | AppShell·BFF·device ingest | **OPEN (W9)** |

```bash
cd /Users/jmpark/Playground/AIOSv2_integration
git checkout -b cursor/sangfor-appshell main
gh pr create --title "P4: Sangfor AppShell + device Bronze" \
  --body "W9 gate: same-tab /sangfor, BFF :3500, device ingest"
```

### W10 follow-up

| 브랜치 | 내용 |
|--------|------|
| `cursor/sangfor-sample-report` | Excel→DOCX/PDF |

---

## 5. 티켓 상세

| ID | 담당 | 협업 | 작업 | 산출 | Verification | Done |
|----|------|------|------|------|--------------|:----:|
| P4-ENG-001 | 엔지니어 | 운영PM | `/sangfor` AppShell + BFF :3500 | sangfor page | same-tab | 🟡 |
| P4-ENG-002 | 엔지니어 | — | sangfor-adapter routes | proxy handlers | test pass | 🟡 |
| P4-ENG-004 | 엔지니어 | 운영PM | Device Bronze ingest | ingest route | P2 연동 | 🟡 |

### 37-BLRO-UI (P4)

| # | 항목 | Done |
|---|------|:----:|
| 9 | sangfor placeholder → 실 UI | 🟡 |
| 11 | next.config sangfor rewrite | 🟡 |

---

## 6. 일일 실행 (D1–D5)

### D1 — sangfor-appshell 브랜치·감사

```bash
cd /Users/jmpark/Playground/AIOSv2_integration
git checkout -b cursor/sangfor-appshell
find apps/web/src/app -path '*sangfor*'
curl -s http://127.0.0.1:3500/api/system/health | jq .
curl -sI http://127.0.0.1:3110/sangfor | head -5
```

- legacy `app/sangfor/page.tsx` → `(dashboard)/sangfor` 확인
- P4-ENG-001 감사

### D2 — BFF proxy·next.config

```bash
cat apps/web/next.config.ts | grep -A5 sangfor
cat apps/web/src/lib/integrations/upstream-urls.ts
curl -s http://127.0.0.1:3110/api/sangfor/system/health 2>/dev/null | jq .
```

- P4-ENG-002 adapter routes
- `:3500` → `:3110/api/sangfor/*` rewrite

### D3 — AppShell UI

```bash
cat apps/web/src/app/(dashboard)/sangfor/page.tsx
open http://localhost:3110/sangfor
# command 브리핑 sangfor 위젯 클릭 → same-tab
open http://localhost:3110/command
```

- iframe 또는 proxy embed (새 탭 금지)
- briefing `sangfor` field 실 health

### D4 — device Bronze ingest

```bash
cat apps/web/src/app/api/sangfor/device/ingest/route.ts
cat packages/data-plane/schemas/device.yaml

curl -X POST http://127.0.0.1:3110/api/sangfor/device/ingest \
  -H 'Content-Type: application/json' \
  -d '{
    "organizationId": "default-org",
    "hostname": "fw-acme-01",
    "model": "AF-2000",
    "ip": "10.0.0.1"
  }' | jq .

redis-cli -p 6382 XRANGE aios:data-plane:events - + COUNT 3
```

- P4-ENG-004 P2 Bronze 연동

### D5 — PR·same-tab 검증

```bash
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm build
node /Users/jmpark/Playground/scripts/c-stack-health.mjs
# 시나리오 1 step 3 sangfor 클릭
gh pr create --base main --head cursor/sangfor-appshell
```

- W10 sample report kickoff

---

## 7. 구현 체크리스트

### AIOSv2_integration

| 경로 | 작업 | Done |
|------|------|:----:|
| `apps/web/src/app/(dashboard)/sangfor/page.tsx` | AppShell UI | 🟡 |
| `apps/web/src/app/sangfor/page.tsx` | legacy 제거/redirect | ☐ |
| `apps/web/src/app/api/sangfor/device/ingest/route.ts` | Bronze ingest | 🟡 |
| `apps/web/src/lib/integrations/upstream-urls.ts` | SANGFOR_URL :3500 | ✅ |
| `apps/web/next.config.ts` | sangfor rewrite | 🟡 |
| `apps/web/src/lib/blro/briefing.ts` | sangfor real health | 🟡 |
| `packages/data-plane/schemas/device.yaml` | device schema | ✅ |

### Sangfor MCP (:3500)

| endpoint | 용도 | Done |
|----------|------|:----:|
| `/api/system/health` | health | ✅ |
| device API | ingest source | 🟡 |

### Playground

| 경로 | 작업 | Done |
|------|------|:----:|
| `scripts/c-stack-health.mjs` | :3500 check | ✅ |

---

## 8. E2E·검증

### 사전 조건

```bash
docker compose -f /Users/jmpark/Playground/docker-compose.c-stack.yml up -d
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm run integration:stack
curl -sf http://127.0.0.1:3500/api/system/health
node /Users/jmpark/Playground/scripts/c-stack-health.mjs
```

### Same-tab (시나리오 1 step 3)

```bash
curl -sf http://127.0.0.1:3110/sangfor -o /dev/null && echo "sangfor OK"
curl -sf http://127.0.0.1:3110/command -o /dev/null && echo "command OK"
# 브라우저: command → sangfor 위젯, URL stays :3110/sangfor
```

### Device ingest

```bash
curl -X POST http://127.0.0.1:3110/api/sangfor/device/ingest \
  -H 'Content-Type: application/json' -d '{"hostname":"test-fw","model":"AF-1000"}'
redis-cli -p 6382 XLEN aios:data-plane:events
```

### Build

```bash
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm build
```

---

## 9. 리스크·블로커

| 리스크 | 영향 | 완화 |
|--------|------|------|
| 새 탭 open | 시나리오 1 fail | target=_blank 제거 |
| :3500 down | sangfor blank | health degraded UI |
| legacy route | duplicate layout | D1 consolidate |
| device schema mismatch | ingest 400 | device.yaml W4 |
| CORS proxy | BFF 502 | next.config rewrite |

---

## 10. Handoff

### W10에 전달

1. **Sangfor AppShell green** — same-tab, BFF
2. **device Bronze** — ingest 1건+
3. **미완** — Excel→DOCX/PDF 샘플 보고서, 일일 점검 루틴 문서

### W10 선행 확인

- [ ] `sangfor-appshell` merged
- [ ] same-tab Pass
- [ ] device ingest event in Redis
- [ ] 프리세일즈 샘플 Excel 준비
- [ ] `cursor/sangfor-sample-report` 브랜치
