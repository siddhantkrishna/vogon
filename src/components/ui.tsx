import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { site } from "@/content/site";
import { cn } from "@/utils/cn";

/** Official VOGON brand wordmark. */
export function Wordmark({
  className,
  title = "VOGON",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <img
      src="/brand/vogon-wordmark.png"
      alt={title}
      className={cn("block h-auto object-contain", className)}
      draggable={false}
    />
  );
}

export function SectionEyebrow({ index, children, className }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", className)}>
      {index && <span className="text-paper">{index}</span>}
      {index && <span aria-hidden className="h-px w-6 bg-line" />}
      <span>{children}</span>
    </p>
  );
}

/** Text link with refined underline + arrow. External links open safely. */
export function AnimatedLink({
  to,
  children,
  className,
  arrow = "↗",
}: {
  to: string;
  children: ReactNode;
  className?: string;
  arrow?: "↗" | "→" | null;
}) {
  return (
    <Link to={to} className={cn("u-link label text-paper", className)}>
      <span>{children}</span>
      {arrow && (
        <span aria-hidden className={cn("arrow", arrow === "→" && "arrow-x")}>
          {arrow}
        </span>
      )}
    </Link>
  );
}

/** Label for conceptual or placeholder material — honesty marker. */
export function ConceptTag({ children = "Conceptual imagery", className }: { children?: ReactNode; className?: string }) {
  return <span className={cn("eyebrow text-[10px] text-paper/60", className)}>[ {children} ]</span>;
}

/* ------------------------------------------------------------------ */
/* SEO — per-route title/description/canonical/OG/Twitter              */
/* ------------------------------------------------------------------ */
function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

export function useSeo({ title, description, path }: { title: string; description?: string; path: string }) {
  useEffect(() => {
    const full = title.includes("VOGON") ? title : `${title} — VOGON`;
    const desc = description ?? site.description;
    const url = `${site.domain}${path === "/" ? "" : path}`;
    document.title = full;
    setMeta("name", "description", desc);
    setMeta("property", "og:title", full);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", full);
    setMeta("name", "twitter:description", desc);
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = url;
  }, [title, description, path]);
}
