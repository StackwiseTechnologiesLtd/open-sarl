"use client";

import { useRef, type ReactNode } from "react";
import {
  BoardExportOverlay,
  type BoardExportConfig,
  type BoardExportLabels,
} from "@/components/brand/board-export-overlay";

export function Board({
  width,
  height,
  min = 0,
  label,
  export: exportConfig,
  exportLabels,
  onDark,
  children,
}: {
  width: number;
  height: number;
  min?: number;
  label: string;
  export?: BoardExportConfig;
  exportLabels?: BoardExportLabels;
  onDark?: boolean;
  children: ReactNode;
}) {
  const boardRef = useRef<HTMLDivElement>(null);

  return (
    <figure className="board-figure">
      <div className="board-scroll">
        <div
          className={`board-fit${exportConfig ? " board-export-frame" : ""}`}
          style={{
            aspectRatio: `${width} / ${height}`,
            minWidth: min || undefined,
            ["--board-w" as string]: `${width}px`,
          }}
        >
          {exportConfig && exportLabels ? (
            <BoardExportOverlay
              config={exportConfig}
              labels={exportLabels}
              boardRef={boardRef}
              onDark={onDark}
            />
          ) : null}
          <div ref={boardRef} className="board" style={{ width, height }}>
            {children}
          </div>
        </div>
      </div>
      <figcaption className="board-caption">{label}</figcaption>
    </figure>
  );
}

export function LockupFrame({
  label,
  export: exportConfig,
  exportLabels,
  onDark,
  children,
}: {
  label: string;
  export: BoardExportConfig;
  exportLabels: BoardExportLabels;
  onDark?: boolean;
  children: ReactNode;
}) {
  return (
    <figure className={`lockup${onDark ? " is-navy" : ""}`}>
      <div className={`lockup-preview board-export-frame${onDark ? " is-on-dark" : ""}`}>
        <BoardExportOverlay config={exportConfig} labels={exportLabels} onDark={onDark} />
        {children}
      </div>
      <figcaption className="board-caption" style={onDark ? { color: "#d5d8ef" } : undefined}>
        {label}
      </figcaption>
    </figure>
  );
}
