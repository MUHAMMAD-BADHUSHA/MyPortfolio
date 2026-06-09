"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "WJBTT Nutrition App",
    category: "CMS",
    description: "Built a complete Dynamic CMS Page Builder enabling admins to create and manage pages without code changes. Features reusable content blocks and flexible layouts.",
    tags: ["Next.js", "Strapi", "REST API", "PostgreSQL"],
    gradient: "linear-gradient(135deg, #00f0ff, #0066ff)",
  },
  {
    title: "Dar As Siha Hospital",
    category: "Healthcare",
    description: "Modern healthcare information platform with CMS-driven content management, SEO optimization, and integrated frontend-backend systems.",
    tags: ["Next.js", "Strapi", "SEO", "Tailwind CSS"],
    gradient: "linear-gradient(135deg, #7000ff, #0066ff)",
  },
  {
    title: "Vishwal Home Nursing",
    category: "Management",
    description: "Healthcare management system with dashboard modules, report management, salary & payout functionality, and role-based access control.",
    tags: ["React", "Node.js", "PostgreSQL", "REST API"],
    gradient: "linear-gradient(135deg, #ff0080, #7000ff)",
  },
  {
    title: "Dynamic CMS Platform",
    category: "CMS",
    description: "Reusable CMS system with custom page builders, content block management, authentication, and flexible API integrations for rapid deployment.",
    tags: ["Strapi", "Next.js", "Auth", "MongoDB"],
    gradient: "linear-gradient(135deg, #00f0ff, #7000ff)",
  },
];

const categories = ["All", "CMS", "Healthcare", "Management"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = projects.filter((p) => activeFilter === "All" || p.category === activeFilter);

  return (
    <section id="projects" className="relative py-24 sm:py-32 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
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
              color: "#ff0080",
              background: "rgba(255,0,128,0.05)",
              border: "1px solid rgba(255,0,128,0.1)",
            }}
          >
            &lt;work /&gt;
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-cyber-purple to-neon-pink">
              projects
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="relative px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300"
              style={{
                color: activeFilter === cat ? "#050008" : "rgba(224,224,255,0.5)",
                background: activeFilter === cat
                  ? "linear-gradient(135deg, #7000ff, #ff0080)"
                  : "rgba(5,0,20,0.4)",
                border: activeFilter === cat
                  ? "1px solid rgba(255,0,128,0.3)"
                  : "1px solid rgba(0,240,255,0.06)",
                boxShadow: activeFilter === cat ? "0 0 20px rgba(255,0,128,0.2)" : "none",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 items-stretch">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="h-full"
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: {
  project: typeof projects[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -20, y: x * 20 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.05 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="group relative rounded-2xl overflow-hidden cursor-default transition-all duration-200 h-full"
        style={{
          perspective: "1000px",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.1s ease-out",
        }}
      >
        <div
          className="relative p-1 rounded-2xl"
          style={{
            background: hovered
              ? project.gradient
              : "rgba(0,240,255,0.06)",
            transition: "background 0.4s ease",
            boxShadow: hovered
              ? `0 0 40px ${project.gradient.includes("00f0ff") ? "rgba(0,240,255,0.15)" : "rgba(112,0,255,0.15)"}`
              : "none",
          }}
        >
          <div
            className="relative rounded-xl p-6 sm:p-7 h-full flex flex-col"
            style={{
              background: hovered
                ? "rgba(5,0,20,0.85)"
                : "rgba(5,0,20,0.6)",
              transition: "background 0.4s ease",
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <span
                className="text-xs font-mono tracking-wider px-3 py-1 rounded-full"
                style={{
                  color: project.gradient.includes("00f0ff") ? "#00f0ff" : "#7000ff",
                  background: project.gradient.includes("00f0ff")
                    ? "rgba(0,240,255,0.08)"
                    : "rgba(112,0,255,0.08)",
                  border: project.gradient.includes("00f0ff")
                    ? "1px solid rgba(0,240,255,0.15)"
                    : "1px solid rgba(112,0,255,0.15)",
                }}
              >
                {project.category}
              </span>
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                style={{
                  background: hovered
                    ? `${project.gradient.includes("00f0ff") ? "rgba(0,240,255,0.15)" : "rgba(112,0,255,0.15)"}`
                    : "rgba(0,240,255,0.05)",
                  transform: hovered ? "translateX(2px) translateY(-2px)" : "none",
                }}
              >
                <ArrowUpRight
                  size={16}
                  style={{
                    color: hovered
                      ? (project.gradient.includes("00f0ff") ? "#00f0ff" : "#7000ff")
                      : "rgba(224,224,255,0.4)",
                    transition: "color 0.3s",
                  }}
                />
              </div>
            </div>

            <h3
              className="text-xl font-semibold mb-2 transition-colors duration-300"
              style={{
                color: hovered ? "#e0e0ff" : "rgba(224,224,255,0.9)",
              }}
            >
              {project.title}
            </h3>
            <p className="text-sm mb-5 leading-relaxed transition-colors duration-300"
              style={{ color: hovered ? "rgba(224,224,255,0.6)" : "rgba(224,224,255,0.4)" }}
            >
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono rounded-md transition-all duration-300"
                  style={{
                    color: hovered ? "rgba(0,240,255,0.7)" : "rgba(136,136,187,0.5)",
                    background: hovered ? "rgba(0,240,255,0.06)" : "rgba(255,255,255,0.03)",
                    border: hovered ? "1px solid rgba(0,240,255,0.1)" : "1px solid transparent",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {hovered && (
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, transparent 30%, ${project.gradient.includes("00f0ff") ? "rgba(0,240,255,0.02)" : "rgba(112,0,255,0.02)"} 70%, transparent 100%)`,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
