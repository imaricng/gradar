"use client";

import { useState } from "react";
import { Box, Compass, FileText, Layers } from "lucide-react";
import { Apartment, formatArea, STATUS_CONFIG } from "@/data/apartments";

interface InteractiveFloorPlanProps {
  floor: 0 | 1 | 2 | 3 | 4;
  apartmentsOnFloor: Apartment[];
  matchingIds: Set<string>;
  onSelectApartment: (apartment: Apartment) => void;
}

interface TooltipState {
  apartment: Apartment;
  x: number;
  y: number;
}

type PlanViewType = "2d" | "3d";

/**
 * Calibrated polygon coordinates in 1000x1000 normalized space
 * matched 1:1 to the extracted QUADAR Design CAD drawings:
 * - floor-prizemlje.png (crop 0.075, 0.080, 0.615, 0.908)
 * - floor-kat.png       (crop 0.075, 0.080, 0.615, 0.868)
 */
const TYPICAL_CAD_SLOTS: Record<
  "A" | "B" | "C" | "D" | "E" | "F",
  {
    points: string;
    labelX: number;
    labelY: number;
  }
> = {
  A: {
    points: "810,199 968,156 968,678 656,678 656,593 713,593 713,540 810,540",
    labelX: 885,
    labelY: 445,
  },
  B: {
    points: "541,271 810,199 810,546 604,546 604,473 541,473",
    labelX: 695,
    labelY: 420,
  },
  C: {
    points: "84,394 541,271 541,473 604,473 604,546 128,546",
    labelX: 375,
    labelY: 445,
  },
  D: {
    points: "128,546 434,546 434,599 469,599 469,732 182,732",
    labelX: 325,
    labelY: 640,
  },
  E: {
    points: "182,732 469,732 469,970 248,970",
    labelX: 335,
    labelY: 855,
  },
  F: {
    points: "517,672 628,672 628,792 680,792 680,970 469,970 469,762 517,762",
    labelX: 555,
    labelY: 815,
  },
};

const PRIZEMLJE_S1_SLOT = {
  points: "24,240 520,108 517,569 469,569 469,750 190,750",
  labelX: 280,
  labelY: 480,
};

export function InteractiveFloorPlan({
  floor,
  apartmentsOnFloor,
  matchingIds,
  onSelectApartment,
}: InteractiveFloorPlanProps) {
  const [planView, setPlanView] = useState<PlanViewType>("2d");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const handleMouseMove = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    apartment: Apartment
  ) => {
    const container = e.currentTarget.closest("[data-plan-container]");
    if (!container) return;
    const rect = container.getBoundingClientRect();
    setTooltip({
      apartment,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const getOverlayStyles = (
    apartment: Apartment,
    isHovered: boolean,
    isMatched: boolean
  ) => {
    if (!isMatched) {
      return {
        fill: "rgba(20, 26, 24, 0.24)",
        stroke: "rgba(100, 116, 139, 0.25)",
        badgeBg: "#1D2522",
        badgeText: "#94A3B8",
      };
    }

    if (apartment.status === "slobodan") {
      return {
        fill: isHovered
          ? "rgba(16, 185, 129, 0.30)"
          : "rgba(16, 185, 129, 0.12)",
        stroke: isHovered ? "#059669" : "rgba(16, 185, 129, 0.72)",
        badgeBg: "#059669",
        badgeText: "#FFFFFF",
      };
    }

    if (apartment.status === "rezerviran") {
      return {
        fill: isHovered
          ? "rgba(245, 158, 11, 0.32)"
          : "rgba(245, 158, 11, 0.14)",
        stroke: isHovered ? "#D97706" : "rgba(245, 158, 11, 0.75)",
        badgeBg: "#D97706",
        badgeText: "#FFFFFF",
      };
    }

    return {
      fill: isHovered
        ? "rgba(100, 116, 139, 0.36)"
        : "rgba(100, 116, 139, 0.20)",
      stroke: isHovered ? "#475569" : "rgba(100, 116, 139, 0.65)",
      badgeBg: "#475569",
      badgeText: "#F8FAFC",
    };
  };

  const plan2dSrc =
    floor === 0 ? "/plans/floor-prizemlje.png" : "/plans/floor-kat.png";
  const plan3dSrc =
    floor === 0 ? "/media/plan-3d-prizemlje.jpg" : "/media/plan-3d-kat.jpg";

  return (
    <div
      data-plan-container
      className="relative overflow-hidden border border-white/10 bg-[#18201D] p-4 sm:p-6 lg:p-8"
      onMouseLeave={() => {
        setHoveredId(null);
        setTooltip(null);
      }}
    >
      {/* Top Architectural Header + 2D/3D Switcher */}
      <div className="mb-5 flex flex-col justify-between gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-center">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#C69C72]">
            {floor === 0
              ? "Prizemlje · Urbana vila S1, 19 spremišta i 25 PM"
              : `${floor}. kat · Službeni tlocrt kata (6 stanova)`}
          </div>
          <p className="mt-1 text-xs text-[#F7F5F0]/65">
            {planView === "2d"
              ? "Kliknite izravno na bilo koji stan na službenom QUADAR CAD tlocrtu za sobe, 3D model i PDF."
              : "Fotorealistična 3D izometrija kata izrađena prema projektu. Odaberite stan ispod za detalje."}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#F7F5F0]/65">
            <Compass className="h-4 w-4 text-[#C69C72]" strokeWidth={1.5} />
            <span>SI ↑ Bosut i grad Vinkovci</span>
          </div>

          <div
            role="tablist"
            aria-label="Vrsta prikaza tlocrta kata"
            className="inline-flex border border-white/15 bg-[#141A18] p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={planView === "2d"}
              onClick={() => setPlanView("2d")}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors ${
                planView === "2d"
                  ? "bg-[#C69C72] text-[#141A18]"
                  : "text-[#F7F5F0]/70 hover:text-[#F7F5F0]"
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              2D Projektni tlocrt
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={planView === "3d"}
              onClick={() => setPlanView("3d")}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors ${
                planView === "3d"
                  ? "bg-[#C69C72] text-[#141A18]"
                  : "text-[#F7F5F0]/70 hover:text-[#F7F5F0]"
              }`}
            >
              <Box className="h-3.5 w-3.5" />
              3D Izometrija kata
            </button>
          </div>
        </div>
      </div>

      {/* Main Plan Viewport */}
      {planView === "2d" ? (
        <div className="relative mx-auto w-full max-w-[820px] overflow-hidden border border-[#C69C72]/35 bg-white shadow-2xl">
          {/* Top River Orientation Ribbon */}
          <div className="flex items-center justify-between border-b border-black/10 bg-[#F7F5F0] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#141A18]">
            <span>Rijeka Bosut &amp; Grad Vinkovci (Sjeveroistok) ↑</span>
            <span className="text-[#8C6843]">QUADAR Design d.o.o. CAD</span>
          </div>

          {/* Official CAD Drawing + Exact Calibrated Interactive SVG Overlay */}
          <div className="relative w-full">
            <img
              src={plan2dSrc}
              alt={
                floor === 0
                  ? "Službeni 2D projektni tlocrt prizemlja — Bosut Residence"
                  : `Službeni 2D projektni tlocrt ${floor}. kata — Bosut Residence`
              }
              className="block h-auto w-full select-none"
            />

            <svg
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
              role="img"
              aria-label={`Interaktivni sloj stanova za ${
                floor === 0 ? "prizemlje" : `${floor}. kat`
              }`}
              className="absolute inset-0 h-full w-full select-none"
            >
              {floor === 0 ? (
                <>
                  {apartmentsOnFloor.map((apt) => {
                    const isHovered = hoveredId === apt.id;
                    const isMatched = matchingIds.has(apt.id);
                    const style = getOverlayStyles(apt, isHovered, isMatched);

                    return (
                      <g
                        key={apt.id}
                        role="button"
                        tabIndex={0}
                        aria-label={`Stan ${apt.code}, ${formatArea(
                          apt.totalArea
                        )}, ${STATUS_CONFIG[apt.status].label}`}
                        className="cursor-pointer focus:outline-none"
                        onClick={() => onSelectApartment(apt)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onSelectApartment(apt);
                          }
                        }}
                        onMouseEnter={(e) => {
                          setHoveredId(apt.id);
                          handleMouseMove(e, apt);
                        }}
                        onMouseMove={(e) => handleMouseMove(e, apt)}
                        onMouseLeave={() => {
                          setHoveredId(null);
                          setTooltip(null);
                        }}
                      >
                        <polygon
                          points={PRIZEMLJE_S1_SLOT.points}
                          fill={style.fill}
                          stroke={style.stroke}
                          strokeWidth={isHovered ? 4 : 2.2}
                          className="transition-all duration-200"
                        />

                        {/* Status pill floating cleanly inside S1 */}
                        <g
                          transform={`translate(${PRIZEMLJE_S1_SLOT.labelX}, ${PRIZEMLJE_S1_SLOT.labelY})`}
                        >
                          <rect
                            x="-126"
                            y="-28"
                            width="252"
                            height="56"
                            rx="4"
                            fill="#141A18"
                            fillOpacity="0.94"
                            stroke={style.stroke}
                            strokeWidth="2"
                          />
                          <text
                            x="0"
                            y="-5"
                            textAnchor="middle"
                            fill="#F7F5F0"
                            fontSize="17"
                            fontWeight="600"
                            letterSpacing="0.8"
                          >
                            STAN S1 · {formatArea(apt.totalArea)}
                          </text>
                          <text
                            x="0"
                            y="16"
                            textAnchor="middle"
                            fill={STATUS_CONFIG[apt.status].color}
                            fontSize="11.5"
                            fontWeight="600"
                            letterSpacing="1.3"
                          >
                            {STATUS_CONFIG[apt.status].label.toUpperCase()} · VRT
                            128,44 m²
                          </text>
                        </g>
                      </g>
                    );
                  })}

                  {/* Non-blocking contextual badges for storage & parking */}
                  <g className="pointer-events-none">
                    <rect
                      x="255"
                      y="842"
                      width="206"
                      height="32"
                      rx="3"
                      fill="#141A18"
                      fillOpacity="0.88"
                    />
                    <text
                      x="358"
                      y="863"
                      textAnchor="middle"
                      fill="#C69C72"
                      fontSize="13"
                      fontWeight="600"
                      letterSpacing="1"
                    >
                      19 SPREMIŠTA (1,54–3,06 m²)
                    </text>

                    <rect
                      x="635"
                      y="502"
                      width="222"
                      height="32"
                      rx="3"
                      fill="#141A18"
                      fillOpacity="0.88"
                    />
                    <text
                      x="746"
                      y="523"
                      textAnchor="middle"
                      fill="#F7F5F0"
                      fontSize="13"
                      fontWeight="600"
                      letterSpacing="1"
                    >
                      25 PARKIRNIH MJESTA (1:1)
                    </text>
                  </g>
                </>
              ) : (
                apartmentsOnFloor.map((apt) => {
                  if (apt.planSlot === "villa") return null;
                  const slot = TYPICAL_CAD_SLOTS[apt.planSlot];
                  const isHovered = hoveredId === apt.id;
                  const isMatched = matchingIds.has(apt.id);
                  const style = getOverlayStyles(apt, isHovered, isMatched);

                  return (
                    <g
                      key={apt.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`Stan ${apt.code}, ${apt.rooms}, ${formatArea(
                        apt.totalArea
                      )}, ${STATUS_CONFIG[apt.status].label}`}
                      className="cursor-pointer focus:outline-none"
                      onClick={() => onSelectApartment(apt)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onSelectApartment(apt);
                        }
                      }}
                      onMouseEnter={(e) => {
                        setHoveredId(apt.id);
                        handleMouseMove(e, apt);
                      }}
                      onMouseMove={(e) => handleMouseMove(e, apt)}
                      onMouseLeave={() => {
                        setHoveredId(null);
                        setTooltip(null);
                      }}
                    >
                      <polygon
                        points={slot.points}
                        fill={style.fill}
                        stroke={style.stroke}
                        strokeWidth={isHovered ? 4 : 2}
                        className="transition-all duration-200"
                      />

                      {/* Clean readable pill badge positioned inside the apartment */}
                      <g transform={`translate(${slot.labelX}, ${slot.labelY})`}>
                        <rect
                          x="-58"
                          y="-24"
                          width="116"
                          height="48"
                          rx="4"
                          fill="#141A18"
                          fillOpacity={isMatched ? "0.92" : "0.45"}
                          stroke={style.stroke}
                          strokeWidth="1.8"
                        />
                        <text
                          x="0"
                          y="-3"
                          textAnchor="middle"
                          fill="#F7F5F0"
                          fontSize="18"
                          fontWeight="600"
                          letterSpacing="0.8"
                        >
                          {apt.code} · {apt.rooms}
                        </text>
                        <text
                          x="0"
                          y="15"
                          textAnchor="middle"
                          fill={
                            isMatched
                              ? STATUS_CONFIG[apt.status].color
                              : "#94A3B8"
                          }
                          fontSize="12"
                          fontWeight="600"
                        >
                          {formatArea(apt.totalArea)}
                        </text>
                      </g>
                    </g>
                  );
                })
              )}
            </svg>
          </div>
        </div>
      ) : (
        /* 3D ISOMETRIC MODEL VIEW */
        <div className="relative mx-auto w-full max-w-[960px] overflow-hidden border border-white/10 bg-[#141A18]">
          <div className="relative aspect-[16/9] w-full">
            <img
              src={plan3dSrc}
              alt={
                floor === 0
                  ? "3D izometrijski model prizemlja — Bosut Residence"
                  : `3D izometrijski model ${floor}. kata — Bosut Residence`
              }
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#141A18] via-[#141A18]/70 to-transparent" />

            <div className="absolute left-4 top-4 inline-flex items-center gap-2 border border-white/15 bg-[#141A18]/85 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#C69C72] backdrop-blur-md">
              <Layers className="h-3.5 w-3.5" />
              3D Izometrija · {floor === 0 ? "Prizemlje" : `${floor}. kat`}
            </div>

            {/* Interactive Apartment Selection Strip over 3D View */}
            <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-center gap-2">
              {apartmentsOnFloor.map((apt) => {
                const status = STATUS_CONFIG[apt.status];
                return (
                  <button
                    key={apt.id}
                    type="button"
                    onClick={() => onSelectApartment(apt)}
                    className="inline-flex items-center gap-2 border border-white/20 bg-[#141A18]/90 px-3.5 py-2 text-xs text-[#F7F5F0] backdrop-blur-md transition-all hover:border-[#C69C72] hover:text-[#C69C72]"
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${status.dotClass}`}
                    />
                    <span className="font-serif text-base font-medium">
                      {apt.code}
                    </span>
                    <span className="text-[11px] text-[#F7F5F0]/65">
                      {formatArea(apt.totalArea)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Floating Tooltip on Hover */}
      {tooltip && planView === "2d" && (
        <div
          style={{
            left: Math.min(tooltip.x + 18, 560),
            top: Math.max(tooltip.y - 16, 16),
          }}
          className="pointer-events-none absolute z-30 hidden w-64 border border-[#C69C72]/40 bg-[#141A18]/96 p-4 shadow-2xl backdrop-blur-xl sm:block"
        >
          <div className="flex items-center justify-between">
            <span className="font-serif text-2xl font-medium text-[#F7F5F0]">
              Stan {tooltip.apartment.code}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] ${
                STATUS_CONFIG[tooltip.apartment.status].bgClass
              } ${STATUS_CONFIG[tooltip.apartment.status].textClass} ${
                STATUS_CONFIG[tooltip.apartment.status].borderClass
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  STATUS_CONFIG[tooltip.apartment.status].dotClass
                }`}
              />
              {STATUS_CONFIG[tooltip.apartment.status].label}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-y-2 border-t border-white/10 pt-3 text-xs">
            <span className="text-[#F7F5F0]/55">Ukupna površina</span>
            <span className="text-right font-medium text-[#C69C72]">
              {formatArea(tooltip.apartment.totalArea)}
            </span>
            <span className="text-[#F7F5F0]/55">Zatvoreno</span>
            <span className="text-right text-[#F7F5F0]">
              {formatArea(tooltip.apartment.closedArea)}
            </span>
            <span className="text-[#F7F5F0]/55">Tip / Orijentacija</span>
            <span className="text-right text-[#F7F5F0]">
              {tooltip.apartment.rooms} · {tooltip.apartment.orientation}
            </span>
          </div>

          <div className="mt-3 border-t border-white/10 pt-2.5 text-[10px] uppercase tracking-[0.18em] text-[#C69C72]">
            Klikni za 2D/3D tlocrt i PDF →
          </div>
        </div>
      )}

      {/* Status Legend */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 text-xs text-[#F7F5F0]/70">
        <div className="flex flex-wrap items-center gap-5">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
            Slobodan
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
            Rezerviran
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#64748B]" />
            Prodan
          </span>
        </div>
        <span className="text-[11px] text-[#F7F5F0]/45">
          Izvorni projektni tlocrt · QUADAR Design d.o.o., Osijek
        </span>
      </div>
    </div>
  );
}
