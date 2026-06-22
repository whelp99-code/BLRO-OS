export function classifyAction(action: string) {
  if (["SEND_EMAIL", "SEND_QUOTE", "EXTERNAL_SHARE", "DELETE_DATA"].includes(action)) {
    return { allowed: false, approvalRequired: true, reason: "외부 발송/삭제/최종 견적은 승인 필요" };
  }
  return { allowed: true, approvalRequired: false, reason: "요약/초안/내부 정리는 자동 처리 가능" };
}
