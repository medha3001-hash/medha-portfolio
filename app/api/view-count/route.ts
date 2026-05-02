import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

const redis = Redis.fromEnv();

export async function GET() {
  try {
    const views = await redis.incr('portfolio_views');
    return NextResponse.json({ views });
  } catch (error) {
    return NextResponse.json({ views: 0 }, { status: 500 });
  }
}