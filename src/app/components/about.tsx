import React from "react";

export default function About() {
  return (
    <section id="about" className="bg-black" aria-label="About">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <p className="text-white/55 text-xs tracking-[0.28em] uppercase">
            About
          </p>
          <h3 className="text-white text-xl md:text-2xl font-semibold mt-3">
            Built like an agency. Shipped like a product team.
          </h3>
          <p className="mt-4 text-sm md:text-base text-white/65 leading-relaxed max-w-3xl">
            We build high-fidelity marketing sites and serious web apps. The goal
            is simple: make it look expensive, feel smooth, and work reliably.
            We’ll polish the motion, tighten the funnel, and keep the codebase
            sane so you can scale without regret.
          </p>
        </div>
      </div>
    </section>
  );
}
