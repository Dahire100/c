/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { Github, ExternalLink, Code2, Sparkles, BrainCircuit, Globe } from "lucide-react";
import { ProjectItem } from "../types";

const projectsData: ProjectItem[] = [
  {
    id: "proj_4",
    title: "NeuroAI",
    subtitle: "EEG Based ASD Intelligence Platform",
    description: "An intelligent healthcare solution designed to support Autism Spectrum Disorder (ASD) analysis using EEG brain signal data. Combines Deep Learning and custom ML architectures to analyze emotional patterns, evaluate cognitive states, and predict therapy response effectiveness.",
    techStack: ["Python", "Machine Learning", "Deep Learning", "EEG Processing", "AI Models"],
    githubUrl: "https://github.com/pratikshaa27/NeuroAI",
    liveUrl: "https://github.com/pratikshaa27/NeuroAI",
    size: "large",
    category: "AI & ML",
  },
  {
    id: "proj_1",
    title: "OliviaChain",
    subtitle: "Supply Chain Management & Delivery System",
    description: "Developed a robust mobile application to streamline Olivia's supply chain. Enables beauty parlours to place orders, tracks live deliveries, allows distributors to manage warehouse inventories, and provides administrators with real-time sales insights and analytic reports.",
    techStack: ["Flutter", "Java", "SQLite", "Android Studio", "Git"],
    githubUrl: "https://github.com/pratikshaa27",
    liveUrl: "https://github.com/pratikshaa27",
    size: "normal",
    category: "Mobile Dev",
  },
  {
    id: "proj_2",
    title: "Mindflow",
    subtitle: "Personalized Productivity & Well-being Platform",
    description: "Developed an adaptive productivity platform featuring structured learning roadmaps, integrated chatbot, and mental well-being trackers. Combines gamified challenges, rewards, and public speaking modules driven by behavioral analytics.",
    techStack: ["Machine Learning", "Flask", "React.js", "Gamification", "Python"],
    githubUrl: "https://github.com/pratikshaa27",
    liveUrl: "https://github.com/pratikshaa27",
    size: "normal",
    category: "AI & ML",
  },
  {
    id: "proj_3",
    title: "Re-dact",
    subtitle: "AI-Powered Secure Data Redaction Tool",
    description: "Built a privacy-focused security tool leveraging NLP and machine learning algorithms to redact, anonymize, and obfuscate sensitive personal identifiers from documents across multiple formats, maintaining strict data compliance.",
    techStack: ["Machine Learning", "PyQt", "React.js", "NLP", "Python"],
    githubUrl: "https://github.com/pratikshaa27",
    liveUrl: "https://github.com/pratikshaa27",
    size: "normal",
    category: "AI & ML",
  },
];

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Individual card tilt states
  const [tilts, setTilts] = useState<{ [key: string]: { x: number; y: number } }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const card = cardRefs.current[id];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Calculate rotation degree (max 8 degrees for stability inside bento grid)
    const rotateX = -(mouseY / (height / 2)) * 8;
    const rotateY = (mouseX / (width / 2)) * 8;

    setTilts((prev) => ({
      ...prev,
      [id]: { x: rotateX, y: rotateY },
    }));
  };

  const handleMouseLeave = (id: string) => {
    setHoveredId(null);
    setTilts((prev) => ({
      ...prev,
      [id]: { x: 0, y: 0 },
    }));
  };

  return (
    <section
      id="projects"
      className="py-24 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20"
    >
      {/* Title */}
      <div className="flex flex-col items-start text-left mb-16">
        <span className="text-xs font-mono tracking-[0.3em] text-purple-accent uppercase mb-2">
          [ 04 // SHOWCASE ]
        </span>
        <h2 className="text-4xl md:text-6xl text-white font-medium">
          Featured{" "}
          <span className="font-display font-display-serif italic text-gradient">
            Projects
          </span>
        </h2>
        <div className="w-16 h-[2px] bg-gradient-accent mt-4" />
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[250px] sm:auto-rows-[280px]">
        {projectsData.map((project, index) => {
          const isLarge = project.size === "large";
          const currentTilt = tilts[project.id] || { x: 0, y: 0 };
          const isHovered = hoveredId === project.id;

          return (
            <motion.div
              key={project.id}
              ref={(el) => {
                cardRefs.current[project.id] = el;
              }}
              onMouseMove={(e) => handleMouseMove(e, project.id)}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => handleMouseLeave(project.id)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`rounded-[32px] glass-panel p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group/card cursor-pointer transition-shadow duration-300 ${
                isLarge ? "md:col-span-2 lg:row-span-2" : "md:col-span-1 lg:row-span-2"
              }`}
              style={{
                transform: `rotateX(${currentTilt.x}deg) rotateY(${currentTilt.y}deg)`,
                transformStyle: "preserve-3d",
                transition: isHovered ? "none" : "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: isHovered
                  ? "0 25px 50px -12px rgba(139, 92, 246, 0.2), inset 0 1px 0 rgba(255,255,255,0.15)"
                  : "0 10px 30px -12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* Dynamic glowing background blur on hover */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 via-blue-600/5 to-pink-600/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
              />

              {/* Dynamic glow overlay following tilt cursor */}
              {isHovered && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${currentTilt.y * 30 + 150}px ${-currentTilt.x * 30 + 150}px, rgba(167, 139, 250, 0.12) 0%, transparent 60%)`,
                  }}
                />
              )}

              {/* Top Banner Category & Action Links */}
              <div className="flex justify-between items-center z-10" style={{ transform: "translateZ(20px)" }}>
                <span className="text-[10px] font-mono font-bold tracking-widest text-purple-accent uppercase bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 flex items-center gap-1.5">
                  <BrainCircuit className="w-3.5 h-3.5" />
                  {project.category}
                </span>

                <div className="flex gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-950/80 border border-white/5 hover:border-white/20 text-white/70 hover:text-white transition-colors"
                    aria-label={`View code for ${project.title}`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-950/80 border border-white/5 hover:border-white/20 text-white/70 hover:text-white transition-colors"
                    aria-label={`Launch live demo for ${project.title}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Center Content Title & Description */}
              <div className="my-auto text-left z-10" style={{ transform: "translateZ(40px)" }}>
                <span className="text-xs font-mono text-white/40 block mb-1">
                  {project.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white group-hover/card:text-gradient transition-all duration-300">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm text-text-muted leading-relaxed line-clamp-4">
                  {project.description}
                </p>
              </div>

              {/* Bottom Tech Chips & Action indicators */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 z-10" style={{ transform: "translateZ(30px)" }}>
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono bg-white/5 border border-white/5 hover:border-white/10 px-2.5 py-1 rounded-xl text-white/80 transition-colors"
                  >
                    #{tech}
                  </span>
                ))}
              </div>

              {/* Laser line effect at the bottom */}
              <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-accent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
