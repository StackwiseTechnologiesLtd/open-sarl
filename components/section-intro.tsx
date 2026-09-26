export function SectionIntro({
  eyebrow,
  title,
  intro,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const alignClass = align === "center" ? "mx-auto text-center" : "max-w-3xl";

  return (
    <div className={`${alignClass} ${className}`}>
      {eyebrow ? (
        <p className="font-label-md text-[11px] tracking-[0.14em] text-primary uppercase">{eyebrow}</p>
      ) : null}
      <h2
        className={`font-headline-xl text-[1.75rem] leading-tight font-bold text-balance text-primary sm:text-4xl ${
          eyebrow ? "mt-3" : ""
        }`}
      >
        {title}
      </h2>
      {intro ? <p className={`mt-4 text-base leading-7 text-on-surface-variant ${align === "center" ? "max-w-2xl" : ""}`}>{intro}</p> : null}
    </div>
  );
}
