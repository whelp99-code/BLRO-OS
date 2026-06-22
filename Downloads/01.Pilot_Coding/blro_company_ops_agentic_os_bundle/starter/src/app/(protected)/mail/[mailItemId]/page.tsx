import { PageHeader } from "@/components/common/page-header";
import { mailItems } from "@/server/mock-data";

export default function MailDetailPage({ params }: { params: Promise<{ mailItemId: string }> }) {
  const mail = mailItems[0];

  return (
    <div>
      <PageHeader title={mail.subject} description={`${mail.customerName} · ${mail.type}`} />
      <section className="card">
        <h2 className="font-semibold">추출 요청사항</h2>
        <p className="mt-3 text-sm text-slate-600">{mail.extractedRequest}</p>
      </section>
      <section className="card mt-4">
        <h2 className="font-semibold">답장 초안</h2>
        <p className="mt-3 text-sm text-slate-600">{mail.suggestedReply}</p>
      </section>
    </div>
  );
}
