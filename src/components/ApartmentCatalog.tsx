"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  ArrowUpRight,
  Car,
  Check,
  ChevronDown,
  Compass,
  GitCompareArrows,
  LayoutGrid,
  Map as MapIcon,
  Package,
} from "lucide-react";
import {
  Apartment,
  APARTMENTS,
  formatArea,
  PARKING_SUMMARY,
  RoomCount,
  STATUS_CONFIG,
  STORAGE_UNITS,
} from "@/data/apartments";
import { InteractiveFloorPlan } from "./InteractiveFloorPlan";

type FloorFilter = "all" | 0 | 1 | 2 | 3 | 4;
type RoomFilter = "all" | RoomCount;
type ViewMode = "floorplan" | "table";
type SortField = "code" | "floor" | "totalArea" | "closedArea";

interface ApartmentCatalogProps {
  onSelectApartment: (apartment: Apartment) => void;
  compareIds: Set<string>;
  canAddCompare: boolean;
  onToggleCompare: (apartment: Apartment) => void;
}

const FLOOR_OPTIONS: { value: FloorFilter; label: string }[] = [
  { value: "all", label: "Svi katovi" },
  { value: 0, label: "Prizemlje" },
  { value: 1, label: "1. kat" },
  { value: 2, label: "2. kat" },
  { value: 3, label: "3. kat" },
  { value: 4, label: "4. kat" },
];

const ROOM_OPTIONS: { value: RoomFilter; label: string }[] = [
  { value: "all", label: "Svi" },
  { value: "1S", label: "1S" },
  { value: "2S", label: "2S" },
  { value: "3S", label: "3S" },
];

export function ApartmentCatalog({
  onSelectApartment,
  compareIds,
  canAddCompare,
  onToggleCompare,
}: ApartmentCatalogProps) {
  const [floorFilter, setFloorFilter] = useState<FloorFilter>("all");
  const [planFloor, setPlanFloor] = useState<0 | 1 | 2 | 3 | 4>(1);
  const [roomFilter, setRoomFilter] = useState<RoomFilter>("all");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("floorplan");
  const [sortField, setSortField] = useState<SortField>("code");
  const [sortAsc, setSortAsc] = useState(true);
  const [showStoragePanel, setShowStoragePanel] = useState(false);

  const handleFloorChange = (val: FloorFilter) => {
    setFloorFilter(val);
    if (val !== "all") {
      setPlanFloor(val);
    }
  };

  const filteredApartments = useMemo(() => {
    return APARTMENTS.filter((apt) => {
      if (floorFilter !== "all" && apt.floor !== floorFilter) return false;
      if (roomFilter !== "all" && apt.rooms !== roomFilter) return false;
      if (onlyAvailable && apt.status !== "slobodan") return false;
      return true;
    }).sort((a, b) => {
      let diff = 0;
      if (sortField === "code") {
        diff =
          parseInt(a.code.replace("S", ""), 10) -
          parseInt(b.code.replace("S", ""), 10);
      } else if (sortField === "floor") {
        diff = a.floor - b.floor;
      } else if (sortField === "totalArea") {
        diff = a.totalArea - b.totalArea;
      } else if (sortField === "closedArea") {
        diff = a.closedArea - b.closedArea;
      }
      return sortAsc ? diff : -diff;
    });
  }, [floorFilter, roomFilter, onlyAvailable, sortField, sortAsc]);

  const matchingIds = useMemo(
    () => new Set(filteredApartments.map((a) => a.id)),
    [filteredApartments]
  );

  const activePlanFloor: 0 | 1 | 2 | 3 | 4 =
    floorFilter === "all" ? planFloor : floorFilter;

  const apartmentsOnActiveFloor = useMemo(
    () => APARTMENTS.filter((a) => a.floor === activePlanFloor),
    [activePlanFloor]
  );

  const counts = useMemo(() => {
    return {
      slobodan: APARTMENTS.filter((a) => a.status === "slobodan").length,
      rezerviran: APARTMENTS.filter((a) => a.status === "rezerviran").length,
      prodan: APARTMENTS.filter((a) => a.status === "prodan").length,
    };
  }, []);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc((prev) => !prev);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <section
      id="stanovi"
      className="relative bg-[#141A18] py-24 text-[#F7F5F0] lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Section Heading & Live Availability Summary */}
        <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#C69C72]">
              03 · Katalog stanova (S1 – S25)
            </p>
            <h2 className="mt-3 font-serif text-4xl font-light leading-tight text-[#F7F5F0] sm:text-5xl lg:text-6xl">
              Odaberite svoj{" "}
              <span className="italic text-[#C69C72]">novi dom.</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 border border-[#10B981]/30 bg-[#10B981]/10 px-3.5 py-2 text-xs">
              <span className="h-2 w-2 rounded-full bg-[#10B981]" />
              <span className="font-medium text-[#10B981]">
                {counts.slobodan} Slobodnih
              </span>
            </div>
            <div className="flex items-center gap-2 border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-3.5 py-2 text-xs">
              <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />
              <span className="font-medium text-[#F59E0B]">
                {counts.rezerviran} Rezervirana
              </span>
            </div>
            <div className="flex items-center gap-2 border border-[#64748B]/30 bg-[#64748B]/15 px-3.5 py-2 text-xs">
              <span className="h-2 w-2 rounded-full bg-[#64748B]" />
              <span className="font-medium text-[#94A3B8]">
                {counts.prodan} Prodana
              </span>
            </div>
          </div>
        </div>

        {/* Filter & View Switcher Bar */}
        <div className="mt-10 flex flex-col gap-5 border border-white/10 bg-[#1D2522] p-4 sm:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            {/* Floor Filter */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#F7F5F0]/50">
                Kat
              </span>
              <div className="flex flex-wrap gap-1.5">
                {FLOOR_OPTIONS.map((opt) => {
                  const active = floorFilter === opt.value;
                  return (
                    <button
                      key={String(opt.value)}
                      type="button"
                      onClick={() => handleFloorChange(opt.value)}
                      className={`border px-3.5 py-2 text-xs font-medium tracking-wide transition-all duration-200 ${
                        active
                          ? "border-[#C69C72] bg-[#C69C72] text-[#141A18]"
                          : "border-white/10 bg-[#141A18]/60 text-[#F7F5F0]/75 hover:border-white/30 hover:text-[#F7F5F0]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Room Filter */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#F7F5F0]/50">
                Broj soba
              </span>
              <div className="flex flex-wrap gap-1.5">
                {ROOM_OPTIONS.map((opt) => {
                  const active = roomFilter === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setRoomFilter(opt.value)}
                      className={`border px-4 py-2 text-xs font-medium tracking-wide transition-all duration-200 ${
                        active
                          ? "border-[#C69C72] bg-[#C69C72] text-[#141A18]"
                          : "border-white/10 bg-[#141A18]/60 text-[#F7F5F0]/75 hover:border-white/30 hover:text-[#F7F5F0]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Availability Toggle & View Mode Switch */}
            <div className="flex flex-wrap items-end justify-between gap-4 xl:justify-end">
              <label className="inline-flex cursor-pointer select-none items-center gap-3 border border-white/10 bg-[#141A18]/60 px-4 py-2.5 text-xs text-[#F7F5F0]/85">
                <input
                  type="checkbox"
                  checked={onlyAvailable}
                  onChange={(e) => setOnlyAvailable(e.target.checked)}
                  className="h-4 w-4 accent-[#10B981]"
                />
                <span>Samo slobodni</span>
              </label>

              <div
                role="tablist"
                aria-label="Način prikaza stanova"
                className="inline-flex border border-white/15 bg-[#141A18] p-1"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={viewMode === "floorplan"}
                  onClick={() => setViewMode("floorplan")}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-colors ${
                    viewMode === "floorplan"
                      ? "bg-[#C69C72] text-[#141A18]"
                      : "text-[#F7F5F0]/70 hover:text-[#F7F5F0]"
                  }`}
                >
                  <MapIcon className="h-3.5 w-3.5" />
                  Tlocrt kata
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={viewMode === "table"}
                  onClick={() => setViewMode("table")}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-colors ${
                    viewMode === "table"
                      ? "bg-[#C69C72] text-[#141A18]"
                      : "text-[#F7F5F0]/70 hover:text-[#F7F5F0]"
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  Tablica / Grid
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Active View Area */}
        <div className="mt-8">
          {viewMode === "floorplan" ? (
            <div className="space-y-5">
              {floorFilter === "all" && (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-[#F7F5F0]/60">
                    Prikaz tlocrta za etažu:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {([0, 1, 2, 3, 4] as const).map((fl) => (
                      <button
                        key={fl}
                        type="button"
                        onClick={() => setPlanFloor(fl)}
                        className={`border px-3.5 py-1.5 text-xs transition-colors ${
                          activePlanFloor === fl
                            ? "border-[#C69C72] bg-[#C69C72]/15 text-[#C69C72]"
                            : "border-white/10 text-[#F7F5F0]/65 hover:border-white/25 hover:text-[#F7F5F0]"
                        }`}
                      >
                        {fl === 0 ? "Prizemlje (S1)" : `${fl}. kat`}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <InteractiveFloorPlan
                floor={activePlanFloor}
                apartmentsOnFloor={apartmentsOnActiveFloor}
                matchingIds={matchingIds}
                onSelectApartment={onSelectApartment}
              />

              {/* Compact unit cards below plan with quick Compare action */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {apartmentsOnActiveFloor.map((apt) => {
                  const status = STATUS_CONFIG[apt.status];
                  const isMatched = matchingIds.has(apt.id);
                  const isCompared = compareIds.has(apt.id);

                  return (
                    <div
                      key={apt.id}
                      className={`flex flex-col justify-between border p-4 transition-all duration-300 ${
                        isMatched
                          ? "border-white/10 bg-[#1D2522] hover:border-[#C69C72]/60"
                          : "border-white/5 bg-[#1D2522]/35 opacity-45 hover:opacity-85"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => onSelectApartment(apt)}
                        className="group flex w-full items-start justify-between text-left"
                      >
                        <div>
                          <div className="flex items-center gap-2.5">
                            <span className="font-serif text-2xl text-[#F7F5F0] group-hover:text-[#C69C72]">
                              {apt.code}
                            </span>
                            <span className="text-xs text-[#F7F5F0]/55">
                              {apt.rooms} · {apt.orientation}
                            </span>
                          </div>
                          <div className="mt-1 text-xs text-[#F7F5F0]/70">
                            Ukupno{" "}
                            <strong className="font-medium text-[#C69C72]">
                              {formatArea(apt.totalArea)}
                            </strong>{" "}
                            · {apt.exteriorType} {formatArea(apt.exteriorArea)}
                          </div>
                        </div>

                        <span
                          className={`inline-flex items-center gap-1.5 border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] ${status.bgClass} ${status.textClass} ${status.borderClass}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${status.dotClass}`}
                          />
                          {status.label}
                        </span>
                      </button>

                      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                        <button
                          type="button"
                          onClick={() => onToggleCompare(apt)}
                          disabled={!isCompared && !canAddCompare}
                          className={`inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] transition-colors ${
                            isCompared
                              ? "font-medium text-[#C69C72]"
                              : "text-[#F7F5F0]/55 hover:text-[#F7F5F0] disabled:opacity-35"
                          }`}
                        >
                          {isCompared ? (
                            <>
                              <Check className="h-3.5 w-3.5" />U usporedbi
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
                          onClick={() => onSelectApartment(apt)}
                          className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] text-[#C69C72] hover:text-[#F7F5F0]"
                        >
                          2D/3D Tlocrt
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              {/* Count & Sort Bar */}
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#F7F5F0]/60">
                <span>
                  Prikazano{" "}
                  <strong className="font-medium text-[#F7F5F0]">
                    {filteredApartments.length}
                  </strong>{" "}
                  od {APARTMENTS.length} stanova
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  <span>Sortiraj:</span>
                  {(
                    [
                      { key: "code", label: "Šifra" },
                      { key: "floor", label: "Kat" },
                      { key: "totalArea", label: "Ukupno m²" },
                      { key: "closedArea", label: "Zatvoreno m²" },
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => toggleSort(item.key)}
                      className={`inline-flex items-center gap-1 border px-2.5 py-1 text-[11px] transition-colors ${
                        sortField === item.key
                          ? "border-[#C69C72] text-[#C69C72]"
                          : "border-white/10 text-[#F7F5F0]/65 hover:border-white/30"
                      }`}
                    >
                      {item.label}
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  ))}
                </div>
              </div>

              {filteredApartments.length === 0 ? (
                <div className="border border-white/10 bg-[#1D2522] p-12 text-center">
                  <p className="font-serif text-2xl text-[#F7F5F0]">
                    Nema stanova za odabrane filtere.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFloorFilter("all");
                      setRoomFilter("all");
                      setOnlyAvailable(false);
                    }}
                    className="mt-4 border border-[#C69C72] px-5 py-2.5 text-xs uppercase tracking-[0.16em] text-[#C69C72] hover:bg-[#C69C72] hover:text-[#141A18]"
                  >
                    Poništi filtere
                  </button>
                </div>
              ) : (
                <>
                  {/* Desktop Table */}
                  <div className="hidden overflow-x-auto border border-white/10 bg-[#1D2522] md:block">
                    <table className="w-full border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-white/10 bg-[#141A18]/70 text-[11px] uppercase tracking-[0.18em] text-[#F7F5F0]/55">
                          <th className="px-5 py-4 font-medium">Stan</th>
                          <th className="px-5 py-4 font-medium">Kat</th>
                          <th className="px-5 py-4 font-medium">Sobe</th>
                          <th className="px-5 py-4 font-medium">Orijentacija</th>
                          <th className="px-5 py-4 font-medium">Zatvoreno</th>
                          <th className="px-5 py-4 font-medium">
                            Vanjski prostor
                          </th>
                          <th className="px-5 py-4 font-medium">Ukupno</th>
                          <th className="px-5 py-4 font-medium">Status</th>
                          <th className="px-5 py-4 text-right font-medium">
                            Akcije
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {filteredApartments.map((apt) => {
                          const status = STATUS_CONFIG[apt.status];
                          const isCompared = compareIds.has(apt.id);
                          return (
                            <tr
                              key={apt.id}
                              onClick={() => onSelectApartment(apt)}
                              className="group cursor-pointer transition-colors hover:bg-white/[0.03]"
                            >
                              <td className="px-5 py-4 font-serif text-xl font-medium text-[#F7F5F0] group-hover:text-[#C69C72]">
                                {apt.code}
                              </td>
                              <td className="px-5 py-4 text-[#F7F5F0]/80">
                                {apt.floorLabel}
                              </td>
                              <td className="px-5 py-4 text-[#F7F5F0]/80">
                                {apt.rooms}
                              </td>
                              <td className="px-5 py-4 text-[#F7F5F0]/70">
                                {apt.orientation}
                              </td>
                              <td className="px-5 py-4 tabular-nums text-[#F7F5F0]/80">
                                {formatArea(apt.closedArea)}
                              </td>
                              <td className="px-5 py-4 tabular-nums text-[#F7F5F0]/70">
                                {apt.exteriorType} ·{" "}
                                {formatArea(apt.exteriorArea)}
                              </td>
                              <td className="px-5 py-4 font-medium tabular-nums text-[#C69C72]">
                                {formatArea(apt.totalArea)}
                              </td>
                              <td className="px-5 py-4">
                                <span
                                  className={`inline-flex items-center gap-1.5 border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] ${status.bgClass} ${status.textClass} ${status.borderClass}`}
                                >
                                  <span
                                    className={`h-1.5 w-1.5 rounded-full ${status.dotClass}`}
                                  />
                                  {status.label}
                                </span>
                              </td>
                              <td
                                className="px-5 py-4 text-right"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="inline-flex items-center gap-3">
                                  <button
                                    type="button"
                                    onClick={() => onToggleCompare(apt)}
                                    disabled={!isCompared && !canAddCompare}
                                    title="Dodaj u usporedbu"
                                    className={`border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] transition-colors ${
                                      isCompared
                                        ? "border-[#C69C72] bg-[#C69C72] text-[#141A18]"
                                        : "border-white/15 text-[#F7F5F0]/65 hover:border-[#C69C72] hover:text-[#C69C72] disabled:opacity-35"
                                    }`}
                                  >
                                    {isCompared ? "Usporedba ✓" : "Usporedi"}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => onSelectApartment(apt)}
                                    className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.14em] text-[#C69C72] hover:text-[#F7F5F0]"
                                  >
                                    Tlocrt
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card Grid */}
                  <div className="grid gap-3 md:hidden">
                    {filteredApartments.map((apt) => {
                      const status = STATUS_CONFIG[apt.status];
                      return (
                        <button
                          key={apt.id}
                          type="button"
                          onClick={() => onSelectApartment(apt)}
                          className="w-full border border-white/10 bg-[#1D2522] p-5 text-left transition-colors active:border-[#C69C72]"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-[11px] uppercase tracking-[0.18em] text-[#C69C72]">
                                {apt.floorLabel} · {apt.rooms}
                              </span>
                              <div className="mt-0.5 font-serif text-3xl text-[#F7F5F0]">
                                Stan {apt.code}
                              </div>
                            </div>
                            <span
                              className={`inline-flex items-center gap-1.5 border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] ${status.bgClass} ${status.textClass} ${status.borderClass}`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${status.dotClass}`}
                              />
                              {status.label}
                            </span>
                          </div>

                          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-3 text-xs">
                            <div>
                              <div className="text-[#F7F5F0]/50">Ukupno</div>
                              <div className="mt-0.5 font-medium text-[#C69C72]">
                                {formatArea(apt.totalArea)}
                              </div>
                            </div>
                            <div>
                              <div className="text-[#F7F5F0]/50">Zatvoreno</div>
                              <div className="mt-0.5 text-[#F7F5F0]">
                                {formatArea(apt.closedArea)}
                              </div>
                            </div>
                            <div>
                              <div className="text-[#F7F5F0]/50">
                                Orijentacija
                              </div>
                              <div className="mt-0.5 inline-flex items-center gap-1 text-[#F7F5F0]">
                                <Compass className="h-3 w-3 text-[#C69C72]" />
                                {apt.orientation}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Expandable Reference Panel: 25 Parking Spaces (PM1–PM25) & 19 Storage Units */}
        <div className="mt-10 border border-white/10 bg-[#18201D]">
          <button
            type="button"
            onClick={() => setShowStoragePanel((prev) => !prev)}
            aria-expanded={showStoragePanel}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.02]"
          >
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#C69C72]">
                <Car className="h-4 w-4" />
                25 Parkirnih mjesta (PM1–PM25)
              </div>
              <span className="hidden text-white/20 sm:inline">|</span>
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#F7F5F0]/80">
                <Package className="h-4 w-4 text-[#C69C72]" />
                19 Spremišta u prizemlju (1,54 – 3,06 m²)
              </div>
            </div>
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-[#C69C72] transition-transform duration-300 ${
                showStoragePanel ? "rotate-180" : ""
              }`}
            />
          </button>

          {showStoragePanel && (
            <div className="border-t border-white/10 px-6 py-6">
              <div className="grid gap-8 lg:grid-cols-12">
                <div className="space-y-4 lg:col-span-5">
                  <h3 className="font-serif text-2xl font-light text-[#F7F5F0]">
                    Parkiranje u omjeru 1 : 1
                  </h3>
                  <div className="space-y-3">
                    {PARKING_SUMMARY.map((item) => (
                      <div
                        key={item.group}
                        className="border border-white/10 bg-[#141A18] p-4"
                      >
                        <div className="text-xs font-medium uppercase tracking-[0.16em] text-[#C69C72]">
                          {item.group} · {item.type}
                        </div>
                        <p className="mt-1 text-xs text-[#F7F5F0]/70">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <h3 className="font-serif text-2xl font-light text-[#F7F5F0]">
                    Specifikacija 19 spremišta u prizemlju
                  </h3>
                  <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
                    {STORAGE_UNITS.map((unit) => (
                      <div
                        key={unit.num}
                        className="flex items-center justify-between gap-2 border border-white/10 bg-[#141A18] px-3 py-2 text-xs"
                      >
                        <span className="inline-flex shrink-0 items-center gap-1.5 text-[#F7F5F0]/70">
                          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#C69C72]/25 text-[10px] font-semibold text-[#C69C72]">
                            {unit.num}
                          </span>
                          Sprem.
                        </span>
                        <span className="whitespace-nowrap font-medium tabular-nums text-[#F7F5F0]">
                          {formatArea(unit.area)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
