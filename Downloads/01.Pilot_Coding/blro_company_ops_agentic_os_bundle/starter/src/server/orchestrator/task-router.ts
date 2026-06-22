type RoutedPlan = {
  agentName: string;
  risk: "LOW" | "MEDIUM" | "HIGH";
  actions: string[];
  steps: string[];
};

export function routeTask(prompt: string): RoutedPlan {
  const text = prompt.toLowerCase();

  if (text.includes("견적") || text.includes("quote") || text.includes("bom")) {
    return {
      agentName: "견적/제안 에이전트",
      risk: "MEDIUM",
      actions: ["CREATE_PROPOSAL_DRAFT", "REQUEST_APPROVAL_BEFORE_SEND"],
      steps: ["고객/프로젝트 식별", "제품군과 수량 기준 추출", "BOM 초안 생성", "최종 발송은 승인 대기 생성"],
    };
  }

  if (text.includes("poc") || text.includes("dr") || text.includes("기술") || text.includes("vdi") || text.includes("sase")) {
    return {
      agentName: "프리세일즈 에이전트",
      risk: "MEDIUM",
      actions: ["CREATE_TECH_REVIEW", "CREATE_CUSTOMER_REPLY_DRAFT"],
      steps: ["요구사항 추출", "제품군 매핑", "누락 정보 체크리스트 생성", "고객 회신 초안 작성"],
    };
  }

  if (text.includes("메일") || text.includes("답장") || text.includes("회신")) {
    return {
      agentName: "메일 인텔리전스 에이전트",
      risk: "MEDIUM",
      actions: ["CREATE_EMAIL_DRAFT", "REQUEST_APPROVAL_BEFORE_SEND"],
      steps: ["메일 유형 분류", "고객/프로젝트 연결", "요청사항 추출", "답장 초안 생성", "발송 승인 대기"],
    };
  }

  if (text.includes("매출") || text.includes("비용") || text.includes("수익")) {
    return {
      agentName: "재무 에이전트",
      risk: "LOW",
      actions: ["GENERATE_FINANCE_SUMMARY"],
      steps: ["예상 매출 집계", "확정 매출 분리", "고정비/구독비 확인", "리스크 요약"],
    };
  }

  return {
    agentName: "운영자동화 매니저",
    risk: "LOW",
    actions: ["CREATE_INTERNAL_SUMMARY"],
    steps: ["지시 의도 해석", "관련 고객/프로젝트 검색", "실행 계획 생성", "내부 결과 저장"],
  };
}
