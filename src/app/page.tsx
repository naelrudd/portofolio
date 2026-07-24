import Image from "next/image";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Tools } from "@/components/Tools";
import { CVDownload } from "@/components/CVDownload";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Projects />
      <Tools />
      <CVDownload />
      <Contact />
    </main>
  );
}
