"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useInView } from "framer-motion";

const SkillsScene = dynamic(() => import("@/components/SkillsScene"), { ssr: false });

const ReactLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="2.5" />
    <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(0 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(120 12 12)" />
  </svg>
);
const NextLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 4-4 1.41 1.41L10.83 12l2.58 2.59L11 17zm5-4l-4 4-1.41-1.41L13.17 12l-2.58-2.59L12 8l4 4z" />
  </svg>
);
const JSLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="2" width="20" height="20" rx="2" />
    <path d="M15 18.5c.8.5 1.8.8 2.8.8 1.2 0 2-.5 2-1.5s-.8-1.2-2-1.5c-1.5-.4-3.2-1-3.2-3 0-2 1.8-3.3 4-3.3 1.4 0 2.5.4 3.3 1l-1.5 2c-.5-.4-1-.6-1.8-.6-1 0-1.5.5-1.5 1s.5.8 1.5 1.1c1.5.5 3.2 1 3.2 3 0 2.2-1.8 3.5-4.2 3.5-1.5 0-3-.5-4-1.5l1.5-2zm-7 .5c.3.5.8 1 1.5 1s1.2-.3 1.2-1V12h3v7c0 2-1.5 3-3.5 3s-3-1-3.5-2l1.8-1z" fill="#0A0A0A" />
  </svg>
);
const HTMLLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 2l1.8 18.2L12 22l7.2-1.8L21 2H3zm15.4 4.6H8.6l.2 2.4h9.4l-.6 6.8L12 17.6l-5.6-1.8-.2-2.8h2.6l.2 1.4 3 1 3-1 .4-4H6.2l-.6-6.2h12.8l-.2 2z" />
  </svg>
);
const TailwindLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 6C9.3 6 7.5 7.5 6.5 10.5c1-1.5 2.2-2.1 3.5-1.8.8.2 1.3.7 1.9 1.3C13 10.5 14.2 12 16.5 12c2.7 0 4.5-1.5 5.5-4.5-1 1.5-2.2 2.1-3.5 1.8-.8-.2-1.3-.7-1.9-1.3C15 7.5 13.8 6 12 6zM6.5 12C3.8 12 2 13.5 1 16.5c1-1.5 2.2-2.1 3.5-1.8.8.2 1.3.7 1.9 1.3C7 16.5 8.2 18 10.5 18c2.7 0 4.5-1.5 5.5-4.5-1 1.5-2.2 2.1-3.5 1.8-.8-.2-1.3-.7-1.9-1.3C9 13.5 7.8 12 6.5 12z" />
  </svg>
);
const NodeLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10l10 5 10-5V7l-10-5zm-1 17.6l-7-3.5v-7l7 3.5v7zm1-5.1L4.6 11 12 7.5 19.4 11 12 14.5zm8-5.4l-7 3.5v7l7-3.5v-7z" />
  </svg>
);
const ExpressLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 4-4 1.41 1.41L10.83 12l2.58 2.59L11 17zm5-4l-4 4-1.41-1.41L13.17 12l-2.58-2.59L12 8l4 4z" />
  </svg>
);
const StrapiLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8 8h8v2H10v2h4v2h-4v4H8V8z" fill="#0A0A0A" />
  </svg>
);
const RestLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M7 12h10M7 12l4-4m-4 4l4 4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 12l-4-4m4 4l-4 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const MongoLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2l2-8v-2h2v2l2 8h-2l-1-4-1 4z" />
  </svg>
);
const PostgresLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9v-2h2v2zm0-4H9V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
);
const DbLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="12" cy="6" rx="8" ry="3" />
    <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
    <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
  </svg>
);
const GitLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
);
const VercelLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 22h20L12 2z" />
  </svg>
);
const RenderLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17l-4-4 4-4 1.41 1.41L10.83 12l2.58 2.59L11 19zm5-4l-4 4-1.41-1.41L13.17 12l-2.58-2.59L12 8l4 4z" />
  </svg>
);

const skillTechs: {
  title: string;
  icon: string;
  techs: { name: string; logo: React.ReactNode; color: string }[];
}[] = [
  {
    title: "Frontend",
    icon: "⚡",
    techs: [
      { name: "React.js", logo: <ReactLogo />, color: "#61DAFB" },
      { name: "Next.js", logo: <NextLogo />, color: "#FFFFFF" },
      { name: "JavaScript", logo: <JSLogo />, color: "#F7DF1E" },
      { name: "HTML5 & CSS3", logo: <HTMLLogo />, color: "#E34F26" },
      { name: "Tailwind CSS", logo: <TailwindLogo />, color: "#06B6D4" },
    ],
  },
  {
    title: "Backend",
    icon: "🛠️",
    techs: [
      { name: "Node.js", logo: <NodeLogo />, color: "#339933" },
      { name: "Express.js", logo: <ExpressLogo />, color: "#FFFFFF" },
      { name: "Strapi CMS", logo: <StrapiLogo />, color: "#4945FF" },
      { name: "REST APIs", logo: <RestLogo />, color: "#8B5CF6" },
    ],
  },
  {
    title: "Database",
    icon: "🗄️",
    techs: [
      { name: "MongoDB", logo: <MongoLogo />, color: "#47A248" },
      { name: "PostgreSQL", logo: <PostgresLogo />, color: "#4169E1" },
      { name: "Database Design", logo: <DbLogo />, color: "#A78BFA" },
    ],
  },
  {
    title: "Tools",
    icon: "🔧",
    techs: [
      { name: "Git & GitHub", logo: <GitLogo />, color: "#F05032" },
      { name: "Vercel", logo: <VercelLogo />, color: "#FFFFFF" },
      { name: "Render", logo: <RenderLogo />, color: "#46E3B7" },
    ],
  },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 sm:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <SkillsScene active={isInView} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span
            className="inline-block text-xs font-mono tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{
              color: "#7000ff",
              background: "rgba(112,0,255,0.05)",
              border: "1px solid rgba(112,0,255,0.1)",
            }}
          >
            &lt;expertise /&gt;
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Tech{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-cyber-purple to-neon-pink">
              stack
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {skillTechs.map((cat, i) => (
            <button
              key={cat.title}
              onClick={() => setActiveCategory(i)}
              className="relative px-6 py-3 rounded-xl text-base font-semibold transition-all duration-300"
              style={{
                color: activeCategory === i ? "#050008" : "rgba(224,224,255,0.5)",
                background: activeCategory === i
                  ? "linear-gradient(135deg, #00f0ff, #0066ff)"
                  : "rgba(5,0,20,0.4)",
                border: activeCategory === i
                  ? "1px solid rgba(0,240,255,0.3)"
                  : "1px solid rgba(0,240,255,0.06)",
                boxShadow: activeCategory === i ? "0 0 20px rgba(0,240,255,0.2)" : "none",
              }}
            >
              <span className="flex items-center gap-2">
                <span>{cat.icon}</span>
                <span>{cat.title}</span>
              </span>
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold" style={{ color: "#00f0ff" }}>
                {skillTechs[activeCategory].title}
              </h3>
              <span className="text-xs font-mono" style={{ color: "rgba(136,136,187,0.6)" }}>
                [ {skillTechs[activeCategory].techs.length} technologies ]
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {skillTechs[activeCategory].techs.map((tech, idx) => (
                <SkillCard key={tech.name} tech={tech} index={idx} isInView={isInView} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 p-6 sm:p-8 rounded-2xl text-center"
          style={{
            background: "rgba(5,0,20,0.4)",
            border: "1px solid rgba(0,240,255,0.06)",
          }}
        >
          <p className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(224,224,255,0.5)" }}>
            Passionate about building scalable, user-focused applications
            and continuously expanding my expertise in modern web technologies.
            Currently deepening my skills in full-stack development and CMS solutions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function SkillCard({ tech, index, isInView }: {
  tech: { name: string; logo: React.ReactNode; color: string };
  index: number;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -20, y: (x - 0.5) * 20 });
  };

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.06 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-xl p-6 cursor-default transition-all duration-200 h-full flex flex-col items-center justify-center"
      style={{
        background: hovered
          ? `linear-gradient(135deg, ${tech.color}18, rgba(5,0,20,0.5))`
          : "rgba(5,0,20,0.3)",
        border: `1px solid ${hovered ? `${tech.color}45` : "rgba(0,240,255,0.06)"}`,
        boxShadow: hovered
          ? `0 0 40px ${tech.color}25, 0 0 80px ${tech.color}10`
          : "0 4px 20px rgba(0,0,0,0.2)",
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.03 : 1})`,
      }}
    >
      <div
        className="w-16 h-16 flex items-center justify-center rounded-2xl mb-4 transition-all duration-500"
        style={{
          background: hovered
            ? `radial-gradient(circle at center, ${tech.color}35, ${tech.color}10)`
            : `${tech.color}08`,
          color: tech.color,
          boxShadow: hovered
            ? `0 0 30px ${tech.color}30, inset 0 0 30px ${tech.color}10`
            : "none",
        }}
      >
        <div className="w-9 h-9">{tech.logo}</div>
      </div>

      <span
        className="block text-base font-semibold text-center transition-all duration-300"
        style={{ color: hovered ? tech.color : "rgba(224,224,255,0.8)" }}
      >
        {tech.name}
      </span>
    </motion.div>
  );
}
