# 13_CODE_STARTER_구성

## 1. 목적

이 문서는 `starter/` 폴더에 포함된 Next.js App Router 코드 골격을 설명한다. 문서 00~12번을 기반으로 실제 개발을 시작할 수 있도록 최소 실행 가능한 구조를 제공한다.

## 2. 포함 코드

```text
starter/
├─ package.json
├─ next.config.mjs
├─ tsconfig.json
├─ tailwind.config.ts
├─ postcss.config.mjs
├─ .env.example
├─ README.md
├─ prisma/
│  ├─ schema.prisma
│  └─ seed.ts
└─ src/
   ├─ app/
   ├─ components/
   ├─ features/
   ├─ hooks/
   ├─ lib/
   ├─ server/
   ├─ stores/
   └─ types/
```

## 3. 구현된 화면 라우트

```text
/dashboard
/customers
/customers/new
/customers/[customerId]
/projects
/projects/new
/projects/[projectId]
/mail
/mail/[mailItemId]
/presales
/proposal
/finance
/agents
/agents/new
/agents/[agentId]
/agents/[agentId]/edit
/command
/workflows
/workflows/new
/workflows/[workflowId]
/workflows/[workflowId]/edit
/approvals
/approvals/[approvalId]
/logs
/runs/[runId]
/settings/organization
/settings/connections
/settings/policies
/settings/templates
```

## 4. 구현된 API 라우트

```text
GET  /api/customers
GET  /api/projects
GET  /api/mail
GET  /api/approvals
GET  /api/runs
GET  /api/finance
GET  /api/agents
POST /api/command/interpret
POST /api/command/run
```

현재 API는 mock 데이터 기반이며, 실제 운영에서는 `src/server/repositories`와 Prisma 연결로 교체한다.

## 5. 핵심 서버 로직

```text
src/server/orchestrator/task-router.ts
src/server/orchestrator/approval-gateway.ts
src/server/services/mail-intelligence-service.ts
src/server/services/presales-service.ts
src/server/policies/action-policy.ts
```

### task-router.ts
자연어 지시를 분석해 담당 에이전트, 위험도, 실행 액션, 실행 단계를 생성한다.

### approval-gateway.ts
메일 발송, 견적 발송, 외부 공유, 삭제, 비용성 액션처럼 위험한 작업은 승인 필요로 분류한다.

### mail-intelligence-service.ts
메일 본문에서 문의 유형, 우선순위, 누락 정보를 추출하는 샘플 로직이다.

### presales-service.ts
제품군별 기술 검토 체크리스트를 생성한다.

## 6. 실행 방법

```bash
cd starter
npm install
cp .env.example .env
npm run prisma:generate
npm run dev
```

DB 연결 후에는 아래 순서로 진행한다.

```bash
npm run prisma:migrate
npm run seed
npm run dev
```

## 7. 개발 확장 순서

1. mock API를 Prisma Repository로 교체
2. Customers / Projects CRUD 구현
3. Mail Intelligence 실제 Gmail/Outlook 연결
4. Command Center interpret/run 실제 실행 로그 저장
5. Approval Gateway를 DB ApprovalItem과 연결
6. Proposal / Quote Desk에 BOM 테이블 추가
7. Finance에 예상/확정 매출 계산 추가
8. Playwright e2e 테스트 추가

## 8. Hermes / GJC 전달 기준

Hermes 또는 GJC에는 ZIP 전체를 전달하고 아래 순서로 지시한다.

```text
1. 00_INDEX.md부터 전체 문서 구조를 확인한다.
2. 00A_Multi-Persona_User_Story.md의 페르소나를 기준으로 기능 우선순위를 잡는다.
3. starter/ 코드를 실행한다.
4. 06_개발태스크_체크리스트.md의 Epic A부터 순서대로 구현한다.
5. mock API를 Prisma 기반 실제 API로 교체한다.
6. 외부 발송/삭제/견적 발송은 approval-gateway 정책을 반드시 통과시킨다.
```
