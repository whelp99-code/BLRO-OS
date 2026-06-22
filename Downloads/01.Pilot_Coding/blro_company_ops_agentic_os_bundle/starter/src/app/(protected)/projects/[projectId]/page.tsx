import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import { projects } from "@/server/mock-data";

export default function ProjectDetailPage({ params }: { params: Promise<{ projectId: string }> }) {
  const project = projects[0];

  return (
    <div>
      <PageHeader title={project.name} description={`${project.customerName} · ${project.productFamily}`} />
      <section className="card">
        <div className="flex items-center gap-2">
          <StatusBadge value={project.status} />
          <StatusBadge value={project.risk} />
        </div>
        <p className="mt-4 text-sm text-slate-600">다음 액션: {project.nextAction}</p>
        <p className="mt-2 text-sm text-slate-600">예상 매출: {project.expectedRevenue.toLocaleString()}원</p>
      </section>
    </div>
  );
}
