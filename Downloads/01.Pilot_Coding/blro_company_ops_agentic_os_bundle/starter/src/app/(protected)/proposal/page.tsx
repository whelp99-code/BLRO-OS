import { PageHeader } from "@/components/common/page-header";
import { projects } from "@/server/mock-data";

export default function ProposalPage() {
  return (
    <div>
      <PageHeader title="Proposal / Quote Desk" description="제품군별 BOM, 견적 초안, 승인 대기, 파트너 전달본을 관리한다." />
      <div className="grid gap-4 xl:grid-cols-2">
        {projects.map((project) => (
          <section key={project.id} className="card">
            <h2 className="font-semibold">{project.customerName} · {project.productFamily}</h2>
            <p className="mt-2 text-sm text-slate-500">{project.name}</p>
            <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm">
              <div>견적 상태: 초안</div>
              <div>승인 정책: 최종 견적 발송 전 승인 필요</div>
              <div>예상 금액: {project.expectedRevenue.toLocaleString()}원</div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
