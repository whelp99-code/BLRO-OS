# W4 — P2 Data Plane (1/3)

> **Phase:** P2 · **Week:** W4 · **기간:** 1주 (D1–D5)  
> **게이트:** B/S/G 정의서 v2 · 5 yaml validator · registry 5/5 · data-plane 패키지 build  
> **현재 Done:** **스캐폴딩** — AIOS #3 main `c994213`, yaml 5종·패키지 골격 존재  
> **진입점:** `http://localhost:3110/command` (Data Plane은 API·패키지 중심)  
> **기준 커밋:** BLRO-OS `main` · AIOSv2 `c994213`

---

## 1. 개요

### 주간 목표

**Bronze / Silver / Gold** 데이터 플레인의 정의·스키마·패키지 기반을 확정한다. 5종 yaml(`email`, `project`, `device`, `invoice`, `payment`) validator + registry, Redis stream publisher, 전사 워크숍으로 B/S/G 경계를 문서화한다.

### CEO 성공 항목 (이번 주 연관)

| # | 항목 | W4 역할 |
|---|------|---------|
| 3 | 메일→Project 후보 | yaml·registry·패키지 기반 (E2E는 W5–6) |
| 7 | 단일 DB :5435 | Gold projection → BLRO Prisma models |

### 핵심 산출

- [p2-data-plane-definitions](../p2-data-plane-definitions.md) **v2** (워크숍 산출)
- `packages/data-plane/` — ingest, normalize, registry, publisher
- 5 yaml schemas + validator 통과
- Redis stream `aios:data-plane:events` xadd 확인

---

## 2. 게이트 (Exit Criteria)

| # | 기준 | 측정 방법 | Pass |
|---|------|-----------|:----:|
| G1 | B/S/G 정의 v2 | P2-PM-001 워크숍 서명 | ☐ |
| G2 | 5 yaml valid | 각 schema validator CLI | ☐ |
| G3 | Registry 5/5 | `registry.ts` entity 등록 | ☐ |
| G4 | Package build | `pnpm --filter @aios/data-plane build` | ☐ |
| G5 | Redis publisher | xadd `aios:data-plane:events` | ☐ |
| G6 | P2 yaml 티켓 | P2-PRE/FIN/PM yaml 티켓 ✅ | 🟡 |

**Exit:** G1–G5 Pass → W5 mail hook·dedup 운영화.

---

## 3. 선행 조건

| 항목 | 출처 | 상태 |
|------|------|:----:|
| W3 P1 게이트 | [W03-P1-Command-2](W03-P1-Command-2.md) | ☐ |
| P0 DB :5435 | W1 | ✅ |
| Redis :6382 | W1 | ✅ |
| AIOS #3 data-plane | main 스캐폴딩 | ✅ |
| organizationId | M3 prisma-queries | ✅ |

---

## 4. PR·브랜치

### 기반 (머지됨)

| Repo | PR | 브랜치 | 범위 | 상태 |
|------|-----|--------|------|:----:|
| [AIOSv2](https://github.com/whelp99-code/AIOSv2_integration) | #3 | `cursor/data-plane-p2` | packages/data-plane 스캐폴딩 | main `c994213` |

### W4 작업 (main 또는 소규모 PR)

| 범위 | 내용 |
|------|------|
| yaml validator | 5 schema JSON Schema / zod |
| registry 완성 | 5/5 entity |
| definitions v2 | 문서 워크숍 |

Follow-up `cursor/data-plane-ops` — **W5**에서 hook·dedup UI

---

## 5. 티켓 상세

| ID | 담당 | 협업 | 작업 | 산출 | Verification | Done |
|----|------|------|------|------|--------------|:----:|
| P2-PM-001 | 운영PM | 전원 | Bronze/Silver/Gold 워크숍 | p2-definitions v2 | 전원 서명 | 🟡 |
| P2-PRE-001 | 프리세일즈 | 엔지니어 | device yaml | `schemas/device.yaml` | validator pass | ✅ |
| P2-SAL-001 | 영업 | 엔지니어 | customer/project yaml | `schemas/project.yaml` | MVP 5종 | 🟡 |
| P2-FIN-001 | 재무 | 엔지니어 | invoice·payment yaml | invoice/payment.yaml | validator pass | ✅ |
| P2-PM-002 | 운영PM | 엔지니어 | email·project yaml | email/project.yaml | validator pass | ✅ |
| P2-ENG-001 | 엔지니어 | 운영PM | data-plane 패키지 | `packages/data-plane/` | build | ✅ |
| P2-ENG-002 | 엔지니어 | 전원 | yaml registry 5/5 | `registry.ts` | 5 entity | 🟡 |
| P2-ENG-004 | 엔지니어 | — | Redis publisher | `publisher.ts` | xadd stream | ✅ |

---

## 6. 일일 실행 (D1–D5)

### D1 — B/S/G 워크숍

```bash
# 참석: 운영PM, 엔지니어, 영업, 재무, 프리세일즈
cat /Users/jmpark/Playground/docs/p2-data-plane-definitions.md
ls /Users/jmpark/Playground/AIOSv2_integration/packages/data-plane/schemas/
```

- Bronze: raw ingest (email headers, device snmp, invoice pdf meta)
- Silver: normalized per yaml
- Gold: `Project`, `Customer` BLRO projection
- P2-PM-001 v2 초안 합의

### D2 — yaml validator 구현

```bash
cd /Users/jmpark/Playground/AIOSv2_integration/packages/data-plane
ls schemas/*.yaml
pnpm build
node -e "
  const { loadRegistry } = require('./dist/registry.js');
  console.log(loadRegistry());
"
```

- 5 yaml 각각 sample payload validate
- P2-ENG-002 registry 5/5 등록

### D3 — Bronze ingest·Silver normalize

```bash
cat packages/data-plane/src/bronze/ingest.ts
cat packages/data-plane/src/silver/normalize.ts
cat packages/data-plane/src/gold/project-from-mail.ts
pnpm --filter @aios/data-plane test 2>/dev/null || pnpm --filter @aios/data-plane build
```

- ingest → normalize 파이프라인 단위 테스트
- P2-SAL-001 project.yaml 영업 필드 검수

### D4 — Redis publisher

```bash
redis-cli -p 6382 XINFO STREAM aios:data-plane:events 2>/dev/null || echo "stream empty OK"
# publisher 수동 호출 (앱 또는 스크립트)
redis-cli -p 6382 XRANGE aios:data-plane:events - + COUNT 5
```

- P2-ENG-004 xadd 이벤트 확인
- dedup key 정책 문서화 (`organizationId` + normalized name)

### D5 — 정의서 v2·게이트

```bash
cd /Users/jmpark/Playground/AIOSv2_integration && pnpm build
node /Users/jmpark/Playground/scripts/c-stack-health.mjs
# definitions v2 PR
git add docs/p2-data-plane-definitions.md packages/data-plane/
```

- P2-PM-001 v2 서명, W5 hook 일정 확정

---

## 7. 구현 체크리스트

### AIOSv2_integration — packages/data-plane

| 경로 | 작업 | Done |
|------|------|:----:|
| `packages/data-plane/schemas/email.yaml` | 메일 Bronze 필드 | ✅ |
| `packages/data-plane/schemas/project.yaml` | Project Gold 필드 | ✅ |
| `packages/data-plane/schemas/device.yaml` | Sangfor device | ✅ |
| `packages/data-plane/schemas/invoice.yaml` | 재무 invoice | ✅ |
| `packages/data-plane/schemas/payment.yaml` | 재무 payment | ✅ |
| `packages/data-plane/src/registry.ts` | 5 entity registry | 🟡 |
| `packages/data-plane/src/bronze/ingest.ts` | raw ingest | ✅ |
| `packages/data-plane/src/silver/normalize.ts` | yaml normalize | ✅ |
| `packages/data-plane/src/gold/project-from-mail.ts` | mail→project | 🟡 |
| `packages/data-plane/src/publisher.ts` | Redis xadd | ✅ |
| `packages/data-plane/src/index.ts` | public API export | ✅ |

### AIOSv2_integration — web (스캐폴딩)

| 경로 | 작업 | Done |
|------|------|:----:|
| `apps/web/src/app/api/projects/from-mail/route.ts` | from-mail API 스텁 | 🟡 |

### Playground

| 경로 | 작업 | Done |
|------|------|:----:|
| `docs/p2-data-plane-definitions.md` | v2 확정 | 🟡 |
| `docs/36-E2E-SCENARIO-001.md` | 시나리오 2 참조 | ✅ |

---

## 8. E2E·검증

### 인프라

```bash
docker compose -f /Users/jmpark/Playground/docker-compose.c-stack.yml up -d
node /Users/jmpark/Playground/scripts/c-stack-health.mjs
```

### Data Plane 단위 검증

```bash
cd /Users/jmpark/Playground/AIOSv2_integration

# Package build
pnpm --filter @aios/data-plane build

# Registry
node -e "const r=require('./packages/data-plane/dist/registry.js'); console.log(Object.keys(r.loadRegistry?.()||r))"

# Redis stream
redis-cli -p 6382 PING
redis-cli -p 6382 XLEN aios:data-plane:events

# Full monorepo build
pnpm build
```

### W4 E2E 범위

시나리오 2 **전체는 W6**. W4는 yaml·registry·publisher만.

---

## 9. 리스크·블로커

| 리스크 | 영향 | 완화 |
|--------|------|------|
| yaml 필드 불일치 | Silver normalize fail | D1 워크숍 SSOT |
| registry 4/5 | G3 fail | D2 entity 누락 체크리스트 |
| Redis stream 미생성 | publisher 무음 | D4 redis-cli 확인 |
| project.yaml 영업 미검수 | Gold 필드 오류 | P2-SAL-001 D3 세션 |
| P1 미완료 | 우선순위 충돌 | W3 게이트 hard gate |

---

## 10. Handoff

### W5에 전달

1. **정의 v2** — B/S/G·dedup 정책 문서
2. **패키지 green** — ingest·normalize·publisher
3. **미완** — mail hook 운영화, Prisma B/S/G DB 연동, Customer seed
4. **PR** — `cursor/data-plane-ops` 브랜치 착수

### W5 선행 확인

- [ ] 5 yaml validator pass
- [ ] registry 5/5
- [ ] `aios:data-plane:events` xadd 1건 이상
- [ ] p2-definitions v2 서명
- [ ] mail-intelligence :3010 기동 확인
