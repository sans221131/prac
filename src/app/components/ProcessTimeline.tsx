import React from "react";

const steps = [
  { t: "01. Scope", d: "Quick alignment: goals, audience, constraints, timeline." },
  { t: "02. Build", d: "Ship the first real version fast. Iterate on real UI." },
  { t: "03. Polish", d: "Motion, copy, performance, edge cases, QA." },
  { t: "04. Launch", d: "Deploy, monitor, fix the last 5% like adults." },
];

export default function ProcessTimeline() {
  return (
    <section className="bg-black" aria-label="Process Timeline">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-white/55 text-xs tracking-[0.28em] uppercase">
          Process
        </p>
        <h3 className="text-white text-xl md:text-2xl font-semibold mt-3">
          Simple flow. Clean delivery.
        </h3>

        <div className="mt-8 space-y-3">
          {steps.map((s) => (
            <div
              key={s.t}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="text-white font-semibold">{s.t}</div>
              <p className="mt-2 text-sm text-white/65 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
