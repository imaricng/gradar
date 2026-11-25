"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BadgeCheck,
  Building2,
  Car,
  FileDown,
  FileText,
  KeyRound,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { buildWhatsAppUrl, PROJECT_INFO } from "@/data/apartments";

gsap.registerPlugin(ScrollTrigger);

const BUYING_STEPS = [
  {
    step: "01",
    title: "Osobni obilazak i izbor stana",
    description:
      "Razgovarate izravno s vlasnikom i investitorom Dariom Maršićem na samoj lokaciji uz Bosut. Dobivate potpuni uvid u orijentaciju, poglede i stvarne dimenzije.",
    icon: Building2,
  },
  {
    step: "02",
    title: "Rezervacija i potpuna dokumentacija",
    description:
      "Odabrani stan rezerviramo na vaše ime uz pregled građevinske dozvole, vlasničkog lista čestice k.č.br. 5250/1 i cjelokupnog tehničkog opisa.",
    icon: FileText,
  },
  {
    step: "03",
    title: "Predugovor i podrška za kredit",
    description:
      "Transparentan ugovorni odnos bez agencijskih posrednika i 0 % provizije. Pripremamo svu dokumentaciju potrebnu za brzu realizaciju stambenog kredita.",
    icon: ShieldCheck,
  },
  {
    step: "04",
    title: "Ključ u ruke i jamstvo investitora",
    description:
      "U fazi gradnje dogovarate detalje završne obrade (podovi, keramika, sanitarije) izravno s GraDar timom, uz zakonsko jamstvo i tehničku primopredaju.",
    icon: KeyRound,
  },
] as const;

const DIRECT_BENEFITS = [
  {
    icon: BadgeCheck,
    title: "0 % agencijske provizije",
    text: "Izravnom kupnjom od GraDar d.o.o. štedite 2–3 % ukupne cijene stana — bez posredničkih troškova.",
  },
  {
    icon: Car,
    title: "Parkirno mjesto 1 : 1",
    text: "Svaki stan ima osigurano vlastito parkirno mjesto (PM1–PM25) i opciju privatnog spremišta u prizemlju.",
  },
  {
    icon: MessageCircle,
    title: "Izravan dogovor s investitorom",
    text: "Mogućnost personalizacije završnih obloga i opreme u suradnji s inženjerima tijekom gradnje.",
  },
] as const;

export function DirectPurchaseSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-direct-reveal]", {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const whatsappHref = buildWhatsAppUrl(
    "Pozdrav Dario, zanima me direktna kupnja stana u projektu Bosut Residence (0% provizije). Molim ponudu i slobodne termine razgledavanja."
  );

  return (
    <section
      id="direktna-kupnja"
      ref={sectionRef}
      className="border-t border-white/10 bg-[#141A18] py-24 text-[#F7F5F0] lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Heading + Full Catalog Download CTA */}
        <div
          data-direct-reveal
          className="grid gap-10 border-b border-white/10 pb-14 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#C69C72]">
              05 · Direktna prodaja · Bez posrednika
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-[#F7F5F0] sm:text-5xl lg:text-6xl">
              Kupnja direktno od investitora —{" "}
              <span className="italic text-[#C69C72]">
                0 % agencijske provizije.
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-5 lg:items-end">
            <p className="text-sm font-light leading-relaxed text-[#F7F5F0]/75 lg:text-right">
              Sve informacije, tlocrti i uvjeti dostupni su vam izravno od
              investitora GraDar d.o.o. Preuzmite službeni katalog svih 25
              stanova ili rezervirajte termin obilaska.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={PROJECT_INFO.catalogPdfPath}
                download
                className="inline-flex items-center gap-2.5 border border-[#C69C72] bg-[#C69C72] px-6 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#141A18] transition-all duration-300 hover:bg-[#F7F5F0] hover:border-[#F7F5F0]"
              >
                <FileDown className="h-4 w-4" />
                Preuzmi službeni PDF katalog (37 str.)
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 px-5 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#F7F5F0] transition-colors hover:border-[#10B981] hover:text-[#34D399]"
              >
                <MessageCircle className="h-4 w-4 text-[#10B981]" />
                Direktni WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* 3 Direct Buyer Benefits */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {DIRECT_BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                data-direct-reveal
                className="flex items-start gap-4 border border-[#C69C72]/25 bg-[#1D2522] p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#C69C72]/35 bg-[#C69C72]/10 text-[#C69C72]">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-normal text-[#F7F5F0]">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#F7F5F0]/70 sm:text-sm">
                    {benefit.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4-Step Purchase Roadmap */}
        <div className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {BUYING_STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                data-direct-reveal
                className="flex flex-col justify-between bg-[#141A18] p-7 transition-colors hover:bg-[#18201D]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl font-light text-[#C69C72]">
                      {item.step}
                    </span>
                    <Icon
                      className="h-4 w-4 text-[#F7F5F0]/45"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h4 className="mt-6 font-serif text-2xl font-normal text-[#F7F5F0]">
                    {item.title}
                  </h4>
                  <p className="mt-3 text-sm font-light leading-relaxed text-[#F7F5F0]/70">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
