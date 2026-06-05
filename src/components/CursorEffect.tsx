"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; alpha: number;
  life: number; maxLife: number;
  color: string; decay: number;
}

interface Ripple {
  x: number; y: number;
  radius: number; alpha: number;
}

const CURSOR_SIZE = 40;
const HOVER_SCALE = 1.35;

function getDesktopSnapshot() {
  if (typeof window === "undefined") return false;
  return (
    !window.matchMedia("(pointer: coarse)").matches &&
    !("ontouchstart" in window) &&
    navigator.maxTouchPoints === 0
  );
}

function getServerSnapshot() {
  return false;
}

function subscribeToDesktop(callback: () => void) {
  const mql = window.matchMedia("(pointer: coarse)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

export default function CursorEffect() {
  const isDesktop = useSyncExternalStore(
    subscribeToDesktop,
    getDesktopSnapshot,
    getServerSnapshot
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);

  const cursorRef = useRef({ x: -100, y: -100 });
  const trailPosRef = useRef({ x: -100, y: -100 });
  const particlesRef = useRef<Particle[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);

  useEffect(() => {
    if (!isDesktop) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };

    const spawnBurst = (x: number, y: number) => {
      ripplesRef.current.push({ x, y, radius: 0, alpha: 0.5 });

      const count = 16 + Math.floor(Math.random() * 12);
      const hue = 260 + Math.floor(Math.random() * 20);

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
        const speed = 1.5 + Math.random() * 3;
        const life = 40 + Math.random() * 40;
        particlesRef.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2 + Math.random() * 4,
          alpha: 0.7 + Math.random() * 0.3,
          life, maxLife: life,
          color: `hsla(${hue}, 60%, ${55 + Math.floor(Math.random() * 25)}%,`,
          decay: 0.97 + Math.random() * 0.02,
        });
      }
    };

    const handleClick = (e: MouseEvent) => spawnBurst(e.clientX, e.clientY);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleClick);

    const hoverEls = document.querySelectorAll<HTMLElement>(
      "a, button, input, textarea, [role='button'], [role='link'], select, label"
    );

    const onHoverIn = () => { isHoveringRef.current = true; };
    const onHoverOut = () => { isHoveringRef.current = false; };

    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", onHoverIn);
      el.addEventListener("mouseleave", onHoverOut);
    });

    trailPosRef.current = { ...cursorRef.current };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = cursorRef.current.x;
      const cy = cursorRef.current.y;
      const isHovering = isHoveringRef.current;

      trailPosRef.current.x += (cx - trailPosRef.current.x) * 0.12;
      trailPosRef.current.y += (cy - trailPosRef.current.y) * 0.12;

      const trailEl = trailRef.current;
      const ringEl = ringRef.current;
      if (trailEl && ringEl) {
        const half = CURSOR_SIZE / 2;
        const scale = isHovering ? HOVER_SCALE : 1;
        const visible = cx > 0 && cy > 0;

        trailEl.style.transform = `translate(${trailPosRef.current.x - half}px, ${trailPosRef.current.y - half}px) scale(${scale})`;
        trailEl.style.opacity = visible ? "1" : "0";

        ringEl.style.transform = `translate(${trailPosRef.current.x - half}px, ${trailPosRef.current.y - half}px) scale(${scale})`;
        ringEl.style.opacity = visible ? "1" : "0";
      }

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        p.vx *= p.decay; p.vy *= p.decay;
        p.life--;
        p.alpha *= 0.97;

        if (p.life <= 0 || p.alpha < 0.01) {
          particles.splice(i, 1);
          continue;
        }

        const progress = 1 - p.life / p.maxLife;
        const curSize = p.size * (1 - progress * 0.6);
        const curAlpha = p.alpha * (1 - progress * 0.5);

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, curSize * 3);
        grad.addColorStop(0, `${p.color} ${Math.round(curAlpha * 80)})`);
        grad.addColorStop(0.4, `${p.color} ${Math.round(curAlpha * 40)})`);
        grad.addColorStop(1, `${p.color} 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, curSize * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, curSize * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${Math.round(curAlpha * 100)})`;
        ctx.fill();
      }

      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 1.8;
        r.alpha *= 0.955;

        if (r.alpha < 0.01) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(270, 50%, 60%, ${r.alpha * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(270, 40%, 50%, ${r.alpha * 0.2})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverIn);
        el.removeEventListener("mouseleave", onHoverOut);
      });
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[60]" />

      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[60] transition-opacity duration-300"
        style={{
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          borderRadius: "50%",
          border: "1.5px solid rgba(139, 92, 246, 0.4)",
          transform: `translate(-100px, -100px)`,
          willChange: "transform",
          boxShadow: `
            0 0 12px rgba(139, 92, 246, 0.15),
            0 0 30px rgba(109, 40, 217, 0.08),
            inset 0 0 12px rgba(139, 92, 246, 0.05)
          `,
          transition: "box-shadow 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
            animation: "cursor-pulse 3s ease-in-out infinite",
          }}
        />
      </div>

      <div
        ref={trailRef}
        className="fixed pointer-events-none z-[60] transition-opacity duration-300"
        style={{
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          borderRadius: "50%",
          transform: `translate(-100px, -100px)`,
          willChange: "transform",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "rgba(139, 92, 246, 0.7)",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 10px rgba(139, 92, 246, 0.4), 0 0 25px rgba(139, 92, 246, 0.15)",
          }}
        />
      </div>

      <style>{`
        body {
          cursor: none;
        }
        a, button, input, textarea, [role="button"], [role="link"], select, label {
          cursor: none;
        }
        @keyframes cursor-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  );
}