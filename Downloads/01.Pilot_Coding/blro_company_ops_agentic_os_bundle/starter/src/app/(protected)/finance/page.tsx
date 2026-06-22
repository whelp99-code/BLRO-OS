import { KpiStatCard } from "@/components/common/kpi-stat-card";
import { PageHeader } from "@/components/common/page-header";
import { finance, projects } from "@/server/mock-data";

export default function FinancePage() {
  return (
    <div>
      <PageHeader title="Finance" description="예상 매출, 확정 매출, 비용, 구독비, 프로젝트별 수익성을 관리한다." />
      <div className="grid gap-4 md:grid-cols-4">
        <KpiStatCard label="예상 매출" value={`${Math.round(finance.expectedRevenue / 10000).toLocaleString()}만원`} />
        <KpiStatCard label="확정 매출" value={`${finance.confirmedRevenue.toLocaleString()}원`} />
        <KpiStatCard label="AI 툴 구독비" value={`$${finance.monthlyToolCost}`} hint={`예산 $${finance.subscriptionBudget}`} />
        <KpiStatCard label="목표 이익률" value={`${finance.grossMarginTarget * 100}%`} />
      </div>
      <section className="card mt-6">
        <h2 className="font-semibold">프로젝트별 예상 매출</h2>
        <ul className="mt-4 space-y-2 text-sm">{projects.map((p) => <li key={p.id} className="flex justify-between"><span>{p.name}</span><span>{p.expectedRevenue.toLocaleString()}원</span></li>)}</ul>
      </section>
    </div>
  );
}
