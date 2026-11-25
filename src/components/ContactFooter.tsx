"use client";

import { FormEvent, useState } from "react";
import {
  CheckCircle2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { buildWhatsAppUrl, PROJECT_INFO } from "@/data/apartments";
import { GradarLogo } from "./GradarLogo";

export function ContactFooter() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("Bosut Residence — Razgledavanje");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const whatsappHref = buildWhatsAppUrl(
    "Pozdrav Dario, zanima me projekt Bosut Residence (GraDar d.o.o.). Volio/la bih dogovoriti razgovor."
  );

  return (
    <footer
      id="kontakt"
      className="border-t border-white/10 bg-[#141A18] text-[#F7F5F0]"
    >
      {/* Contact Section */}
      <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Left: Direct Investor Contact Details */}
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#C69C72]">
              07 · Kontakt i prodaja
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-[#F7F5F0] sm:text-5xl">
              Dogovorite osobni{" "}
              <span className="italic text-[#C69C72]">razgovor i obilazak.</span>
            </h2>
            <p className="mt-5 text-sm font-light leading-relaxed text-[#F7F5F0]/72">
              Stojimo vam na raspolaganju za uvid u tlocrte, tehnički opis
              materijala, uvjete kupnje i obilazak lokacije na obali Bosuta.
            </p>

            <div className="mt-10 space-y-5 border-t border-white/10 pt-8">
              <div className="border border-white/10 bg-[#1D2522] p-6">
                <div className="text-[10px] uppercase tracking-[0.22em] text-[#C69C72]">
                  Prodaja i kontakt
                </div>
                <div className="mt-2 font-serif text-2xl font-normal text-[#F7F5F0]">
                  {PROJECT_INFO.investor.contactPerson}
                </div>
                <div className="text-xs text-[#F7F5F0]/60">
                  {PROJECT_INFO.investor.contactRole} ·{" "}
                  {PROJECT_INFO.investor.name}
                </div>

                <div className="mt-5 space-y-3 text-sm">
                  <a
                    href={`tel:${PROJECT_INFO.investor.phoneHref}`}
                    className="flex items-center gap-3 text-[#F7F5F0]/85 transition-colors hover:text-[#C69C72]"
                  >
                    <Phone
                      className="h-4 w-4 text-[#C69C72]"
                      strokeWidth={1.6}
                    />
                    {PROJECT_INFO.investor.phoneDisplay}
                  </a>
                  <a
                    href={`mailto:${PROJECT_INFO.investor.email}`}
                    className="flex items-center gap-3 text-[#F7F5F0]/85 transition-colors hover:text-[#C69C72]"
                  >
                    <Mail
                      className="h-4 w-4 text-[#C69C72]"
                      strokeWidth={1.6}
                    />
                    {PROJECT_INFO.investor.email}
                  </a>
                  <div className="flex items-start gap-3 text-[#F7F5F0]/70">
                    <MapPin
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#C69C72]"
                      strokeWidth={1.6}
                    />
                    <span>{PROJECT_INFO.investor.address}</span>
                  </div>
                </div>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-2 border border-[#10B981]/45 bg-[#10B981]/12 py-3 text-xs font-medium uppercase tracking-[0.16em] text-[#34D399] transition-all duration-300 hover:bg-[#10B981] hover:text-[#141A18]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Brzi WhatsApp kontakt
                </a>
              </div>
            </div>
          </div>

          {/* Right: Private Viewing / Early List Form */}
          <div className="lg:col-span-7">
            <div className="border border-white/10 bg-[#1D2522] p-6 sm:p-10">
              <h3 className="font-serif text-3xl font-light text-[#F7F5F0]">
                Zakažite razgledavanje
              </h3>
              <p className="mt-2 text-xs text-[#F7F5F0]/60">
                Ispunite podatke i javit ćemo vam se s prijedlogom termina.
              </p>

              {sent ? (
                <div className="mt-8 border border-[#10B981]/35 bg-[#10B981]/10 p-8 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-[#10B981]" />
                  <h4 className="mt-4 font-serif text-3xl text-[#F7F5F0]">
                    Hvala na upitu
                  </h4>
                  <p className="mx-auto mt-2 max-w-md text-sm font-light text-[#F7F5F0]/75">
                    Vaša poruka za{" "}
                    <strong className="font-medium text-[#F7F5F0]">
                      {topic}
                    </strong>{" "}
                    uspješno je zaprimljena. Kontaktirat ćemo vas u najkraćem
                    roku.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setNote("");
                    }}
                    className="mt-6 border border-white/20 px-5 py-2.5 text-xs uppercase tracking-[0.16em] text-[#F7F5F0] hover:border-[#C69C72] hover:text-[#C69C72]"
                  >
                    Pošalji novi upit
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-[11px] uppercase tracking-[0.16em] text-[#F7F5F0]/65"
                      >
                        Ime i prezime *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Vaše ime i prezime"
                        className="mt-2 w-full border border-white/15 bg-[#141A18] px-4 py-3 text-sm text-[#F7F5F0] placeholder:text-[#F7F5F0]/30 focus:border-[#C69C72] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-[11px] uppercase tracking-[0.16em] text-[#F7F5F0]/65"
                      >
                        Telefon *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+385 98 ..."
                        className="mt-2 w-full border border-white/15 bg-[#141A18] px-4 py-3 text-sm text-[#F7F5F0] placeholder:text-[#F7F5F0]/30 focus:border-[#C69C72] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-[11px] uppercase tracking-[0.16em] text-[#F7F5F0]/65"
                      >
                        Email adresa *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ime@primjer.hr"
                        className="mt-2 w-full border border-white/15 bg-[#141A18] px-4 py-3 text-sm text-[#F7F5F0] placeholder:text-[#F7F5F0]/30 focus:border-[#C69C72] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-topic"
                        className="block text-[11px] uppercase tracking-[0.16em] text-[#F7F5F0]/65"
                      >
                        Predmet upita
                      </label>
                      <select
                        id="contact-topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="mt-2 w-full border border-white/15 bg-[#141A18] px-4 py-3 text-sm text-[#F7F5F0] focus:border-[#C69C72] focus:outline-none"
                      >
                        <option value="Bosut Residence — Razgledavanje">
                          Bosut Residence — Razgledavanje
                        </option>
                        <option value="Bosut Residence — Flagship Stan S1">
                          Bosut Residence — Flagship Stan S1 (prizemlje)
                        </option>
                        <option value="Bosut Residence — Cjenik i dostupnost">
                          Bosut Residence — Cjenik i dostupnost
                        </option>
                        <option value="Novi projekt 2027. — Rana lista">
                          Novi projekt 2027. — Prijava na ranu listu
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-note"
                      className="block text-[11px] uppercase tracking-[0.16em] text-[#F7F5F0]/65"
                    >
                      Poruka ili željeni stan
                    </label>
                    <textarea
                      id="contact-note"
                      rows={4}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Navedite šifru stana, željenu kvadraturu ili termin koji vam odgovara..."
                      className="mt-2 w-full resize-none border border-white/15 bg-[#141A18] px-4 py-3 text-sm text-[#F7F5F0] placeholder:text-[#F7F5F0]/30 focus:border-[#C69C72] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2.5 border border-[#C69C72] bg-[#C69C72] px-7 py-4 text-xs font-medium uppercase tracking-[0.18em] text-[#141A18] transition-all duration-300 hover:bg-transparent hover:text-[#F7F5F0] sm:w-auto"
                  >
                    <Send className="h-4 w-4" />
                    Pošalji upit
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Architectural Legal & Credits Bar */}
      <div className="border-t border-white/10 bg-[#101513]">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-6 px-5 py-8 text-xs text-[#F7F5F0]/55 sm:px-8 md:flex-row md:items-center lg:px-12">
          <div className="flex flex-wrap items-center gap-4">
            <GradarLogo variant="dark" subtitle="" />
            <span className="hidden text-white/20 sm:inline">|</span>
            <span>
              {PROJECT_INFO.investor.name}, {PROJECT_INFO.investor.address}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>
              Projektant:{" "}
              <a
                href={PROJECT_INFO.architect.website}
                target="_blank"
                rel="noopener noreferrer"
                className="font-normal text-[#F7F5F0]/80 underline-offset-4 hover:text-[#C69C72] hover:underline"
              >
                {PROJECT_INFO.architect.name}
              </a>
              , {PROJECT_INFO.architect.address}
            </span>
            <span>
              Lokacija: {PROJECT_INFO.location.street} (
              {PROJECT_INFO.location.parcel})
            </span>
            <span>© {new Date().getFullYear()} GraDar d.o.o.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
