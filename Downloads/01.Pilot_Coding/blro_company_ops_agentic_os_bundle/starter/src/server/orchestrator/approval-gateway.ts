const riskyActions = new Set([
  "SEND_EMAIL",
  "SEND_QUOTE",
  "EXTERNAL_SHARE",
  "DELETE_DATA",
  "MOVE_DATA",
  "COST_ACTION",
  "REQUEST_APPROVAL_BEFORE_SEND",
]);

export function requiresApproval(actions: string[]) {
  return actions.some((action) => riskyActions.has(action));
}

export function approvalReason(actions: string[]) {
  if (actions.includes("SEND_EMAIL") || actions.includes("REQUEST_APPROVAL_BEFORE_SEND")) {
    return "외부 발송은 승인 후 처리해야 합니다.";
  }

  if (actions.includes("SEND_QUOTE")) {
    return "견적 발송은 승인 후 처리해야 합니다.";
  }

  if (actions.includes("EXTERNAL_SHARE")) {
    return "외부 공유는 승인 후 처리해야 합니다.";
  }

  if (actions.includes("DELETE_DATA")) {
    return "삭제 작업은 승인 후 처리해야 합니다.";
  }

  if (actions.includes("MOVE_DATA")) {
    return "데이터 이동은 승인 후 처리해야 합니다.";
  }

  if (actions.includes("COST_ACTION")) {
    return "비용성 작업은 승인 후 처리해야 합니다.";
  }

  return null;
}
