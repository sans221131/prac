"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import IntroSequence from "./components/intro/IntroSequence";
import Header from "./components/Header";
import Footer from "./components/Footer";

import FeaturedWork from "./components/FeaturedWork";
import SignatureMoves from "./components/SignatureMoves";
import ProofResultsStrip from "./components/ProofResultsStrip";
import ProcessTimeline from "./components/ProcessTimeline";
import TechStackPerformance from "./components/TechStackPerformance";
import About from "./components/about";
import ContactCTA from "./components/ContactCTA";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Keep these aligned with IntroSequence props
  const FRAME_COUNT = 202;
  const INTRO_SCROLL_PAGES = 3;
  const FINISH_FRAMES_AT = 0.8; // last 20% reserved for UI reveal

  useGSAP(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Initial hidden state
    gsap.set(overlay, { opacity: 0, y: 20, filter: "blur(10px)" });

    const setOpacity = gsap.quickSetter(overlay, "opacity");
    const setY = gsap.quickSetter(overlay, "y", "px");
    const setFilter = (v: number) => {
      overlay.style.filter = `blur(${v.toFixed(1)}px)`;
    };

    const st = ScrollTrigger.create({
      trigger: "#intro-sequence",
      start: "top top",
      end: () => `+=${Math.round(window.innerHeight * INTRO_SCROLL_PAGES)}`,
      scrub: true,
      onUpdate: (self) => {
        // Reveal only in last 20%: progress [0.8..1] -> t [0..1]
        const tRaw = (self.progress - FINISH_FRAMES_AT) / (1 - FINISH_FRAMES_AT);
        const t = Math.max(0, Math.min(1, tRaw));

        setOpacity(t);
        setY(20 * (1 - t));
        setFilter(10 * (1 - t));
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div className="min-h-screen font-sans bg-black">
      <Header />

      {/* Intro that becomes the hero background (UI fades in during last 20%) */}
      <IntroSequence
        id="intro-sequence"
        frameCount={FRAME_COUNT}
        folder="/intro"
        filePrefix="ezgif-frame-"
        extension="jpg"
        pad={3}
        scrollPages={INTRO_SCROLL_PAGES}
        finishFramesAt={FINISH_FRAMES_AT}
        background="#000"
      >
        {/* Overlay (this stays pinned WITH the canvas) */}
        <div className="relative h-full w-full">
          {/* readability tint */}
          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div
              ref={overlayRef}
              className="max-w-3xl text-center"
            >
              <p className="text-white/70 text-xs tracking-[0.28em] uppercase mb-4">
                Talked About Tech
              </p>

              <h1 className="text-white text-4xl md:text-6xl leading-[1.02] font-semibold">
                We build sites people talk about.
              </h1>

              <p className="mt-5 text-white/70 text-base md:text-lg leading-relaxed">
                Awwwards-grade motion. ERP-grade systems. Clean delivery. No fluff.
              </p>

              <div className="mt-8 flex items-center justify-center gap-3">
                <a
                  href="#work"
                  className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm bg-white text-black hover:bg-white/90 transition"
                >
                  View Work
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm border border-white/25 text-white hover:border-white/45 hover:bg-white/5 transition"
                >
                  Get a Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </IntroSequence>

      {/* Rest of page */}
      <main id="work">
        <FeaturedWork />

        <div className="container-max py-16 space-y-20">
          <SignatureMoves />
          <ProofResultsStrip />
          <ProcessTimeline />
          <TechStackPerformance />
          <About />
          <ContactCTA />
        </div>
      </main>

      <Footer />
    </div>
  );
}
