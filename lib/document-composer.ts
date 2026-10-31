import { brandGuide, invoiceLines } from "@/lib/brand-guide";
import type { DocumentTemplateId } from "@/lib/document-templates";
import { getDictionary, type Locale } from "@/lib/i18n";

export type InvoiceLineInput = {
  title: string;
  qty: string;
  unit: string;
  amount: number;
};

export type InvoiceOverrides = {
  number?: string;
  date?: string;
  due?: string;
  client?: string[];
  lines?: InvoiceLineInput[];
  note?: string;
};

export type ReceiptOverrides = {
  number?: string;
  date?: string;
  invoiceNumber?: string;
  client?: string[];
  amount?: number;
  forText?: string;
  place?: string;
  signLabel?: string;
};

export type LetterOverrides = {
  date?: string;
  to?: string[];
  subject?: string;
  intro?: string;
  sections?: { title: string; body: string; bullets?: string[] }[];
};

export type ComposerTemplateId = DocumentTemplateId | "cover" | "letter" | "invoice" | "receipt";

export type ComposerTemplateOption = {
  id: ComposerTemplateId;
  labelKey: ComposerTemplateId;
};

export const composerTemplateOrder: ComposerTemplateOption[] = [
  { id: "cover", labelKey: "cover" },
  { id: "letter", labelKey: "letter" },
  { id: "letterhead", labelKey: "letterhead" },
  { id: "proposal", labelKey: "proposal" },
  { id: "report", labelKey: "report" },
  { id: "invoice", labelKey: "invoice" },
  { id: "receipt", labelKey: "receipt" },
];

export type CoverForm = {
  kicker: string;
  title: string;
  subtitle: string;
  lead: string;
};

export type LetterSectionForm = {
  title: string;
  body: string;
  bullets: string;
};

export type OfficialLetterForm = {
  date: string;
  toLines: string;
  subject: string;
  intro: string;
  sections: LetterSectionForm[];
};

export type LetterheadForm = {
  coverTitle: string;
  coverSubtitle: string;
  coverLead: string;
  sampleDate: string;
  toName: string;
  toCompany: string;
  toAddress: string;
  subjectLabel: string;
  salutation: string;
  bodyParagraph1: string;
  bodyParagraph2: string;
  signatureBlock: string;
};

export type ProposalForm = {
  coverTitle: string;
  coverSubtitle: string;
  coverLead: string;
  sampleDate: string;
  toName: string;
  toCompany: string;
  toAddress: string;
  subjectLabel: string;
  sectionObjectiveIntro: string;
  sectionObjectiveTitle: string;
  sectionObjective: string;
  sectionScopeTitle: string;
  sectionScopeBody: string;
  sectionScopeBullets: string;
  sectionDeliverablesTitle: string;
  sectionDeliverablesBody: string;
  sectionDeliverablesBullets: string;
  sectionTermsTitle: string;
  sectionTermsBody: string;
};

export type ReportForm = {
  coverTitle: string;
  coverSubtitle: string;
  coverLead: string;
  reportPeriod: string;
  reportIntro: string;
  sectionSummaryTitle: string;
  sectionSummaryBody: string;
  sectionFindingsTitle: string;
  sectionFindingsBody: string;
  sectionFindingsBullets: string;
  sectionNextTitle: string;
  sectionNextBody: string;
  sectionNextBullets: string;
};

export type InvoiceForm = {
  number: string;
  date: string;
  due: string;
  clientText: string;
  note: string;
  lines: InvoiceLineInput[];
};

export type ReceiptForm = {
  number: string;
  date: string;
  invoiceNumber: string;
  clientText: string;
  amount: string;
  forText: string;
  place: string;
  signLabel: string;
};

export type ComposerFormState = {
  templateId: ComposerTemplateId;
  cover: CoverForm;
  letter: OfficialLetterForm;
  letterhead: LetterheadForm;
  proposal: ProposalForm;
  report: ReportForm;
  invoice: InvoiceForm;
  receipt: ReceiptForm;
};

function bulletsToText(items: readonly string[]) {
  return items.join("\n");
}

function textToBullets(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function createComposerFormState(locale: Locale): ComposerFormState {
  const dict = getDictionary(locale);
  const shared = dict.documentTemplates;
  const kinds = shared.kinds;
  const copy = brandGuide[locale];

  const invoiceDefaultLines = invoiceLines.map((line) => ({
    title: line[locale].title,
    unit: line[locale].unit,
    qty: line.qty,
    amount: line.amount,
  }));

  const letterSections = copy.letterSections.map((section) => ({
    title: section.title,
    body: section.body,
    bullets: "bullets" in section && section.bullets ? bulletsToText(section.bullets) : "",
  }));

  return {
    templateId: "cover",
    cover: {
      kicker: shared.coverHint,
      title: kinds.letterhead.coverTitle,
      subtitle: kinds.letterhead.coverSubtitle,
      lead: kinds.letterhead.coverLead,
    },
    letter: {
      date: copy.letterDate,
      toLines: copy.letterTo.join("\n"),
      subject: copy.letterSubject,
      intro: copy.letterIntro,
      sections: letterSections,
    },
    letterhead: {
      coverTitle: kinds.letterhead.coverTitle,
      coverSubtitle: kinds.letterhead.coverSubtitle,
      coverLead: kinds.letterhead.coverLead,
      sampleDate: shared.sampleDate,
      toName: shared.toName,
      toCompany: shared.toCompany,
      toAddress: shared.toAddress,
      subjectLabel: kinds.letterhead.subjectLabel,
      salutation: kinds.letterhead.salutation,
      bodyParagraph1: kinds.letterhead.bodyParagraph1,
      bodyParagraph2: kinds.letterhead.bodyParagraph2,
      signatureBlock: kinds.letterhead.signatureBlock,
    },
    proposal: {
      coverTitle: kinds.proposal.coverTitle,
      coverSubtitle: kinds.proposal.coverSubtitle,
      coverLead: kinds.proposal.coverLead,
      sampleDate: shared.sampleDate,
      toName: kinds.proposal.toName,
      toCompany: kinds.proposal.toCompany,
      toAddress: shared.toAddress,
      subjectLabel: kinds.proposal.subjectLabel,
      sectionObjectiveIntro: kinds.proposal.sectionObjectiveIntro,
      sectionObjectiveTitle: kinds.proposal.sectionObjectiveTitle,
      sectionObjective: kinds.proposal.sectionObjective,
      sectionScopeTitle: kinds.proposal.sectionScopeTitle,
      sectionScopeBody: kinds.proposal.sectionScopeBody,
      sectionScopeBullets: bulletsToText(kinds.proposal.sectionScopeBullets),
      sectionDeliverablesTitle: kinds.proposal.sectionDeliverablesTitle,
      sectionDeliverablesBody: kinds.proposal.sectionDeliverablesBody,
      sectionDeliverablesBullets: bulletsToText(kinds.proposal.sectionDeliverablesBullets),
      sectionTermsTitle: kinds.proposal.sectionTermsTitle,
      sectionTermsBody: kinds.proposal.sectionTermsBody,
    },
    report: {
      coverTitle: kinds.report.coverTitle,
      coverSubtitle: kinds.report.coverSubtitle,
      coverLead: kinds.report.coverLead,
      reportPeriod: kinds.report.reportPeriod,
      reportIntro: kinds.report.reportIntro,
      sectionSummaryTitle: kinds.report.sectionSummaryTitle,
      sectionSummaryBody: kinds.report.sectionSummaryBody,
      sectionFindingsTitle: kinds.report.sectionFindingsTitle,
      sectionFindingsBody: kinds.report.sectionFindingsBody,
      sectionFindingsBullets: bulletsToText(kinds.report.sectionFindingsBullets),
      sectionNextTitle: kinds.report.sectionNextTitle,
      sectionNextBody: kinds.report.sectionNextBody,
      sectionNextBullets: bulletsToText(kinds.report.sectionNextBullets),
    },
    invoice: {
      number: copy.invoiceNumber,
      date: copy.letterDate,
      due: copy.invoiceDue,
      clientText: copy.invoiceClient.join("\n"),
      note: copy.invoiceNote,
      lines: invoiceDefaultLines,
    },
    receipt: {
      number: copy.receiptNumber,
      date: copy.letterDate,
      invoiceNumber: copy.invoiceNumber,
      clientText: copy.invoiceClient.join("\n"),
      amount: String(invoiceDefaultLines.reduce((s, l) => s + l.amount, 0)),
      forText: copy.receiptFor,
      place: copy.receiptPlace,
      signLabel: copy.receiptSign,
    },
  };
}

export function invoiceFormToOverrides(form: InvoiceForm): InvoiceOverrides {
  return {
    number: form.number,
    date: form.date,
    due: form.due,
    client: form.clientText.split("\n").map((l) => l.trim()).filter(Boolean),
    lines: form.lines,
    note: form.note,
  };
}

export function receiptFormToOverrides(form: ReceiptForm): ReceiptOverrides {
  const amount = Number.parseFloat(form.amount.replace(/[^\d.-]/g, "")) || 0;
  return {
    number: form.number,
    date: form.date,
    invoiceNumber: form.invoiceNumber,
    client: form.clientText.split("\n").map((l) => l.trim()).filter(Boolean),
    amount,
    forText: form.forText,
    place: form.place,
    signLabel: form.signLabel,
  };
}

export function proposalBullets(form: ProposalForm) {
  return {
    scope: textToBullets(form.sectionScopeBullets),
    deliverables: textToBullets(form.sectionDeliverablesBullets),
  };
}

export function reportBullets(form: ReportForm) {
  return {
    findings: textToBullets(form.sectionFindingsBullets),
    next: textToBullets(form.sectionNextBullets),
  };
}

export function letterFormToOverrides(form: OfficialLetterForm) {
  return {
    date: form.date,
    to: form.toLines.split("\n").map((l) => l.trim()).filter(Boolean),
    subject: form.subject,
    intro: form.intro,
    sections: form.sections.map((section) => ({
      title: section.title,
      body: section.body,
      bullets: textToBullets(section.bullets),
    })),
  };
}

export function composerDownloadName(templateId: ComposerTemplateId, locale: Locale) {
  const prefix: Record<ComposerTemplateId, string> = {
    cover: "OPEN_Cover",
    letter: "OPEN_Letter",
    letterhead: "OPEN_Letterhead",
    proposal: "OPEN_Proposal",
    report: "OPEN_Report",
    invoice: "OPEN_Invoice",
    receipt: "OPEN_Receipt",
  };
  return `${prefix[templateId]}_${locale}.pdf`;
}
