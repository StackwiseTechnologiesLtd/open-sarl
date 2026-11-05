#!/usr/bin/env node
/**
 * Build site project references from linkedin-articles-enriched.json.
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const ENRICHED = resolve(ROOT, "lib/data/linkedin-articles-enriched.json");
const OUT = resolve(ROOT, "lib/data/project-references.json");
const PUBLIC_IMG = resolve(ROOT, "public/images/projects");

const TOPIC_FR = {
  1: "FAIC 2026 / leadership ingénierie FIDIC",
  2: "Bancabilité RDC / infrastructures finançables",
  3: "Corridors régionaux / Lobito / commerce",
  4: "FIDIC / confiance contractuelle / allocation des risques",
  5: "Maturité digitale / IA / BIM / SIG",
  6: "Kinshasa / déploiement infrastructures urbaines RDC",
  7: "Paix, corridors et résilience des infrastructures",
  8: "Mentorat / jeunes ingénieurs africains",
  9: "Global Gateway RDC / de la promesse à l'exécution",
  10: "Sécurité hydrique / services urbains résilients",
  11: "Énergie / Inga / transport et bancabilité de l'achat",
  12: "Préparation passation / TdR et gestion des risques",
  13: "O&M et coûts du cycle de vie",
  14: "Résilience climatique / registres de risques",
  15: "Participation du secteur privé local",
  16: "Routines UGP / tableaux de bord et comités",
};

function slugify(topic) {
  return topic
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 72);
}

function cleanLinkedInText(raw) {
  if (!raw) return { body: "", excerpt: "" };
  const stop = /^(Like|Comment|Share|To view or add|View C2PA|\d+$)/i;
  const lines = raw.split("\n").map((l) => l.trim());
  let start = 0;
  for (let i = 0; i < lines.length; i++) {
    if (/^[🛑🏦🛤️⚡🧠💧🌍]/.test(lines[i]) || (lines[i].length > 40 && !lines[i].startsWith("Eric"))) {
      start = i;
      break;
    }
  }
  const bodyLines = [];
  for (let i = start; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    if (stop.test(line)) break;
    if (line.startsWith("#") && bodyLines.length > 2) break;
    if (/^Eric MULIMBI C\.$/.test(line)) continue;
    if (/^\d+mo$/.test(line)) continue;
    bodyLines.push(line);
  }
  const body = bodyLines.join("\n\n").replace(/\n{3,}/g, "\n\n").trim();
  const excerpt = (body.split(/\n\n/)[0] ?? "").slice(0, 220);
  return { body, excerpt: excerpt + (excerpt.length >= 220 ? "…" : "") };
}

function inferSector(topic) {
  const t = topic.toLowerCase();
  if (/energy|inga|hydropower/.test(t)) return { en: "Energy", fr: "Énergie" };
  if (/water|hydrique/.test(t)) return { en: "Water & sanitation", fr: "Eau & assainissement" };
  if (/corridor|transport|lobito/.test(t)) return { en: "Transport & corridors", fr: "Transport & corridors" };
  if (/urban|kinshasa/.test(t)) return { en: "Urban infrastructure", fr: "Infrastructures urbaines" };
  if (/digital|bim|gis|ai/.test(t)) return { en: "Digital & engineering", fr: "Digital & ingénierie" };
  return { en: "Project preparation & finance", fr: "Préparation & financement" };
}

function inferPole(topic) {
  const t = topic.toLowerCase();
  if (/bim|gis|digital maturity|urban infrastructure delivery|o&m|lifecycle|water security/.test(t))
    return "engineering";
  return "advisory";
}

function localeBlock(body, hashtags, published) {
  const paragraphs = body.split(/\n\n/).filter(Boolean);
  return {
    clientType: { en: "LinkedIn / public dialogue", fr: "LinkedIn / dialogue public" },
    role: {
      en: "Thought leadership & sector perspective",
      fr: "Leadership d'opinion & perspective sectorielle",
    },
    status: {
      en: published ? `Published · LinkedIn · ${published}` : "Published · LinkedIn",
      fr: published ? `Publié · LinkedIn · ${published}` : "Publié · LinkedIn",
    },
    mandateType: {
      en: "Published insight & advisory perspective",
      fr: "Publication & perspective advisory",
    },
    location: { en: "DRC & Central Africa", fr: "RDC & Afrique centrale" },
    challenge: {
      en: paragraphs[1] ?? paragraphs[0] ?? "",
      fr: paragraphs[1] ?? paragraphs[0] ?? "",
    },
    approach: { en: paragraphs[2] ?? "", fr: paragraphs[2] ?? "" },
    scope: {
      en: paragraphs.slice(0, 5),
      fr: paragraphs.slice(0, 5),
    },
    deliverables: {
      en: hashtags.map((h) => h.replace(/^#/, "")),
      fr: hashtags.map((h) => h.replace(/^#/, "")),
    },
    outcomes: { en: [], fr: [] },
  };
}

function main() {
  if (!existsSync(ENRICHED)) {
    console.error("Missing enriched catalog. Run: npm run linkedin:scrape");
    process.exit(1);
  }
  const enriched = JSON.parse(readFileSync(ENRICHED, "utf8"));
  mkdirSync(PUBLIC_IMG, { recursive: true });

  const items = [];
  for (const row of enriched.items) {
    if (!row.text) continue;

    const { body, excerpt } = cleanLinkedInText(row.text);
    const postId = String(row.post).padStart(2, "0");
    const feedImage = row.images?.find((img) => img.localPath?.includes(`post-${postId}-0`));
    let image = null;
    if (feedImage?.localPath && existsSync(resolve(ROOT, feedImage.localPath))) {
      const publicPath = `images/projects/linkedin-post-${postId}.jpg`;
      const dest = resolve(ROOT, "public", publicPath);
      copyFileSync(resolve(ROOT, feedImage.localPath), dest);
      image = `/${publicPath}`;
    }

    const sector = inferSector(row.topic);
    const pole = inferPole(row.topic);
    const block = localeBlock(body, row.hashtags ?? [], row.publishedAt);

    items.push({
      slug: `ref-${postId}-${slugify(row.topic)}`,
      post: row.post,
      pole,
      linkedinUrl: row.resolvedUrl ?? row.url,
      image,
      hashtags: row.hashtags ?? [],
      title: { en: row.topic, fr: TOPIC_FR[row.post] ?? row.topic },
      sector,
      summary: {
        en: excerpt || body.slice(0, 220),
        fr: excerpt || body.slice(0, 220),
      },
      body: { en: body, fr: body },
      metaDescription: {
        en: `${row.topic} — OPEN infrastructure perspective.`,
        fr: `${TOPIC_FR[row.post] ?? row.topic} — perspective OPEN.`,
      },
      clientType: block.clientType,
      role: block.role,
      status: block.status,
      mandateType: block.mandateType,
      location: block.location,
      challenge: block.challenge,
      approach: block.approach,
      scope: block.scope,
      deliverables: block.deliverables,
      outcomes: block.outcomes,
    });
  }

  const payload = {
    source: "linkedin-articles-enriched.json",
    builtAt: new Date().toISOString(),
    featuredSlugs: items.slice(0, 6).map((i) => i.slug),
    items,
  };

  writeFileSync(OUT, JSON.stringify(payload, null, 2) + "\n", "utf8");
  console.log(`Built ${items.length} references → ${OUT}`);
}

main();
