import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bosut Residence | GraDar d.o.o. Vinkovci — Stanovi u prvom redu uz Bosut",
  description:
    "Ekskluzivna stambena zgrada Bosut Residence u Vinkovcima. 25 vrhunskih stanova u prvom redu uz rijeku Bosut, privatna parkirna mjesta (1:1), lift i bezvremenska arhitektura. Investitor GraDar d.o.o.",
  keywords: [
    "Bosut Residence",
    "GraDar d.o.o.",
    "novogradnja Vinkovci",
    "stanovi Vinkovci",
    "luksuzni stanovi uz Bosut",
    "Ulica Josipa Lovretića Vinkovci",
  ],
  openGraph: {
    title: "Bosut Residence — Život u prvom redu uz Bosut | GraDar d.o.o.",
    description:
      "25 ekskluzivnih stanova u prvom redu uz rijeku Bosut u Vinkovcima. Istražite interaktivne tlocrte i dostupnost.",
    locale: "hr_HR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#141A18",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hr"
      className={`${cormorant.variable} ${jakarta.variable}`}
    >
      <body className="bg-[#141A18] text-[#F7F5F0] antialiased selection:bg-[#C69C72]/30 selection:text-[#F7F5F0]">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
