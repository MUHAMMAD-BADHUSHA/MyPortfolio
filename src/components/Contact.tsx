"use client";

import { useState, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";

const placeholderLines = [
  "> Enter your name...",
  "> user@portfolio:~$ email...",
  "> Compose message...",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [typingLine, setTypingLine] = useState(0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTypingLine((l) => (l + 1) % placeholderLines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
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
              color: "#00ff41",
              background: "rgba(0,255,65,0.05)",
              border: "1px solid rgba(0,255,65,0.1)",
            }}
          >
            &lt;contact /&gt;
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Let&apos;s{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-cyber-purple to-neon-pink">
              collaborate
            </span>
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-sm" style={{ color: "rgba(224,224,255,0.5)" }}>
            Have a project in mind? Let&apos;s discuss how we can work
            together to create something exceptional.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-xl mx-auto"
        >
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: "1px solid rgba(0,255,65,0.12)",
              boxShadow: "0 0 40px rgba(0,255,65,0.03)",
            }}
          >
            <div
              className="flex items-center gap-3 px-5 py-3 border-b"
              style={{
                background: "rgba(0,255,65,0.03)",
                borderColor: "rgba(0,255,65,0.08)",
              }}
            >
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: "#ff0080" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#7000ff" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#00f0ff" }} />
              </div>
              <span className="text-xs font-mono" style={{ color: "rgba(0,255,65,0.5)" }}>
                user@portfolio:~$ bash contact.sh
              </span>
            </div>

            <div className="p-6 sm:p-8" style={{ background: "rgba(5,0,20,0.6)" }}>
              <div className="mb-6 font-mono text-xs" style={{ color: "rgba(0,255,65,0.4)" }}>
                <span style={{ color: "#00ff41" }}>user@portfolio</span>
                <span style={{ color: "rgba(136,136,187,0.5)" }}>:</span>
                <span style={{ color: "#00f0ff" }}>~</span>
                <span style={{ color: "rgba(136,136,187,0.5)" }}>$ </span>
                <motion.span
                  key={typingLine}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {placeholderLines[typingLine]}
                </motion.span>
                <span className="inline-block w-2 h-4 ml-0.5 animate-pulse" style={{ background: "#00ff41" }} />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <InputField
                    label="name"
                    type="text"
                    value={formData.name}
                    onChange={(v) => setFormData((p) => ({ ...p, name: v }))}
                    isFocused={focused === "name"}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    placeholder="your_name"
                  />
                  <InputField
                    label="email"
                    type="email"
                    value={formData.email}
                    onChange={(v) => setFormData((p) => ({ ...p, email: v }))}
                    isFocused={focused === "email"}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    placeholder="your@domain.com"
                  />
                </div>

                <div>
                  <TextareaField
                    label="message"
                    value={formData.message}
                    onChange={(v) => setFormData((p) => ({ ...p, message: v }))}
                    isFocused={focused === "message"}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-3.5 rounded-xl font-mono text-sm font-medium tracking-wider flex items-center justify-center gap-2 transition-all duration-300"
                  style={{
                    color: "#050008",
                    background: submitted
                      ? "linear-gradient(135deg, #00ff41, #00f0ff)"
                      : "linear-gradient(135deg, #00ff41, #00f0ff)",
                    boxShadow: submitted
                      ? "0 0 30px rgba(0,255,65,0.3)"
                      : "0 0 20px rgba(0,255,65,0.15)",
                    opacity: submitted ? 0.9 : 1,
                  }}
                >
                  {submitted ? (
                    <>
                      <span>Message Sent</span>
                      <span className="text-lg">✓</span>
                    </>
                  ) : (
                    <>
                      <TerminalIcon size={14} />
                      <span>$ ./send_message.sh</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function InputField({
  label, type, value, onChange, isFocused, onFocus, onBlur, placeholder,
}: {
  label: string; type: string; value: string; onChange: (v: string) => void;
  isFocused: boolean; onFocus: () => void; onBlur: () => void; placeholder: string;
}) {
  return (
    <div className="group relative">
      <label
        htmlFor={label}
        className="block text-xs font-mono mb-2 tracking-wide"
        style={{ color: isFocused ? "#00ff41" : "rgba(0,255,65,0.4)" }}
      >
        <span style={{ color: "rgba(136,136,187,0.5)" }}>$</span> {label}
      </label>
      <input
        id={label}
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg text-sm font-mono outline-none transition-all duration-300"
        style={{
          color: "#e0e0ff",
          background: "rgba(0,255,65,0.03)",
          border: `1px solid ${isFocused ? "rgba(0,255,65,0.4)" : "rgba(0,255,65,0.1)"}`,
          boxShadow: isFocused ? "0 0 20px rgba(0,255,65,0.08), inset 0 0 20px rgba(0,255,65,0.02)" : "none",
        }}
      />
    </div>
  );
}

function TextareaField({
  label, value, onChange, isFocused, onFocus, onBlur, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void;
  isFocused: boolean; onFocus: () => void; onBlur: () => void; placeholder: string;
}) {
  return (
    <div className="group relative">
      <label
        htmlFor={label}
        className="block text-xs font-mono mb-2 tracking-wide"
        style={{ color: isFocused ? "#00ff41" : "rgba(0,255,65,0.4)" }}
      >
        <span style={{ color: "rgba(136,136,187,0.5)" }}>$</span> {label}
      </label>
      <textarea
        id={label}
        required
          rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg text-sm font-mono outline-none transition-all duration-300 resize-none"
        style={{
          color: "#e0e0ff",
          background: "rgba(0,255,65,0.03)",
          border: `1px solid ${isFocused ? "rgba(0,255,65,0.4)" : "rgba(0,255,65,0.1)"}`,
          boxShadow: isFocused ? "0 0 20px rgba(0,255,65,0.08), inset 0 0 20px rgba(0,255,65,0.02)" : "none",
        }}
      />
    </div>
  );
}
