import type { Locale } from "@/lib/i18n";

export const brandSectionIds = [
  "introduction",
  "marks",
  "color",
  "type",
  "voice",
  "envelope",
  "letter",
  "billing",
  "cards",
  "files",
] as const;

export type BrandSectionId = (typeof brandSectionIds)[number];

export const navy = "#000068";
export const watermark = "#4C5098";
export const ink = "#1C2430";
export const paper = "#FFFFFF";
export const mist = "#E7E8EC";
export const windowNavy = "#343480";

export type BrandColor = {
  id: string;
  hex: string;
  rgb: string;
  cmyk: string;
  share: number;
};

export const brandColors: BrandColor[] = [
  { id: "navy", hex: navy, rgb: "0, 0, 104", cmyk: "100, 100, 0, 59", share: 38 },
  { id: "paper", hex: paper, rgb: "255, 255, 255", cmyk: "0, 0, 0, 0", share: 48 },
  { id: "watermark", hex: watermark, rgb: "76, 80, 152", cmyk: "50, 47, 0, 40", share: 8 },
  { id: "ink", hex: ink, rgb: "28, 36, 48", cmyk: "42, 25, 0, 81", share: 6 },
];

export const brandSupport = [
  { id: "mist", hex: mist, rgb: "231, 232, 236", cmyk: "2, 2, 0, 7" },
  { id: "window", hex: windowNavy, rgb: "52, 52, 128", cmyk: "59, 59, 0, 50" },
];

function channel(value: number) {
  const s = value / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

export function contrastRatio(foreground: string, background: string) {
  const lum = (hex: string) => {
    const n = Number.parseInt(hex.slice(1), 16);
    const r = channel((n >> 16) & 255);
    const g = channel((n >> 8) & 255);
    const b = channel(n & 255);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const a = lum(foreground);
  const b = lum(background);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

export const contrastPairs = [
  { fg: navy, bg: paper },
  { fg: paper, bg: navy },
  { fg: ink, bg: paper },
  { fg: paper, bg: ink },
  { fg: watermark, bg: navy },
  { fg: paper, bg: mist },
] as const;

export const logoHeights = [72, 60, 48, 38, 30, 24, 18] as const;

/** Business card artwork ratio (source files). */
export const cardArtboard = { width: 6248, height: 3595 } as const;

export const cardBoard = {
  width: 625,
  height: Math.round((625 * cardArtboard.height) / cardArtboard.width),
} as const;

export const cardIdentity = {
  name: "Ir DEAN ERIC MULIMBI",
  title: "Dir. Gérant / CEO",
  email: "deancin@gmail.com",
  address: "227, Avenue du Lac, Katindo, Goma",
  phones: ["+243 994 261 675", "+243 853 261 675"],
} as const;

export const invoiceLines = [
  { amount: 3600, qty: "8", fr: { title: "Diagnostic et cadrage", unit: "jours" }, en: { title: "Diagnostic and framing", unit: "days" } },
  { amount: 2400, qty: "1", fr: { title: "Note de concept et estimations", unit: "forfait" }, en: { title: "Concept note and estimates", unit: "lump sum" } },
  { amount: 800, qty: "1", fr: { title: "Restitution au comité", unit: "forfait" }, en: { title: "Briefing to the committee", unit: "lump sum" } },
] as const;

export const invoiceTotal = invoiceLines.reduce((sum, line) => sum + line.amount, 0);

export const correspondence = {
  email: "contact@open-consulting.fr",
  site: "www.open-consulting.fr",
  siteUrl: "https://www.open-consulting.fr",
} as const;

/** One row for letter, invoice, receipt, and envelope footers. */
export function stationeryFooterItems() {
  return [
    cardIdentity.address,
    cardIdentity.phones.join(" · "),
    cardIdentity.email,
    correspondence.site,
  ];
}

const fr = {
  metaTitle: "Charte graphique",
  metaDescription:
    "Charte OPEN SARL : couverture, enveloppe, lettre officielle, facture, reçu et cartes de visite. Marine #000068, papier, filigrane du chantier.",
  languageLabel: "Langue",
  home: "Site OPEN",
  themeToInk: "Fond marine",
  themeToPaper: "Fond papier",
  nav: {
    introduction: "Intro",
    marks: "Marques",
    color: "Couleurs",
    type: "Caractères",
    voice: "Ton",
    envelope: "Enveloppe",
    letter: "Lettre",
    billing: "Facture",
    cards: "Cartes",
    files: "Fichiers",
  },
  eyebrow: "OPEN SARL · Optimum Engineering Service",
  title: "Charte graphique",
  lead: "Couverture, enveloppe, lettre, facture, reçu et carte. Deux champs seulement : le papier, et le marine #000068. Le chantier — grue, bâtiment, réserve — reste en filigrane.",
  coverCaption: "Couverture A4 · 210 × 297 mm. Logo en haut à gauche. Filigrane à droite, jamais en compétition avec un titre.",
  coverLight: "Champ papier",
  coverNavy: "Champ marine",
  introTitle: "Ce que la marque tient",
  intro: [
    "OPEN SARL relie une décision publique à un programme qui peut être financé, puis construit. Le symbole le dit sans phrase : la grue, le bâtiment, l’eau. Le mot OPEN est dessiné avec eux. On ne le retape pas.",
    "Les pièces qui partent — couverture de dossier, enveloppe, courrier, facture — reprennent le même placement. Le logo ouvre la page. Le pied ferme la page. Le filigrane occupe le silence du milieu.",
  ],
  marksTitle: "Verrouillage",
  marksBody:
    "Le verrouillage est le symbole plus le nom OPEN et la ligne OPTIMUM ENGINEERING SERVICE SARL. On garde leurs proportions. On ne les détache pas, on ne les incline pas, on ne pose ni ombre ni dégradé.",
  marksLight: "Marine sur papier, blanc, ou brume. Version principale.",
  marksNavy: "Blanc sur marine. Une seule teinte : le symbole et le nom restent ensemble.",
  markAlone: "Le symbole seul tient les très petits usages : favicon, pastille, filigrane. Il a besoin d’air pour que la grue reste lisible.",
  clearTitle: "Marge de protection",
  clearBody: "Autour du verrouillage, une marge au moins égale à la hauteur du O de OPEN. Rien — texte, filet, bord de photo — n’entre dans cette zone.",
  scaleTitle: "Échelle",
  scaleBody: "À 24 px de haut, vérifier que OPTIMUM ENGINEERING SERVICE se lit encore. En dessous, passer au symbole seul.",
  colorTitle: "Palette",
  colorBody:
    "Le marine est la couleur de la marque. Le papier ouvre la lecture. Le filigrane #4C5098 n’existe que sur le champ marine, pour le chantier en fond. L’encre porte le texte. La brume et la fenêtre d’enveloppe sont des surfaces, pas des couleurs de texte.",
  colorNames: {
    navy: "Marine",
    paper: "Papier",
    watermark: "Filigrane",
    ink: "Encre",
    mist: "Brume",
    window: "Fenêtre",
  },
  shareTitle: "Répartition",
  shareBody:
    "Sur un ensemble de pièces, le papier et le marine se partagent presque tout. Le filigrane et l’encre restent des détails. Une couverture peut être entièrement marine, une lettre entièrement papier : l’ensemble doit quand même revenir à cet équilibre.",
  contrastTitle: "Combinaisons lisibles",
  contrastPass: "AAA",
  contrastFail: "Échec",
  contrastNote: "Le filigrane sur le marine, et le papier sur la brume, ne portent pas de texte. Ils servent de fond.",
  typeTitle: "Caractères",
  typeDisplay: "Hanken Grotesk",
  typeDisplayRole: "Titres de la charte, intertitres des courriers, nom sur la carte.",
  typeBody: "Inter",
  typeBodyRole: "Corps des lettres, factures et textes longs.",
  typeLabel: "IBM Plex Sans",
  typeLabelRole: "Libellés, numéros, légendes, pied de page.",
  typeWordmark: "Le mot OPEN du logo n’est pas une police. C’est un dessin. On ne le reconstruit pas avec Hanken.",
  scaleItems: [
    { name: "Titre de pièce", face: "Hanken Grotesk · 600", sample: "Facture" },
    { name: "Intertitre", face: "Hanken Grotesk · 700", sample: "Périmètre proposé" },
    { name: "Corps", face: "Inter · 400", sample: "OPEN SARL propose un appui intégré, aligné sur les standards des bailleurs et les procédures nationales." },
    { name: "Légende", face: "IBM Plex Sans · 500", sample: "A4 · 210 × 297 mm" },
  ],
  voiceTitle: "Ton",
  voiceLead: "OPEN écrit comme un cabinet qui a le dossier sous les yeux. Phrase courte, action nommée, délai dit. Le destinataire est un ministère, une UGP, un bailleur.",
  voiceRows: [
    {
      rule: "Nommer le travail",
      say: "OPEN mobilisera une équipe pour sécuriser les phases amont.",
      avoid: "Nous proposons une solution de bout en bout pour votre écosystème.",
    },
    {
      rule: "Donner l’étape utile",
      say: "Validité de l’offre : 60 jours à compter de la date du présent document.",
      avoid: "Nous reviendrons vers vous dans les meilleurs délais.",
    },
    {
      rule: "Rester à la hauteur du courrier",
      say: "Veuillez trouver ci-joint le dossier technique.",
      avoid: "Hâte de disrupter ce secteur avec vous.",
    },
  ],
  say: "Dire",
  avoid: "Éviter",
  envelopeTitle: "Enveloppe",
  envelopeBody:
    "Deux champs : marine et brume. Le logo ouvre en haut à gauche (blanc sur marine, marine sur brume). La fenêtre d’adresse reste vide sous le logo. La boîte aux lettres est en haut à droite, la grue en bas à gauche. Les mêmes coordonnées que la lettre, en une rangée en bas, sans bandeau : texte blanc sur marine, marine sur brume.",
  envelopeMeta: "Paysage · champ marine",
  envelopeMetaWhite: "Paysage · brume #E7E8EC",
  letterTitle: "Lettre officielle",
  letterBody:
    "La lettre reprend la couverture en plus serré : coin marine, adresse du site en haut à droite, logo, puis le texte. Les intertitres sont en capitales, marine, sans puce décorative. Le pied est un bandeau marine pleine largeur : les deux lignes mobiles, l’adresse à Goma et l’e-mail du gérant.",
  letterMeta: "A4 · 210 × 297 mm",
  letterDate: "28 août 2024",
  letterToLabel: "À.",
  letterTo: ["Point focal / décideur", "Institution cliente ou partenaire", "Adresse postale", "Kinshasa, République démocratique du Congo"],
  letterSubject: "Objet : Proposition d’accompagnement — [intitulé du programme]",
  letterIntro:
    "OPEN SARL propose un appui intégré combinant conseil en amont (préparation, faisabilité, structuration) et ingénierie de delivery, aligné sur les standards des bailleurs et les procédures nationales.",
  letterSections: [
    {
      title: "Contexte et objectifs",
      body: "Le programme vise à [objectif principal]. OPEN mobilisera une équipe pluridisciplinaire pour sécuriser les phases amont, renforcer la capacité institutionnelle du maître d’ouvrage et produire des livrables exploitables pour le financement et la mise en œuvre.",
    },
    {
      title: "Périmètre proposé",
      body: "La mission s’articule autour des volets suivants (durée et calendrier à valider avec le client) :",
      bullets: [
        "Diagnostic et cadrage : revue documentaire, ateliers avec les parties prenantes, feuille de route.",
        "Préparation / faisabilité : notes de concept, estimations, analyse des risques et plan de mitigation.",
        "Appui UGP / maître d’ouvrage : procédures, reporting, coordination des études et des consultations.",
        "Supervision technique et contrôle qualité sur les phases études et travaux, selon le périmètre retenu.",
      ],
    },
    {
      title: "Livrables",
      body: "Les livrables seront remis en versions provisoires et finales, avec restitution aux instances de gouvernance du programme :",
      bullets: [
        "Note de cadrage et plan de travail validé.",
        "Rapports d’étape et de fin de mission (FR / EN selon besoin).",
        "Dossiers techniques, matrices de risques et calendrier de mise en œuvre.",
        "Supports de restitution (présentation et synthèse exécutive).",
      ],
    },
    {
      title: "Modalités",
      body: "Durée indicative : [X] mois. Équipe : directeur de mission, experts sectoriels, ingénieurs et appui administratif OPEN Kinshasa. Honoraires, déplacements et taxes : selon devis détaillé annexé. Validité de l’offre : 60 jours à compter de la date du présent document.",
    },
  ],
  place: "Kinshasa, République démocratique du Congo",
  billingTitle: "Facture et reçu",
  billingBody:
    "Même en-tête, même pied, même filigrane que la lettre. La facture aligne les lignes sur une grille. Le reçu reprend le même numéro et le même montant, pour qu’on voie qu’ils forment une paire. Les chiffres ci-dessous sont un spécimen de mise en page, pas une offre.",
  invoiceTitle: "Facture",
  invoiceMeta: "A4 · spécimen",
  invoiceNumberLabel: "Facture n°",
  invoiceNumber: "OPEN-2024-0142",
  invoiceDateLabel: "Date",
  invoiceDueLabel: "Échéance",
  invoiceDue: "27 septembre 2024",
  invoiceClientLabel: "Client",
  invoiceClient: ["Institution cliente ou partenaire", "Kinshasa, République démocratique du Congo"],
  invoiceCols: ["Désignation", "Qté", "Unité", "Montant"],
  invoiceTotalLabel: "Total",
  invoiceNote:
    "Spécimen de charte. Les montants montrent la grille ; ils ne constituent pas une offre. Règlement par virement : les coordonnées bancaires partent avec le devis, elles ne sont pas imprimées ici.",
  receiptTitle: "Reçu",
  receiptMeta: "A4 · spécimen",
  receiptNumberLabel: "Reçu n°",
  receiptNumber: "OPEN-2024-0142-R",
  receiptFromLabel: "Reçu de",
  receiptAmountLabel: "La somme de",
  receiptForLabel: "Pour",
  receiptFor: "Acompte sur la proposition d’accompagnement — [intitulé du programme].",
  receiptSign: "Pour OPEN SARL",
  receiptPlace: "Kinshasa, le 28 août 2024",
  cardsTitle: "Cartes de visite",
  cardsBody:
    "Format 85 × 55 mm. Le recto papier porte le QR du site, le logo, et les coordonnées du gérant telles qu’imprimées : Goma, les deux lignes mobiles, l’adresse personnelle. Le verso marine est le verrouillage blanc, seul. La carte marine reprend le recto quand le fond doit être sombre.",
  cardsRule:
    "Les coordonnées imprimées sur la carte, les lettres et les enveloppes sont les mêmes. Lettres et factures : une rangée dans le bandeau marine. Enveloppes : la même rangée, directement sur le fond, sans bandeau.",
  cardPaperIcons: "Recto papier · icônes",
  cardPaperAddress: "Recto papier · adresse en toutes lettres",
  cardNavyBack: "Verso marine",
  cardNavyFront: "Recto marine",
  cardMeta: "85 × 55 mm",
  addressLabel: "Adresse",
  filesTitle: "Fichiers",
  filesBody: "Chaque pièce s’exporte en SVG, en PNG, ou se copie pour être collée dans Figma. Le QR ouvre la page publique.",
  exportSvg: "SVG",
  exportPng: "PNG",
  exportCopy: "Copier le SVG",
  exportCopied: "Copié",
  files: [
    { href: "/images/open-logo.svg", label: "Verrouillage SVG" },
    { href: "/images/open-logo-mark.svg", label: "Symbole SVG" },
    { href: "/images/open-qr.svg", label: "QR du site SVG" },
  ],
  qrAlt: "QR vers https://www.open-consulting.fr",
};

const en = {
  metaTitle: "Brand guidelines",
  metaDescription:
    "OPEN SARL brand guidelines: document cover, envelope, official letter, invoice, receipt, and business cards. Navy #000068, paper, and the site watermark.",
  languageLabel: "Language",
  home: "OPEN site",
  themeToInk: "Navy field",
  themeToPaper: "Paper field",
  nav: {
    introduction: "Intro",
    marks: "Marks",
    color: "Color",
    type: "Type",
    voice: "Voice",
    envelope: "Envelope",
    letter: "Letter",
    billing: "Invoice",
    cards: "Cards",
    files: "Files",
  },
  eyebrow: "OPEN SARL · Optimum Engineering Service",
  title: "Brand guidelines",
  lead: "Cover, envelope, letter, invoice, receipt, and card. Two fields only: paper, and navy #000068. The works — crane, building, reservoir — stay as a watermark.",
  coverCaption: "A4 cover · 210 × 297 mm. Logo at the top left. Watermark on the right, never competing with a title.",
  coverLight: "Paper field",
  coverNavy: "Navy field",
  introTitle: "What the mark holds",
  intro: [
    "OPEN SARL connects a public decision to a programme that can be financed, then built. The symbol says it without a slogan: the crane, the building, the water. The word OPEN is drawn with them. It is not retyped.",
    "Pieces that travel — a dossier cover, an envelope, a letter, an invoice — keep the same placement. The logo opens the page. The footer closes it. The watermark occupies the quiet middle.",
  ],
  marksTitle: "Lockup",
  marksBody:
    "The lockup is the symbol plus the name OPEN and the line OPTIMUM ENGINEERING SERVICE SARL. Keep their proportions. Do not detach them, tilt them, or add a shadow or a gradient.",
  marksLight: "Navy on paper, white, or mist. Primary version.",
  marksNavy: "White on navy. One color, so the symbol and the name read together.",
  markAlone: "The symbol alone is for very small uses: favicon, avatar, watermark. Give the crane enough room to stay distinct.",
  clearTitle: "Clear space",
  clearBody: "Leave a margin around the lockup at least as tall as the O in OPEN. No text, rule, or photo edge enters that zone.",
  scaleTitle: "Scale",
  scaleBody: "At 24 px tall, check that OPTIMUM ENGINEERING SERVICE can still be read. Below that, use the symbol alone.",
  colorTitle: "Palette",
  colorBody:
    "Navy is the brand color. Paper opens the page for reading. Watermark #4C5098 exists only on the navy field, for the works in the background. Ink carries text. Mist and the envelope window are surfaces, not text colors.",
  colorNames: {
    navy: "Navy",
    paper: "Paper",
    watermark: "Watermark",
    ink: "Ink",
    mist: "Mist",
    window: "Window",
  },
  shareTitle: "Proportions",
  shareBody:
    "Across a set of pieces, paper and navy take almost everything. Watermark and ink stay small. A cover may be entirely navy and a letter entirely paper: the set should still come back to this balance.",
  contrastTitle: "Readable combinations",
  contrastPass: "AAA",
  contrastFail: "Fail",
  contrastNote: "Watermark on navy, and paper on mist, do not carry text. They are fields.",
  typeTitle: "Type",
  typeDisplay: "Hanken Grotesk",
  typeDisplayRole: "Guidelines titles, letter section labels, the name on the card.",
  typeBody: "Inter",
  typeBodyRole: "Letter, invoice, and long-form text.",
  typeLabel: "IBM Plex Sans",
  typeLabelRole: "Labels, numbers, captions, footer.",
  typeWordmark: "The word OPEN in the logo is not a font. It is a drawing. Do not rebuild it in Hanken.",
  scaleItems: [
    { name: "Piece title", face: "Hanken Grotesk · 600", sample: "Invoice" },
    { name: "Section label", face: "Hanken Grotesk · 700", sample: "Proposed scope" },
    { name: "Body", face: "Inter · 400", sample: "OPEN SARL proposes integrated support, aligned with donor standards and national procedures." },
    { name: "Caption", face: "IBM Plex Sans · 500", sample: "A4 · 210 × 297 mm" },
  ],
  voiceTitle: "Voice",
  voiceLead: "OPEN writes like a firm with the file open. Short sentences, the work named, the deadline stated. The reader is a ministry, a PIU, or a financier.",
  voiceRows: [
    {
      rule: "Name the work",
      say: "OPEN will field a team to secure the upstream phases.",
      avoid: "We offer an end-to-end solution for your ecosystem.",
    },
    {
      rule: "Give the useful step",
      say: "This offer is valid for 60 days from the date of this document.",
      avoid: "We will revert shortly.",
    },
    {
      rule: "Stay at the level of the letter",
      say: "Please find the technical file attached.",
      avoid: "Excited to disrupt this sector with you.",
    },
  ],
  say: "Say",
  avoid: "Avoid",
  envelopeTitle: "Envelope",
  envelopeBody:
    "Two fields: navy and mist. The logo opens at the top left (white on navy, navy on mist). The address window stays empty below the logo. The mailbox sits at the top right; the crane is cut by the bottom edge on the left. The same contact row as the letter, along the bottom with no band: white on navy, navy on mist.",
  envelopeMeta: "Landscape · navy field",
  envelopeMetaWhite: "Landscape · mist #E7E8EC",
  letterTitle: "Official letter",
  letterBody:
    "The letter is the cover, tightened: a navy corner, the site address at the top right, the logo, then the text. Section labels are capitals, in navy, without decorative bullets. The footer is a full-width navy band: both mobile lines, the Goma address, and the managing director’s email.",
  letterMeta: "A4 · 210 × 297 mm",
  letterDate: "28 August 2024",
  letterToLabel: "To.",
  letterTo: ["Focal point / decision-maker", "Client institution or partner", "Postal address", "Kinshasa, Democratic Republic of the Congo"],
  letterSubject: "Re: Proposal for technical assistance — [programme title]",
  letterIntro:
    "OPEN SARL proposes integrated support combining upstream advisory (preparation, feasibility, structuring) and delivery engineering, aligned with donor standards and national procedures.",
  letterSections: [
    {
      title: "Context and objectives",
      body: "The programme aims to [primary objective]. OPEN will field a multidisciplinary team to secure upstream phases, strengthen the client’s institutional capacity, and produce outputs that financing and implementation can use.",
    },
    {
      title: "Proposed scope",
      body: "The assignment is structured around the following workstreams (duration and schedule to be agreed with the client):",
      bullets: [
        "Diagnostic and framing: document review, stakeholder workshops, roadmap.",
        "Preparation / feasibility: concept notes, estimates, risk analysis and mitigation plan.",
        "PIU / client support: procedures, reporting, coordination of studies and consultations.",
        "Technical supervision and quality control on design and works phases, within the agreed scope.",
      ],
    },
    {
      title: "Deliverables",
      body: "Deliverables are issued in draft and final versions, and presented to the programme’s governance bodies:",
      bullets: [
        "Framing note and validated work plan.",
        "Progress and completion reports (FR / EN as required).",
        "Technical files, risk matrices, and implementation schedule.",
        "Briefing pack (presentation and executive summary).",
      ],
    },
    {
      title: "Terms",
      body: "Indicative duration: [X] months. Team: mission director, sector experts, engineers, and OPEN Kinshasa administrative support. Fees, travel, and taxes: as per the detailed quote attached. Offer valid for 60 days from the date of this document.",
    },
  ],
  place: "Kinshasa, Democratic Republic of the Congo",
  billingTitle: "Invoice and receipt",
  billingBody:
    "Same header, same footer, same watermark as the letter. The invoice aligns rows on a grid. The receipt repeats the same number and the same amount, so the pair is obvious. The figures below are a layout specimen, not an offer.",
  invoiceTitle: "Invoice",
  invoiceMeta: "A4 · specimen",
  invoiceNumberLabel: "Invoice no.",
  invoiceNumber: "OPEN-2024-0142",
  invoiceDateLabel: "Date",
  invoiceDueLabel: "Due",
  invoiceDue: "27 September 2024",
  invoiceClientLabel: "Client",
  invoiceClient: ["Client institution or partner", "Kinshasa, Democratic Republic of the Congo"],
  invoiceCols: ["Description", "Qty", "Unit", "Amount"],
  invoiceTotalLabel: "Total",
  invoiceNote:
    "Guidelines specimen. The amounts show the grid; they are not an offer. Payment is by transfer: bank details go out with the quote and are not printed here.",
  receiptTitle: "Receipt",
  receiptMeta: "A4 · specimen",
  receiptNumberLabel: "Receipt no.",
  receiptNumber: "OPEN-2024-0142-R",
  receiptFromLabel: "Received from",
  receiptAmountLabel: "The sum of",
  receiptForLabel: "For",
  receiptFor: "Advance on the technical-assistance proposal — [programme title].",
  receiptSign: "For OPEN SARL",
  receiptPlace: "Kinshasa, 28 August 2024",
  cardsTitle: "Business cards",
  cardsBody:
    "85 × 55 mm. The paper front carries the site QR, the logo, and the managing director’s details as printed: Goma, both mobile lines, the personal address. The navy back is the white lockup, alone. The navy front repeats the contact side when the field must be dark.",
  cardsRule:
    "The printed details on the card, letters, and envelopes match. Letters and invoices: one row in the navy band. Envelopes: the same row on the field, with no band.",
  cardPaperIcons: "Paper front · icons",
  cardPaperAddress: "Paper front · address spelled out",
  cardNavyBack: "Navy back",
  cardNavyFront: "Navy front",
  cardMeta: "85 × 55 mm",
  addressLabel: "Address",
  filesTitle: "Files",
  filesBody: "Each piece exports as SVG or PNG, or copies so it can be pasted into Figma. The QR opens the public page.",
  exportSvg: "SVG",
  exportPng: "PNG",
  exportCopy: "Copy SVG",
  exportCopied: "Copied",
  files: [
    { href: "/images/open-logo.svg", label: "Lockup SVG" },
    { href: "/images/open-logo-mark.svg", label: "Symbol SVG" },
    { href: "/images/open-qr.svg", label: "Site QR SVG" },
  ],
  qrAlt: "QR code for https://www.open-consulting.fr",
};

export const brandGuide = { fr, en };

export type BrandCopy = (typeof brandGuide)[Locale];

export function money(locale: Locale, amount: number) {
  return new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
