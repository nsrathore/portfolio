# Nikhilendra Rathore - Portfolio

A modern, interactive personal portfolio built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**. Features an AI chatbot powered by Claude that answers questions about background, projects, and experience.

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS v3**
- **Framer Motion** — scroll animations & chat transitions
- **Anthropic Claude API** — AI chatbot (`claude-sonnet-4-6`)
- **Formspree** — contact form (no backend required)

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/nsrathore/portfolio.git
cd portfolio
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in your keys:

```env
# Get yours at https://console.anthropic.com
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Get yours at https://formspree.io (create a free form, copy the ID)
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_form_id_here

# Set to "true" to enable the AI chat widget, anything else disables it
CHATBOT_ENABLED=true
```

> **Note:** The site works without these keys — the chatbot will show an offline message and the contact form will run in demo mode.

### 3. Run locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Customization

All content lives in **one file**: `src/data/portfolio.ts`

### Personal info, name, email, links

```ts
export const personal = {
  name: "Your Name",
  location: "Chicago, USA",
  email: "you@email.com",
  linkedin: "https://linkedin.com/in/yourhandle",
  github: "https://github.com/yourusername",
  availableForWork: true,
};
```

### Stats (hero section numbers)

```ts
export const stats = [
  { value: "3,600×", label: "Speed improvement" },
  // Add or remove stats
];
```

### Impact cards

```ts
export const impactCards = [
  {
    value: "$10M+",
    label: "annual revenue",
    description: "...",
    color: "primary", // "primary" (olive) | "dark" (deep olive)
  },
];
```

### Projects / Case Studies

Each project has `title`, `company`, `tags`, a `metric` badge, and three narrative sections (`problem`, `approach`, `result`). Optionally add `link`, `github`, and `systemDesign` (path to an SVG architecture diagram):

```ts
export const projects = [
  {
    id: "unique-id",
    title: "Your Project Title",
    company: "Company Name · Year",
    tags: ["backend", "devops"], // backend | frontend | devops | security | ai
    metric: { value: "99%", label: "uptime" },
    metricColor: "primary", // "primary" | "dark"
    problem: "What was the pain point...",
    approach: "Why you chose specific tech...",
    result: "The measurable outcome...",
    tech: ["React", "AWS", "Docker"],
    link: "https://yourproject.com",        // optional
    github: "https://github.com/you/repo",  // optional
    systemDesign: "/images/projects/your-id/diagram.svg", // optional
  },
];
```

### Skills

```ts
export const skills = [
  {
    category: "Backend & Languages",
    icon: "⚙",
    items: [
      { name: "C#", highlight: true },
      { name: "Python", highlight: false },
    ],
  },
];
```

> The `highlight` field exists in the data but has no visual effect — all skill pills use the same white/zinc styling.

### Career Timeline

```ts
export const timeline = [
  { date: "2024 – Present", role: "Senior Engineer", place: "Company" },
];
```

### AI Chatbot context

The chatbot's knowledge lives in `src/app/api/chat/route.ts` in the `SYSTEM_PROMPT` constant. Edit this to update what the AI knows about you — background, projects, personality, and target roles. The chatbot formats all responses as bullet points and renders `**bold**` markdown inline.

---

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import your repo
3. Add environment variables in the Vercel dashboard (`ANTHROPIC_API_KEY`, `NEXT_PUBLIC_FORMSPREE_ID`, `CHATBOT_ENABLED`)
4. Deploy — Vercel handles everything automatically

> **PDF resume:** The resume preview uses a hardcoded public URL. If your Vercel project URL changes, update `PDF_PUBLIC_URL` in `src/components/ResumeDownload.tsx`.


---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/route.ts         # AI chatbot endpoint (Claude claude-sonnet-4-6)
│   │   ├── contact/route.ts      # Contact form handler
│   │   └── resume/route.ts       # Resume download handler
│   ├── globals.css               # Font imports + base styles (do not modify font imports)
│   ├── layout.tsx                # Root layout + metadata
│   └── page.tsx                  # Main page (composes all sections)
├── components/
│   ├── Navbar.tsx                # Sticky nav + scroll progress bar
│   ├── Hero.tsx                  # Name, location badge, stats, CTA buttons
│   ├── Impact.tsx                # 4-metric bento impact grid
│   ├── Projects.tsx              # Case studies with tag filtering + system design diagrams
│   ├── Skills.tsx                # Categorized skill map (olive card backgrounds)
│   ├── About.tsx                 # Bio + timeline + terminal card
│   ├── ResumeDownload.tsx        # Resume preview modal + download (Google Docs viewer iframe)
│   ├── Contact.tsx               # Formspree contact form
│   ├── Footer.tsx                # Centered copyright + left-aligned location
│   └── ChatWidget.tsx            # Floating AI chat widget (bullet + bold markdown renderer)
├── data/
│   └── portfolio.ts              # ← ALL CONTENT LIVES HERE
└── lib/
    └── useInView.ts              # Scroll intersection observer hook
```

---

## Adding New Features

### New project tag

In `Projects.tsx`, add to `TAG_COLORS`:

```ts
const TAG_COLORS = {
  yournewtag: "bg-[#F2F5E8] text-[#4A5A1E] border-[#C8D49A]",
};
```

Then add `"yournewtag"` to the `ProjectTag` type in `portfolio.ts`.

### New nav link / section

1. Create your component in `src/components/`
2. Add `<NewSection />` to `page.tsx`
3. Add the link to the `links` array in `Navbar.tsx`

### Change accent color

The primary olive accent (`#6B7C2E`, hover `#4A5A1E`) appears across all components. Do a project-wide find-and-replace for `#6B7C2E` and `#4A5A1E` to retheme. Secondary palette: `#C8D49A` (borders/cards), `#F2F5E8` (subtle backgrounds).

---

## Key Conventions

- **No hyphenation** — all body text uses `hyphens-none` to prevent justified text from splitting words across line breaks
- **No bare `<img>` tags** — always use Next.js `<Image>` from `next/image`
- **No hardcoded content** — all text and data goes in `src/data/portfolio.ts`
- **No new dependencies** — check if Tailwind or Framer Motion already covers it before adding a package
- **No inline color styles** — use Tailwind classes or the olive tokens (`#6B7C2E`, `#4A5A1E`, `#C8D49A`, `#F2F5E8`)

---

## Scripts

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build + type check
npm run start    # Start production server
npm run lint     # Run ESLint
```

