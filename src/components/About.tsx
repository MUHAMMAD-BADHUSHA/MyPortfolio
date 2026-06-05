"use client";

import ScrollReveal from "./ScrollReveal";
import GlassyCard from "./GlassyCard";

const highlights = [
  {
    number: "01",
    title: "Full Stack Web Development",
    description:
      "Building modern MERN stack applications with React, Next.js, Node.js, Express, and Strapi.",
  },
  {
    number: "02",
    title: "CMS & API Development",
    description:
      "Creating dynamic CMS platforms, page builders, and REST APIs with Strapi for flexible content management.",
  },
  {
    number: "03",
    title: "Database Design & Performance",
    description:
      "Designing efficient MongoDB and PostgreSQL schemas, authentication systems, and optimized backend solutions.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-block text-xs font-medium tracking-widest uppercase text-primary-light mb-4">
              About Me
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              About{" "}
              <span className="gradient-text">Muhammad Badhusha</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <ScrollReveal direction="left" delay={0.1}>
            <div className="relative">
              <GlassyCard borderGradient shine className="overflow-hidden">
                <div className="aspect-[4/3] flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-28 h-28 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4 overflow-hidden ring-2 ring-primary/20">
                      <img
                        src="/profile.jpg"
                        alt="Muhammad Badhusha"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent) {
                            const fallback = document.createElement("span");
                            fallback.className = "text-4xl font-bold gradient-text";
                            fallback.textContent = "MB";
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    </div>
                    <p className="text-text-muted text-sm">
                      Junior MERN Stack Developer
                    </p>
                  </div>
                </div>
              </GlassyCard>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-primary/10 blur-[60px]" />
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-primary-light/10 blur-[50px]" />
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            <ScrollReveal direction="right" delay={0.2}>
              <p className="text-text-muted text-base sm:text-lg leading-relaxed">
                I&apos;m a Junior MERN Stack Developer at WebCastle Technologies with
                1+ year of experience building modern web applications and scalable
                digital solutions. I specialize in React.js, Next.js, Node.js,
                Express.js, Strapi, PostgreSQL, and MongoDB.
              </p>
              <p className="text-text-muted text-base sm:text-lg leading-relaxed">
                I enjoy transforming complex business requirements into intuitive,
                high-performance web applications — from CMS platforms and healthcare
                systems to custom business solutions and reporting modules.
              </p>
            </ScrollReveal>

            <div className="space-y-4 pt-4">
              {highlights.map((item, i) => (
                <ScrollReveal key={item.number} delay={0.2 + i * 0.1}>
                  <GlassyCard tilt={false} shine className="!p-4">
                    <div className="flex gap-5">
                      <span className="text-2xl font-bold gradient-text shrink-0">
                        {item.number}
                      </span>
                      <div>
                        <h3 className="font-semibold text-text mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-text-muted">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </GlassyCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
