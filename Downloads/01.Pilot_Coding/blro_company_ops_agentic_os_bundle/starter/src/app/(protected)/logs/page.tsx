import { DataTable } from "@/components/common/data-table";
import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import { runs } from "@/server/mock-data";

export default function LogsPage() {
  return (
    <div>
      <PageHeader title="Runs / Logs" description="모든 실행 기록, 단계, 툴 호출, 실패 이유를 추적한다." />
      <DataTable
        data={runs}
        columns={[
          { key: "id", header: "Run ID" },
          { key: "task", header: "Task" },
          { key: "agent", header: "Agent" },
          { key: "status", header: "Status", render: (row) => <StatusBadge value={String(row.status)} /> },
          { key: "duration", header: "Duration" },
          { key: "risk", header: "Risk", render: (row) => <StatusBadge value={String(row.risk)} /> },
          { key: "approval", header: "Approval" },
          { key: "context", header: "Context" },
          { key: "steps", header: "Steps" },
        ]}
      />
    </div>
  );
}
