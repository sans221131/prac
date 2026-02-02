"use client";

import React, { useState } from "react";

export default function ContactCTA() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="bg-black" aria-label="Contact">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <p className="text-white/55 text-xs tracking-[0.28em] uppercase">
            Contact
          </p>
          <h3 className="text-white text-xl md:text-2xl font-semibold mt-3">
            Want a quote? Cool. Let’s do it properly.
          </h3>
          <p className="mt-3 text-white/65 text-sm md:text-base max-w-2xl">
            Drop the basics. We’ll upgrade this into a real funnel later (form →
            estimate → booking).
          </p>

          <form
            className="mt-8 grid gap-3 md:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setTimeout(() => setSent(false), 2500);
            }}
          >
            <input
              className="h-12 rounded-2xl border border-white/10 bg-black/40 px-4 text-white placeholder:text-white/35 outline-none focus:border-white/25"
              placeholder="Name"
              required
            />
            <input
              className="h-12 rounded-2xl border border-white/10 bg-black/40 px-4 text-white placeholder:text-white/35 outline-none focus:border-white/25"
              placeholder="Email"
              type="email"
              required
            />
            <textarea
              className="md:col-span-2 min-h-[120px] rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-white/25"
              placeholder="What are we building?"
              required
            />

            <div className="md:col-span-2 flex items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm text-black hover:bg-white/90 transition"
              >
                Send
              </button>

              {sent && (
                <div className="text-sm text-white/70">
                  Sent (fake for now). We’ll wire backend later.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
