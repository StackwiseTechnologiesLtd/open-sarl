import { envelopeBoard } from "@/lib/brand-export";

export function EnvelopeDecor({ compact = false }: { compact?: boolean; className?: string }) {
  const board = envelopeBoard;

  return (
    <div
      className={`env-decor-layer${compact ? " is-compact" : ""}`}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="env-decor env-decor-bottom"
        src={board.bottomArt.path}
        alt=""
        decoding="async"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="env-decor env-decor-top"
        src={board.topArt.path}
        alt=""
        decoding="async"
      />
    </div>
  );
}
