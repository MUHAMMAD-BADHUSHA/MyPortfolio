"use client";

import { useEffect, useRef } from "react";

interface TechParticlesProps {
  techs: { name: string; color: string }[];
}

interface TechParticle {
  x: number; y: number;
  centerX: number; centerY: number;
  orbitRadius: number; orbitAngle: number; orbitSpeed: number;
  size: number; color: string;
  alpha: number; baseAlpha: number;
  pulse: number; pulseSpeed: number;
  label: string;
  depth: number;
}

export default function TechParticles({ techs }: TechParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const particles: TechParticle[] = techs.map((tech, i) => {
      const depth = 0.6 + Math.random() * 0.4;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        centerX: canvas.width * (0.1 + Math.random() * 0.8),
        centerY: canvas.height * (0.1 + Math.random() * 0.8),
        orbitRadius: 40 + Math.random() * 120,
        orbitAngle: (Math.PI * 2 * i) / techs.length + Math.random() * 0.5,
        orbitSpeed: 0.001 + Math.random() * 0.003,
        size: 8 + Math.random() * 8,
        color: tech.color,
        alpha: 0.35 + Math.random() * 0.25,
        baseAlpha: 0.35 + Math.random() * 0.25,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.012,
        label: tech.name,
        depth,
      };
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      particles.forEach((p) => {
        p.orbitAngle += p.orbitSpeed;
        p.x = p.centerX + Math.cos(p.orbitAngle) * p.orbitRadius;
        p.y = p.centerY + Math.sin(p.orbitAngle) * p.orbitRadius * 0.5;
        p.pulse += p.pulseSpeed;

        const dx = p.x - cx;
        const dy = p.y - cy;
        const distFromCenter = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.max(canvas.width, canvas.height) * 0.6;
        const centerFactor = Math.max(0, 1 - distFromCenter / maxDist);

        const pulseVal = 0.7 + 0.3 * Math.sin(p.pulse);
        const alpha = p.baseAlpha * pulseVal * (0.5 + 0.5 * centerFactor);
        const scale = p.depth * (0.7 + 0.3 * centerFactor);
        const currentSize = p.size * scale;
        const fontSize = Math.max(13, Math.round(18 * scale));

        const iconAlphaHex = Math.round(alpha * 80).toString(16).padStart(2, "0");

        const iconGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize * 2.5);
        iconGrad.addColorStop(0, p.color + iconAlphaHex);
        iconGrad.addColorStop(0.5, p.color + Math.round(alpha * 40).toString(16).padStart(2, "0"));
        iconGrad.addColorStop(1, "transparent");
        ctx.fillStyle = iconGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize * 2.5, 0, Math.PI * 2);
        ctx.fill();

        const purpleGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize * 4);
        purpleGlow.addColorStop(0, `rgba(139, 92, 246, ${(alpha * 0.3).toFixed(2)})`);
        purpleGlow.addColorStop(0.5, `rgba(109, 40, 217, ${(alpha * 0.12).toFixed(2)})`);
        purpleGlow.addColorStop(1, "transparent");
        ctx.fillStyle = purpleGlow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize * 4, 0, Math.PI * 2);
        ctx.fill();

        const coreGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize * 0.4);
        coreGrad.addColorStop(0, `rgba(255,255,255,${(alpha * 0.6).toFixed(2)})`);
        coreGrad.addColorStop(1, p.color + Math.round(alpha * 90).toString(16).padStart(2, "0"));
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize * 0.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.save();
        ctx.font = `bold ${fontSize}px system-ui, -apple-system, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";

        const textY = p.y + currentSize * 0.6 + 6;

        ctx.shadowColor = "rgba(109, 40, 217, 0.6)";
        ctx.shadowBlur = 12;
        ctx.fillStyle = `rgba(255, 255, 255, ${(alpha * 0.75).toFixed(2)})`;
        ctx.fillText(p.label, p.x, textY);

        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(255, 255, 255, ${(alpha * 0.45).toFixed(2)})`;
        ctx.fillText(p.label, p.x + 1, textY + 1);

        ctx.restore();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [techs]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
