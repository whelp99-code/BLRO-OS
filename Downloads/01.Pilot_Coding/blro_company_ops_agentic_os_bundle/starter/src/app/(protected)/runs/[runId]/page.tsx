import { PageHeader } from "@/components/common/page-header";

export default function RunDetailPage({ params }: { params: Promise<{ runId: string }> }) {
  return <PageHeader title="Run Detail" description="Summary, Steps, Tool Actions, Output, Context, Error를 탭으로 확인한다." />;
}

