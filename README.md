# GraDar d.o.o. — Bosut Residence

Luksuzna web aplikacija za građevinsku tvrtku **GraDar d.o.o.** iz Vinkovaca i njihov flagship stambeni projekt **Bosut Residence** (25 ekskluzivnih stanova u prvom redu uz rijeku Bosut, Ulica Josipa Lovretića, k.č.br. 5250/1, k.o. Vinkovci II).

Dizajnirana s fokusom na **izravnu prodaju bez agencija za nekretnine (0 % provizije)**, uz izvorne CAD nacrte projektanta **QUADAR Design d.o.o.** (Osijek), fotorealistične 3D izometrije i službene PDF kataloge za svaki stan.

## Tech Stack
- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **GSAP (`ScrollTrigger`)** + **Lenis** smooth inertia scroll
- **Lucide React** ikone
- **Google Fonts (`next/font/google`):** `Cormorant Garamond` (Editorial Serif) & `Plus Jakarta Sans` (Clean Sans)

## Pokretanje lokalno

```bash
npm install
npm run dev
```

Aplikacija je dostupna na `http://localhost:3000`.

## Produkcijski build (Vercel ready)

```bash
npm run typecheck
npm run build
npm run start
```

---

## Službeni resursi i Higgsfield AI vizuali

### `/public/pdf/` — Službeni PDF katalozi
- `bosut-residence-katalog.pdf` — Kompletan službeni katalog (37 stranica)
- `stan-S1.pdf` do `stan-S25.pdf` — Individualni 4-stranični PDF paketi za svaki stan (naslovnica, lokacija, tlocrt kata, detaljni nacrt i kvadrature stana)

### `/public/plans/` — Izvorni QUADAR CAD nacrti i situacije
- `floor-prizemlje.png`, `floor-kat.png` — Službeni 2D tlocrti prizemlja i tipskih katova (1.–4. kat)
- `unit-s1.png`, `unit-a.png` – `unit-f.png` — Pojedinačni CAD nacrti svih 7 tipova stanova s brojčanim oznakama prostorija
- `lokacija-ortho.png`, `situacija-cad.png`, `cover-river.png` — Ortofoto snimka, geodetska situacija čestice k.č.br. 5250/1 i naslovni prikaz

### `/public/media/` — Higgsfield AI 3D modeli, renderi i video
- `hero-bosut.mp4` & `hero-poster.jpg` — Eksterijer zgrade uz šetnicu na Bosutu (Kling 3.0 video + GPT Image 2.6 render prema izvornom modelu)
- `interior-living-poster.jpg` & `bosut-sunset-poster.jpg` — Pogled iz dnevnog boravka i s loggie preko rijeke Bosut na grad Vinkovce
- `stan-s1-vrt.jpg` — Prizemni stan S1 s natkrivenom terasom (44,00 m²) i privatnim vrtom (128,44 m²)
- `aerial-vinkovci-3d.jpg` — 3D zračna vizualizacija zgrade u Ulici Josipa Lovretića i grada Vinkovaca preko Bosuta
- `plan-3d-prizemlje.jpg` & `plan-3d-kat.jpg` — 3D izometrijski modeli etaža generirani 1:1 iz službenih CAD tlocrta
- `unit-3d-s1.jpg`, `unit-3d-a.jpg` – `unit-3d-f.jpg` — 3D izometrijski prikazi pojedinačnih stanova

### `/public/renders/` — Izvorni QUADAR 3D renderi
- `orig-front.jpg`, `orig-side.jpg`, `orig-courtyard.jpg`, `orig-garden-s1.jpg`
