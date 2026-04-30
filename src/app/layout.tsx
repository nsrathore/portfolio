import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nikhilendra Rathore — Software Engineer II",
  description:
    "Software Engineer II with 4+ years building scalable, cloud-native systems in healthcare and billing. Specializing in C#/.NET, Angular, AWS, and Terraform.",
  keywords: [
    "Software Engineer",
    "C#",
    ".NET",
    "Angular",
    "AWS",
    "Terraform",
    "Healthcare Tech",
    "Nikhilendra Rathore",
  ],
  authors: [{ name: "Nikhilendra Rathore" }],
  openGraph: {
    title: "Nikhilendra Rathore — Software Engineer II",
    description:
      "Building scalable, high-stakes systems at the intersection of healthcare and technology.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999] focus:bg-[#3B5BDB] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-medium"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
