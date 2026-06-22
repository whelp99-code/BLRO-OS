# ADR-APPROVAL-001 — 단일 승인 게이트 (Canonical)

> **상태:** 승인됨 (레드팀 v3)  
> **날짜:** 2026-06-22  
> **관련:** P1-ENG-005, P0-REP-004

---

## 결정

**BLRO starter `ApprovalActionType` enum을 C-Stack 전체의 유일한 승인 분류 체계로 사용한다.**

```prisma
enum ApprovalActionType {
  SEND_EMAIL
  SEND_MESSAGE
  UPDATE
  DELETE
  PUBLISH
  MOVE
  COST_ACTION
  SEND_QUOTE
  EXTERNAL_SHARE
}
```

---

## 배경

- portal DB, AIOSv2, mail-intelligence 각각 별도 승인·발송 로직 존재
- 레드팀 C-1: 이중 게이트 시 우회 경로 발생 가능

---

## 규칙

| 규칙 | 내용 |
|------|------|
| R1 | 모든 위험 액션은 `ApprovalRequest` 레코드 생성 후 실행 |
| R2 | API는 `actionType` 미등록 시 **409 Approval Required** |
| R3 | mail 발송 = `SEND_EMAIL`; CFO 등록 = `COST_ACTION` |
| R4 | P0 기본값 `MAIL_SEND_KILL_SWITCH=1` — 승인 없이 발송 차단 |
| R5 | CFO P3 전 **read-only** — `COST_ACTION` 승인만 허용, 자동 등록 금지 |

---

## 우회 경로 차단 목록 (v4)

| 경로 | 조치 |
|------|------|
| mail-intelligence 직접 Graph send | hook → approval check |
| CFO API 직접 POST invoice | P3 전 403 |
| sangfor MCP 외부 공유 | `EXTERNAL_SHARE` 게이트 |
| AIOSv2 legacy send route | deprecate → BFF only |

---

## 검증

- P1-ENG-005: 미승인 발송 시 409
- E2E-SCENARIO-001 시나리오 3 (승인 후 발송)
