import { PageHeader } from "@/components/common/page-header";
import { workflows } from "@/server/mock-data";

export default function WorkflowsPage() {
  return (
    <div>
      <PageHeader title="Workflows" description="반복 업무를 트리거, 에이전트, 출력, 승인 규칙으로 관리한다." />
      <div className="grid gap-4 xl:grid-cols-3">
        {workflows.map((workflow) => (
          <section key={workflow.id} className="card">
            <h2 className="font-semibold">{workflow.name}</h2>
            <p className="mt-2 text-sm text-slate-500">Trigger: {workflow.trigger}</p>
            <p className="mt-1 text-sm text-slate-500">Agent: {workflow.agent}</p>
            <p className="mt-1 text-sm text-slate-500">Approval: {workflow.approvalRule}</p>
            <span className="mt-4 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              {workflow.status}
            </span>
          </section>
        ))}
      </div>
    </div>
  );
}
