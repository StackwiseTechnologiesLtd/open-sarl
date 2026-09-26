import { describe, expect, it } from "vitest";
import {
  appointmentMailto,
  contactEmail,
  isNavActive,
  navLinks,
  newsletterMailto,
  pillars,
} from "./site";

describe("site navigation", () => {
  it("keeps the institutional navigation order", () => {
    expect(navLinks.map((link) => link.label)).toEqual([
      "Missions",
      "Pôles",
      "Expertise",
      "Secteurs",
      "Portfolio",
    ]);
  });

  it("highlights Expertise on the homepage until another section is chosen", () => {
    expect(isNavActive("/#expertise", "", "/")).toBe(true);
    expect(isNavActive("/#missions", "", "/")).toBe(false);
    expect(isNavActive("/#missions", "#missions", "/")).toBe(true);
    expect(isNavActive("/#expertise", "#missions", "/mentions-legales")).toBe(false);
  });
});

describe("site content", () => {
  it("presents four decision-maker pillars", () => {
    expect(pillars.map((pillar) => pillar.title)).toEqual([
      "Clarté",
      "Bancabilité",
      "Exécutabilité",
      "Contrôle",
    ]);
  });

  it("routes appointment and newsletter actions to the published address", () => {
    expect(appointmentMailto()).toContain(contactEmail);
    expect(newsletterMailto("ministre@example.gov")).toContain("ministre%40example.gov");
  });
});
