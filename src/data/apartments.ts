export type RoomCount = "1S" | "2S" | "3S";
export type ExteriorType = "Vrt i terasa" | "Loggia" | "Balkon";
export type ApartmentStatus = "slobodan" | "rezerviran" | "prodan";

export interface RoomItem {
  num: number;
  name: string;
  area: number;
}

export interface StorageUnit {
  num: number;
  area: number;
}

export interface Apartment {
  id: string;
  code: string;
  floor: 0 | 1 | 2 | 3 | 4;
  floorLabel: string;
  rooms: RoomCount;
  roomsLabel: string;
  orientation: string;
  closedArea: number;
  exteriorArea: number;
  exteriorType: ExteriorType;
  exteriorDetails?: { label: string; area: number }[];
  totalArea: number;
  ceilingHeight: number;
  exteriorCeilingHeight: number;
  status: ApartmentStatus;
  roomBreakdown: RoomItem[];
  pdfPath: string;
  plan2dImage: string;
  plan3dImage: string;
  highlight?: string;
  /** Slot identifier on CAD plan for polygon mapping */
  planSlot: "villa" | "A" | "B" | "C" | "D" | "E" | "F";
}

export const PROJECT_INFO = {
  brand: "GraDar d.o.o.",
  projectName: "Bosut Residence",
  tagline: "Prvi red uz rijeku Bosut",
  catalogPdfPath: "/pdf/bosut-residence-katalog.pdf",
  location: {
    street: "Ulica Josipa Lovretića",
    parcel: "k.č.br. 5250/1, k.o. Vinkovci II",
    city: "Vinkovci",
    postalCode: "32100",
    fullAddress: "Ulica Josipa Lovretića, k.č.br. 5250/1, 32100 Vinkovci",
    coordinates: { lat: 45.2857, lng: 18.8045 },
  },
  investor: {
    name: "GraDar d.o.o.",
    address: "Eugena Kvaternika 70B, 32100 Vinkovci",
    contactPerson: "Dario Maršić",
    contactRole: "Direktor i vlasnik",
    phoneDisplay: "+385 98 901 9050",
    phoneHref: "+385989019050",
    whatsappNumber: "385989019050",
    email: "gradar.doo@gmail.com",
  },
  architect: {
    name: "QUADAR Design d.o.o.",
    address: "Kapucinska ulica 44, 31000 Osijek",
    city: "Osijek",
    website: "https://quadar.hr",
    email: "damir@quadar.hr",
  },
  specs: {
    totalApartments: 25,
    parkingSpaces: 25,
    parkingRange: "PM1 – PM25",
    parkingRatio: "1 : 1",
    storageUnits: 19,
    storageRange: "1,54 – 3,06 m²",
    ceilingHeightCm: 268,
    floorsCount: "Prizemlje + 4 kata",
    hasElevator: true,
  },
} as const;

export const STORAGE_UNITS: StorageUnit[] = [
  { num: 1, area: 2.03 },
  { num: 2, area: 2.07 },
  { num: 3, area: 2.07 },
  { num: 4, area: 2.07 },
  { num: 5, area: 2.63 },
  { num: 6, area: 1.54 },
  { num: 7, area: 1.99 },
  { num: 8, area: 1.99 },
  { num: 9, area: 1.96 },
  { num: 10, area: 2.23 },
  { num: 11, area: 2.23 },
  { num: 12, area: 1.96 },
  { num: 13, area: 1.99 },
  { num: 14, area: 3.06 },
  { num: 15, area: 2.4 },
  { num: 16, area: 2.03 },
  { num: 17, area: 2.03 },
  { num: 18, area: 2.03 },
  { num: 19, area: 2.14 },
];

export const PARKING_SUMMARY = [
  {
    group: "PM1 – PM3",
    type: "Natkriveno / pristupačno uz ulaz",
    detail: "Šira parkirna mjesta neposredno uz glavni ulaz i lift",
  },
  {
    group: "PM4 – PM6 i PM17 – PM19",
    type: "Natkrivena parkirna mjesta ispod zgrade",
    detail: "Zaštićena od sunca, kiše i snijega u prizemnoj kolonadi",
  },
  {
    group: "PM7 – PM16 i PM20 – PM25",
    type: "Uređena dvorišna parkirna mjesta",
    detail: "Vlastito označeno mjesto na parceli zgrade (ukupno 25 PM, omjer 1:1)",
  },
] as const;

export const LOCATION_HIGHLIGHTS = [
  {
    id: "setnica",
    title: "Šetnica uz Bosut",
    time: "1 min",
    distance: "40 m",
    description:
      "Neposredan izlaz na uređenu obalu s pogledom preko mirne rijeke izravno na vizuru grada Vinkovaca.",
  },
  {
    id: "trgovine",
    title: "Trgovine i sadržaji",
    time: "3 min",
    distance: "240 m",
    description:
      "Pekarnice, supermarketi, ljekarna i svakodnevne usluge na par minuta laganog hoda.",
  },
  {
    id: "skola",
    title: "Osnovna škola i vrtić",
    time: "4 min",
    distance: "350 m",
    description:
      "Siguran pješački pristup bez prelazaka prometnih magistrala za mirnu obiteljsku rutinu.",
  },
  {
    id: "centar",
    title: "Centar Vinkovaca (preko mosta)",
    time: "5 min",
    distance: "480 m",
    description:
      "Šetnja preko mosta na Bosutu vodi ravno do Korza, restorana, kafića i svih gradskih institucija.",
  },
] as const;

export const GRADAR_PROJECTS = [
  {
    id: "bosut-residence",
    status: "Aktualno u prodaji",
    statusTone: "active" as const,
    name: "Bosut Residence",
    location: "Vinkovci · Ulica Josipa Lovretića",
    units: "25 stanova · Prizemlje + 4 kata",
    year: "2025. – 2026.",
    summary:
      "Flagship stambena zgrada u prvom redu uz rijeku Bosut s privatnim parkirnim mjestima (1:1), liftom, brisolejima i prostranim natkrivenim loggiama.",
    ctaLabel: "Istraži slobodne stanove",
    ctaHref: "#stanovi",
  },
  {
    id: "novi-projekt-2027",
    status: "U pripremi",
    statusTone: "upcoming" as const,
    name: "Novi stambeni projekt 2027.",
    location: "Vinkovci · Odabrana mirna zona",
    units: "Intimna stambena arhitektura · U fazi projektiranja",
    year: "2027.",
    summary:
      "Nastavak GraDar standarda gradnje — niska gustoća stanovanja, energetska učinkovitost i bezvremenska arhitektura za dugoročnu vrijednost.",
    ctaLabel: "Prijavi se za ranu listu",
    ctaHref: "#kontakt",
  },
] as const;

const ROOMS_LABEL_MAP: Record<RoomCount, string> = {
  "1S": "Jednosobni (1S + DB)",
  "2S": "Dvosobni (2S + DB)",
  "3S": "Trosobni (3S + DB)",
};

const STATUS_MAP: Record<string, ApartmentStatus> = {
  S1: "slobodan",
  S2: "prodan",
  S3: "slobodan",
  S4: "rezerviran",
  S5: "slobodan",
  S6: "slobodan",
  S7: "slobodan",
  S8: "slobodan",
  S9: "slobodan",
  S10: "prodan",
  S11: "rezerviran",
  S12: "slobodan",
  S13: "slobodan",
  S14: "slobodan",
  S15: "slobodan",
  S16: "rezerviran",
  S17: "slobodan",
  S18: "slobodan",
  S19: "slobodan",
  S20: "prodan",
  S21: "slobodan",
  S22: "slobodan",
  S23: "slobodan",
  S24: "rezerviran",
  S25: "slobodan",
};

interface TypicalUnitTemplate {
  offset: number;
  planSlot: "A" | "B" | "C" | "D" | "E" | "F";
  rooms: RoomCount;
  orientation: string;
  closedArea: number;
  exteriorArea: number;
  exteriorType: ExteriorType;
  exteriorCeilingHeight: number;
  totalArea: number;
  plan2dImage: string;
  plan3dImage: string;
  roomBreakdown: RoomItem[];
  highlight?: string;
}

const TYPICAL_FLOOR_TEMPLATES: TypicalUnitTemplate[] = [
  {
    offset: 0,
    planSlot: "A",
    rooms: "3S",
    orientation: "SI + JZ",
    closedArea: 92.12,
    exteriorArea: 10.72,
    exteriorType: "Loggia",
    exteriorCeilingHeight: 263,
    totalArea: 102.84,
    plan2dImage: "/plans/unit-a.png",
    plan3dImage: "/media/unit-3d-a.jpg",
    highlight:
      "Prostrani obiteljski trosobni stan s dnevnim boravkom od 39,27 m² okrenutim prema Bosutu",
    roomBreakdown: [
      { num: 1, name: "Hodnik", area: 10.4 },
      { num: 2, name: "Soba", area: 10.74 },
      { num: 3, name: "Soba", area: 9.92 },
      { num: 4, name: "Soba", area: 14.07 },
      { num: 5, name: "Kupaonica", area: 5.3 },
      { num: 6, name: "WC", area: 1.24 },
      { num: 7, name: "Ostava", area: 1.18 },
      { num: 8, name: "Dnevni boravak, kuhinja i blagovaonica", area: 39.27 },
    ],
  },
  {
    offset: 1,
    planSlot: "B",
    rooms: "2S",
    orientation: "SI",
    closedArea: 67.94,
    exteriorArea: 16.62,
    exteriorType: "Loggia",
    exteriorCeilingHeight: 263,
    totalArea: 84.56,
    plan2dImage: "/plans/unit-b.png",
    plan3dImage: "/media/unit-3d-b.jpg",
    highlight:
      "Široka natkrivena loggia od 16,62 m² s izravnim pogledom na Bosut i grad Vinkovce",
    roomBreakdown: [
      { num: 1, name: "Hodnik", area: 8.37 },
      { num: 2, name: "Dnevni boravak, kuhinja i blagovaonica", area: 31.41 },
      { num: 3, name: "Kupaonica", area: 4.43 },
      { num: 4, name: "Ostava", area: 1.93 },
      { num: 5, name: "Soba", area: 11.54 },
      { num: 6, name: "Soba", area: 10.26 },
    ],
  },
  {
    offset: 2,
    planSlot: "C",
    rooms: "2S",
    orientation: "SI + SZ",
    closedArea: 71.49,
    exteriorArea: 28.36,
    exteriorType: "Loggia",
    exteriorCeilingHeight: 263,
    totalArea: 99.85,
    plan2dImage: "/plans/unit-c.png",
    plan3dImage: "/media/unit-3d-c.jpg",
    highlight:
      "Najveća katna L-loggia u zgradi (28,36 m²) — dvostrani pogled na rijeku i park",
    roomBreakdown: [
      { num: 1, name: "Hodnik", area: 10.6 },
      { num: 2, name: "Kupaonica", area: 4.74 },
      { num: 3, name: "Soba", area: 10.85 },
      { num: 4, name: "Soba", area: 11.25 },
      { num: 5, name: "Ostava", area: 2.15 },
      { num: 6, name: "Dnevni boravak, kuhinja i blagovaonica", area: 31.9 },
    ],
  },
  {
    offset: 3,
    planSlot: "D",
    rooms: "1S",
    orientation: "SZ",
    closedArea: 49.7,
    exteriorArea: 11.33,
    exteriorType: "Loggia",
    exteriorCeilingHeight: 263,
    totalArea: 61.03,
    plan2dImage: "/plans/unit-d.png",
    plan3dImage: "/media/unit-3d-d.jpg",
    highlight:
      "Funkcionalan jednosobni stan sa spavaćom sobom od 13,89 m² i dubokom loggiom",
    roomBreakdown: [
      { num: 1, name: "Hodnik", area: 4.72 },
      { num: 2, name: "Dnevni boravak, kuhinja i blagovaonica", area: 24.72 },
      { num: 3, name: "Ostava", area: 1.73 },
      { num: 4, name: "Kupaonica", area: 4.64 },
      { num: 5, name: "Soba", area: 13.89 },
    ],
  },
  {
    offset: 4,
    planSlot: "E",
    rooms: "1S",
    orientation: "SZ + JZ",
    closedArea: 49.56,
    exteriorArea: 15.42,
    exteriorType: "Loggia",
    exteriorCeilingHeight: 263,
    totalArea: 64.98,
    plan2dImage: "/plans/unit-e.png",
    plan3dImage: "/media/unit-3d-e.jpg",
    highlight:
      "Kutni jednosobni stan s popodnevnim suncem i prostranom loggiom od 15,42 m²",
    roomBreakdown: [
      { num: 1, name: "Hodnik", area: 5.45 },
      { num: 2, name: "Kupaonica", area: 4.54 },
      { num: 3, name: "Ostava", area: 1.65 },
      { num: 4, name: "Dnevni boravak, kuhinja i blagovaonica", area: 25.09 },
      { num: 5, name: "Soba", area: 12.82 },
    ],
  },
  {
    offset: 5,
    planSlot: "F",
    rooms: "1S",
    orientation: "JZ + JI",
    closedArea: 43.62,
    exteriorArea: 10.84,
    exteriorType: "Balkon",
    exteriorCeilingHeight: 270,
    totalArea: 54.46,
    plan2dImage: "/plans/unit-f.png",
    plan3dImage: "/media/unit-3d-f.jpg",
    highlight:
      "Južna svjetlost tijekom cijelog dana — idealan za život ili sigurnu investiciju",
    roomBreakdown: [
      { num: 1, name: "Hodnik", area: 2.34 },
      { num: 2, name: "Ostava", area: 1.35 },
      { num: 3, name: "Kupaonica", area: 4.28 },
      { num: 4, name: "Dnevni boravak, kuhinja i blagovaonica", area: 21.03 },
      { num: 5, name: "Soba", area: 14.62 },
    ],
  },
];

const GROUND_FLOOR_VILLA: Apartment = {
  id: "s1",
  code: "S1",
  floor: 0,
  floorLabel: "Prizemlje",
  rooms: "2S",
  roomsLabel: "Flagship urbana vila (2S + 19,52 m² glavna soba)",
  orientation: "SZ + SI",
  closedArea: 109.7,
  exteriorArea: 172.44,
  exteriorType: "Vrt i terasa",
  exteriorDetails: [
    { label: "Terasa", area: 44.0 },
    { label: "Privatni vrt", area: 128.44 },
  ],
  totalArea: 282.14,
  ceilingHeight: 268,
  exteriorCeilingHeight: 270,
  status: STATUS_MAP.S1,
  pdfPath: "/pdf/stan-S1.pdf",
  plan2dImage: "/plans/unit-s1.png",
  plan3dImage: "/media/unit-3d-s1.jpg",
  highlight:
    "Osjećaj kuće, komfor stana — 128,44 m² privatnog vrta i 44,00 m² natkrivene terase",
  planSlot: "villa",
  roomBreakdown: [
    { num: 1, name: "Hodnik", area: 9.09 },
    { num: 2, name: "Dnevni boravak, kuhinja i blagovaonica", area: 43.94 },
    { num: 3, name: "Soba", area: 10.95 },
    { num: 4, name: "Kupaonica", area: 3.47 },
    { num: 5, name: "Ostava", area: 1.07 },
    { num: 6, name: "Soba", area: 19.52 },
    { num: 7, name: "Soba", area: 14.6 },
    { num: 8, name: "Kupaonica", area: 7.06 },
  ],
};

function buildTypicalFloorApartments(): Apartment[] {
  const floors: Array<1 | 2 | 3 | 4> = [1, 2, 3, 4];
  const result: Apartment[] = [];

  for (const floor of floors) {
    const startNumber = 2 + (floor - 1) * 6;
    for (const tpl of TYPICAL_FLOOR_TEMPLATES) {
      const num = startNumber + tpl.offset;
      const code = `S${num}`;
      result.push({
        id: code.toLowerCase(),
        code,
        floor,
        floorLabel: `${floor}. kat`,
        rooms: tpl.rooms,
        roomsLabel: ROOMS_LABEL_MAP[tpl.rooms],
        orientation: tpl.orientation,
        closedArea: tpl.closedArea,
        exteriorArea: tpl.exteriorArea,
        exteriorType: tpl.exteriorType,
        totalArea: tpl.totalArea,
        ceilingHeight: 268,
        exteriorCeilingHeight: tpl.exteriorCeilingHeight,
        status: STATUS_MAP[code] ?? "slobodan",
        roomBreakdown: tpl.roomBreakdown,
        pdfPath: `/pdf/stan-${code}.pdf`,
        plan2dImage: tpl.plan2dImage,
        plan3dImage: tpl.plan3dImage,
        highlight: tpl.highlight,
        planSlot: tpl.planSlot,
      });
    }
  }

  return result;
}

export const APARTMENTS: Apartment[] = [
  GROUND_FLOOR_VILLA,
  ...buildTypicalFloorApartments(),
];

export function formatArea(value: number): string {
  return `${value.toFixed(2).replace(".", ",")} m²`;
}

export const STATUS_CONFIG: Record<
  ApartmentStatus,
  {
    label: string;
    color: string;
    bgClass: string;
    textClass: string;
    borderClass: string;
    dotClass: string;
  }
> = {
  slobodan: {
    label: "Slobodan",
    color: "#10B981",
    bgClass: "bg-[#10B981]/12",
    textClass: "text-[#10B981]",
    borderClass: "border-[#10B981]/30",
    dotClass: "bg-[#10B981]",
  },
  rezerviran: {
    label: "Rezerviran",
    color: "#F59E0B",
    bgClass: "bg-[#F59E0B]/12",
    textClass: "text-[#F59E0B]",
    borderClass: "border-[#F59E0B]/30",
    dotClass: "bg-[#F59E0B]",
  },
  prodan: {
    label: "Prodan",
    color: "#64748B",
    bgClass: "bg-[#64748B]/15",
    textClass: "text-[#94A3B8]",
    borderClass: "border-[#64748B]/30",
    dotClass: "bg-[#64748B]",
  },
};

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${PROJECT_INFO.investor.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}
