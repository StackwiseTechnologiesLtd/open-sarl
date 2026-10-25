import { describe, expect, it } from "vitest";
import { composeEnvelopeSvg, recolorPaint, stripSvg } from "./brand-export";

const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4453 3030"><path fill="#000068" d="M0 0h10v10z"/></svg>`;
const top = `<svg viewBox="0 0 364 848"><path fill="#000068" d="M0 0h10v10z"/></svg>`;
const bottom = `<svg viewBox="0 0 1007 768"><path fill="#2C2C33" d="M0 0h10v10z"/></svg>`;

describe("envelope export", () => {
  it("builds one self-contained navy envelope", () => {
    const svg = composeEnvelopeSvg(logo, top, bottom);
    expect(svg).toContain('fill="#000068"');
    expect(svg).toContain('fill="#FFFFFF"');
    expect(svg).toContain('fill="#333486"');
    expect(svg).toContain('fill="#2C2C33"');
    expect(svg).toContain('rx="36"');
    expect(stripSvg(svg)).not.toContain("<svg");
    expect(recolorPaint(logo, "#FFFFFF")).toContain('fill="#FFFFFF"');
    expect(recolorPaint(logo, "#FFFFFF")).not.toContain("#000068");
  });
});
