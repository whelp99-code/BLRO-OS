import { DataTable } from "@/components/common/data-table";
import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import { mailItems } from "@/server/mock-data";

export default function MailPage() {
  return (
    <div>
      <PageHeader title="Mail Intelligence" description="고객 메일을 요청사항, 긴급도, 제품군, 답장 초안으로 분류한다." />
      <DataTable
        data={mailItems}
        columns={[
          { key: "subject", header: "제목" },
          { key: "customerName", header: "고객사" },
          { key: "type", header: "유형" },
          { key: "priority", header: "우선순위", render: (row) => <StatusBadge value={String(row.priority)} /> },
          { key: "extractedRequest", header: "추출 요청" },
          { key: "suggestedReply", header: "답장 초안" },
        ]}
      />
    </div>
  );
}
