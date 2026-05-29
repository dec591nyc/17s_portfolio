import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main style={{ minHeight: "100vh" }}>
        {/* Intro */}
        <Hero />

        {/* Showcase */}
        <Projects />

        {/* Technical capabilities */}
        <Skills />

        {/* Career roadmap */}
        <Experience />

        {/* Connection interface */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
