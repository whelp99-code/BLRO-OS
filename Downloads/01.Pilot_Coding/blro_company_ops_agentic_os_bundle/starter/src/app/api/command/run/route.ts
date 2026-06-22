import { NextResponse } from "next/server";
import { routeTask } from "@/server/orchestrator/task-router";
import { requiresApproval } from "@/server/orchestrator/approval-gateway";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const prompt = String(body.prompt ?? "");
  const plan = routeTask(prompt);
  const approval = requiresApproval(plan.actions);
  return NextResponse.json({
    ok: true,
    data: {
      runId: `run_${Date.now()}`,
      status: approval ? "WAITING_APPROVAL" : "SUCCESS",
      plan,
      approvalRequired: approval,
    },
    error: null,
  });
}
