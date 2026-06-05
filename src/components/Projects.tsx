"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import BorderGlow from "./BorderGlow";

const projects = [
  {
    title: "WJBTT Nutrition App",
    category: "CMS",
    description:
      "Built a complete Dynamic CMS Page Builder enabling admins to create and manage pages without code changes. Features reusable content blocks and flexible layouts.",
    tags: ["Next.js", "Strapi", "REST API", "PostgreSQL"],
    color: "from-primary to-primary-light",
  },
  {
    title: "Dar As Siha Hospital",
    category: "Healthcare",
    description:
      "Modern healthcare information platform with CMS-driven content management, SEO optimization, and integrated frontend-backend systems.",
    tags: ["Next.js", "Strapi", "SEO", "Tailwind CSS"],
    color: "from-primary-light to-primary-lighter",
  },
  {
    title: "Vishwal Home Nursing",
    category: "Management",
    description:
      "Healthcare management system with dashboard modules, report management, salary & payout functionality, and role-based access control.",
    tags: ["React", "Node.js", "PostgreSQL", "REST API"],
    color: "from-primary-dark to-primary",
  },
  {
    title: "Dynamic CMS Platform",
    category: "CMS",
    description:
      "Reusable CMS system with custom page builders, content block management, authentication, and flexible API integrations for rapid deployment.",
    tags: ["Strapi", "Next.js", "Auth", "MongoDB"],
    color: "from-primary to-primary-lighter",
  },
];

const categories = ["All", "CMS", "Healthcare", "Management"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = projects.filter(
    (p) => activeFilter === "All" || p.category === activeFilter
  );

  return (
    <section id="projects" className="relative py-24 sm:py-32 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-block text-xs font-medium tracking-widest uppercase text-primary-light mb-4">
              Work
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Featured <span className="gradient-text">projects</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeFilter === cat
                    ? "text-text"
                    : "text-text-muted glass glass-hover"
                }`}
              >
                {activeFilter === cat && (
                  <motion.div
                    layoutId="project-filter"
                    className="absolute inset-0 rounded-lg bg-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <ScrollReveal delay={0.15 + i * 0.05}>
                  <BorderGlow
                    backgroundColor="#121212"
                    borderRadius={16}
                    glowColor="270 60 60"
                    colors={["#6D28D9", "#8B5CF6", "#A78BFA"]}
                    edgeSensitivity={25}
                    glowRadius={20}
                    glowIntensity={0.8}
                  >
                    <div className="group relative p-6 rounded-2xl">
                      <div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                      />

                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <span className="text-xs font-medium tracking-wider text-primary-light uppercase">
                            {project.category}
                          </span>
                          <div className="w-8 h-8 rounded-full glass flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <svg
                              className="w-4 h-4 text-text-muted group-hover:text-primary-light transition-colors"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-text mb-2 group-hover:text-primary-light transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-text-muted mb-4 leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 text-xs rounded-md bg-surface-lighter text-text-dim"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </BorderGlow>
                </ScrollReveal>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
