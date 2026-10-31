import { describe, expect, it } from "vitest";
import { invoiceLines, invoiceTotal } from "./brand-guide";
import {
  composerDownloadName,
  composerPageCount,
  composerTemplateOrder,
  createComposerFormState,
  invoiceFormToOverrides,
  isComposerTemplateId,
  letterFormToOverrides,
  receiptFormToOverrides,
  type ComposerFormState,
  type ComposerTemplateId,
} from "./document-composer";
import { getDictionary, locales } from "./i18n";

function withLayout(
  state: ComposerFormState,
  layout: Partial<ComposerFormState["layout"]>,
): ComposerFormState {
  return { ...state, layout: { ...state.layout, ...layout } };
}

function withTemplate(state: ComposerFormState, templateId: ComposerTemplateId): ComposerFormState {
  return { ...state, templateId };
}

describe("document composer", () => {
  it("recognises every catalog template id", () => {
    for (const { id } of composerTemplateOrder) {
      expect(isComposerTemplateId(id)).toBe(true);
    }
    expect(isComposerTemplateId("cover")).toBe(false);
    expect(isComposerTemplateId("letter")).toBe(false);
    expect(isComposerTemplateId("")).toBe(false);
  });

  it("lists billing types before long-form templates", () => {
    const ids = composerTemplateOrder.map((t) => t.id);
    expect(ids.slice(0, 4)).toEqual(["official-letter", "invoice", "receipt", "invoice-receipt"]);
  });

  it("defaults to official letter and synced receipt total", () => {
    const en = createComposerFormState("en");
    expect(en.templateId).toBe("official-letter");
    expect(en.layout.includeCover).toBe(false);
    expect(en.layout.extraPages).toEqual([]);

    const lineSum = en.invoice.lines.reduce((s, line) => s + line.amount, 0);
    expect(lineSum).toBe(invoiceTotal);
    expect(en.receipt.amount).toBe(String(invoiceTotal));
    expect(en.invoice.lines).toHaveLength(invoiceLines.length);
  });

  it("honours initialTemplateId from deep links", () => {
    expect(createComposerFormState("fr", "receipt").templateId).toBe("receipt");
    expect(createComposerFormState("en", "invoice-receipt").templateId).toBe("invoice-receipt");
  });

  it("counts pages including cover and non-empty extra sheets only", () => {
    const base = createComposerFormState("en");

    expect(composerPageCount(withTemplate(base, "official-letter"))).toBe(1);
    expect(
      composerPageCount(
        withLayout(withTemplate(base, "official-letter"), { includeCover: true }),
      ),
    ).toBe(2);

    expect(composerPageCount(withTemplate(base, "invoice-receipt"))).toBe(2);
    expect(
      composerPageCount(
        withLayout(withTemplate(base, "invoice-receipt"), {
          includeCover: true,
          extraPages: ["", "Annex"],
        }),
      ),
    ).toBe(4);

    expect(
      composerPageCount(
        withLayout(withTemplate(base, "invoice"), { extraPages: ["", "  "] }),
      ),
    ).toBe(1);

    for (const id of ["letterhead", "proposal", "report"] as const) {
      expect(composerPageCount(withTemplate(base, id))).toBe(2);
      expect(
        composerPageCount(withLayout(withTemplate(base, id), { extraPages: ["More"] })),
      ).toBe(3);
    }
  });

  it("maps form fields to specimen overrides", () => {
    const state = createComposerFormState("en");
    const invoice = invoiceFormToOverrides({
      ...state.invoice,
      clientText: "A\n\nB",
      lines: [{ title: "Work", qty: "1", unit: "day", amount: 100 }],
    });
    expect(invoice.client).toEqual(["A", "B"]);
    expect(invoice.lines?.[0]?.amount).toBe(100);

    const receipt = receiptFormToOverrides({
      ...state.receipt,
      amount: "$6,800.00",
    });
    expect(receipt.amount).toBe(6800);

    const letter = letterFormToOverrides({
      ...state.letter,
      toLines: "One\nTwo",
      sections: [{ title: "T", body: "B", bullets: "a\nb" }],
    });
    expect(letter.to).toEqual(["One", "Two"]);
    expect(letter.sections?.[0]?.bullets).toEqual(["a", "b"]);
  });

  it("names PDF downloads per template and locale", () => {
    expect(composerDownloadName("official-letter", "fr")).toBe("OPEN_Official_Letter_fr.pdf");
    expect(composerDownloadName("invoice-receipt", "en")).toBe("OPEN_Invoice_Receipt_en.pdf");
  });

  it("exposes compose template labels in both locales", () => {
    for (const locale of locales) {
      const types = getDictionary(locale).documentComposer.templateTypes;
      for (const { id } of composerTemplateOrder) {
        expect(types[id]?.length).toBeGreaterThan(0);
      }
    }
  });
});
