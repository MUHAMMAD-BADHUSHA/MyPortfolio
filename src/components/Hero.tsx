"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 pt-24 overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] animate-pulse-slow" />
        <div className="w-[400px] h-[400px] rounded-full bg-primary-light/5 blur-[100px] animate-float" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <ScrollReveal delay={0.1}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary-light mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-success animate-pulse-slow" />
            Junior MERN Stack Developer
          </motion.div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            <span className="text-text">Hi, I&apos;m </span>
            <span className="gradient-text">Muhammad</span>
            <br />
            <span className="text-text">Badhusha</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <p className="mt-6 text-lg sm:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
            Junior MERN Stack Developer at WebCastle Technologies. I build
            modern web applications with React, Next.js, Node.js, and Strapi,
            turning complex business needs into seamless digital solutions.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#projects"
              className="group relative px-8 py-3.5 rounded-xl bg-primary text-white font-medium text-sm transition-all duration-300 hover:glow-strong hover:bg-primary-light"
            >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-primary-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="#contact"
              className="group relative px-8 py-3.5 rounded-xl glass text-text-muted font-medium text-sm transition-all duration-300 glass-hover"
            >
              Get in Touch
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.65}>
          <div className="mt-16 flex items-center justify-center gap-8 sm:gap-12 text-text-dim">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-text">1+</div>
              <div className="text-xs sm:text-sm mt-1">Years Experience</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-text">10+</div>
              <div className="text-xs sm:text-sm mt-1">Projects Delivered</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-text">WebCastle</div>
              <div className="text-xs sm:text-sm mt-1">Technologies</div>
            </div>
          </div>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-text-dim/30 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 rounded-full bg-text-dim/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
