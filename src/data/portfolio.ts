// ============================================================
// PORTFOLIO DATA - Edit this file to customize your portfolio
// ============================================================

export const personal = {
  name: "Nikhilendra Rathore",
  shortName: "Nikhil",
  initials: "NR",
  title: "Software Engineer II",
  tagline: "Cloud-Native & Full-Stack",
  summary:
    "I build scalable, high-stakes systems at the intersection of healthcare and technology. Nearly 5 years architecting microservices, real-time pipelines, and secure patient-facing platforms that process millions of records and generate measurable revenue impact.",
  email: "nikhilendra7@gmail.com",
  phone: "(765) 775-3273",
  location: "Indiana, USA",
  linkedin: "https://linkedin.com/in/nikhilendrasrathore",
  github: "https://github.com/nsrathore",
  availableForWork: true,
};

export const stats = [
  { value: "3,600×", label: "Speed improvement" },
  { value: "$10M+", label: "Revenue recovered" },
  { value: "200%", label: "QE efficiency gain" },
];

export const impactCards = [
  {
    value: "3,600×",
    label: "faster processing",
    description:
      "Reduced 835 remittance file processing from 1 hour to seconds via AWS ECS microservice",
    color: "primary",
  },
  {
    value: "$10M+",
    label: "annual revenue",
    description:
      "Revenue recovered for healthcare clients through improved claims classification accuracy",
    color: "dark",
  },
  {
    value: "200%",
    label: "efficiency gain",
    description:
      "QE testing efficiency increase via real-time insurance eligibility verification service",
    color: "primary",
  },
  {
    value: "10K+",
    label: "attacks blocked",
    description:
      "Cyberattacks blocked through response header hardening and reCAPTCHA across patient-facing apps",
    color: "dark",
  },
];

export type ProjectTag = "all" | "backend" | "frontend" | "devops" | "security" | "ai";

export const projects = [
  {
    id: "remittance-engine",
    title: "835 Remittance File Processing Engine",
    company: "Zotec Partners · 2024 - 2025",
    tags: ["backend", "devops"] as ProjectTag[],
    metric: { value: "3,600×", label: "faster processing" },
    metricColor: "primary",
    problem:
      "Healthcare billing operations relied on a monolithic batch process that parsed 835 medical remittance files - taking over 1 hour to run. Claims teams couldn't get real-time denial visibility, causing revenue delays and manual rework across millions of records.",
    approach:
      "Architected a cloud-native AWS ECS microservice in C#/.NET with Terraform for infrastructure-as-code. Integrated Splunk observability for instant denial root-cause analysis and used AWS Secrets Manager for zero-trust secret handling. Deployed via GitHub Actions CI/CD.",
    result:
      "Processing dropped from 1 hour to seconds - a 3,600× improvement. Claims teams gained near-real-time data access, enabling faster insurer appeals and dramatically reducing revenue cycle delays for enterprise healthcare clients.",
    tech: ["C#", ".NET", "AWS ECS", "Terraform", "Splunk", "GitHub Actions", "AWS Secrets Manager"],
  },
  {
    id: "resume-tailor",
    title: "Resume Tailor",
    company: "Personal Project · 2026",
    tags: ["frontend", "backend", "ai"] as ProjectTag[],
    metric: { value: "0–100", label: "ATS score" },
    metricColor: "dark",
    link: "https://resume-tailor-khaki.vercel.app/",
    github: "https://github.com/nsrathore/resume-tailor",
    systemDesign: "/images/projects/resume-tailor/resume_tailor_system_design.svg",
    problem:
      "Job seekers lose out to ATS filters before a human ever reads their resume. Manually tailoring bullets for each job description is slow and it's rarely clear which keyword gaps are actually costing you the match.",
    approach:
      "Built a two-stage AI pipeline: /api/analyze calls Claude to score keyword overlap and surface missing terms, then /api/tailor streams Claude-rewritten bullets that incorporate those keywords - without fabricating experience. Validation via Zod, streaming via the Claude API.",
    result:
      "End-to-end ATS audit in seconds - a 0–100 match score, a keyword gap list, and Claude-rewritten bullets delivered via real-time streaming. Deployed live on Vercel.",
    tech: ["Next.js 14", "TypeScript", "Claude API", "Tailwind CSS", "Zod", "Vercel"],
  },
  {
    id: "claims-classification",
    title: "Medical Claims Classification Pipeline",
    company: "Zotec Partners · 2024",
    tags: ["backend"] as ProjectTag[],
    metric: { value: "$10M+", label: "annual recovery" },
    metricColor: "dark",
    problem:
      "A high-throughput medical claims pipeline had classification accuracy issues that directly translated to misrouted claims and revenue leakage. Even small percentage improvements at this scale cascaded into significant dollar impact for healthcare clients.",
    approach:
      "Deep-dived the C#/.NET claims categorization logic to identify misclassification patterns. Implemented targeted fixes validated against production data, using AI-assisted development (Cursor) to accelerate code analysis and PR throughput without sacrificing rigor.",
    result:
      "Classification accuracy improvements directly contributed to $10M+ in annual revenue recovery - demonstrating that precision engineering in revenue-critical pipelines has outsized business value beyond typical software metrics.",
    tech: ["C#", ".NET", "SQL Server", "Cursor AI", "GitHub Actions"],
  },
  {
    id: "eligibility-verification",
    title: "Insurance Eligibility Verification Service",
    company: "Zotec Partners · 2023–2024",
    tags: ["frontend", "backend", "devops"] as ProjectTag[],
    metric: { value: "200%", label: "QE efficiency" },
    metricColor: "primary",
    problem:
      "The patient payment portal lacked real-time insurance verification - a critical feature for billing workflows. Critical API authentication failures blocked the integration, and the team was without a tech lead during the most sensitive phase of delivery.",
    approach:
      "Stepped in as Interim Tech Lead, diagnosed the authentication root cause, and built the full eligibility service in Next.js with AWS and GitHub Actions. Integrated directly into the patient payment portal with real-time data flow and automated CI/CD pipelines.",
    result:
      "Delivered the integration, yielding a 200% increase in QE testing efficiency and enabling real-time insurance verification at scale - unblocking downstream billing and payment workflows across the patient-facing platform.",
    tech: ["Next.js", "AWS Lambda", "GitHub Actions", "REST APIs", "Node.js"],
  },
  {
    id: "denial-management",
    title: "Denial Management Observability Platform",
    company: "Zotec Partners · 2023",
    tags: ["devops", "backend"] as ProjectTag[],
    metric: { value: "Days→Hrs", label: "resolution time" },
    metricColor: "primary",
    problem:
      "Claims denial resolution was a black-box process - teams had no real-time visibility into why claims were denied, which insurers were responsible, or how to act quickly. Millions of annual claims moved through the system without operational monitoring.",
    approach:
      "Implemented Splunk observability dashboards and structured logging across the claims pipeline, built AWS Lambda-driven email outreach automation for validation workflows, and standardized CI/CD to reduce deployment risk across all services.",
    result:
      "Denial resolution time dropped from days to hours - operational blind spots eliminated across millions of annual claims. Automated email pipelines accelerated revenue collection cycles and reduced escalations to third-party collections.",
    tech: ["Splunk", "AWS Lambda", "GitHub Actions", "C#", ".NET"],
  },
  {
    id: "phi-security",
    title: "PHI Security Hardening Initiative",
    company: "Zotec Partners · 2022",
    tags: ["security", "frontend"] as ProjectTag[],
    metric: { value: "10K+", label: "attacks blocked" },
    metricColor: "dark",
    problem:
      "Patient-facing healthcare apps and billing services were exposed to automated bot attacks and form abuse, threatening PHI (Protected Health Information) and putting the company at risk of millions in HIPAA regulatory penalties.",
    approach:
      "Spearheaded a company-wide security initiative: implemented HTTP response header hardening (HSTS, CSP, X-Frame-Options) and deployed reCAPTCHA v3 across all patient-facing apps and healthcare billing services through a coordinated rollout.",
    result:
      "Blocked tens of thousands of cyberattacks, safeguarded PHI for thousands of patients, and prevented millions in potential regulatory restitution - demonstrating that proactive security pays dividends far beyond engineering effort.",
    tech: ["Angular", "AngularJS", "reCAPTCHA v3", "HTTP Security Headers", ".NET"],
  },
];

export const skills = [
  {
    category: "Backend & Languages",
    icon: "⚙",
    items: [
      { name: "C#", highlight: true },
      { name: ".NET", highlight: true },
      { name: "TypeScript", highlight: false },
      { name: "JavaScript", highlight: false },
      { name: "Node.js", highlight: false },
      { name: "Java", highlight: false },
      { name: "SQL", highlight: false },
      { name: "Microservices", highlight: false },
      { name: "RESTful APIs", highlight: false },
      { name: "Distributed Systems", highlight: false },
    ],
  },
  {
    category: "Frontend",
    icon: "◻",
    items: [
      { name: "Angular", highlight: true },
      { name: "React", highlight: false },
      { name: "Next.js", highlight: false },
      { name: "AngularJS", highlight: false },
      { name: "HTML5", highlight: false },
      { name: "CSS3", highlight: false },
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: "☁",
    items: [
      { name: "AWS ECS", highlight: true },
      { name: "AWS Lambda", highlight: true },
      { name: "Terraform", highlight: true },
      { name: "Docker", highlight: false },
      { name: "GitHub Actions", highlight: true },
      { name: "AWS Secrets Manager", highlight: false },
      { name: "Azure DevOps", highlight: false },
      { name: "CI/CD", highlight: false },
    ],
  },
  {
    category: "Observability & AI",
    icon: "✦",
    items: [
      { name: "Splunk", highlight: true },
      { name: "Cursor (AI-dev)", highlight: false },
      { name: "SQL Server", highlight: false },
      { name: "Postman", highlight: false },
      { name: "Git/GitHub", highlight: false },
      { name: "Agile/Scrum", highlight: false },
      { name: "TDD", highlight: false },
      { name: "Code Review", highlight: false },
    ],
  },
];

export const timeline = [
  {
    date: "Apr 2024 – Present",
    role: "Software Engineer II",
    place: "Zotec Partners",
  },
  {
    date: "Sep 2021 – Apr 2024",
    role: "Software Engineer I",
    place: "Zotec Partners",
  },
  {
    date: "May 2021",
    role: "B.S. Computer Science · GPA 3.4",
    place: "Purdue University, West Lafayette",
  },
];
