"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-block text-xs font-medium tracking-widest uppercase text-primary-light mb-4">
              Contact
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Let&apos;s <span className="gradient-text">collaborate</span>
            </h2>
            <p className="mt-4 text-text-muted max-w-lg mx-auto">
              Have a project in mind? Let&apos;s discuss how we can work
              together to create something exceptional.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="group">
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-text-dim mb-2 tracking-wide uppercase"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl glass text-text text-sm placeholder:text-text-dim/50 transition-all duration-200 focus:outline-none focus:border-primary/30 focus:glow-sm"
                />
              </div>
              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-text-dim mb-2 tracking-wide uppercase"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl glass text-text text-sm placeholder:text-text-dim/50 transition-all duration-200 focus:outline-none focus:border-primary/30 focus:glow-sm"
                />
              </div>
            </div>

            <div className="group">
              <label
                htmlFor="message"
                className="block text-xs font-medium text-text-dim mb-2 tracking-wide uppercase"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full px-4 py-3 rounded-xl glass text-text text-sm placeholder:text-text-dim/50 transition-all duration-200 focus:outline-none focus:border-primary/30 focus:glow-sm resize-none"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-xl bg-primary text-white font-medium text-sm transition-all duration-200 hover:glow-strong hover:bg-primary-light"
            >
              {submitted ? "Message Sent!" : "Send Message"}
            </motion.button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
