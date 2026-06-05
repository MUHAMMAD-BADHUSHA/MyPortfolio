"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import BorderGlow from "./BorderGlow";

const testimonials = [
  {
    quote:
      "An exceptional developer who brings both creative vision and technical rigor. Every interaction was polished and professional.",
    author: "Sarah Chen",
    role: "CTO, TechFlow Inc.",
    initials: "SC",
  },
  {
    quote:
      "The attention to detail is remarkable. The final product exceeded our expectations in both design and performance.",
    author: "Marcus Rivera",
    role: "Product Lead, Nexus Labs",
    initials: "MR",
  },
  {
    quote:
      "Rare to find someone who understands both design and engineering at this level. A true asset to any project.",
    author: "Elena Voss",
    role: "Design Director, Studio Nine",
    initials: "EV",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="relative py-24 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-block text-xs font-medium tracking-widest uppercase text-primary-light mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              What <span className="gradient-text">clients</span> say
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="relative">
            <BorderGlow
              backgroundColor="#121212"
              borderRadius={16}
              glowColor="270 60 60"
              colors={["#6D28D9", "#8B5CF6", "#A78BFA"]}
              edgeSensitivity={25}
              glowRadius={20}
              glowIntensity={0.8}
            >
              <div className="relative p-8 sm:p-10 rounded-2xl text-center">
              <div className="absolute top-6 left-8 text-5xl text-primary/20 leading-none">
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
                  <p className="text-lg sm:text-xl text-text-muted leading-relaxed mb-8 italic">
                    {testimonials[current].quote}
                  </p>

                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary-light">
                      {testimonials[current].initials}
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-text text-sm">
                        {testimonials[current].author}
                      </div>
                      <div className="text-xs text-text-dim">
                        {testimonials[current].role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              </div>
            </BorderGlow>

            <div className="flex items-center justify-center gap-3 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 ${
                    i === current
                      ? "w-8 h-2 bg-primary rounded-full"
                      : "w-2 h-2 bg-surface-lighter rounded-full hover:bg-text-dim"
                  }`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
