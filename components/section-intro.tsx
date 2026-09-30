export function SectionIntro({
  title,
  intro,
  align = "start",
  className = "",
}: {
  title: string;
  intro?: string;
  align?: "center" | "start";
  className?: string;
}) {
  const alignClass = align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left";

  return (
    <div className={`section-intro ${alignClass} ${className}`}>
      <h2 className="section-heading text-primary">{title}</h2>
      {intro ? <p className="section-lead text-on-surface-variant mt-3 max-w-[65ch] sm:mt-4">{intro}</p> : null}
    </div>
  );
}
