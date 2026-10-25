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

const polesHashes = ["#poles", "#poles-advisory", "#poles-engineering"] as const;

/** Nav items in copy use `#section`; resolve to routes where the homepage anchor is not enough. */
export function resolveNavItemHref(locale: Locale, itemHref: string) {
  const home = `/${locale}`;
  if (itemHref === "#portfolio") return `${home}/portfolio`;
  return `${home}${itemHref}`;
}

export function isNavActive(itemHref: string, hash: string, pathname: string) {
  if (itemHref === "#portfolio") {
    if (/^\/(fr|en)\/portfolio\/?$/.test(pathname)) return true;
  }

  const anchor = itemHref.includes("#") ? itemHref.slice(itemHref.indexOf("#")) : itemHref;
  if (anchor === "#poles") {
    if (/^\/(fr|en)\/poles\//.test(pathname)) return true;
    if (!/^\/(fr|en)$/.test(pathname)) return false;
    if (!hash) return false;
    return polesHashes.includes(hash as (typeof polesHashes)[number]);
  }
  if (!/^\/(fr|en)$/.test(pathname)) return false;
  if (!hash) return false;
  return itemHref === hash || itemHref.endsWith(hash);
}

export function isPolesNavHash(hash: string) {
  return polesHashes.includes(hash as (typeof polesHashes)[number]);
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
      title: "OPEN | Conseil et ingénierie d'infrastructures",
      description:
        "OPEN SARL — plateforme intégrée advisory et delivery à Kinshasa : préparation, ingénierie et supervision de programmes pour autorités publiques, UGP/PIU et bailleurs en RDC et Afrique centrale.",
    },
    ui: {
      skip: "Aller au contenu",
      menuOpen: "Ouvrir le menu",
      menuClose: "Fermer le menu",
      contact: "Contact",
      languageLabel: "Langue",
      carouselPrev: "Pôle précédent",
      carouselNext: "Pôle suivant",
      carouselLabel: "Offres OPEN",
    },
    nav: [
      { href: "#missions", label: "Missions" },
      { href: "#poles", label: "Pôles" },
      { href: "#expertise", label: "Expertise" },
      { href: "#secteurs", label: "Secteurs" },
      { href: "#portfolio", label: "Portfolio" },
    ],
    polesMenu: {
      ariaLabel: "Pôles OPEN — Infrastructure Advisory et Engineering & Delivery",
      kicker: "Deux métiers complémentaires au sein d'une même société",
      overviewHref: "#poles",
      overviewLabel: "Vue d'ensemble des pôles",
      practices: [
        {
          id: "advisory",
          href: "/poles/advisory",
          kicker: "Pôle 1",
          title: "OPEN Infrastructure Advisory",
          summary:
            "Préparation de projets, stratégie, diagnostic, bancabilité, structuration, AMO, assistance aux gouvernements et bailleurs, appui aux UGP/PIU, gestion des risques et pilotage de programmes.",
          highlights: "Préparation • Bancabilité • Stratégie • Appui institutionnel",
        },
        {
          id: "engineering",
          href: "/poles/engineering",
          kicker: "Pôle 2",
          title: "OPEN Engineering & Delivery",
          summary:
            "Études techniques, ingénierie, conception, maîtrise d'œuvre, contrôle et supervision, assistance à la réalisation et appui à l'exécution des infrastructures.",
          highlights: "Ingénierie • Conception • Supervision • Appui à la mise en œuvre",
        },
      ],
    },
    polesSection: {
      title: "Nos pôles",
      intro:
        "OPEN sarl structure son offre autour de deux branches complémentaires — de la préparation et la bancabilité jusqu'à l'ingénierie et l'appui à l'exécution.",
      practices: [
        {
          id: "advisory",
          icon: "account_balance" as IconName,
          kicker: "Infrastructure Advisory",
          title: "OPEN Infrastructure Advisory",
          summary:
            "Préparation de projets, stratégie, diagnostic, bancabilité, structuration, AMO, assistance aux gouvernements et bailleurs, appui aux UGP/PIU, gestion des risques et pilotage de programmes.",
          highlights: "Préparation • Bancabilité • Stratégie • Appui institutionnel",
        },
        {
          id: "engineering",
          icon: "construction" as IconName,
          kicker: "Engineering & Delivery",
          title: "OPEN Engineering & Delivery",
          summary:
            "Études techniques, ingénierie, conception, maîtrise d'œuvre, contrôle et supervision, assistance à la réalisation et appui à l'exécution — sans se présenter comme entreprise de construction générale.",
          highlights: "Ingénierie • Conception • Supervision • Appui à la mise en œuvre",
        },
      ],
      exploreLabel: "Explorer ce pôle",
      valueChain: {
        title: "De la décision à l'exécution",
        intro:
          "Les deux pôles couvrent la chaîne de valeur du projet public — préparation finançable d'un côté, ingénierie et supervision de l'autre.",
        advisoryTag: "Pôle 1 · Advisory",
        engineeringTag: "Pôle 2 · Delivery",
        steps: [
          {
            id: "prioritisation",
            pole: "advisory" as const,
            label: "Priorisation & stratégie",
            description: "Pipelines, choix d'investissement et notes de décision.",
          },
          {
            id: "preparation",
            pole: "advisory" as const,
            label: "Préparation & bancabilité",
            description: "Faisabilité, structuration bailleurs et gestion des risques.",
          },
          {
            id: "engineering",
            pole: "engineering" as const,
            label: "Ingénierie & conception",
            description: "Études, conception et cahiers des charges exécutables.",
          },
          {
            id: "delivery",
            pole: "engineering" as const,
            label: "Supervision & mise en œuvre",
            description: "Contrôle d'exécution, reporting et appui au maître d'ouvrage.",
          },
        ],
      },
    },
    polePages: {
      shared: {
        capabilitiesTitle: "Champs d'intervention",
        projectsTitle: "Projets et références",
        projectsIntro:
          "Sélection représentative de mandats rattachés à ce pôle — détail enrichi au fur et à mesure des validations.",
        projectRole: "Rôle d'OPEN",
        projectSector: "Secteur",
        projectLocation: "Localisation",
        projectClient: "Client / contrepartie",
        statusRepresentative: "Typologie de mandat",
        backToPoles: "Tous les pôles",
        otherPole: "Voir l'autre pôle",
        contactCta: "Discuter d'un mandat",
        viewProject: "Voir le projet",
        backToPole: "Retour au pôle",
        moreProjects: "Autres projets",
        contextTitle: "Contexte du mandat",
        deliverablesTitle: "Livrables clés",
        challengeTitle: "Enjeu",
        approachTitle: "Approche OPEN",
        scopeTitle: "Périmètre d'intervention",
        outcomesTitle: "Résultats et effets recherchés",
        mandateType: "Type de mandat",
      },
      advisory: {
        metaTitle: "Infrastructure Advisory",
        metaDescription:
          "Préparation, bancabilité, stratégie et appui institutionnel — OPEN Infrastructure Advisory en RDC et Afrique centrale.",
        kicker: "Pôle 1",
        title: "OPEN Infrastructure Advisory",
        lead: "Préparer, structurer et piloter des programmes d'infrastructure pour des décisions finançables et exécutables.",
        body: "De la définition des priorités à la structuration bailleurs, OPEN accompagne ministères, UGP/PIU et partenaires techniques avec des livrables orientés décision.",
        capabilities: [
          "Préparation et faisabilité de projets",
          "Bancabilité, financement et allocation des risques",
          "Pipelines, priorisation et notes de décision",
          "Appui institutionnel, gouvernance et passation",
          "Programmes financés par les bailleurs (UE, BM, BAD, bilatéraux)",
        ],
        projects: [
          {
            slug: "urban-water-eastern-drc",
            title: "Approvisionnement en eau urbaine",
            sector: "Eau & infrastructures urbaines",
            location: "Est de la RDC",
            clientType: "Autorité publique / programme",
            role: "Préparation de projet et appui à la mise en œuvre",
            summary: "Structuration du programme, préparation des investissements et appui décisionnel pour des services essentiels.",
            status: "Référence représentative",
          },
          {
            slug: "hydropower-energy-systems",
            title: "Hydropower & systèmes énergétiques",
            sector: "Énergie",
            location: "RDC",
            clientType: "Ministère / utility / bailleur",
            role: "Conseil technique, institutionnel et investment readiness",
            summary: "Options techniques, readiness financier et alignement avec les exigences des financeurs.",
            status: "Référence représentative",
          },
          {
            slug: "strategic-corridors",
            title: "Corridors stratégiques",
            sector: "Transport & logistique",
            location: "RDC & Afrique centrale",
            clientType: "Autorités corridor / bailleurs",
            role: "Planification, cartographie des parties prenantes et investment readiness",
            summary: "Priorisation des investissements et préparation de dossiers pour connectivité régionale.",
            status: "Référence représentative",
          },
          {
            slug: "donor-programmes-drc",
            title: "Programmes d'infrastructure financés par les bailleurs",
            sector: "Multi-secteurs",
            location: "RDC",
            clientType: "UGP / PIU / bailleurs",
            role: "Appui à l'exécution et support décisionnel",
            summary: "Alignement sur les exigences de financement international et reporting de programme.",
            status: "Référence représentative",
          },
        ],
      },
      engineering: {
        metaTitle: "Engineering & Delivery",
        metaDescription:
          "Ingénierie, conception, supervision et appui à l'exécution — OPEN Engineering & Delivery en RDC et Afrique centrale.",
        kicker: "Pôle 2",
        title: "OPEN Engineering & Delivery",
        lead: "Relier la préparation des projets aux réalités techniques — études, ingénierie, supervision et appui à la mise en œuvre.",
        body: "OPEN intervient sur la chaîne technique et d'exécution, en respectant les agréments applicables et en s'appuyant sur des partenaires qualifiés lorsque requis.",
        capabilities: [
          "Études techniques et ingénierie de conception",
          "Maîtrise d'œuvre et contrôle de conception",
          "Supervision de travaux et contrôle qualité",
          "Assistance à la réalisation et appui chantier",
          "Livrables d'exécution et reporting de supervision",
        ],
        projects: [
          {
            slug: "urban-networks-supervision",
            title: "Réseaux urbains — supervision",
            sector: "Eau & infrastructures urbaines",
            location: "RDC",
            clientType: "Maître d'ouvrage / UGP",
            role: "Supervision technique et contrôle d'exécution",
            summary: "Suivi de mise en œuvre, contrôle des livrables entreprise et reporting pour le maître d'ouvrage.",
            status: "Référence représentative",
          },
          {
            slug: "water-sanitation-engineering",
            title: "Infrastructures hydrauliques — ingénierie",
            sector: "Eau & assainissement",
            location: "RDC",
            clientType: "Autorité publique",
            role: "Études de conception et ingénierie",
            summary: "Conception technique, dossiers d'exécution et appui à la passation des travaux.",
            status: "Référence représentative",
          },
          {
            slug: "energy-substation-design",
            title: "Postes et réseaux — études associées",
            sector: "Énergie",
            location: "RDC",
            clientType: "Utility / partenaire technique",
            role: "Études d'ingénierie et appui à la réalisation",
            summary: "Ingénierie ciblée et assistance à la mise en service dans le respect des standards.",
            status: "Référence représentative",
          },
        ],
      },
    },
    projectDetails: {
      "urban-water-eastern-drc": {
        metaDescription:
          "Préparation et appui à la mise en œuvre d'un programme d'approvisionnement en eau urbaine — Est de la RDC.",
        body: "Programme visant l'extension des services d'eau en milieu urbain dans un contexte de demande croissante et de contraintes institutionnelles. OPEN intervient en amont des décisions d'investissement pour structurer des composantes finançables et exécutables.",
        mandateType: "Préparation de programme et appui à la mise en œuvre",
        challenge:
          "Prioriser des investissements hydrauliques crédibles pour les autorités et les financeurs, avec une visibilité claire sur les options, les coûts, les risques et la séquence de mise en œuvre.",
        approach:
          "Diagnostic rapide, analyse d'options, structuration en tranches et production de livrables orientés comités de pilotage — en combinant réalisme local et standards internationaux.",
        scope: [
          "Diagnostic sectoriel et analyse des besoins",
          "Structuration du programme et priorisation des composantes",
          "Préparation de notes de décision et dossiers bailleurs",
          "Appui à la gouvernance de programme et au reporting",
        ],
        deliverables: [
          "Notes de priorisation et matrices d'investissement",
          "Diagnostics de maturité et registres de risques",
          "Briefings pour comités de pilotage et autorités",
          "Feuilles de route de préparation et de mise en œuvre",
        ],
        outcomes: [
          "Pipeline d'investissements structuré et défendable",
          "Décisions éclairées sur le phasage et le modèle de délivrance",
          "Meilleure readiness vis-à-vis des financeurs",
        ],
      },
      "hydropower-energy-systems": {
        metaDescription:
          "Conseil technique et investment readiness pour systèmes hydrauliques et énergétiques en RDC.",
        body: "Accompagnement d'autorités et de partenaires techniques sur des programmes énergétiques où les choix technologiques, institutionnels et financiers doivent être alignés avant engagement des études majeures.",
        mandateType: "Conseil technique et investment readiness",
        challenge:
          "Arbitrer entre options techniques et modèles institutionnels tout en démontrant la viabilité financière et la capacité de mise en œuvre aux yeux des bailleurs.",
        approach:
          "Analyse multi-critères, revue de readiness institutionnelle et structuration progressive des dossiers de financement avec scénarios de risque explicites.",
        scope: [
          "Analyse d'options techniques et institutionnelles",
          "Évaluation de bancabilité et scénarios de financement",
          "Alignement avec exigences IFI / bailleurs",
          "Appui à la gouvernance sectorielle",
        ],
        deliverables: [
          "Analyses d'options et notes de faisabilité",
          "Évaluations de bancabilité et allocation des risques",
          "Roadmaps de préparation de projet",
          "Notes de décision pour autorités de tutelle",
        ],
        outcomes: [
          "Options techniques et de gouvernance comparées de façon transparente",
          "Dossiers mieux préparés pour discussions avec financeurs",
          "Réduction des zones d'incertitude avant études détaillées",
        ],
      },
      "strategic-corridors": {
        metaDescription:
          "Planification et investment readiness pour corridors de transport en RDC et Afrique centrale.",
        body: "Travaux de planification et de préparation pour corridors où enjeux de connectivité, parties prenantes multiples et priorisation d'investissements doivent être traités de manière coordonnée.",
        mandateType: "Planification corridor et investment readiness",
        challenge:
          "Transformer une ambition de corridor en pipeline d'investissements priorisés, acceptable par les États, les collectivités et les partenaires au développement.",
        approach:
          "Cartographie des contraintes, consultation structurée des parties prenantes et packaging d'investissements en composantes bankables.",
        scope: [
          "Analyse corridor et cartographie des enjeux",
          "Consultation et alignement des parties prenantes",
          "Priorisation d'investissements et scénarios de phasage",
          "Préparation de dossiers pour mobilisation de financements",
        ],
        deliverables: [
          "Cartographies et notes corridor",
          "Matrices de priorisation d'investissements",
          "Dossiers conceptuels et notes bailleurs",
          "Plans de mobilisation des parties prenantes",
        ],
        outcomes: [
          "Vision corridor traduite en séquence d'investissements",
          "Meilleure lisibilité pour décideurs nationaux et régionaux",
          "Base commune pour dialogues avec financeurs",
        ],
      },
      "donor-programmes-drc": {
        metaDescription:
          "Appui à l'exécution et au reporting pour programmes d'infrastructure financés par les bailleurs en RDC.",
        body: "Appui à des UGP/PIU et autorités de tutelle pour piloter des programmes multi-projets conformes aux exigences de gestion et de reporting des financements internationaux.",
        mandateType: "Appui programme et support décisionnel",
        challenge:
          "Maintenir cadence de décision, qualité de reporting et conformité aux standards bailleurs dans un contexte institutionnel sous pression.",
        approach:
          "Renforcement des routines de pilotage, production de livrables standardisés et appui indépendant aux comités de direction.",
        scope: [
          "Appui au pilotage et à la planification de programme",
          "Reporting périodique et tableaux de bord",
          "Préparation de sessions de décision",
          "Conformité procédures et exigences bailleurs",
        ],
        deliverables: [
          "Tableaux de bord et rapports de programme",
          "Notes de décision et briefings de comités",
          "Checklists de conformité et plans d'action",
          "Appui à la gestion des risques de programme",
        ],
        outcomes: [
          "Reporting plus prévisible pour les financeurs",
          "Décisions de programme documentées et traçables",
          "Capacité de pilotage renforcée au sein de l'UGP/PIU",
        ],
      },
      "urban-networks-supervision": {
        metaDescription:
          "Supervision technique de réseaux urbains et contrôle d'exécution en RDC.",
        body: "Supervision de travaux et de livrables d'entreprise pour des réseaux urbains, avec reporting régulier au maître d'ouvrage et contrôle de la qualité d'exécution.",
        mandateType: "Supervision technique et contrôle d'exécution",
        challenge:
          "Garantir que les ouvrages livrés correspondent aux dossiers approuvés, aux standards techniques et aux attentes du maître d'ouvrage sur le terrain.",
        approach:
          "Présence de supervision structurée, revue systématique des livrables entreprise et registre ouvert des non-conformités et réserves.",
        scope: [
          "Supervision des travaux et contrôle qualité",
          "Revue des dossiers d'exécution et variants",
          "Interface maître d'ouvrage / entreprises",
          "Reporting périodique et levée des réserves",
        ],
        deliverables: [
          "Rapports de supervision et visites de chantier",
          "Revue technique des soumissions et variants",
          "Registres de réserves et plans de levée",
          "Comptes rendus pour comités de pilotage travaux",
        ],
        outcomes: [
          "Meilleure visibilité sur l'avancement réel des travaux",
          "Réduction des écarts non documentés entre conception et exécution",
          "Décisions de réception basées sur des faits vérifiés",
        ],
      },
      "water-sanitation-engineering": {
        metaDescription:
          "Études de conception et ingénierie pour infrastructures hydrauliques en RDC.",
        body: "Ingénierie de conception pour infrastructures hydrauliques, incluant dossiers techniques et appui à la passation, dans le respect des normes et des contraintes de réalisation locale.",
        mandateType: "Études de conception et ingénierie",
        challenge:
          "Produire des dossiers exécutables et passation-ready malgré contraintes de données, délais et capacités locales de mise en œuvre.",
        approach:
          "Conception par étapes, validation technique progressive et coordination avec les exigences environnementales et sociales lorsque requis.",
        scope: [
          "Études de faisabilité et de conception détaillée",
          "Plans, notes de calcul et spécifications",
          "Estimation des coûts et phasage des travaux",
          "Appui technique à la passation",
        ],
        deliverables: [
          "Dossiers de conception et plans",
          "Notes de calcul et rapports techniques",
          "Dossiers d'appel d'offres / consultation entreprises",
          "Appui à l'analyse des offres",
        ],
        outcomes: [
          "Dossiers techniques exploitables par le maître d'ouvrage",
          "Passation préparée avec critères clairs",
          "Risques techniques identifiés en amont des travaux",
        ],
      },
      "energy-substation-design": {
        metaDescription:
          "Études d'ingénierie pour postes et réseaux électriques en RDC.",
        body: "Études ciblées pour postes et composantes de réseau, avec coordination des interfaces et appui à la mise en service selon standards reconnus.",
        mandateType: "Ingénierie ciblée et appui à la réalisation",
        challenge:
          "Sécuriser la faisabilité technique et la compatibilité des interfaces dans un environnement où les contraintes réseau et opérationnelles évoluent rapidement.",
        approach:
          "Ingénierie par composante, revue indépendante des hypothèses et accompagnement des étapes clés jusqu'à la mise en service.",
        scope: [
          "Études de dimensionnement et de layout",
          "Spécifications équipements et interfaces",
          "Appui aux essais et mise en service",
          "Coordination avec exploitant et partenaires",
        ],
        deliverables: [
          "Études techniques et notes de calcul",
          "Spécifications et dossiers d'exécution",
          "Plans de tests et procédures de réception",
          "Rapports de suivi de mise en service",
        ],
        outcomes: [
          "Composantes réseau dimensionnées sur bases explicites",
          "Interfaces techniques clarifiées entre acteurs",
          "Réception et mise en service mieux préparées",
        ],
      },
    },
    portfolio: {
      title: "Portfolio",
      intro:
        "Expériences, projets et références — enrichis progressivement au fur et à mesure de leur validation.",
      viewAllCta: "Voir toutes les références",
      pageTitle: "Portfolio & références",
      pageIntro:
        "Sélection de mandats rattachés aux deux pôles OPEN — cliquez sur une fiche pour le détail (contexte, périmètre, livrables).",
      categories: [
        "Water & Urban Infrastructure",
        "Energy & Power Systems",
        "Strategic Corridors & Transport",
        "Donor-funded Infrastructure Programmes",
        "Project Preparation & Institutional Support",
      ],
      note: "Chaque référence pourra détailler projet, secteur, localisation, client, rôle d'OPEN, livrables et résultats clés.",
      featuredSlugs: [
        "urban-water-eastern-drc",
        "strategic-corridors",
        "donor-programmes-drc",
        "urban-networks-supervision",
        "water-sanitation-engineering",
        "hydropower-energy-systems",
      ],
    },
    hero: {
      imageAlt: "Programmes d'infrastructures stratégiques en RDC",
      centerCta: "Découvrir nos services",
      platform:
        "Une plateforme intégrée pour transformer les priorités d'infrastructure en projets finançables et exécutables.",
      scope:
        "Ministères, gouvernorats, agences publiques, UGP/PIU, régies et bailleurs — conseil, ingénierie et supervision en RDC et Afrique centrale.",
      clients: [
        "Ministères",
        "Gouvernorats",
        "Agences publiques",
        "UGP / PIU",
        "Bailleurs & IFI",
      ],
      departments: [
        {
          dept: "Infrastructure Advisory",
          watermark: "ADVISORY",
          title: "Infrastructure Advisory",
          subtitle: "Préparation & bancabilité",
          text: "Diagnostics, pipelines, structuration bailleurs et appui institutionnel — du concept à des dossiers finançables.",
          quote: "",
          cta: "Explorer le pôle Advisory",
          ctaHref: "/poles/advisory",
        },
        {
          dept: "Engineering & Delivery",
          watermark: "DELIVERY",
          title: "Engineering & Delivery",
          subtitle: "Ingénierie & exécution",
          text: "Études, conception, supervision et appui au maître d'ouvrage — sans se présenter comme entreprise de construction générale.",
          quote: "",
          cta: "Explorer le pôle Delivery",
          ctaHref: "/poles/engineering",
        },
      ],
    },
    method: {
      title: "Expertise",
      intro:
        "Quatre domaines d'intervention pour structurer des programmes à fort impact, alignés sur les attentes des bailleurs et des autorités publiques.",
      items: [
        {
          icon: "construction" as IconName,
          title: "Préparation des projets",
          text: "Diagnostics sectoriels, faisabilité, analyse d'options techniques et feuilles de route de mise en œuvre réalistes.",
        },
        {
          icon: "account_balance" as IconName,
          title: "Structuration pour financement bailleurs",
          text: "Notes conceptuelles, développement de pipelines, packaging en tranches finançables et alignement UE / IFI.",
        },
        {
          icon: "rule" as IconName,
          title: "Bancabilité et gestion des risques",
          text: "Évaluation de maturité, registres de risques, analyse des capacités institutionnelles et choix de modèles de mise en œuvre.",
        },
        {
          icon: "visibility" as IconName,
          title: "Conseil stratégique",
          text: "Planification nationale et provinciale, stratégies corridors et connectivité, priorisation des investissements.",
        },
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
      title: "Principes de travail et valeur pour les partenaires publics",
      standardTitle: "Principes opérationnels",
      openTitle: "Valeur pour les partenaires publics",
      openBadge: "OPEN SARL",
      standardItems: [
        {
          title: "Rigueur technique et intégrité professionnelle",
          text: "Des analyses fondées sur des standards reconnus et une posture indépendante.",
        },
        {
          title: "Solutions pragmatiques adaptées au contexte",
          text: "Des recommandations tenant compte des contraintes institutionnelles et opérationnelles locales.",
        },
        {
          title: "Résultats opérationnels, pas de rapports théoriques",
          text: "Priorité aux livrables actionnables, à la gouvernance claire et à un reporting prévisible.",
        },
      ],
      openItems: [
        {
          title: "Standards internationaux",
          text: "Réalisme d'exécution local, combiné aux exigences UE, Banque mondiale, BAD, KfW, AFD et USAID.",
        },
        {
          title: "Livrables prêts pour décision",
          text: "Matériaux structurés pour Ministre, Gouverneur et Comités de pilotage.",
        },
        {
          title: "Appui indépendant",
          text: "Une posture centrée sur la valeur publique, la gouvernance et les résultats — pas sur la production de rapports.",
        },
      ],
    },
    livrables: {
      title: "Livrables typiques",
      intro:
        "Des outputs concrets pour alimenter les décisions, les études et les dossiers bailleurs.",
      catalog: "Consulter la note de capacités",
      items: [
        {
          title: "Pipelines et priorisation",
          text: "Pipelines d'investissement et notes de priorisation aux niveaux national et provincial.",
        },
        {
          title: "Notes de décision",
          text: "Briefings pour Ministre, Gouverneur ou Comité de pilotage — options, coûts, risques et recommandations.",
        },
        {
          title: "TdR et maturité",
          text: "Termes de Référence pour faisabilité, études E&S, conception et supervision ; évaluations de maturité et registres de risques.",
        },
        {
          title: "Supervision et reporting",
          text: "Rapports de supervision, contrôle de livrables entreprise et tableaux de bord pour le maître d'ouvrage.",
        },
      ],
    },
    missions: {
      title: "Missions",
      intro:
        "Quatre modalités d'intervention — du diagnostic rapide à la co-delivery avec des partenaires techniques internationaux.",
      steps: [
        {
          range: "01",
          title: "Missions courtes",
          text: "Diagnostic, priorisation et briefing aux décideurs.",
          border: "tertiary" as const,
        },
        {
          range: "02",
          title: "Préparation de projets",
          text: "Du concept à la faisabilité — coordination des études et structuration.",
          border: "primary" as const,
        },
        {
          range: "03",
          title: "Appui intégré",
          text: "Rôles d'appui au sein des UGP/PIU ou équipes ministérielles.",
          border: "variant" as const,
        },
        {
          range: "04",
          title: "Mise en œuvre conjointe",
          text: "Collaboration avec bureaux internationaux et experts multidisciplinaires selon les besoins du mandat.",
          border: "tertiary" as const,
        },
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
      intro:
        "Comment OPEN travaille avec les autorités publiques et leurs partenaires techniques.",
      items: [
        {
          title: "Missions courtes",
          text: "Diagnostic, priorisation et briefing aux décideurs.",
          featured: false,
        },
        {
          title: "Préparation de projets",
          text: "Du concept à la faisabilité — coordination des études et structuration.",
          featured: false,
        },
        {
          title: "Appui intégré",
          text: "Rôles d'appui au sein des UGP/PIU ou équipes ministérielles.",
          featured: false,
        },
        {
          title: "Mise en œuvre conjointe",
          text: "Collaboration avec bureaux internationaux et experts multidisciplinaires selon les besoins.",
          featured: false,
        },
      ],
    },
    cta: {
      title: "Structurer votre pipeline d'investissements",
      text: "Ministères nationaux, gouvernorats, agences publiques, UGP/PIU, régies et autorités de corridors — discutons de vos programmes prioritaires.",
      primary: "Prendre contact",
      secondary: "Télécharger la note de capacités",
    },
    footer: {
      about:
        "Branche conseil en infrastructures de OPEN SARL, basée à Kinshasa. Préparation, structuration et appui à la mise en œuvre de programmes stratégiques pour les autorités publiques.",
      sectorLinks: [
        "Transport & logistique",
        "Énergie",
        "Eau & assainissement",
        "Infrastructures urbaines",
      ],
      companyLinks: [
        { href: "#missions", label: "Missions" },
        { href: "#poles", label: "Pôles" },
        { href: "#expertise", label: "Expertise" },
        { href: "#portfolio", label: "Portfolio" },
        { href: "/branding", label: "Charte" },
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
      mandateDisclaimer:
        "OPEN intervient dans le cadre de ses agréments et rôles déclarés ; les travaux soumis à qualification spécifique peuvent mobiliser des partenaires certifiés lorsque requis.",
    },
    brochure: {
      metaTitle: "Note de capacités",
      metaDescription:
        "Note de capacités OPEN SARL — conseil en infrastructures pour autorités publiques et bailleurs, basée à Kinshasa (RDC).",
      kicker: "OPEN SARL",
      title: "Note de capacités — Conseil en infrastructures",
      coverTitle: "Note de capacités",
      coverSubtitle: "Infrastructure Advisory & Engineering — RDC & Afrique centrale",
      lead: "Accompagner les autorités nationales et provinciales dans la préparation, la structuration et la mise en œuvre de programmes d'infrastructures stratégiques.",
      downloadOfficial: "Télécharger le PDF officiel (EN–US/RDC)",
      downloadBilingual: "PDF bilingue EN–FR",
      viewOfficialEn: "Voir le PDF officiel (EN) dans le navigateur",
      viewOfficialBilingual: "Voir le PDF bilingue dans le navigateur",
      officialNote:
        "Le PDF fourni par OPEN reste la référence pour les appels d'offres et partenaires. La version web ci-dessous reprend la charte documentaire (page de garde + pages intérieures) pour impression ou export navigateur.",
      print: "Imprimer / PDF (version web)",
      templatesLink: "Modèles documentaires",
      toolbarMore: "Autres options et liens",
      back: "Retour à l'accueil",
    },
    legal: {
      metaTitle: "Mentions légales",
      title: "Mentions légales",
      intro:
        "Ce site présente OPEN SARL — branche conseil en infrastructures basée à Kinshasa (RDC), au service des autorités publiques et de leurs partenaires bailleurs.",
      editor: "Éditeur",
      publisher: "Directeur de la publication",
      publisherBody: "La direction d'OPEN SARL.",
      disclaimer:
        "Les informations décrivent l'offre. Elles ne constituent pas une offre contractuelle. Les références chiffrées, lorsqu'elles sont indiquées, décrivent un mandat précis et non une performance générale de la société.",
      back: "Retour à l'accueil",
    },
    privacy: {
      metaTitle: "Confidentialité",
      title: "Confidentialité",
      intro:
        "OPEN SARL ne dépose pas de traceur publicitaire sur ce site. La navigation ne crée pas de compte.",
      contactTitle: "Prise de contact",
      contactBody:
        "Les boutons de contact, de partenariat, de recrutement et de newsletter ouvrent votre messagerie. Le message part seulement si vous l'envoyez. OPEN SARL utilise alors l'adresse pour répondre, le temps du suivi de l'échange.",
      rightsTitle: "Vos demandes",
      rightsLead:
        "Pour accéder aux informations liées à un échange, les rectifier ou demander leur suppression, écrivez à",
      back: "Retour à l'accueil",
    },
    notFound: {
      title: "Page introuvable",
      text: "Cette adresse ne correspond à aucune page du site OPEN.",
      back: "Retour à l'accueil",
    },
    documentsHub: {
      metaTitle: "Documents OPEN",
      metaDescription: "Notes de capacités et modèles — visualisation A4 et téléchargement.",
      title: "Documents",
      intro: "Consultez les PDF officiels ou la version web au format A4, puis téléchargez-les depuis le navigateur.",
      brandLink: "Charte graphique — couverture, enveloppe, lettre, facture et cartes",
      viewInBrowser: "Aperçu A4 · téléchargement",
      webBadge: "Web · A4",
      webBrochureTitle: "Note de capacités (version web)",
      webBrochureDesc: "Pages letterhead OPEN — export PDF depuis le navigateur.",
      templateBadge: "Modèles",
      templatesSectionTitle: "Modèles documentaires",
      templatesSectionIntro:
        "En-tête, proposition et rapport sur une seule page A4 — textes de communication complets, export PDF.",
      templateTitle: "Modèles documentaires OPEN",
      templateDesc: "Voir la liste des trois gabarits OPEN.",
      backToList: "Retour à la liste des documents",
      titles: {
        capabilityUsDrcEn: "Capability Statement — US / RDC (EN)",
        capabilityBilingual: "Capability Statement — bilingue EN / FR",
      },
    },
    documentViewer: {
      downloadPdf: "Télécharger le PDF",
      downloadWebPdf: "Télécharger en PDF",
      openNewTab: "Ouvrir dans un nouvel onglet",
      pdfHint: "Aperçu du fichier officiel. Utilisez « Télécharger » pour enregistrer une copie.",
      a4PagesHint: "Format A4 · faites défiler les pages",
      a4TwoPagesHint: "2 pages A4",
      allDocuments: "Tous les documents",
    },
    documentTemplatesHub: {
      metaTitle: "Modèles documentaires",
      metaDescription:
        "En-tête, proposition et rapport OPEN — gabarits A4 complets pour la communication institutionnelle, export PDF.",
      title: "Modèles documentaires",
      intro:
        "En-tête courrier, proposition commerciale et rapport de mission sur une seule vue A4. Textes d’exemple à adapter avant envoi.",
      templateBadge: "Modèle · A4",
      allTemplates: "Tous les modèles",
      allTemplatesCombined: "Voir les trois modèles",
      combinedViewerTitle: "Modèles documentaires OPEN",
      combinedIntro:
        "En-tête (bandeau institutionnel + variante épurée filigrane), proposition et rapport — textes prêts à personnaliser.",
      pageCountHint: "{count} pages A4 · faites défiler",
      backToDocuments: "Retour aux documents",
    },
    documentTemplates: {
      print: "Imprimer",
      backToBrochure: "Retour à la note de capacités",
      coverHint: "Page de garde",
      bodyHint: "Contenu du document — remplacer ce texte.",
      sampleDate: "28 août 2024",
      toLabel: "À.",
      toName: "M. / Mme [Nom du destinataire]",
      toCompany: "Ministère / agence / bailleur",
      toAddress: "Adresse postale\nKinshasa, République démocratique du Congo",
      classicVariant: {
        coverKicker: "Variante épurée · comparaison",
        coverTitle: "En-tête minimal",
        coverSubtitle: "Filigrane · pied de page contact",
        coverLead:
          "Mise en page sobre : logo en tête, marque en filigrane à droite, coordonnées en bas de page — sans bandeau géométrique.",
        footerAddressLines: ["Kinshasa", "République démocratique du Congo"],
      },
      kinds: {
        letterhead: {
          title: "En-tête",
          desc: "Courriers officiels — variante institutionnelle (bandeau) et variante épurée (filigrane).",
          viewerTitle: "Modèle en-tête OPEN",
          intro: "Gabarit en-tête pour courriers et notes.",
          coverTitle: "En-tête OPEN",
          coverSubtitle: "Infrastructure Advisory & Engineering",
          coverLead:
            "Correspondance institutionnelle — charte OPEN SARL pour courriers, notes de service et transmissions aux partenaires.",
          subjectLabel: "Objet : [Préciser l’objet du courrier]",
          salutation: "Monsieur / Madame,",
          bodyParagraph1:
            "Nous avons l’honneur de vous adresser la présente note dans le cadre de [programme / dossier / mission]. OPEN SARL intervient en appui aux autorités publiques, aux unités de gestion de projet et aux partenaires au développement pour la préparation, l’ingénierie et le pilotage de programmes d’infrastructure en RDC et en Afrique centrale.",
          bodyParagraph2:
            "Veuillez trouver ci-joint [document / rapport / liste des pièces]. Nous restons à votre disposition pour tout complément d’information ou échange technique. Dans l’attente de votre retour, nous vous prions d’agréer, Monsieur / Madame, l’expression de nos salutations distinguées.",
          closing: "",
          signatureBlock: "Pour OPEN SARL\n[Nom et fonction]\nKinshasa",
        },
        proposal: {
          title: "Proposition",
          desc: "Offre de services — contexte, périmètre, livrables et conditions.",
          viewerTitle: "Modèle proposition OPEN",
          intro: "Gabarit proposition commerciale.",
          coverTitle: "Proposition de services",
          coverSubtitle: "Infrastructure Advisory & Engineering",
          coverLead:
            "Offre d’accompagnement technique pour la préparation, la structuration et la mise en œuvre d’un programme d’infrastructure.",
          toName: "Point focal / décideur",
          toCompany: "Institution cliente ou partenaire",
          subjectLabel: "Objet : Proposition d’accompagnement — [intitulé du programme]",
          sectionObjectiveIntro:
            "OPEN SARL propose un appui intégré combinant conseil en amont (préparation, faisabilité, structuration) et ingénierie de delivery, aligné sur les standards des bailleurs et les procédures nationales.",
          sectionObjectiveTitle: "Contexte et objectifs",
          sectionObjective:
            "Le programme vise à [objectif principal]. OPEN mobilisera une équipe pluridisciplinaire pour sécuriser les phases amont, renforcer la capacité institutionnelle du maître d’ouvrage et produire des livrables exploitables pour le financement et la mise en œuvre.",
          sectionScopeTitle: "Périmètre proposé",
          sectionScopeBody: "La mission s’articule autour des volets suivants (durée et calendrier à valider avec le client) :",
          sectionScopeBullets: [
            "Diagnostic et cadrage : revue documentaire, ateliers avec les parties prenantes, feuille de route.",
            "Préparation / faisabilité : notes de concept, estimations, analyse des risques et plan de mitigation.",
            "Appui UGP / maître d’ouvrage : procédures, reporting, coordination des études et des consultations.",
            "Supervision technique et contrôle qualité sur les phases études et travaux, selon le périmètre retenu.",
          ],
          sectionDeliverablesTitle: "Livrables",
          sectionDeliverablesBody: "Les livrables seront remis en versions provisoires et finales, avec restitution aux instances de gouvernance du programme :",
          sectionDeliverablesBullets: [
            "Note de cadrage et plan de travail validé.",
            "Rapports d’étape et de fin de mission (FR / EN selon besoin).",
            "Dossiers techniques, matrices de risques et calendrier de mise en œuvre.",
            "Supports de restitution (présentation et synthèse exécutive).",
          ],
          sectionTermsTitle: "Modalités",
          sectionTermsBody:
            "Durée indicative : [X] mois. Équipe : directeur de mission, experts sectoriels, ingénieurs et appui administratif OPEN Kinshasa. Honoraires, déplacements et taxes : selon devis détaillé annexé. Validité de l’offre : 60 jours à compter de la date du présent document.",
        },
        report: {
          title: "Rapport",
          desc: "Compte rendu de mission — synthèse, constats, recommandations.",
          viewerTitle: "Modèle rapport OPEN",
          intro: "Gabarit rapport de mission ou note de synthèse.",
          coverTitle: "Rapport de mission",
          coverSubtitle: "Note de synthèse",
          coverLead:
            "Compte rendu d’activités et recommandations pour [programme / contrat / période de reporting].",
          reportPeriod: "Période couverte : [mois année – mois année]",
          reportIntro:
            "Le présent rapport consolide les activités réalisées par OPEN SARL sur la période indiquée, les principaux résultats obtenus et les suites recommandées pour le comité de pilotage et les partenaires techniques et financiers.",
          sectionSummaryTitle: "Synthèse exécutive",
          sectionSummaryBody:
            "Sur la période, l’équipe OPEN a [résumé en 3–4 phrases : jalons atteints, livrables remis, niveau d’avancement par rapport au plan de travail]. Les risques majeurs identifiés restent [synthèse]. Le programme demeure aligné sur les objectifs convenus avec le maître d’ouvrage.",
          sectionFindingsTitle: "Constats principaux",
          sectionFindingsBody: "Les éléments suivants ressortent de l’exécution et des revues menées avec les parties prenantes :",
          sectionFindingsBullets: [
            "Avancement technique : [état des études / travaux / validations].",
            "Gouvernance et reporting : [fréquence des instances, qualité des données].",
            "Capacité institutionnelle : [points forts et écarts UGP / MOA].",
            "Risques et mitigation : [top 3 risques et mesures en cours].",
          ],
          sectionNextTitle: "Prochaines étapes",
          sectionNextBody: "OPEN recommande de prioriser les actions ci-dessous pour la période à venir :",
          sectionNextBullets: [
            "Valider [livrable / décision] en comité de pilotage avant [date].",
            "Finaliser [étude / dossier de financement / appel d’offres].",
            "Renforcer [formation / procédure / ressource] identifiée en revue de mi-parcours.",
            "Planifier la mission de supervision / la revue indépendante du [trimestre].",
          ],
        },
      },
    },
  },
  en: {
    meta: {
      title: "OPEN | Infrastructure advisory & engineering",
      description:
        "OPEN SARL — integrated advisory and delivery platform in Kinshasa: preparation, engineering, and supervision for public authorities, PIUs, and development partners across the DRC and Central Africa.",
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
      { href: "#portfolio", label: "Portfolio" },
    ],
    polesMenu: {
      ariaLabel: "OPEN practices — Infrastructure Advisory and Engineering & Delivery",
      kicker: "Two complementary practices within one firm",
      overviewHref: "#poles",
      overviewLabel: "Overview of our practices",
      practices: [
        {
          id: "advisory",
          href: "/poles/advisory",
          kicker: "Practice 1",
          title: "OPEN Infrastructure Advisory",
          summary:
            "Project preparation, strategy, diagnostics, bankability, structuring, owner's advisory, support to governments and donors, PIU/UGP support, risk management, and programme management.",
          highlights: "Preparation • Bankability • Strategy • Institutional support",
        },
        {
          id: "engineering",
          href: "/poles/engineering",
          kicker: "Practice 2",
          title: "OPEN Engineering & Delivery",
          summary:
            "Technical studies, engineering, design, supervision, construction oversight, implementation assistance, and infrastructure delivery support.",
          highlights: "Engineering • Design • Supervision • Implementation support",
        },
      ],
    },
    polesSection: {
      title: "Our practices",
      intro:
        "OPEN sarl is structured around two complementary branches — from preparation and bankability through engineering and delivery support.",
      practices: [
        {
          id: "advisory",
          icon: "account_balance" as IconName,
          kicker: "Infrastructure Advisory",
          title: "OPEN Infrastructure Advisory",
          summary:
            "Project preparation, strategy, diagnostics, bankability, structuring, owner's advisory, support to governments and donors, PIU/UGP support, risk management, and programme management.",
          highlights: "Preparation • Bankability • Strategy • Institutional support",
        },
        {
          id: "engineering",
          icon: "construction" as IconName,
          kicker: "Engineering & Delivery",
          title: "OPEN Engineering & Delivery",
          summary:
            "Technical studies, engineering, design, supervision, construction oversight, and implementation support — without positioning OPEN as a general contractor.",
          highlights: "Engineering • Design • Supervision • Implementation support",
        },
      ],
      exploreLabel: "Explore this practice",
      valueChain: {
        title: "From decision to delivery",
        intro:
          "Both practices span the project lifecycle — bankable preparation on one side, engineering and supervision on the other.",
        advisoryTag: "Practice 1 · Advisory",
        engineeringTag: "Practice 2 · Delivery",
        steps: [
          {
            id: "prioritisation",
            pole: "advisory" as const,
            label: "Prioritisation & strategy",
            description: "Pipelines, investment choices, and decision briefs.",
          },
          {
            id: "preparation",
            pole: "advisory" as const,
            label: "Preparation & bankability",
            description: "Feasibility, donor structuring, and risk allocation.",
          },
          {
            id: "engineering",
            pole: "engineering" as const,
            label: "Engineering & design",
            description: "Studies, design, and executable tender packages.",
          },
          {
            id: "delivery",
            pole: "engineering" as const,
            label: "Supervision & delivery",
            description: "Construction oversight, reporting, and owner support.",
          },
        ],
      },
    },
    polePages: {
      shared: {
        capabilitiesTitle: "Scope of services",
        projectsTitle: "Projects and references",
        projectsIntro:
          "Representative selection of mandates under this practice — details added as references are validated.",
        projectRole: "OPEN role",
        projectSector: "Sector",
        projectLocation: "Location",
        projectClient: "Client / counterpart",
        statusRepresentative: "Representative mandate",
        backToPoles: "All practices",
        otherPole: "View the other practice",
        contactCta: "Discuss a mandate",
        viewProject: "View project",
        backToPole: "Back to practice",
        moreProjects: "More projects",
        contextTitle: "Mandate context",
        deliverablesTitle: "Key deliverables",
        challengeTitle: "Challenge",
        approachTitle: "OPEN approach",
        scopeTitle: "Scope of work",
        outcomesTitle: "Results and intended effects",
        mandateType: "Mandate type",
      },
      advisory: {
        metaTitle: "Infrastructure Advisory",
        metaDescription:
          "Project preparation, bankability, strategy, and institutional support — OPEN Infrastructure Advisory in the DRC and Central Africa.",
        kicker: "Practice 1",
        title: "OPEN Infrastructure Advisory",
        lead: "Prepare, structure, and steer infrastructure programmes toward bankable, implementable decisions.",
        body: "From investment prioritisation to donor-ready packaging, OPEN supports ministries, PIUs, and technical partners with decision-oriented deliverables.",
        capabilities: [
          "Project preparation and feasibility",
          "Bankability, finance, and risk allocation",
          "Pipelines, prioritisation, and decision briefs",
          "Institutional support, governance, and procurement readiness",
          "Donor-funded programmes (EU, World Bank, AfDB, bilaterals)",
        ],
        projects: [
          {
            slug: "urban-water-eastern-drc",
            title: "Urban water supply",
            sector: "Water & urban infrastructure",
            location: "Eastern DRC",
            clientType: "Public authority / programme",
            role: "Project preparation and implementation support",
            summary: "Programme structuring, investment preparation, and decision support for essential services.",
            status: "Representative reference",
          },
          {
            slug: "hydropower-energy-systems",
            title: "Hydropower & energy systems",
            sector: "Energy",
            location: "DRC",
            clientType: "Ministry / utility / donor",
            role: "Technical, institutional, and investment-readiness advisory",
            summary: "Technical options, financial readiness, and alignment with financier requirements.",
            status: "Representative reference",
          },
          {
            slug: "strategic-corridors",
            title: "Strategic corridors",
            sector: "Transport & logistics",
            location: "DRC & Central Africa",
            clientType: "Corridor authorities / donors",
            role: "Planning, stakeholder mapping, and investment readiness",
            summary: "Investment prioritisation and dossier preparation for regional connectivity.",
            status: "Representative reference",
          },
          {
            slug: "donor-programmes-drc",
            title: "Donor-funded infrastructure programmes",
            sector: "Multi-sector",
            location: "DRC",
            clientType: "PIU / UGP / donors",
            role: "Implementation support and decision backing",
            summary: "Alignment with international financing requirements and programme reporting.",
            status: "Representative reference",
          },
        ],
      },
      engineering: {
        metaTitle: "Engineering & Delivery",
        metaDescription:
          "Engineering, design, supervision, and implementation support — OPEN Engineering & Delivery in the DRC and Central Africa.",
        kicker: "Practice 2",
        title: "OPEN Engineering & Delivery",
        lead: "Connect project preparation to technical reality — studies, engineering, supervision, and delivery support.",
        body: "OPEN supports the technical and delivery chain in line with applicable licences, working with qualified partners where required.",
        capabilities: [
          "Technical studies and design engineering",
          "Design review and owner's engineering",
          "Works supervision and quality control",
          "Implementation assistance and site support",
          "Delivery reporting and supervision outputs",
        ],
        projects: [
          {
            slug: "urban-networks-supervision",
            title: "Urban networks — supervision",
            sector: "Water & urban infrastructure",
            location: "DRC",
            clientType: "Project owner / PIU",
            role: "Technical supervision and delivery control",
            summary: "Implementation monitoring, contractor deliverable review, and owner reporting.",
            status: "Representative reference",
          },
          {
            slug: "water-sanitation-engineering",
            title: "Water infrastructure — engineering",
            sector: "Water & sanitation",
            location: "DRC",
            clientType: "Public authority",
            role: "Design studies and engineering",
            summary: "Technical design, execution dossiers, and procurement support.",
            status: "Representative reference",
          },
          {
            slug: "energy-substation-design",
            title: "Substations & networks — associated studies",
            sector: "Energy",
            location: "DRC",
            clientType: "Utility / technical partner",
            role: "Engineering studies and delivery support",
            summary: "Targeted engineering and commissioning support to international standards.",
            status: "Representative reference",
          },
        ],
      },
    },
    projectDetails: {
      "urban-water-eastern-drc": {
        metaDescription: "Project preparation and implementation support for urban water supply — Eastern DRC.",
        body: "Programme to extend urban water services amid rising demand and institutional constraints. OPEN supports upstream investment decisions with financeable, implementable components.",
        mandateType: "Programme preparation and implementation support",
        challenge:
          "Prioritise credible hydraulic investments for authorities and financiers with clear visibility on options, costs, risks, and implementation sequencing.",
        approach:
          "Rapid diagnostic, options analysis, tranche structuring, and steering-committee-ready outputs — combining local delivery realism and international standards.",
        scope: [
          "Sector diagnostic and needs analysis",
          "Programme structuring and component prioritisation",
          "Decision notes and donor-facing dossiers",
          "Programme governance and reporting support",
        ],
        deliverables: [
          "Prioritisation notes and investment matrices",
          "Maturity diagnostics and risk registers",
          "Briefings for steering committees and authorities",
          "Preparation and implementation roadmaps",
        ],
        outcomes: [
          "Structured, defensible investment pipeline",
          "Clear decisions on phasing and delivery model",
          "Stronger readiness for financier discussions",
        ],
      },
      "hydropower-energy-systems": {
        metaDescription: "Technical advisory and investment readiness for hydropower and energy systems in the DRC.",
        body: "Support to authorities and technical partners on energy programmes where technology, institutions, and finance must align before major studies are committed.",
        mandateType: "Technical advisory and investment readiness",
        challenge:
          "Balance technical and institutional options while demonstrating financial viability and deliverability to development financiers.",
        approach:
          "Multi-criteria analysis, institutional readiness review, and progressive packaging of financing dossiers with explicit risk scenarios.",
        scope: [
          "Technical and institutional options analysis",
          "Bankability assessment and financing scenarios",
          "Alignment with IFI / donor requirements",
          "Sector governance support",
        ],
        deliverables: [
          "Options analysis and feasibility notes",
          "Bankability assessments and risk allocation",
          "Project preparation roadmaps",
          "Decision notes for line ministries",
        ],
        outcomes: [
          "Transparent comparison of technical and governance options",
          "Better prepared dossiers for financier dialogue",
          "Reduced uncertainty before detailed design",
        ],
      },
      "strategic-corridors": {
        metaDescription: "Planning and investment readiness for strategic transport corridors in the DRC and Central Africa.",
        body: "Planning and preparation for corridors where connectivity, multiple stakeholders, and investment prioritisation must be handled in a coordinated way.",
        mandateType: "Corridor planning and investment readiness",
        challenge:
          "Turn corridor ambition into a prioritised investment pipeline acceptable to states, local authorities, and development partners.",
        approach:
          "Constraint mapping, structured stakeholder engagement, and packaging of bankable investment components.",
        scope: [
          "Corridor analysis and issue mapping",
          "Stakeholder consultation and alignment",
          "Investment prioritisation and phasing scenarios",
          "Financing mobilisation dossiers",
        ],
        deliverables: [
          "Corridor maps and briefing notes",
          "Investment prioritisation matrices",
          "Concept notes and donor dossiers",
          "Stakeholder mobilisation plans",
        ],
        outcomes: [
          "Corridor vision translated into investment sequence",
          "Clearer narrative for national and regional decision-makers",
          "Shared basis for financier discussions",
        ],
      },
      "donor-programmes-drc": {
        metaDescription: "Implementation and reporting support for donor-funded infrastructure programmes in the DRC.",
        body: "Support to PIUs and line ministries to manage multi-project programmes in line with international management and reporting requirements.",
        mandateType: "Programme support and decision backing",
        challenge:
          "Maintain decision cadence, reporting quality, and donor compliance under institutional pressure.",
        approach:
          "Strengthen management routines, standardise outputs, and provide independent support to steering bodies.",
        scope: [
          "Programme planning and management support",
          "Periodic reporting and dashboards",
          "Decision session preparation",
          "Donor procedure and compliance support",
        ],
        deliverables: [
          "Dashboards and programme reports",
          "Decision notes and committee briefings",
          "Compliance checklists and action plans",
          "Programme risk management support",
        ],
        outcomes: [
          "More predictable reporting for financiers",
          "Documented, traceable programme decisions",
          "Stronger management capacity within the PIU",
        ],
      },
      "urban-networks-supervision": {
        metaDescription: "Technical supervision of urban networks and delivery control in the DRC.",
        body: "Supervision of works and contractor outputs for urban networks, with regular owner reporting and execution quality control.",
        mandateType: "Technical supervision and delivery control",
        challenge:
          "Ensure built assets match approved designs, technical standards, and owner expectations on the ground.",
        approach:
          "Structured site supervision, systematic contractor deliverable review, and open registers for non-conformities and reservations.",
        scope: [
          "Works supervision and quality control",
          "Review of execution dossiers and variations",
          "Owner / contractor interface",
          "Periodic reporting and clearance of reservations",
        ],
        deliverables: [
          "Supervision reports and site visit records",
          "Technical review of submissions and variations",
          "Reservation logs and clearance plans",
          "Briefings for works steering committees",
        ],
        outcomes: [
          "Better visibility on real progress",
          "Fewer undocumented gaps between design and build",
          "Reception decisions based on verified facts",
        ],
      },
      "water-sanitation-engineering": {
        metaDescription: "Design studies and engineering for water infrastructure in the DRC.",
        body: "Design engineering for water assets, including technical dossiers and procurement support, aligned with standards and local delivery constraints.",
        mandateType: "Design studies and engineering",
        challenge:
          "Produce executable, procurement-ready dossiers despite data, timeline, and local capacity constraints.",
        approach:
          "Stage-gated design, progressive technical validation, and coordination with environmental and social requirements where applicable.",
        scope: [
          "Feasibility and detailed design studies",
          "Drawings, calculation notes, and specifications",
          "Cost estimates and works phasing",
          "Procurement technical support",
        ],
        deliverables: [
          "Design dossiers and drawings",
          "Calculation notes and technical reports",
          "Tender / contractor consultation packages",
          "Bid evaluation support",
        ],
        outcomes: [
          "Technical dossiers usable by the project owner",
          "Procurement prepared with clear criteria",
          "Technical risks identified before works start",
        ],
      },
      "energy-substation-design": {
        metaDescription: "Engineering studies for substations and power networks in the DRC.",
        body: "Targeted studies for substations and network components, with interface coordination and commissioning support to recognised standards.",
        mandateType: "Targeted engineering and delivery support",
        challenge:
          "Secure technical feasibility and interface compatibility in a fast-moving network and operational environment.",
        approach:
          "Component-level engineering, independent review of assumptions, and support through key milestones to commissioning.",
        scope: [
          "Sizing and layout studies",
          "Equipment specifications and interfaces",
          "Testing and commissioning support",
          "Coordination with operator and partners",
        ],
        deliverables: [
          "Technical studies and calculation notes",
          "Specifications and execution dossiers",
          "Test plans and acceptance procedures",
          "Commissioning follow-up reports",
        ],
        outcomes: [
          "Network components sized on explicit bases",
          "Technical interfaces clarified between parties",
          "Better prepared acceptance and commissioning",
        ],
      },
    },
    portfolio: {
      title: "Portfolio",
      intro: "Experience, projects, and references — expanded progressively as they are validated.",
      viewAllCta: "View all projects",
      pageTitle: "Portfolio & references",
      pageIntro:
        "A selection of mandates across both OPEN practices — open a card for context, scope, and deliverables.",
      categories: [
        "Water & Urban Infrastructure",
        "Energy & Power Systems",
        "Strategic Corridors & Transport",
        "Donor-funded Infrastructure Programmes",
        "Project Preparation & Institutional Support",
      ],
      note: "Each reference will cover project, sector, location, client, OPEN's role, deliverables, and key results where available.",
      featuredSlugs: [
        "urban-water-eastern-drc",
        "strategic-corridors",
        "donor-programmes-drc",
        "urban-networks-supervision",
        "water-sanitation-engineering",
        "hydropower-energy-systems",
      ],
    },
    hero: {
      imageAlt: "Strategic infrastructure programs in the DRC",
      centerCta: "Explore our services",
      platform:
        "An integrated platform to turn infrastructure priorities into bankable, implementable projects.",
      scope:
        "Ministries, provincial governments, public agencies, PIUs, utilities, and donors — advisory, engineering, and supervision across the DRC and Central Africa.",
      clients: [
        "Ministries",
        "Provincial governments",
        "Public agencies",
        "PIUs",
        "DFIs & donors",
      ],
      departments: [
        {
          dept: "Infrastructure Advisory",
          watermark: "ADVISORY",
          title: "Infrastructure Advisory",
          subtitle: "Preparation & bankability",
          text: "Diagnostics, pipelines, donor structuring, and institutional support — from concept to financeable packages.",
          quote: "",
          cta: "Explore Advisory",
          ctaHref: "/poles/advisory",
        },
        {
          dept: "Engineering & Delivery",
          watermark: "DELIVERY",
          title: "Engineering & Delivery",
          subtitle: "Engineering & execution",
          text: "Studies, design, supervision, and owner support — without positioning OPEN as a general contractor.",
          quote: "",
          cta: "Explore Delivery",
          ctaHref: "/poles/engineering",
        },
      ],
    },
    method: {
      title: "Expertise",
      intro:
        "Four areas of practice to structure high-impact programs for public authorities and development partners.",
      items: [
        {
          icon: "construction" as IconName,
          title: "Infrastructure project preparation",
          text: "Sector diagnostics, feasibility coordination, technical options analysis, and implementable project roadmaps.",
        },
        {
          icon: "account_balance" as IconName,
          title: "Donor-funded project structuring",
          text: "Concept notes, pipeline development, financeable tranches, and EU / IFI alignment.",
        },
        {
          icon: "rule" as IconName,
          title: "Bankability and risk assessment",
          text: "Readiness and governance review, risk registers, capacity assessment, and delivery model choices.",
        },
        {
          icon: "visibility" as IconName,
          title: "Strategic infrastructure advisory",
          text: "National and provincial planning, corridor and connectivity strategy, and investment prioritization.",
        },
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
      title: "How we work and value for government partners",
      standardTitle: "Operating principles",
      openTitle: "Value for government partners",
      openBadge: "OPEN SARL",
      standardItems: [
        {
          title: "Technical rigor and professional integrity",
          text: "Analysis grounded in recognized standards and an independent posture.",
        },
        {
          title: "Context-aware, pragmatic problem solving",
          text: "Recommendations that reflect local institutional and operational constraints.",
        },
        {
          title: "Actionable outputs, not theoretical reports",
          text: "Priority on deliverables, clear governance, and predictable reporting cadence.",
        },
      ],
      openItems: [
        {
          title: "International standards",
          text: "Local delivery realism combined with EU, World Bank, AfDB, KfW, AFD, and USAID requirements.",
        },
        {
          title: "Decision-ready materials",
          text: "Structured briefs for Ministers, Governors, and Steering Committees.",
        },
        {
          title: "Independent advisory",
          text: "Focused on public value, governance, and results — not report production.",
        },
      ],
    },
    livrables: {
      title: "Typical outputs delivered",
      intro:
        "Concrete deliverables to support decisions, studies, and donor-facing dossiers.",
      catalog: "View the capability statement",
      items: [
        {
          title: "Pipelines and prioritization",
          text: "Investment pipeline and prioritization notes at national and provincial levels.",
        },
        {
          title: "Decision briefs",
          text: "Briefings for Ministers, Governors, or Steering Committees — options, costs, risks, and recommendations.",
        },
        {
          title: "ToR and readiness",
          text: "Terms of Reference for feasibility, E&S studies, design, and supervision; readiness assessments and risk registers.",
        },
        {
          title: "Supervision and reporting",
          text: "Supervision reports, contractor deliverable reviews, and owner dashboards.",
        },
      ],
    },
    missions: {
      title: "Missions",
      intro:
        "Four ways we work with clients — from rapid diagnostics to joint delivery with international technical partners.",
      steps: [
        {
          range: "01",
          title: "Short advisory missions",
          text: "Diagnostic, prioritization, and briefing to decision-makers.",
          border: "tertiary" as const,
        },
        {
          range: "02",
          title: "Project preparation support",
          text: "Concept-to-feasibility, coordination of studies, and packaging.",
          border: "primary" as const,
        },
        {
          range: "03",
          title: "Embedded advisory roles",
          text: "Support inside PIUs or ministerial project teams.",
          border: "variant" as const,
        },
        {
          range: "04",
          title: "Joint delivery",
          text: "Collaboration with international firms and multidisciplinary specialists as the mandate requires.",
          border: "tertiary" as const,
        },
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
      intro:
        "How OPEN works with public authorities and their technical partners.",
      items: [
        {
          title: "Short advisory missions",
          text: "Diagnostic, prioritization, and briefing to decision-makers.",
          featured: false,
        },
        {
          title: "Project preparation support",
          text: "Concept-to-feasibility, coordination of studies, and packaging.",
          featured: false,
        },
        {
          title: "Embedded advisory roles",
          text: "Support inside PIUs or ministerial project teams.",
          featured: false,
        },
        {
          title: "Joint delivery",
          text: "Collaboration with international firms and multidisciplinary experts as required.",
          featured: false,
        },
      ],
    },
    cta: {
      title: "Structure your investment pipeline",
      text: "National ministries, provincial governments, public agencies, PIUs, utilities, and corridor authorities — let's discuss your priority programs.",
      primary: "Get in touch",
      secondary: "Download the capability statement",
    },
    footer: {
      about:
        "Infrastructure advisory branch of OPEN SARL, based in Kinshasa. Preparation, structuring, and delivery support for strategic programs serving public authorities.",
      sectorLinks: [
        "Transport & logistics",
        "Energy",
        "Water & sanitation",
        "Urban infrastructure",
      ],
      companyLinks: [
        { href: "#missions", label: "Missions" },
        { href: "#poles", label: "Practices" },
        { href: "#expertise", label: "Expertise" },
        { href: "#portfolio", label: "Portfolio" },
        { href: "/branding", label: "Guidelines" },
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
      mandateDisclaimer:
        "OPEN works within its declared licences and roles; scopes requiring specific qualifications may involve certified partners when required.",
    },
    brochure: {
      metaTitle: "Capability statement",
      metaDescription:
        "OPEN SARL infrastructure advisory capability statement for government and donor partners, based in Kinshasa, DRC.",
      kicker: "OPEN SARL",
      title: "Infrastructure advisory capability statement",
      coverTitle: "Capability Statement",
      coverSubtitle: "US–DRC & Central Africa — Infrastructure Advisory & Engineering",
      lead: "Supporting national and provincial governments to prepare, structure, and deliver strategic infrastructure programs.",
      downloadOfficial: "Download official PDF (US–DRC EN)",
      downloadBilingual: "Bilingual PDF (EN–FR)",
      viewOfficialEn: "View official PDF (EN) in browser",
      viewOfficialBilingual: "View bilingual PDF in browser",
      officialNote:
        "The client-supplied PDF remains the authoritative file for partners and proposals. The web layout below uses OPEN letterhead templates for browser print or export.",
      print: "Print / save web version",
      templatesLink: "Document templates",
      toolbarMore: "More options and links",
      back: "Back to home",
    },
    legal: {
      metaTitle: "Legal notice",
      title: "Legal notice",
      intro:
        "This site presents OPEN SARL — an infrastructure advisory branch based in Kinshasa, DRC, serving public authorities and their development partners.",
      editor: "Publisher",
      publisher: "Publication director",
      publisherBody: "The management of OPEN SARL.",
      disclaimer:
        "The information describes the offer. It is not a contractual offer. Figures, where shown, describe a specific mandate rather than a firm-wide performance claim.",
      back: "Back to home",
    },
    privacy: {
      metaTitle: "Privacy",
      title: "Privacy",
      intro:
        "OPEN SARL does not place advertising trackers on this site. Browsing does not create an account.",
      contactTitle: "Getting in touch",
      contactBody:
        "Contact, partnership, careers and newsletter actions open your own email app. A message is sent only if you send it. OPEN SARL then uses the address to reply, for as long as the exchange needs follow-up.",
      rightsTitle: "Your requests",
      rightsLead:
        "To access, correct or delete information linked to an exchange, write to",
      back: "Back to home",
    },
    notFound: {
      title: "Page not found",
      text: "This address does not match a page on the OPEN site.",
      back: "Back to home",
    },
    documentsHub: {
      metaTitle: "OPEN documents",
      metaDescription: "Capability statements and templates — A4 preview and download.",
      title: "Documents",
      intro: "Preview official PDFs or the web letterhead version in A4, then download from your browser.",
      brandLink: "Brand guidelines — cover, envelope, letter, invoice and cards",
      viewInBrowser: "A4 preview · download",
      webBadge: "Web · A4",
      webBrochureTitle: "Capability statement (web version)",
      webBrochureDesc: "OPEN letterhead pages — export PDF from the browser.",
      templateBadge: "Templates",
      templatesSectionTitle: "Document templates",
      templatesSectionIntro:
        "Letterhead, proposal, and report on one A4 page — full communication copy and PDF export.",
      templateTitle: "OPEN document templates",
      templateDesc: "Browse the three OPEN layout templates.",
      backToList: "Back to document list",
      titles: {
        capabilityUsDrcEn: "Capability Statement — US / DRC (EN)",
        capabilityBilingual: "Capability Statement — bilingual EN / FR",
      },
    },
    documentViewer: {
      downloadPdf: "Download PDF",
      downloadWebPdf: "Download as PDF",
      openNewTab: "Open in new tab",
      pdfHint: "Official file preview. Use Download to save a copy.",
      a4PagesHint: "A4 format · scroll through pages",
      a4TwoPagesHint: "2 A4 pages",
      allDocuments: "All documents",
    },
    documentTemplatesHub: {
      metaTitle: "Document templates",
      metaDescription:
        "OPEN letterhead, proposal, and report — full A4 templates for institutional communications and PDF export.",
      title: "Document templates",
      intro:
        "Letterhead, commercial proposal, and mission report in one scrollable A4 view. Sample copy to adapt before sending.",
      templateBadge: "Template · A4",
      allTemplates: "All templates",
      allTemplatesCombined: "View all three templates",
      combinedViewerTitle: "OPEN document templates",
      combinedIntro:
        "Letterhead (institutional banner + minimal watermark variant), proposal, and report — ready-to-edit copy.",
      pageCountHint: "{count} A4 pages · scroll through",
      backToDocuments: "Back to documents",
    },
    documentTemplates: {
      print: "Print",
      backToBrochure: "Back to capability statement",
      coverHint: "Cover page",
      bodyHint: "Document body — replace this placeholder text.",
      sampleDate: "August 28, 2024",
      toLabel: "TO.",
      toName: "Mr / Ms [Recipient name]",
      toCompany: "Ministry / agency / development partner",
      toAddress: "Postal address\nKinshasa, Democratic Republic of the Congo",
      classicVariant: {
        coverKicker: "Minimal variant · comparison",
        coverTitle: "Minimal letterhead",
        coverSubtitle: "Watermark · contact footer",
        coverLead:
          "Quiet layout: header logo, right-side watermark mark, contact lines at the foot — no geometric banner.",
        footerAddressLines: ["Kinshasa", "Democratic Republic of the Congo"],
      },
      kinds: {
        letterhead: {
          title: "Letterhead",
          desc: "Official letters — institutional (banner) and minimal (watermark) variants.",
          viewerTitle: "OPEN letterhead template",
          intro: "Letterhead layout for correspondence.",
          coverTitle: "OPEN letterhead",
          coverSubtitle: "Infrastructure Advisory & Engineering",
          coverLead:
            "Institutional correspondence — OPEN SARL branding for letters, service notes, and partner communications.",
          subjectLabel: "Re: [Subject of the letter]",
          salutation: "Dear Sir or Madam,",
          bodyParagraph1:
            "We are pleased to share this note in connection with [programme / file / assignment]. OPEN SARL supports public authorities, project implementation units, and development partners with preparation, engineering, and programme management for infrastructure across the DRC and Central Africa.",
          bodyParagraph2:
            "Please find attached [document / report / annex list]. We remain available for any technical clarification. Yours faithfully,",
          closing: "",
          signatureBlock: "For OPEN SARL\n[Name and title]\nKinshasa",
        },
        proposal: {
          title: "Proposal",
          desc: "Service offer — context, scope, deliverables, and terms.",
          viewerTitle: "OPEN proposal template",
          intro: "Commercial proposal layout.",
          coverTitle: "Proposal of services",
          coverSubtitle: "Infrastructure Advisory & Engineering",
          coverLead:
            "Technical assistance offer for preparation, structuring, and delivery of an infrastructure programme.",
          toName: "Focal point / decision-maker",
          toCompany: "Client institution or partner",
          subjectLabel: "Re: Proposal for technical assistance — [programme title]",
          sectionObjectiveIntro:
            "OPEN SARL proposes integrated support combining upstream advisory (preparation, feasibility, structuring) and delivery engineering, aligned with donor standards and national procedures.",
          sectionObjectiveTitle: "Context and objectives",
          sectionObjective:
            "The programme aims to [primary objective]. OPEN will field a multidisciplinary team to secure upstream phases, strengthen the client’s institutional capacity, and produce bankable outputs for financing and implementation.",
          sectionScopeTitle: "Proposed scope",
          sectionScopeBody: "The assignment is structured around the following workstreams (duration and schedule to be agreed with the client):",
          sectionScopeBullets: [
            "Diagnostic and framing: document review, stakeholder workshops, roadmap.",
            "Preparation / feasibility: concept notes, cost estimates, risk analysis and mitigation plan.",
            "PIU / client support: procedures, reporting, coordination of studies and consultations.",
            "Technical supervision and quality control on design and works phases, as agreed.",
          ],
          sectionDeliverablesTitle: "Deliverables",
          sectionDeliverablesBody: "Deliverables will be issued in draft and final versions, with presentations to the programme governance bodies:",
          sectionDeliverablesBullets: [
            "Framing note and validated work plan.",
            "Progress and final mission reports (FR / EN as required).",
            "Technical files, risk matrices, and implementation schedule.",
            "Briefing pack (slides and executive summary).",
          ],
          sectionTermsTitle: "Terms",
          sectionTermsBody:
            "Indicative duration: [X] months. Team: mission director, sector experts, engineers, and OPEN Kinshasa administrative support. Fees, travel, and taxes: per detailed quote attached. Offer validity: 60 days from the date of this document.",
        },
        report: {
          title: "Report",
          desc: "Mission report — summary, findings, and recommendations.",
          viewerTitle: "OPEN report template",
          intro: "Mission report or briefing note layout.",
          coverTitle: "Mission report",
          coverSubtitle: "Briefing note",
          coverLead: "Activity report and recommendations for [programme / contract / reporting period].",
          reportPeriod: "Reporting period: [Month Year – Month Year]",
          reportIntro:
            "This report consolidates OPEN SARL’s activities over the period indicated, key results achieved, and recommended follow-up for the steering committee and technical and financial partners.",
          sectionSummaryTitle: "Executive summary",
          sectionSummaryBody:
            "During the period, the OPEN team [3–4 sentence summary: milestones, deliverables submitted, progress vs. work plan]. Major risks remain [summary]. The programme stays aligned with objectives agreed with the client.",
          sectionFindingsTitle: "Key findings",
          sectionFindingsBody: "The following points emerge from delivery and reviews with stakeholders:",
          sectionFindingsBullets: [
            "Technical progress: [status of studies / works / approvals].",
            "Governance and reporting: [meeting cadence, data quality].",
            "Institutional capacity: [PIU / client strengths and gaps].",
            "Risks and mitigation: [top 3 risks and ongoing measures].",
          ],
          sectionNextTitle: "Next steps",
          sectionNextBody: "OPEN recommends prioritising the actions below for the coming period:",
          sectionNextBullets: [
            "Validate [deliverable / decision] in steering committee by [date].",
            "Finalise [study / financing package / tender documents].",
            "Strengthen [training / procedure / resource] flagged at mid-term review.",
            "Schedule supervision mission / independent review for [quarter].",
          ],
        },
      },
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];
