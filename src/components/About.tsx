"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { Code2, Database, Layers } from "lucide-react";

const AboutScene = dynamic(() => import("@/components/AboutScene"), { ssr: false });

const highlights = [
  {
    icon: <Code2 size={18} />,
    color: "#06B6D4",
    title: "Full Stack Web Development",
    description: "Building modern MERN stack applications with React, Next.js, Node.js, Express, and Strapi.",
  },
  {
    icon: <Layers size={18} />,
    color: "#8B5CF6",
    title: "CMS & API Development",
    description: "Creating dynamic CMS platforms, page builders, and REST APIs with Strapi for flexible content management.",
  },
  {
    icon: <Database size={18} />,
    color: "#A855F7",
    title: "Database Design & Performance",
    description: "Designing efficient MongoDB and PostgreSQL schemas, authentication systems, and optimized backend solutions.",
  },
];

const techIcons = [
  { name: "React", color: "#61DAFB", angle: 0 },
  { name: "Node", color: "#339933", angle: 72 },
  { name: "Next", color: "#fff", angle: 144 },
  { name: "Mongo", color: "#47A248", angle: 216 },
  { name: "TS", color: "#3178C6", angle: 288 },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-4 min-h-screen flex items-center overflow-hidden"
    >
      <AboutScene inView={isInView} />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <span
            className="inline-block text-xs font-mono tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{
              color: "#06B6D4",
              background: "rgba(6,182,212,0.06)",
              border: "1px solid rgba(6,182,212,0.12)",
            }}
          >
            &lt;about_me /&gt;
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
            ABOUT{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-cyber-purple to-neon-pink">
              ME
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div
              className="relative rounded-2xl p-[1px]"
              style={{
                background: "linear-gradient(135deg, rgba(6,182,212,0.25), rgba(139,92,246,0.25), rgba(168,85,247,0.25))",
              }}
            >
              <div
                className="relative rounded-2xl p-6 sm:p-8 text-center overflow-hidden"
                style={{
                  background: "rgba(2,0,20,0.7)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="relative w-28 h-28 mx-auto mb-5">
                  <div className="w-full h-full rounded-2xl overflow-hidden relative z-10"
                    style={{
                      border: "1px solid rgba(6,182,212,0.2)",
                      boxShadow: "0 0 25px rgba(6,182,212,0.1)",
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
                          fallback.className = "text-4xl font-bold flex items-center justify-center w-full h-full";
                          fallback.style.background = "linear-gradient(135deg, #06B6D4, #8B5CF6)";
                          fallback.style.webkitBackgroundClip = "text";
                          fallback.style.webkitTextFillColor = "transparent";
                          fallback.textContent = "MB";
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">Muhammad Badhusha</h3>
                <p className="text-sm font-mono mb-1" style={{ color: "#06B6D4" }}>
                  Junior MERN Stack Developer
                </p>
                <p className="text-xs mb-4" style={{ color: "rgba(148,163,184,0.5)" }}>
                  at WebCastle Technologies
                </p>

                <div className="flex justify-center gap-2">
                  {["GitHub", "LinkedIn", "Twitter"].map((social) => (
                    <a
                      key={social}
                      href={`https://${social.toLowerCase()}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs font-mono rounded-lg transition-all duration-300"
                      style={{
                        color: "rgba(6,182,212,0.6)",
                        background: "rgba(6,182,212,0.05)",
                        border: "1px solid rgba(6,182,212,0.1)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#06B6D4";
                        e.currentTarget.style.borderColor = "rgba(6,182,212,0.3)";
                        e.currentTarget.style.boxShadow = "0 0 15px rgba(6,182,212,0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "rgba(6,182,212,0.6)";
                        e.currentTarget.style.borderColor = "rgba(6,182,212,0.1)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3 space-y-5"
          >
            <div
              className="rounded-2xl p-5 sm:p-7"
              style={{
                background: "rgba(2,0,20,0.6)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(6,182,212,0.06)",
              }}
            >
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(224,224,255,0.75)" }}>
                I&apos;m a Junior MERN Stack Developer at WebCastle Technologies with
                1+ year of experience building modern web applications and scalable
                digital solutions. I specialize in React.js, Next.js, Node.js,
                Express.js, Strapi, PostgreSQL, and MongoDB.
              </p>
              <p className="text-sm sm:text-base leading-relaxed mt-4" style={{ color: "rgba(224,224,255,0.75)" }}>
                I enjoy transforming complex business requirements into intuitive,
                high-performance web applications — from CMS platforms and healthcare
                systems to custom business solutions and reporting modules.
              </p>
            </div>

            <div
              className="rounded-2xl p-5 sm:p-7"
              style={{
                background: "rgba(2,0,20,0.6)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(6,182,212,0.06)",
              }}
            >
              <div className="flex flex-wrap gap-3">
                {techIcons.map((tech) => (
                  <span
                    key={tech.name}
                    className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg"
                    style={{
                      color: tech.color,
                      background: `${tech.color}12`,
                      border: `1px solid ${tech.color}25`,
                      boxShadow: `0 0 10px ${tech.color}10`,
                    }}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { label: "Projects", value: "15+", gradient: "linear-gradient(135deg, #06B6D4, #3B82F6)" },
                { label: "Experience", value: "1+ Year", gradient: "linear-gradient(135deg, #3B82F6, #8B5CF6)" },
                { label: "Technologies", value: "10+", gradient: "linear-gradient(135deg, #8B5CF6, #A855F7)" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl p-4 text-center transition-all duration-300"
                  style={{
                    background: "rgba(2,0,20,0.6)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(6,182,212,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(6,182,212,0.15)";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(6,182,212,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(6,182,212,0.06)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span
                    className="text-2xl sm:text-3xl font-bold"
                    style={{
                      background: stat.gradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {stat.value}
                  </span>
                  <p className="text-xs font-mono mt-1" style={{ color: "rgba(148,163,184,0.6)" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-4 sm:gap-5 mt-6 sm:mt-8"
        >
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            >
              <div
                className="group relative p-5 sm:p-6 rounded-xl transition-all duration-500 h-full"
                style={{
                  background: "rgba(2,0,20,0.6)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid",
                  borderColor: `${item.color}15`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = `${item.color}35`;
                  el.style.boxShadow = `0 0 25px ${item.color}10, inset 0 0 25px ${item.color}03`;
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = `${item.color}15`;
                  el.style.boxShadow = "none";
                  el.style.transform = "translateY(0)";
                }}
              >
                <div className="flex gap-4 items-start">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: `${item.color}15`,
                      color: item.color,
                      boxShadow: `0 0 12px ${item.color}10`,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-mono" style={{ color: item.color }}>
                        {`0${i + 1}`}
                      </span>
                      <h3
                        className="font-semibold transition-colors duration-300"
                        style={{ color: "#fff" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = item.color; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "#fff"; }}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm" style={{ color: "rgba(224,224,255,0.6)" }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
