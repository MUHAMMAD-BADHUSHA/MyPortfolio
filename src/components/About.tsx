"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Database, Layers } from "lucide-react";

const highlights = [
  {
    icon: <Code2 size={18} />,
    color: "#00f0ff",
    title: "Full Stack Web Development",
    description: "Building modern MERN stack applications with React, Next.js, Node.js, Express, and Strapi.",
  },
  {
    icon: <Layers size={18} />,
    color: "#7000ff",
    title: "CMS & API Development",
    description: "Creating dynamic CMS platforms, page builders, and REST APIs with Strapi for flexible content management.",
  },
  {
    icon: <Database size={18} />,
    color: "#ff0080",
    title: "Database Design & Performance",
    description: "Designing efficient MongoDB and PostgreSQL schemas, authentication systems, and optimized backend solutions.",
  },
];

const techIcons = [
  { name: "React", color: "#61DAFB", x: -20, y: -15, delay: 0 },
  { name: "Node", color: "#339933", x: 25, y: -10, delay: 0.3 },
  { name: "Next", color: "#fff", x: -15, y: 20, delay: 0.6 },
  { name: "Mongo", color: "#47A248", x: 20, y: 15, delay: 0.9 },
  { name: "TS", color: "#3178C6", x: 0, y: -25, delay: 1.2 },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section id="about" ref={sectionRef} className="relative py-24 sm:py-32 px-4">
      <div className="max-w-6xl mx-auto">
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
            &lt;about_me /&gt;
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-cyber-purple to-neon-pink">
              Muhammad Badhusha
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div
              className="relative rounded-2xl overflow-hidden p-1"
              style={{
                background: "linear-gradient(135deg, rgba(0,240,255,0.2), rgba(112,0,255,0.2), rgba(255,0,128,0.2))",
              }}
            >
              <div
                className="relative rounded-xl p-8 text-center overflow-hidden"
                style={{ background: "rgba(5,0,20,0.8)" }}
              >
                <div className="scan-line" />
                {techIcons.map((tech) => (
                  <motion.div
                    key={tech.name}
                    className="absolute text-xs font-mono font-bold px-2 py-1 rounded"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1 + tech.delay, duration: 0.3 }}
                    style={{
                      left: `calc(50% + ${tech.x}px)`,
                      top: `calc(50% + ${tech.y}px)`,
                      color: tech.color,
                      background: `${tech.color}15`,
                      border: `1px solid ${tech.color}30`,
                      boxShadow: `0 0 10px ${tech.color}20`,
                    }}
                  >
                    {tech.name}
                  </motion.div>
                ))}

                <div
                  className="w-28 h-28 mx-auto rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,240,255,0.1), rgba(112,0,255,0.1))",
                    border: "1px solid rgba(0,240,255,0.2)",
                  }}
                >
                  <img
                    src="/avatar.png"
                    alt="Muhammad Badhusha"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        const fallback = document.createElement("span");
                        fallback.className = "text-4xl font-bold";
                        fallback.style.background = "linear-gradient(135deg, #00f0ff, #7000ff)";
                        fallback.style.webkitBackgroundClip = "text";
                        fallback.style.webkitTextFillColor = "transparent";
                        fallback.textContent = "MB";
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: "linear-gradient(135deg, transparent 40%, rgba(0,240,255,0.05) 50%, transparent 60%)",
                      animation: "shimmer 3s ease-in-out infinite",
                      backgroundSize: "200% 200%",
                    }}
                  />
                </div>

                <h3 className="text-xl font-bold text-text-primary mb-1">Muhammad Badhusha</h3>
                <p className="text-sm font-mono" style={{ color: "#00f0ff" }}>
                  Junior MERN Stack Developer
                </p>
                <div className="flex justify-center gap-3 mt-4">
                  {["GitHub", "LinkedIn", "Twitter"].map((social) => (
                    <a
                      key={social}
                      href={`https://${social.toLowerCase()}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs font-mono rounded-lg transition-all duration-300"
                      style={{
                        color: "rgba(0,240,255,0.6)",
                        background: "rgba(0,240,255,0.05)",
                        border: "1px solid rgba(0,240,255,0.1)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#00f0ff";
                        e.currentTarget.style.borderColor = "rgba(0,240,255,0.3)";
                        e.currentTarget.style.boxShadow = "0 0 15px rgba(0,240,255,0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "rgba(0,240,255,0.6)";
                        e.currentTarget.style.borderColor = "rgba(0,240,255,0.1)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              className="absolute -bottom-4 -right-4 w-40 h-40 rounded-full pointer-events-none"
              animate={isInView ? { scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] } : {}}
              transition={{ duration: 4, repeat: Infinity }}
              style={{
                background: "radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 70%)",
              }}
            />
            <motion.div
              className="absolute -top-4 -left-4 w-32 h-32 rounded-full pointer-events-none"
              animate={isInView ? { scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] } : {}}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              style={{
                background: "radial-gradient(circle, rgba(112,0,255,0.08) 0%, transparent 70%)",
              }}
            />
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: "rgba(224,224,255,0.7)" }}>
                I&apos;m a Junior MERN Stack Developer at WebCastle Technologies with
                1+ year of experience building modern web applications and scalable
                digital solutions. I specialize in React.js, Next.js, Node.js,
                Express.js, Strapi, PostgreSQL, and MongoDB.
              </p>
              <p className="text-base sm:text-lg leading-relaxed mt-4" style={{ color: "rgba(224,224,255,0.7)" }}>
                I enjoy transforming complex business requirements into intuitive,
                high-performance web applications — from CMS platforms and healthcare
                systems to custom business solutions and reporting modules.
              </p>
            </motion.div>

            <div className="space-y-4 pt-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                >
                  <div
                    className="group relative p-4 rounded-xl transition-all duration-300 h-full"
                    style={{
                      background: "rgba(5,0,20,0.4)",
                      border: "1px solid",
                      borderColor: `${item.color}15`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${item.color}40`;
                      e.currentTarget.style.boxShadow = `0 0 20px ${item.color}10`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${item.color}15`;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div className="flex gap-4 items-start">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          background: `${item.color}15`,
                          color: item.color,
                          boxShadow: `0 0 10px ${item.color}10`,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs font-mono" style={{ color: item.color }}>
                            {`0${i + 1}`}
                          </span>
                          <h3 className="font-semibold text-text-primary">{item.title}</h3>
                        </div>
                        <p className="text-sm" style={{ color: "rgba(224,224,255,0.6)" }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
