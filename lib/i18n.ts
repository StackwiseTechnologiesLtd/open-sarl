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

export function isNavActive(href: string, hash: string, pathname: string) {
  const anchor = href.includes("#") ? href.slice(href.indexOf("#")) : href;
  if (anchor === "#poles") {
    if (/^\/(fr|en)\/poles\//.test(pathname)) return true;
    if (!/^\/(fr|en)$/.test(pathname)) return false;
    if (!hash) return false;
    return polesHashes.includes(hash as (typeof polesHashes)[number]);
  }
  if (!/^\/(fr|en)$/.test(pathname)) return false;
  if (!hash) return false;
  return href.endsWith(hash);
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
      title:
        "OPEN | Conseil en infrastructures (format Gouvernement / Bailleurs)",
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
        contextTitle: "Contexte du mandat",
        deliverablesTitle: "Livrables clés",
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
        body: "Mandat orienté vers la structuration d'investissements et la préparation de dossiers décisionnels pour l'extension des services d'eau en milieu urbain. OPEN a apporté un appui à la définition des options, à la priorisation des composantes et à l'alignement avec les exigences de financement.",
        deliverables: [
          "Notes de priorisation et matrices d'investissement",
          "Diagnostics de maturité et registres de risques",
          "Appui à la préparation de dossiers pour comités de pilotage",
        ],
      },
      "hydropower-energy-systems": {
        metaDescription:
          "Conseil technique et investment readiness pour systèmes hydrauliques et énergétiques en RDC.",
        body: "Accompagnement sur l'analyse d'options, la readiness institutionnelle et la préparation de programmes énergétiques complexes, en lien avec les attentes des financeurs et des autorités sectorielles.",
        deliverables: [
          "Analyses d'options et notes de faisabilité",
          "Évaluations de bancabilité et structuration financière",
          "Feuilles de route de préparation de projet",
        ],
      },
      "strategic-corridors": {
        metaDescription:
          "Planification et investment readiness pour corridors de transport en RDC et Afrique centrale.",
        body: "Support à la cartographie des enjeux corridor, à la consultation des parties prenantes et à la préparation de pipelines d'investissement pour améliorer connectivité et logistique régionale.",
        deliverables: [
          "Cartographies et analyses corridor",
          "Notes de priorisation d'investissements",
          "Dossiers de préparation pour bailleurs",
        ],
      },
      "donor-programmes-drc": {
        metaDescription:
          "Appui à l'exécution et au reporting pour programmes d'infrastructure financés par les bailleurs en RDC.",
        body: "Renforcement de la capacité de pilotage et production de livrables alignés sur les standards internationaux de gestion de programme et de reporting aux financeurs.",
        deliverables: [
          "Outils de suivi et reporting de programme",
          "Notes de décision et briefings de comités",
          "Appui à la conformité aux exigences bailleurs",
        ],
      },
      "urban-networks-supervision": {
        metaDescription:
          "Supervision technique de réseaux urbains et contrôle d'exécution en RDC.",
        body: "Mission de supervision centrée sur le contrôle des livrables d'entreprise, la qualité d'exécution et le reporting régulier au maître d'ouvrage ou à l'UGP.",
        deliverables: [
          "Rapports de supervision et contrôle qualité",
          "Revue des dossiers d'exécution et variants",
          "Registres de points ouverts et levées de réserves",
        ],
      },
      "water-sanitation-engineering": {
        metaDescription:
          "Études de conception et ingénierie pour infrastructures hydrauliques en RDC.",
        body: "Production d'études de conception, dossiers techniques et appui à la passation, dans le respect des normes applicables et des contraintes de mise en œuvre locale.",
        deliverables: [
          "Études de conception et plans",
          "Dossiers de consultation des entreprises",
          "Appui technique à la passation des travaux",
        ],
      },
      "energy-substation-design": {
        metaDescription:
          "Études d'ingénierie pour postes et réseaux électriques en RDC.",
        body: "Ingénierie ciblée et assistance à la réalisation pour composantes de réseau, avec coordination des interfaces techniques et appui à la mise en service.",
        deliverables: [
          "Études techniques et notes de calcul",
          "Spécifications et dossiers d'exécution",
          "Appui à la réception et mise en service",
        ],
      },
    },
    portfolio: {
      title: "Portfolio",
      intro:
        "Expériences, projets et références — enrichis progressivement au fur et à mesure de leur validation.",
      categories: [
        "Water & Urban Infrastructure",
        "Energy & Power Systems",
        "Strategic Corridors & Transport",
        "Donor-funded Infrastructure Programmes",
        "Project Preparation & Institutional Support",
      ],
      note: "Chaque référence pourra détailler projet, secteur, localisation, client, rôle d'OPEN, livrables et résultats clés.",
    },
    hero: {
      imageAlt: "Programmes d'infrastructures stratégiques en RDC",
      centerCta: "Découvrir nos services",
      platform:
        "Transformer les priorités d'infrastructure en projets finançables et exécutables.",
      scope:
        "Conseil, ingénierie et appui à l'exécution en RDC et en Afrique centrale.",
      clients: [
        "Ministères",
        "Gouvernorats",
        "Agences publiques",
        "UGP / PIU",
        "Bailleurs & IFI",
      ],
      departments: [
        {
          dept: "Préparation & structuration",
          watermark: "ADVISORY",
          title: "Préparation & structuration",
          subtitle: "Programmes stratégiques",
          text: "Du concept à des investissements bancables — diagnostics, faisabilité, pipelines et structuration bailleurs.",
          quote: "",
          cta: "Discuter d'un programme",
          ctaHref: "#contact",
        },
        {
          dept: "Livrables prêts pour décision",
          watermark: "DELIVERY",
          title: "Options, coûts & risques",
          subtitle: "Décision opérationnelle",
          text: "Notes de décision pour Ministre, Gouverneur et Comités de pilotage — options, coûts, risques et recommandations.",
          quote: "",
          cta: "Voir les livrables types",
          ctaHref: "#livrables",
        },
      ],
    },
    method: {
      title: "Services clés",
      intro:
        "Quatre piliers de conseil pour structurer des programmes à fort impact, conformes aux attentes des bailleurs et financiers.",
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
      title: "Principes opérationnels et valeur pour les partenaires publics",
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
      ],
    },
    missions: {
      title: "Modalités de collaboration",
      intro:
        "Comment OPEN peut intervenir auprès d'un client — du diagnostic rapide à l'appui intégré au sein des équipes de programme.",
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
      metaDescription:
        "Note de capacités OPEN SARL — conseil en infrastructures pour autorités publiques et bailleurs, basée à Kinshasa (RDC).",
      kicker: "OPEN SARL",
      title: "Note de capacités — Conseil en infrastructures",
      lead: "Accompagner les autorités nationales et provinciales dans la préparation, la structuration et la mise en œuvre de programmes d'infrastructures stratégiques.",
      print: "Enregistrer en PDF",
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
        contextTitle: "Mandate context",
        deliverablesTitle: "Key deliverables",
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
        body: "Mandate focused on investment structuring and decision-ready dossiers to extend urban water services. OPEN supported options analysis, component prioritisation, and alignment with financing requirements.",
        deliverables: [
          "Prioritisation notes and investment matrices",
          "Maturity diagnostics and risk registers",
          "Steering committee briefing materials",
        ],
      },
      "hydropower-energy-systems": {
        metaDescription: "Technical advisory and investment readiness for hydropower and energy systems in the DRC.",
        body: "Support on options analysis, institutional readiness, and preparation of complex energy programmes in line with financier and sector authority expectations.",
        deliverables: [
          "Options analysis and feasibility notes",
          "Bankability assessments and financial structuring",
          "Project preparation roadmaps",
        ],
      },
      "strategic-corridors": {
        metaDescription: "Planning and investment readiness for strategic transport corridors in the DRC and Central Africa.",
        body: "Support to corridor issue mapping, stakeholder engagement, and investment pipeline preparation to improve regional connectivity and logistics.",
        deliverables: [
          "Corridor maps and analyses",
          "Investment prioritisation notes",
          "Donor-facing preparation dossiers",
        ],
      },
      "donor-programmes-drc": {
        metaDescription: "Implementation and reporting support for donor-funded infrastructure programmes in the DRC.",
        body: "Strengthening programme management capacity and producing deliverables aligned with international programme management and donor reporting standards.",
        deliverables: [
          "Programme tracking and reporting tools",
          "Decision notes and committee briefings",
          "Donor compliance support",
        ],
      },
      "urban-networks-supervision": {
        metaDescription: "Technical supervision of urban networks and delivery control in the DRC.",
        body: "Supervision focused on contractor deliverable review, execution quality, and regular reporting to the project owner or PIU.",
        deliverables: [
          "Supervision and quality control reports",
          "Review of execution dossiers and variations",
          "Open issues logs and clearance tracking",
        ],
      },
      "water-sanitation-engineering": {
        metaDescription: "Design studies and engineering for water infrastructure in the DRC.",
        body: "Design studies, technical dossiers, and procurement support in line with applicable standards and local delivery constraints.",
        deliverables: [
          "Design studies and drawings",
          "Contract tender dossiers",
          "Procurement technical support",
        ],
      },
      "energy-substation-design": {
        metaDescription: "Engineering studies for substations and power networks in the DRC.",
        body: "Targeted engineering and delivery assistance for network components, including technical interface coordination and commissioning support.",
        deliverables: [
          "Technical studies and calculation notes",
          "Specifications and execution dossiers",
          "Acceptance and commissioning support",
        ],
      },
    },
    portfolio: {
      title: "Portfolio",
      intro: "Experience, projects, and references — expanded progressively as they are validated.",
      categories: [
        "Water & Urban Infrastructure",
        "Energy & Power Systems",
        "Strategic Corridors & Transport",
        "Donor-funded Infrastructure Programmes",
        "Project Preparation & Institutional Support",
      ],
      note: "Each reference will cover project, sector, location, client, OPEN's role, deliverables, and key results where available.",
    },
    hero: {
      imageAlt: "Strategic infrastructure programs in the DRC",
      centerCta: "Explore our services",
      platform:
        "From infrastructure priorities to bankable, implementable projects.",
      scope:
        "Advisory, engineering and delivery support across the DRC and Central Africa.",
      clients: [
        "Ministries",
        "Provincial governments",
        "Public agencies",
        "PIUs",
        "DFIs & donors",
      ],
      departments: [
        {
          dept: "Preparation & structuring",
          watermark: "ADVISORY",
          title: "Preparation & structuring",
          subtitle: "Strategic programs",
          text: "From concept to bankable investments — diagnostics, feasibility, pipelines, and donor-ready structuring.",
          quote: "",
          cta: "Discuss a program",
          ctaHref: "#contact",
        },
        {
          dept: "Decision-ready outputs",
          watermark: "DELIVERY",
          title: "Options, costs & risks",
          subtitle: "Operational decisions",
          text: "Decision briefs for Ministers, Governors, and Steering Committees — options, costs, risks, and recommendations.",
          quote: "",
          cta: "View typical outputs",
          ctaHref: "#livrables",
        },
      ],
    },
    method: {
      title: "Core advisory services",
      intro:
        "Four pillars to structure high-impact programs aligned with development partners and financiers.",
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
      title: "Operating principles and value for government partners",
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
      ],
    },
    missions: {
      title: "How we engage",
      intro:
        "How OPEN can support a client — from rapid diagnostics to embedded roles within programme teams.",
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
      metaDescription:
        "OPEN SARL infrastructure advisory capability statement for government and donor partners, based in Kinshasa, DRC.",
      kicker: "OPEN SARL",
      title: "Infrastructure advisory capability statement",
      lead: "Supporting national and provincial governments to prepare, structure, and deliver strategic infrastructure programs.",
      print: "Save as PDF",
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
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];
