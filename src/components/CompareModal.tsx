"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, MessageCircle, Trash2, X } from "lucide-react";
import {
  Apartment,
  buildWhatsAppUrl,
  formatArea,
  STATUS_CONFIG,
} from "@/data/apartments";

interface CompareModalProps {
  apartments: Apartment[];
  isOpen: boolean;
  onClose: () => void;
  onSelectApartment: (apartment: Apartment) => void;
  onRemoveApartment: (id: string) => void;
}

export function CompareModal({
  apartments,
  isOpen,
  onClose,
  onSelectApartment,
  onRemoveApartment,
}: CompareModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && apartments.length > 0) {
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
  }, [isOpen, apartments.length, onClose]);

  const compareSummary = apartments
    .map((a) => `${a.code} (${formatArea(a.totalArea)}, ${a.floorLabel})`)
    .join(", ");

  const whatsappHref = buildWhatsAppUrl(
    `Pozdrav Dario, uspoređujem stanove ${compareSummary} u projektu Bosut Residence. Volio/la bih više informacija i termin razgledavanja.`
  );

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby="compare-modal-title"
      data-lenis-prevent
      className="m-auto w-[min(1080px,94vw)] max-h-[90dvh] overflow-y-auto border border-white/15 bg-[#141A18] p-0 text-[#F7F5F0] shadow-2xl"
    >
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#141A18]/95 px-6 py-5 backdrop-blur-xl sm:px-8">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#C69C72]">
            Usporedba odabranih stanova
          </span>
          <h2
            id="compare-modal-title"
            className="mt-1 font-serif text-3xl font-light text-[#F7F5F0]"
          >
            Bočna usporedba ({apartments.length}/3)
          </h2>
        </div>

        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Zatvori usporedbu stanova"
          className="flex h-10 w-10 items-center justify-center border border-white/15 bg-white/[0.03] text-[#F7F5F0]/80 hover:border-[#C69C72] hover:text-[#C69C72]"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6 sm:p-8">
        <div
          className={`grid gap-6 ${
            apartments.length === 1
              ? "grid-cols-1 max-w-md mx-auto"
              : apartments.length === 2
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-3"
          }`}
        >
          {apartments.map((apt) => {
            const status = STATUS_CONFIG[apt.status];
            return (
              <div
                key={apt.id}
                className="flex flex-col justify-between border border-white/10 bg-[#1D2522] p-5"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#C69C72]">
                        {apt.floorLabel} · {apt.rooms}
                      </span>
                      <h3 className="mt-0.5 font-serif text-3xl text-[#F7F5F0]">
                        Stan {apt.code}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveApartment(apt.id)}
                      aria-label={`Ukloni Stan ${apt.code} iz usporedbe`}
                      className="p-1.5 text-[#F7F5F0]/45 transition-colors hover:text-[#F59E0B]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* 3D Plan Thumbnail */}
                  <div className="mt-4 overflow-hidden border border-white/10 bg-[#141A18]">
                    <img
                      src={apt.plan3dImage}
                      alt={`3D izometrija stana ${apt.code}`}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>

                  <div className="mt-5 divide-y divide-white/10 text-xs">
                    <div className="flex justify-between py-2.5">
                      <span className="text-[#F7F5F0]/55">Status</span>
                      <span className={`font-medium ${status.textClass}`}>
                        {status.label}
                      </span>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <span className="text-[#F7F5F0]/55">Ukupna površina</span>
                      <span className="font-medium text-[#C69C72]">
                        {formatArea(apt.totalArea)}
                      </span>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <span className="text-[#F7F5F0]/55">Zatvoreni dio</span>
                      <span className="text-[#F7F5F0]">
                        {formatArea(apt.closedArea)}
                      </span>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <span className="text-[#F7F5F0]/55">{apt.exteriorType}</span>
                      <span className="text-[#F7F5F0]">
                        {formatArea(apt.exteriorArea)}
                      </span>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <span className="text-[#F7F5F0]/55">Orijentacija</span>
                      <span className="text-[#F7F5F0]">{apt.orientation}</span>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <span className="text-[#F7F5F0]/55">Visina stropa</span>
                      <span className="text-[#F7F5F0]">
                        {apt.ceilingHeight} cm
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    dialogRef.current?.close();
                    onSelectApartment(apt);
                  }}
                  className="mt-5 flex w-full items-center justify-center gap-2 border border-[#C69C72] bg-[#C69C72]/15 py-3 text-xs font-medium uppercase tracking-[0.16em] text-[#C69C72] transition-colors hover:bg-[#C69C72] hover:text-[#141A18]"
                >
                  Otvori detalje i tlocrt
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-xs text-[#F7F5F0]/65">
            Želite usporedno razgledavanje ovih stanova s investitorom GraDar
            d.o.o.?
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#10B981]/50 bg-[#10B981]/15 px-5 py-3 text-xs font-medium uppercase tracking-[0.16em] text-[#34D399] transition-colors hover:bg-[#10B981] hover:text-[#141A18]"
          >
            <MessageCircle className="h-4 w-4" />
            Pošalji upit za usporedbu na WhatsApp
          </a>
        </div>
      </div>
    </dialog>
  );
}
