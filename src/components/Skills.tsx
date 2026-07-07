/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Code, Terminal, Database, BrainCircuit } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  borderGlow: string;
  skills: { name: string; level: string }[];
}

const skillsData: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: Code,
    color: "text-purple-accent",
    borderGlow: "hover:border-purple-accent/40",
    skills: [
      { name: "Python", level: "Expert" },
      { name: "JavaScript", level: "Expert" },
      { name: "Java", level: "Expert" },
      { name: "C++", level: "Intermediate" },
      { name: "PHP", level: "Intermediate" },
    ],
  },
  {
    title: "Frameworks & UI",
    icon: Terminal,
    color: "text-blue-accent",
    borderGlow: "hover:border-blue-accent/40",
    skills: [
      { name: "React.js", level: "Expert" },
      { name: "Tailwind CSS", level: "Expert" },
      { name: "Flask", level: "Intermediate" },
      { name: "MERN Stack", level: "Expert" },
    ],
  },
  {
    title: "Databases & Tools",
    icon: Database,
    color: "text-emerald-400",
    borderGlow: "hover:border-emerald-500/40",
    skills: [
      { name: "MongoDB", level: "Expert" },
      { name: "MySQL", level: "Expert" },
      { name: "SQLite", level: "Intermediate" },
      { name: "Git & GitHub", level: "Expert" },
      { name: "Android Studio", level: "Intermediate" },
      { name: "Figma / PowerBI", level: "Intermediate" },
    ],
  },
  {
    title: "AI, Data Science & Soft Skills",
    icon: BrainCircuit,
    color: "text-pink-accent",
    borderGlow: "hover:border-pink-accent/40",
    skills: [
      { name: "Machine Learning", level: "Expert" },
      { name: "NLP & GenAI", level: "Expert" },
      { name: "Data Analysis", level: "Expert" },
      { name: "Problem Solving", level: "Expert" },
      { name: "Time Management", level: "Expert" },
      { name: "Task Prioritization", level: "Expert" },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-24 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20"
    >
      {/* Title */}
      <div className="flex flex-col items-start text-left mb-16">
        <span className="text-xs font-mono tracking-[0.3em] text-purple-accent uppercase mb-2">
          [ 03 // ABILITIES ]
        </span>
        <h2 className="text-4xl md:text-6xl text-white font-medium">
          Skill{" "}
          <span className="font-display font-display-serif italic text-gradient">
            Universe
          </span>
        </h2>
        <div className="w-16 h-[2px] bg-gradient-accent mt-4" />
      </div>

      {/* Grid of Skill Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillsData.map((category, catIndex) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.15 }}
              className={`rounded-3xl glass-panel p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group border-transparent ${category.borderGlow} transition-all duration-300`}
            >
              {/* Corner matrix effect */}
              <div className="absolute right-0 top-0 w-20 h-20 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:6px_6px] pointer-events-none" />

              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors">
                    <Icon className={`w-5 h-5 ${category.color}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base sm:text-lg tracking-tight">
                      {category.title}
                    </h3>
                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
                      SYS_MODULE_0{catIndex + 1}
                    </span>
                  </div>
                </div>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative rounded-2xl bg-white/5 border border-white/5 px-4 py-2.5 flex items-center justify-between gap-6 cursor-pointer select-none group/chip overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      {/* Interactive glow effect */}
                      <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover/chip:opacity-10 transition-opacity duration-300 pointer-events-none" />

                      <span className="text-sm font-semibold tracking-wide text-white/90 group-hover/chip:text-white transition-colors">
                        {skill.name}
                      </span>

                      {/* Small badge representing expertise level */}
                      <span className="text-[9px] font-mono bg-white/5 text-white/40 group-hover/chip:text-white/60 group-hover/chip:bg-white/10 py-1 px-2 rounded-lg transition-all duration-300">
                        {skill.level}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Status footer for each module */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[9px] text-white/30">
                <span>MODULE_STATE_ONLINE</span>
                <span>PK_LOADER_v2.0</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
