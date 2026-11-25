interface GradarLogoProps {
  className?: string;
  subtitle?: string;
  variant?: "dark" | "light";
}

export function GradarLogo({
  className = "",
  subtitle = "Bosut Residence",
  variant = "dark",
}: GradarLogoProps) {
  const strokeColor = variant === "dark" ? "#F7F5F0" : "#141A18";
  const textColor = variant === "dark" ? "text-[#F7F5F0]" : "text-[#141A18]";

  return (
    <div className={`inline-flex items-center gap-3.5 ${className}`}>
      {/* Official GraDar Architectural Monogram */}
      <svg
        viewBox="0 0 64 46"
        fill="none"
        aria-hidden="true"
        className="h-9 w-12 shrink-0"
      >
        {/* Left vertical chimney/pillar frame */}
        <path
          d="M5 42V5H16V20"
          stroke={strokeColor}
          strokeWidth="2.8"
          strokeLinecap="square"
        />
        {/* Inner structural pillar */}
        <path
          d="M11 42V15"
          stroke="#C69C72"
          strokeWidth="2.2"
          strokeLinecap="square"
        />
        {/* Roofline gable */}
        <path
          d="M11 26L28 12L46 27"
          stroke={strokeColor}
          strokeWidth="2.8"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        {/* Extended architectural datum line */}
        <path
          d="M22 36H61"
          stroke="#C69C72"
          strokeWidth="2.6"
          strokeLinecap="square"
        />
      </svg>

      <div className="flex flex-col leading-none">
        <span
          className={`font-serif text-2xl font-medium tracking-[0.2em] transition-colors group-hover:text-[#C69C72] ${textColor}`}
        >
          GRADAR
        </span>
        {subtitle && (
          <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.26em] text-[#C69C72]">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
