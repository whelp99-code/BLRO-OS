# BLRO Company Operating OS API 명세서

## 1. 공통 응답
```json
{ "ok": true, "data": {}, "error": null }
```

## 1-1. API 설계 원칙
- 응답은 항상 `ok/data/error` 형태를 유지한다.
- `POST /request-send-approval`, `POST /request-approval`, `POST /approve` 같은 위험 작업은 실제 실행이 아니라 승인 객체 생성 또는 상태 전환만 수행한다.
- 외부 발송/견적 발송/삭제/외부 공유는 반드시 Approval Gateway를 통해야 한다.
- 불확실한 추출 결과는 `needs_review` 또는 `확인 필요`로 반환한다.

## 2. Organization
```text
GET    /api/organizations/current
PATCH  /api/organizations/current
```

## 3. Customers
```text
GET    /api/customers
POST   /api/customers
GET    /api/customers/:id
PATCH  /api/customers/:id
```

## 4. Projects
```text
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PATCH  /api/projects/:id
POST   /api/projects/:id/next-action
```

## 5. Mail Intelligence
```text
GET    /api/mail/items
POST   /api/mail/sync
GET    /api/mail/:id
POST   /api/mail/:id/classify
POST   /api/mail/:id/extract-request
POST   /api/mail/:id/create-reply-draft
POST   /api/mail/:id/link-project
POST   /api/mail/:id/request-send-approval
```

### classify response
```json
{
  "type": "TECH_QUESTION",
  "urgencyScore": 80,
  "customerName": "GS건설",
  "productFamily": ["VDI", "HCI"],
  "replyRequired": true,
  "recommendedAction": "기술 답변 초안 생성"
}
```

## 6. Presales Review
```text
GET    /api/presales/reviews
POST   /api/presales/reviews
GET    /api/presales/reviews/:id
PATCH  /api/presales/reviews/:id
POST   /api/presales/reviews/:id/generate-checklist
POST   /api/presales/reviews/:id/evaluate-feasibility
POST   /api/presales/reviews/:id/generate-customer-reply
POST   /api/presales/reviews/:id/generate-vendor-question
```

## 7. Proposal / Quote Desk
```text
GET    /api/proposals
POST   /api/proposals
GET    /api/proposals/:id
PATCH  /api/proposals/:id
POST   /api/proposals/:id/generate-bom
POST   /api/proposals/:id/generate-partner-request
POST   /api/proposals/:id/generate-customer-summary
POST   /api/proposals/:id/request-approval
```

## 8. Agents
```text
GET    /api/agents
POST   /api/agents
GET    /api/agents/:id
PATCH  /api/agents/:id
DELETE /api/agents/:id
POST   /api/agents/:id/test
```

## 9. Command Center
```text
POST /api/command/interpret
POST /api/command/run
```

## 10. Approvals
```text
GET    /api/approvals
GET    /api/approvals/:id
POST   /api/approvals/:id/approve
POST   /api/approvals/:id/reject
POST   /api/approvals/:id/request-changes
```

## 11. Runs / Logs
```text
GET    /api/runs
GET    /api/runs/:id
POST   /api/runs/:id/retry
POST   /api/runs/:id/save-workflow
```

## 12. Finance
```text
GET /api/finance/summary
GET /api/finance/pipeline
POST /api/finance/items
PATCH /api/finance/items/:id
```

## 13. Tool Connections
```text
GET  /api/tool-connections
POST /api/tool-connections/:provider/connect
POST /api/tool-connections/:provider/test
POST /api/tool-connections/:provider/disconnect
```
