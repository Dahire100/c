/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoaderProps {
  onComplete: () => void;
}

const words = ["Developer", "Engineer", "Creator", "Innovator"];

export default function Loader({ onComplete }: LoaderProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // 2700ms Counter countdown
  useEffect(() => {
    const duration = 2700;
    const intervalTime = 25;
    const steps = duration / intervalTime;
    const increment = 100 / steps;
    let currentVal = 0;

    const timer = setInterval(() => {
      currentVal += increment;
      if (currentVal >= 100) {
        setCount(100);
        clearInterval(timer);
        setTimeout(() => {
          setIsDone(true);
          // Allow short delay for fade transition before completing
          setTimeout(onComplete, 600);
        }, 300);
      } else {
        setCount(Math.floor(currentVal));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Words rotation every 600ms during loading
  useEffect(() => {
    const wordTimer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 600);

    return () => clearInterval(wordTimer);
  }, []);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          id="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[hsl(230,60%,4%)] p-8 md:p-16 select-none overflow-hidden"
        >
          {/* Top Info HUD */}
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col">
              <span className="text-xs font-mono tracking-[0.3em] text-purple-accent uppercase">
                PORTFOLIO SYSTEM v2.6
              </span>
              <span className="text-[10px] font-mono text-white/40 mt-1">
                SECURE AUTHENTICATION: ACTIVE
              </span>
            </div>
            <div className="text-right font-mono text-[10px] text-white/40 hidden sm:block">
              <div>LATENCY: 12ms</div>
              <div>LOC: MAHARASHTRA, IN</div>
            </div>
          </div>

          {/* Center Rotating Words HUD */}
          <div className="flex flex-col items-center justify-center my-auto">
            <div className="h-20 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={wordIndex}
                  initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -40, opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="font-display font-display-serif italic text-5xl sm:text-6xl md:text-7xl text-gradient text-center"
                >
                  {words[wordIndex]}
                </motion.h1>
              </AnimatePresence>
            </div>
            <div className="text-[10px] font-mono tracking-[0.2em] text-white/50 uppercase mt-4">
              Initializing Digital Space
            </div>
          </div>

          {/* Bottom Loading Progress Bar & Counter */}
          <div className="w-full max-w-xl mx-auto flex flex-col gap-4">
            <div className="flex justify-between items-baseline font-mono">
              <span className="text-xs tracking-widest text-white/40">SYS_BUILD_SUCCESS</span>
              <span className="text-3xl sm:text-4xl font-extrabold text-white">
                {String(count).padStart(3, "0")}
                <span className="text-xs text-white/50 ml-1">%</span>
              </span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-accent rounded-full"
                style={{ width: `${count}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            <div className="flex justify-between text-[10px] font-mono text-white/30">
              <span>CORE_ENGINE_READY</span>
              <span>PRATIKSHA_KHANDBAHALE</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
