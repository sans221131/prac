import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="text-white font-semibold">Talked About Tech</div>
            <div className="text-white/50 text-sm mt-1">
              High-fidelity marketing sites & serious web apps.
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-white/60">
            <a href="#work" className="hover:text-white transition">
              Work
            </a>
            <a href="#about" className="hover:text-white transition">
              About
            </a>
            <a href="#contact" className="hover:text-white transition">
              Contact
            </a>
          </div>
        </div>

        <div className="mt-10 text-xs text-white/40">
          © {new Date().getFullYear()} Talked About Tech. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
