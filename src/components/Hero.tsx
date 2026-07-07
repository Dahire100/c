/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Code2, Database, BrainCircuit, Terminal, FileDown } from "lucide-react";

interface HeroProps {
  onNavClick: (sectionId: string) => void;
  onOpenResume?: () => void;
}

const roles = [
  "Junior Associate @ ESDS",
  "AI & Data Science Graduate",
  "Full Stack Developer",
  "Problem Solver",
];

export default function Hero({ onNavClick, onOpenResume }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(() => {
    return localStorage.getItem("pratiksha_profile_photo") || null;
  });
  
  const heroRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const photoCardRef = useRef<HTMLDivElement | null>(null);

  // Rotate roles every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // GSAP Cinematic Entrance Timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.2 } });

      // Animate from initial blurred states
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 15, filter: "blur(5px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", delay: 0.2 }
      );

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 60, filter: "blur(15px)" },
        { opacity: 1, y: 0, filter: "blur(0px)" },
        "-=0.9"
      );

      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 30, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)" },
        "-=0.9"
      );

      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20, filter: "blur(5px)" },
        { opacity: 1, y: 0, filter: "blur(0px)" },
        "-=0.9"
      );

      // Animate 3D Photo Card in (with beautiful rotateY entrance)
      tl.fromTo(
        photoCardRef.current,
        { opacity: 0, scale: 0.85, rotateY: 30, filter: "blur(15px)" },
        { opacity: 1, scale: 1, rotateY: 0, filter: "blur(0px)", duration: 1.5, ease: "elastic.out(1, 0.75)" },
        "-=1.1"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // 3D Card Hover Interaction (Tilt)
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = photoCardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Get mouse position relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Calculate rotation degree (max 15 degrees)
    const rotateX = -(mouseY / (height / 2)) * 12;
    const rotateY = (mouseX / (width / 2)) * 12;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden px-4 md:px-8 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full z-10">
        {/* Left: Introduction */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          {/* Welcome Label */}
          <span
            ref={labelRef}
            className="text-xs md:text-sm font-mono tracking-[0.4em] text-purple-accent uppercase mb-4 md:mb-6 inline-block"
          >
            ✦ WELCOME TO MY PORTFOLIO SYSTEM
          </span>

          {/* Huge Typography Name */}
          <h1
            ref={titleRef}
            className="text-5xl sm:text-7xl md:text-8xl tracking-tight leading-none text-white font-medium select-none mb-4"
          >
            Pratiksha <br />
            <span className="font-display font-display-serif italic text-gradient tracking-normal">
              Khandbahale
            </span>
          </h1>

          {/* Dynamic Role Selector */}
          <div className="h-10 sm:h-12 flex items-center mb-6 text-xl sm:text-2xl md:text-3xl font-light text-white/90">
            <span className="mr-2.5 font-mono text-white/40 text-sm tracking-wider uppercase">
              // I AM A:
            </span>
            <div className="overflow-hidden h-full flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 25, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -25, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.4 }}
                  className="font-semibold text-gradient"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Description */}
          <p
            ref={descRef}
            className="text-base sm:text-lg text-text-muted max-w-xl mb-10 leading-relaxed font-normal"
          >
            I am passionate about building intelligent digital solutions through modern web technologies,
            artificial intelligence, and data-driven systems. Translating complex code into elegant user experiences.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-wrap">
            <button
              onClick={() => onNavClick("projects")}
              className="relative rounded-full py-4 px-8 text-sm font-bold tracking-wider text-bg bg-white shadow-xl hover:shadow-purple-accent/20 hover:scale-[1.03] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>View My Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="relative rounded-full py-4 px-8 text-sm font-bold tracking-wider text-white border border-purple-500/30 overflow-hidden group cursor-pointer flex items-center justify-center gap-2 bg-purple-500/10 shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <FileDown className="w-4 h-4 text-purple-accent animate-pulse" />
                <span>Resume / CV</span>
              </button>
            )}

            <button
              onClick={() => onNavClick("contact")}
              className="relative rounded-full py-4 px-8 text-sm font-bold tracking-wider text-white/80 hover:text-white border border-white/10 overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-15 transition-opacity" />
              {/* Animated hover gradient border */}
              <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-purple-accent/30 transition-all duration-300" />
              <span className="relative z-10">Contact Me</span>
            </button>
          </div>
        </div>

        {/* Right: Interactive 3D holographic Visual Profile Card */}
        <div className="lg:col-span-5 flex items-center justify-center relative perspective-1000 mt-12 lg:mt-0">
          {/* Outer floating orbiting rings */}
          <div className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-white/5 animate-spin -z-10" style={{ animationDuration: "25s" }} />
          <div className="absolute w-[360px] h-[360px] rounded-full border border-white/5 animate-spin -z-10" style={{ animationDuration: "15s", animationDirection: "reverse" }} />

          {/* 3D tilt card container */}
          <div
            ref={photoCardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="relative w-80 h-[450px] rounded-[32px] glass-panel p-6 flex flex-col justify-between transition-shadow duration-300 cursor-grab select-none shadow-2xl overflow-hidden"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: "preserve-3d",
              transition: isHovered ? "none" : "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              boxShadow: isHovered
                ? "0 30px 60px -15px rgba(139, 92, 246, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)"
                : "0 20px 40px -15px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Glossy sheen reflection overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${tilt.y * 10 + 160}px ${-tilt.x * 10 + 225}px, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%)`,
              }}
            />

            {/* Inner Top Meta Info */}
            <div className="flex justify-between items-center" style={{ transform: "translateZ(30px)" }}>
              <div className="flex items-center gap-1.5 bg-white/5 rounded-full px-3 py-1 border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono tracking-wider uppercase text-white/70">
                  SYSTEM ACTIVE
                </span>
              </div>
              <Terminal className="w-4 h-4 text-purple-accent" />
            </div>

            {/* Holographic Avatar Center Visual */}
            <div
              className="relative w-full h-56 flex items-center justify-center"
              style={{ transform: "translateZ(65px)" }}
            >
              {/* Tech concentric circular scanner graphics */}
              <div className="absolute w-44 h-44 rounded-full border border-purple-500/10 animate-ping" style={{ animationDuration: "3s" }} />
              <div className="absolute w-36 h-36 rounded-full border border-blue-500/20 border-dashed animate-spin" style={{ animationDuration: "12s" }} />
              <div className="absolute w-36 h-36 rounded-[24px] bg-slate-950/40 border border-white/10 flex items-center justify-center glow-purple overflow-hidden relative group/avatar shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all duration-300">
                <img
                  src={profilePhoto || "/photo2.jpeg"}
                  alt="Pratiksha Khandbahale Portrait"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/avatar:scale-110"
                />

                {/* Subtle digital overlay scanning effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-blue-500/5 pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-scan" />
              </div>

              {/* Floating satellite nodes with icons representing tech fields */}
              <div className="absolute top-4 left-6 w-9 h-9 rounded-xl bg-slate-950/80 border border-white/10 flex items-center justify-center shadow-md animate-float" style={{ animationDelay: "0s" }}>
                <Code2 className="w-4 h-4 text-purple-accent" />
              </div>
              <div className="absolute bottom-6 right-6 w-9 h-9 rounded-xl bg-slate-950/80 border border-white/10 flex items-center justify-center shadow-md animate-float" style={{ animationDelay: "1.5s" }}>
                <BrainCircuit className="w-4 h-4 text-pink-accent" />
              </div>
              <div className="absolute bottom-8 left-8 w-9 h-9 rounded-xl bg-slate-950/80 border border-white/10 flex items-center justify-center shadow-md animate-float" style={{ animationDelay: "3s" }}>
                <Database className="w-4 h-4 text-blue-accent" />
              </div>
            </div>

            {/* Inner Bottom Info Labels */}
            <div className="flex flex-col gap-1 text-left" style={{ transform: "translateZ(45px)" }}>
              <div className="font-mono text-[9px] text-purple-accent tracking-widest uppercase">
                ENGINEER IDENTIFICATION
              </div>
              <div className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                P_KHANDBAHALE
              </div>
              <div className="font-mono text-[10px] text-white/50 flex items-center justify-between mt-1">
                <span>ROLE: developer.bin</span>
                <span>STATUS: online.sh</span>
              </div>
            </div>

            {/* Micro grid accent background */}
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:8px_8px] rounded-br-[32px] pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
