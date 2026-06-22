import { PageHeader } from "@/components/common/page-header";

export default function RunDetailPage({ params }: { params: Promise<{ runId: string }> }) {
  return (
    <div>
      <PageHeader title="Run Detail" description="Summary, Steps, Tool Actions, Output, Context, Error를 탭으로 확인한다." />
      <section className="card">
        <p className="text-sm text-slate-500">Run ID는 상세 로그에서 확인합니다.</p>
      </section>
    </div>
  );
}

