import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { checkUsage, incrementUsage } from "@/lib/usage";

export async function GET(request) {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const toolName = searchParams.get("tool");

  if (!toolName) {
    return NextResponse.json({ error: "Tool name required" }, { status: 400 });
  }

  const usage = await checkUsage(userId, toolName);
  return NextResponse.json(usage);
}

export async function POST(request) {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { toolName } = await request.json();

  if (!toolName) {
    return NextResponse.json({ error: "Tool name required" }, { status: 400 });
  }

  // Check if user has remaining prompts
  const usage = await checkUsage(userId, toolName);
  
  if (!usage.allowed) {
    return NextResponse.json({ 
      error: "Usage limit reached",
      remaining: 0,
      limit: 15
    }, { status: 403 });
  }

  // Increment usage
  const result = await incrementUsage(userId, toolName);
  
  return NextResponse.json({
    success: result.success,
    newCount: result.newCount,
    remaining: 15 - result.newCount
  });
}
