# BLRO Company Operating OS shadcn/ui 컴포넌트 분해표

## 1. 목적
shadcn/ui 기반으로 회사 운영 자동화 화면을 구현하기 위한 컴포넌트 조합을 정의한다.

## 2. 공통 UI 원칙
1. shadcn/ui primitive를 최대한 활용한다.
2. 도메인 로직과 순수 UI를 분리한다.
3. 리스트/카드/폼/상태배지는 공용화한다.
4. 위험도, 승인 상태, 연결 상태, 프로젝트 상태는 디자인 시스템으로 고정한다.

## 3. 컴포넌트 계층
### Level 1 Primitive
Button, Input, Textarea, Select, Checkbox, Switch, Badge, Card, Tabs, Table, Dialog, Sheet, Tooltip, DropdownMenu, Alert, Skeleton, Separator, Progress, ScrollArea, Calendar, Popover

### Level 2 Shared UI
PageHeader, SectionHeader, EmptyState, SearchInput, FilterBar, StatusBadge, RiskBadge, PriorityBadge, ConnectionBadge, ProjectStatusBadge, ApprovalStatusBadge, ProductFamilyBadge, KpiStatCard, ConfirmDialog, DangerZoneCard, DataTable, Timeline, JsonViewer, DiffViewer

### Level 3 Domain Components
CustomerCard, CustomerTable, ProjectCard, ProjectTable, MailInsightCard, MailPreviewPanel, ExtractedRequestCard, PresalesChecklist, MissingInfoCard, FeasibilityBadge, ProposalBomTable, QuoteApprovalCard, AgentCard, AgentForm, CommandInputPanel, PlanPreviewCard, RiskAndApprovalCard, RunTimeline, ApprovalPreviewCard, WorkflowStepEditor, FinancePipelineTable, ToolConnectionCard

## 4. 페이지별 컴포넌트 매핑

### Dashboard
- PageHeader
- KpiStatsRow
- DailyBriefCard
- UrgentCustomerRequestTable
- HotProjectPipeline
- ApprovalMiniTable
- RecentRunList
- QuickActionsPanel

### Customers
- CustomerFilterBar
- CustomerTable
- CustomerDetailHeader
- CustomerTabs
- CustomerOpportunityPanel
- ContactList
- CustomerTimeline

### Projects
- ProjectFilterBar
- ProjectTable
- ProjectDetailHeader
- RequestList
- NextActionCard
- ProjectRiskCard
- ProductFamilyBadge

### Mail Intelligence
- MailFilterBar
- MailInboxTable
- MailPreviewPanel
- ExtractedRequestCard
- ProjectLinkCard
- ReplyDraftCard
- ApprovalRequiredBanner

### Presales Review
- PresalesReviewHeader
- RequestSourcePanel
- ProductFamilySelector
- TechnicalChecklist
- MissingInfoCard
- FeasibilityResultCard
- CustomerReplyDraft
- VendorQuestionDraft

### Proposal / Quote Desk
- ProposalFilterBar
- ProposalTable
- ProposalDetailHeader
- BomTable
- MissingQuoteInfoCard
- PartnerRequestDraft
- CustomerProposalSummary
- QuoteApprovalCard

### Command Center
- CommandInputPanel
- PromptChipRow
- SuggestedAgentsPanel
- PlanPreviewCard
- RiskAndApprovalCard
- RunConsole
- ResultPanel

### Approvals
- ApprovalFilterBar
- ApprovalTable
- ApprovalRiskLegend
- ApprovalHeader
- ApprovalSummaryCard
- ActionPreviewCard
- DiffViewer
- WarningCard
- ApprovalActionBar

### Finance
- FinanceKpiRow
- RevenuePipelineTable
- CostBreakdownCard
- ProjectProfitabilityTable
- SubscriptionCostCard
- RiskReceivableTable

## 5. Badge 체계
- ProjectStatusBadge: New Lead, Qualification, Tech Review, Proposal, PoC, Negotiation, Won, Lost, Hold
- RiskBadge: Low, Medium, High
- ApprovalStatusBadge: Pending, Approved, Rejected, Changes Requested, Expired
- ConnectionBadge: Connected, Expired, Error, Not Connected
- MailTypeBadge: Customer Request, Tech Question, Quote Request, Schedule Request, Partner Request, Support Issue, Unknown

## 6. 추천 구현 순서
1. 공용 Badge / Header / EmptyState
2. DataTable / KpiStatCard
3. CustomerTable / ProjectTable
4. MailPreviewPanel / ExtractedRequestCard
5. PresalesChecklist / MissingInfoCard
6. CommandInputPanel / PlanPreviewCard
7. ApprovalDetail 세부 뷰어
8. Finance KPI / Pipeline Table
