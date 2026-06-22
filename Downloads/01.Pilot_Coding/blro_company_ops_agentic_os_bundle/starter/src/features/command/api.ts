export async function interpretCommand(prompt: string) {
  const res = await fetch("/api/command/interpret", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt }) });
  if (!res.ok) throw new Error("Failed to interpret command");
  return res.json();
}

export async function runCommand(prompt: string) {
  const res = await fetch("/api/command/run", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt }) });
  if (!res.ok) throw new Error("Failed to run command");
  return res.json();
}
