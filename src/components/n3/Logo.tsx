interface LogoProps {
  reversed?: boolean;
  className?: string;
}

export function Logo({ reversed = false, className }: LogoProps) {
  const text = reversed ? "text-surface" : "text-navy";
  const sub = reversed
    ? "text-[color-mix(in_oklab,var(--color-surface)_70%,transparent)]"
    : "text-muted-foreground";

  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="n3-ribbon" x1="0" y1="32" x2="32" y2="0">
            <stop offset="0%" stopColor="#0F6E56" />
            <stop offset="100%" stopColor="#1D9E75" />
          </linearGradient>
        </defs>
        <path
          d="M3 24.5 15.5 3.5l4.2 7.1-8.3 13.9H3Z"
          fill={reversed ? "#FFFFFF" : "#0F1F3D"}
        />
        <path d="M13.2 28.5 25.7 7.5l4.2 7.1-8.3 13.9h-8.4Z" fill="url(#n3-ribbon)" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`text-[1.05rem] font-semibold tracking-[0.14em] ${text}`}>N3</span>
        <span className={`mt-1 text-[0.5rem] font-medium tracking-[0.34em] uppercase ${sub}`}>
          Solutions
        </span>
      </span>
    </span>
  );
}
