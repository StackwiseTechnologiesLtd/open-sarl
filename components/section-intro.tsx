export function SectionIntro({
  title,
  intro,
  align = "center",
  className = "",
}: {
  title: string;
  intro?: string;
  align?: "center" | "start";
  className?: string;
}) {
  const alignClass = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <div className={`section-intro max-w-2xl ${alignClass} ${className}`}>
      <h2 className="section-heading text-primary">{title}</h2>
      {intro ? <p className="section-lead text-on-surface-variant mt-3 sm:mt-4">{intro}</p> : null}
    </div>
  );
}
