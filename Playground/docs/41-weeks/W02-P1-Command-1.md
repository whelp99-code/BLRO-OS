# W2 — P1 Command Center (1/2)

> **Phase:** P1 · **Week:** W2 · **기간:** 1주 (D1–D5)  
> **게이트:** 브리핑 v2 확정 · AppShell 전 route 통일 · E2E 시나리오 1 step 1–3  
> **현재 Done:** **미착수** — AIOS #4 스캐폴딩만 main `c994213`에 존재  
> **진입점:** `http://localhost:3110/command`  
> **기준 커밋:** BLRO-OS `main` · AIOSv2 `c994213`

---

## 1. 개요

### 주간 목표

대표가 **매일 아침 한 URL**(`:3110/command`)에서 업무 브리핑을 본다. health 카드가 아닌 **5필드 실데이터 브리핑**(긴급메일·승인·파이프라인·CFO·Sangfor)과 AppShell **전 route same-tab** 통일이 이번 주 핵심이다.

### CEO 성공 항목 (이번 주 연관)

| # | 항목 | W2 역할 |
|---|------|---------|
| 1 | :3110 한 URL 아침 브리핑 | `buildBriefing()` 실데이터 + 5필드 UI |
| 2 | 메일·CFO·Sangfor 같은 탭 | `/mail`, `/finance`, `/sangfor` AppShell 내 프록시 |
| 4 | 단일 승인 게이트 (기반) | `/approvals` UI + approval-gateway 연동 준비 |

### 핵심 산출

- [p1-command-center-briefing-spec](../p1-command-center-briefing-spec.md) **v2** (운영PM·대표 서명)
- `cursor/command-v2-real-briefing` PR — AppShell + 실데이터 브리핑
- [37-BLRO-UI-포팅](../37-BLRO-UI-포팅-체크리스트.md) P1 항목 8/12 → 8/8 목표 (W2 범위)

---

## 2. 게이트 (Exit Criteria)

| # | 기준 | 측정 방법 | Pass |
|---|------|-----------|:----:|
| G1 | 브리핑 스펙 v2 | P1-PM-001 대표 승인 서명 | ☐ |
| G2 | 5필드 JSON | `GET /api/command/briefing` mail·approvals·projects·cfo·sangfor | ☐ |
| G3 | AppShell 6 route | command, mail, finance, sangfor, approvals, presales same layout | ☐ |
| G4 | Same-tab | 시나리오 1 step 3 — 새 탭 X | ☐ |
| G5 | Build | `pnpm build` green | ☐ |
| G6 | 37 체크리스트 | P1 항목 1–4, 7–11 (W2 범위) Pass | ☐ |

**Exit:** G1–G6 Pass → W3 승인 게이트 UAT 착수.

---

## 3. 선행 조건

| 항목 | 출처 | 상태 |
|------|------|:----:|
| W1 게이트 G1–G6 | [W01-P0-기반](W01-P0-기반.md) | ~85% |
| health 8/8 | `c-stack-health.mjs` | ✅ |
| P1 스캐폴딩 (AIOS #4) | briefing API·SSE·approvals route | 🟡 |
| mail-intelligence :3010 | P0-REP-002 | ✅ |
| CFO :4100, Sangfor :3500 | health registry | ✅/🟡 |

---

## 4. PR·브랜치

### 기반 (머지됨)

| Repo | PR | 범위 | 상태 |
|------|-----|------|:----:|
| [AIOSv2](https://github.com/whelp99-code/AIOSv2_integration) | #4 `cursor/command-approval-p1` | briefing·SSE·approvals 스캐폴딩 | main `c994213` |

### 이번 주 목표 PR

| Repo | 브랜치 | 범위 | 상태 |
|------|--------|------|:----:|
| AIOSv2 | `cursor/command-v2-real-briefing` | AppShell 전면 통일 + `buildBriefing()` 실데이터 | **OPEN (W2)** |

```bash
cd /Users/jmpark/Playground/AIOSv2_integration
git checkout -b cursor/command-v2-real-briefing main
# 작업 후
gh pr create --title "P1: Command v2 real briefing + AppShell" \
  --body "W2 gate: briefing 5-field real data, same-tab routes"
```

---

## 5. 티켓 상세

| ID | 담당 | 협업 | 작업 | 산출 | Verification | Done |
|----|------|------|------|------|--------------|:----:|
| P1-PM-001 | 운영PM | 대표 | 브리핑 5필드 정의서 v2 확정 | [p1-briefing-spec](../p1-command-center-briefing-spec.md) v2 | 대표 서명 | 🟡 |
| P1-ENG-001 | 엔지니어 | 운영PM | AppShell·레이아웃 전 route 통일 | `(dashboard)/layout.tsx` | build green | 🟡 |
| P1-ENG-002 | 엔지니어 | 운영PM | 6 route same-tab (`/mail`,`/sangfor` 포함) | next.config rewrite | 시나리오 1-3 | 🟡 |
| P1-ENG-003 | 엔지니어 | 운영PM | `GET /api/command/briefing` 실데이터 | `briefing.ts` | JSON 5필드 non-mock | 🟡 |
| P1-ENG-004 | 엔지니어 | — | SSE `/api/command/briefing/stream` 15s | stream route | EventSource 30s 내 | ✅ |

### 37-BLRO-UI 체크리스트 (W2 범위)

| # | 항목 | Verification | Done |
|---|------|--------------|:----:|
| 1 | AppShell layout | `(dashboard)/layout.tsx` | 🟡 |
| 2 | 사이드바 6 route | sidebar nav links | 🟡 |
| 3 | `/command` 페이지 | 5필드 카드 UI | 🟡 |
| 4 | `/approvals` UI | 승인 큐 렌더 | ✅ |
| 7 | mail proxy same-tab | `MAIL_INTELLIGENCE_URL` rewrite | ☐ |
| 8 | finance BFF stub | `/api/cfo/*` proxy | 🟡 |
| 9 | sangfor placeholder | `/sangfor` in AppShell | 🟡 |
| 10 | shadcn 충돌 해소 | duplicate component 제거 | ☐ |
| 11 | next.config rewrite | mail, cfo, sangfor | 🟡 |

---

## 6. 일일 실행 (D1–D5)

### D1 — 브리핑 스펙·AppShell 감사

```bash
cd /Users/jmpark/Playground/AIOSv2_integration
git checkout -b cursor/command-v2-real-briefing
find apps/web/src/app -name 'page.tsx' | grep -E 'mail|sangfor|finance|command|approvals'
cat apps/web/src/components/blro/app-shell.tsx
cat apps/web/next.config.ts   # 또는 next.config.mjs
```

- 운영PM: p1-briefing-spec v2 초안 → 대표 리뷰
- 엔지니어: legacy route (`/dashboard`, 루트 `mail/page.tsx`) 목록 작성

### D2 — AppShell 통일·사이드바

```bash
# mail, sangfor를 (dashboard) 그룹으로 이동
mv apps/web/src/app/mail apps/web/src/app/(dashboard)/mail 2>/dev/null || true
mv apps/web/src/app/sangfor apps/web/src/app/(dashboard)/sangfor 2>/dev/null || true

# 빌드 확인
cd /Users/jmpark/Playground/AIOSv2_integration/apps/web && pnpm build
```

- P1-ENG-001, P1-ENG-002 — layout·sidebar 6 route

### D3 — buildBriefing() 실데이터

```bash
# briefing 소스 확인
cat apps/web/src/lib/blro/briefing.ts
curl -s http://127.0.0.1:3110/api/command/briefing | jq .
curl -s http://127.0.0.1:3010/api/outlook/status
curl -s http://127.0.0.1:4100/api/health
curl -s http://127.0.0.1:3500/api/system/health
```

- MailItem·ApprovalItem·Project count → briefing fields
- P1-ENG-003 mock 제거

### D4 — next.config rewrite·same-tab

```bash
# rewrite 검증
grep -A20 'rewrites' apps/web/next.config.ts
curl -sI http://127.0.0.1:3110/mail | head -5
curl -sI http://127.0.0.1:3110/finance | head -5
curl -sI http://127.0.0.1:3110/sangfor | head -5
```

- P1-ENG-002 same-tab (target=_blank 금지)
- shadcn 충돌 해소 (37 #10)

### D5 — PR·시나리오 1 스모크

```bash
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm build
node /Users/jmpark/Playground/scripts/c-stack-health.mjs
# 브라우저: http://localhost:3110/command
# 시나리오 1 step 1–3 수동
gh pr create --base main --head cursor/command-v2-real-briefing
```

- P1-PM-001 v2 서명, PR 리뷰 요청

---

## 7. 구현 체크리스트

### AIOSv2_integration

| 경로 | 작업 | Done |
|------|------|:----:|
| `apps/web/src/app/(dashboard)/layout.tsx` | AppShell wrapper | 🟡 |
| `apps/web/src/components/blro/app-shell.tsx` | sidebar 6 nav | 🟡 |
| `apps/web/src/app/(dashboard)/command/page.tsx` | 5필드 브리핑 UI | 🟡 |
| `apps/web/src/app/(dashboard)/approvals/page.tsx` | 승인 큐 | ✅ |
| `apps/web/src/app/(dashboard)/mail/page.tsx` | mail proxy/iframe | ☐ |
| `apps/web/src/app/(dashboard)/finance/page.tsx` | CFO stub 위젯 | 🟡 |
| `apps/web/src/app/(dashboard)/sangfor/page.tsx` | sangfor placeholder | 🟡 |
| `apps/web/src/lib/blro/briefing.ts` | buildBriefing() 실데이터 | 🟡 |
| `apps/web/src/app/api/command/briefing/route.ts` | GET 5필드 | 🟡 |
| `apps/web/src/app/api/command/briefing/stream/route.ts` | SSE 15s | ✅ |
| `apps/web/next.config.ts` | mail·cfo·sangfor rewrite | 🟡 |
| `apps/web/src/lib/blro/approval-gateway.ts` | gateway 스캐폴딩 | 🟡 |

### Playground

| 경로 | 작업 | Done |
|------|------|:----:|
| `docs/p1-command-center-briefing-spec.md` | v2 확정 | 🟡 |
| `docs/37-BLRO-UI-포팅-체크리스트.md` | W2 항목 체크 | 🟡 |
| `docs/36-E2E-SCENARIO-001.md` | 시나리오 1 참조 | ✅ |

### 제거·deprecate (W2)

| 경로 | 작업 |
|------|------|
| `apps/web/src/app/dashboard/page.tsx` | redirect → `/command` |
| `apps/web/src/app/mail/page.tsx` (루트) | `(dashboard)/mail`로 통합 |

---

## 8. E2E·검증

### 사전 조건

```bash
docker compose -f /Users/jmpark/Playground/docker-compose.c-stack.yml up -d
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm run integration:stack
node /Users/jmpark/Playground/scripts/c-stack-health.mjs
```

### 시나리오 1 (W2 범위 — [36-E2E](../36-E2E-SCENARIO-001.md))

| Step | 액션 | 기대 | Pass |
|------|------|------|:----:|
| 1 | `http://localhost:3110/command` 접속 | 200, 5필드 브리핑 | ☐ |
| 2 | SSE `/api/command/briefing/stream` | 30s 내 갱신 이벤트 | ☐ |
| 3 | 메일·CFO·Sangfor 위젯 클릭 | 같은 탭 내 프록시 | ☐ |

### API 검증

```bash
# 5필드 브리핑
curl -s http://127.0.0.1:3110/api/command/briefing | \
  jq 'keys | sort'   # approvals, cfo, mail, projects, sangfor

# SSE (15s 대기)
curl -N http://127.0.0.1:3110/api/command/briefing/stream --max-time 20

# Build
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm build
```

---

## 9. 리스크·블로커

| 리스크 | 영향 | 완화 |
|--------|------|------|
| legacy route 잔존 | same-tab 실패 | D1 감사 → D2 일괄 `(dashboard)` 이동 |
| mock briefing 잔존 | CEO #1 미충족 | MailItem·ApprovalItem DB seed |
| shadcn 중복 | build fail | 37 #10 — component alias 통일 |
| CFO :4100 down | cfo 필드 degraded | health 표시 + graceful fallback |
| 스펙 v2 미서명 | G1 block | D1 운영PM·대표 세션 고정 |

---

## 10. Handoff

### W3에 전달

1. **AppShell green** — 6 route same-tab, legacy 제거
2. **브리핑 v2** — 실데이터 5필드 + SSE
3. **승인 기반** — `/approvals` UI, gateway 스캐폴딩 → W3 COST_ACTION·SEND_EMAIL UAT
4. **미완** — approval-gateway 409 flow, P1-PM-002 09:00 루틴

### W3 선행 확인

- [ ] 시나리오 1 step 1–3 Pass
- [ ] `cursor/command-v2-real-briefing` merged
- [ ] 37 체크리스트 W2 항목 8/8
- [ ] `http://localhost:3110/approvals` 승인 큐 로드
