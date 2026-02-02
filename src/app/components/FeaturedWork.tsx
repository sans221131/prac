import React from "react";

const work = [
  {
    title: "DTC Shopify Build",
    desc: "Theme from scratch + landing pages + CRO tweaks + payments.",
    tag: "Ecommerce",
  },
  {
    title: "Marketing Site (Awwwards-style)",
    desc: "Scroll choreography, micro-interactions, performance-first.",
    tag: "Marketing",
  },
  {
    title: "Internal Web App",
    desc: "Auth, roles, audit trails, dashboards, and real workflows.",
    tag: "Web App",
  },
];

export default function FeaturedWork() {
  return (
    <section className="bg-black" aria-label="Featured Work">
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-white/55 text-xs tracking-[0.28em] uppercase">
              Selected Work
            </p>
            <h2 className="text-white text-2xl md:text-3xl font-semibold mt-3">
              Projects people actually remember.
            </h2>
          </div>

          <a
            href="#work"
            className="hidden md:inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 hover:border-white/30 hover:text-white transition"
          >
            See all
          </a>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {work.map((w) => (
            <div
              key={w.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05] hover:border-white/20 transition"
            >
              <div className="text-xs text-white/55">{w.tag}</div>
              <div className="mt-2 text-white font-semibold">{w.title}</div>
              <p className="mt-2 text-sm text-white/65 leading-relaxed">
                {w.desc}
              </p>
              <div className="mt-6 text-sm text-white/75">View case study →</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
