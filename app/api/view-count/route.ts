import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // This adds +1 to the counter every time it's called
    const views = await kv.incr('portfolio_views');
    return NextResponse.json({ views });
  } catch (error) {
    return NextResponse.json({ views: 0 }, { status: 500 });
  }
}