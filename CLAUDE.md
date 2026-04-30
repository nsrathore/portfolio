# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint via next lint
npm run start    # Serve production build
```

No test suite is configured.

## Environment

Requires `.env.local` with:
- `ANTHROPIC_API_KEY` — used by the chat API route
- `NEXT_PUBLIC_FORMSPREE_ID` — used by the Contact form

The site renders without these keys; the chatbot and contact form degrade gracefully.

## Architecture

Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion.

**Single source of truth for content:** `src/data/portfolio.ts` exports all copy, stats, projects, skills, and timeline. Components import from here — never hardcode content in components.

**AI chatbot:** `src/app/api/chat/route.ts` is a Next.js route handler that calls the Anthropic SDK (`claude-sonnet-4-6`, `max_tokens: 500`). The `SYSTEM_PROMPT` constant in that file is where the AI's knowledge about Nikhil lives — edit it when updating biographical info. The frontend widget is `src/components/ChatWidget.tsx`.

**Scroll animations:** Components use `src/lib/useInView.ts` (Intersection Observer hook) combined with Framer Motion `AnimatePresence` / `motion.*` for entrance animations.

**Layout:** `src/app/page.tsx` composes all section components in order. `src/app/layout.tsx` sets metadata and loads fonts.

## Key conventions

- Accent color is `#3B5BDB` (hover: `#2C44B8`), aliased as `slate.brand` in `tailwind.config.ts`. Use find-and-replace on both hex values when changing the brand color.
- Project tag type (`ProjectTag`) is defined in `portfolio.ts`; tag-to-color mapping lives in `Projects.tsx` (`TAG_COLORS`). Both must be updated together when adding a new tag.
- Impact card `color` prop accepts `"blue" | "indigo" | "violet" | "slate"` — these map to hardcoded Tailwind classes inside `Impact.tsx`.
- For GitHub Pages static export: set `output: 'export'` and `basePath` in `next.config.js` and remove the chat API route (server-side routes are incompatible with static export).
