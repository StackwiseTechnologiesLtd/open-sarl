export type DocumentId = "capability-us-drc-en" | "capability-bilingual";

export type DocumentEntry = {
  id: DocumentId;
  filePath: string;
  downloadName: string;
  titleKey: "capabilityUsDrcEn" | "capabilityBilingual";
};

export const documentCatalog: DocumentEntry[] = [
  {
    id: "capability-us-drc-en",
    filePath: "/downloads/OPEN_Capability_Statement_US-DRC_EN.pdf",
    downloadName: "OPEN_Capability_Statement_US-DRC_EN.pdf",
    titleKey: "capabilityUsDrcEn",
  },
  {
    id: "capability-bilingual",
    filePath: "/downloads/OPEN_Capability_Statement_Bilingual_EN-FR.pdf",
    downloadName: "OPEN_Capability_Statement_Bilingual_EN-FR.pdf",
    titleKey: "capabilityBilingual",
  },
];

export function getDocument(id: string): DocumentEntry | undefined {
  return documentCatalog.find((item) => item.id === id);
}
