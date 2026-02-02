import React from "react";

const chips = [
  "Next.js",
  "TypeScript",
  "Tailwind",
  "GSAP",
  "Cloudflare",
  "Postgres",
  "Drizzle",
  "Workers",
];

export default function TechStackPerformance() {
  return (
    <section className="bg-black" aria-label="Tech Stack">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <p className="text-white/55 text-xs tracking-[0.28em] uppercase">
            Stack
          </p>
          <h3 className="text-white text-xl md:text-2xl font-semibold mt-3">
            Modern stack. No trendy nonsense.
          </h3>

          <div className="mt-6 flex flex-wrap gap-2">
            {chips.map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-white/75"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="text-white font-semibold">Performance</div>
              <div className="text-sm text-white/60 mt-1">
                Optimized assets, careful JS, smooth scroll.
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="text-white font-semibold">Security</div>
              <div className="text-sm text-white/60 mt-1">
                Auth-safe patterns, minimal exposure, sane defaults.
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="text-white font-semibold">Scalability</div>
              <div className="text-sm text-white/60 mt-1">
                Clean structure so future changes don’t hurt.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
