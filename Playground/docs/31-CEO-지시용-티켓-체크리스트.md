# CEO 지시용 통합 티켓 체크리스트 (직원 담당)

> **기준:** `30-CEO-직원별-통합-실행-계획서-Multi-Persona.md`  
> **Owner = 사내 직함** (실명은 `32-직원-명단-및-RACI.md` 참조)  
> **협업** = C열, 해당 직원에게 동시 지시  
> **갱신:** 2026-06-22 — [41-티켓-전량-상세](41-티켓-전량-상세.md)와 동기화  
> **Done:** ✅ 완료 · 🟡 스캐폴딩(게이트 미충족) · ☐ 미착수

---

## Phase P0 — 기반 (1주, 레드팀 v2)

| ID | 담당 | 협업 | 지시 요약 | Verification | Done |
|----|------|------|-----------|--------------|:----:|
| P0-REP-001 | **대표** | 엔지니어·운영PM | DB **C-1a**: BLRO schema SSOT + portal additive | `33-C방향` v2 §4 | ✅ |
| P0-REP-002 | **대표** | 운영PM | 메일 :3010 독립 유지 | 결정 기록 | ✅ |
| P0-REP-003 | **대표** | 재무 | CFO 프록시 우선, P3 전 read-only | ADR-APPROVAL-001 | ✅ |
| P0-REP-004 | **대표** | 엔지니어 | BLRO starter → AIOSv2 (**001 승인 후**) | `37-포팅-체크리스트` | 🟡 |
| P0-ENG-001 | **엔지니어** | — | `docker compose -f docker-compose.c-stack.yml up -d` | 5435·6382 TCP | ✅ |
| P0-ENG-002 | **엔지니어** | — | `node scripts/c-stack-health.mjs` | HEALTH-REGISTRY 기준 | ✅ |
| P0-ENG-003 | **엔지니어** | — | Sangfor 3500/3400 health | `:3500/api/system/health` 200 | ✅ |
| P0-ENG-004 | **엔지니어** | — | `AIOS v1` repo archive 라벨 | GitHub archived | 🟡 |
| P0-ENG-005 | **엔지니어** | — | :3110 integrations/health 200 | curl 3110 | ✅ |
| P0-ENG-006 | **엔지니어** | 운영PM | Schema merge M1–M2 (C-1a) | migrate :5435 | ✅ |
| P0-FIN-001 | **재무** | 엔지니어 | CFO `.env`·서버 기동 | `:4100/api/health` 200 | 🟡 |

### P0 Health 경로 (실측 기준)

| 서비스 | URL | 비고 |
|--------|-----|------|
| mail | `http://127.0.0.1:3010/api/outlook/status` | ~~/api/health~~ 없음 |
| AIOSv2 web | `http://127.0.0.1:3110/api/integrations/health` | 200 또는 503 |
| AIOSv2 api | `http://127.0.0.1:3200/api/health` | 200 |
| CFO | `http://127.0.0.1:4100/api/health` | 200 |
| Sangfor | `http://127.0.0.1:3500/api/system/health` | 200 |
| PG / Redis | TCP 5435 / 6382 | compose (portal PG :5434, Redis :6380 별도) |

**검증 명령:** `node scripts/c-stack-health.mjs` 또는 `--required-only` (infra만)

---

## Phase P1 — Command Center (2주)

| ID | 담당 | 협업 | 지시 요약 | Verification | Done |
|----|------|------|-----------|--------------|:----:|
| P1-PM-001 | **운영PM** | 대표 | Command Center 메뉴·브리핑 항목 정의서 | 대표 승인 | 🟡 |
| P1-PM-002 | **운영PM** | 대표 | 일일 브리핑 체크리스트·09:00 루틴 | 1주 시행 | ☐ |
| P1-ENG-001 | **엔지니어** | 운영PM | BLRO AppShell·레이아웃 이식 | build | 🟡 |
| P1-ENG-002 | **엔지니어** | 운영PM | /command·/approvals·/mail·/finance 라우트 | 6 route | 🟡 |
| P1-ENG-003 | **엔지니어** | 운영PM | GET /api/command/briefing | JSON 5필드 | 🟡 |
| P1-ENG-004 | **엔지니어** | — | SSE 브리핑 갱신 | EventSource | ✅ |
| P1-ENG-005 | **엔지니어** | **대표** | 승인 게이트(발송·삭제·견적) | 409 pending | 🟡 |
| P1-PM-003 | **운영PM** | 대표 | P1 UAT·버그 리스트 | 대표 서명 | ☐ |

---

## Phase P2 — 메일 & Data Plane (2주)

| ID | 담당 | 협업 | 지시 요약 | Verification | Done |
|----|------|------|-----------|--------------|:----:|
| P2-PM-001 | **운영PM** | 영업·재무·프리세일즈 | Bronze/Silver/Gold 업무 정의 워크숍 | 정의서 | 🟡 |
| P2-PRE-001 | **프리세일즈** | 엔지니어 | presales·device schema yaml 초안 | 2 yaml | ✅ |
| P2-SAL-001 | **영업** | 엔지니어 | customer·sales schema yaml 초안 | 2 yaml | 🟡 |
| P2-FIN-001 | **재무** | 엔지니어 | invoice·payment schema yaml 초안 | 2 yaml | ✅ |
| P2-PM-002 | **운영PM** | 엔지니어 | email·project·workflow yaml 초안 | 4 yaml | ✅ |
| P2-ENG-001 | **엔지니어** | 운영PM | packages/data-plane 생성 | build | ✅ |
| P2-ENG-002 | **엔지니어** | 전원 | yaml registry·validator | 5/5 (MVP) | 🟡 |
| P2-ENG-003 | **엔지니어** | — | Prisma Bronze/Silver/Gold | db push | ☐ |
| P2-ENG-004 | **엔지니어** | — | Redis Stream publisher | xadd test | ✅ |
| P2-ENG-005 | **엔지니어** | 운영PM | mail data-plane-hook | 1 mail E2E | 🟡 |
| P2-PM-003 | **운영PM** | 영업 | 메일→Project 생성 규칙·중복 정책 | 문서 | 🟡 |
| P2-ENG-006 | **엔지니어** | 운영PM | Project 후보 job 구현 | 1 project | 🟡 |
| P2-ENG-007 | **엔지니어** | 운영PM | Project 상태 API | API test | ☐ |
| P2-SAL-002 | **영업** | 엔지니어 | Customer 필드 정의 검수 | seed 3건 | ☐ |
| P2-ENG-008 | **엔지니어** | 영업 | match-from-mail API | E2E | 🟡 |

---

## Phase P3 — 재무 (2주)

| ID | 담당 | 협업 | 지시 요약 | Verification | Done |
|----|------|------|-----------|--------------|:----:|
| P3-FIN-001 | **재무** | 운영PM | 메일 tax/payment/invoice 분류 기준 | 문서 | ☐ |
| P3-ENG-001 | **엔지니어** | 재무 | BFF /api/cfo/* → 4100 | KPI JSON | 🟡 |
| P3-ENG-002 | **엔지니어** | 재무 | mail→CFO draft bridge | 1건 E2E | 🟡 |
| P3-ENG-003 | **엔지니어** | 재무 | /finance 화면 이식 | 화면 | 🟡 |
| P3-FIN-002 | **재무** | **대표** | 승인 후 Invoice 등록 UAT | 1건 | 🟡 |
| P3-PM-001 | **운영PM** | 재무 | Finance 위젯 요구사항 검수 | 체크리스트 | ☐ |

---

## Phase P4 — Sangfor (2주)

| ID | 담당 | 협업 | 지시 요약 | Verification | Done |
|----|------|------|-----------|--------------|:----:|
| P4-ENG-001 | **엔지니어** | 운영PM | /sangfor BFF → 3500 | UI | 🟡 |
| P4-ENG-002 | **엔지니어** | — | mcp sangfor-adapter | test | 🟡 |
| P4-ENG-003 | **엔지니어** | 프리세일즈 | Excel→DOCX/PDF 샘플 1건 | 파일 | ☐ |
| P4-PRE-001 | **프리세일즈** | 엔지니어 | 샘플 보고서 기술 검수 | 승인 | ☐ |
| P4-ENG-004 | **엔지니어** | 운영PM | Device Bronze ingest | P2 후 | 🟡 |
| P4-PM-001 | **운영PM** | 엔지니어 | 엔지니어 일일 점검 루틴 문서화 | 문서 | ☐ |

---

## Phase P5 — 영업·프리세일즈 (2주)

| ID | 담당 | 협업 | 지시 요약 | Verification | Done |
|----|------|------|-----------|--------------|:----:|
| P5-SAL-001 | **영업** | 프리세일즈 | 제안 기회 규칙 10종 정의 | 표 | ☐ |
| P5-ENG-001 | **엔지니어** | 영업 | 제안 기회 위젯·규칙 엔진 | UI | 🟡 |
| P5-PRE-001 | **프리세일즈** | 엔지니어 | /presales 체크리스트 UAT | 3 시나리오 | 🟡 |
| P5-ENG-002 | **엔지니어** | 프리세일즈 | /presales 화면·draft-reply API | API | ☐ |
| P5-PRE-002 | **프리세일즈** | 영업 | 고객 요청자료 템플릿 5종 | md | 🟡 |
| P5-ENG-003 | **엔지니어** | 프리세일즈 | Proposal Desk 템플릿 UI | UI | 🟡 |
| P5-SAL-002 | **영업** | 운영PM | Partner 데이터·진행 상태 입력 | 5건 | ☐ |
| P5-ENG-004 | **엔지니어** | 영업 | Partner CRUD UI | UI | ☐ |
| P5-ENG-005 | **엔지니어** | 영업 | wiki-sync artifact | run | ☐ |

---

## Phase P6 — QA·운영 (1주)

| ID | 담당 | 협업 | 지시 요약 | Verification | Done |
|----|------|------|-----------|--------------|:----:|
| P6-PM-001 | **운영PM** | 전원 | E2E: 메일→프로젝트→승인 시나리오 | 시나리오 통과 | 🟡 |
| P6-ENG-001 | **엔지니어** | 운영PM | P6 버그 수정 | PM 재테스트 | ☐ |
| P6-ENG-002 | **엔지니어** | — | GitHub Actions CI | green | 🟡 |
| P6-ENG-003 | **엔지니어** | 재무·**대표** | CFO DB merge (선택) | 대표 승인 | 🟡 |
| P6-PM-002 | **운영PM** | **대표** | 운영 매뉴얼·직원 교육 1회 | 교육 완료 | ☐ |

---

## CEO — 이번 주 지시 예시 (직함 기준)

```text
[대표 본인] P0-REP-004 BLRO 포팅 최종 서명 · P1-PM-001 브리핑 v2 승인

[엔지니어 ○○○]
  W2: P1-ENG-001~003 (command-v2-real-briefing PR)
  P0-ENG-004 AIOS v1 GitHub archive 완료

[재무 △△△]
  P0-FIN-001 CFO :4100 상시 기동

[운영PM □□□]
  P1-PM-001 브리핑 5필드 확정 (W2 게이트)
```

---

## 직함별 이번 주 부하 요약

| 직함 | P0 잔여 | P1 (W2) | 합계 |
|------|:-------:|:-------:|------|
| 대표 | 1 (🟡) | 1 (🟡) | 결정·서명 |
| 엔지니어 | 2 (🟡) | 4 (🟡) | command-v2 PR |
| 재무 | 1 (🟡) | 0 | CFO 기동 |
| 운영PM | 0 | 1 (🟡) | 브리핑 spec |
| 영업 | 0 | 0 | P2 W5부터 |
| 프리세일즈 | 0 | 0 | P2 W4부터 |
