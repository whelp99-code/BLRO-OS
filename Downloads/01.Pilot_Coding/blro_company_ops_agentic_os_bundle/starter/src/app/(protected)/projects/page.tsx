import { DataTable } from "@/components/common/data-table";
import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import { projects } from "@/server/mock-data";

export default function ProjectsPage() {
  return (
    <div>
      <PageHeader title="Projects" description="고객 요청을 프로젝트로 연결하고 상태, 매출, 리스크, 다음 액션을 추적한다." />
      <DataTable data={projects} columns={[
        { key: "name", header: "프로젝트" },
        { key: "customerName", header: "고객사" },
        { key: "productFamily", header: "제품군" },
        { key: "status", header: "상태" },
        { key: "risk", header: "리스크", render: (row) => <StatusBadge value={String(row.risk)} /> },
        { key: "nextAction", header: "다음 액션" },
      ]} />
    </div>
  );
}
