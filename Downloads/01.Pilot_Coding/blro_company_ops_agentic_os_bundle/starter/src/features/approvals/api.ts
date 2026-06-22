export async function fetchApprovals() {
  const res = await fetch("/api/approvals");
  if (!res.ok) throw new Error("Failed to fetch approvals");
  return res.json();
}
