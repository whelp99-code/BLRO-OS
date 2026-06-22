# BLRO Company Operating OS Next.js App Router 폴더 구조

## 1. 기술 가정
- Next.js 15+
- TypeScript
- App Router
- Tailwind CSS
- shadcn/ui
- Prisma
- PostgreSQL
- React Query
- Zustand 또는 Jotai
- Gmail/Outlook/Calendar 연동
- Approval Gateway 기반 위험 작업 제어

## 1-1. 라우트 명명 원칙
- 문서 전반에서 단수/복수 표현이 섞여 있으므로, 구현 라우트는 기능 단위의 복수형을 우선한다.
- 예: `proposals`, `runs`, `approvals`, `settings/templates`.
- 화면 제목은 사용자 친화적으로 단수형/한글명으로 보여줄 수 있다.

## 2. 상위 라우트 설계
```text
/
├─ /login
├─ /onboarding
├─ /dashboard
├─ /customers
│  ├─ /customers/new
│  └─ /customers/[customerId]
├─ /projects
│  ├─ /projects/new
│  └─ /projects/[projectId]
├─ /mail
│  └─ /mail/[mailItemId]
├─ /presales
│  ├─ /presales/new
│  └─ /presales/[reviewId]
├─ /proposals
│  ├─ /proposals/new
│  └─ /proposals/[proposalId]
├─ /agents
│  ├─ /agents/new
│  ├─ /agents/[agentId]
│  └─ /agents/[agentId]/edit
├─ /command
├─ /runs
│  └─ /runs/[runId]
├─ /workflows
│  ├─ /workflows/new
│  ├─ /workflows/[workflowId]
│  └─ /workflows/[workflowId]/edit
├─ /approvals
│  └─ /approvals/[approvalId]
├─ /logs
├─ /finance
└─ /settings
   ├─ /settings/organization
   ├─ /settings/mail-style
   ├─ /settings/connections
   ├─ /settings/policies
   ├─ /settings/products
   └─ /settings/templates
```

## 3. 디렉터리 구조
```text
src/
├─ app/
│  ├─ (auth)/
│  ├─ (protected)/
│  │  ├─ dashboard/page.tsx
│  │  ├─ customers/
│  │  ├─ projects/
│  │  ├─ mail/
│  │  ├─ presales/
│  │  ├─ proposals/
│  │  ├─ agents/
│  │  ├─ command/page.tsx
│  │  ├─ runs/[runId]/page.tsx
│  │  ├─ workflows/
│  │  ├─ approvals/
│  │  ├─ logs/page.tsx
│  │  ├─ finance/page.tsx
│  │  └─ settings/
│  └─ api/
│     ├─ organizations/
│     ├─ customers/
│     ├─ projects/
│     ├─ mail/
│     ├─ presales/
│     ├─ proposals/
│     ├─ agents/
│     ├─ workflows/
│     ├─ runs/
│     ├─ approvals/
│     ├─ finance/
│     ├─ tool-connections/
│     └─ command/
├─ components/
│  ├─ layout/
│  ├─ common/
│  ├─ dashboard/
│  ├─ customers/
│  ├─ projects/
│  ├─ mail/
│  ├─ presales/
│  ├─ proposals/
│  ├─ agents/
│  ├─ command/
│  ├─ workflows/
│  ├─ approvals/
│  ├─ logs/
│  ├─ finance/
│  ├─ settings/
│  └─ ui/
├─ features/
│  ├─ organization/
│  ├─ customers/
│  ├─ projects/
│  ├─ mail/
│  ├─ presales/
│  ├─ proposals/
│  ├─ agents/
│  ├─ command/
│  ├─ workflows/
│  ├─ runs/
│  ├─ approvals/
│  ├─ finance/
│  └─ connections/
├─ server/
│  ├─ services/
│  ├─ repositories/
│  ├─ orchestrator/
│  ├─ mail-intelligence/
│  ├─ presales-engine/
│  └─ approval-gateway/
├─ lib/
├─ hooks/
├─ stores/
├─ types/
└─ prisma/schema.prisma
```

## 4. 설계 원칙
- `app/`는 라우트 조립만 담당한다.
- `features/`는 화면별 UI, query, mutation, schema, type을 포함한다.
- `server/`는 service, repository, orchestrator, policy를 포함한다.
- 모든 업무는 Customer → Project → Request → Action → Run/Approval/Artifact 구조로 연결한다.
- 위험 작업은 approval-gateway를 반드시 통과한다.

## 5. 서버 모듈 예시
```text
server/orchestrator/
├─ command-interpreter.ts
├─ task-router.ts
├─ persona-router.ts
├─ execution-planner.ts
├─ approval-gateway.ts
└─ run-logger.ts

server/mail-intelligence/
├─ mail-classifier.ts
├─ request-extractor.ts
├─ customer-matcher.ts
├─ reply-draft-generator.ts
└─ project-linker.ts

server/presales-engine/
├─ product-router.ts
├─ missing-info-detector.ts
├─ checklist-generator.ts
├─ feasibility-evaluator.ts
└─ customer-reply-builder.ts
```
