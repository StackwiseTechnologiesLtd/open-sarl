import Image from "next/image";
import Link from "next/link";
import { getProjectImage } from "@/lib/project-images";
import type { Dictionary, Locale } from "@/lib/i18n";
import { projectPath, type PoleSlug } from "@/lib/poles";

export function ProjectMoreSidebar({
  locale,
  pole,
  dict,
  currentSlug,
}: {
  locale: Locale;
  pole: PoleSlug;
  dict: Dictionary;
  currentSlug: string;
}) {
  const label = dict.polePages.shared.moreProjects;
  const items = dict.polePages[pole].projects.filter((item) => item.slug !== currentSlug);

  if (items.length === 0) return null;

  return (
    <aside className="project-more-sidebar">
      <h2 className="project-more-sidebar-title">{label}</h2>
      <ul className="project-more-sidebar-list">
        {items.map((item) => (
          <li key={item.slug}>
            <Link href={projectPath(locale, pole, item.slug)} className="project-more-sidebar-link">
              <span className="project-more-sidebar-thumb">
                <Image src={getProjectImage(item.slug)} alt="" fill sizes="80px" className="object-cover" />
              </span>
              <span className="project-more-sidebar-label">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
