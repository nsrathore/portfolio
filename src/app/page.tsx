import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Impact from "@/components/Impact";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Impact />
      <Projects />
      <Skills />
      <About />
      <Contact />
      <Footer />
      <ChatWidget />
    </main>
  );
}
