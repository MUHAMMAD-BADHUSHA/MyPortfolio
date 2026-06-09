"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  "> Initializing neural interface...",
  "> Loading cyberpunk kernel...",
  "> Establishing secure connection...",
  "> Calibrating holographic display...",
  "> Syncing quantum particles...",
  "> Rendering 3D environment...",
  "> System ready.",
];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + Math.random() * 4 + 1;
      });
    }, 120);

    const lineInterval = setInterval(() => {
      setCurrentLine((l) => {
        if (l >= bootLines.length - 1) {
          clearInterval(lineInterval);
          return l;
        }
        return l + 1;
      });
    }, 400);

    const timeout = setTimeout(() => {
      setVisible(false);
    }, 3200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(lineInterval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "#050008" }}
        >
          <div className="max-w-md w-full px-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 text-center"
            >
              <span className="text-2xl font-bold" style={{ color: "#00f0ff", fontFamily: "var(--font-mono)" }}>
                &gt; PORTFOLIO_OS
              </span>
              <div className="text-xs mt-1" style={{ color: "#555588" }}>
                v2.0.0 — CYBERPUNK EDITION
              </div>
            </motion.div>

            <div className="space-y-2 mb-6 font-mono text-sm" style={{ fontFamily: "var(--font-mono)" }}>
              {bootLines.slice(0, currentLine + 1).map((line, i) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ color: i === currentLine ? "#00f0ff" : "#555588" }}
                >
                  {line}
                  {i === currentLine && (
                    <span className="inline-block w-2 h-4 ml-1 animate-pulse" style={{ background: "#00f0ff" }} />
                  )}
                </motion.div>
              ))}
            </div>

            <div className="relative h-1 rounded-full overflow-hidden" style={{ background: "rgba(0,240,255,0.1)" }}>
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: "linear-gradient(90deg, #00f0ff, #7000ff, #ff0080)" }}
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="text-xs mt-2 text-right font-mono" style={{ color: "#555588" }}>
              {Math.min(Math.round(progress), 100)}%
            </div>
          </div>

          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono"
            style={{ color: "rgba(0,240,255,0.2)" }}
          >
            [ SYSTEM BOOT SEQUENCE ]
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
