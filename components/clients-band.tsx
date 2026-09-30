export function ClientsBand({ clients }: { clients: readonly string[] }) {
  return (
    <div className="clients-band border-y border-outline-variant/35 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-container-max flex-wrap items-center gap-x-2 gap-y-2 px-4 py-4 sm:gap-x-3 sm:px-margin-mobile md:px-margin-desktop">
        {clients.map((client, index) => (
          <span key={client} className="inline-flex items-center gap-x-2 sm:gap-x-3">
            {index > 0 ? <span className="clients-band-sep" aria-hidden="true">·</span> : null}
            <span className="clients-band-item">{client}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
