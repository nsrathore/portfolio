# Nikhilendra Rathore - Portfolio

A modern, interactive personal portfolio built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**. Features an AI chatbot powered by Claude that answers questions about your background, projects, and experience.

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS v3**
- **Framer Motion** - scroll animations & chat transitions
- **Anthropic Claude API** - AI chatbot
- **Formspree** - contact form (no backend required)
- **TypeScript**

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/portfolio.git
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
```

> **Note:** The site works without these keys - the chatbot will show an error message and the contact form will run in demo mode.

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
  email: "you@email.com",
  linkedin: "https://linkedin.com/in/yourhandle",
  github: "https://github.com/yourusername",
  // ...
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
    color: "blue", // blue | indigo | violet | slate
  },
];
```

### Projects / Case Studies
Each project has `title`, `company`, `tags`, a `metric` badge, and three narrative sections (`problem`, `approach`, `result`):
```ts
export const projects = [
  {
    id: "unique-id",
    title: "Your Project Title",
    company: "Company Name · Year",
    tags: ["backend", "devops"], // backend | frontend | devops | security
    metric: { value: "99%", label: "uptime" },
    metricColor: "blue",
    problem: "What was the pain point...",
    approach: "Why you chose specific tech...",
    result: "The measurable outcome...",
    tech: ["React", "AWS", "Docker"],
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
      { name: "C#", highlight: true },  // highlight = shows in blue
      { name: "Python", highlight: false },
    ],
  },
];
```

### Career Timeline
```ts
export const timeline = [
  { date: "2024 – Present", role: "Senior Engineer", place: "Company" },
];
```

### AI Chatbot context
The chatbot's knowledge lives in `src/app/api/chat/route.ts` in the `SYSTEM_PROMPT` constant. Edit this to update what the AI knows about you - your background, projects, personality, and what roles you're targeting.

---

## Deployment

### Option A: Vercel (recommended - easiest)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import your repo
3. Add environment variables in the Vercel dashboard
4. Deploy - done. Vercel handles everything automatically.

### Option B: GitHub Pages (static export)

Since the AI chatbot uses a server-side API route, GitHub Pages requires a workaround. You have two options:

**Option B1 - Remove the chatbot** and use static export:
```js
// next.config.js
const nextConfig = {
  output: 'export',
  basePath: '/your-repo-name',
  trailingSlash: true,
};
```
Then run `npm run build` and push the `out/` folder.

**Option B2 - Keep the chatbot, host on Vercel, point your GitHub Pages domain to it.**
This is the recommended path if you want the AI feature.

### Option C: Netlify

Similar to Vercel - connect your GitHub repo, add env vars, and deploy. Supports Next.js API routes natively.

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts      # AI chatbot API endpoint
│   ├── globals.css            # Global styles + font imports
│   ├── layout.tsx             # Root layout + metadata
│   └── page.tsx               # Main page (composes all sections)
├── components/
│   ├── Navbar.tsx             # Sticky nav + scroll progress bar
│   ├── Hero.tsx               # Hero section
│   ├── Impact.tsx             # 4-metric impact grid
│   ├── Projects.tsx           # Case studies with tag filtering
│   ├── Skills.tsx             # Categorized skill map
│   ├── About.tsx              # Bio + timeline + terminal card
│   ├── Contact.tsx            # Formspree contact form
│   ├── Footer.tsx             # Footer
│   └── ChatWidget.tsx         # Floating AI chat widget
├── data/
│   └── portfolio.ts           # ← ALL CONTENT LIVES HERE
└── lib/
    └── useInView.ts           # Scroll intersection observer hook
```

---

## Adding New Features

### New project tag color
In `Projects.tsx`, add to `TAG_COLORS`:
```ts
const TAG_COLORS = {
  yournewtag: "bg-teal-50 text-teal-600 border-teal-200",
};
```
Then add `"yournewtag"` to the `ProjectTag` type in `portfolio.ts`.

### New nav link / section
1. Add a new `<section id="your-section">` in `page.tsx`
2. Add the link to the `links` array in `Navbar.tsx`
3. Create your component in `src/components/`

### Change accent color
The accent color (`#3B5BDB` slate blue) appears in:
- `Navbar.tsx` - CTA button, logo dot
- `Hero.tsx` - badge, title, buttons
- `globals.css` - selection color
- All section label text (`text-[#3B5BDB]`)
- `tailwind.config.ts` - `slate.brand` token

Do a find-and-replace for `#3B5BDB` and `#2C44B8` (hover) across the project.

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## License

MIT - feel free to use this as a base for your own portfolio.
