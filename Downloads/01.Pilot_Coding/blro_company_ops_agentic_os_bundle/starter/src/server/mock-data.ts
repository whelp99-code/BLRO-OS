import type { CustomerSummary, ProjectSummary } from "@/types/domain";

export const personas = [
  { key: "CEO", name: "대표 / 의사결정자", goal: "오늘의 우선순위, 승인, 매출 리스크를 판단한다." },
  { key: "SALES", name: "영업 담당자", goal: "고객별 제안 기회와 후속 액션을 관리한다." },
  { key: "PRESALES", name: "프리세일즈", goal: "기술 검토, 구성안, 필요 정보 체크리스트를 만든다." },
  { key: "ENGINEER", name: "기술지원", goal: "PoC, 장애, 작업내역, 결과보고를 정리한다." },
  { key: "PM", name: "운영 PM", goal: "프로젝트 상태, 마감, 다음 액션을 추적한다." },
  { key: "FINANCE", name: "재무 / 경영관리", goal: "예상 매출, 확정 매출, 비용, 수익성을 관리한다." },
  { key: "CUSTOMER", name: "고객사 담당자", goal: "필요 자료와 내부 보고용 요약을 명확히 받는다." },
  { key: "PARTNER", name: "파트너 / 벤더", goal: "견적 요청, 벤더 확인, 공동 영업을 관리한다." },
];

export const customers: CustomerSummary[] = [
  { id: "cus_seongwoo", name: "성우하이텍", segment: "제조 / SAP ERP", status: "ACTIVE", opportunityLevel: "HIGH", nextAction: "SAP ERP DR PoC VM 리소스 정보 요청" },
  { id: "cus_gs", name: "GS건설", segment: "건설 / VDI", status: "ACTIVE", opportunityLevel: "MEDIUM", nextAction: "VDI VM 산정 회신 후속" },
  { id: "cus_halla", name: "한라IMS", segment: "해외지사 / SASE", status: "PROSPECT", opportunityLevel: "HIGH", nextAction: "중국 POP 경로와 Connector 요구사항 정리" },
  { id: "cus_vega", name: "베가네트웍스", segment: "파트너 / 네트워크", status: "PARTNER", opportunityLevel: "MEDIUM", nextAction: "기존 회선 고객 대상 AP/Firewall 제안안 작성" },
];

export const projects: ProjectSummary[] = [
  { id: "prj_sap_dr", name: "SAP ERP DR PoC", customerName: "성우하이텍", productFamily: "HDR", status: "TECH_REVIEW", expectedRevenue: 85000000, risk: "MEDIUM", nextAction: "VM 리스트, CPU, 메모리, 디스크, 네트워크 요청" },
  { id: "prj_gs_vdi", name: "VDI 구동 가능 VM 수 산정", customerName: "GS건설", productFamily: "VDI", status: "PROPOSAL", expectedRevenue: 42000000, risk: "LOW", nextAction: "4Core/16GB 기준 산정표 회신" },
  { id: "prj_halla_sase", name: "중국지사 SASE 접속 안정화", customerName: "한라IMS", productFamily: "SASE", status: "QUALIFICATION", expectedRevenue: 30000000, risk: "HIGH", nextAction: "중국 POP, 싱가포르 POP, Connector 경로 검증" },
  { id: "prj_vega_network", name: "기존 회선 고객 네트워크 확장 제안", customerName: "베가네트웍스", productFamily: "NETWORK", status: "NEW_LEAD", expectedRevenue: 20000000, risk: "MEDIUM", nextAction: "50명 이하 고객용 제안 패키지 작성" },
];

export const mailItems = [
  { id: "mail_001", customerName: "성우하이텍", type: "TECH_QUESTION", subject: "POC 테스트 VM 리스트 및 리소스 확인 요청", priority: "HIGH", extractedRequest: "CPU, Memory, Disk, Network 정보 요청 필요", suggestedReply: "POC 장비 선정을 위해 대상 VM 리스트와 리소스 정보를 공유 부탁드립니다." },
  { id: "mail_002", customerName: "GS건설", type: "QUOTE_REQUEST", subject: "VDI VM 수량 산정 문의", priority: "MEDIUM", extractedRequest: "노드별 CPU/RAM과 VM당 리소스 기준 산정", suggestedReply: "HA 여유율과 VM당 메모리 기준을 포함해 산정표로 회신드리겠습니다." },
  { id: "mail_003", customerName: "유니드", type: "TECH_QUESTION", subject: "PC 카톡 및 개인메일 발송 차단 가능 여부", priority: "MEDIUM", extractedRequest: "애플리케이션 제어와 웹메일 업로드/발송 제어 가능 여부 확인", suggestedReply: "기능 지원 여부를 제품 기준으로 확인하여 가능한 범위와 제한사항을 회신드리겠습니다." },
];

export const approvals = [
  { id: "apv_001", title: "성우하이텍 POC VM 정보 요청 메일 발송", type: "SEND_EMAIL", risk: "MEDIUM", status: "PENDING", target: "고객사 담당자" },
  { id: "apv_002", title: "GS건설 VDI 산정표 외부 공유", type: "EXTERNAL_SHARE", risk: "MEDIUM", status: "PENDING", target: "GS ITM" },
  { id: "apv_003", title: "한라IMS SASE 구성안 파트너 공유", type: "EXTERNAL_SHARE", risk: "HIGH", status: "PENDING", target: "파트너" },
];

export const runs = [
  { id: "run_001", task: "메일 분석 및 프로젝트 연결", agent: "운영자동화 매니저", status: "SUCCESS", duration: "8s", risk: "LOW" },
  { id: "run_002", task: "SAP ERP DR 필요정보 체크리스트 생성", agent: "프리세일즈 에이전트", status: "SUCCESS", duration: "14s", risk: "MEDIUM" },
  { id: "run_003", task: "견적 발송 승인 요청", agent: "견적/제안 에이전트", status: "WAITING_APPROVAL", duration: "5s", risk: "MEDIUM" },
];

export const finance = {
  expectedRevenue: projects.reduce((sum, p) => sum + p.expectedRevenue, 0),
  confirmedRevenue: 0,
  monthlyToolCost: 100,
  subscriptionBudget: 150,
  grossMarginTarget: 0.2,
};
