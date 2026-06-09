"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "An exceptional developer who brings both creative vision and technical rigor. Every interaction was polished and professional.",
    author: "Sarah Chen",
    role: "CTO, TechFlow Inc.",
    initials: "SC",
  },
  {
    quote: "The attention to detail is remarkable. The final product exceeded our expectations in both design and performance.",
    author: "Marcus Rivera",
    role: "Product Lead, Nexus Labs",
    initials: "MR",
  },
  {
    quote: "Rare to find someone who understands both design and engineering at this level. A true asset to any project.",
    author: "Elena Voss",
    role: "Design Director, Studio Nine",
    initials: "EV",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="relative py-24 sm:py-32 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span
            className="inline-block text-xs font-mono tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{
              color: "#00f0ff",
              background: "rgba(0,240,255,0.05)",
              border: "1px solid rgba(0,240,255,0.1)",
            }}
          >
            &lt;testimonials /&gt;
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            What{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-cyber-purple to-neon-pink">
              clients
            </span>{" "}
            say
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative"
        >
          <div
            className="relative p-8 sm:p-10 rounded-2xl text-center"
            style={{
              background: "rgba(5,0,20,0.4)",
              border: "1px solid rgba(0,240,255,0.08)",
              boxShadow: "0 0 40px rgba(0,240,255,0.03)",
            }}
          >
            <div className="absolute top-6 left-8 text-5xl leading-none" style={{ color: "rgba(0,240,255,0.1)" }}>
              &ldquo;
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-lg sm:text-xl leading-relaxed mb-8 italic" style={{ color: "rgba(224,224,255,0.6)" }}>
                  {testimonials[current].quote}
                </p>

                <div className="flex items-center justify-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
                    style={{
                      background: "rgba(0,240,255,0.1)",
                      color: "#00f0ff",
                      border: "1px solid rgba(0,240,255,0.15)",
                    }}
                  >
                    {testimonials[current].initials}
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-text-primary text-sm">
                      {testimonials[current].author}
                    </div>
                    <div className="text-xs" style={{ color: "rgba(136,136,187,0.6)" }}>
                      {testimonials[current].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="transition-all duration-300"
                style={{
                  width: i === current ? 32 : 8,
                  height: 8,
                  borderRadius: i === current ? 4 : "50%",
                  background: i === current ? "#00f0ff" : "rgba(0,240,255,0.1)",
                  boxShadow: i === current ? "0 0 10px rgba(0,240,255,0.4)" : "none",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
