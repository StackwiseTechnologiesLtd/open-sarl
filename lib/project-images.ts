import { missionImages, poleImages, sectorImages } from "@/lib/images";
import type { PoleSlug } from "@/lib/poles";

const bySlug: Record<string, string> = {
  "urban-water-eastern-drc": sectorImages.water,
  "hydropower-energy-systems": sectorImages.energy,
  "strategic-corridors": sectorImages.transport,
  "donor-programmes-drc": missionImages[1],
  "urban-networks-supervision": sectorImages.urban,
  "water-sanitation-engineering": sectorImages.water,
  "energy-substation-design": sectorImages.energy,
};

export function getProjectImage(slug: string) {
  return bySlug[slug] ?? missionImages[0];
}

export function getPoleHeroImage(pole: PoleSlug) {
  return poleImages[pole];
}
