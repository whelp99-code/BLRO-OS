import { PageHeader } from "@/components/common/page-header";
import { routeTask } from "@/server/orchestrator/task-router";

const samples = [
  "성우하이텍 POC 요청 메일 답장 초안 만들어줘",
  "GS건설 VDI 문의 산정 체크리스트 만들어줘",
  "한라IMS SASE 구성 리스크 정리해줘",
  "이번 달 예상 매출과 승인 대기 건 요약해줘",
];

export default function CommandPage() {
  const previews = samples.map((prompt) => ({ prompt, plan: routeTask(prompt) }));

  return (
    <div>
      <PageHeader title="Command Center" description="자연어 지시를 분석해 담당 에이전트, 실행계획, 승인 필요 여부를 보여준다." />
      <section className="card">
        <textarea className="min-h-32 w-full rounded-xl border p-4" placeholder="예: 성우하이텍 POC 요청 메일 답장 초안 만들어줘" />
        <button className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm text-white">실행계획 생성</button>
      </section>
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        {previews.map((item) => (
          <section key={item.prompt} className="card">
            <h2 className="font-semibold">{item.prompt}</h2>
            <p className="mt-2 text-sm text-slate-500">추천 에이전트: {item.plan.agentName}</p>
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm">
              {item.plan.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
