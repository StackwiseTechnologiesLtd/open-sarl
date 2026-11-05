import { missionImages, poleImages, positioningImage, sectorImages } from "@/lib/images";
import { getProjectReferenceImage } from "@/lib/project-references";
import type { PoleSlug } from "@/lib/poles";

const sectorFallback: Record<string, string> = {
  energy: sectorImages.energy,
  water: sectorImages.water,
  transport: sectorImages.transport,
  urban: sectorImages.urban,
};

export function getProjectImage(slug: string) {
  const linkedIn = getProjectReferenceImage(slug);
  if (linkedIn) return linkedIn;
  if (slug.includes("corridor") || slug.includes("lobito")) return sectorImages.transport;
  if (slug.includes("energy") || slug.includes("inga")) return sectorImages.energy;
  if (slug.includes("water") || slug.includes("hydrique")) return sectorImages.water;
  if (slug.includes("kinshasa") || slug.includes("urban")) return sectorImages.urban;
  if (slug.includes("digital") || slug.includes("bim")) return sectorImages.urban;
  return sectorFallback[slug] ?? missionImages[0];
}

export function getPoleHeroImage(pole: PoleSlug) {
  return poleImages[pole];
}
