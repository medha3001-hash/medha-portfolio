import { NextResponse } from "next/server";

export async function GET() {
  try {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) return NextResponse.json({ views: 0 });

    // Parse redis://default:PASSWORD@HOSTNAME:PORT
    const url = new URL(redisUrl);
    const password = url.password;
    const hostname = url.hostname;

    const res = await fetch(`https://${hostname}/incr/portfolio_views`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${password}`,
      },
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json({ views: data.result ?? 0 });
  } catch (e) {
    return NextResponse.json({ views: 0 });
  }
}