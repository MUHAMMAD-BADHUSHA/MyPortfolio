"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

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

  const techs = useMemo(
    () => skillTechs.flatMap((cat) => cat.techs.map((t) => ({ name: t.name, color: t.color }))),
    []
  );

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 sm:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <CanvasParticles techs={techs} active={isInView} />
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
  const barWidth = `${60 + ((index * 17) % 35)}%`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-xl p-5 cursor-default transition-all duration-300 h-full flex flex-col"
      style={{
        background: hovered ? `${tech.color}08` : "rgba(5,0,20,0.3)",
        border: `1px solid ${hovered ? `${tech.color}30` : "rgba(0,240,255,0.06)"}`,
        boxShadow: hovered ? `0 0 30px ${tech.color}15` : "none",
      }}
    >
      <div
        className="w-14 h-14 mx-auto flex items-center justify-center rounded-xl mb-4 transition-all duration-300"
        style={{
          background: hovered ? `${tech.color}20` : `${tech.color}10`,
          color: tech.color,
          transform: hovered ? "scale(1.1)" : "scale(1)",
          boxShadow: hovered ? `0 0 20px ${tech.color}20` : "none",
        }}
      >
        <div className="w-8 h-8">{tech.logo}</div>
      </div>

      <span className="block text-base font-semibold text-center transition-colors duration-300"
        style={{ color: hovered ? tech.color : "rgba(224,224,255,0.8)" }}
      >
        {tech.name}
      </span>

      <div className="mt-auto pt-3 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: barWidth } : {}}
          transition={{ duration: 1, delay: 0.3 + index * 0.06, ease: "easeOut" }}
          style={{
            background: `linear-gradient(90deg, ${tech.color}, ${tech.color}80)`,
            boxShadow: hovered ? `0 0 10px ${tech.color}` : "none",
          }}
        />
      </div>
    </motion.div>
  );
}

function CanvasParticles({ techs, active }: { techs: { name: string; color: string }[]; active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; alpha: number; hue: number; sat: number; light: number;
      pulse: number; pulseSpeed: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.3 + 0.1,
        hue: 0, sat: 0, light: 0,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.005 + Math.random() * 0.01,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        const alpha = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${alpha * 0.5})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.04;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, [active, techs]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
    />
  );
}
