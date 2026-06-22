export async function fetchFinance() {
  const res = await fetch("/api/finance");
  if (!res.ok) throw new Error("Failed to fetch finance");
  return res.json();
}
