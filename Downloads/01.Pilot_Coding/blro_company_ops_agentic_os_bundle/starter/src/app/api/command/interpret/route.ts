import { NextResponse } from "next/server";
import { routeTask } from "@/server/orchestrator/task-router";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const prompt = String(body.prompt ?? "");
  return NextResponse.json({ ok: true, data: routeTask(prompt), error: null });
}
