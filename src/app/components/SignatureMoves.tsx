import React from "react";

const items = [
  {
    title: "Motion with restraint",
    desc: "Clean, intentional animation—never circus.",
  },
  {
    title: "Performance mindset",
    desc: "Fast loads, smooth scroll, tight bundles.",
  },
  {
    title: "Conversion-aware UI",
    desc: "Structure that guides the eye and improves action rate.",
  },
  {
    title: "Engineering-grade builds",
    desc: "Typed, tested, scalable patterns from day one.",
  },
];

export default function SignatureMoves() {
  return (
    <section className="bg-black" aria-label="Signature Moves">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <p className="text-white/55 text-xs tracking-[0.28em] uppercase">
            Signature Moves
          </p>
          <h3 className="text-white text-xl md:text-2xl font-semibold mt-3">
            The stuff we do every time.
          </h3>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {items.map((it) => (
              <div
                key={it.title}
                className="rounded-2xl border border-white/10 bg-black/20 p-6"
              >
                <div className="text-white font-semibold">{it.title}</div>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">
                  {it.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
