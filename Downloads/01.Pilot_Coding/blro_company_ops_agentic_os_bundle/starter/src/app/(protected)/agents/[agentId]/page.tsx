import { PageHeader } from "@/components/common/page-header";

export default function AgentDetailPage({ params }: { params: Promise<{ agentId: string }> }) {
  return <PageHeader title={`Agent Detail`} description="역할, 연결 툴, 워크플로우, 실행 로그를 확인한다." />;
}

