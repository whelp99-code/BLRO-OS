import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import { customers, projects } from "@/server/mock-data";

export default function CustomerDetailPage({ params }: { params: Promise<{ customerId: string }> }) {
  const customer = customers[0];
  const related = projects.filter((project) => project.customerName === customer.name);

  return (
    <div>
      <PageHeader title={customer.name} description={`${customer.segment} · ${customer.status}`} />
      <section className="card">
        <div className="flex flex-wrap gap-2">
          <StatusBadge value={customer.status} />
          <StatusBadge value={customer.opportunityLevel} />
        </div>
        <p className="mt-4 text-sm text-slate-600">다음 액션: {customer.nextAction}</p>
      </section>
      <section className="card mt-4">
        <h2 className="font-semibold">연결 프로젝트</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {related.map((project) => (
            <li key={project.id} className="flex items-center justify-between">
              <span>{project.name}</span>
              <StatusBadge value={project.status} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
