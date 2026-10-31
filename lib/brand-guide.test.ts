import { describe, expect, it } from "vitest";
import {
  brandColors,
  brandGuide,
  brandSectionIds,
  cardArtboard,
  cardBoard,
  contrastRatio,
  correspondence,
  invoiceLines,
  invoiceTotal,
  navy,
  paper,
} from "./brand-guide";
import { getDictionary } from "./i18n";
import { siteHost } from "./site";

describe("brand guide", () => {
  it("keeps the same sections in French and English", () => {
    for (const id of brandSectionIds) {
      expect(brandGuide.fr.nav[id].length).toBeGreaterThan(0);
      expect(brandGuide.en.nav[id].length).toBeGreaterThan(0);
    }
    expect(brandGuide.fr.letterSections).toHaveLength(brandGuide.en.letterSections.length);
    expect(brandGuide.fr.files.map((file) => file.href)).toEqual(brandGuide.en.files.map((file) => file.href));
  });

  it("keeps the business card board on the 6248×3595 ratio", () => {
    const ratio = cardBoard.width / cardBoard.height;
    const source = cardArtboard.width / cardArtboard.height;
    expect(Math.abs(ratio - source)).toBeLessThan(0.01);
  });

  it("uses the printed navy and keeps paper text at AAA", () => {
    expect(brandColors[0]?.hex).toBe(navy);
    expect(contrastRatio(navy, paper)).toBeGreaterThan(7);
    expect(contrastRatio(paper, "#E7E8EC")).toBeLessThan(4.5);
    expect(invoiceLines.reduce((sum, line) => sum + line.amount, 0)).toBe(invoiceTotal);
  });

  it("uses the published site host on correspondence", () => {
    expect(correspondence.site).toBe(siteHost);
  });

  it("links the public site footer to About", () => {
    expect(getDictionary("fr").footer.companyLinks.some((item) => item.href === "/about")).toBe(true);
    expect(getDictionary("en").footer.companyLinks.some((item) => item.href === "/about")).toBe(true);
  });
});
