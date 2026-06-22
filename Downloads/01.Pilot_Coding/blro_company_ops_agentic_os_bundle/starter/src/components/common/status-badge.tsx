import { cn } from "@/lib/utils/cn";

const variants: Record<string, string> = {
  LOW: "bg-emerald-50 text-emerald-700 border-emerald-200",
  MEDIUM: "bg-amber-50 text-amber-700 border-amber-200",
  HIGH: "bg-rose-50 text-rose-700 border-rose-200",
  SUCCESS: "bg-emerald-50 text-emerald-700 border-emerald-200",
  FAILED: "bg-rose-50 text-rose-700 border-rose-200",
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  WAITING_APPROVAL: "bg-amber-50 text-amber-700 border-amber-200",
  ACTIVE: "bg-sky-50 text-sky-700 border-sky-200",
};

export function StatusBadge({ value }: { value: string }) {
  return <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-medium", variants[value] ?? "bg-slate-50 text-slate-700 border-slate-200")}>{value}</span>;
}
