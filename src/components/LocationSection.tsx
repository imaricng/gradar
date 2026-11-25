"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Box,
  Clock,
  ExternalLink,
  FileText,
  GraduationCap,
  Landmark,
  MapPin,
  Satellite,
  ShoppingBag,
  Waves,
} from "lucide-react";
import { LOCATION_HIGHLIGHTS, PROJECT_INFO } from "@/data/apartments";

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHT_ICONS = {
  setnica: Waves,
  trgovine: ShoppingBag,
  skola: GraduationCap,
  centar: Landmark,
} as const;

type MapViewMode = "3d" | "ortho" | "cad";

export function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mapMode, setMapMode] = useState<MapViewMode>("3d");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-loc-reveal]", {
        y: 30,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const mapsQuery = encodeURIComponent(
    "Ulica Josipa Lovretića, Vinkovci, Croatia"
  );

  return (
    <section
      id="lokacija"
      ref={sectionRef}
      className="border-t border-white/10 bg-[#1D2522] py-24 text-[#F7F5F0] lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <div
          data-loc-reveal
          className="grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#C69C72]">
              04 · Mikrolokacija · Vinkovci
            </p>
            <h2 className="mt-3 font-serif text-4xl font-light leading-tight text-[#F7F5F0] sm:text-5xl lg:text-6xl">
              Mir obale,{" "}
              <span className="italic text-[#C69C72]">
                grad Vinkovci preko rijeke.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm font-light leading-relaxed text-[#F7F5F0]/75 sm:text-base">
              Smješten na novoformiranoj čestici{" "}
              <strong className="font-medium text-[#F7F5F0]">
                {PROJECT_INFO.location.parcel}
              </strong>{" "}
              uz {PROJECT_INFO.location.street}, projekt spaja mirnu rijeku i
              šetnicu s brzim pješačkim pristupom preko mosta ravno u središte
              Vinkovaca.
            </p>
          </div>
        </div>

        {/* 3-Way Location Viewer + Walking-Time Cards */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-stretch">
          <div
            data-loc-reveal
            className="relative flex flex-col justify-between overflow-hidden border border-white/10 bg-[#141A18] p-5 sm:p-7 lg:col-span-7"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="inline-flex items-center gap-2 text-xs text-[#F7F5F0]/80">
                <MapPin className="h-4 w-4 text-[#C69C72]" strokeWidth={1.6} />
                <span>{PROJECT_INFO.location.fullAddress}</span>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-[#C69C72] transition-colors hover:text-[#F7F5F0]"
              >
                Otvori Google Maps
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* 3-Way Switcher */}
            <div
              role="tablist"
              aria-label="Prikaz lokacije i okolice"
              className="mt-4 flex flex-wrap gap-1.5"
            >
              <button
                type="button"
                role="tab"
                aria-selected={mapMode === "3d"}
                onClick={() => setMapMode("3d")}
                className={`inline-flex items-center gap-1.5 border px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors ${
                  mapMode === "3d"
                    ? "border-[#C69C72] bg-[#C69C72] text-[#141A18]"
                    : "border-white/10 bg-[#18201D] text-[#F7F5F0]/70 hover:text-[#F7F5F0]"
                }`}
              >
                <Box className="h-3.5 w-3.5" />
                3D Zračna vizualizacija
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mapMode === "ortho"}
                onClick={() => setMapMode("ortho")}
                className={`inline-flex items-center gap-1.5 border px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors ${
                  mapMode === "ortho"
                    ? "border-[#C69C72] bg-[#C69C72] text-[#141A18]"
                    : "border-white/10 bg-[#18201D] text-[#F7F5F0]/70 hover:text-[#F7F5F0]"
                }`}
              >
                <Satellite className="h-3.5 w-3.5" />
                Ortofoto lokacije
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mapMode === "cad"}
                onClick={() => setMapMode("cad")}
                className={`inline-flex items-center gap-1.5 border px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors ${
                  mapMode === "cad"
                    ? "border-[#C69C72] bg-[#C69C72] text-[#141A18]"
                    : "border-white/10 bg-[#18201D] text-[#F7F5F0]/70 hover:text-[#F7F5F0]"
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                Situacija (k.č.br. 5250/1)
              </button>
            </div>

            {/* Active Location Visual */}
            <div className="relative my-5 overflow-hidden border border-white/10 bg-[#101513]">
              {mapMode === "3d" && (
                <img
                  src="/media/aerial-vinkovci-3d.jpg"
                  alt="3D zračna vizualizacija zgrade Bosut Residence uz rijeku Bosut i grad Vinkovce na suprotnoj obali"
                  className="aspect-[16/10] w-full object-cover"
                />
              )}
              {mapMode === "ortho" && (
                <img
                  src="/plans/lokacija-ortho.png"
                  alt="Službena ortofoto snimka lokacije u Ulici Josipa Lovretića uz rijeku Bosut"
                  className="aspect-[16/10] w-full object-cover"
                />
              )}
              {mapMode === "cad" && (
                <div className="bg-white p-2">
                  <img
                    src="/plans/situacija-cad.png"
                    alt="Geodetska situacija novoformirane k.č.br. 5250/1, k.o. Vinkovci II"
                    className="aspect-[16/10] w-full object-contain"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#F7F5F0]/55">
              <span>Katastarska čestica: {PROJECT_INFO.location.parcel}</span>
              <span>45.2857° N, 18.8045° E · Vinkovci</span>
            </div>
          </div>

          {/* Walking-Time Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {LOCATION_HIGHLIGHTS.map((item) => {
              const Icon = HIGHLIGHT_ICONS[item.id];
              return (
                <div
                  key={item.id}
                  data-loc-reveal
                  className="flex items-start gap-5 border border-white/10 bg-[#141A18]/80 p-6 transition-colors duration-300 hover:border-[#C69C72]/50"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#C69C72]/35 bg-[#C69C72]/10 text-[#C69C72]">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-serif text-2xl font-normal text-[#F7F5F0]">
                        {item.title}
                      </h3>
                      <span className="inline-flex items-center gap-1.5 border border-[#C69C72]/35 bg-[#C69C72]/10 px-2.5 py-1 text-xs font-medium text-[#C69C72]">
                        <Clock className="h-3 w-3" />
                        {item.time} hoda
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-light leading-relaxed text-[#F7F5F0]/70">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
