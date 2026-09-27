import { describe, expect, it } from "vitest";
import {
  contactEmail,
  getDictionary,
  isNavActive,
  localePath,
  locales,
  mailHref,
} from "./i18n";

describe("locale routing", () => {
  it("rewrites a path into the selected language and keeps the section", () => {
    expect(localePath("/fr/brochure", "en")).toBe("/en/brochure");
    expect(localePath("/en", "fr")).toBe("/fr");
    expect(localePath("/fr#expertise", "en")).toBe("/en#expertise");
  });

  it("highlights a section only on the homepage, and only after one is chosen", () => {
    expect(isNavActive("/fr#expertise", "", "/fr")).toBe(false);
    expect(isNavActive("/fr#expertise", "#expertise", "/fr")).toBe(true);
    expect(isNavActive("/fr#expertise", "#expertise", "/fr/brochure")).toBe(false);
  });
});

describe("bilingual content", () => {
  it("keeps the same navigation targets in French and English", () => {
    const targets = locales.map((locale) => getDictionary(locale).nav.map((item) => item.href));
    expect(targets[0]).toEqual(targets[1]);
    expect(targets[0]).toEqual(["#missions", "#poles", "#expertise", "#secteurs", "#missions"]);
  });

  it("matches the original homepage structure from code.html", () => {
    for (const locale of locales) {
      const copy = getDictionary(locale);
      expect(copy.hero.departments).toHaveLength(2);
      expect(copy.method.items).toHaveLength(4);
      expect(copy.missions.items).toHaveLength(3);
      expect(copy.mobilisation.steps).toHaveLength(3);
      expect(copy.sectors.items).toHaveLength(4);
      expect(copy.modes.items).toHaveLength(4);
    }
    expect(getDictionary("fr").method.items.map((item) => item.title)).toEqual([
      "Clarté",
      "Bancabilité",
      "Exécutabilité",
      "Contrôle",
    ]);
  });

  it("routes project and newsletter actions to the published address", () => {
    expect(mailHref("en", "project")).toContain(contactEmail);
    expect(mailHref("fr", "newsletter", "ministre@example.gov")).toContain("ministre%40example.gov");
  });
});
