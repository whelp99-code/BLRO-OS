# W10 — P4 Sangfor (2/2)

> **Phase:** P4 · **Week:** W10 · **기간:** 1주 (D1–D5)  
> **게이트:** Excel→DOCX/PDF 샘플 1건 · 프리세일즈 검수 · 엔지니어 일일 점검 루틴  
> **현재 Done:** **미착수** — W9 sangfor-appshell 선행  
> **진입점:** `http://localhost:3110/sangfor`  
> **기준 커밋:** BLRO-OS `main` · AIOSv2 `c994213` + W9 merge

---

## 1. 개요

### 주간 목표

P4 Sangfor **마무리**. 프리세일즈가 검수하는 **샘플 보고서 1건**(Excel→DOCX/PDF), 엔지니어 일일 점검 루틴 문서화. Sangfor 영역 운영 준비 완료.

### CEO 성공 항목 (이번 주 연관)

| # | 항목 | W10 역할 |
|---|------|---------|
| 2 | Sangfor 같은 탭 | 보고서 다운로드 same-tab 또는 in-app |
| 6 | health pass | 일일 점검 루틴에 health 포함 |

### 핵심 산출

- PR `cursor/sangfor-sample-report` — 보고서 생성 파이프라인
- 샘플 파일 1건 (DOCX + PDF)
- P4-PM-001 엔지니어 일일 점검 루틴 문서

---

## 2. 게이트 (Exit Criteria)

| # | 기준 | 측정 방법 | Pass |
|---|------|-----------|:----:|
| G1 | 샘플 보고서 | Excel→DOCX/PDF 파일 1건 | ☐ |
| G2 | 프리세일즈 검수 | P4-PRE-001 승인 | ☐ |
| G3 | Same-tab | `/sangfor` 내 보고서 UI | ☐ |
| G4 | 일일 루틴 | P4-PM-001 문서 | ☐ |
| G5 | health | 점검 루틴에 :3500 포함 | ☐ |
| G6 | Build | `pnpm build` green | ☐ |

**Exit:** G1–G6 Pass → W11 P5 Presales 착수.

---

## 3. 선행 조건

| 항목 | 출처 | 상태 |
|------|------|:----:|
| W9 게이트 | [W09-P4-Sangfor-1](W09-P4-Sangfor-1.md) | ☐ |
| `sangfor-appshell` merged | W9 PR | ☐ |
| device Bronze | P4-ENG-004 | ☐ |
| Sangfor :3500 | health | ✅ |
| 프리세일즈 Excel 템플릿 | 사전 준비 | ☐ |

---

## 4. PR·브랜치

### W9에서 머지 예정

| Repo | 브랜치 | 범위 | 상태 |
|------|--------|------|:----:|
| AIOSv2 | `cursor/sangfor-appshell` | AppShell·device ingest | W9 merge |

### 이번 주 목표 PR

| Repo | 브랜치 | 범위 | 상태 |
|------|--------|------|:----:|
| AIOSv2 | `cursor/sangfor-sample-report` | Excel→DOCX/PDF pipeline | **OPEN (W10)** |

```bash
cd /Users/jmpark/Playground/AIOSv2_integration
git checkout -b cursor/sangfor-sample-report main
gh pr create --title "P4: Sangfor sample report Excel→DOCX/PDF" \
  --body "W10 gate: 1 sample report, presales sign-off"
```

---

## 5. 티켓 상세

| ID | 담당 | 협업 | 작업 | 산출 | Verification | Done |
|----|------|------|------|------|--------------|:----:|
| P4-ENG-003 | 엔지니어 | 프리세일즈 | Excel→DOCX/PDF 파이프라인 | 생성 API + 파일 | 1건 산출 | ☐ |
| P4-PRE-001 | 프리세일즈 | 엔지니어 | 샘플 보고서 검수 | 승인 서명 | 품질 OK | ☐ |
| P4-PM-001 | 운영PM | 엔지니어 | 엔지니어 일일 점검 루틴 | 문서 | PM 서명 | ☐ |

### 일일 점검 루틴 (초안)

| 시간 | 항목 | 명령 |
|------|------|------|
| 09:00 | c-stack health | `node scripts/c-stack-health.mjs` |
| 09:05 | Sangfor :3500 | `curl :3500/api/system/health` |
| 09:10 | device ingest log | Redis stream check |
| 09:15 | 이슈 티켓 | 있을 시 기록 |

---

## 6. 일일 실행 (D1–D5)

### D1 — 샘플 Excel·요구사항

```bash
# 프리세일즈: 샘플 Excel 전달
ls /Users/jmpark/Playground/AIOSv2_integration/samples/sangfor/ 2>/dev/null || mkdir -p samples/sangfor
cd /Users/jmpark/Playground/AIOSv2_integration
git checkout -b cursor/sangfor-sample-report
```

- P4-PRE-001: 보고서 필드·레이아웃 요구사항
- P4-ENG-003: 변환 라이브러리 선정 (docx/pdf)

### D2 — 변환 파이프라인 구현

```bash
# API route 또는 sangfor-mcp 연동
find apps/web/src -name '*report*' -o -name '*sangfor*'
curl -X POST http://127.0.0.1:3110/api/sangfor/report/generate \
  -H 'Content-Type: application/json' \
  -d '{"template":"sample","format":["docx","pdf"]}' \
  --output /tmp/sample-report.zip 2>/dev/null || echo "route TBD"
```

- Excel parse → DOCX template fill → PDF export

### D3 — /sangfor UI 통합

```bash
open http://localhost:3110/sangfor
# 보고서 생성·다운로드 버튼
cd apps/web && pnpm build
```

- same-tab 다운로드 (blob URL, 새 탭 X)
- device 목록 + 보고서 섹션

### D4 — 프리세일즈 검수

```bash
ls -la /tmp/sample-report.*
# 프리세일즈: DOCX/PDF 품질 검수 체크리스트
open /tmp/sample-report.docx
open /tmp/sample-report.pdf
```

- P4-PRE-001 승인 또는 수정 요청
- P4-PM-001 일일 점검 루틴 초안 작성

### D5 — P4 마감·PR

```bash
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm build
node /Users/jmpark/Playground/scripts/c-stack-health.mjs
gh pr create --base main --head cursor/sangfor-sample-report
```

- P4 sign-off, W11 presales-desk kickoff

---

## 7. 구현 체크리스트

### AIOSv2_integration

| 경로 | 작업 | Done |
|------|------|:----:|
| `apps/web/src/app/(dashboard)/sangfor/page.tsx` | 보고서 UI 섹션 | ☐ |
| `apps/web/src/app/api/sangfor/report/generate/route.ts` | 생성 API | ☐ |
| `samples/sangfor/sample.xlsx` | 프리세일즈 템플릿 | ☐ |
| `apps/web/src/app/api/sangfor/device/ingest/route.ts` | W9 ingest | 🟡 |

### Playground

| 경로 | 작업 | Done |
|------|------|:----:|
| `docs/ops/c-stack-runbook.md` | Sangfor 점검 추가 | ☐ |
| `scripts/c-stack-health.mjs` | :3500 | ✅ |

### 산출물

| 파일 | 형식 | Done |
|------|------|:----:|
| `sample-report.docx` | DOCX | ☐ |
| `sample-report.pdf` | PDF | ☐ |

---

## 8. E2E·검증

### 사전 조건

```bash
docker compose -f /Users/jmpark/Playground/docker-compose.c-stack.yml up -d
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm run integration:stack
node /Users/jmpark/Playground/scripts/c-stack-health.mjs
curl -sf http://127.0.0.1:3500/api/system/health
```

### Sangfor 통합

```bash
curl -sf http://127.0.0.1:3110/sangfor -o /dev/null
curl -X POST http://127.0.0.1:3110/api/sangfor/device/ingest \
  -H 'Content-Type: application/json' -d '{"hostname":"daily-check"}'
```

### 보고서 생성

```bash
curl -X POST http://127.0.0.1:3110/api/sangfor/report/generate \
  -H 'Content-Type: application/json' \
  -d '{"template":"sample"}' -o /tmp/report.zip
unzip -l /tmp/report.zip
```

### Build

```bash
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm build
```

---

## 9. 리스크·블로커

| 리스크 | 영향 | 완화 |
|--------|------|------|
| W9 미완료 | UI 없음 | hard gate |
| Excel 포맷 불일치 | 변환 fail | D1 템플릿 고정 |
| PDF 품질 | 검수 reject | D4 iteration |
| sangfor-mcp API 부재 | server-side gen | :3500 endpoint 협의 |
| 대용량 파일 | timeout | async job + poll |

---

## 10. Handoff

### W11에 전달

1. **P4 완료** — Sangfor AppShell + 샘플 보고서
2. **운영 루틴** — 일일 점검 문서
3. **device 데이터** — Bronze 이벤트 trace
4. **미완** — Proposal Desk, 기회 규칙 10종

### W11 선행 확인

- [ ] `sangfor-sample-report` merged
- [ ] 샘플 DOCX/PDF 프리세일즈 승인
- [ ] P4-PM-001 루틴 문서
- [ ] `cursor/presales-desk-v1` 브랜치 생성
- [ ] 영업 기회 규칙 초안
