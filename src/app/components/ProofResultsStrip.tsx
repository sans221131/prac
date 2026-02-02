import React from "react";

const stats = [
  { k: "2–3 weeks", v: "Typical delivery" },
  { k: "Awwwards-grade", v: "Front-end fidelity" },
  { k: "ERP-grade", v: "App architecture" },
  { k: "₹30k+", v: "Minimum budget" },
];

export default function ProofResultsStrip() {
  return (
    <section className="bg-black" aria-label="Proof and Results">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-3 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.k}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="text-white text-lg font-semibold">{s.k}</div>
              <div className="text-white/60 text-sm mt-1">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
