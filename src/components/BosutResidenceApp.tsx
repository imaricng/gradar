"use client";

import { useMemo, useState } from "react";
import { GitCompareArrows, X } from "lucide-react";
import { Apartment, APARTMENTS } from "@/data/apartments";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { VisionSection } from "./VisionSection";
import { ApartmentCatalog } from "./ApartmentCatalog";
import { ApartmentDrawer } from "./ApartmentDrawer";
import { CompareModal } from "./CompareModal";
import { LocationSection } from "./LocationSection";
import { DirectPurchaseSection } from "./DirectPurchaseSection";
import { BrandProjectsSection } from "./BrandProjectsSection";
import { ContactFooter } from "./ContactFooter";

export function BosutResidenceApp() {
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(
    null
  );
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  const villaApartment = APARTMENTS[0];
  const compareIdSet = useMemo(() => new Set(compareIds), [compareIds]);
  const comparedApartments = useMemo(
    () =>
      compareIds
        .map((id) => APARTMENTS.find((a) => a.id === id))
        .filter((a): a is Apartment => Boolean(a)),
    [compareIds]
  );

  const handleToggleCompare = (apartment: Apartment) => {
    setCompareIds((prev) => {
      if (prev.includes(apartment.id)) {
        return prev.filter((id) => id !== apartment.id);
      }
      if (prev.length >= 3) return prev;
      return [...prev, apartment.id];
    });
  };

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <VisionSection
          villaApartment={villaApartment}
          onSelectApartment={setSelectedApartment}
        />
        <ApartmentCatalog
          onSelectApartment={setSelectedApartment}
          compareIds={compareIdSet}
          canAddCompare={compareIds.length < 3}
          onToggleCompare={handleToggleCompare}
        />
        <LocationSection />
        <DirectPurchaseSection />
        <BrandProjectsSection />
      </main>
      <ContactFooter />

      <ApartmentDrawer
        apartment={selectedApartment}
        onClose={() => setSelectedApartment(null)}
        isCompared={
          selectedApartment ? compareIdSet.has(selectedApartment.id) : false
        }
        canAddCompare={compareIds.length < 3}
        onToggleCompare={handleToggleCompare}
      />

      <CompareModal
        apartments={comparedApartments}
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        onSelectApartment={setSelectedApartment}
        onRemoveApartment={(id) =>
          setCompareIds((prev) => prev.filter((item) => item !== id))
        }
      />

      {/* Floating Comparison Bar when 1–3 units are shortlisted */}
      {comparedApartments.length > 0 && (
        <div className="fixed inset-x-0 bottom-5 z-30 mx-auto w-[min(680px,94vw)] border border-[#C69C72]/50 bg-[#141A18]/95 px-4 py-3 shadow-2xl backdrop-blur-xl sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#C69C72]">
                Usporedba ({comparedApartments.length}/3):
              </span>
              {comparedApartments.map((apt) => (
                <span
                  key={apt.id}
                  className="inline-flex items-center gap-1.5 border border-white/15 bg-[#1D2522] px-2.5 py-1 text-xs text-[#F7F5F0]"
                >
                  {apt.code}
                  <button
                    type="button"
                    onClick={() => handleToggleCompare(apt)}
                    aria-label={`Ukloni ${apt.code}`}
                    className="text-[#F7F5F0]/50 hover:text-[#F59E0B]"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCompareIds([])}
                className="px-2.5 py-1.5 text-[11px] uppercase tracking-[0.14em] text-[#F7F5F0]/60 hover:text-[#F7F5F0]"
              >
                Očisti
              </button>
              <button
                type="button"
                onClick={() => setCompareModalOpen(true)}
                className="inline-flex items-center gap-2 border border-[#C69C72] bg-[#C69C72] px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-[#141A18] transition-colors hover:bg-[#F7F5F0] hover:border-[#F7F5F0]"
              >
                <GitCompareArrows className="h-3.5 w-3.5" />
                Usporedi stanove
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
