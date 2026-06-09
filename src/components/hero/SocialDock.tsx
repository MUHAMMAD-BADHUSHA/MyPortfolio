"use client";

const socials = [
  { label: "GitHub", icon: "GH", href: "https://github.com", color: "#ffffff" },
  { label: "LinkedIn", icon: "LI", href: "https://linkedin.com", color: "#06B6D4" },
  { label: "X", icon: "X", href: "https://twitter.com", color: "#ffffff" },
  { label: "Email", icon: "@", href: "mailto:hello@example.com", color: "#8B5CF6" },
];

export default function SocialDock() {
  return (
    <div
      className="hero-social absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3"
      style={{ opacity: 0 }}
    >
      <div
        className="w-px h-12"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(6,182,212,0.2))",
        }}
      />
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="relative group"
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-mono font-bold transition-all duration-300"
            style={{
              color: "rgba(148,163,184,0.5)",
              background: "rgba(2,0,20,0.4)",
              border: "1px solid rgba(6,182,212,0.06)",
              backdropFilter: "blur(12px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = s.color;
              e.currentTarget.style.borderColor = `${s.color}30`;
              e.currentTarget.style.boxShadow = `0 0 20px ${s.color}15`;
              e.currentTarget.style.background = `${s.color}08`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(148,163,184,0.5)";
              e.currentTarget.style.borderColor = "rgba(6,182,212,0.06)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.background = "rgba(2,0,20,0.4)";
            }}
          >
            {s.icon}
          </div>
        </a>
      ))}
      <div
        className="w-px h-12"
        style={{
          background: "linear-gradient(to bottom, rgba(6,182,212,0.2), transparent)",
        }}
      />
    </div>
  );
}
