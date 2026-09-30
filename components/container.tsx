export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full min-w-0 max-w-container-max px-4 sm:px-margin-mobile md:px-margin-desktop ${className}`}
    >
      {children}
    </div>
  );
}
