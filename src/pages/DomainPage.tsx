import { VortexProjectCard } from "@/sections/ProductsSection";
import { PragyaProjectCard } from "@/sections/PragyaProjectCard";
import { Reveal } from "@/components/motion";
import { useSeo } from "@/components/ui";
import { VogonIcon } from "@/components/VogonIcon";
import { Link, useParams } from "react-router-dom";
import SpaceComingSoon from "./SpaceComingSoon";

const domains = {
  air: {
    index: "02",
    title: "Air",
    headline: "INTELLIGENCE IN FLIGHT.",
    summary:
      "Exploring autonomous flight, aerospace systems, sensing and control technologies for complex aerial environments.",
    image: "/images/autonomous.jpg",
    related: "/technologies/autonomous-systems",
    relatedLabel: "Explore autonomous systems",
  },
  land: {
    index: "03",
    title: "Land",
    headline: "ENGINEERED FOR THE REAL WORLD.",
    summary:
      "Exploring robotics, machine perception and intelligent physical systems for challenging terrestrial environments.",
    image: "/images/robotics.jpg",
    related: "/technologies/advanced-robotics",
    relatedLabel: "Explore advanced robotics",
  },
  sea: {
    index: "04",
    title: "Sea",
    headline: "BEYOND THE HORIZON.",
    summary:
      "Exploring the engineering challenges of maritime sensing, autonomous navigation and reliable systems in demanding environments.",
    image: "/images/horizon.jpg",
    related: "/technologies",
    relatedLabel: "Explore technology focus areas",
  },
  software: {
    index: "05",
    title: "Software",
    headline: "INTELLIGENCE AT THE CORE.",
    summary:
      "Exploring artificial intelligence, machine perception, simulation and software-defined systems across physical domains.",
    image: "/images/intelligence.jpg",
    related: "/technologies/artificial-intelligence",
    relatedLabel: "Explore artificial intelligence",
  },
};

export default function DomainPage() {
  const { domain } = useParams();
  const seo: Record<string, { title: string; description: string }> = {
    space: { title: "Space & Aerospace Research", description: "VOGON explores space and aerospace engineering as a future research direction." },
    air: { title: "Air Systems Research", description: "VOGON explores aerial autonomy, sensing and flight control." },
    land: { title: "Land Robotics & Intelligent Systems", description: "VOGON explores robotics, machine perception and intelligent terrestrial systems." },
    sea: { title: "Maritime Autonomous Systems", description: "VOGON explores maritime sensing, autonomy and engineering." },
    software: { title: "VOGON Software — VORTEX & PRAGYA", description: "Explore VOGON's VORTEX industrial software concept and PRAGYA scientific AI reasoning workspace." },
  };
  useSeo({ title: seo[domain || ""]?.title || "Domain not found", description: seo[domain || ""]?.description, path: domain ? `/domains/${domain}` : "/domains" });

  if (domain === "space") return <SpaceComingSoon />;

  const content = domains[domain as keyof typeof domains];

  if (!content) {
    return (
      <section className="shell min-h-screen pt-40">
        <h1 className="display-lg">Domain not found.</h1>
        <Link to="/" className="mt-8 inline-block underline">
          Return home
        </Link>
      </section>
    );
  }

  return (
    <article className="vogon-domain-page">
      <div className="shell vogon-domain-intro">
        <div className="vogon-domain-meta">
          <span>VOGON / DOMAINS</span>
          <span>{content.index} / 05</span>
        </div>

        <h1>{content.title}</h1>

        <div className="vogon-domain-intro-bottom">
          <h2>{content.headline}</h2>
          <p>{content.summary}</p>
        </div>
      </div>

      {domain === "software" ? (
        <section
          className="shell border-t border-line pb-24 pt-12 md:pb-36"
          aria-labelledby="software-project-heading"
        >
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <h2 id="software-project-heading" className="eyebrow">
              VOGON / SOFTWARE SYSTEMS
            </h2>
            <span className="eyebrow">002 SYSTEMS / VORTEX + PRAGYA</span>
          </div>
          <VortexProjectCard />
          <Reveal><PragyaProjectCard /></Reveal>
        </section>
      ) : (
        <div className="vogon-domain-image">
          <img
            src={content.image}
            alt={`Conceptual imagery for VOGON ${content.title}`}
          />
          <span>CONCEPTUAL IMAGERY — NOT A VOGON PRODUCT</span>
        </div>
      )}

      <div className="shell vogon-domain-footer">
        <div>
          <span className="vogon-domain-small">TECHNOLOGY FOCUS</span>
          <p>Research-led. Engineering-driven.</p>
        </div>

        <Link to={content.related}>
          {content.relatedLabel} <span aria-hidden="true"><VogonIcon name="arrow-up-right" /></span>
        </Link>
      </div>
    </article>
  );
}
