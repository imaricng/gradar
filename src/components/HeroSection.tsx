"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowDownRight, Building2, Car, Maximize2, Waves } from "lucide-react";

const HERO_METRICS = [
  {
    value: "25",
    label: "Ekskluzivnih stanova",
    sub: "Prizemlje + 4 kata",
    icon: Building2,
  },
  {
    value: "1. red",
    label: "Uz rijeku Bosut",
    sub: "Ul. Josipa Lovretića",
    icon: Waves,
  },
  {
    value: "25",
    label: "Parkirnih mjesta",
    sub: "Omjer 1 : 1 (PM1–PM25)",
    icon: Car,
  },
  {
    value: "268 cm",
    label: "Visina stropova",
    sub: "Prozračnost i svjetlost",
    icon: Maximize2,
  },
] as const;

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const activeLayerRef = useRef<0 | 1>(0);
  const crossfadingRef = useRef(false);
  const swapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // GSAP entrance animation
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setReducedMotion(prefersReduced);
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-reveal]", {
        y: 34,
        opacity: 0,
        duration: 1.05,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "transform",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Dual-buffer seamless crossfade loop engine for /media/hero-bosut.mp4
  useEffect(() => {
    if (reducedMotion || videoFailed) return;

    const vidA = videoARef.current;
    const vidB = videoBRef.current;
    if (!vidA || !vidB) return;

    activeLayerRef.current = 0;
    setActiveLayer(0);
    vidA.play().catch(() => {});

    const triggerCrossfade = () => {
      if (crossfadingRef.current) return;
      crossfadingRef.current = true;

      const currentIdx = activeLayerRef.current;
      const incoming = currentIdx === 0 ? vidB : vidA;
      const outgoing = currentIdx === 0 ? vidA : vidB;
      const nextIdx: 0 | 1 = currentIdx === 0 ? 1 : 0;

      incoming.currentTime = 0;
      incoming.play().catch(() => {});

      activeLayerRef.current = nextIdx;
      setActiveLayer(nextIdx);

      if (swapTimerRef.current) clearTimeout(swapTimerRef.current);
      swapTimerRef.current = setTimeout(() => {
        outgoing.pause();
        outgoing.currentTime = 0;
        crossfadingRef.current = false;
      }, 1100);
    };

    const handleTimeUpdate = (idx: 0 | 1) => {
      if (activeLayerRef.current !== idx || crossfadingRef.current) return;
      const vid = idx === 0 ? vidA : vidB;
      if (vid.duration > 3 && vid.currentTime >= vid.duration - 1.25) {
        triggerCrossfade();
      }
    };

    const handleEnded = (idx: 0 | 1) => {
      if (activeLayerRef.current !== idx) return;
      triggerCrossfade();
    };

    const onTimeA = () => handleTimeUpdate(0);
    const onTimeB = () => handleTimeUpdate(1);
    const onEndA = () => handleEnded(0);
    const onEndB = () => handleEnded(1);

    vidA.addEventListener("timeupdate", onTimeA);
    vidB.addEventListener("timeupdate", onTimeB);
    vidA.addEventListener("ended", onEndA);
    vidB.addEventListener("ended", onEndB);

    return () => {
      if (swapTimerRef.current) clearTimeout(swapTimerRef.current);
      vidA.removeEventListener("timeupdate", onTimeA);
      vidB.removeEventListener("timeupdate", onTimeB);
      vidA.removeEventListener("ended", onEndA);
      vidB.removeEventListener("ended", onEndB);
    };
  }, [reducedMotion, videoFailed]);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#141A18] pt-28"
    >
      {/* =====================================================================
          SEAMLESS DUAL-BUFFER TIMELAPSE HERO BACKDROP
          Day -> Blue-Hour Night -> Day timelapse (/media/hero-bosut.mp4)
          with 1000ms dual-video opacity crossfade for zero visible loop seam.
         ===================================================================== */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {!posterFailed && (
          <img
            src="/media/hero-poster.jpg"
            alt="Bosut Residence — prvi red uz rijeku Bosut"
            onError={() => setPosterFailed(true)}
            className="h-full w-full object-cover"
          />
        )}

        {!reducedMotion && !videoFailed && (
          <>
            <video
              ref={videoARef}
              muted
              playsInline
              preload="auto"
              poster="/media/hero-poster.jpg"
              onCanPlay={() => setVideoReady(true)}
              onError={() => setVideoFailed(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                videoReady && activeLayer === 0
                  ? "z-[2] opacity-100"
                  : "z-[1] opacity-0"
              }`}
            >
              <source src="/media/hero-bosut.mp4" type="video/mp4" />
            </video>

            <video
              ref={videoBRef}
              muted
              playsInline
              preload="auto"
              poster="/media/hero-poster.jpg"
              onError={() => setVideoFailed(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                videoReady && activeLayer === 1
                  ? "z-[2] opacity-100"
                  : "z-[1] opacity-0"
              }`}
            >
              <source src="/media/hero-bosut.mp4" type="video/mp4" />
            </video>
          </>
        )}

        {/* Architectural fallback backdrop if neither poster nor video is available */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 transition-opacity duration-1000 ${
            videoReady || !posterFailed
              ? "pointer-events-none opacity-0"
              : "opacity-100"
          }`}
        >
          <div className="absolute inset-0 bg-[#141A18] bg-arch-grid" />
          <div
            className="animate-arch-glow absolute -right-1/4 -top-1/4 h-[85vh] w-[75vw] rounded-full blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, rgba(198,156,114,0.22) 0%, rgba(29,37,34,0.35) 48%, transparent 72%)",
            }}
          />
        </div>

        {/* Contrast gradient scrim for crisp legibility over Day & Night phases */}
        <div className="absolute inset-0 z-[3] bg-gradient-to-r from-[#141A18]/92 via-[#141A18]/65 to-[#141A18]/45" />
        <div className="absolute inset-0 z-[3] bg-gradient-to-t from-[#141A18] via-transparent to-[#141A18]/40" />
      </div>

      {/* Main editorial headline block */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="max-w-3xl">
          <div
            data-hero-reveal
            className="mb-7 inline-flex items-center gap-3 border border-white/15 bg-white/[0.03] px-4 py-2 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#C69C72]" />
            <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#F7F5F0]/85">
              Vinkovci · Ulica Josipa Lovretića · GraDar d.o.o.
            </span>
          </div>

          <h1
            data-hero-reveal
            className="font-serif text-[46px] font-light leading-[1.03] tracking-[-0.015em] text-[#F7F5F0] sm:text-6xl md:text-7xl lg:text-[84px]"
          >
            Život u prvom redu uz{" "}
            <span className="italic text-[#C69C72]">Bosut.</span>
          </h1>

          <p
            data-hero-reveal
            className="mt-7 max-w-xl text-base font-light leading-relaxed text-[#F7F5F0]/75 sm:text-lg"
          >
            Bosut Residence donosi dvadeset pet pomno projektiranih stanova
            suptilne arhitekture — spoj toplih brisoleja, velikih staklenih
            stijena i mirne obale rijeke na svega pet minuta hoda od centra
            Vinkovaca.
          </p>

          <div
            data-hero-reveal
            className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center"
          >
            <a
              href="#stanovi"
              className="group inline-flex items-center justify-center gap-3 border border-[#C69C72] bg-[#C69C72] px-7 py-4 text-xs font-medium uppercase tracking-[0.18em] text-[#141A18] transition-all duration-300 hover:bg-[#F7F5F0] hover:border-[#F7F5F0]"
            >
              Istraži slobodne stanove
              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>

            <a
              href="#projekt"
              className="inline-flex items-center justify-center border border-white/20 bg-white/[0.02] px-7 py-4 text-xs font-medium uppercase tracking-[0.18em] text-[#F7F5F0] backdrop-blur-sm transition-all duration-300 hover:border-[#C69C72] hover:text-[#C69C72]"
            >
              Arhitektonska vizija
            </a>
          </div>
        </div>
      </div>

      {/* Bottom 4-metric architectural strip */}
      <div className="relative z-10 border-t border-white/10 bg-[#141A18]/75 backdrop-blur-xl">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-y divide-white/10 sm:divide-y-0 lg:grid-cols-4">
          {HERO_METRICS.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                data-hero-reveal
                className="flex items-start gap-4 px-5 py-6 sm:px-8 lg:py-7"
              >
                <Icon
                  className="mt-1 h-4 w-4 shrink-0 text-[#C69C72]"
                  strokeWidth={1.5}
                />
                <div>
                  <div className="font-serif text-2xl font-normal tracking-wide text-[#F7F5F0] sm:text-3xl">
                    {metric.value}
                  </div>
                  <div className="mt-0.5 text-xs font-medium uppercase tracking-[0.12em] text-[#F7F5F0]/80">
                    {metric.label}
                  </div>
                  <div className="mt-0.5 text-[11px] text-[#F7F5F0]/50">
                    {metric.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
