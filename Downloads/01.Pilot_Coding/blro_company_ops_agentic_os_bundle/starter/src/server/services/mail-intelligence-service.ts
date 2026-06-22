export function extractMailRequest(input: string) {
  const needsQuote = /견적|quote|bom/i.test(input);
  const needsTech = /기술|poc|dr|vdi|sase|hci/i.test(input);

  return {
    type: needsQuote ? "QUOTE_REQUEST" : needsTech ? "TECH_QUESTION" : "CUSTOMER_REQUEST",
    priority: /긴급|장애|오늘|asap/i.test(input) ? "HIGH" : "MEDIUM",
    missingInfo: ["고객사", "대상 제품군", "마감일"].filter((item) => !input.includes(item)),
    replyRequired: true,
    approvalRequired: true,
  };
}
