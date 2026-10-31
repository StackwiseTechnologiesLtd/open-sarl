"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import {
  InvoiceSheet,
  LetterSheet,
  ReceiptSheet,
} from "@/components/brand/specimens";
import { DocumentA4Viewport } from "@/components/document-a4-viewport";
import { OpenDocumentSheet } from "@/components/open-document-sheet";
import { brandGuide } from "@/lib/brand-guide";
import {
  composerDownloadName,
  composerPageCount,
  composerTemplateOrder,
  createComposerFormState,
  isComposerTemplateId,
  invoiceFormToOverrides,
  letterFormToOverrides,
  proposalBullets,
  receiptFormToOverrides,
  reportBullets,
  type ComposerFormState,
  type ComposerTemplateId,
  type CoverForm,
} from "@/lib/document-composer";
import type { Dictionary, Locale } from "@/lib/i18n";

import { siteHost } from "@/lib/site";

const WEBSITE = siteHost;

function Field({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  const className = "doc-compose-field";
  return (
    <label className="doc-compose-label">
      <span>{label}</span>
      {multiline ? (
        <textarea className={className} rows={4} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className={className} type="text" value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

function CoverPage({ cover }: { cover: CoverForm }) {
  return (
    <OpenDocumentSheet variant="cover" website={WEBSITE} theme="corporate">
      <p className="doc-cover-kicker">{cover.kicker}</p>
      <h2 className="doc-cover-title">{cover.title}</h2>
      <p className="doc-cover-subtitle">{cover.subtitle}</p>
      <p className="doc-cover-lead">{cover.lead}</p>
    </OpenDocumentSheet>
  );
}

function ContinuationPage({ body }: { body: string }) {
  if (!body.trim()) return null;
  return (
    <OpenDocumentSheet variant="letter" website={WEBSITE} theme="corporate">
      <p className="doc-letter-prose whitespace-pre-line">{body}</p>
    </OpenDocumentSheet>
  );
}

function LetterMetaPreview({
  sampleDate,
  toLabel,
  toName,
  toCompany,
  toAddress,
}: {
  sampleDate: string;
  toLabel: string;
  toName: string;
  toCompany: string;
  toAddress: string;
}) {
  return (
    <div className="doc-letter-meta">
      <p className="doc-letter-date">{sampleDate}</p>
      <div className="doc-letter-recipient">
        <span className="doc-letter-to">{toLabel}</span>
        <p className="doc-letter-recipient-name">{toName}</p>
        <p className="doc-letter-recipient-org">{toCompany}</p>
        <p className="doc-letter-recipient-address">
          {toAddress.split("\n").map((line, index) => (
            <span key={`${index}-${line}`} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

function ComposerPreview({
  state,
  locale,
  dict,
}: {
  state: ComposerFormState;
  locale: Locale;
  dict: Dictionary;
}) {
  const shared = dict.documentTemplates;
  const copy = brandGuide[locale];
  const { templateId, layout } = state;
  const extras = layout.extraPages.map((body, index) => (
    <ContinuationPage key={`extra-${index}`} body={body} />
  ));

  const prefix: ReactNode[] = [];
  if (layout.includeCover && templateId !== "letterhead" && templateId !== "proposal" && templateId !== "report") {
    prefix.push(<CoverPage key="cover" cover={state.cover} />);
  }

  if (templateId === "official-letter") {
    return (
      <>
        {prefix}
        <LetterSheet copy={copy} data={letterFormToOverrides(state.letter)} />
        {extras}
      </>
    );
  }

  if (templateId === "invoice") {
    return (
      <>
        {prefix}
        <InvoiceSheet copy={copy} locale={locale} data={invoiceFormToOverrides(state.invoice)} />
        {extras}
      </>
    );
  }

  if (templateId === "receipt") {
    return (
      <>
        {prefix}
        <ReceiptSheet copy={copy} locale={locale} data={receiptFormToOverrides(state.receipt)} />
        {extras}
      </>
    );
  }

  if (templateId === "invoice-receipt") {
    const invoiceData = invoiceFormToOverrides(state.invoice);
    const total = (invoiceData.lines ?? []).reduce((sum, line) => sum + line.amount, 0);
    const receiptData = receiptFormToOverrides({
      ...state.receipt,
      amount: String(total || state.receipt.amount),
      invoiceNumber: state.invoice.number,
    });
    return (
      <>
        {prefix}
        <InvoiceSheet copy={copy} locale={locale} data={invoiceData} />
        <ReceiptSheet copy={copy} locale={locale} data={receiptData} />
        {extras}
      </>
    );
  }

  if (templateId === "letterhead") {
    const f = state.letterhead;
    return (
      <>
        <OpenDocumentSheet variant="cover" website={WEBSITE} theme="corporate">
          <p className="doc-cover-kicker">{shared.coverHint}</p>
          <h2 className="doc-cover-title">{f.coverTitle}</h2>
          <p className="doc-cover-subtitle">{f.coverSubtitle}</p>
          <p className="doc-cover-lead">{f.coverLead}</p>
        </OpenDocumentSheet>
        <OpenDocumentSheet variant="letter" website={WEBSITE} theme="corporate">
          <LetterMetaPreview
            sampleDate={f.sampleDate}
            toLabel={shared.toLabel}
            toName={f.toName}
            toCompany={f.toCompany}
            toAddress={f.toAddress}
          />
          <p className="doc-doc-subject">{f.subjectLabel}</p>
          <p className="doc-letter-prose">{f.salutation}</p>
          <p className="doc-letter-prose">{f.bodyParagraph1}</p>
          <p className="doc-letter-prose">{f.bodyParagraph2}</p>
          <p className="doc-letter-prose doc-letter-signature whitespace-pre-line">{f.signatureBlock}</p>
        </OpenDocumentSheet>
        {extras}
      </>
    );
  }

  if (templateId === "proposal") {
    const f = state.proposal;
    const bullets = proposalBullets(f);
    return (
      <>
        <OpenDocumentSheet variant="cover" website={WEBSITE}>
          <p className="doc-cover-kicker">{shared.coverHint}</p>
          <h2 className="doc-cover-title">{f.coverTitle}</h2>
          <p className="doc-cover-subtitle">{f.coverSubtitle}</p>
          <p className="doc-cover-lead">{f.coverLead}</p>
        </OpenDocumentSheet>
        <OpenDocumentSheet variant="letter" website={WEBSITE}>
          <LetterMetaPreview
            sampleDate={f.sampleDate}
            toLabel={shared.toLabel}
            toName={f.toName}
            toCompany={f.toCompany}
            toAddress={f.toAddress}
          />
          <p className="doc-doc-subject">{f.subjectLabel}</p>
          <p className="doc-letter-prose">{f.sectionObjectiveIntro}</p>
          <p className="doc-letter-section-title">{f.sectionObjectiveTitle}</p>
          <p className="doc-letter-prose">{f.sectionObjective}</p>
          <p className="doc-letter-section-title">{f.sectionScopeTitle}</p>
          <p className="doc-letter-prose">{f.sectionScopeBody}</p>
          <ul className="doc-list">
            {bullets.scope.map((item, index) => (
              <li key={`scope-${index}`}>{item}</li>
            ))}
          </ul>
          <p className="doc-letter-section-title">{f.sectionDeliverablesTitle}</p>
          <p className="doc-letter-prose">{f.sectionDeliverablesBody}</p>
          <ul className="doc-list">
            {bullets.deliverables.map((item, index) => (
              <li key={`del-${index}`}>{item}</li>
            ))}
          </ul>
          <p className="doc-letter-section-title">{f.sectionTermsTitle}</p>
          <p className="doc-letter-prose">{f.sectionTermsBody}</p>
        </OpenDocumentSheet>
        {extras}
      </>
    );
  }

  const f = state.report;
  const bullets = reportBullets(f);
  return (
    <>
      <OpenDocumentSheet variant="cover" website={WEBSITE}>
        <p className="doc-cover-kicker">{shared.coverHint}</p>
        <h2 className="doc-cover-title">{f.coverTitle}</h2>
        <p className="doc-cover-subtitle">{f.coverSubtitle}</p>
        <p className="doc-cover-lead">{f.coverLead}</p>
      </OpenDocumentSheet>
      <OpenDocumentSheet variant="letter" website={WEBSITE}>
        <p className="doc-doc-subject">{f.reportPeriod}</p>
        <p className="doc-letter-prose">{f.reportIntro}</p>
        <p className="doc-letter-section-title">{f.sectionSummaryTitle}</p>
        <p className="doc-letter-prose">{f.sectionSummaryBody}</p>
        <p className="doc-letter-section-title">{f.sectionFindingsTitle}</p>
        <p className="doc-letter-prose">{f.sectionFindingsBody}</p>
        <ul className="doc-list">
          {bullets.findings.map((item, index) => (
            <li key={`find-${index}`}>{item}</li>
          ))}
        </ul>
        <p className="doc-letter-section-title">{f.sectionNextTitle}</p>
        <p className="doc-letter-prose">{f.sectionNextBody}</p>
        <ul className="doc-list">
          {bullets.next.map((item, index) => (
            <li key={`next-${index}`}>{item}</li>
          ))}
        </ul>
      </OpenDocumentSheet>
      {extras}
    </>
  );
}

function InvoiceLineEditor({
  lines,
  onChange,
  labels,
}: {
  lines: import("@/lib/document-composer").InvoiceLineInput[];
  onChange: (lines: import("@/lib/document-composer").InvoiceLineInput[]) => void;
  labels: { designation: string; qty: string; unit: string; amount: string; add: string; remove: string };
}) {
  return (
    <div className="doc-compose-lines">
      {lines.map((line, index) => (
        <div key={index} className="doc-compose-line-row">
          <input
            className="doc-compose-field"
            aria-label={labels.designation}
            value={line.title}
            onChange={(e) => {
              const next = [...lines];
              next[index] = { ...line, title: e.target.value };
              onChange(next);
            }}
          />
          <input
            className="doc-compose-field doc-compose-field--narrow"
            aria-label={labels.qty}
            value={line.qty}
            onChange={(e) => {
              const next = [...lines];
              next[index] = { ...line, qty: e.target.value };
              onChange(next);
            }}
          />
          <input
            className="doc-compose-field doc-compose-field--narrow"
            aria-label={labels.unit}
            value={line.unit}
            onChange={(e) => {
              const next = [...lines];
              next[index] = { ...line, unit: e.target.value };
              onChange(next);
            }}
          />
          <input
            className="doc-compose-field doc-compose-field--narrow"
            aria-label={labels.amount}
            inputMode="decimal"
            value={String(line.amount)}
            onChange={(e) => {
              const next = [...lines];
              next[index] = { ...line, amount: Number.parseFloat(e.target.value) || 0 };
              onChange(next);
            }}
          />
          <button
            type="button"
            className="doc-compose-line-remove"
            disabled={lines.length <= 1}
            onClick={() => onChange(lines.filter((_, i) => i !== index))}
          >
            {labels.remove}
          </button>
        </div>
      ))}
      <button
        type="button"
        className="doc-compose-line-add"
        onClick={() => onChange([...lines, { title: "", qty: "1", unit: "", amount: 0 }])}
      >
        {labels.add}
      </button>
    </div>
  );
}

function ComposerForm({
  state,
  setState,
  dict,
  locale,
}: {
  state: ComposerFormState;
  setState: Dispatch<SetStateAction<ComposerFormState>>;
  dict: Dictionary;
  locale: Locale;
}) {
  const c = dict.documentComposer;
  const templateTypes = c.templateTypes;
  const copy = brandGuide[locale];
  const { templateId } = state;

  const setTemplate = (id: ComposerTemplateId) =>
    setState((prev) => ({ ...prev, templateId: id }));

  const patch = <K extends keyof ComposerFormState>(
    key: K,
    value: ComposerFormState[K] | ((prev: ComposerFormState[K]) => ComposerFormState[K]),
  ) => {
    setState((prev) => ({
      ...prev,
      [key]: typeof value === "function" ? (value as (p: ComposerFormState[K]) => ComposerFormState[K])(prev[key]) : value,
    }));
  };

  const usesOptionalCover =
    templateId === "official-letter" ||
    templateId === "invoice" ||
    templateId === "receipt" ||
    templateId === "invoice-receipt";

  const usesInvoiceFields = templateId === "invoice" || templateId === "invoice-receipt";
  const usesReceiptFields = templateId === "receipt" || templateId === "invoice-receipt";

  return (
    <div className="doc-compose-form">
      <fieldset className="doc-compose-template-picker">
        <legend>{c.templateLabel}</legend>
        <div className="doc-compose-template-grid">
          {composerTemplateOrder.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`doc-compose-template-btn${templateId === item.id ? " is-active" : ""}`}
              onClick={() => setTemplate(item.id)}
            >
              {templateTypes[item.id]}
            </button>
          ))}
        </div>
      </fieldset>

      {usesOptionalCover ? (
        <label className="doc-compose-check">
          <input
            type="checkbox"
            checked={state.layout.includeCover}
            onChange={(e) =>
              patch("layout", (p) => ({
                ...p,
                includeCover: e.target.checked,
              }))
            }
          />
          <span>{c.includeCover}</span>
        </label>
      ) : null}

      {usesOptionalCover && state.layout.includeCover ? (
        <>
          <p className="doc-compose-section">{c.coverPageTitle}</p>
          <Field label={c.coverKicker} value={state.cover.kicker} onChange={(v) => patch("cover", (p) => ({ ...p, kicker: v }))} />
          <Field label={c.coverTitle} value={state.cover.title} onChange={(v) => patch("cover", (p) => ({ ...p, title: v }))} />
          <Field label={c.coverSubtitle} value={state.cover.subtitle} onChange={(v) => patch("cover", (p) => ({ ...p, subtitle: v }))} />
          <Field label={c.coverLead} value={state.cover.lead} onChange={(v) => patch("cover", (p) => ({ ...p, lead: v }))} multiline />
        </>
      ) : null}

      {templateId === "official-letter" ? (
        <>
          <Field label={c.date} value={state.letter.date} onChange={(v) => patch("letter", (p) => ({ ...p, date: v }))} />
          <Field label={c.recipientBlock} value={state.letter.toLines} onChange={(v) => patch("letter", (p) => ({ ...p, toLines: v }))} multiline />
          <Field label={c.subject} value={state.letter.subject} onChange={(v) => patch("letter", (p) => ({ ...p, subject: v }))} />
          <Field label={c.body1} value={state.letter.intro} onChange={(v) => patch("letter", (p) => ({ ...p, intro: v }))} multiline />
          {state.letter.sections.map((section, index) => (
            <div key={index} className="doc-compose-section-block">
              <p className="doc-compose-section">
                {c.sectionTitle} {index + 1}
              </p>
              <Field
                label={c.sectionTitle}
                value={section.title}
                onChange={(v) =>
                  patch("letter", (p) => ({
                    ...p,
                    sections: p.sections.map((row, i) => (i === index ? { ...row, title: v } : row)),
                  }))
                }
              />
              <Field
                label={c.sectionBody}
                value={section.body}
                onChange={(v) =>
                  patch("letter", (p) => ({
                    ...p,
                    sections: p.sections.map((row, i) => (i === index ? { ...row, body: v } : row)),
                  }))
                }
                multiline
              />
              <Field
                label={c.bullets}
                value={section.bullets}
                onChange={(v) =>
                  patch("letter", (p) => ({
                    ...p,
                    sections: p.sections.map((row, i) => (i === index ? { ...row, bullets: v } : row)),
                  }))
                }
                multiline
              />
            </div>
          ))}
        </>
      ) : null}

      {usesInvoiceFields ? (
        <>
          <p className="doc-compose-section">{copy.invoiceTitle}</p>
          <Field label={copy.invoiceNumberLabel} value={state.invoice.number} onChange={(v) => patch("invoice", (p) => ({ ...p, number: v }))} />
          <Field label={copy.invoiceDateLabel} value={state.invoice.date} onChange={(v) => patch("invoice", (p) => ({ ...p, date: v }))} />
          <Field label={copy.invoiceDueLabel} value={state.invoice.due} onChange={(v) => patch("invoice", (p) => ({ ...p, due: v }))} />
          <Field label={copy.invoiceClientLabel} value={state.invoice.clientText} onChange={(v) => patch("invoice", (p) => ({ ...p, clientText: v }))} multiline />
          <p className="doc-compose-section">{c.lineItems}</p>
          <InvoiceLineEditor
            lines={state.invoice.lines}
            onChange={(lines) => patch("invoice", (p) => ({ ...p, lines }))}
            labels={{
              designation: copy.invoiceCols[0],
              qty: copy.invoiceCols[1],
              unit: copy.invoiceCols[2],
              amount: copy.invoiceCols[3],
              add: c.addLine,
              remove: c.removeLine,
            }}
          />
          <Field label={c.note} value={state.invoice.note} onChange={(v) => patch("invoice", (p) => ({ ...p, note: v }))} multiline />
        </>
      ) : null}

      {usesReceiptFields && templateId !== "invoice-receipt" ? (
        <>
          <p className="doc-compose-section">{copy.receiptTitle}</p>
          <Field label={copy.receiptNumberLabel} value={state.receipt.number} onChange={(v) => patch("receipt", (p) => ({ ...p, number: v }))} />
          <Field label={copy.invoiceDateLabel} value={state.receipt.date} onChange={(v) => patch("receipt", (p) => ({ ...p, date: v }))} />
          <Field label={copy.invoiceNumberLabel} value={state.receipt.invoiceNumber} onChange={(v) => patch("receipt", (p) => ({ ...p, invoiceNumber: v }))} />
          <Field label={copy.receiptFromLabel} value={state.receipt.clientText} onChange={(v) => patch("receipt", (p) => ({ ...p, clientText: v }))} multiline />
          <Field label={copy.receiptAmountLabel} value={state.receipt.amount} onChange={(v) => patch("receipt", (p) => ({ ...p, amount: v }))} />
          <Field label={copy.receiptForLabel} value={state.receipt.forText} onChange={(v) => patch("receipt", (p) => ({ ...p, forText: v }))} multiline />
          <Field label={c.place} value={state.receipt.place} onChange={(v) => patch("receipt", (p) => ({ ...p, place: v }))} />
          <Field label={c.signOff} value={state.receipt.signLabel} onChange={(v) => patch("receipt", (p) => ({ ...p, signLabel: v }))} />
        </>
      ) : null}

      {templateId === "invoice-receipt" ? (
        <>
          <p className="doc-compose-section">{copy.receiptTitle}</p>
          <Field label={copy.receiptNumberLabel} value={state.receipt.number} onChange={(v) => patch("receipt", (p) => ({ ...p, number: v }))} />
          <Field label={copy.receiptForLabel} value={state.receipt.forText} onChange={(v) => patch("receipt", (p) => ({ ...p, forText: v }))} multiline />
          <Field label={c.place} value={state.receipt.place} onChange={(v) => patch("receipt", (p) => ({ ...p, place: v }))} />
          <Field label={c.signOff} value={state.receipt.signLabel} onChange={(v) => patch("receipt", (p) => ({ ...p, signLabel: v }))} />
          <p className="doc-compose-hint">{c.invoiceReceiptHint}</p>
        </>
      ) : null}

      {templateId === "letterhead" ? (
        <>
          <Field label={c.coverTitle} value={state.letterhead.coverTitle} onChange={(v) => patch("letterhead", (p) => ({ ...p, coverTitle: v }))} />
          <Field label={c.coverSubtitle} value={state.letterhead.coverSubtitle} onChange={(v) => patch("letterhead", (p) => ({ ...p, coverSubtitle: v }))} multiline />
          <Field label={c.coverLead} value={state.letterhead.coverLead} onChange={(v) => patch("letterhead", (p) => ({ ...p, coverLead: v }))} multiline />
          <Field label={c.date} value={state.letterhead.sampleDate} onChange={(v) => patch("letterhead", (p) => ({ ...p, sampleDate: v }))} />
          <Field label={c.recipientName} value={state.letterhead.toName} onChange={(v) => patch("letterhead", (p) => ({ ...p, toName: v }))} />
          <Field label={c.recipientOrg} value={state.letterhead.toCompany} onChange={(v) => patch("letterhead", (p) => ({ ...p, toCompany: v }))} />
          <Field label={c.recipientAddress} value={state.letterhead.toAddress} onChange={(v) => patch("letterhead", (p) => ({ ...p, toAddress: v }))} multiline />
          <Field label={c.subject} value={state.letterhead.subjectLabel} onChange={(v) => patch("letterhead", (p) => ({ ...p, subjectLabel: v }))} />
          <Field label={c.salutation} value={state.letterhead.salutation} onChange={(v) => patch("letterhead", (p) => ({ ...p, salutation: v }))} />
          <Field label={c.body1} value={state.letterhead.bodyParagraph1} onChange={(v) => patch("letterhead", (p) => ({ ...p, bodyParagraph1: v }))} multiline />
          <Field label={c.body2} value={state.letterhead.bodyParagraph2} onChange={(v) => patch("letterhead", (p) => ({ ...p, bodyParagraph2: v }))} multiline />
          <Field label={c.signature} value={state.letterhead.signatureBlock} onChange={(v) => patch("letterhead", (p) => ({ ...p, signatureBlock: v }))} multiline />
        </>
      ) : null}

      {templateId === "proposal" ? (
        <>
          <Field label={c.coverTitle} value={state.proposal.coverTitle} onChange={(v) => patch("proposal", (p) => ({ ...p, coverTitle: v }))} />
          <Field label={c.coverSubtitle} value={state.proposal.coverSubtitle} onChange={(v) => patch("proposal", (p) => ({ ...p, coverSubtitle: v }))} />
          <Field label={c.coverLead} value={state.proposal.coverLead} onChange={(v) => patch("proposal", (p) => ({ ...p, coverLead: v }))} multiline />
          <Field label={c.date} value={state.proposal.sampleDate} onChange={(v) => patch("proposal", (p) => ({ ...p, sampleDate: v }))} />
          <Field label={c.recipientName} value={state.proposal.toName} onChange={(v) => patch("proposal", (p) => ({ ...p, toName: v }))} />
          <Field label={c.recipientOrg} value={state.proposal.toCompany} onChange={(v) => patch("proposal", (p) => ({ ...p, toCompany: v }))} />
          <Field label={c.subject} value={state.proposal.subjectLabel} onChange={(v) => patch("proposal", (p) => ({ ...p, subjectLabel: v }))} multiline />
          <Field label={c.body1} value={state.proposal.sectionObjectiveIntro} onChange={(v) => patch("proposal", (p) => ({ ...p, sectionObjectiveIntro: v }))} multiline />
          <Field label={c.sectionTitle} value={state.proposal.sectionObjectiveTitle} onChange={(v) => patch("proposal", (p) => ({ ...p, sectionObjectiveTitle: v }))} />
          <Field label={c.sectionBody} value={state.proposal.sectionObjective} onChange={(v) => patch("proposal", (p) => ({ ...p, sectionObjective: v }))} multiline />
          <Field label={c.sectionTitle} value={state.proposal.sectionScopeTitle} onChange={(v) => patch("proposal", (p) => ({ ...p, sectionScopeTitle: v }))} />
          <Field label={c.sectionBody} value={state.proposal.sectionScopeBody} onChange={(v) => patch("proposal", (p) => ({ ...p, sectionScopeBody: v }))} multiline />
          <Field label={c.bullets} value={state.proposal.sectionScopeBullets} onChange={(v) => patch("proposal", (p) => ({ ...p, sectionScopeBullets: v }))} multiline />
          <Field label={c.sectionTitle} value={state.proposal.sectionDeliverablesTitle} onChange={(v) => patch("proposal", (p) => ({ ...p, sectionDeliverablesTitle: v }))} />
          <Field label={c.sectionBody} value={state.proposal.sectionDeliverablesBody} onChange={(v) => patch("proposal", (p) => ({ ...p, sectionDeliverablesBody: v }))} multiline />
          <Field label={c.bullets} value={state.proposal.sectionDeliverablesBullets} onChange={(v) => patch("proposal", (p) => ({ ...p, sectionDeliverablesBullets: v }))} multiline />
          <Field label={c.sectionTitle} value={state.proposal.sectionTermsTitle} onChange={(v) => patch("proposal", (p) => ({ ...p, sectionTermsTitle: v }))} />
          <Field label={c.sectionBody} value={state.proposal.sectionTermsBody} onChange={(v) => patch("proposal", (p) => ({ ...p, sectionTermsBody: v }))} multiline />
        </>
      ) : null}

      {templateId === "report" ? (
        <>
          <Field label={c.coverTitle} value={state.report.coverTitle} onChange={(v) => patch("report", (p) => ({ ...p, coverTitle: v }))} />
          <Field label={c.coverSubtitle} value={state.report.coverSubtitle} onChange={(v) => patch("report", (p) => ({ ...p, coverSubtitle: v }))} />
          <Field label={c.coverLead} value={state.report.coverLead} onChange={(v) => patch("report", (p) => ({ ...p, coverLead: v }))} multiline />
          <Field label={c.subject} value={state.report.reportPeriod} onChange={(v) => patch("report", (p) => ({ ...p, reportPeriod: v }))} />
          <Field label={c.body1} value={state.report.reportIntro} onChange={(v) => patch("report", (p) => ({ ...p, reportIntro: v }))} multiline />
          <Field label={c.sectionTitle} value={state.report.sectionSummaryTitle} onChange={(v) => patch("report", (p) => ({ ...p, sectionSummaryTitle: v }))} />
          <Field label={c.sectionBody} value={state.report.sectionSummaryBody} onChange={(v) => patch("report", (p) => ({ ...p, sectionSummaryBody: v }))} multiline />
          <Field label={c.sectionTitle} value={state.report.sectionFindingsTitle} onChange={(v) => patch("report", (p) => ({ ...p, sectionFindingsTitle: v }))} />
          <Field label={c.sectionBody} value={state.report.sectionFindingsBody} onChange={(v) => patch("report", (p) => ({ ...p, sectionFindingsBody: v }))} multiline />
          <Field label={c.bullets} value={state.report.sectionFindingsBullets} onChange={(v) => patch("report", (p) => ({ ...p, sectionFindingsBullets: v }))} multiline />
          <Field label={c.sectionTitle} value={state.report.sectionNextTitle} onChange={(v) => patch("report", (p) => ({ ...p, sectionNextTitle: v }))} />
          <Field label={c.sectionBody} value={state.report.sectionNextBody} onChange={(v) => patch("report", (p) => ({ ...p, sectionNextBody: v }))} multiline />
          <Field label={c.bullets} value={state.report.sectionNextBullets} onChange={(v) => patch("report", (p) => ({ ...p, sectionNextBullets: v }))} multiline />
        </>
      ) : null}

      <div className="doc-compose-section-block">
        <p className="doc-compose-section">{c.extraPagesTitle}</p>
        <p className="doc-compose-hint">{c.extraPagesHint}</p>
        {state.layout.extraPages.map((body, index) => (
          <div key={index} className="doc-compose-extra-page">
            <Field
              label={`${c.extraPageLabel} ${index + 1}`}
              value={body}
              onChange={(v) =>
                patch("layout", (p) => ({
                  ...p,
                  extraPages: p.extraPages.map((row, i) => (i === index ? v : row)),
                }))
              }
              multiline
            />
            <button
              type="button"
              className="doc-compose-line-remove"
              onClick={() =>
                patch("layout", (p) => ({
                  ...p,
                  extraPages: p.extraPages.filter((_, i) => i !== index),
                }))
              }
            >
              {c.removeLine}
            </button>
          </div>
        ))}
        <button
          type="button"
          className="doc-compose-line-add"
          onClick={() => patch("layout", (p) => ({ ...p, extraPages: [...p.extraPages, ""] }))}
        >
          {c.addExtraPage}
        </button>
      </div>
    </div>
  );
}

export function DocumentComposerPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const initialTemplateId = type && isComposerTemplateId(type) ? type : undefined;
  return (
    <DocumentComposerPageInner
      key={initialTemplateId ?? "default"}
      locale={locale}
      dict={dict}
      initialTemplateId={initialTemplateId}
    />
  );
}

function DocumentComposerPageInner({
  locale,
  dict,
  initialTemplateId,
}: {
  locale: Locale;
  dict: Dictionary;
  initialTemplateId?: ComposerTemplateId;
}) {
  const [state, setState] = useState(() => createComposerFormState(locale, initialTemplateId));
  const c = dict.documentComposer;
  const v = dict.documentViewer;

  const downloadName = useMemo(
    () => composerDownloadName(state.templateId, locale),
    [state.templateId, locale],
  );

  const pageCount = composerPageCount(state);
  const pageCountHint = c.pageCountHint.replace("{count}", String(pageCount));

  return (
    <main className="page-main doc-compose-page">
      <div className="doc-compose-shell">
        <header className="doc-compose-header">
          <div>
            <p className="doc-compose-kicker">{c.kicker}</p>
            <h1 className="doc-compose-title">{c.title}</h1>
            <p className="doc-compose-lead">{c.lead}</p>
          </div>
          <Link href={`/${locale}/branding#documents`} className="doc-compose-back">
            {c.backToDocuments}
          </Link>
        </header>

        <div className="doc-compose-layout">
          <section className="doc-compose-panel" aria-label={c.formAria}>
            <h2 className="doc-compose-panel-title">{c.formTitle}</h2>
            <ComposerForm state={state} setState={setState} dict={dict} locale={locale} />
          </section>

          <section className="doc-compose-preview-wrap" aria-label={c.previewAria}>
            <DocumentA4Viewport
              title={c.previewTitle}
              downloadLabel={v.downloadWebPdf}
              downloadFileName={downloadName}
              printLabel={dict.documentTemplates.print}
              pageCountHint={pageCountHint}
            >
              <ComposerPreview state={state} locale={locale} dict={dict} />
            </DocumentA4Viewport>
          </section>
        </div>
      </div>
    </main>
  );
}
