# Schema Merge M1–M2 구현 기록 (C-1a)

> **일자:** 2026-06-22  
> **티켓:** P0-ENG-006  
> **대상:** `AIOSv2_integration/packages/db`

---

## 요약

| 단계 | 상태 | 산출 |
|------|------|------|
| **M1** BLRO starter → base | ✅ | 19+ 비즈니스 모델 + Ingestion 확장 |
| **M2** portal automation additive | ✅ | 52 automation 모델 (`Automation*` 충돌 회피) |
| Migration SQL | ✅ | `prisma/migrations/20260622124000_m1_blro_m2_portal_automation/` |
| DB apply | ✅ | c-stack PG `:5435` + `migrate deploy` |

---

## M1 — BLRO 비즈니스 SSOT

**소스:** `blro_company_ops_agentic_os_bundle/starter/prisma/schema.prisma`

| BLRO 도메인 | 모델 |
|-------------|------|
| 조직·사용자 | User, Organization, OrganizationMember |
| 영업 | Customer, Contact, Project, ProjectRequest, Proposal |
| 메일 | MailItem |
| 프리세일즈 | PresalesReview |
| 운영 | Task, Agent, Workflow, ExecutionRun, RunStep |
| 승인 | ApprovalItem (`ApprovalActionType` canonical) |
| 연동 | ToolConnection |
| 지식·재무 | KnowledgeDocument, FinanceItem |
| 수집 | IngestionSource, IngestionItem, IngestionJob |

**추가 (AIOSv2 auth):** Account, Session, VerificationToken, UserRole  
**추가 (adapter):** IntegrationHealth

---

## M2 — portal automation (이름 충돌 → `Automation*`)

| portal 원본 | C-Stack 모델 | @@map |
|-------------|--------------|-------|
| Project | AutomationProject | automation_projects |
| ProjectMember | AutomationProjectMember | automation_project_members |
| Workflow | AutomationWorkflow | automation_workflows |
| WorkflowStep | AutomationWorkflowStep | automation_workflow_steps |
| ApprovalRequest | AutomationApprovalRequest | automation_approval_requests |
| PortalTask | AutomationPortalTask | automation_portal_tasks |
| MailAccount / MailMessage | AutomationMailAccount / AutomationMailMessage | automation_mail_* |
| KnowledgeDocument (insight) | AutomationKnowledgeDocument | automation_knowledge_documents |
| Report | AutomationReport | automation_reports |

**충돌 없이 이식:** Command, CommandRun, ModuleRegistry, BlockRegistry, OutboxEvent, SkillCatalogItem, MailInsightThread, PolicyMemory 등 40+ 테이블

**의도적 제외 (BLRO SSOT):** portal Customer, Partner, Opportunity, Poc*, WorkTask 등 비즈니스 30+ 모델

---

## 재생성·적용

```bash
# 1. 스키마 병합 (M1+M2)
cd AIOSv2_integration/packages/db
npm run db:merge-schema

# 2. 인프라
docker compose -f ../../docker-compose.c-stack.yml up -d

# 3. 마이그레이션 적용
cp .env.example .env   # DATABASE_URL 확인
npx prisma migrate deploy
npx prisma generate
```

---

## 모델 카운트

| 구분 | 개수 |
|------|------|
| BLRO 비즈니스 + Ingestion | 22 |
| Auth + IntegrationHealth | 4 |
| Portal automation (M2) | 52 |
| **합계** | **92 models** |

---

## M3 예정 (미구현)

- AIOSv2 legacy 20모델 deprecate (Project/userId, MailMessage, Kanban 등)
- `apps/web` prisma-queries → BLRO 필드 매핑
- portal 비즈니스 데이터 마이그레이션 스크립트 (선택)

---

## 검증

```bash
export DATABASE_URL="postgresql://ai_portal:ai_portal@127.0.0.1:5435/blro_operating_os"
npx prisma validate
npx prisma migrate status
```

### DB (c-stack 전용 `:5435`)

portal/AIOS v1은 `:5434`를 유지합니다. c-stack은 `docker-compose.c-stack.yml`로 **`:5435`** 에 전용 PG를 기동합니다.

```bash
docker compose -f docker-compose.c-stack.yml up -d
cd AIOSv2_integration/packages/db && npx prisma migrate deploy
```
