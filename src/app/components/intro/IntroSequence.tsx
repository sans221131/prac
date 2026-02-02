"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type IntroSequenceProps = {
  frameCount?: number; // default 202
  folder?: string; // default "/intro"
  filePrefix?: string; // default "ezgif-frame-"
  extension?: string; // default "jpg"
  pad?: number; // default 3 (001..202)
  scrollPages?: number; // default 3
  showDebugMarkers?: boolean;
  background?: string; // letterbox color

  /** NEW: section id so other ScrollTriggers can target it if needed */
  id?: string;

  /** NEW: progress (0..1) at which frames should be finished (rest holds last frame) */
  finishFramesAt?: number; // default 0.8

  /** NEW: overlay content that sits above the canvas (pinned together) */
  children?: React.ReactNode;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function IntroSequence({
  frameCount = 202,
  folder = "/intro",
  filePrefix = "ezgif-frame-",
  extension = "jpg",
  pad = 3,
  scrollPages = 3,
  showDebugMarkers = false,
  background = "#000",
  id = "intro-sequence",
  finishFramesAt = 0.8,
  children,
}: IntroSequenceProps) {
  const wrapRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedRef = useRef(false);
  const lastIndexRef = useRef(0);

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  const urlFor = (frameNumber1Based: number) => {
    const num = String(frameNumber1Based).padStart(pad, "0");
    return `${folder}/${filePrefix}${num}.${extension}`;
  };

  const [framesMissing, setFramesMissing] = useState(false);

  const getCssSize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return { cw: 0, ch: 0 };
    return { cw: canvas.clientWidth, ch: canvas.clientHeight };
  };

  const drawFallback = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { cw, ch } = getCssSize();
    if (!cw || !ch) return;

    ctx.clearRect(0, 0, cw, ch);
    const g = ctx.createLinearGradient(0, 0, cw, ch);
    g.addColorStop(0, "#000");
    g.addColorStop(1, "#0b0b10");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, cw, ch);

    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fillRect(0, ch - 120, cw, 120);

    ctx.fillStyle = "rgba(242,243,245,0.65)";
    ctx.font = "18px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Intro frames not found", cw / 2, ch / 2);
  };

  // ✅ CONTAIN: no cropping
  const drawContain = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { cw, ch } = getCssSize();
    if (!cw || !ch) return;

    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;
    if (!iw || !ih) return;

    const scale = Math.min(cw / iw, ch / ih);
    const dw = Math.round(iw * scale);
    const dh = Math.round(ih * scale);
    const dx = Math.round((cw - dw) / 2);
    const dy = Math.round((ch - dh) / 2);

    ctx.clearRect(0, 0, cw, ch);
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, cw, ch);

    ctx.imageSmoothingEnabled = true;
    // @ts-ignore
    if (ctx.imageSmoothingQuality) ctx.imageSmoothingQuality = "high";

    ctx.drawImage(img, dx, dy, dw, dh);
  };

  const render = (index: number) => {
    const i = clamp(index, 0, frameCount - 1);
    lastIndexRef.current = i;
    const img = imagesRef.current[i];
    if (img) drawContain(img);
  };

  const setCanvasSize = () => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const rect = wrap.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const cssWidth = rect.width;
    const cssHeight = rect.height;

    canvas.width = Math.round(cssWidth * dpr);
    canvas.height = Math.round(cssHeight * dpr);
    canvas.style.width = `${cssWidth}px`;
    canvas.style.height = `${cssHeight}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // @ts-ignore
      if (ctx.imageSmoothingQuality) ctx.imageSmoothingQuality = "high";
    }

    render(lastIndexRef.current);
  };

  // Preload frames
  useEffect(() => {
    imagesRef.current = new Array(frameCount).fill(null);
    loadedRef.current = false;
    setFramesMissing(false);

    let cancelled = false;

    const loadOne = (i0: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.src = urlFor(i0 + 1);
        img.onload = () => {
          if (!cancelled) imagesRef.current[i0] = img;
          resolve();
        };
        img.onerror = () => resolve();
      });

    const idle = (cb: () => void): number => {
      if ("requestIdleCallback" in window) {
        // @ts-ignore
        return window.requestIdleCallback(cb) as number;
      }
      return setTimeout(cb, 50) as unknown as number;
    };

    (async () => {
      try {
        const res = await fetch(urlFor(1), { method: "HEAD" });
        if (!res.ok) {
          setFramesMissing(true);
          loadedRef.current = true;
          drawFallback();
          return;
        }
      } catch {
        setFramesMissing(true);
        loadedRef.current = true;
        drawFallback();
        return;
      }

      if (reducedMotion) {
        await loadOne(frameCount - 1);
        if (!cancelled) {
          loadedRef.current = true;
          setCanvasSize();
          render(frameCount - 1);
          try {
            const lastUrl = urlFor(frameCount);
            window.dispatchEvent(new CustomEvent("intro:ended", { detail: { bg: lastUrl } }));
          } catch {}
        }
        return;
      }

      await loadOne(0);
      if (cancelled) return;

      loadedRef.current = true;
      setCanvasSize();
      render(0);

      const fastChunk = Math.min(24, frameCount);
      for (let i = 1; i < fastChunk; i++) await loadOne(i);

      let next = fastChunk;
      const loadRest = async () => {
        if (cancelled) return;
        const batch = 10;
        const jobs: Promise<void>[] = [];
        for (let k = 0; k < batch && next < frameCount; k++, next++) {
          jobs.push(loadOne(next));
        }
        await Promise.all(jobs);
        if (next < frameCount) idle(loadRest);
      };
      idle(loadRest);
    })();

    return () => {
      cancelled = true;
    };
  }, [frameCount, folder, filePrefix, extension, pad, reducedMotion]);

  // ScrollTrigger pin + scrub
  useGSAP(
    () => {
      const wrap = wrapRef.current;
      if (!wrap) return;

      setCanvasSize();

      const onResize = () => setCanvasSize();
      window.addEventListener("resize", onResize);

      if (reducedMotion) {
        window.removeEventListener("resize", onResize);
        return;
      }

      const total = frameCount - 1;
      const cut = clamp(finishFramesAt, 0.05, 1);

      let ended = false;

      const st = ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * scrollPages)}`,
        scrub: 0.25,
        pin: true,
        anticipatePin: 1,
        markers: showDebugMarkers,
        onUpdate: (self) => {
          // ✅ Frames finish by `finishFramesAt` and then HOLD last frame.
          const p = self.progress;
          const frameProgress = clamp(p / cut, 0, 1);
          const idx = Math.round(frameProgress * total);

          render(idx);

          if (!ended && idx >= total) {
            ended = true;
            try {
              const lastUrl = urlFor(frameCount);
              window.dispatchEvent(new CustomEvent("intro:ended", { detail: { bg: lastUrl } }));
            } catch {}
          }
        },
      });

      return () => {
        st.kill();
        window.removeEventListener("resize", onResize);
      };
    },
    { dependencies: [frameCount, scrollPages, reducedMotion, showDebugMarkers, finishFramesAt] }
  );

  return (
    <section
      id={id}
      ref={wrapRef as any}
      className="relative w-full h-[100dvh] md:h-[100svh] overflow-hidden bg-black"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Overlay content (pinned together) */}
      {children && <div className="absolute inset-0 z-10">{children}</div>}

      {!framesMissing && (
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs z-10">
          Scroll
        </div>
      )}

      <style>{`.pin-spacer{background-color:#000!important;}`}</style>
    </section>
  );
}
