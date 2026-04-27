import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { solutionRegistry } from "@/lib/solutions";

const PROJECT_ROOT = join(process.cwd(), "..");

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

    const solutions = solutionRegistry[taskId];
    if (!solutions) {
      return NextResponse.json(
        { error: `No solution available for task ${taskId}` },
        { status: 404 },
      );
    }

    const files = Object.keys(solutions);
    let written = 0;

    for (const file of files) {
      const absPath = join(PROJECT_ROOT, file);
      await mkdir(dirname(absPath), { recursive: true });
      await writeFile(absPath, solutions[file], "utf-8");
      written++;
    }

    return NextResponse.json({
      success: true,
      filesWritten: written,
      files,
      message: `Wrote solution to ${written} file(s)`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Solve failed: ${message}` },
      { status: 500 },
    );
  }
}
