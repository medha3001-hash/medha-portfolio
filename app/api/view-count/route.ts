import { NextResponse } from "next/server";
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);

export async function GET() {
  try {
    const views = await redis.incr("portfolio_views");
    return NextResponse.json({ views });
  } catch {
    return NextResponse.json({ views: 0 });
  }
}