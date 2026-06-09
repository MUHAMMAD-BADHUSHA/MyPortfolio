"use client";

const techs = [
  { name: "React", icon: "⚛️", color: "#06B6D4" },
  { name: "Next.js", icon: "▲", color: "#FFFFFF" },
  { name: "Node.js", icon: "🟢", color: "#10B981" },
  { name: "MongoDB", icon: "🍃", color: "#10B981" },
];

export default function FloatingPanelRight() {
  return (
    <div
      className="hero-right-panel absolute right-[3%] xl:right-[5%] top-[18%] w-[200px] xl:w-[230px] hidden lg:block"
      style={{ opacity: 0 }}
    >
      <div
        className="rounded-xl overflow-hidden backdrop-blur-xl"
        style={{
          background: "rgba(2,0,20,0.5)",
          border: "1px solid rgba(139,92,246,0.1)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 30px rgba(139,92,246,0.03)",
        }}
      >
        <div
          className="px-4 py-2.5 border-b"
          style={{ borderColor: "rgba(139,92,246,0.06)" }}
        >
          <span className="text-[11px] font-mono font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6]">
            Technology Stack
          </span>
        </div>

        <div className="px-4 py-3 space-y-2.5">
          {techs.map((tech, i) => (
            <div
              key={tech.name}
              className="flex items-center gap-3 group"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all duration-300"
                style={{
                  background: `${tech.color}10`,
                  border: `1px solid ${tech.color}20`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${tech.color}20`;
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `${tech.color}10`;
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <span>{tech.icon}</span>
              </div>
              <div className="flex-1">
                <div
                  className="text-[12px] font-mono font-medium"
                  style={{ color: tech.color }}
                >
                  {tech.name}
                </div>
                <div
                  className="h-[2px] rounded-full mt-1 transition-all duration-500"
                  style={{
                    width: `${65 + i * 8}%`,
                    background: `linear-gradient(90deg, ${tech.color}, transparent)`,
                  }}
                />
              </div>
            </div>
          ))}

          <div
            className="mt-3 pt-3 border-t text-[10px] font-mono text-center"
            style={{
              color: "rgba(148,163,184,0.4)",
              borderColor: "rgba(139,92,246,0.06)",
            }}
          >
            ● Full Stack Developer
          </div>
        </div>
      </div>
    </div>
  );
}
