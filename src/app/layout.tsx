import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const TITLE = "Natanael Rudy, Fullstack Engineer";
const DESCRIPTION =
  "Fullstack engineer in Malang, Indonesia. Two live marketplaces on Convex and Midtrans, an AI-driven product platform, and an open-source docs corpus for LLM agents.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Natanael Rudy",
  },
  description: DESCRIPTION,
  applicationName: "Natanael Rudy",
  authors: [{ name: "Natanael Rudy Hadinata", url: SITE_URL }],
  creator: "Natanael Rudy Hadinata",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Natanael Rudy",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Natanael Rudy, fullstack engineer building marketplaces and AI features that run in production",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Natanael Rudy Hadinata",
  alternateName: "Natanael Rudy",
  url: SITE_URL,
  image: `${SITE_URL}/og.png`,
  jobTitle: "Fullstack Engineer",
  description: DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Malang",
    addressRegion: "East Java",
    addressCountry: "ID",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universitas Negeri Malang",
  },
  knowsAbout: [
    "Convex",
    "Next.js",
    "React",
    "TypeScript",
    "Clerk",
    "Midtrans",
    "Large language models",
    "Retrieval-augmented generation",
  ],
  sameAs: [
    "https://github.com/naelrudd",
    "https://linkedin.com/in/natanaelrudy/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>

      <body className="min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
