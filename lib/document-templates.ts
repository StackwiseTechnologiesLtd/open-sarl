export type DocumentTemplateId = "letterhead" | "proposal" | "report";

export type DocumentTemplateEntry = {
  id: DocumentTemplateId;
  titleKey: DocumentTemplateId;
  downloadPrefix: string;
};

export const documentTemplateCatalog: DocumentTemplateEntry[] = [
  {
    id: "letterhead",
    titleKey: "letterhead",
    downloadPrefix: "OPEN_Letterhead",
  },
  {
    id: "proposal",
    titleKey: "proposal",
    downloadPrefix: "OPEN_Proposal",
  },
  {
    id: "report",
    titleKey: "report",
    downloadPrefix: "OPEN_Report",
  },
];

export function getDocumentTemplate(id: string): DocumentTemplateEntry | undefined {
  return documentTemplateCatalog.find((item) => item.id === id);
}

export function isDocumentTemplateId(id: string): id is DocumentTemplateId {
  return documentTemplateCatalog.some((item) => item.id === id);
}
