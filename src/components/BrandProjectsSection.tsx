"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Award, Building, CalendarClock } from "lucide-react";
import { GRADAR_PROJECTS } from "@/data/apartments";

gsap.registerPlugin(ScrollTrigger);

export function BrandProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-brand-reveal]", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
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

  return (
    <section
      id="o-nama"
      ref={sectionRef}
      className="bg-[#F7F5F0] py-24 text-[#141A18] lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Investor Brand Story */}
        <div
          data-brand-reveal
          className="grid gap-10 border-b border-black/10 pb-16 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#8C6843]">
              06 · Investitor · GraDar d.o.o.
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-[#141A18] sm:text-5xl lg:text-6xl">
              Gradimo prostore koji{" "}
              <span className="italic text-[#8C6843]">traju generacijama.</span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm font-light leading-relaxed text-[#141A18]/75 sm:text-base">
              <strong className="font-medium text-[#141A18]">
                GraDar d.o.o.
              </strong>{" "}
              iz Vinkovaca investitor je posvećen suvremenoj, kvalitetnoj i
              transparentnoj stanogradnji. Svaki naš projekt oslanja se na
              odabrane mikrolokacije, suradnju s provjerenim arhitektonskim
              uredima i izravan odnos s kupcem — od prvog tlocrta do predaje
              ključeva.
            </p>
          </div>
        </div>

        {/* Three Investor Trust Pillars */}
        <div
          data-brand-reveal
          className="grid gap-6 border-b border-black/10 py-10 sm:grid-cols-3"
        >
          <div className="flex items-start gap-4">
            <Award
              className="mt-1 h-5 w-5 shrink-0 text-[#C69C72]"
              strokeWidth={1.5}
            />
            <div>
              <h3 className="font-serif text-xl font-medium text-[#141A18]">
                Izravna kupnja od investitora
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[#141A18]/65">
                Transparentna dokumentacija, jasni rokovi i komunikacija bez
                posredničkih provizija.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Building
              className="mt-1 h-5 w-5 shrink-0 text-[#C69C72]"
              strokeWidth={1.5}
            />
            <div>
              <h3 className="font-serif text-xl font-medium text-[#141A18]">
                Arhitektonski potpis
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[#141A18]/65">
                U suradnji s projektantima QUADAR Design d.o.o. iz Osijeka
                stvaramo funkcionalne tlocrte bez izgubljenih kvadrata.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <CalendarClock
              className="mt-1 h-5 w-5 shrink-0 text-[#C69C72]"
              strokeWidth={1.5}
            />
            <div>
              <h3 className="font-serif text-xl font-medium text-[#141A18]">
                Dugoročna vrijednost
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[#141A18]/65">
                Prvi red uz rijeku, osiguran parking 1:1 i visoki energetski
                standard čuvaju vrijednost vaše investicije.
              </p>
            </div>
          </div>
        </div>

        {/* Scalable "Naši projekti" Grid */}
        <div className="mt-16">
          <div
            data-brand-reveal
            className="mb-8 flex items-end justify-between gap-4"
          >
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#8C6843]">
                Portfolio razvoja
              </p>
              <h3 className="mt-1 font-serif text-3xl font-light text-[#141A18] sm:text-4xl">
                Naši projekti
              </h3>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {GRADAR_PROJECTS.map((project) => {
              const isActive = project.statusTone === "active";
              return (
                <article
                  key={project.id}
                  data-brand-reveal
                  className={`flex flex-col justify-between border p-8 sm:p-10 transition-colors duration-300 ${
                    isActive
                      ? "border-[#141A18] bg-[#141A18] text-[#F7F5F0]"
                      : "border-black/15 bg-white text-[#141A18] hover:border-[#C69C72]"
                  }`}
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span
                        className={`inline-flex items-center gap-2 border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] ${
                          isActive
                            ? "border-[#10B981]/40 bg-[#10B981]/12 text-[#34D399]"
                            : "border-[#C69C72]/50 bg-[#C69C72]/12 text-[#8C6843]"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isActive ? "bg-[#10B981]" : "bg-[#C69C72]"
                          }`}
                        />
                        {project.status}
                      </span>
                      <span
                        className={`text-xs tracking-widest ${
                          isActive ? "text-[#F7F5F0]/55" : "text-[#141A18]/50"
                        }`}
                      >
                        {project.year}
                      </span>
                    </div>

                    <h4 className="mt-7 font-serif text-3xl font-light sm:text-4xl">
                      {project.name}
                    </h4>
                    <p
                      className={`mt-1.5 text-xs uppercase tracking-[0.16em] ${
                        isActive ? "text-[#C69C72]" : "text-[#8C6843]"
                      }`}
                    >
                      {project.location}
                    </p>

                    <p
                      className={`mt-5 text-sm font-light leading-relaxed ${
                        isActive ? "text-[#F7F5F0]/75" : "text-[#141A18]/72"
                      }`}
                    >
                      {project.summary}
                    </p>
                  </div>

                  <div
                    className={`mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6 ${
                      isActive ? "border-white/10" : "border-black/10"
                    }`}
                  >
                    <span
                      className={`text-xs ${
                        isActive ? "text-[#F7F5F0]/55" : "text-[#141A18]/60"
                      }`}
                    >
                      {project.units}
                    </span>
                    <a
                      href={project.ctaHref}
                      className={`group inline-flex items-center gap-2 border px-5 py-2.5 text-xs font-medium uppercase tracking-[0.16em] transition-all duration-300 ${
                        isActive
                          ? "border-[#C69C72] bg-[#C69C72] text-[#141A18] hover:bg-transparent hover:text-[#F7F5F0]"
                          : "border-[#141A18] bg-transparent text-[#141A18] hover:bg-[#141A18] hover:text-[#F7F5F0]"
                      }`}
                    >
                      {project.ctaLabel}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
