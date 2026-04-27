import { NextRequest, NextResponse } from "next/server";
import { verifyTask } from "@/lib/verify-runner";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { taskId } = body;

    if (!taskId || typeof taskId !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid taskId" },
        { status: 400 },
      );
    }

    const result = await verifyTask(taskId);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Verification failed: ${message}` },
      { status: 500 },
    );
  }
}
