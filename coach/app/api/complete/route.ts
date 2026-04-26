import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { solutions } from "@/lib/solutions";

const FRONTEND_ROOT = join(process.cwd(), "..", "frontend");
const BACKEND_ROOT = join(process.cwd(), "..", "backend");

export async function POST(request: NextRequest) {
  const { taskId } = await request.json();

  if (!taskId || typeof taskId !== "string") {
    return NextResponse.json({ error: "taskId is required" }, { status: 400 });
  }

  const files = solutions[taskId];
  if (!files || files.length === 0) {
    return NextResponse.json(
      { error: `No solution found for task: ${taskId}` },
      { status: 404 }
    );
  }

  const projectRoot = taskId.startsWith("spr-") ? BACKEND_ROOT : FRONTEND_ROOT;

  for (const file of files) {
    const absolutePath = join(projectRoot, file.path);
    await mkdir(dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, file.content, "utf-8");
  }

  return NextResponse.json({ ok: true, written: files.map((f) => f.path) });
}
