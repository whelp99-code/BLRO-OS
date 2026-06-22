import { PageHeader } from "@/components/common/page-header";
import { projects } from "@/server/mock-data";
import { buildPresalesChecklist } from "@/server/services/presales-service";

export default function PresalesPage() {
  return (
    <div>
      <PageHeader title="Presales Review" description="기술 검토, 가능 여부, 누락 정보, 고객 회신 초안을 생성한다." />
      <div className="grid gap-4 xl:grid-cols-2">
        {projects
          .filter((project) => ["HDR", "VDI", "SASE"].includes(project.productFamily))
          .map((project) => {
            const checklist = buildPresalesChecklist(project.productFamily);

            return (
              <section key={project.id} className="card">
                <h2 className="font-semibold">{project.name}</h2>
                <p className="mt-2 text-sm text-slate-500">{project.nextAction}</p>
                <p className="mt-3 text-xs uppercase tracking-wide text-slate-400">Approval-first checklist</p>
                <ul className="mt-4 grid gap-2 text-sm">
                  {checklist.checklist.map((item) => (
                    <li key={item}>□ {item}</li>
                  ))}
                </ul>
              </section>
            );
          })}
      </div>
    </div>
  );
}
