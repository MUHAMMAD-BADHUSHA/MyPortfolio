"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar } from "lucide-react";

const experiences = [
  {
    period: "2024 — Present",
    role: "Junior MERN Stack Developer",
    company: "WebCastle Technologies",
    description: "Building modern web applications with React, Next.js, Node.js, and Strapi. Delivering CMS platforms, healthcare systems, and custom business solutions.",
    highlights: ["CMS Development", "REST APIs", "Full-stack Delivery"],
    color: "#00f0ff",
  },
  {
    period: "2023 — 2024",
    role: "Junior Web Developer",
    company: "WebCastle Technologies",
    description: "Started as a junior developer, quickly mastering frontend and backend technologies. Contributed to production applications and learned industry best practices.",
    highlights: ["React & Next.js", "Node.js & Express", "MongoDB & PostgreSQL"],
    color: "#7000ff",
  },
  {
    period: "2023",
    role: "Started Development Journey",
    company: "Self-Taught & Training",
    description: "Began the web development journey with modern JavaScript, React, and Node.js. Built personal projects and completed intensive training.",
    highlights: ["JavaScript", "React.js", "Node.js"],
    color: "#ff0080",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section id="experience" ref={sectionRef} className="relative py-24 sm:py-32 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
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
            &lt;experience /&gt;
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Career{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-cyber-purple to-neon-pink">
              timeline
            </span>
          </h2>
        </motion.div>

        <div className="relative">
          <div
            className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{
              background: "linear-gradient(to bottom, rgba(0,240,255,0.3), rgba(112,0,255,0.3), rgba(255,0,128,0.3), transparent)",
            }}
          />

          {experiences.map((exp, i) => (
            <TimelineItem key={exp.period} exp={exp} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ exp, index, isInView }: {
  exp: typeof experiences[0];
  index: number;
  isInView: boolean;
}) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
      className={`relative flex flex-col sm:flex-row items-start gap-6 mb-12 sm:mb-16 ${
        isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
      }`}
    >
      <div className="hidden sm:block flex-1" />

      <div
        className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full z-10"
        style={{
          background: exp.color,
          boxShadow: `0 0 15px ${exp.color}60, 0 0 40px ${exp.color}30`,
          top: "1.25rem",
        }}
      >
        <div
          className="absolute inset-1 rounded-full"
          style={{
            background: "#050008",
          }}
        />
      </div>

      <div className="sm:hidden w-8 shrink-0" />

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex-1 w-full sm:max-w-[calc(50%-2rem)] group"
      >
        <div
          className="relative p-5 sm:p-6 rounded-xl transition-all duration-300"
          style={{
            background: "rgba(5,0,20,0.4)",
            border: "1px solid",
            borderColor: `${exp.color}15`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = `${exp.color}35`;
            e.currentTarget.style.boxShadow = `0 0 30px ${exp.color}10`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = `${exp.color}15`;
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={12} style={{ color: exp.color }} />
            <span className="text-xs font-mono tracking-wider" style={{ color: exp.color }}>
              {exp.period}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-1">
            {exp.role}
          </h3>
          <p className="text-sm font-mono mb-3" style={{ color: `${exp.color}CC` }}>
            {exp.company}
          </p>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(224,224,255,0.5)" }}>
            {exp.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {exp.highlights.map((h) => (
              <span
                key={h}
                className="px-2.5 py-1 text-[11px] font-mono rounded-md"
                style={{
                  color: exp.color,
                  background: `${exp.color}10`,
                  border: `1px solid ${exp.color}20`,
                }}
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
