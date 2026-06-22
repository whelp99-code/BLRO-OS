import Link from "next/link";

const nav = [
  ["Dashboard", "/dashboard"],
  ["Customers", "/customers"],
  ["Projects", "/projects"],
  ["Mail", "/mail"],
  ["Presales", "/presales"],
  ["Proposal", "/proposal"],
  ["Agents", "/agents"],
  ["Command", "/command"],
  ["Workflows", "/workflows"],
  ["Approvals", "/approvals"],
  ["Logs", "/logs"],
  ["Finance", "/finance"],
  ["Settings", "/settings/organization"],
];

const rightPanel = ["오늘 긴급 업무", "고객 회신 대기", "승인 대기", "최근 실행 5건", "연결 상태"];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-10 border-b bg-white/95 backdrop-blur">
        <div className="flex h-14 items-center justify-between gap-4 px-6">
          <div className="font-semibold">BLRO Company Operating OS</div>
          <div className="flex gap-2 text-xs text-slate-600">
            <span className="rounded-full bg-slate-100 px-3 py-1">미응답 3</span>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800">승인대기 3</span>
            <span className="rounded-full bg-sky-100 px-3 py-1 text-sky-800">최근실행 3</span>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-[240px_1fr_260px]">
        <aside className="min-h-[calc(100vh-56px)] border-r bg-white p-4">
          <nav className="space-y-1">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} className="block rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="p-6">{children}</main>
        <aside className="min-h-[calc(100vh-56px)] border-l bg-white p-4">
          <div className="space-y-4">
            {rightPanel.map((item) => (
              <section key={item} className="rounded-2xl border bg-slate-50 p-4 text-sm">
                <h2 className="font-medium">{item}</h2>
                <p className="mt-2 text-slate-500">문서 기준 우선 확인 대상입니다.</p>
              </section>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
