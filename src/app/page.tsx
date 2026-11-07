import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Stack } from "@/components/Stack";
import { CVDownload } from "@/components/CVDownload";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Only the home page shows the hero screenshot, so only it preloads. */}
      <link
        rel="preload"
        href="/screenshots/kanvashub.webp"
        as="image"
        type="image/webp"
        fetchPriority="high"
      />
      <Hero />
      <Ticker />
      <About />
      <Experience />
      <Projects />
      <Stack />
      <CVDownload />
      <Contact />
      <Footer />
    </main>
  );
}
