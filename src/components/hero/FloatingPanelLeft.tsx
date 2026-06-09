"use client";

import { useEffect, useRef } from "react";

const codeLines = [
  { text: "import { Portfolio } from './components'", color: "#8B5CF6", delay: 0 },
  { text: "", color: "transparent", delay: 0 },
  { text: "const App = () => {", color: "#94A3B8", delay: 0.1 },
  { text: '  const [status] = useState("ready")', color: "#06B6D4", delay: 0.2 },
  { text: "", color: "transparent", delay: 0 },
  { text: "  return (", color: "#94A3B8", delay: 0.3 },
  { text: '    <div className="cyber-portfolio">', color: "#E2E8F0", delay: 0.4 },
  { text: "      <HeroSection />", color: "#8B5CF6", delay: 0.5 },
  { text: "      <TechStack />", color: "#8B5CF6", delay: 0.6 },
  { text: "      <ProjectsGrid />", color: "#8B5CF6", delay: 0.7 },
  { text: "    </div>", color: "#E2E8F0", delay: 0.8 },
  { text: "  )", color: "#94A3B8", delay: 0.9 },
  { text: "}", color: "#94A3B8", delay: 1.0 },
  { text: "", color: "transparent", delay: 0 },
  { text: "export default App", color: "#8B5CF6", delay: 1.1 },
];

export default function FloatingPanelLeft() {
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    linesRef.current.forEach((el, i) => {
      if (el) {
        el.style.animation = `code-line 0.4s ease-out ${codeLines[i].delay}s forwards`;
        el.style.opacity = "0";
      }
    });
  }, []);

  return (
    <div
      className="hero-left-panel absolute left-[3%] xl:left-[5%] top-[22%] w-[220px] xl:w-[260px] hidden lg:block"
      style={{ opacity: 0 }}
    >
      <div
        className="rounded-xl overflow-hidden backdrop-blur-xl"
        style={{
          background: "rgba(2,0,20,0.5)",
          border: "1px solid rgba(6,182,212,0.1)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 30px rgba(6,182,212,0.03)",
        }}
      >
        <div
          className="flex items-center gap-2 px-4 py-2.5 border-b"
          style={{ borderColor: "rgba(6,182,212,0.06)" }}
        >
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#A855F7" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#8B5CF6" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#06B6D4" }} />
          </div>
          <span className="text-[10px] font-mono ml-2" style={{ color: "rgba(148,163,184,0.5)" }}>
            portfolio.tsx
          </span>
        </div>

        <div className="px-4 py-3 space-y-[3px]">
          <div className="flex items-start gap-3">
            <div className="text-[10px] font-mono leading-5 select-none" style={{ color: "rgba(148,163,184,0.25)", minWidth: 18 }}>
              {codeLines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <div className="flex-1">
              {codeLines.map((line, i) => (
                <div
                  key={i}
                  ref={(el) => { linesRef.current[i] = el; }}
                  className="text-[11px] font-mono leading-5 whitespace-nowrap"
                  style={{ color: line.color, opacity: 0 }}
                >
                  {line.text || "\u00A0"}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
