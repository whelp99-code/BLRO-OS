import { PageHeader } from "@/components/common/page-header";

const workflows = [
  ["매일 운영 브리핑", "SCHEDULE", "대표 에이전트", "ON"],
  ["고객 메일 분석", "EMAIL", "운영자동화 매니저", "ON"],
  ["견적 발송 승인", "MANUAL", "견적/제안 에이전트", "ON"],
];

export default function WorkflowsPage() {
  return <div><PageHeader title="Workflows" description="반복 업무를 트리거, 에이전트, 출력, 승인 규칙으로 관리한다." />
    <div className="card"><ul className="space-y-3 text-sm">{workflows.map(([name, trigger, agent, status]) => <li key={name} className="flex justify-between"><span>{name}</span><span>{trigger} · {agent} · {status}</span></li>)}</ul></div>
  </div>;
}
