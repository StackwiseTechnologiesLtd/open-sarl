import { describe, expect, it } from "vitest";
import {
  contactEmail,
  getDictionary,
  isNavActive,
  localePath,
  locales,
  mailHref,
} from "./i18n";

const banned = ["100%", "100 %", "Department 01", "Department 02", "Executive Branch", "Approche Standard", "Alignement total"];

describe("locale routing", () => {
  it("rewrites a path into the selected language and keeps the section", () => {
    expect(localePath("/fr/brochure", "en")).toBe("/en/brochure");
    expect(localePath("/en", "fr")).toBe("/fr");
    expect(localePath("/fr#experience", "en")).toBe("/en#experience");
  });

  it("highlights a section only on the homepage, and only after one is chosen", () => {
    expect(isNavActive("/fr#experience", "", "/fr")).toBe(false);
    expect(isNavActive("/fr#experience", "#experience", "/fr")).toBe(true);
    expect(isNavActive("/fr#experience", "#experience", "/fr/brochure")).toBe(false);
  });
});

describe("bilingual content", () => {
  it("keeps the same navigation targets in French and English", () => {
    const targets = locales.map((locale) => getDictionary(locale).nav.map((item) => item.href));
    expect(targets[0]).toEqual(targets[1]);
    expect(targets[0]).toEqual(["#capabilities", "#secteurs", "#experience", "#methode", "#modes"]);
  });

  it("describes three capabilities, four mandates and the decision variables", () => {
    for (const locale of locales) {
      const copy = getDictionary(locale);
      expect(copy.capabilities.items).toHaveLength(3);
      expect(copy.experience.items).toHaveLength(4);
      expect(copy.method.items.map((item) => item.title).length).toBe(4);
      expect(copy.adds.rows).toHaveLength(5);
    }
    expect(getDictionary("fr").method.items.map((item) => item.title)).toEqual([
      "Clarté",
      "Bancabilité",
      "Exécutabilité",
      "Contrôle",
    ]);
  });

  it("does not publish unsupported absolute claims", () => {
    for (const locale of locales) {
      const text = JSON.stringify(getDictionary(locale));
      for (const phrase of banned) {
        expect(text).not.toContain(phrase);
      }
    }
  });

  it("routes project and newsletter actions to the published address", () => {
    expect(mailHref("en", "project")).toContain(contactEmail);
    expect(mailHref("fr", "newsletter", "ministre@example.gov")).toContain("ministre%40example.gov");
  });
});
