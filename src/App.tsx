/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ResumeModal from "./components/ResumeModal";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Handle section tracking via IntersectionObserver
  useEffect(() => {
    if (isLoading) return;

    const sectionIds = ["home", "about", "education", "skills", "projects", "certificates", "experience", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -40% 0px", // Detect active section when centered in viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [isLoading]);

  // Handle smooth scroll clicks
  const handleNavClick = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      // Small delay to allow drawer closing animations to settle
      setTimeout(() => {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setActiveSection(sectionId);
      }, 50);
    }
  };

  return (
    <>
      {/* Premium Loader */}
      <Loader onComplete={() => setIsLoading(false)} />

      {/* Main Portfolio System Container */}
      {!isLoading && (
        <div className="relative min-h-screen text-white select-none selection:bg-purple-accent/30 selection:text-white transition-opacity duration-1000 animate-[fadeIn_0.8s_ease_out]">
          {/* Futuristic Particle & Stellar Background */}
          <Background />

          {/* Floating Glass Navbar */}
          <Navbar activeSection={activeSection} onNavClick={handleNavClick} />

          {/* Main Layout Blocks */}
          <main className="relative z-10 w-full overflow-hidden">
            {/* HERO MODULE */}
            <Hero onNavClick={handleNavClick} onOpenResume={() => setIsResumeOpen(true)} />

            {/* IDENTITY / ABOUT MODULE */}
            <About />

            {/* ACADEMICS / EDUCATION MODULE */}
            <Education />

            {/* ABILITIES / SKILLS MODULE */}
            <Skills />

            {/* SHOWCASE / PROJECTS MODULE */}
            <Projects />

            {/* MERITS / CERTIFICATES MODULE */}
            <Certificates />

            {/* HISTORY / EXPERIENCE MODULE */}
            <Experience />

            {/* TRANSCEIVER / CONTACT MODULE */}
            <Contact />
          </main>

          {/* SYSTEM FOOTER */}
          <Footer onNavClick={handleNavClick} />

          {/* Resume Modal Window */}
          <div className="print-container-wrapper">
            <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
