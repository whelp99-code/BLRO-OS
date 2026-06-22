import { DataTable } from "@/components/common/data-table";
import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import { customers } from "@/server/mock-data";

export default function CustomersPage() {
  return (
    <div>
      <PageHeader title="Customers" description="고객사, 파트너, 기존 고객 제안 기회와 다음 액션을 관리한다." />
      <DataTable data={customers} columns={[
        { key: "name", header: "고객사" },
        { key: "segment", header: "구분" },
        { key: "status", header: "상태" },
        { key: "opportunityLevel", header: "기회", render: (row) => <StatusBadge value={String(row.opportunityLevel)} /> },
        { key: "nextAction", header: "다음 액션" },
      ]} />
    </div>
  );
}
