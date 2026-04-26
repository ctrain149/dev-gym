import { NextRequest, NextResponse } from "next/server";
import { runVerifier } from "@/lib/verifiers";

export async function POST(request: NextRequest) {
  const { taskId } = await request.json();

  if (!taskId || typeof taskId !== "string") {
    return NextResponse.json({ error: "taskId is required" }, { status: 400 });
  }

  const result = await runVerifier(taskId);
  return NextResponse.json(result);
}
