import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Stack } from "@/components/Stack";
import { CVDownload } from "@/components/CVDownload";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Projects />
      <Stack />
      <CVDownload />
      <Contact />
      <Footer />
    </main>
  );
}
