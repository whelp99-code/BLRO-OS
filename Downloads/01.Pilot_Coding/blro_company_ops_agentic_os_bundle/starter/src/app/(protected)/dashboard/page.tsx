import { PageHeader } from "@/components/common/page-header";
import { KpiStatCard } from "@/components/common/kpi-stat-card";
import { StatusBadge } from "@/components/common/status-badge";
import { approvals, finance, mailItems, projects, runs } from "@/server/mock-data";

export default function DashboardPage() {
  const urgent = mailItems.filter((m) => m.priority === "HIGH").length;
  const pending = approvals.filter((a) => a.status === "PENDING").length;

  return (
    <div>
      <PageHeader
        title="Company Dashboard"
        description="대표가 오늘의 회사 운영 현황과 병목을 빠르게 파악한다."
        action={<div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">승인 기반 반자동</div>}
      />
      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <KpiStatCard label="긴급 업무" value={urgent} hint="High priority" />
        <KpiStatCard label="미응답 메일" value={mailItems.length} />
        <KpiStatCard label="승인 대기" value={pending} />
        <KpiStatCard label="진행 프로젝트" value={projects.length} />
        <KpiStatCard label="예상 매출" value={`${Math.round(finance.expectedRevenue / 10000).toLocaleString()}만원`} />
        <KpiStatCard label="실패 실행" value={runs.filter((r) => r.status === "FAILED").length} />
      </div>
      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <section className="card">
          <h2 className="font-semibold">오늘의 운영 브리핑</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>고객 회신 필요 5건</li>
            <li>견적 마감 임박 2건</li>
            <li>기술 검토 대기 3건</li>
            <li>매출 가능성 높은 프로젝트 4건</li>
          </ul>
        </section>
        <section className="card">
          <h2 className="font-semibold">최근 실행 로그</h2>
          <div className="mt-4 space-y-3 text-sm">
            {runs.map((run) => (
              <div key={run.id} className="flex items-center justify-between gap-4">
                <span>{run.task}</span>
                <StatusBadge value={run.status} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
