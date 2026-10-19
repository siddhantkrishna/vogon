import { VogonIcon } from "@/components/VogonIcon";
import { Link } from "react-router-dom";
import { site } from "@/content/site";
import { Wordmark } from "./ui";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Products / Projects", to: "/products" },
      { label: "VORTEX — Project 001", to: "/vortex" },
      { label: "Technologies", to: "/technologies" },
      { label: "Capabilities", to: "/capabilities" },
      { label: "Research", to: "/research" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/company" },
      { label: "Careers", to: "/careers" },
    ],
  },
  {
    title: "Connect",
    links: [{ label: "Contact", to: "/contact" }, ...site.facts.social.map((s) => ({ label: s.label, to: s.href }))],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line bg-ink pt-20 md:pt-28" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="shell">
        <div className="grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-4">
            <p className="body-lg max-w-sm text-paper/80">Intelligence meets engineering. Building the next generation from India.</p>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="col-span-2 md:col-span-2">
              <p className="eyebrow mb-5">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="u-link text-[15px] text-paper/80 hover:text-paper">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-24 text-paper md:mt-36" aria-hidden>
          <Wordmark className="w-full" title="" />
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line py-7 md:flex-row md:items-center md:justify-between">
          <p className="eyebrow">© {year} VOGON. All rights reserved.</p>
          <p className="eyebrow">{site.domain.replace("https://", "")} — India</p>
        </div>
      </div>
    
        <a
          href="/admin"
          aria-label="Open VOGON admin panel"
          className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-white/60 transition-colors duration-300 hover:border-white/60 hover:text-white"
        >
          Admin <span aria-hidden="true"><VogonIcon name="arrow-up-right" /></span>
        </a>
</footer>
  );
}
