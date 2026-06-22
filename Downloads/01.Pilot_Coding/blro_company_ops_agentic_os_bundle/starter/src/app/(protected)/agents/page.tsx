import { PageHeader } from "@/components/common/page-header";
import { personas } from "@/server/mock-data";

export default function AgentsPage() {
  return (
    <div>
      <PageHeader title="Agents" description="8개 페르소나를 부서형 에이전트로 운영한다." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {personas.map((agent) => (
          <section key={agent.key} className="card">
            <h2 className="font-semibold">{agent.name}</h2>
            <p className="mt-3 text-sm text-slate-500">{agent.goal}</p>
            <button className="mt-4 rounded-xl bg-slate-900 px-3 py-2 text-sm text-white">실행</button>
          </section>
        ))}
      </div>
    </div>
  );
}
