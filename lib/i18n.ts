import type { IconName } from "@/components/icon";

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

export const contactEmail = "contact@open-consulting.fr";
export const offices = ["Kinshasa, République démocratique du Congo"] as const;

export function isLocale(value: string): value is Locale {
  return value === "fr" || value === "en";
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function localePath(pathname: string, locale: Locale) {
  const hashIndex = pathname.indexOf("#");
  const path = hashIndex === -1 ? pathname : pathname.slice(0, hashIndex);
  const hash = hashIndex === -1 ? "" : pathname.slice(hashIndex);
  const stripped = path.replace(/^\/(fr|en)(?=\/|$)/, "") || "/";
  const normalized = stripped === "/" ? "" : stripped;
  return `/${locale}${normalized}${hash}`;
}

export function isNavActive(href: string, hash: string, pathname: string) {
  if (!/^\/(fr|en)$/.test(pathname)) return false;
  if (!hash) return false;
  return href.endsWith(hash);
}

type MailKind = "project" | "partner" | "newsletter" | "recruitment";

const subjects: Record<Locale, Record<MailKind, string>> = {
  fr: {
    project: "Discuter d'un projet",
    partner: "Devenir partenaire d'OPEN",
    newsletter: "Inscription newsletter",
    recruitment: "Recrutement",
  },
  en: {
    project: "Discuss a project",
    partner: "Partner with OPEN",
    newsletter: "Newsletter",
    recruitment: "Careers",
  },
};

export function mailHref(locale: Locale, kind: MailKind, body?: string) {
  const subject = encodeURIComponent(subjects[locale][kind]);
  const encodedBody = body ? `&body=${encodeURIComponent(body)}` : "";
  return `mailto:${contactEmail}?subject=${subject}${encodedBody}`;
}

const dictionaries = {
  fr: {
    meta: {
      title: "OPEN | Conseil en infrastructures (format Gouvernement / Bailleurs)",
      description:
        "OPEN SARL — branche conseil en infrastructures à Kinshasa : préparation, structuration et mise en œuvre de programmes stratégiques, du concept à des investissements bancables et exécutables.",
    },
    ui: {
      skip: "Aller au contenu",
      menuOpen: "Ouvrir le menu",
      menuClose: "Fermer le menu",
      contact: "Contact",
      languageLabel: "Langue",
      carouselPrev: "Pôle précédent",
      carouselNext: "Pôle suivant",
      carouselLabel: "Pôles OPEN",
    },
    nav: [
      { href: "#missions", label: "Missions" },
      { href: "#poles", label: "Pôles" },
      { href: "#expertise", label: "Expertise" },
      { href: "#secteurs", label: "Secteurs" },
      { href: "#missions", label: "Portfolio" },
    ],
    hero: {
      imageAlt: "Programmes d'infrastructures stratégiques en RDC",
      centerCta: "Découvrir nos services",
      platform: "Transformer les priorités d'infrastructure en projets finançables et exécutables.",
      scope: "Conseil, ingénierie et appui à l'exécution en RDC et en Afrique centrale.",
      clients: ["Ministères", "Gouvernorats", "Agences publiques", "UGP / PIU", "Bailleurs & IFI"],
      departments: [
        {
          dept: "Préparation & structuration",
          watermark: "ADVISORY",
          title: "Préparation & structuration",
          subtitle: "Programmes stratégiques",
          text: "Du concept à des investissements bancables — diagnostics, faisabilité, pipelines et structuration bailleurs.",
          quote: "",
          cta: "Discuter d'un programme",
        },
        {
          dept: "Livrables prêts pour décision",
          watermark: "DELIVERY",
          title: "Options, coûts & risques",
          subtitle: "Décision opérationnelle",
          text: "Notes de décision pour Ministre, Gouverneur et Comités de pilotage — options, coûts, risques et recommandations.",
          quote: "",
          cta: "Voir les livrables types",
        },
      ],
    },
    method: {
      title: "Services clés",
      intro: "Quatre piliers de conseil pour structurer des programmes à fort impact, conformes aux attentes des bailleurs et financiers.",
      items: [
        { icon: "construction" as IconName, title: "Préparation des projets", text: "Diagnostics sectoriels, faisabilité, analyse d'options techniques et feuilles de route de mise en œuvre réalistes." },
        { icon: "account_balance" as IconName, title: "Structuration pour financement bailleurs", text: "Notes conceptuelles, développement de pipelines, packaging en tranches finançables et alignement UE / IFI." },
        { icon: "rule" as IconName, title: "Bancabilité et gestion des risques", text: "Évaluation de maturité, registres de risques, analyse des capacités institutionnelles et choix de modèles de mise en œuvre." },
        { icon: "visibility" as IconName, title: "Conseil stratégique", text: "Planification nationale et provinciale, stratégies corridors et connectivité, priorisation des investissements." },
      ],
    },
    positioning: {
      title: "Présentation",
      text: "Branche conseil en infrastructures de OPEN SARL, basée à Kinshasa (RDC). Nous articulons les réalités institutionnelles locales et les standards attendus par les bailleurs et financiers.",
      standards: [
        "Appui aux ministères, autorités provinciales et agences d'exécution.",
        "Production de livrables prêts pour décision — options, coûts, plans et risques.",
        "Réalisme d'exécution local combiné aux standards internationaux (UE, Banque mondiale, BAD, KfW, AFD, USAID).",
        "Posture d'appui indépendant centrée sur la valeur publique, la gouvernance et les résultats.",
      ],
      imageAlt: "Planification et structuration de programmes d'infrastructure",
    },
    compare: {
      title: "Principes opérationnels et valeur pour les partenaires publics",
      standardTitle: "Principes opérationnels",
      openTitle: "Valeur pour les partenaires publics",
      openBadge: "OPEN SARL",
      standardItems: [
        { title: "Rigueur technique et intégrité professionnelle", text: "Des analyses fondées sur des standards reconnus et une posture indépendante." },
        { title: "Solutions pragmatiques adaptées au contexte", text: "Des recommandations tenant compte des contraintes institutionnelles et opérationnelles locales." },
        { title: "Résultats opérationnels, pas de rapports théoriques", text: "Priorité aux livrables actionnables, à la gouvernance claire et à un reporting prévisible." },
      ],
      openItems: [
        { title: "Standards internationaux", text: "Réalisme d'exécution local, combiné aux exigences UE, Banque mondiale, BAD, KfW, AFD et USAID." },
        { title: "Livrables prêts pour décision", text: "Matériaux structurés pour Ministre, Gouverneur et Comités de pilotage." },
        { title: "Appui indépendant", text: "Une posture centrée sur la valeur publique, la gouvernance et les résultats — pas sur la production de rapports." },
      ],
    },
    missions: {
      title: "Livrables typiques",
      intro: "Des outputs concrets pour alimenter les décisions, les études et les dossiers bailleurs.",
      catalog: "Consulter la note de capacités",
      items: [
        { title: "Pipelines et priorisation", text: "Pipelines d'investissement et notes de priorisation aux niveaux national et provincial." },
        { title: "Notes de décision", text: "Briefings pour Ministre, Gouverneur ou Comité de pilotage — options, coûts, risques et recommandations." },
        { title: "TdR et maturité", text: "Termes de Référence pour faisabilité, études E&S, conception et supervision ; évaluations de maturité et registres de risques." },
      ],
    },
    mobilisation: {
      title: "Modalités de collaboration",
      steps: [
        { range: "01", title: "Missions courtes", text: "Diagnostic, priorisation et briefing aux décideurs.", border: "tertiary" as const },
        { range: "02", title: "Préparation de projets", text: "Du concept à la faisabilité — coordination des études et structuration.", border: "primary" as const },
        { range: "03", title: "Appui intégré", text: "Rôles d'appui au sein des UGP/PIU ou équipes ministérielles.", border: "variant" as const },
      ],
    },
    sectors: {
      title: "Secteurs prioritaires",
      items: [
        {
          title: "Transport & logistique",
          text: "Corridors transport et logistique.",
          gradient: "from-primary",
          titleClass: "font-headline-xl text-headline-xl",
          padding: "p-8",
          layout: "sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2",
        },
        {
          title: "Énergie",
          text: "Systèmes énergétiques et réseaux de production et de distribution.",
          gradient: "from-tertiary",
          titleClass: "font-headline-lg text-headline-lg",
          padding: "p-6",
          layout: "sm:col-span-2 lg:col-span-2",
        },
        {
          title: "Eau & assainissement",
          text: "Infrastructures hydrauliques et services essentiels.",
          gradient: "from-secondary",
          titleClass: "font-headline-md text-headline-md",
          padding: "p-4",
          layout: "",
        },
        {
          title: "Infrastructures urbaines",
          text: "Infrastructures urbaines et territoriales.",
          gradient: "from-primary-container",
          titleClass: "font-headline-md text-headline-md",
          padding: "p-4",
          layout: "",
        },
      ],
    },
    modes: {
      title: "Modèle d'intervention",
      intro: "Comment OPEN travaille avec les autorités publiques et leurs partenaires techniques.",
      items: [
        { title: "Missions courtes", text: "Diagnostic, priorisation et briefing aux décideurs.", featured: false },
        { title: "Préparation de projets", text: "Du concept à la faisabilité — coordination des études et structuration.", featured: false },
        { title: "Appui intégré", text: "Rôles d'appui au sein des UGP/PIU ou équipes ministérielles.", featured: false },
        { title: "Mise en œuvre conjointe", text: "Collaboration avec bureaux internationaux et experts multidisciplinaires selon les besoins.", featured: false },
      ],
    },
    cta: {
      title: "Structurer votre pipeline d'investissements",
      text: "Ministères nationaux, gouvernorats, agences publiques, UGP/PIU, régies et autorités de corridors — discutons de vos programmes prioritaires.",
      primary: "Prendre contact",
      secondary: "Télécharger la note de capacités",
    },
    footer: {
      about: "Branche conseil en infrastructures de OPEN SARL, basée à Kinshasa. Préparation, structuration et appui à la mise en œuvre de programmes stratégiques pour les autorités publiques.",
      sectorLinks: ["Transport & logistique", "Énergie", "Eau & assainissement", "Infrastructures urbaines"],
      companyLinks: [
        { href: "#missions", label: "Missions" },
        { href: "#expertise", label: "Expertise" },
        { href: "#missions", label: "Portfolio" },
      ],
      sectors: "Secteurs",
      company: "Entreprise",
      contact: "Contact",
      rights: "Tous droits réservés.",
      legal: "Mentions légales",
      privacy: "Confidentialité",
      recruitment: "Recrutement",
      newsletter: "S'abonner à la newsletter",
      newsletterError: "Indiquez une adresse e-mail valide.",
      linkedin: "LinkedIn",
    },
    brochure: {
      metaTitle: "Note de capacités",
      metaDescription: "Note de capacités OPEN SARL — conseil en infrastructures pour autorités publiques et bailleurs, basée à Kinshasa (RDC).",
      kicker: "OPEN SARL",
      title: "Note de capacités — Conseil en infrastructures",
      lead: "Accompagner les autorités nationales et provinciales dans la préparation, la structuration et la mise en œuvre de programmes d'infrastructures stratégiques.",
      print: "Enregistrer en PDF",
      back: "Retour à l'accueil",
    },
    legal: {
      metaTitle: "Mentions légales",
      title: "Mentions légales",
      intro: "Ce site présente OPEN SARL — branche conseil en infrastructures basée à Kinshasa (RDC), au service des autorités publiques et de leurs partenaires bailleurs.",
      editor: "Éditeur",
      publisher: "Directeur de la publication",
      publisherBody: "La direction d'OPEN SARL.",
      disclaimer: "Les informations décrivent l'offre. Elles ne constituent pas une offre contractuelle. Les références chiffrées, lorsqu'elles sont indiquées, décrivent un mandat précis et non une performance générale de la société.",
      back: "Retour à l'accueil",
    },
    privacy: {
      metaTitle: "Confidentialité",
      title: "Confidentialité",
      intro: "OPEN SARL ne dépose pas de traceur publicitaire sur ce site. La navigation ne crée pas de compte.",
      contactTitle: "Prise de contact",
      contactBody: "Les boutons de contact, de partenariat, de recrutement et de newsletter ouvrent votre messagerie. Le message part seulement si vous l'envoyez. OPEN SARL utilise alors l'adresse pour répondre, le temps du suivi de l'échange.",
      rightsTitle: "Vos demandes",
      rightsLead: "Pour accéder aux informations liées à un échange, les rectifier ou demander leur suppression, écrivez à",
      back: "Retour à l'accueil",
    },
    notFound: {
      title: "Page introuvable",
      text: "Cette adresse ne correspond à aucune page du site OPEN.",
      back: "Retour à l'accueil",
    },
  },
  en: {
    meta: {
      title: "OPEN | Infrastructure advisory (Government / Donor format)",
      description:
        "OPEN SARL — Kinshasa-based infrastructure advisory branch supporting national and provincial governments to prepare, structure, and deliver strategic infrastructure programs from concept to bankable, implementable investments.",
    },
    ui: {
      skip: "Skip to content",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      contact: "Contact",
      languageLabel: "Language",
      carouselPrev: "Previous practice",
      carouselNext: "Next practice",
      carouselLabel: "OPEN practices",
    },
    nav: [
      { href: "#missions", label: "Missions" },
      { href: "#poles", label: "Practices" },
      { href: "#expertise", label: "Expertise" },
      { href: "#secteurs", label: "Sectors" },
      { href: "#missions", label: "Portfolio" },
    ],
    hero: {
      imageAlt: "Strategic infrastructure programs in the DRC",
      centerCta: "Explore our services",
      platform: "From infrastructure priorities to bankable, implementable projects.",
      scope: "Advisory, engineering and delivery support across the DRC and Central Africa.",
      clients: ["Ministries", "Provincial governments", "Public agencies", "PIUs", "DFIs & donors"],
      departments: [
        {
          dept: "Preparation & structuring",
          watermark: "ADVISORY",
          title: "Preparation & structuring",
          subtitle: "Strategic programs",
          text: "From concept to bankable investments — diagnostics, feasibility, pipelines, and donor-ready structuring.",
          quote: "",
          cta: "Discuss a program",
        },
        {
          dept: "Decision-ready outputs",
          watermark: "DELIVERY",
          title: "Options, costs & risks",
          subtitle: "Operational decisions",
          text: "Decision briefs for Ministers, Governors, and Steering Committees — options, costs, risks, and recommendations.",
          quote: "",
          cta: "View typical outputs",
        },
      ],
    },
    method: {
      title: "Core advisory services",
      intro: "Four pillars to structure high-impact programs aligned with development partners and financiers.",
      items: [
        { icon: "construction" as IconName, title: "Infrastructure project preparation", text: "Sector diagnostics, feasibility coordination, technical options analysis, and implementable project roadmaps." },
        { icon: "account_balance" as IconName, title: "Donor-funded project structuring", text: "Concept notes, pipeline development, financeable tranches, and EU / IFI alignment." },
        { icon: "rule" as IconName, title: "Bankability and risk assessment", text: "Readiness and governance review, risk registers, capacity assessment, and delivery model choices." },
        { icon: "visibility" as IconName, title: "Strategic infrastructure advisory", text: "National and provincial planning, corridor and connectivity strategy, and investment prioritization." },
      ],
    },
    positioning: {
      title: "Firm overview",
      text: "Infrastructure advisory branch of OPEN SARL based in Kinshasa, DRC. We bridge local institutional realities with international standards expected by development partners and financiers.",
      standards: [
        "Support to ministries, provincial authorities, and implementing agencies.",
        "Decision-ready outputs — options, costs, delivery plans, and risk-managed structures.",
        "Local delivery realism plus international standards (EU, World Bank, AfDB, KfW, AFD, USAID).",
        "Independent advisory posture focused on public value, governance, and results.",
      ],
      imageAlt: "Planning and structuring infrastructure programs",
    },
    compare: {
      title: "Operating principles and value for government partners",
      standardTitle: "Operating principles",
      openTitle: "Value for government partners",
      openBadge: "OPEN SARL",
      standardItems: [
        { title: "Technical rigor and professional integrity", text: "Analysis grounded in recognized standards and an independent posture." },
        { title: "Context-aware, pragmatic problem solving", text: "Recommendations that reflect local institutional and operational constraints." },
        { title: "Actionable outputs, not theoretical reports", text: "Priority on deliverables, clear governance, and predictable reporting cadence." },
      ],
      openItems: [
        { title: "International standards", text: "Local delivery realism combined with EU, World Bank, AfDB, KfW, AFD, and USAID requirements." },
        { title: "Decision-ready materials", text: "Structured briefs for Ministers, Governors, and Steering Committees." },
        { title: "Independent advisory", text: "Focused on public value, governance, and results — not report production." },
      ],
    },
    missions: {
      title: "Typical outputs delivered",
      intro: "Concrete deliverables to support decisions, studies, and donor-facing dossiers.",
      catalog: "View the capability statement",
      items: [
        { title: "Pipelines and prioritization", text: "Investment pipeline and prioritization notes at national and provincial levels." },
        { title: "Decision briefs", text: "Briefings for Ministers, Governors, or Steering Committees — options, costs, risks, and recommendations." },
        { title: "ToR and readiness", text: "Terms of Reference for feasibility, E&S studies, design, and supervision; readiness assessments and risk registers." },
      ],
    },
    mobilisation: {
      title: "How OPEN works with government counterparts",
      steps: [
        { range: "01", title: "Short advisory missions", text: "Diagnostic, prioritization, and briefing to decision-makers.", border: "tertiary" as const },
        { range: "02", title: "Project preparation support", text: "Concept-to-feasibility, coordination of studies, and packaging.", border: "primary" as const },
        { range: "03", title: "Embedded advisory roles", text: "Support inside PIUs or ministerial project teams.", border: "variant" as const },
      ],
    },
    sectors: {
      title: "Primary sectors",
      items: [
        {
          title: "Transport & logistics",
          text: "Transport and logistics corridors.",
          gradient: "from-primary",
          titleClass: "font-headline-xl text-headline-xl",
          padding: "p-8",
          layout: "sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2",
        },
        {
          title: "Energy",
          text: "Energy and power systems.",
          gradient: "from-tertiary",
          titleClass: "font-headline-lg text-headline-lg",
          padding: "p-6",
          layout: "sm:col-span-2 lg:col-span-2",
        },
        {
          title: "Water & sanitation",
          text: "Water and sanitation infrastructure.",
          gradient: "from-secondary",
          titleClass: "font-headline-md text-headline-md",
          padding: "p-4",
          layout: "",
        },
        {
          title: "Urban infrastructure",
          text: "Urban and regional infrastructure.",
          gradient: "from-primary-container",
          titleClass: "font-headline-md text-headline-md",
          padding: "p-4",
          layout: "",
        },
      ],
    },
    modes: {
      title: "Collaboration model",
      intro: "How OPEN works with public authorities and their technical partners.",
      items: [
        { title: "Short advisory missions", text: "Diagnostic, prioritization, and briefing to decision-makers.", featured: false },
        { title: "Project preparation support", text: "Concept-to-feasibility, coordination of studies, and packaging.", featured: false },
        { title: "Embedded advisory roles", text: "Support inside PIUs or ministerial project teams.", featured: false },
        { title: "Joint delivery", text: "Collaboration with international firms and multidisciplinary experts as required.", featured: false },
      ],
    },
    cta: {
      title: "Structure your investment pipeline",
      text: "National ministries, provincial governments, public agencies, PIUs, utilities, and corridor authorities — let's discuss your priority programs.",
      primary: "Get in touch",
      secondary: "Download the capability statement",
    },
    footer: {
      about: "Infrastructure advisory branch of OPEN SARL, based in Kinshasa. Preparation, structuring, and delivery support for strategic programs serving public authorities.",
      sectorLinks: ["Transport & logistics", "Energy", "Water & sanitation", "Urban infrastructure"],
      companyLinks: [
        { href: "#missions", label: "Missions" },
        { href: "#expertise", label: "Expertise" },
        { href: "#missions", label: "Portfolio" },
      ],
      sectors: "Sectors",
      company: "Company",
      contact: "Contact",
      rights: "All rights reserved.",
      legal: "Legal notice",
      privacy: "Privacy",
      recruitment: "Careers",
      newsletter: "Subscribe to the newsletter",
      newsletterError: "Enter a valid email address.",
      linkedin: "LinkedIn",
    },
    brochure: {
      metaTitle: "Capability statement",
      metaDescription: "OPEN SARL infrastructure advisory capability statement for government and donor partners, based in Kinshasa, DRC.",
      kicker: "OPEN SARL",
      title: "Infrastructure advisory capability statement",
      lead: "Supporting national and provincial governments to prepare, structure, and deliver strategic infrastructure programs.",
      print: "Save as PDF",
      back: "Back to home",
    },
    legal: {
      metaTitle: "Legal notice",
      title: "Legal notice",
      intro: "This site presents OPEN SARL — an infrastructure advisory branch based in Kinshasa, DRC, serving public authorities and their development partners.",
      editor: "Publisher",
      publisher: "Publication director",
      publisherBody: "The management of OPEN SARL.",
      disclaimer: "The information describes the offer. It is not a contractual offer. Figures, where shown, describe a specific mandate rather than a firm-wide performance claim.",
      back: "Back to home",
    },
    privacy: {
      metaTitle: "Privacy",
      title: "Privacy",
      intro: "OPEN SARL does not place advertising trackers on this site. Browsing does not create an account.",
      contactTitle: "Getting in touch",
      contactBody: "Contact, partnership, careers and newsletter actions open your own email app. A message is sent only if you send it. OPEN SARL then uses the address to reply, for as long as the exchange needs follow-up.",
      rightsTitle: "Your requests",
      rightsLead: "To access, correct or delete information linked to an exchange, write to",
      back: "Back to home",
    },
    notFound: {
      title: "Page not found",
      text: "This address does not match a page on the OPEN site.",
      back: "Back to home",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];
