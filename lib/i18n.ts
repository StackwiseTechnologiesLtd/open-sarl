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
      title: "OPEN | Infrastructures en RDC et en Afrique centrale",
      description:
        "OPEN SARL prépare, structure et accompagne l'exécution de projets d'infrastructure en RDC et en Afrique centrale, de la priorité à la bancabilité et à la mise en œuvre.",
    },
    ui: {
      skip: "Aller au contenu",
      menuOpen: "Ouvrir le menu",
      menuClose: "Fermer le menu",
      contact: "Contact",
      languageLabel: "Langue",
    },
    nav: [
      { href: "#capabilities", label: "Capacités" },
      { href: "#secteurs", label: "Secteurs" },
      { href: "#experience", label: "Références" },
      { href: "#methode", label: "Méthode" },
      { href: "#modes", label: "Engagement" },
    ],
    hero: {
      eyebrow: "Conseil, ingénierie et appui à l'exécution",
      title: "Transformer les priorités d'infrastructure en projets finançables et exécutables.",
      lead: "OPEN accompagne gouvernements, bailleurs, investisseurs et partenaires techniques dans la préparation, la structuration et l'exécution de projets d'infrastructure en RDC et en Afrique centrale.",
      geography: "RDC · Afrique centrale",
      practices: "Une société, deux pratiques : OPEN Infrastructure Advisory et OPEN Engineering & Delivery.",
      explore: "Explorer les capacités",
      discuss: "Discuter d'un projet",
      imageAlt: "Pont à haubans, infrastructure de transport",
    },
    audiences: {
      eyebrow: "Qui nous servons",
      title: "Des interlocuteurs qui doivent passer de la priorité à la décision.",
      items: [
        { title: "Gouvernements", text: "Ministères, maîtrises d'ouvrage et unités de gestion de projets." },
        { title: "Bailleurs et DFI", text: "Cadres Banque mondiale, UE, BAD et autres financeurs du développement." },
        { title: "Opérateurs", text: "Utilities de l'eau, de l'énergie et des services urbains." },
        { title: "Investisseurs", text: "Sponsors et financeurs qui évaluent une infrastructure." },
        { title: "Partenaires", text: "Cabinets de conseil et d'ingénierie qui ont besoin d'une capacité locale." },
      ],
    },
    problem: {
      eyebrow: "Le blocage",
      title: "Les projets s'arrêtent entre la priorité et la mise en œuvre.",
      text: "Une priorité nationale n'est pas encore un projet finançable et exécutable. Préparation, bancabilité et delivery sont trop souvent confiés à des mandats séparés. OPEN garde ces étapes liées.",
    },
    capabilities: {
      eyebrow: "Ce que fait OPEN",
      title: "Trois capacités, de la priorité à l'exécution.",
      items: [
        {
          name: "Préparation de projets & conseil",
          outcome: "De la priorité au projet prêt à investir",
          text: "Diagnostic de portefeuille, préfaisabilité, faisabilité, préparation de projet, structuration, programmation et corridors.",
        },
        {
          name: "Finance d'infrastructure & bancabilité",
          outcome: "De la faisabilité à la maturité de financement",
          text: "CAPEX/OPEX, abordabilité, modélisation financière, allocation des risques, PPP/PSP, dossiers d'investissement et sensibilités.",
        },
        {
          name: "Ingénierie & appui à l'exécution",
          outcome: "Du financement à la mise en œuvre",
          text: "Passation, supervision, appui aux UGP, suivi des contrats et des risques, systèmes de mise en œuvre et assurance delivery.",
        },
      ],
    },
    sectors: {
      eyebrow: "Secteurs",
      title: "Là où les projets doivent devenir exécutables.",
      items: [
        {
          title: "Eau",
          text: "Adduction urbaine, assainissement et services d'eau.",
          image: "/images/sector-water.png",
          alt: "Installation liée au traitement de l'eau",
          className: "min-h-72 sm:min-h-80 lg:col-span-2 lg:row-span-2 lg:min-h-0",
          titleClass: "text-3xl sm:text-4xl",
        },
        {
          title: "Énergie",
          text: "Hydroélectricité, réseaux et planification des investissements.",
          image: "/images/sector-energy.png",
          alt: "Infrastructure de production et de transport d'énergie",
          className: "min-h-52 lg:col-span-2 lg:min-h-0",
          titleClass: "text-2xl sm:text-3xl",
        },
        {
          title: "Transport & corridors",
          text: "Routes, ouvrages et logistique régionale.",
          image: "/images/sector-transport.png",
          alt: "Ouvrage de franchissement",
          className: "min-h-52 lg:min-h-0",
          titleClass: "text-xl sm:text-2xl",
        },
        {
          title: "Infrastructure urbaine",
          text: "Services et aménagement des villes en croissance.",
          image: "/images/sector-urban.png",
          alt: "Aménagement urbain",
          className: "min-h-52 lg:min-h-0",
          titleClass: "text-xl sm:text-2xl",
        },
      ],
    },
    experience: {
      eyebrow: "Références choisies",
      title: "Ce que le travail couvre, et ce qu'il produit.",
      intro: "Des mandats et des domaines d'intervention. Les photos montrent le type d'infrastructure, pas un cliché de chantier substitué à la preuve.",
      items: [
        {
          place: "Alimentation en eau urbaine | Est de la RDC",
          role: "Préparation de projet et appui à la mise en œuvre",
          outcome: "Plus de 200 000 bénéficiaires",
          image: "/images/sector-water.png",
          alt: "Infrastructure d'eau",
        },
        {
          place: "Infrastructures énergétiques | RDC",
          role: "Bancabilité, préparation technique et institutionnelle",
          outcome: "Hydroélectricité, réseau et planification des investissements",
          image: "/images/sector-energy.png",
          alt: "Infrastructure énergétique",
        },
        {
          place: "Corridors stratégiques | RDC et Afrique centrale",
          role: "Conseil aux parties prenantes, à l'institutionnel et à la maturité d'investissement",
          outcome: "Préparation orientée décision",
          image: "/images/sector-transport.png",
          alt: "Infrastructure de transport",
        },
        {
          place: "Programmes financés par les bailleurs",
          role: "Appui à la mise en œuvre aligné sur les cadres Banque mondiale, UE, BAD et autres DFI",
          outcome: "Continuité entre exigences des bailleurs et réalité de delivery",
          image: "",
          alt: "",
        },
      ],
    },
    adds: {
      eyebrow: "Ce qu'OPEN ajoute",
      title: "Le même mandat, prolongé jusqu'à la décision et l'exécution.",
      conventional: "Mission habituelle",
      added: "Apport OPEN",
      rows: [
        ["Évaluation technique", "Feuille de route de mise en œuvre, prête pour la décision"],
        ["Dossier de faisabilité", "Lecture de maturité d'investissement et de bancabilité"],
        ["Identification des risques", "Responsabilité sur le risque et voie de mitigation"],
        ["Remise de l'étude", "Continuité vers la mise en œuvre et la passation"],
        ["Méthode internationale", "Intelligence institutionnelle et de delivery locale"],
      ],
    },
    method: {
      eyebrow: "Méthode OPEN",
      title: "Quatre variables pour décider.",
      intro: "Clarté, bancabilité, exécutabilité et contrôle transforment une intention en décisions d'exécution.",
      items: [
        { icon: "visibility" as IconName, title: "Clarté", text: "Une vision alignée sur les priorités publiques, assez précise pour être arbitrée." },
        { icon: "account_balance" as IconName, title: "Bancabilité", text: "Une structuration financière lisible pour les bailleurs et les investisseurs." },
        { icon: "construction" as IconName, title: "Exécutabilité", text: "Les verrous techniques, institutionnels et de passation sont traités avant le lancement." },
        { icon: "rule" as IconName, title: "Contrôle", text: "Un pilotage qui relie délais, risques, contrats et budget." },
      ],
    },
    mobilisation: {
      eyebrow: "Méthode",
      title: "Cadre de mobilisation des 60 premiers jours",
      intro: "Un exemple de passage à l'action. Les étapes s'adaptent au mandat : ce n'est pas une séquence unique pour chaque portefeuille.",
      steps: [
        { range: "Jour 1 – 15", title: "Photo du portefeuille", text: "Diagnostic de l'état réel des projets prioritaires et repérage des quick wins." },
        { range: "Jour 15 – 45", title: "Ordre de priorité", text: "Sélection selon la bancabilité, l'effet attendu et la rapidité d'exécution." },
        { range: "Jour 45 – 60", title: "Prochaines actions convenues", text: "Termes de référence, dossier de financement ou chemin de passation, selon ce que le portefeuille demande." },
      ],
    },
    modes: {
      eyebrow: "Comment nous engager",
      title: "Des modes d'intervention adaptés au mandat.",
      intro: "La forme contractuelle suit l'urgence et la complexité, sans présumer un rôle d'entreprise de construction.",
      items: [
        { title: "Mission courte", text: "Diagnostic, structuration de dossier ou lecture de portefeuille, en général sur deux à quatre mois.", featured: false },
        { title: "Appui intégré", text: "Experts auprès des unités de gestion de projets, pour renforcer la capacité dans la durée.", featured: false },
        { title: "Co-implémentation", text: "Pilotage conjoint avec les administrations pour tenir l'exécution des projets de bailleurs.", featured: false },
        { title: "Outils numériques", text: "Suivi de maturité et de conformité, partagé avec l'équipe du client.", featured: true },
      ],
    },
    why: {
      eyebrow: "Pourquoi OPEN",
      title: "Partenaire indépendant pour la préparation et l'exécution des projets.",
      points: [
        { title: "Intelligence locale", text: "Lecture institutionnelle et contraintes réelles de delivery en RDC et en Afrique centrale." },
        { title: "Standards internationaux", text: "Ingénierie, financement et mise en œuvre lisibles pour les partenaires et les bailleurs." },
        { title: "Réseau pluridisciplinaire", text: "Conseil et delivery dans la même société, sans confondre les rôles de conception, de contrôle et d'exécution." },
      ],
      frameworkLabel: "Cadre de maturité de projet",
      framework: ["Technique", "Financier", "Institutionnel", "E&S", "Passation"],
      standards: [
        "Expérience des cadres de passation internationaux et des exigences des projets financés par les bailleurs.",
        "Capacités de conformité environnementale et sociale (E&S) alignées sur la pratique des bailleurs.",
        "Capacités de structuration PPP/PSP et d'allocation des risques.",
      ],
    },
    cta: {
      title: "Dites-nous où le projet est bloqué.",
      text: "Un gouvernement, un bailleur, un investisseur ou un partenaire d'ingénierie peut commencer par un échange ciblé.",
      discuss: "Discuter d'un projet",
      partner: "Devenir partenaire",
      credentials: "Télécharger les références",
    },
    footer: {
      about: "Préparation, structuration et appui à l'exécution de projets d'infrastructure en RDC et en Afrique centrale.",
      sectors: "Secteurs",
      company: "Société",
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
      title: "OPEN | Infrastructure across the DRC and Central Africa",
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
      { href: "#capabilities", label: "Capabilities" },
      { href: "#secteurs", label: "Sectors" },
      { href: "#experience", label: "Experience" },
      { href: "#methode", label: "Method" },
      { href: "#modes", label: "Engage" },
    ],
    hero: {
      eyebrow: "Infrastructure advisory, engineering and delivery support",
      title: "From infrastructure priorities to bankable, implementable projects.",
      lead: "OPEN supports governments, DFIs, investors and technical partners in preparing, structuring and delivering infrastructure projects across the DRC and Central Africa.",
      geography: "DRC · Central Africa",
      practices: "One firm, two practices: OPEN Infrastructure Advisory and OPEN Engineering & Delivery.",
      explore: "Explore capabilities",
      discuss: "Discuss a project",
      imageAlt: "Cable-stayed bridge, transport infrastructure",
    },
    audiences: {
      eyebrow: "Who we serve",
      title: "The people who have to move a priority to a decision.",
      items: [
        { title: "Governments", text: "Ministries, contracting authorities and project management units." },
        { title: "DFIs", text: "World Bank, EU, AfDB and other development-finance frameworks." },
        { title: "Utilities", text: "Water, energy and urban service operators." },
        { title: "Investors", text: "Sponsors and financiers assessing an infrastructure opportunity." },
        { title: "Partners", text: "Consulting and engineering firms that need local delivery capacity." },
      ],
    },
    problem: {
      eyebrow: "The gap",
      title: "Projects stall between priority and implementation.",
      text: "A national priority is not yet a financeable, implementable project. Preparation, bankability and delivery too often sit in separate mandates. OPEN keeps those steps connected.",
    },
    capabilities: {
      eyebrow: "What OPEN does",
      title: "Three capabilities, from priority to delivery.",
      items: [
        {
          name: "Project Preparation & Advisory",
          outcome: "From priorities to investment-ready projects",
          text: "Portfolio diagnostics, pre-feasibility, feasibility, project preparation, structuring, programming and corridors.",
        },
        {
          name: "Infrastructure Finance & Bankability",
          outcome: "From feasibility to financing readiness",
          text: "CAPEX/OPEX, affordability, financial modelling, risk allocation, PPP/PSP, investment packages and sensitivities.",
        },
        {
          name: "Engineering & Delivery Support",
          outcome: "From financing to implementation",
          text: "Procurement, supervision, PMU support, contract and risk monitoring, implementation systems and delivery assurance.",
        },
      ],
    },
    sectors: {
      eyebrow: "Sectors",
      title: "Where projects have to become implementable.",
      items: [
        {
          title: "Water",
          text: "Urban supply, sanitation and water services.",
          image: "/images/sector-water.png",
          alt: "Water infrastructure facility",
          className: "min-h-72 sm:min-h-80 lg:col-span-2 lg:row-span-2 lg:min-h-0",
          titleClass: "text-3xl sm:text-4xl",
        },
        {
          title: "Energy",
          text: "Hydropower, grids and investment planning.",
          image: "/images/sector-energy.png",
          alt: "Energy generation and network infrastructure",
          className: "min-h-52 lg:col-span-2 lg:min-h-0",
          titleClass: "text-2xl sm:text-3xl",
        },
        {
          title: "Transport & corridors",
          text: "Roads, structures and regional logistics.",
          image: "/images/sector-transport.png",
          alt: "Transport crossing structure",
          className: "min-h-52 lg:min-h-0",
          titleClass: "text-xl sm:text-2xl",
        },
        {
          title: "Urban infrastructure",
          text: "Services and planning in growing cities.",
          image: "/images/sector-urban.png",
          alt: "Urban development",
          className: "min-h-52 lg:min-h-0",
          titleClass: "text-xl sm:text-2xl",
        },
      ],
    },
    experience: {
      eyebrow: "Selected experience",
      title: "What the work covers, and what it produces.",
      intro: "Selected mandates and areas of work. Photographs show the kind of infrastructure involved. They are not a substitute for project evidence.",
      items: [
        {
          place: "Urban Water Supply | Eastern DRC",
          role: "Project preparation & implementation support",
          outcome: "200,000+ beneficiaries",
          image: "/images/sector-water.png",
          alt: "Water infrastructure",
        },
        {
          place: "Energy Infrastructure | DRC",
          role: "Bankability, technical and institutional readiness",
          outcome: "Hydropower / grid / investment planning",
          image: "/images/sector-energy.png",
          alt: "Energy infrastructure",
        },
        {
          place: "Strategic Corridors | DRC & Central Africa",
          role: "Stakeholder, institutional and investment-readiness advisory",
          outcome: "Decision-oriented preparation",
          image: "/images/sector-transport.png",
          alt: "Transport infrastructure",
        },
        {
          place: "Donor-funded infrastructure programmes",
          role: "Implementation support aligned with World Bank, EU, AfDB and other development-finance frameworks",
          outcome: "Continuity between donor requirements and delivery reality",
          image: "",
          alt: "",
        },
      ],
    },
    adds: {
      eyebrow: "What OPEN adds",
      title: "The same assignment, carried through to a decision and to delivery.",
      conventional: "Conventional assignment",
      added: "OPEN added value",
      rows: [
        ["Technical assessment", "Decision-ready implementation roadmap"],
        ["Feasibility documentation", "Investment-readiness and bankability lens"],
        ["Risk identification", "Risk ownership and a mitigation pathway"],
        ["Study delivery", "Implementation and procurement continuity"],
        ["International methodology", "Local institutional and delivery intelligence"],
      ],
    },
    method: {
      eyebrow: "OPEN method",
      title: "Four variables for a decision.",
      intro: "Clarity, bankability, executability and control turn an intention into execution decisions.",
      items: [
        { icon: "visibility" as IconName, title: "Clarity", text: "A view aligned with public priorities, precise enough to decide." },
        { icon: "account_balance" as IconName, title: "Bankability", text: "A financial structure that DFIs and investors can read." },
        { icon: "construction" as IconName, title: "Executability", text: "Technical, institutional and procurement constraints are faced before launch." },
        { icon: "rule" as IconName, title: "Control", text: "Steering that connects time, risk, contracts and budget." },
      ],
    },
    mobilisation: {
      eyebrow: "Method",
      title: "First 60-day mobilisation framework",
      intro: "An example of how a portfolio moves toward action. The steps adapt to the mandate. They are not a single sequence for every assignment.",
      steps: [
        { range: "Day 1 – 15", title: "Portfolio picture", text: "A flash reading of priority projects and the quick wins that are actually available." },
        { range: "Day 15 – 45", title: "Priority ranking", text: "A selection based on bankability, expected effect and speed of execution." },
        { range: "Day 45 – 60", title: "Agreed next actions", text: "Terms of reference, a financing package, or a procurement path, depending on what the portfolio needs." },
      ],
    },
    modes: {
      eyebrow: "How to engage OPEN",
      title: "Engagement models that follow the mandate.",
      intro: "The contract shape follows urgency and complexity. It does not assume a construction-contractor role.",
      items: [
        { title: "Short assignment", text: "A diagnostic, a structured package, or a portfolio reading, typically over two to four months.", featured: false },
        { title: "Embedded support", text: "Experts with the project management unit, to build capacity over time.", featured: false },
        { title: "Co-implementation", text: "Joint steering with the administration so donor-funded projects keep moving.", featured: false },
        { title: "Digital tools", text: "Maturity and compliance tracking, shared with the client team.", featured: true },
      ],
    },
    why: {
      eyebrow: "Why OPEN",
      title: "Independent infrastructure advisory and delivery partner.",
      points: [
        { title: "Local intelligence", text: "Institutional reading and real delivery constraints across the DRC and Central Africa." },
        { title: "International standards", text: "Engineering, financing and implementation that partners and DFIs can work with." },
        { title: "A multidisciplinary network", text: "Advisory and delivery inside one firm, without blurring design, control and execution roles." },
      ],
      frameworkLabel: "Project readiness framework",
      framework: ["Technical", "Financial", "Institutional", "E&S", "Procurement"],
      standards: [
        "Experience working with international procurement frameworks and donor-funded project requirements.",
        "Environmental and social (E&S) compliance capabilities aligned with donor practice.",
        "PPP / PSP structuring and risk-allocation capabilities.",
      ],
    },
    cta: {
      title: "Tell us where the project is stuck.",
      text: "A government, a DFI, an investor or an engineering partner can start with a focused conversation.",
      discuss: "Discuss a project",
      partner: "Partner with OPEN",
      credentials: "Download credentials",
    },
    footer: {
      about: "Preparation, structuring and delivery support for infrastructure projects across the DRC and Central Africa.",
      sectors: "Sectors",
      company: "Firm",
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
