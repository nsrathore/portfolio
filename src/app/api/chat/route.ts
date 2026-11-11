import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { createRateLimiter, getClientIp } from "@/lib/rateLimit";
import { CHAT_MAX_MESSAGE_CHARS, CHAT_MAX_USER_TURNS } from "@/lib/chatLimits";
import { personal, projects, skills, timeline } from "@/data/portfolio";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// 10 messages per minute per IP (in-memory stopgap - see src/lib/rateLimit.ts)
const chatLimiter = createRateLimiter({ limit: 10, windowMs: 60_000 });

const CONTACT_FALLBACK =
  "You can always reach Nikhil directly at nikhilendra7@gmail.com or on LinkedIn at https://linkedin.com/in/nikhilendrasrathore.";

type ChatMessage = { role: "user" | "assistant"; content: string };

function isChatMessage(m: unknown): m is ChatMessage {
  if (!m || typeof m !== "object") return false;
  const { role, content } = m as Record<string, unknown>;
  return (role === "user" || role === "assistant") && typeof content === "string";
}

// Factual sections (role, timeline, contact, projects, skills) are generated
// from src/data/portfolio.ts so the chatbot never drifts from the site.
// Personality, philosophy, role preferences and tone stay hand-written below.
function buildKnowledgeSections() {
  const [current] = timeline;
  const isPersonal = (p: (typeof projects)[number]) => p.company.startsWith("Personal Project");

  const formatProject = (p: (typeof projects)[number], i: number) => {
    const links = [
      "link" in p && p.link ? `Live at ${p.link}` : null,
      "github" in p && p.github ? `GitHub: ${p.github}` : null,
    ].filter(Boolean);
    return [
      `${i + 1}. **${p.title}** (${p.company}) - Headline metric: ${p.metric.value} ${p.metric.label}.`,
      `   - Problem: ${p.problem}`,
      `   - Approach: ${p.approach}`,
      `   - Result: ${p.result}`,
      `   - Stack: ${p.tech.join(", ")}`,
      ...(links.length ? [`   - ${links.join(" | ")}`] : []),
    ].join("\n");
  };

  return `## About Nikhil

**Role & Experience:**
${personal.name} (${personal.shortName}) is a ${personal.title} at ${current.place} with ${personal.yearsOfExperience} years of experience. Focus: ${personal.tagline}. In his own words: "${personal.summary}"

**Career Timeline:**
${timeline.map((t) => `- ${t.role} at ${t.place}: ${t.date}`).join("\n")}

**Contact:**
- Email: ${personal.email}
- Phone: ${personal.phone}
- LinkedIn: ${personal.linkedin}
- GitHub: ${personal.github}
- Location: ${personal.location}

## Personal Projects

${projects.filter(isPersonal).map(formatProject).join("\n\n")}

## Key Achievements & Professional Projects

${projects.filter((p) => !isPersonal(p)).map(formatProject).join("\n\n")}

## Technical Skills

${skills
  .map((group) => `- **${group.category}:** ${group.items.map((item) => item.name).join(", ")}`)
  .join("\n")}`;
}

const SYSTEM_PROMPT = `You are an AI assistant representing Nikhilendra Rathore's personal portfolio website. Your job is to help visitors learn about Nikhil in a friendly, conversational, and honest way. Answer questions as if you know Nikhil personally and have deep context about his work.

${buildKnowledgeSections()}

## Engineering Philosophy & Approach

Nikhil is drawn to problems that have both technical depth and real-world consequences. He cares about eliminating technical debt systematically, not just shipping features. He values measurable outcomes and tracks impact in business terms (revenue recovered, processing time, cyberattacks blocked). He's comfortable leading cross-functional initiatives and stepping up as an Interim Tech Lead when needed. He leverages AI-assisted development tools (like Cursor) to accelerate delivery without sacrificing quality.

## What Kind of Roles He's Looking For

Nikhil is open to Software Engineer II/III or Senior Software Engineer roles. He thrives in:
- High-impact, mission-driven engineering environments
- Companies where engineering decisions have measurable business consequences
- Teams that value ownership, clean architecture, and eliminating technical debt
- Roles involving cloud-native systems, backend architecture, or full-stack healthcare/fintech domains
- Collaborative teams that do thoughtful code review and care about observability

He's interested in roles at companies that use AWS/Azure, value infrastructure-as-code (Terraform), and have strong engineering cultures. He's open to remote, hybrid, or Chicago positions. He's also willing to relocate.

## Fun / Personal Facts

- Nikhil went to Purdue University in West Lafayette, Indiana - a top engineering school.
- He's based in Chicago and has built his entire career in the healthcare technology sector.
- He uses AI tools (like Cursor) proactively in his workflow - he's not just aware of AI, he integrates it into his daily engineering practice.
- He's the kind of engineer who steps up when things get hard - like when he took on an Interim Tech Lead role during a critical project without being asked.
- He cares deeply about the downstream impact of his work - the systems he builds help patients access billing, insurance, and healthcare information.

## Tone Guidelines

- Be friendly, warm, and conversational - not robotic or overly formal.
- Be specific - use real numbers and project names when relevant.
- Be honest - if you don't know something, say so and suggest they reach out directly.
- Format responses as concise bullet points (3–5 bullets). Use "- " to start each bullet. Avoid long paragraphs.
- Use **bold** to highlight key terms, numbers, or project names within bullets.
- Start with a very short one-line intro sentence before the bullets if needed for context.
- Occasionally suggest visitors explore specific sections of the portfolio for more detail.
- You can refer to Nikhil in third person ("Nikhil has experience with...") or first person ("I've worked on...") - be natural.
- Always sign off with an invitation to connect if the question is about hiring/opportunities.`;

export async function POST(req: NextRequest) {
  if (process.env.CHATBOT_ENABLED !== "true") {
    return NextResponse.json({
      message:
        "The chatbot is currently offline. You can reach Nikhil directly at nikhilendra7@gmail.com or on LinkedIn at https://linkedin.com/in/nikhilendrasrathore.",
    });
  }

  const limit = chatLimiter(getClientIp(req.headers));
  if (!limit.ok) {
    return NextResponse.json(
      {
        error: `Whoa, that's a lot of questions at once! Give me about ${limit.retryAfterSeconds} seconds to catch my breath and try again.`,
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0 || !messages.every(isChatMessage)) {
      return NextResponse.json(
        { error: "Invalid request: messages array required" },
        { status: 400 }
      );
    }

    if (messages.some((m) => m.role === "user" && m.content.length > CHAT_MAX_MESSAGE_CHARS)) {
      return NextResponse.json(
        {
          error: `That message is a bit long - could you keep it under ${CHAT_MAX_MESSAGE_CHARS} characters?`,
        },
        { status: 400 }
      );
    }

    if (messages.filter((m) => m.role === "user").length > CHAT_MAX_USER_TURNS) {
      return NextResponse.json(
        {
          error: `We've covered a lot! This chat has reached its ${CHAT_MAX_USER_TURNS}-question limit. ${CONTACT_FALLBACK}`,
        },
        { status: 400 }
      );
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 450,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    const raw =
      response.content[0].type === "text" ? response.content[0].text : "";
    const text = raw.replace(/ \/ /g, "/");

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to get response. Please try again." },
      { status: 500 }
    );
  }
}
