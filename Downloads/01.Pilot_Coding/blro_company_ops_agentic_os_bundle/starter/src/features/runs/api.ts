export async function fetchRuns() {
  const res = await fetch("/api/runs");
  if (!res.ok) throw new Error("Failed to fetch runs");
  return res.json();
}
