"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { Calendar } from "lucide-react";

const ExperienceScene = dynamic(() => import("@/components/ExperienceScene"), { ssr: false });

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
      <ExperienceScene inView={isInView} />

      <div className="max-w-5xl mx-auto relative z-10">
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
          <motion.div
            className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 origin-top overflow-hidden rounded-full"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, rgba(0,240,255,0.5), rgba(112,0,255,0.5), rgba(255,0,128,0.5), rgba(0,240,255,0.5))",
                backgroundSize: "100% 300%",
              }}
              animate={isInView ? {
                backgroundPosition: ["0% 0%", "0% 100%", "0% 0%"],
              } : {}}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {experiences.map((exp, i) => (
            <TimelineItem key={exp.period} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

const itemVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: 0.3 + i * 0.25, staggerChildren: 0.08, delayChildren: 0.35 + i * 0.25 },
  }),
};

const childVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function TimelineItem({ exp, index }: {
  exp: typeof experiences[0];
  index: number;
}) {
  const isLeft = index % 2 === 0;
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, amount: 0.2 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -12, y: (x - 0.5) * 12 });
  };

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
      className={`relative flex flex-col sm:flex-row items-start gap-6 mb-12 sm:mb-16 ${
        isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
      }`}
    >
      <div className="hidden sm:block flex-1" />

      <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-10" style={{ top: "1.25rem" }}>
        <motion.div
          className="w-5 h-5 rounded-full"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.35 + index * 0.2, type: "spring", stiffness: 200 }}
          style={{
            background: exp.color,
            boxShadow: `0 0 15px ${exp.color}60, 0 0 40px ${exp.color}30`,
          }}
        >
          <motion.div
            className="absolute inset-1 rounded-full"
            style={{ background: "#050008" }}
            animate={isInView ? {
              scale: [1, 0.8, 1],
              transition: { delay: 0.5 + index * 0.2, duration: 0.6 },
            } : {}}
          />
        </motion.div>
        <motion.div
          className="absolute -inset-2 rounded-full pointer-events-none"
          style={{
            border: `1.5px solid ${exp.color}`,
          }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={isInView ? {
            scale: [1, 2.2, 1],
            opacity: [0.5, 0, 0.5],
          } : {}}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.8 + index * 0.2 }}
        />
      </div>

      <div className="sm:hidden w-8 shrink-0" />

      <motion.div
        ref={cardRef}
        variants={itemVariants}
        custom={index}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex-1 w-full sm:max-w-[calc(50%-2rem)] group"
        style={{
          transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <motion.div
          className="relative p-5 sm:p-6 rounded-xl transition-all duration-300"
          animate={isInView && !hovered ? {
            y: [0, -3, 0],
          } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
          style={{
            background: hovered
              ? `linear-gradient(135deg, ${exp.color}12, rgba(5,0,20,0.5))`
              : "rgba(5,0,20,0.4)",
            border: `1px solid ${hovered ? `${exp.color}40` : `${exp.color}15`}`,
            boxShadow: hovered
              ? `0 0 35px ${exp.color}15, 0 0 60px ${exp.color}08`
              : "0 4px 20px rgba(0,0,0,0.2)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <motion.div variants={childVariants} className="flex items-center gap-2 mb-3">
            <Calendar size={12} style={{ color: exp.color }} />
            <span className="text-xs font-mono tracking-wider" style={{ color: exp.color }}>
              {exp.period}
            </span>
          </motion.div>

          <motion.h3 variants={childVariants} className="text-lg sm:text-xl font-bold text-text-primary mb-1"
            style={{ color: hovered ? exp.color : undefined }}
          >
            {exp.role}
          </motion.h3>
          <motion.p variants={childVariants} className="text-sm font-mono mb-3" style={{ color: `${exp.color}CC` }}>
            {exp.company}
          </motion.p>
          <motion.p variants={childVariants} className="text-sm leading-relaxed mb-4" style={{ color: "rgba(224,224,255,0.5)" }}>
            {exp.description}
          </motion.p>

          <motion.div variants={childVariants} className="flex flex-wrap gap-2">
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
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
