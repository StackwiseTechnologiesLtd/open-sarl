export const contactEmail = "contact@open-consulting.fr";

export const offices = ["Tour Horizon, Paris-La Défense", "Dakar, Sénégal"] as const;

export const navLinks = [
  { href: "/#missions", label: "Missions" },
  { href: "/#poles", label: "Pôles" },
  { href: "/#expertise", label: "Expertise" },
  { href: "/#secteurs", label: "Secteurs" },
  { href: "/#portfolio", label: "Portfolio" },
] as const;

export function isNavActive(href: string, hash: string, pathname: string) {
  if (pathname !== "/") return false;
  const current = hash || "#expertise";
  return href.endsWith(current);
}

export function appointmentMailto() {
  return `mailto:${contactEmail}?subject=${encodeURIComponent("Prise de rendez-vous")}`;
}

export function newsletterMailto(email: string) {
  return `mailto:${contactEmail}?subject=${encodeURIComponent("Inscription newsletter")}&body=${encodeURIComponent(email)}`;
}

export const pillars = [
  {
    icon: "visibility",
    title: "Clarté",
    text: "Vision stratégique alignée sur les plans nationaux de développement.",
  },
  {
    icon: "account_balance",
    title: "Bancabilité",
    text: "Structuration financière rigoureuse répondant aux exigences des IFI.",
  },
  {
    icon: "construction",
    title: "Exécutabilité",
    text: "Anticipation des verrous techniques et administratifs avant le lancement.",
  },
  {
    icon: "rule",
    title: "Contrôle",
    text: "Pilotage haute performance pour garantir délais et budgets.",
  },
] as const;

export const standards = [
  "Alignement total avec les Directives de Passation de Marchés.",
  "Maîtrise des cadres de conformité environnementale et sociale (E&S).",
  "Expertise reconnue en Partenariats Public-Privé (PPP).",
] as const;

export const standardApproach = [
  {
    title: "Rapports purement conceptuels",
    text: "Absence de liens directs avec les capacités de mise en œuvre réelle.",
  },
  {
    title: "Passivité vis-à-vis des blocages",
    text: "Les experts pointent les problèmes sans proposer de solution opérationnelle.",
  },
  {
    title: "Déconnexion IFI",
    text: "Documents souvent non conformes aux critères de financement internationaux.",
  },
] as const;

export const openApproach = [
  {
    title: "Livrables « Prêts à Financer »",
    text: "Des packages techniques et financiers directement exploitables par les prêteurs.",
  },
  {
    title: "Task-Force « Débloquage »",
    text: "Intervention directe sur les nœuds institutionnels pour accélérer le pipeline.",
  },
  {
    title: "Intégration opérationnelle",
    text: "Présence terrain pour coordonner les services de l'État et les bailleurs.",
  },
] as const;

export const missions = [
  {
    title: "Structuring & Packaging",
    text: "Préparation des dossiers d'investissement et dossiers de consultation des entreprises (DCE).",
    image: "/images/mission-structuring.png",
    alt: "Accord entre partenaires sur un programme d'infrastructure",
  },
  {
    title: "Portfolio Maturity Evaluation",
    text: "Audit critique du pipeline de projets pour prioriser les investissements à fort impact.",
    image: "/images/mission-portfolio.png",
    alt: "Analyse de tableaux financiers et de calendriers de projet",
  },
  {
    title: "Strategic Corridors",
    text: "Définition de schémas directeurs pour les infrastructures de transport et d'énergie.",
    image: "/images/mission-corridors.png",
    alt: "Salle de travail dédiée à la planification de corridors stratégiques",
  },
] as const;

export const firstDays = [
  {
    range: "JOUR 1 - 15",
    title: "Photo du Portfolio",
    text: "Diagnostic flash de l'état réel des projets prioritaires et identification immédiate des « Quick Wins ».",
    tone: "tertiary" as const,
  },
  {
    range: "JOUR 15 - 45",
    title: "Ranking de Priorité",
    text: "Matrice de sélection basée sur la bancabilité, l'impact politique et la rapidité d'exécution.",
    tone: "primary" as const,
  },
  {
    range: "JOUR 45 - 60",
    title: "Lancement TdR",
    text: "Rédaction et validation des Termes de Référence pour les études de faisabilité manquantes.",
    tone: "deep" as const,
  },
] as const;

export const sectors = [
  {
    title: "Transport",
    text: "Routes stratégiques, ports et logistique multimodale.",
    image: "/images/sector-transport.png",
    alt: "Ouvrage de transport en construction",
    className: "min-h-80 md:col-span-2 md:row-span-2",
    titleClass: "font-headline-xl text-3xl md:text-headline-xl",
    overlay: "from-primary",
    caption: "text-primary-fixed",
  },
  {
    title: "Énergie",
    text: "Production renouvelable et réseaux de distribution.",
    image: "/images/sector-energy.png",
    alt: "Infrastructure de production et de transport d'énergie",
    className: "min-h-56 md:col-span-2",
    titleClass: "font-headline-lg text-headline-lg",
    overlay: "from-tertiary",
    caption: "text-tertiary-fixed",
  },
  {
    title: "Eau & Assainissement",
    text: "",
    image: "/images/sector-water.png",
    alt: "Installation de traitement de l'eau",
    className: "min-h-52",
    titleClass: "font-headline-md text-headline-md",
    overlay: "from-secondary",
    caption: "",
  },
  {
    title: "Développement Urbain",
    text: "",
    image: "/images/sector-urban.png",
    alt: "Aménagement urbain planifié",
    className: "min-h-52",
    titleClass: "font-headline-md text-headline-md",
    overlay: "from-primary-container",
    caption: "",
  },
] as const;

export const modes = [
  {
    title: "Missions Courtes (Task Force)",
    text: "Diagnostic flash, structuration de dossiers ou évaluation de pipeline sur 2 à 4 mois.",
    featured: false,
  },
  {
    title: "Support Intégré (UMOP)",
    text: "Détachement d'experts au sein des Unités de Gestion de Projets pour un renforcement capacitaire continu.",
    featured: false,
  },
  {
    title: "Co-implémentation",
    text: "Pilotage conjoint avec les administrations pour garantir l'exécution des projets bailleurs.",
    featured: false,
  },
  {
    title: "Plateforme Digitale",
    text: "Accès à nos outils propriétaires de tracking de maturité et de conformité en temps réel.",
    featured: true,
  },
] as const;

export const footerSectors = [
  { href: "/#secteurs", label: "Transport & Logistique" },
  { href: "/#secteurs", label: "Énergie & Eau" },
  { href: "/#secteurs", label: "Développement Urbain" },
  { href: "/#secteurs", label: "Digital & Services" },
] as const;

export const footerCompany = [
  { href: "/#missions", label: "Missions" },
  { href: "/#expertise", label: "Expertise" },
  { href: "/#portfolio", label: "Portfolio" },
  {
    href: `mailto:${contactEmail}?subject=${encodeURIComponent("Recrutement")}`,
    label: "Recrutement",
  },
] as const;
