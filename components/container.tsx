export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-container-max px-margin-mobile md:px-margin-desktop ${className}`}
    >
      {children}
    </div>
  );
}
