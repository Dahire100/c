/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, Laptop, Compass, Heart, GraduationCap } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  const currentFocus = [
    {
      title: "Currently Learning",
      description: "AI, Deep Learning & Generative Models",
      icon: BookOpen,
      color: "from-purple-500/20 to-indigo-500/5",
      border: "hover:border-purple-accent/40",
    },
    {
      title: "Building",
      description: "Full Stack Intelligent Web Systems",
      icon: Laptop,
      color: "from-blue-500/20 to-cyan-500/5",
      border: "hover:border-blue-accent/40",
    },
    {
      title: "Exploring",
      description: "Neural Networks & Predictive Analytics",
      icon: Compass,
      color: "from-pink-500/20 to-rose-500/5",
      border: "hover:border-pink-accent/40",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20"
    >
      {/* Title */}
      <div className="flex flex-col items-start text-left mb-16">
        <span className="text-xs font-mono tracking-[0.3em] text-purple-accent uppercase mb-2">
          [ 01 // IDENTITY ]
        </span>
        <h2 className="text-4xl md:text-6xl text-white font-medium">
          About{" "}
          <span className="font-display font-display-serif italic text-gradient">
            Me
          </span>
        </h2>
        <div className="w-16 h-[2px] bg-gradient-accent mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Statement of Purpose (Premium Document Card) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 rounded-[32px] glass-panel p-8 md:p-10 flex flex-col justify-between relative overflow-hidden"
        >
          {/* Subtle watermark background */}
          <div className="absolute right-6 top-8 text-white/5 font-mono text-8xl font-bold select-none pointer-events-none">
            01
          </div>

          <div>
            {/* Header style */}
            <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-purple-accent" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg leading-tight">Statement of Purpose</h3>
                <span className="text-[10px] font-mono text-white/40 uppercase">PORTFOLIO_SYSTEM_DOC_102.bin</span>
              </div>
            </div>

            {/* Document Content */}
            <div className="space-y-6 text-text-muted text-sm sm:text-base leading-relaxed text-left">
              <p>
                My name is <strong className="text-white font-semibold">Pratiksha Khandbahale</strong>, and I am a passionate Artificial Intelligence & Data Science graduate currently working as a Junior Associate in the Software Division at ESDS Software Solution Limited.
              </p>
              <p>
                I am driven by a strong interest in building intelligent, scalable, and user-focused software solutions. My passion lies at the intersection of Artificial Intelligence, Data Science, and Full Stack Development, where I continuously explore modern technologies and apply them to solve real-world problems.
              </p>
              <p>
                With hands-on experience in software development, backend systems, databases, and AI-driven solutions, I focus on writing clean, efficient, and maintainable code while continuously improving my technical expertise.
              </p>
              <p>
                I believe technology has the power to create meaningful impact, and my goal is to contribute to innovative projects, collaborate with talented teams, and grow as a software professional by building solutions that make a difference.
              </p>
            </div>
          </div>

          {/* Footer of the statement card */}
          <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
            <span className="flex items-center gap-1.5 text-purple-accent/80">
              <Heart className="w-3.5 h-3.5 fill-purple-500/20" /> Passion driven development.
            </span>
            <span>ID: PK_953_STMT</span>
          </div>
        </motion.div>

        {/* Right: Current Focus Cards */}
        <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
          {currentFocus.map((focus, index) => {
            const Icon = focus.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`flex-1 rounded-3xl glass-panel p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between group glass-panel-hover border-transparent ${focus.border}`}
              >
                {/* Micro glowing color block */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${focus.color} opacity-40 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none`} />

                {/* Focus Header */}
                <div className="flex justify-between items-start z-10">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950/80 border border-white/10 flex items-center justify-center shadow-lg group-hover:border-white/20 transition-all duration-300">
                    <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="text-[10px] font-mono text-white/30 tracking-wider">FOCUS_{index + 1}</span>
                </div>

                {/* Focus Text */}
                <div className="mt-6 text-left z-10">
                  <h4 className="text-xs font-mono text-purple-accent/80 uppercase tracking-widest mb-1.5">
                    {focus.title}
                  </h4>
                  <p className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">
                    {focus.description}
                  </p>
                </div>

                {/* Abstract geometric micro line accent */}
                <div className="absolute right-0 bottom-0 w-12 h-1 h-gradient-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
