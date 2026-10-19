import { PageHero } from "@/components/PageHero";
import { useSeo } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { VortexProjectCard } from "@/sections/ProductsSection";

export default function ProductsPage() {
  useSeo({
    title: "Products & Projects",
    description: "Project 001: VORTEX — Industrial Operating System by VOGON. Industrial ERP features are under development; the current application is a private simulation laboratory.",
    path: "/products",
  });
  return (
    <>
      <PageHero eyebrow="Products / Projects" lines={["Research.", "Taking shape."]} intro="Focused research. Tangible systems. Explore the platforms taking shape at VOGON, and the questions driving them." />
      <section className="shell pb-28 md:pb-40" aria-label="Product and project index">
        <div className="eyebrow mb-6 flex flex-wrap justify-between gap-4 border-b border-line pb-5">
          <span>Project index</span><span>001 / VORTEX</span>
        </div>
        <Reveal><VortexProjectCard /></Reveal>
      </section>
    </>
  );
}
