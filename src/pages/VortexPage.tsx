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
    title: "VORTEX — Industrial Operating System by VOGON",
    description: "VORTEX — Industrial Operating System by VOGON. Industrial ERP features are under development. Available today: a private synthetic simulation laboratory.",
    path: vortex.path,
  });
  return (
    <article className="vortex-page">
      <section className="vortex-hero" aria-labelledby="vortex-title">
        <VortexField className="vortex-hero-field" />
        <div className="shell vortex-hero-content">
          <div className="vortex-hero-meta eyebrow">
            <Link to="/domains/software" className="u-link">Software / Project {vortex.index}</Link>
            <span className="vortex-private">Private platform / In development</span>
          </div>
          <MaskedTextReveal as="h1" id="vortex-title" lines={[vortex.name]} trigger="load" className="vortex-title" />
          <Reveal className="vortex-hero-copy">
            <div>
              <p className="eyebrow mb-7 text-paper">{vortex.designation}</p>
              <h2>Industry.<br />In perspective.</h2>
            </div>
            <div className="vortex-hero-intro">
              <p className="body-lg">One vision for the industrial enterprise. Industrial ERP features are under development; the current application is a simulation laboratory.</p>
              <div className="mt-7"><OpenVortex /></div>
              <p className="eyebrow mt-4">Current simulation / Private sign-in</p>
            </div>
          </Reveal>
          <div className="vortex-hero-bottom eyebrow">
            <span><span className="vortex-indicator" />Available today: synthetic simulation only.</span>
            <a href="#vortex-overview" className="u-link">Explore the platform <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>

      <section id="vortex-overview" className="vortex-section shell" aria-labelledby="vortex-overview-heading">
        <div className="grid-12 gap-y-10">
          <SectionEyebrow index="01" className="col-span-4 md:col-span-3">The direction</SectionEyebrow>
          <div className="col-span-4 md:col-span-9">
            <MaskedTextReveal id="vortex-overview-heading" lines={["A connected vision", "for industry."]} className="display-lg" />
            <Reveal className="grid gap-8 mt-10 md:mt-14 lg:grid-cols-2 lg:gap-16">
              <p className="body-lg">{vortex.summary}</p>
              <p className="body">{vortex.overview}</p>
            </Reveal>
          </div>
        </div>
        <DrawRule className="mt-16 md:mt-24" />
        <dl className="vortex-specs">
          {[["Programme", "Project 001"], ["Industrial ERP", "Under development"], ["Available today", "Simulation laboratory"], ["Access", "Private / Authenticated"]].map(([label, value]) => (
            <div key={label}><dt className="eyebrow">{label}</dt><dd>{value}</dd></div>
          ))}
        </dl>
      </section>

      <section className="vortex-section border-y border-line bg-ink-2" aria-labelledby="vortex-vision-heading">
        <div className="shell grid-12 gap-y-14">
          <div className="col-span-4 md:col-span-4">
            <div className="md:sticky md:top-32">
              <SectionEyebrow index="02" className="mb-10">Product vision</SectionEyebrow>
              <MaskedTextReveal id="vortex-vision-heading" lines={["Across", "the enterprise."]} className="display-lg" />
              <p className="eyebrow mt-8 text-paper">Industrial ERP / Under development</p>
              <p className="body mt-5 max-w-xs">These seven areas describe the intended product direction. The features below are under development and are not available in the current application.</p>
            </div>
          </div>
          <ol className="col-span-4 md:col-span-7 md:col-start-6">
            {vortex.vision.map((area) => (
              <Reveal as="li" key={area.index} className="vortex-vision-area">
                <span className="eyebrow">{area.index}</span>
                <div>
                  <div className="vortex-vision-title">
                    <h3>{area.title}</h3>
                    <span className="eyebrow">Under development</span>
                  </div>
                  <p className="body mt-4 max-w-xl">{area.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="vortex-section" aria-labelledby="vortex-capabilities-heading">
        <div className="shell grid-12 gap-y-14">
          <div className="col-span-4 md:col-span-4">
            <div className="md:sticky md:top-32">
              <SectionEyebrow index="03" className="mb-10">Available today / Simulation</SectionEyebrow>
              <MaskedTextReveal id="vortex-capabilities-heading" lines={["Follow", "the signal."]} className="display-lg" />
              <p className="body mt-8 max-w-xs">The existing synthetic intelligence-fusion laboratory. These capabilities operate on fictional scenarios and synthetic data only; they are not live industrial ERP functions.</p>
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

      <section className="vortex-section shell border-t border-line" aria-labelledby="vortex-workflow-heading">
        <div className="grid-12 gap-y-10">
          <SectionEyebrow index="04" className="col-span-4 md:col-span-3">Current simulation workflow</SectionEyebrow>
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
          <SectionEyebrow className="col-span-4 md:col-span-3"><span className="vortex-indicator" />Current application boundaries</SectionEyebrow>
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
        <MaskedTextReveal id="vortex-access-heading" lines={["The industrial vision.", "The research today."]} className="display-xl" />
        <DrawRule className="mt-14 md:mt-20" />
        <div className="vortex-access-row">
          <p className="body max-w-md">Open the current simulation laboratory with an authorised account. Industrial ERP features remain under development and are not available through this sign-in.</p>
          <OpenVortex />
        </div>
        <div className="mt-12"><AnimatedLink to="/domains/software" arrow="→">Back to Software</AnimatedLink></div>
      </section>
    </article>
  );
}
