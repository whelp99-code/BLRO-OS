import { DataTable } from "@/components/common/data-table";
import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import { approvals } from "@/server/mock-data";

export default function ApprovalsPage() {
  return (
    <div>
      <PageHeader title="Approvals" description="메일 발송, 외부 공유, 견적 발송 등 위험 작업을 승인 전 검토한다." />
      <DataTable
        data={approvals}
        columns={[
          { key: "title", header: "요청명" },
          { key: "type", header: "유형" },
          { key: "risk", header: "위험도", render: (row) => <StatusBadge value={String(row.risk)} /> },
          { key: "target", header: "대상" },
          { key: "status", header: "상태", render: (row) => <StatusBadge value={String(row.status)} /> },
        ]}
      />
    </div>
  );
}
