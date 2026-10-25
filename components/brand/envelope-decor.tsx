import { envelopeArtLayout, envelopeBoard } from "@/lib/brand-export";

export function EnvelopeDecor({ className = "" }: { className?: string }) {
  const board = envelopeBoard;
  const layout = envelopeArtLayout();

  return (
    <div className={`env-decor-layer ${className}`.trim()} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="env-decor env-decor-bottom"
        src={board.bottomArt.path}
        alt=""
        style={{
          left: `${(board.bottomArt.x / board.width) * 100}%`,
          bottom: 0,
          width: `${(board.bottomArt.width / board.width) * 100}%`,
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="env-decor env-decor-top"
        src={board.topArt.path}
        alt=""
        style={{
          left: `${(layout.topX / board.width) * 100}%`,
          top: `${(layout.topY / board.height) * 100}%`,
          width: `${(layout.topWidth / board.width) * 100}%`,
        }}
      />
    </div>
  );
}
