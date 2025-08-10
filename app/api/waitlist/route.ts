import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, country } = await request.json();

    if (!email || !country || typeof email !== "string" || typeof country !== "string") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Placeholder persistence. Replace with your database or email tool.
    // For now we just echo success to allow the UI flow.

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


