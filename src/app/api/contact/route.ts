import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (process.env.CONTACT_FORM_ENABLED !== "true") {
    return NextResponse.json(
      { error: "The contact form is currently disabled." },
      { status: 503 }
    );
  }

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

  if (!formspreeId) {
    return NextResponse.json({ ok: true });
  }

  try {
    const body = await req.json();
    const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      return NextResponse.json({ ok: true });
    } else {
      return NextResponse.json(
        { error: "Failed to send message." },
        { status: 500 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}
