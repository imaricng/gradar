"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  Box,
  Check,
  CheckCircle2,
  Compass,
  Download,
  ExternalLink,
  FileText,
  GitCompareArrows,
  Maximize2,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  Apartment,
  buildWhatsAppUrl,
  formatArea,
  PROJECT_INFO,
  STATUS_CONFIG,
} from "@/data/apartments";

interface ApartmentDrawerProps {
  apartment: Apartment | null;
  onClose: () => void;
  isCompared: boolean;
  canAddCompare: boolean;
  onToggleCompare: (apartment: Apartment) => void;
}

export function ApartmentDrawer({
  apartment,
  onClose,
  isCompared,
  canAddCompare,
  onToggleCompare,
}: ApartmentDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [blueprintTab, setBlueprintTab] = useState<"3d" | "2d">("3d");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Pre-fill smart inquiry message whenever apartment changes
  useEffect(() => {
    if (apartment) {
      setMessage(
        `Zanima me Stan ${apartment.code} (${formatArea(apartment.totalArea)}, ${apartment.floorLabel}). Molim ponudu investitora (0 % provizije) i slobodne termine za razgledavanje.`
      );
      setSubmitted(false);
    }
  }, [apartment]);

  // Manage native modal dialog lifecycle + Lenis pause + Safari closedby fallback
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (apartment) {
      if (!dialog.open) {
        dialog.showModal();
      }
      window.__lenis?.stop();
    } else if (dialog.open) {
      dialog.close();
      window.__lenis?.start();
    }

    const handleClose = () => {
      window.__lenis?.start();
      onClose();
    };

    const handleBackdropClick = (event: MouseEvent) => {
      if ("closedBy" in HTMLDialogElement.prototype) return;
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isInside =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!isInside) {
        dialog.close();
      }
    };

    dialog.addEventListener("close", handleClose);
    dialog.addEventListener("click", handleBackdropClick);

    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("click", handleBackdropClick);
    };
  }, [apartment, onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const statusMeta = apartment ? STATUS_CONFIG[apartment.status] : null;
  const whatsappHref = apartment
    ? buildWhatsAppUrl(
        `Pozdrav Dario, zanima me Stan ${apartment.code} (${formatArea(apartment.totalArea)}, ${apartment.floorLabel}) u projektu Bosut Residence — kupnja direktno od investitora.`
      )
    : "#";

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby="drawer-apartment-title"
      data-lenis-prevent
      className="fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-dvh w-full max-w-[640px] overflow-y-auto border-l border-white/15 bg-[#141A18] p-0 text-[#F7F5F0] shadow-2xl open:flex open:flex-col"
    >
      {apartment && statusMeta && (
        <div className="flex min-h-full flex-col">
          {/* Sticky Drawer Header */}
          <div className="sticky top-0 z-20 flex items-start justify-between gap-4 border-b border-white/10 bg-[#141A18]/95 px-6 py-5 backdrop-blur-xl sm:px-8">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#C69C72]">
                  {apartment.floorLabel} · {apartment.rooms}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] ${statusMeta.bgClass} ${statusMeta.textClass} ${statusMeta.borderClass}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${statusMeta.dotClass}`}
                  />
                  {statusMeta.label}
                </span>
              </div>
              <h2
                id="drawer-apartment-title"
                className="mt-1.5 font-serif text-3xl font-light tracking-wide text-[#F7F5F0] sm:text-4xl"
              >
                Stan {apartment.code}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onToggleCompare(apartment)}
                disabled={!isCompared && !canAddCompare}
                title={
                  isCompared
                    ? "Ukloni iz usporedbe"
                    : canAddCompare
                      ? "Dodaj u usporedbu stanova"
                      : "Maksimalno 3 stana za usporedbu"
                }
                className={`inline-flex items-center gap-1.5 border px-3 py-2 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors ${
                  isCompared
                    ? "border-[#C69C72] bg-[#C69C72] text-[#141A18]"
                    : "border-white/15 bg-white/[0.03] text-[#F7F5F0]/80 hover:border-[#C69C72] hover:text-[#C69C72] disabled:opacity-40"
                }`}
              >
                {isCompared ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    U usporedbi
                  </>
                ) : (
                  <>
                    <GitCompareArrows className="h-3.5 w-3.5" />
                    Usporedi
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Zatvori detalje stana"
                className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/15 bg-white/[0.03] text-[#F7F5F0]/80 transition-colors hover:border-[#C69C72] hover:text-[#C69C72]"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 space-y-7 px-6 py-7 sm:px-8">
            {apartment.highlight && (
              <p className="border-l-2 border-[#C69C72] pl-4 text-sm font-light italic text-[#F7F5F0]/85">
                {apartment.highlight}
              </p>
            )}

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
              <div className="bg-[#1D2522] p-4">
                <div className="text-[10px] uppercase tracking-[0.16em] text-[#F7F5F0]/50">
                  Neto s vanjskim
                </div>
                <div className="mt-1 font-serif text-2xl text-[#C69C72]">
                  {formatArea(apartment.totalArea)}
                </div>
              </div>
              <div className="bg-[#1D2522] p-4">
                <div className="text-[10px] uppercase tracking-[0.16em] text-[#F7F5F0]/50">
                  Zatvoreni dio
                </div>
                <div className="mt-1 font-serif text-2xl text-[#F7F5F0]">
                  {formatArea(apartment.closedArea)}
                </div>
              </div>
              <div className="col-span-2 bg-[#1D2522] p-4 sm:col-span-1">
                <div className="text-[10px] uppercase tracking-[0.16em] text-[#F7F5F0]/50">
                  {apartment.exteriorType}
                </div>
                <div className="mt-1 font-serif text-2xl text-[#F7F5F0]">
                  {formatArea(apartment.exteriorArea)}
                </div>
              </div>
            </div>

            {/* Technical Specs Row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-white/10 py-3.5 text-xs text-[#F7F5F0]/75">
              <div className="inline-flex items-center gap-2">
                <Compass className="h-4 w-4 text-[#C69C72]" strokeWidth={1.5} />
                <span>Orijentacija: {apartment.orientation}</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <Maximize2
                  className="h-4 w-4 text-[#C69C72]"
                  strokeWidth={1.5}
                />
                <span>
                  Strop: {apartment.ceilingHeight} cm (vanjski{" "}
                  {apartment.exteriorCeilingHeight} cm)
                </span>
              </div>
            </div>

            {/* Dual-View Blueprint Viewer: 3D Izometrija vs 2D Official CAD */}
            <div className="border border-white/10 bg-[#18201D] p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#C69C72]">
                  Vizualni tlocrt · Stan {apartment.code}
                </span>

                <div
                  role="tablist"
                  aria-label="Pregled tlocrta stana"
                  className="inline-flex border border-white/15 bg-[#141A18] p-0.5"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={blueprintTab === "3d"}
                    onClick={() => setBlueprintTab("3d")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors ${
                      blueprintTab === "3d"
                        ? "bg-[#C69C72] text-[#141A18]"
                        : "text-[#F7F5F0]/70 hover:text-[#F7F5F0]"
                    }`}
                  >
                    <Box className="h-3.5 w-3.5" />
                    3D Izometrija
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={blueprintTab === "2d"}
                    onClick={() => setBlueprintTab("2d")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors ${
                      blueprintTab === "2d"
                        ? "bg-[#C69C72] text-[#141A18]"
                        : "text-[#F7F5F0]/70 hover:text-[#F7F5F0]"
                    }`}
                  >
                    <FileText className="h-3.5 w-3.5" />
                    2D Službeni nacrt
                  </button>
                </div>
              </div>

              {blueprintTab === "3d" ? (
                <div className="mt-4 overflow-hidden border border-white/10 bg-[#141A18]">
                  <img
                    src={apartment.plan3dImage}
                    alt={`3D izometrijski model stana ${apartment.code}`}
                    className="h-auto w-full object-cover"
                  />
                </div>
              ) : (
                <div className="mt-4 overflow-hidden border border-black/15 bg-white p-3">
                  <img
                    src={apartment.plan2dImage}
                    alt={`Službeni 2D arhitektonski nacrt stana ${apartment.code}`}
                    className="mx-auto max-h-[400px] w-auto object-contain"
                  />
                  <div className="mt-2 flex items-center justify-between border-t border-black/10 pt-2 text-[10px] text-[#141A18]/65">
                    <span>Oznake 1–{apartment.roomBreakdown.length + (apartment.exteriorDetails ? 2 : 1)} odgovaraju tablici ispod</span>
                    <a
                      href={apartment.plan2dImage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-[#8C6843] hover:underline"
                    >
                      Povećaj nacrt
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              )}

              <a
                href={apartment.pdfPath}
                download
                className="mt-4 flex w-full items-center justify-center gap-2 border border-white/15 bg-white/[0.04] px-4 py-3 text-xs font-medium uppercase tracking-[0.16em] text-[#F7F5F0] transition-all duration-300 hover:border-[#C69C72] hover:text-[#C69C72]"
              >
                <Download
                  className="h-4 w-4 text-[#C69C72]"
                  strokeWidth={1.6}
                />
                Preuzmi službeni PDF katalog stana ({apartment.code})
              </a>
            </div>

            {/* Numbered Room Breakdown Table (matching official QUADAR markers) */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-[#C69C72]">
                  Raspored i stvarne kvadrature prostorija
                </h3>
                <span className="text-[11px] text-[#F7F5F0]/50">
                  Bez koeficijenata
                </span>
              </div>

              <div className="mt-4 divide-y divide-white/10 border-y border-white/10">
                {apartment.roomBreakdown.map((room) => (
                  <div
                    key={`${room.num}-${room.name}`}
                    className="flex items-center justify-between py-2.5 text-sm"
                  >
                    <span className="inline-flex items-center gap-3 font-light text-[#F7F5F0]/85">
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#24478F] text-[10px] font-semibold text-white">
                        {room.num}
                      </span>
                      {room.name}
                    </span>
                    <span className="font-medium tabular-nums text-[#F7F5F0]">
                      {formatArea(room.area)}
                    </span>
                  </div>
                ))}

                {apartment.exteriorDetails ? (
                  apartment.exteriorDetails.map((ext, idx) => (
                    <div
                      key={ext.label}
                      className="flex items-center justify-between py-2.5 text-sm"
                    >
                      <span className="inline-flex items-center gap-3 font-light text-[#C69C72]">
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#24478F] text-[10px] font-semibold text-white">
                          {apartment.roomBreakdown.length + idx + 1}
                        </span>
                        {ext.label}
                      </span>
                      <span className="font-medium tabular-nums text-[#C69C72]">
                        {formatArea(ext.area)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-between py-2.5 text-sm">
                    <span className="inline-flex items-center gap-3 font-light text-[#C69C72]">
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#24478F] text-[10px] font-semibold text-white">
                        {apartment.roomBreakdown.length + 1}
                      </span>
                      {apartment.exteriorType}
                    </span>
                    <span className="font-medium tabular-nums text-[#C69C72]">
                      {formatArea(apartment.exteriorArea)}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between bg-white/[0.04] px-2 py-3 text-sm font-medium">
                  <span className="uppercase tracking-[0.14em] text-[#F7F5F0]">
                    Ukupna neto površina
                  </span>
                  <span className="font-serif text-xl text-[#C69C72]">
                    {formatArea(apartment.totalArea)}
                  </span>
                </div>
              </div>
            </div>

            {/* Direct-from-Investor Inquiry Form & WhatsApp/Call CTA */}
            <div className="border border-white/10 bg-[#1D2522] p-5 sm:p-6">
              <div className="inline-flex items-center gap-2 border border-[#10B981]/30 bg-[#10B981]/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#34D399]">
                <ShieldCheck className="h-3.5 w-3.5" />
                0 % agencijske provizije · Direktno od GraDar d.o.o.
              </div>

              <h3 className="mt-3 font-serif text-2xl font-light text-[#F7F5F0]">
                Rezervirajte razgledavanje za Stan {apartment.code}
              </h3>
              <p className="mt-1 text-xs text-[#F7F5F0]/60">
                Izravan kontakt s vlasnikom ({PROJECT_INFO.investor.contactPerson}
                ) — cijena, uvjeti kupnje i obilazak lokacije.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-[#10B981]/50 bg-[#10B981]/15 px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#34D399] transition-all duration-300 hover:bg-[#10B981] hover:text-[#141A18]"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
                  WhatsApp upit ({apartment.code})
                </a>
                <a
                  href={`tel:${PROJECT_INFO.investor.phoneHref}`}
                  className="flex items-center justify-center gap-2 border border-white/15 bg-[#141A18] px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#F7F5F0] transition-colors hover:border-[#C69C72] hover:text-[#C69C72]"
                >
                  <Phone className="h-4 w-4 text-[#C69C72]" strokeWidth={1.6} />
                  {PROJECT_INFO.investor.phoneDisplay}
                </a>
              </div>

              <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#F7F5F0]/40">
                <span className="h-px flex-1 bg-white/10" />
                ili pošaljite upit obrascem
                <span className="h-px flex-1 bg-white/10" />
              </div>

              {submitted ? (
                <div className="border border-[#10B981]/35 bg-[#10B981]/10 p-5 text-center">
                  <CheckCircle2 className="mx-auto h-8 w-8 text-[#10B981]" />
                  <h4 className="mt-3 font-serif text-2xl text-[#F7F5F0]">
                    Upit je zaprimljen
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#F7F5F0]/75">
                    Hvala, {name || "poštovani"}! Dario Maršić (GraDar d.o.o.)
                    javit će vam se u najkraćem roku s detaljima za Stan{" "}
                    {apartment.code}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="drawer-name"
                        className="block text-[11px] uppercase tracking-[0.16em] text-[#F7F5F0]/65"
                      >
                        Ime i prezime *
                      </label>
                      <input
                        id="drawer-name"
                        type="text"
                        required
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ivan Horvat"
                        className="mt-1.5 w-full border border-white/15 bg-[#141A18] px-3.5 py-2.5 text-sm text-[#F7F5F0] placeholder:text-[#F7F5F0]/30 focus:border-[#C69C72] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="drawer-phone"
                        className="block text-[11px] uppercase tracking-[0.16em] text-[#F7F5F0]/65"
                      >
                        Telefon *
                      </label>
                      <input
                        id="drawer-phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+385 98 ..."
                        className="mt-1.5 w-full border border-white/15 bg-[#141A18] px-3.5 py-2.5 text-sm text-[#F7F5F0] placeholder:text-[#F7F5F0]/30 focus:border-[#C69C72] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="drawer-email"
                      className="block text-[11px] uppercase tracking-[0.16em] text-[#F7F5F0]/65"
                    >
                      Email adresa
                    </label>
                    <input
                      id="drawer-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ime@primjer.hr"
                      className="mt-1.5 w-full border border-white/15 bg-[#141A18] px-3.5 py-2.5 text-sm text-[#F7F5F0] placeholder:text-[#F7F5F0]/30 focus:border-[#C69C72] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="drawer-message"
                      className="block text-[11px] uppercase tracking-[0.16em] text-[#F7F5F0]/65"
                    >
                      Poruka
                    </label>
                    <textarea
                      id="drawer-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="mt-1.5 w-full resize-none border border-white/15 bg-[#141A18] px-3.5 py-2.5 text-sm text-[#F7F5F0] focus:border-[#C69C72] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 border border-[#C69C72] bg-[#C69C72] px-5 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-[#141A18] transition-all duration-300 hover:bg-transparent hover:text-[#F7F5F0]"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Pošalji upit investitoru (0 % provizije)
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
