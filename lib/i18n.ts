import type { IconName } from "@/components/icon";

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

export const contactEmail = "contact@open-consulting.fr";
export const offices = ["Tour Horizon, Paris-La Défense", "Dakar, Sénégal"] as const;

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
      title: "OPEN | Conseil stratégique en infrastructures publiques",
      description:
        "OPEN SARL — conseil stratégique et expertise technique pour les infrastructures et politiques publiques en RDC et en Afrique centrale.",
    },
    ui: {
      skip: "Aller au contenu",
      menuOpen: "Ouvrir le menu",
      menuClose: "Fermer le menu",
      contact: "Contact",
      languageLabel: "Langue",
    },
    nav: [
      { href: "#missions", label: "Missions" },
      { href: "#poles", label: "Pôles" },
      { href: "#expertise", label: "Expertise" },
      { href: "#secteurs", label: "Secteurs" },
      { href: "#missions", label: "Portfolio" },
    ],
    hero: {
      imageAlt: "Advisory and Executive infrastructure split screen",
      centerCta: "Découvrir nos missions",
      departments: [
        {
          dept: "Department 01",
          title: "Advisory",
          subtitle: "Conseil",
          text: "Transformer les priorités en programmes bancables.",
          quote: "Transforming priorities into bankable programs.",
          cta: "Voir le pôle conseil",
        },
        {
          dept: "Department 02",
          title: "Executive Branch",
          subtitle: "Pôle Exécution",
          text: "Sécuriser le delivery et l'ancrage local.",
          quote: "Securing delivery and local roots.",
          cta: "Voir le pôle exécution",
        },
      ],
    },
    method: {
      title: "Valeur ajoutée pour les décideurs",
      intro: "Une approche holistique pour sécuriser les investissements et maximiser l'impact sociétal.",
      items: [
        { icon: "visibility" as IconName, title: "Clarté", text: "Vision stratégique alignée sur les plans nationaux de développement." },
        { icon: "account_balance" as IconName, title: "Bancabilité", text: "Structuration financière rigoureuse répondant aux exigences des IFI." },
        { icon: "construction" as IconName, title: "Exécutabilité", text: "Anticipation des verrous techniques et administratifs avant le lancement." },
        { icon: "rule" as IconName, title: "Contrôle", text: "Pilotage haute performance pour garantir délais et budgets." },
      ],
    },
    positioning: {
      title: "Partenaire d'exécution indépendant",
      text: "Nous comblons le fossé entre la réalité de terrain locale et les standards internationaux les plus exigeants (Banque Mondiale, UE, BAD).",
      standards: [
        "Alignement total avec les Directives de Passation de Marchés.",
        "Maitrise des cadres de conformité environnementale et sociale (E&S).",
        "Expertise reconnue en Partenariats Public-Privé (PPP).",
      ],
      imageAlt: "Plans d'infrastructure et tableaux financiers",
      statValue: "100%",
      statLabel: "Taux de succès de maturité",
    },
    compare: {
      title: "L'approche OPEN vs Traditionnelle",
      standardTitle: "Approche Standard",
      openTitle: "Approche OPEN",
      openBadge: "Standard OPEN",
      standardItems: [
        { title: "Rapports purement conceptuels", text: "Absence de liens directs avec les capacités de mise en œuvre réelle." },
        { title: "Passivité vis-à-vis des blocages", text: "Les experts pointent les problèmes sans proposer de solution opérationnelle." },
        { title: "Déconnexion IFI", text: "Documents souvent non conformes aux critères de financement internationaux." },
      ],
      openItems: [
        { title: "Livrables \"Prêts à Financer\"", text: "Des packages techniques et financiers directement exploitables par les prêteurs." },
        { title: "Task-Force \"Débloquage\"", text: "Intervention directe sur les nœuds institutionnels pour accélérer le pipeline." },
        { title: "Intégration opérationnelle", text: "Présence terrain pour coordonner les services de l'État et les bailleurs." },
      ],
    },
    missions: {
      title: "Missions Types",
      intro: "Des interventions ciblées pour chaque stade du cycle de vie des projets.",
      catalog: "Consulter le catalogue des missions",
      items: [
        { title: "Structuring & Packaging", text: "Préparation des dossiers d'investissement et dossiers de consultation des entreprises (DCE)." },
        { title: "Portfolio Maturity Evaluation", text: "Audit critique du pipeline de projets pour prioriser les investissements à fort impact." },
        { title: "Strategic Corridors", text: "Définition de schémas directeurs pour les infrastructures de transport et d'énergie." },
      ],
    },
    mobilisation: {
      title: "Les 60 premiers jours d'engagement",
      steps: [
        { range: "JOUR 1 - 15", title: "Photo du Portfolio", text: "Diagnostic flash de l'état réel des projets prioritaires et identification immédiate des \"Quick Wins\".", border: "tertiary" as const },
        { range: "JOUR 15 - 45", title: "Ranking de Priorité", text: "Matrice de sélection basée sur la bancabilité, l'impact politique et la rapidité d'exécution.", border: "primary" as const },
        { range: "JOUR 45 - 60", title: "Lancement TdR", text: "Rédaction et validation des Termes de Référence pour les études de faisabilité manquantes.", border: "variant" as const },
      ],
    },
    sectors: {
      title: "Secteurs d'Intervention",
      items: [
        {
          title: "Transport",
          text: "Routes stratégiques, ports et logistique multimodale.",
          gradient: "from-primary",
          titleClass: "font-headline-xl text-headline-xl",
          padding: "p-8",
          layout: "md:col-span-2 md:row-span-2",
        },
        {
          title: "Énergie",
          text: "Production renouvelable et réseaux de distribution.",
          gradient: "from-tertiary",
          titleClass: "font-headline-lg text-headline-lg",
          padding: "p-6",
          layout: "md:col-span-2",
        },
        {
          title: "Eau & Assainissement",
          text: "",
          gradient: "from-secondary",
          titleClass: "font-headline-md text-headline-md",
          padding: "p-4",
          layout: "",
        },
        {
          title: "Développement Urbain",
          text: "",
          gradient: "from-primary-container",
          titleClass: "font-headline-md text-headline-md",
          padding: "p-4",
          layout: "",
        },
      ],
    },
    modes: {
      title: "Modes d'Intervention",
      intro: "Une flexibilité contractuelle adaptée à l'urgence et à la complexité de vos enjeux.",
      items: [
        { title: "Missions Courtes (Task Force)", text: "Diagnostic flash, structuration de dossiers ou évaluation de pipeline sur 2 à 4 mois.", featured: false },
        { title: "Support Intégré (UMOP)", text: "Détachement d'experts au sein des Unités de Gestion de Projets pour un renforcement capacitaire continu.", featured: false },
        { title: "Co-implémentation", text: "Pilotage conjoint avec les administrations pour garantir l'exécution des projets bailleurs.", featured: false },
        { title: "Plateforme Digitale", text: "Accès à nos outils propriétaires de tracking de maturité et de conformité en temps réel.", featured: true },
      ],
    },
    cta: {
      title: "Accélérez votre pipeline d'investissements",
      text: "Discutons de vos projets prioritaires et identifions ensemble les leviers pour passer de l'intention à l'exécution.",
      primary: "Prendre rendez-vous",
      secondary: "Télécharger notre brochure institutionnelle",
    },
    footer: {
      about: "Conseil stratégique et expertise technique pour les infrastructures et politiques publiques. Un pont vers l'excellence institutionnelle.",
      sectorLinks: ["Transport & Logistique", "Énergie & Eau", "Développement Urbain", "Digital & Services"],
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
      metaTitle: "Références institutionnelles",
      metaDescription: "Présentation d'OPEN SARL : préparation, bancabilité et appui à l'exécution en RDC et en Afrique centrale.",
      kicker: "OPEN SARL",
      title: "Références institutionnelles",
      lead: "Conseil, ingénierie et appui à l'exécution pour des projets d'infrastructure finançables en RDC et en Afrique centrale.",
      print: "Enregistrer en PDF",
      back: "Retour à l'accueil",
    },
    legal: {
      metaTitle: "Mentions légales",
      title: "Mentions légales",
      intro: "Ce site présente OPEN SARL, société de conseil, d'ingénierie et d'appui à l'exécution de projets d'infrastructure.",
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
      title: "OPEN | Strategic advisory for public infrastructure",
      description:
        "OPEN SARL prepares, structures and supports delivery of infrastructure projects across the DRC and Central Africa, from priority to bankability and implementation.",
    },
    ui: {
      skip: "Skip to content",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      contact: "Contact",
      languageLabel: "Language",
    },
    nav: [
      { href: "#missions", label: "Missions" },
      { href: "#poles", label: "Practices" },
      { href: "#expertise", label: "Expertise" },
      { href: "#secteurs", label: "Sectors" },
      { href: "#missions", label: "Portfolio" },
    ],
    hero: {
      imageAlt: "Advisory and Executive infrastructure split screen",
      centerCta: "Explore our missions",
      departments: [
        {
          dept: "Department 01",
          title: "Advisory",
          subtitle: "Consulting",
          text: "Turning priorities into bankable programmes.",
          quote: "Transforming priorities into bankable programs.",
          cta: "View the advisory practice",
        },
        {
          dept: "Department 02",
          title: "Executive Branch",
          subtitle: "Delivery practice",
          text: "Securing delivery and local roots.",
          quote: "Securing delivery and local roots.",
          cta: "View the delivery practice",
        },
      ],
    },
    method: {
      title: "Added value for decision-makers",
      intro: "A holistic approach to secure investments and maximise societal impact.",
      items: [
        { icon: "visibility" as IconName, title: "Clarity", text: "A strategic vision aligned with national development plans." },
        { icon: "account_balance" as IconName, title: "Bankability", text: "Rigorous financial structuring that meets IFI requirements." },
        { icon: "construction" as IconName, title: "Executability", text: "Technical and administrative constraints addressed before launch." },
        { icon: "rule" as IconName, title: "Control", text: "High-performance steering to protect time and budget." },
      ],
    },
    positioning: {
      title: "Independent delivery partner",
      text: "We bridge local delivery realities with the most demanding international standards (World Bank, EU, AfDB).",
      standards: [
        "Full alignment with international procurement directives.",
        "Environmental and social (E&S) compliance frameworks.",
        "Recognised public-private partnership (PPP) expertise.",
      ],
      imageAlt: "Infrastructure blueprints and financial spreadsheets",
      statValue: "100%",
      statLabel: "Maturity success rate",
    },
    compare: {
      title: "The OPEN approach vs traditional consulting",
      standardTitle: "Standard approach",
      openTitle: "OPEN approach",
      openBadge: "OPEN standard",
      standardItems: [
        { title: "Purely conceptual reports", text: "No direct link to real implementation capacity." },
        { title: "Passive stance on blockers", text: "Experts identify problems without operational solutions." },
        { title: "IFI disconnect", text: "Documents often fail international financing criteria." },
      ],
      openItems: [
        { title: "Finance-ready deliverables", text: "Technical and financial packages lenders can use directly." },
        { title: "Unblocking task force", text: "Direct intervention on institutional bottlenecks to accelerate the pipeline." },
        { title: "Operational integration", text: "On-the-ground coordination between government and donors." },
      ],
    },
    missions: {
      title: "Typical missions",
      intro: "Targeted interventions for each stage of the project lifecycle.",
      catalog: "Browse the mission catalogue",
      items: [
        { title: "Structuring & Packaging", text: "Investment packages and procurement dossiers (DCE)." },
        { title: "Portfolio Maturity Evaluation", text: "Critical audit of the project pipeline to prioritise high-impact investments." },
        { title: "Strategic Corridors", text: "Master plans for transport and energy infrastructure." },
      ],
    },
    mobilisation: {
      title: "The first 60 days of engagement",
      steps: [
        { range: "DAY 1 - 15", title: "Portfolio snapshot", text: "Flash diagnostic of priority projects and immediate quick wins.", border: "tertiary" as const },
        { range: "DAY 15 - 45", title: "Priority ranking", text: "Selection matrix based on bankability, political impact and speed of execution.", border: "primary" as const },
        { range: "DAY 45 - 60", title: "ToR launch", text: "Drafting and validation of terms of reference for missing feasibility studies.", border: "variant" as const },
      ],
    },
    sectors: {
      title: "Sectors",
      items: [
        {
          title: "Transport",
          text: "Strategic roads, ports and multimodal logistics.",
          gradient: "from-primary",
          titleClass: "font-headline-xl text-headline-xl",
          padding: "p-8",
          layout: "md:col-span-2 md:row-span-2",
        },
        {
          title: "Energy",
          text: "Renewable production and distribution networks.",
          gradient: "from-tertiary",
          titleClass: "font-headline-lg text-headline-lg",
          padding: "p-6",
          layout: "md:col-span-2",
        },
        {
          title: "Water & Sanitation",
          text: "",
          gradient: "from-secondary",
          titleClass: "font-headline-md text-headline-md",
          padding: "p-4",
          layout: "",
        },
        {
          title: "Urban Development",
          text: "",
          gradient: "from-primary-container",
          titleClass: "font-headline-md text-headline-md",
          padding: "p-4",
          layout: "",
        },
      ],
    },
    modes: {
      title: "Engagement models",
      intro: "Contractual flexibility adapted to the urgency and complexity of your challenges.",
      items: [
        { title: "Short missions (Task Force)", text: "Flash diagnostic, dossier structuring or pipeline review over 2 to 4 months.", featured: false },
        { title: "Embedded support (PMU)", text: "Experts within project management units for continuous capacity building.", featured: false },
        { title: "Co-implementation", text: "Joint steering with administrations to deliver donor-funded projects.", featured: false },
        { title: "Digital platform", text: "Access to proprietary maturity and compliance tracking tools in real time.", featured: true },
      ],
    },
    cta: {
      title: "Accelerate your investment pipeline",
      text: "Let's discuss your priority projects and identify the levers to move from intent to execution.",
      primary: "Book a meeting",
      secondary: "Download our institutional brochure",
    },
    footer: {
      about: "Strategic consulting and technical expertise for infrastructure and public policy. A bridge to institutional excellence.",
      sectorLinks: ["Transport & Logistics", "Energy & Water", "Urban Development", "Digital & Services"],
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
      metaTitle: "Credentials",
      metaDescription: "OPEN SARL credentials: preparation, bankability and delivery support across the DRC and Central Africa.",
      kicker: "OPEN SARL",
      title: "Institutional credentials",
      lead: "Advisory, engineering and delivery support for bankable infrastructure projects across the DRC and Central Africa.",
      print: "Save as PDF",
      back: "Back to home",
    },
    legal: {
      metaTitle: "Legal notice",
      title: "Legal notice",
      intro: "This site presents OPEN SARL, a firm for infrastructure advisory, engineering and delivery support.",
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
