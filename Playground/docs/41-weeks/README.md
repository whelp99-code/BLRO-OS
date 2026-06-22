# C-Stack W1–W12 주차별 상세 문서 인덱스

> **작성·갱신:** 2026-06-22  
> **마스터:** [41-C-Stack-W1-W12-상세-계획서.md](../41-C-Stack-W1-W12-상세-계획서.md)  
> **티켓 전량:** [41-티켓-전량-상세.md](../41-티켓-전량-상세.md)  
> **Done 체크:** [31-CEO-지시용-티켓-체크리스트.md](../31-CEO-지시용-티켓-체크리스트.md)  
> **진입점:** `http://localhost:3110/command`  
> **인프라:** PostgreSQL `:5435` · Redis `:6382`  
> **기준 커밋:** BLRO-OS `main` · AIOSv2 `c994213`

---

## 현재 위치

| 항목 | 상태 |
|------|------|
| W1 (P0) | **~85%** — 인프라·스키마·허브 green, P0-ENG-004·P0-FIN-001 잔여 |
| W2–W11 | **미착수** — follow-up PR 스캐폴딩만 main에 존재 |
| W12 (P6) | health 8/8·E2E 스크립트 스모크 — 제품 E2E 미완 |

**Done 범례:** ✅ 완료 · 🟡 스캐폴딩(게이트 미충족) · ☐ 미착수

---

## 주차별 문서 인덱스

| Week | Phase | 문서 | 한 줄 요약 | 게이트 |
|------|-------|------|------------|--------|
| W1 | P0 | [W01-P0-기반.md](W01-P0-기반.md) | compose :5435/:6382, M1–M2 schema, :3110 hub, M3 prisma-queries | health 8/8 · build |
| W2 | P1 | [W02-P1-Command-1.md](W02-P1-Command-1.md) | 브리핑 v2·AppShell 6 route·`buildBriefing()` 실데이터 | briefing v2 · same-tab |
| W3 | P1 | [W03-P1-Command-2.md](W03-P1-Command-2.md) | 승인 게이트 UAT·09:00 루틴·시나리오 1·3 | E2E 1·3 |
| W4 | P2 | [W04-P2-DataPlane-1.md](W04-P2-DataPlane-1.md) | B/S/G 워크숍·5 yaml·registry·Redis publisher | yaml 5/5 · package build |
| W5 | P2 | [W05-P2-DataPlane-2.md](W05-P2-DataPlane-2.md) | mail hook·from-mail API·Customer seed·dedup | mail E2E step 1–2 |
| W6 | P2 | [W06-P2-DataPlane-3.md](W06-P2-DataPlane-3.md) | Silver→Gold 승인 UI·중복 메일 UAT | E2E 2 전체 |
| W7 | P3 | [W07-P3-Finance-1.md](W07-P3-Finance-1.md) | CFO KPI 실화·`/finance` mock 제거·분류 문서 | CFO KPI · read-only |
| W8 | P3 | [W08-P3-Finance-2.md](W08-P3-Finance-2.md) | mail→CFO draft·COST_ACTION 승인→Invoice | E2E 4 |
| W9 | P4 | [W09-P4-Sangfor-1.md](W09-P4-Sangfor-1.md) | `/sangfor` AppShell·BFF :3500·device Bronze | same-tab |
| W10 | P4 | [W10-P4-Sangfor-2.md](W10-P4-Sangfor-2.md) | Excel→DOCX/PDF 샘플·일일 점검 루틴 | 샘플 보고서 1건 |
| W11 | P5 | [W11-P5-Presales.md](W11-P5-Presales.md) | Proposal Desk·규칙 10종·Partner 5·UAT 3 | presales UAT |
| W12 | P6 | [W12-P6-QA-Ops.md](W12-P6-QA-Ops.md) | E2E 1–4·CI·CFO DB merge·runbook·레드팀 | CEO 8항목 |

---

## Phase 타임라인

```text
W1        W2────W3    W4────W5────W6    W7────W8    W9────W10   W11   W12
P0        P1 Command   P2 Data Plane    P3 Finance  P4 Sangfor  P5    P6 QA
기반      브리핑·승인   메일→Project      CFO·승인    보고서      영업   Go-Live
```

---

## Follow-up PR 로드맵

| PR 브랜치 | Week | Repo | 내용 |
|-----------|------|------|------|
| `cursor/command-v2-real-briefing` | W2 | AIOSv2 | 브리핑 실데이터 + AppShell 전면 통일 |
| `cursor/data-plane-ops` | W5 | AIOSv2 | mail hook 운영화 + dedup UI |
| `cursor/finance-ui-v2` | W7–8 | AIOSv2 | CFO KPI 실화 + mail-draft |
| `cursor/sangfor-appshell` | W9 | AIOSv2 | Sangfor AppShell + device ingest |
| `cursor/sangfor-sample-report` | W10 | AIOSv2 | Excel→DOCX/PDF 샘플 |
| `cursor/presales-desk-v1` | W11 | AIOSv2 | Proposal Desk + rules |

### 머지 완료 PR

| Repo | PR | 범위 |
|------|-----|------|
| [BLRO-OS](https://github.com/whelp99-code/BLRO-OS) | [#2](https://github.com/whelp99-code/BLRO-OS/pull/2) infra·health |
| BLRO-OS | [#3](https://github.com/whelp99-code/BLRO-OS/pull/3) strategy·docs |
| [AIOSv2](https://github.com/whelp99-code/AIOSv2_integration) | [#2](https://github.com/whelp99-code/AIOSv2_integration/pull/2) schema M1–M2 |
| AIOSv2 | #3–#6 | data-plane·command·adapters·hub-ci → `c994213` |

---

## CEO 성공 8항목 ↔ 주차 매핑

| # | 기준 | 완료 주차 |
|---|------|-----------|
| 1 | :3110 아침 브리핑 | W2–3 |
| 2 | 메일·CFO·Sangfor 같은 탭 | W2, W7, W9 |
| 3 | 메일→Project 후보 | W4–6 |
| 4 | 단일 승인 게이트 | W2–3, W8 |
| 5 | Playground 의도적 분리 | W1 |
| 6 | health 전체 pass | W1, W12 |
| 7 | 단일 DB :5435 | W1 |
| 8 | E2E 1–4 | W3, W6, W8, W12 |

---

## 문서 구조 (각 주차 파일 공통)

1. **Header** — Phase, Week, 게이트, Done 상태
2. **§1 개요** — 목표, CEO 성공 항목
3. **§2 게이트** — Exit Criteria (Pass/Fail)
4. **§3 선행 조건** — 전주 의존성
5. **§4 PR·브랜치** — merged / follow-up
6. **§5 티켓 상세** — ID·담당·협업·작업·산출·Verification·Done
7. **§6 일일 실행** — D1–D5 명령 포함
8. **§7 구현 체크리스트** — AIOSv2_integration · Playground 경로
9. **§8 E2E·검증** — docs/36, c-stack-health, build
10. **§9 리스크·블로커**
11. **§10 Handoff** — 다음 주 전달 사항

---

## 관련 참조 문서

| 문서 | 역할 |
|------|------|
| [36-E2E-SCENARIO-001.md](../36-E2E-SCENARIO-001.md) | E2E 시나리오 1–4 SSOT |
| [37-BLRO-UI-포팅-체크리스트.md](../37-BLRO-UI-포팅-체크리스트.md) | AppShell 12항 |
| [p1-command-center-briefing-spec.md](../p1-command-center-briefing-spec.md) | 브리핑 5필드 |
| [p2-data-plane-definitions.md](../p2-data-plane-definitions.md) | Bronze/Silver/Gold |
| [ops/c-stack-runbook.md](../ops/c-stack-runbook.md) | 운영 runbook |

---

## 공통 검증 명령

```bash
# Infra
docker compose -f /Users/jmpark/Playground/docker-compose.c-stack.yml up -d
node /Users/jmpark/Playground/scripts/c-stack-health.mjs

# Build
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm build

# E2E
node /Users/jmpark/Playground/scripts/e2e-scenarios.mjs

# DB
cd /Users/jmpark/Playground/AIOSv2_integration && \
  pnpm --filter @aios/db exec prisma validate
```

---

## AIOSv2 핵심 경로

| 영역 | 경로 |
|------|------|
| App routes | `apps/web/src/app` |
| BLRO lib | `apps/web/src/lib/blro/` |
| Data plane | `packages/data-plane/` |
| DB schema | `packages/db/` |
