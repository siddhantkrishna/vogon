import { Link } from "react-router-dom";
import { DrawRule, MaskedTextReveal, Reveal } from "@/components/motion";
import { AnimatedLink, SectionEyebrow } from "@/components/ui";
import { VogonIcon } from "@/components/VogonIcon";
import { VortexField } from "@/components/VortexField";
import { vortex } from "@/content/site";

export function VortexProjectCard() {
  return (
    <Link to={vortex.path} className="vortex-project-card group" aria-label="Explore VORTEX — Project 001">
      <div className="vortex-project-art">
        <div className="vortex-project-art-meta eyebrow">
          <span>VOGON / PROJECT {vortex.index}</span>
          <span>Synthetic / Simulation only</span>
        </div>
        <VortexField />
        <span className="vortex-project-word" aria-hidden="true">VORTEX</span>
        <span className="vortex-project-art-caption eyebrow">{vortex.designation}</span>
        <span className="vortex-project-art-note eyebrow">Abstract fusion study</span>
      </div>
      <div className="vortex-project-details">
        <p className="eyebrow">Project {vortex.index} <span className="vortex-status">Private research MVP</span></p>
        <div className="vortex-project-description">
          <div>
            <h3 className="display-md">{vortex.name}</h3>
            <p className="body mt-4 max-w-xl">{vortex.category}. {vortex.summary}</p>
          </div>
          <span className="label flex shrink-0 items-center gap-5">Explore project <span className="arrow arrow-x" aria-hidden="true"><VogonIcon name="arrow-right" /></span></span>
        </div>
      </div>
    </Link>
  );
}

export function ProductsSection() {
  return (
    <section aria-labelledby="products-heading" className="border-t border-line bg-ink py-28 md:py-40">
      <div className="shell">
        <div className="grid-12 mb-14 items-end gap-y-8 md:mb-20">
          <SectionEyebrow className="col-span-4 md:col-span-3">Products / Projects</SectionEyebrow>
          <MaskedTextReveal id="products-heading" lines={["Research.", "Taking shape."]} className="display-lg col-span-4 md:col-span-6" />
          <Reveal className="col-span-4 md:col-span-3 md:text-right">
            <AnimatedLink to="/products">All projects</AnimatedLink>
          </Reveal>
        </div>
        <DrawRule />
        <Reveal className="mt-8"><VortexProjectCard /></Reveal>
      </div>
    </section>
  );
}
