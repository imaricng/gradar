"use client";

import { useEffect, useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { buildWhatsAppUrl } from "@/data/apartments";
import { GradarLogo } from "./GradarLogo";

const NAV_LINKS = [
  { label: "Projekt", href: "#projekt" },
  { label: "Stanovi", href: "#stanovi" },
  { label: "Kvaliteta", href: "#kvaliteta" },
  { label: "Lokacija", href: "#lokacija" },
  { label: "Direktna kupnja", href: "#direktna-kupnja" },
  { label: "O nama", href: "#o-nama" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappHref = buildWhatsAppUrl(
    "Pozdrav Dario, zanima me projekt Bosut Residence (GraDar d.o.o.). Volio/la bih dogovoriti razgledavanje."
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-[#141A18]/88 py-3 backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-[#141A18]/80 to-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a
          href="#top"
          className="group focus:outline-none"
          aria-label="GraDar — Bosut Residence, povratak na vrh"
        >
          <GradarLogo variant="dark" subtitle="Bosut Residence" />
        </a>

        {/* Desktop navigation */}
        <nav
          aria-label="Glavna navigacija"
          className="hidden items-center gap-7 xl:flex"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 text-[12px] font-normal tracking-[0.12em] uppercase text-[#F7F5F0]/80 transition-colors hover:text-[#F7F5F0] after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#C69C72] after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Brzi WhatsApp upit"
            title="Pošalji WhatsApp poruku"
            className="flex h-10 w-10 items-center justify-center border border-white/15 bg-white/[0.03] text-[#F7F5F0]/85 transition-all duration-300 hover:border-[#10B981]/60 hover:bg-[#10B981]/15 hover:text-[#10B981]"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.6} />
          </a>
          <a
            href="#kontakt"
            className="border border-[#C69C72] bg-[#C69C72] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-[#141A18] transition-all duration-300 hover:bg-transparent hover:text-[#F7F5F0]"
          >
            Zakaži razgledavanje
          </a>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Brzi WhatsApp upit"
            className="flex h-10 w-10 items-center justify-center border border-white/15 bg-white/[0.04] text-[#F7F5F0]"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.6} />
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Zatvori izbornik" : "Otvori izbornik"}
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center border border-white/15 bg-white/[0.04] text-[#F7F5F0]"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#141A18]/98 px-5 pb-8 pt-6 backdrop-blur-2xl lg:hidden">
          <nav aria-label="Mobilna navigacija" className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-white/10 py-3.5 font-serif text-2xl font-light tracking-wide text-[#F7F5F0] transition-colors hover:text-[#C69C72]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href="#kontakt"
              onClick={() => setMobileOpen(false)}
              className="w-full border border-[#C69C72] bg-[#C69C72] py-3.5 text-center text-xs font-medium uppercase tracking-[0.18em] text-[#141A18]"
            >
              Zakaži razgledavanje
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 border border-white/15 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#F7F5F0]"
            >
              <MessageCircle className="h-4 w-4 text-[#10B981]" />
              WhatsApp: +385 98 901 9050
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
