"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LanguageSwitch } from "@/components/language-switch";
import { Logo } from "@/components/logo";
import { ExportBar } from "@/components/brand/export-bar";
import {
  Board,
  CardSheet,
  CoverSheet,
  EnvelopeSheet,
  InvoiceSheet,
  LetterSheet,
  ReceiptSheet,
} from "@/components/brand/specimens";
import {
  brandColors,
  brandGuide,
  brandSectionIds,
  brandSupport,
  contrastPairs,
  contrastRatio,
  logoHeights,
  type BrandSectionId,
} from "@/lib/brand-guide";
import type { Locale } from "@/lib/i18n";

export function BrandGuide({ locale }: { locale: Locale }) {
  const copy = brandGuide[locale];
  const pathname = usePathname();
  const [theme, setTheme] = useState<"paper" | "ink">("paper");
  const [active, setActive] = useState<BrandSectionId>("introduction");

  useEffect(() => {
    const nodes = brandSectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node instanceof HTMLElement);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = visible?.target.id;
        if (id && brandSectionIds.includes(id as BrandSectionId)) {
          setActive(id as BrandSectionId);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.15, 0.4] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  function go(id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  const ink = theme === "ink";
  const exportLabels = {
    svg: copy.exportSvg,
    png: copy.exportPng,
    copy: copy.exportCopy,
    copied: copy.exportCopied,
  };

  return (
    <div className="brand-guide" data-theme={theme}>
      <header className="brand-bar">
        <a className="brand-bar-brand" href={`/${locale}`}>
          <Logo tone={ink ? "light" : "brand"} height={28} />
          <span>{copy.metaTitle}</span>
        </a>
        <nav className="brand-nav" aria-label={copy.metaTitle}>
          {brandSectionIds.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              onClick={(event) => {
                event.preventDefault();
                go(id);
              }}
            >
              {copy.nav[id]}
            </a>
          ))}
        </nav>
        <div className="brand-bar-tools">
          <button
            type="button"
            className="brand-theme"
            aria-pressed={ink}
            onClick={() => setTheme(ink ? "paper" : "ink")}
          >
            {ink ? copy.themeToPaper : copy.themeToInk}
          </button>
          <LanguageSwitch
            locale={locale}
            pathname={pathname}
            hash=""
            label={copy.languageLabel}
            tone={ink ? "light" : "default"}
          />
          <a className="brand-home" href={`/${locale}`}>
            {copy.home}
          </a>
        </div>
      </header>

      <main className="brand-main">
        <section className="brand-section" id="introduction">
          <div className="brand-hero">
            <p className="brand-kicker">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p className="brand-lead">{copy.lead}</p>
          </div>
          <div className="pair">
            <Board width={794} height={1123} min={280} label={copy.coverLight}>
              <CoverSheet />
            </Board>
            <Board width={794} height={1123} min={280} label={copy.coverNavy}>
              <CoverSheet navy />
            </Board>
          </div>
          <p className="brand-rule">{copy.coverCaption}</p>
          <div className="brand-prose">
            <h2>{copy.introTitle}</h2>
            {copy.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="brand-section" id="marks">
          <p className="brand-kicker">02</p>
          <h2>{copy.marksTitle}</h2>
          <p className="brand-prose">{copy.marksBody}</p>
          <div className="lockup-row">
            <figure className="lockup">
              <Logo unbounded className="cover-logo-img" />
              <figcaption className="board-caption">{copy.marksLight}</figcaption>
              <ExportBar kind="logo" filename="open-logo" labels={exportLabels} />
            </figure>
            <figure className="lockup is-navy">
              <Logo unbounded tone="light" className="cover-logo-img" />
              <figcaption className="board-caption" style={{ color: "#d5d8ef" }}>
                {copy.marksNavy}
              </figcaption>
              <ExportBar kind="logo-white" filename="open-logo-white" labels={exportLabels} />
            </figure>
            <figure className="lockup">
              <Logo variant="mark" height={120} />
              <figcaption className="board-caption">{copy.markAlone}</figcaption>
              <ExportBar kind="mark" filename="open-mark" labels={exportLabels} />
            </figure>
          </div>
          <h3 className="brand-rule">{copy.clearTitle}</h3>
          <p className="brand-prose">{copy.clearBody}</p>
          <h3 className="brand-rule">{copy.scaleTitle}</h3>
          <p className="brand-prose">{copy.scaleBody}</p>
          <ol className="scale-list">
            {logoHeights.map((height) => (
              <li key={height}>
                <span>{height} px</span>
                <Logo height={height} />
              </li>
            ))}
          </ol>
        </section>

        <section className="brand-section" id="color">
          <p className="brand-kicker">03</p>
          <h2>{copy.colorTitle}</h2>
          <p className="brand-prose">{copy.colorBody}</p>
          <div className="swatches">
            {brandColors.map((color) => (
              <article key={color.id} className="swatch">
                <span className="swatch-chip" style={{ background: color.hex }} />
                <strong>{copy.colorNames[color.id as keyof typeof copy.colorNames]}</strong>
                <span>{color.hex}</span>
                <span>RGB {color.rgb}</span>
                <span>CMYK {color.cmyk}</span>
              </article>
            ))}
          </div>
          <div className="support-row">
            {brandSupport.map((color) => (
              <p key={color.id}>
                <span className="support-chip" style={{ background: color.hex }} />
                <span>
                  {copy.colorNames[color.id as keyof typeof copy.colorNames]} {color.hex}
                  <br />
                  RGB {color.rgb} · CMYK {color.cmyk}
                </span>
              </p>
            ))}
          </div>
          <h3 className="brand-rule">{copy.shareTitle}</h3>
          <p className="brand-prose">{copy.shareBody}</p>
          <div className="share" aria-hidden="true">
            {brandColors.map((color) => (
              <span
                key={color.id}
                className={color.id === "paper" ? "is-paper" : undefined}
                style={{ width: `${color.share}%`, background: color.hex }}
              >
                {color.share >= 20 ? `${color.share}%` : ""}
              </span>
            ))}
          </div>
          <h3 className="brand-rule">{copy.contrastTitle}</h3>
          <ul className="contrast-list">
            {contrastPairs.map((pair) => {
              const ratio = contrastRatio(pair.fg, pair.bg);
              const pass = ratio >= 7;
              return (
                <li key={`${pair.fg}-${pair.bg}`}>
                  <span className="contrast-sample" style={{ color: pair.fg, background: pair.bg }}>
                    Aa
                  </span>
                  <span className="contrast-meta">
                    <b>
                      {ratio.toFixed(1)}:1 {pass ? copy.contrastPass : copy.contrastFail}
                    </b>
                    {pair.fg} on {pair.bg}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="brand-prose">{copy.contrastNote}</p>
        </section>

        <section className="brand-section" id="type">
          <p className="brand-kicker">04</p>
          <h2>{copy.typeTitle}</h2>
          <div className="type-faces">
            <article>
              <p className="face-display">{copy.typeDisplay}</p>
              <p>{copy.typeDisplayRole}</p>
            </article>
            <article>
              <p className="face-body">{copy.typeBody}</p>
              <p>{copy.typeBodyRole}</p>
            </article>
            <article>
              <p className="face-label">{copy.typeLabel}</p>
              <p>{copy.typeLabelRole}</p>
            </article>
          </div>
          <p className="brand-rule">{copy.typeWordmark}</p>
          <ol className="type-scale">
            {copy.scaleItems.map((item, index) => (
              <li key={item.name}>
                <small>
                  {index + 1}. {item.name}
                  <br />
                  {item.face}
                </small>
                <span style={{ fontFamily: index === 2 ? "var(--font-body-md)" : index === 3 ? "var(--font-label-md)" : "var(--font-display-lg)", fontWeight: index === 3 ? 500 : 600 }}>
                  {item.sample}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="brand-section" id="voice">
          <p className="brand-kicker">05</p>
          <h2>{copy.voiceTitle}</h2>
          <p className="brand-prose">{copy.voiceLead}</p>
          <table className="voice-table">
            <tbody>
              {copy.voiceRows.map((row) => (
                <tr key={row.rule}>
                  <th scope="row">{row.rule}</th>
                  <td>
                    <span>{copy.say}</span>
                    {row.say}
                  </td>
                  <td>
                    <span>{copy.avoid}</span>
                    {row.avoid}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="brand-section" id="envelope">
          <p className="brand-kicker">06</p>
          <h2>{copy.envelopeTitle}</h2>
          <p className="brand-prose">{copy.envelopeBody}</p>
          <Board width={1100} height={630} min={560} label={copy.envelopeMeta}>
            <EnvelopeSheet label={copy.envelopeTitle} />
          </Board>
          <ExportBar kind="envelope" filename="open-envelope" labels={exportLabels} />
        </section>

        <section className="brand-section" id="letter">
          <p className="brand-kicker">07</p>
          <h2>{copy.letterTitle}</h2>
          <p className="brand-prose">{copy.letterBody}</p>
          <div className="stack-pair" style={{ gridTemplateColumns: "minmax(0, 760px)" }}>
            <Board width={794} height={1123} min={640} label={copy.letterMeta}>
              <LetterSheet copy={copy} />
            </Board>
          </div>
        </section>

        <section className="brand-section" id="billing">
          <p className="brand-kicker">08</p>
          <h2>{copy.billingTitle}</h2>
          <p className="brand-prose">{copy.billingBody}</p>
          <div className="stack-pair">
            <Board width={794} height={1123} min={520} label={copy.invoiceMeta}>
              <InvoiceSheet copy={copy} locale={locale} />
            </Board>
            <Board width={794} height={1123} min={520} label={copy.receiptMeta}>
              <ReceiptSheet copy={copy} locale={locale} />
            </Board>
          </div>
        </section>

        <section className="brand-section" id="cards">
          <p className="brand-kicker">09</p>
          <h2>{copy.cardsTitle}</h2>
          <p className="brand-prose">{copy.cardsBody}</p>
          <p className="brand-rule">{copy.cardsRule}</p>
          <div className="card-grid">
            <Board width={680} height={440} label={`${copy.cardPaperIcons} · ${copy.cardMeta}`}>
              <CardSheet copy={copy} variant="icons" />
            </Board>
            <Board width={680} height={440} label={`${copy.cardPaperAddress} · ${copy.cardMeta}`}>
              <CardSheet copy={copy} variant="address" />
            </Board>
            <Board width={680} height={440} label={`${copy.cardNavyBack} · ${copy.cardMeta}`}>
              <CardSheet copy={copy} variant="back" />
            </Board>
            <Board width={680} height={440} label={`${copy.cardNavyFront} · ${copy.cardMeta}`}>
              <CardSheet copy={copy} variant="front" />
            </Board>
          </div>
        </section>

        <section className="brand-section" id="files">
          <p className="brand-kicker">10</p>
          <h2>{copy.filesTitle}</h2>
          <p className="brand-prose">{copy.filesBody}</p>
          <ul className="file-list">
            {copy.files.map((file) => (
              <li key={file.href}>
                <a href={file.href} download>
                  {file.label}
                </a>
              </li>
            ))}
          </ul>
          <ExportBar kind="envelope" filename="open-envelope" labels={exportLabels} />
        </section>
      </main>
    </div>
  );
}
