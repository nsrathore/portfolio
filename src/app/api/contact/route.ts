import { NextRequest, NextResponse } from "next/server";

// Submissions faster than this are almost certainly automated
const MIN_FILL_MS = 3000;

export async function POST(req: NextRequest) {
  if (process.env.CONTACT_FORM_ENABLED !== "true") {
    return NextResponse.json(
      { error: "The contact form is currently disabled." },
      { status: 503 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Spam checks. Bots get a fake success so they can't tell they were caught.
  const honeypotFilled = typeof body.website === "string" && body.website.trim() !== "";
  const elapsedMs = typeof body.elapsedMs === "number" ? body.elapsedMs : 0;
  if (honeypotFilled || elapsedMs < MIN_FILL_MS) {
    console.warn(
      `Contact spam rejected: ${honeypotFilled ? "honeypot filled" : `submitted in ${elapsedMs}ms`}`
    );
    return NextResponse.json({ ok: true });
  }

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

  if (!formspreeId) {
    return NextResponse.json({ ok: true });
  }

  // Forward only the real fields - never the spam-check metadata
  const { name, email, subject, message } = body;

  try {
    const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name, email, subject, message }),
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
