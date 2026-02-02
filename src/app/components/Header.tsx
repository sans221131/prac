"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export default function Header() {
  const [mounted, setMounted] = useState(false); // overlay mounted
  const [open, setOpen] = useState(false); // reveal expanded (white)
  const [busy, setBusy] = useState(false); // prevent spam clicks
  const [overlayPhase, setOverlayPhase] = useState<"hidden" | "circle" | "full">("hidden");
  const timersRef = useRef<number[]>([]);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [overlayLabel, setOverlayLabel] = useState<string | null>(null);

  const reduceMotion = useMemo(() => prefersReducedMotion(), []);
  const [visible, setVisible] = useState(false);

  // ESC closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, open, busy]);

  // show header after intro finishes
  useEffect(() => {
    const onIntroEnd = () => setVisible(true);
    window.addEventListener("intro:ended", onIntroEnd);
    return () => window.removeEventListener("intro:ended", onIntroEnd);
  }, []);

  // lock body scroll while menu is open-ish
  useEffect(() => {
    if (!mounted) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted]);

  const openMenu = () => {
    if (busy) return;
    setBusy(true);

    if (reduceMotion) {
      setMounted(true);
      setOverlayPhase("full");
      setOpen(true);
      setBusy(false);
      return;
    }
    setMounted(true);
    // next frame so transition can kick in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
            // phase 1: small circle appears quickly
            setOverlayPhase("circle");
            // after a longer, intentional pause, expand to full white
            const t1 = window.setTimeout(() => {
              setOverlayPhase("full");
              // reveal content slightly after expansion begins (gentle overlap)
              const t2 = window.setTimeout(() => {
                setOpen(true);
                // allow clicks after full animation roughly completes (3s expansion + buffer)
                const t3 = window.setTimeout(() => setBusy(false), 3200);
                timersRef.current.push(t3);
              }, 400);
              timersRef.current.push(t2);
            }, 500);
        timersRef.current.push(t1);
      });
    });
  };

  const closeMenu = () => {
    if (!mounted || busy) return;
    setBusy(true);

    if (reduceMotion) {
      setOpen(false);
      setOverlayPhase("hidden");
      setMounted(false);
      setBusy(false);
      return;
    }
    // hide content first
    setOpen(false);
    // shrink overlay back to small circle
    const tA = window.setTimeout(() => {
      setOverlayPhase("circle");
      // then hide completely and unmount
      const tB = window.setTimeout(() => {
        setOverlayPhase("hidden");
        setMounted(false);
        setBusy(false);
      }, 520);
      timersRef.current.push(tB);
    }, 120);
    timersRef.current.push(tA);
  };

  // cleanup timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => clearTimeout(id));
      timersRef.current = [];
    };
  }, []);

  const scrollToHash = (href: string) => {
    if (!href.startsWith("#")) return;

    const el = document.querySelector(href) as HTMLElement | null;
    if (!el) return;

    // small offset so fixed header doesn’t sit on top of section headings (tweak if needed)
    const OFFSET = 12;
    const top = el.getBoundingClientRect().top + window.scrollY - OFFSET;

    window.scrollTo({ top, behavior: "smooth" });
  };

  const onNavClick = (href: string) => {
    if (busy) return;

    // start closing (white collapses -> black shows)
    closeMenu();

    // unlock scroll immediately (so scroll can happen while wipe closes)
    document.body.style.overflow = "";

    // scroll while the wipe is still happening (feels like teleport behind the curtain)
    window.setTimeout(() => {
      scrollToHash(href);
    }, reduceMotion ? 0 : 120);
  };

  // Single-link flow: run the same wipe animation, show a small text, then scroll and close.
  const navigateWithWipe = (href: string, label: string) => {
    if (busy) return;
    setBusy(true);

    if (reduceMotion) {
      // instant fallback
      scrollToHash(href);
      setBusy(false);
      return;
    }

    setMounted(true);
    setOverlayLabel(null);
    // kickstart sequence on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOverlayPhase("circle");
        const t1 = window.setTimeout(() => {
          setOverlayPhase("full");
          const t2 = window.setTimeout(() => {
            // show label content and scroll
            setOverlayLabel(label);
            setOpen(true);
            // scroll while content is visible
            scrollToHash(href);
            // close after a short visible period
            const t3 = window.setTimeout(() => {
              // start closing
              setOpen(false);
              const t4 = window.setTimeout(() => {
                setOverlayPhase("circle");
                const t5 = window.setTimeout(() => {
                  setOverlayPhase("hidden");
                  setMounted(false);
                  setOverlayLabel(null);
                  setBusy(false);
                }, 520);
                timersRef.current.push(t5);
              }, 240);
              timersRef.current.push(t4);
            }, 1000);
            timersRef.current.push(t3);
          }, 400);
          timersRef.current.push(t2);
        }, 500);
        timersRef.current.push(t1);
      });
    });
  };

  const clipPath =
    overlayPhase === "hidden"
      ? "circle(0vmax at 50% 50%)"
      : overlayPhase === "circle"
      ? "circle(6vmax at 50% 50%)"
      : "circle(150vmax at 50% 50%)";

  const clipDuration = overlayPhase === "circle" ? "300ms" : overlayPhase === "full" ? "3000ms" : "300ms";

  return (
    <>
      {/* Minimal top-left hamburger */}
      <header
        className={`fixed top-0 left-0 right-0 z-[60] p-4 flex items-center justify-between transition-opacity duration-500 ${
          visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div>
          <button
            onClick={openMenu}
            aria-label="Open menu"
            className="h-11 w-11 rounded-full border border-white/15 bg-black/50 backdrop-blur-md
                       hover:border-white/30 hover:bg-black/60 transition
                       flex items-center justify-center"
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-1.5">
              <span className="block h-[2px] w-5 bg-white/90" />
              <span className="block h-[2px] w-5 bg-white/70" />
              <span className="block h-[2px] w-5 bg-white/90" />
            </div>
          </button>
        </div>

        <nav className="flex gap-4 items-center">
          {NAV.map((item) => (
            <button
              key={item.href}
              onClick={() => navigateWithWipe(item.href, item.label)}
              className="text-sm md:text-base text-white/90 hover:text-white transition px-3 py-2"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Radial wipe overlay rendered into document.body to avoid insertion conflicts */}
      {mounted &&
        (typeof document !== "undefined"
          ? createPortal(
              <div className="fixed inset-0 z-[999]">
                {/* White background that animates via clip-path */}
                <div
                  ref={overlayRef}
                  className="absolute inset-0 bg-white will-change-[clip-path]"
                  style={{
                    transition: `clip-path ${clipDuration} cubic-bezier(0.2, 0.9, 0.2, 1)`,
                    clipPath: clipPath,
                  }}
                />

                {/* Menu content or single-link label */}
                {overlayLabel ? (
                  <div
                    className={`relative h-full w-full flex items-center justify-center p-6 text-black
                                  transition-opacity duration-700 ${open ? "opacity-100" : "opacity-0"}`}
                    style={{ transitionDelay: open ? "240ms" : "0ms" }}
                  >
                    <div className="text-center max-w-2xl">
                      <h2 className="text-3xl md:text-5xl font-semibold">{overlayLabel}</h2>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`relative h-full w-full flex flex-col p-6 text-black
                                  transition-opacity duration-700 ${
                                    open ? "opacity-100" : "opacity-0"
                                  }`}
                    style={{ transitionDelay: open ? "240ms" : "0ms" }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm tracking-[0.28em] uppercase text-black/60">Menu</div>

                      <button
                        onClick={closeMenu}
                        aria-label="Close menu"
                        className="rounded-full border border-black/15 px-4 py-2 text-sm text-black/80
                                   hover:border-black/30 hover:bg-black/5 transition"
                      >
                        Close
                      </button>
                    </div>

                    <nav className="mt-12">
                      <ul className="space-y-3">
                        {NAV.map((item) => (
                          <li key={item.href}>
                            <button
                              onClick={() => onNavClick(item.href)}
                              className="w-full text-left rounded-2xl border border-black/10 bg-black/[0.02]
                                         px-6 py-5 text-2xl md:text-3xl font-semibold
                                         hover:border-black/20 hover:bg-black/[0.04] transition"
                            >
                              {item.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </nav>

                    <div className="mt-auto pt-10 text-xs text-black/45">
                      Tip: press <span className="font-semibold">ESC</span> to close.
                    </div>
                  </div>
                )}
              </div>,
              document.body
            )
          : null)}
    </>
  );
}
