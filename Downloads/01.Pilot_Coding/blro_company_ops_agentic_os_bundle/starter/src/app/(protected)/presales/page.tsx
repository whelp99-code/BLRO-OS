import { PageHeader } from "@/components/common/page-header";
import { projects } from "@/server/mock-data";

const checklist = ["대상 VM 리스트", "CPU / Memory / Disk", "VLAN / IP 대역", "RTO / RPO", "백업/DR 방식", "PoC 일정"];

export default function PresalesPage() {
  return (
    <div>
      <PageHeader title="Presales Review" description="기술 검토, 가능 여부, 누락 정보, 고객 회신 초안을 생성한다." />
      <div className="grid gap-4 xl:grid-cols-2">
        {projects
          .filter((project) => ["HDR", "VDI", "SASE"].includes(project.productFamily))
          .map((project) => (
            <section key={project.id} className="card">
              <h2 className="font-semibold">{project.name}</h2>
              <p className="mt-2 text-sm text-slate-500">{project.nextAction}</p>
              <ul className="mt-4 grid gap-2 text-sm">
                {checklist.map((item) => (
                  <li key={item}>□ {item}</li>
                ))}
              </ul>
            </section>
          ))}
      </div>
    </div>
  );
}
