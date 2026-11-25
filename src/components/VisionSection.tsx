"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Compass,
  Layers,
  ShieldCheck,
  Sparkles,
  Sun,
  Trees,
} from "lucide-react";
import { Apartment, formatArea } from "@/data/apartments";

gsap.registerPlugin(ScrollTrigger);

interface VisionSectionProps {
  villaApartment: Apartment;
  onSelectApartment: (apartment: Apartment) => void;
}

const GALLERY_ANGLES = [
  {
    src: "/media/hero-poster.jpg",
    tag: "Rijeka Bosut",
    caption: "Pročelje prema šetnici i gradu Vinkovcima",
  },
  {
    src: "/renders/orig-side.jpg",
    tag: "Zeleni pojas",
    caption: "Parkovno okruženje i dvostrana osvijetljenost",
  },
  {
    src: "/renders/orig-courtyard.jpg",
    tag: "Ulaz & Parking 1:1",
    caption: "Natkriveni pristup i 25 parkirnih mjesta (PM1–PM25)",
  },
  {
    src: "/media/stan-s1-vrt.jpg",
    tag: "Prizemlje · Stan S1",
    caption: "Privatna natkrivena terasa (44 m²) i vrt (128,44 m²)",
  },
] as const;

const QUALITY_PILLARS = [
  {
    icon: Layers,
    title: "Lift kroz sve etaže",
    detail:
      "Bešumno dizalo povezuje prizemlje i spremišta sa sva četiri stambena kata bez arhitektonskih barijera.",
  },
  {
    icon: Compass,
    title: "Dvostrana orijentacija",
    detail:
      "Prirodno provjetravanje i jutarnje ili popodnevno sunce — svaki od 25 stanova ima dvostranu orijentaciju.",
  },
  {
    icon: ShieldCheck,
    title: "Toplinska i zvučna izolacija",
    detail:
      "Troslojna stolarija velikih formata, fasadni sustav visoke učinkovitosti i zvučna izolacija međukatnih konstrukcija.",
  },
  {
    icon: Sparkles,
    title: "19 spremišta i 25 PM (1:1)",
    detail:
      "Svaki stan ima osigurano parkirno mjesto (PM1–PM25) te mogućnost privatnog spremišta u prizemlju (1,54 – 3,06 m²).",
  },
] as const;

export function VisionSection({
  villaApartment,
  onSelectApartment,
}: VisionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-vision-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 36,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projekt"
      ref={sectionRef}
      className="bg-[#F7F5F0] text-[#141A18]"
    >
      {/* Editorial Intro + Asymmetric Grid */}
      <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div
          data-vision-reveal
          className="grid gap-10 border-b border-black/10 pb-16 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#C69C72]">
              01 · Arhitektonska vizija
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-[1.08] tracking-[-0.015em] text-[#141A18] sm:text-5xl lg:text-6xl">
              Pogled preko Bosuta na{" "}
              <span className="italic text-[#8C6843]">grad Vinkovce.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base font-light leading-relaxed text-[#141A18]/75">
              Projektirana u suradnji s osječkim studiom{" "}
              <strong className="font-medium text-[#141A18]">
                QUADAR Design d.o.o.
              </strong>
              , zgrada Bosut Residence spaja toplu terakota bazu, ritmične
              klizne drvene brisoleje i velike staklene stijene koje iz dnevnih
              boravaka i loggia otvaraju izravan pogled preko rijeke na
              vizuru Vinkovaca.
            </p>
          </div>
        </div>

        {/* Asymmetric editorial block 1: Privatnost, brisoleji i pogled na Vinkovce */}
        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div data-vision-reveal className="lg:col-span-7">
            <div className="relative overflow-hidden border border-black/10 bg-[#141A18]">
              <img
                src="/media/interior-living-poster.jpg"
                alt="Dnevni boravak s brisolejima i pogledom preko rijeke Bosut na grad Vinkovce"
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="border-t border-black/10 bg-[#141A18] px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-[#C69C72]">
                Pogled iz dnevnog boravka preko Bosuta prema centru Vinkovaca
              </div>
            </div>
          </div>

          <div data-vision-reveal className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#8C6843]">
              <Sun className="h-4 w-4 text-[#C69C72]" strokeWidth={1.6} />
              Privatnost i svjetlost
            </div>
            <h3 className="mt-4 font-serif text-3xl font-light leading-tight text-[#141A18] sm:text-4xl">
              Natkrivene loggie do 28,36 m² kao produžetak dnevnog boravka.
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-[#141A18]/72 sm:text-base">
              Klizni drveni brisoleji filtriraju ljetno sunce i čuvaju
              intimnost, dok prostrane natkrivene loggie sa staklenim ogradama
              spajaju interijer s mirnom rijekom i gradskom panoramom na
              suprotnoj obali.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-black/10 pt-6">
              <div>
                <div className="font-serif text-3xl font-normal text-[#141A18]">
                  28,36 m²
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.14em] text-[#141A18]/60">
                  Najveća katna loggia
                </div>
              </div>
              <div>
                <div className="font-serif text-3xl font-normal text-[#141A18]">
                  268 cm
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.14em] text-[#141A18]/60">
                  Svijetla visina stropa
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Asymmetric editorial block 2: Flagship Stan S1 + Loggia Sunset */}
        <div className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-12 lg:items-stretch lg:gap-14">
          <div
            data-vision-reveal
            className="order-2 flex flex-col justify-between border border-black/10 bg-[#141A18] p-8 text-[#F7F5F0] sm:p-10 lg:order-1 lg:col-span-6"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 border border-[#C69C72]/40 bg-[#C69C72]/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#C69C72]">
                  <Trees className="h-3.5 w-3.5" />
                  Flagship · Prizemlje
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-medium text-[#10B981]">
                  <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                  Slobodan · Stan S1
                </span>
              </div>

              <h3 className="mt-7 font-serif text-3xl font-light leading-tight text-[#F7F5F0] sm:text-4xl">
                Osjećaj kuće, komfor stana.
              </h3>
              <p className="mt-4 text-sm font-light leading-relaxed text-[#F7F5F0]/75 sm:text-base">
                Jedinstvena urbana vila u prizemlju zgrade: 109,70 m² zatvorenog
                stambenog prostora s dnevnim boravkom od 43,94 m², dvije
                kupaonice, izlazom na 44,00 m² terase i čak{" "}
                <strong className="font-medium text-[#C69C72]">
                  128,44 m² privatnog ograđenog vrta
                </strong>
                .
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4 border-y border-white/10 py-6">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-[#F7F5F0]/50">
                    Zatvoreno
                  </div>
                  <div className="mt-1 font-serif text-2xl text-[#F7F5F0]">
                    {formatArea(villaApartment.closedArea)}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-[#F7F5F0]/50">
                    Vrt + Terasa
                  </div>
                  <div className="mt-1 font-serif text-2xl text-[#C69C72]">
                    {formatArea(villaApartment.exteriorArea)}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-[#F7F5F0]/50">
                    Ukupno
                  </div>
                  <div className="mt-1 font-serif text-2xl text-[#F7F5F0]">
                    {formatArea(villaApartment.totalArea)}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-[#F7F5F0]/55">
                Orijentacija: {villaApartment.orientation} · 8 prostorija
              </div>
              <button
                type="button"
                onClick={() => onSelectApartment(villaApartment)}
                className="group inline-flex items-center gap-2 border border-[#C69C72] bg-[#C69C72] px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] text-[#141A18] transition-all duration-300 hover:bg-transparent hover:text-[#F7F5F0]"
              >
                Pogledaj tlocrt S1
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          <div data-vision-reveal className="order-1 lg:order-2 lg:col-span-6">
            <div className="relative h-full overflow-hidden border border-black/10 bg-[#141A18]">
              <img
                src="/media/bosut-sunset-poster.jpg"
                alt="Večernji pogled s loggie na rijeku Bosut i Vinkovce"
                className="h-full min-h-[320px] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#141A18]/90 via-[#141A18]/45 to-transparent px-6 py-4">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#C69C72]">
                  Zlatni sat na Bosutu · Pogled prema gradu Vinkovcima
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Angle Real Project Gallery Strip */}
        <div data-vision-reveal className="mt-20 border-t border-black/10 pt-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#8C6843]">
                Vizualizacija stvarnog projekta
              </p>
              <h3 className="mt-1 font-serif text-3xl font-light text-[#141A18]">
                Četiri perspektive zgrade Bosut Residence
              </h3>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {GALLERY_ANGLES.map((item) => (
              <div
                key={item.tag}
                className="group overflow-hidden border border-black/10 bg-white"
              >
                <div className="overflow-hidden bg-[#141A18]">
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-4">
                  <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#8C6843]">
                    {item.tag}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-[#141A18]/80">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Excellence Strip */}
      <div
        id="kvaliteta"
        className="border-t border-black/10 bg-[#1D2522] text-[#F7F5F0]"
      >
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div
            data-vision-reveal
            className="flex flex-col justify-between gap-6 border-b border-white/10 pb-12 md:flex-row md:items-end"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#C69C72]">
                02 · Tehnička izvrsnost
              </p>
              <h2 className="mt-3 font-serif text-3xl font-light text-[#F7F5F0] sm:text-5xl">
                Standard gradnje bez kompromisa.
              </h2>
            </div>
            <p className="max-w-md text-sm font-light leading-relaxed text-[#F7F5F0]/70">
              Svaki tehnički detalj projektiran je za niske režijske troškove,
              akustični mir i dugoročno očuvanje vrijednosti nekretnine.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {QUALITY_PILLARS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  data-vision-reveal
                  className="border border-white/10 bg-[#141A18]/60 p-7 transition-colors duration-300 hover:border-[#C69C72]/50"
                >
                  <div className="flex h-11 w-11 items-center justify-center border border-[#C69C72]/35 bg-[#C69C72]/10 text-[#C69C72]">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 font-serif text-2xl font-normal text-[#F7F5F0]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-[#F7F5F0]/70">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
