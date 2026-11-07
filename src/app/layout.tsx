import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Natanael Rudy, AI and Fullstack Engineer",
  description: "Fullstack engineer specializing in AI integration, real-time systems, and modern web architecture.",
  openGraph: {
    title: "Natanael Rudy, AI and Fullstack Engineer",
    description: "Fullstack engineer specializing in AI integration, real-time systems, and modern web architecture.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
