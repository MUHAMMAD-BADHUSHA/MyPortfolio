"use client";

import { useRef, ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassyCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  borderGradient?: boolean;
  tilt?: boolean;
  shine?: boolean;
}

export default function GlassyCard({
  children,
  className = "",
  glowColor = "rgba(109, 40, 217, 0.15)",
  borderGradient = false,
  tilt = true,
  shine = true,
}: GlassyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    cardRef.current.style.setProperty("--glare-x", `${glareX}%`);
    cardRef.current.style.setProperty("--glare-y", `${glareY}%`);
  };

  const handleMouseLeave = () => {
    if (!tilt || !cardRef.current) return;
    cardRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`group relative rounded-2xl transition-all duration-200 glass ${className}`}
        style={{
          boxShadow: `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)`,
          transformStyle: "preserve-3d",
        }}
      >
        {shine && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,0.08) 0%, transparent 60%)",
            }}
          />
        )}

        {borderGradient && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              padding: "1px",
              background:
                "linear-gradient(135deg, rgba(109,40,217,0.3), transparent 40%, rgba(139,92,246,0.15))",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
        )}

        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: `inset 0 0 30px ${glowColor}`,
          }}
        />

        <div
          className="absolute -inset-0.5 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
          style={{ background: glowColor }}
        />

        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  );
}
