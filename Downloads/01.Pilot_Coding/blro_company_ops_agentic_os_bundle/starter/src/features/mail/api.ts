export async function fetchMail() {
  const res = await fetch("/api/mail");
  if (!res.ok) throw new Error("Failed to fetch mail");
  return res.json();
}
