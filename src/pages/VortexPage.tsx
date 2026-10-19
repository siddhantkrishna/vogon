import { Link } from "react-router-dom";
import { DrawRule, MaskedTextReveal, Reveal } from "@/components/motion";
import { AnimatedLink, SectionEyebrow, useSeo } from "@/components/ui";
import { VogonIcon } from "@/components/VogonIcon";
import { VortexField } from "@/components/VortexField";
import { vortex } from "@/content/site";

function OpenVortex() {
  return (
    <a href={vortex.loginUrl} className="btn group vortex-open" target="_blank" rel="noopener noreferrer">
      <span>OPEN VORTEX<span className="sr-only"> (opens private login in a new tab)</span></span>
      <span className="arrow" aria-hidden="true"><VogonIcon name="arrow-up-right" /></span>
    </a>
  );
}

export default function VortexPage() {
  useSeo({
    title: "VORTEX — Project 001",
    description: "VOGON’s synthetic intelligence-fusion research platform. Explore synchronised scenarios, evidence-linked incidents and deterministic replay. Synthetic data. Simulation only. Private access.",
    path: vortex.path,
  });
  return (
    <article className="vortex-page">
      <section className="vortex-hero" aria-labelledby="vortex-title">
        <VortexField className="vortex-hero-field" />
        <div className="shell vortex-hero-content">
          <div className="vortex-hero-meta eyebrow">
            <Link to="/products" className="u-link">Products / Project {vortex.index}</Link>
            <span className="vortex-private">Private research platform</span>
          </div>
          <MaskedTextReveal as="h1" id="vortex-title" lines={[vortex.name]} trigger="load" className="vortex-title" />
          <Reveal className="vortex-hero-copy">
            <div>
              <p className="eyebrow mb-7 text-paper">{vortex.designation}</p>
              <h2>Many signals.<br />One perspective.</h2>
            </div>
            <div className="vortex-hero-intro">
              <p className="body-lg">{vortex.category}. Built to explore complexity, entirely within simulation.</p>
              <div className="mt-7"><OpenVortex /></div>
              <p className="eyebrow mt-4">Authorised accounts only / Sign-in required</p>
            </div>
          </Reveal>
          <div className="vortex-hero-bottom eyebrow">
            <span><span className="vortex-indicator" />Synthetic data. Simulation only.</span>
            <a href="#vortex-overview" className="u-link">Explore the platform <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>

      <section id="vortex-overview" className="vortex-section shell" aria-labelledby="vortex-overview-heading">
        <div className="grid-12 gap-y-10">
          <SectionEyebrow index="01" className="col-span-4 md:col-span-3">The platform</SectionEyebrow>
          <div className="col-span-4 md:col-span-9">
            <MaskedTextReveal id="vortex-overview-heading" lines={["Complexity,", "in perspective."]} className="display-lg" />
            <Reveal className="grid gap-8 mt-10 md:mt-14 lg:grid-cols-2 lg:gap-16">
              <p className="body-lg">{vortex.summary}</p>
              <p className="body">{vortex.overview}</p>
            </Reveal>
          </div>
        </div>
        <DrawRule className="mt-16 md:mt-24" />
        <dl className="vortex-specs">
          {[["Programme", "Project 001"], ["Stage", "Research MVP"], ["Environment", "Simulation only"], ["Access", "Private / Authenticated"]].map(([label, value]) => (
            <div key={label}><dt className="eyebrow">{label}</dt><dd>{value}</dd></div>
          ))}
        </dl>
      </section>

      <section className="vortex-section border-y border-line bg-ink-2" aria-labelledby="vortex-capabilities-heading">
        <div className="shell grid-12 gap-y-14">
          <div className="col-span-4 md:col-span-4">
            <div className="md:sticky md:top-32">
              <SectionEyebrow index="02" className="mb-10">Capabilities</SectionEyebrow>
              <MaskedTextReveal id="vortex-capabilities-heading" lines={["Follow", "the signal."]} className="display-lg" />
              <p className="body mt-8 max-w-xs">From a synthetic observation to an inspectable research record.</p>
            </div>
          </div>
          <ol className="col-span-4 md:col-span-7 md:col-start-6">
            {vortex.capabilities.map((capability) => (
              <Reveal as="li" key={capability.index} className="vortex-capability">
                <span className="eyebrow">{capability.index}</span>
                <div>
                  <h3>{capability.title}</h3>
                  <p className="body mt-5 max-w-xl">{capability.text}</p>
                  <p className="eyebrow mt-7">{capability.label}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="vortex-section shell" aria-labelledby="vortex-workflow-heading">
        <div className="grid-12 gap-y-10">
          <SectionEyebrow index="03" className="col-span-4 md:col-span-3">Research loop</SectionEyebrow>
          <MaskedTextReveal id="vortex-workflow-heading" lines={["Fictional scenarios.", "Repeatable experiments."]} className="display-lg col-span-4 md:col-span-9" />
        </div>
        <ol className="vortex-workflow">
          {vortex.workflow.map((step) => (
            <Reveal as="li" key={step.index}>
              <div className="eyebrow flex items-center justify-between"><span>{step.index}</span><span aria-hidden="true"><VogonIcon name="arrow-right" /></span></div>
              <h3>{step.title}</h3>
              <p className="body">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="vortex-boundary" aria-labelledby="vortex-boundary-heading">
        <div className="shell grid-12 gap-y-9">
          <SectionEyebrow className="col-span-4 md:col-span-3"><span className="vortex-indicator" />Research boundaries</SectionEyebrow>
          <div className="col-span-4 md:col-span-9">
            <Reveal>
              <h2 id="vortex-boundary-heading" className="display-md">Synthetic by design.<br />Simulation only.</h2>
              <p className="body mt-7 max-w-2xl">{vortex.limits}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="vortex-section shell" aria-labelledby="vortex-access-heading">
        <SectionEyebrow index="001" className="mb-10">VOGON / VORTEX</SectionEyebrow>
        <MaskedTextReveal id="vortex-access-heading" lines={["A new perspective", "starts here."]} className="display-xl" />
        <DrawRule className="mt-14 md:mt-20" />
        <div className="vortex-access-row">
          <p className="body max-w-md">The research platform is private. Open VORTEX to sign in with an authorised account.</p>
          <OpenVortex />
        </div>
        <div className="mt-12"><AnimatedLink to="/products" arrow="→">All products / projects</AnimatedLink></div>
      </section>
    </article>
  );
}
