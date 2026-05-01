import { NextResponse } from "next/server";

const DRIVE_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${process.env.NEXT_PUBLIC_RESUME_FILEID}`;

export async function GET() {
  try {
    const response = await fetch(DRIVE_DOWNLOAD_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch resume" },
        { status: 500 }
      );
    }

    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Nikhilendra_Rathore_Resume.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("Resume proxy error:", err);
    return NextResponse.json(
      { error: "Failed to fetch resume" },
      { status: 500 }
    );
  }
}