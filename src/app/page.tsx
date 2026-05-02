import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ResumeDownload from "@/components/ResumeDownload";
import Impact from "@/components/Impact";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <main id="main-content" className="relative">
      <Navbar />
      <Hero />
      <ResumeDownload />
      {/* <Impact /> */}
      <Projects />
      <Skills />
      <About />
      <Contact />
      <Footer />
      <ChatWidget />
    </main>
  );
}
