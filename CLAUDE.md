# Portfolio — Claude Code Context

## Project Overview
Personal portfolio site for Nikhilendra Rathore (Software Engineer II).
Single-page scroll layout. Light/clean aesthetic. Slate blue accent (#3B5BDB).

## Tech Stack
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS v3
- Framer Motion (animations)
- Anthropic SDK (AI chatbot via /api/chat)
- Formspree (contact form)

## Project Structure
src/
├── app/
│   ├── api/chat/route.ts     # AI chatbot endpoint — edit SYSTEM_PROMPT here to update bot knowledge
│   ├── globals.css           # Font imports, base styles
│   ├── layout.tsx            # Metadata lives here
│   └── page.tsx              # Composes all section components
├── components/
│   ├── Navbar.tsx            # Sticky nav + scroll progress bar
│   ├── Hero.tsx              # Name, stats, CTA buttons
│   ├── Impact.tsx            # 4-metric impact grid
│   ├── Projects.tsx          # Case studies + tag filter
│   ├── Skills.tsx            # Categorized skill map
│   ├── About.tsx             # Bio + timeline + terminal card
│   ├── Contact.tsx           # Formspree form
│   ├── Footer.tsx
│   └── ChatWidget.tsx        # Floating AI chat widget
├── data/
│   └── portfolio.ts          # ← SINGLE SOURCE OF TRUTH for all content
└── lib/
    └── useInView.ts          # IntersectionObserver hook for scroll animations

## Key Conventions
- ALL content (text, projects, skills, stats) lives in src/data/portfolio.ts — never hardcode content in components
- Animations: use useInView hook + Framer Motion. Pattern: `initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}`
- New components go in src/components/, imported in page.tsx
- Accent color token: #3B5BDB (hover: #2C44B8) — do not introduce new brand colors
- Font classes: font-display (Plus Jakarta Sans), font-body (DM Sans), font-mono (JetBrains Mono)
- Section structure: section tag → container-wide div → section-label p → h2 → content

## Images
- Personal/project images live in public/images/
- Headshot: public/images/headshot.jpg
- Project screenshots: public/images/projects/[project-id].jpg
- Use Next.js <Image> component (next/image) for all images — never bare <img> tags
- Standard headshot size: width={400} height={400}
- Project screenshot size: width={1200} height={800}
- Resume: public/resume/nikhilendra_rathore_resume.pdf

## Environment Variables
ANTHROPIC_API_KEY          # Claude API — chatbot
NEXT_PUBLIC_FORMSPREE_ID   # Contact form submissions

## Adding a New Project
1. Add entry to `projects` array in src/data/portfolio.ts
2. Add screenshot to public/images/projects/[project-id].jpg
3. Add project-id to the ProjectTag type if using a new tag
4. Update SYSTEM_PROMPT in src/app/api/chat/route.ts so the chatbot knows about it

## Adding a New Section
1. Create src/components/NewSection.tsx
2. Import and add <NewSection /> in src/app/page.tsx
3. Add nav link in Navbar.tsx links array
4. Follow existing section structure pattern

## Common Commands
npm run dev        # Start dev server (localhost:3000)
npm run build      # Production build + type check
npm run lint       # ESLint

## Do Not
- Do not use bare <img> tags (use next/image)
- Do not hardcode content in components (use portfolio.ts)
- Do not introduce new dependencies without checking if Framer Motion or Tailwind already covers it
- Do not use inline styles for colors — use Tailwind classes or the #3B5BDB token
- Do not modify globals.css font imports (breaks typography system)