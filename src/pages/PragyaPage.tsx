import { Link } from "react-router-dom";
import { DrawRule, MaskedTextReveal, Reveal } from "@/components/motion";
import { SectionEyebrow, AnimatedLink, useSeo } from "@/components/ui";
import { VogonIcon } from "@/components/VogonIcon";
import { PragyaField } from "@/components/PragyaField";
import { pragya } from "@/content/site";

const capabilities = [
  { index: "01", title: "Reason through complexity.", text: "AI-assisted explanations for mathematical, scientific, engineering and life-science problems, with equations, assumptions and limitations made explicit.", note: "Language-model reasoning / Verification still required" },
  { index: "02", title: "Compute with precision.", text: "A server-side expression evaluator supports scientific functions, precedence and bounded matrix operations. Computed results are distinct from AI-generated estimates.", note: "Calculator / Matrix operations" },
  { index: "03", title: "Make equations visible.", text: "Plot scalar functions over adjustable domains. Inspect sampled curves and recognize undefined regions or discontinuities.", note: "Function plotting / Interactive readouts" },
  { index: "04", title: "Explore dynamic systems.", text: "Run a numerical mass–spring–damper oscillator simulation. For custom systems, PRAGYA helps plan a simulation rather than claiming to execute one.", note: "RK4 solver / Model planning" },
];

function OpenPragya() {
  return <a className="btn group pragya-open" href={pragya.appUrl} target="_blank" rel="noopener noreferrer">
    <span>OPEN PRAGYA<span className="sr-only"> (opens in a new tab)</span></span>
    <span className="arrow" aria-hidden="true"><VogonIcon name="arrow-up-right"/></span>
  </a>;
}

export default function PragyaPage() {
  useSeo({
    title: "PRAGYA — Scientific Reasoning by VOGON",
    description: "Explore PRAGYA, VOGON's private-alpha scientific reasoning workspace with AI-assisted analysis, numerical calculations, plotting and a bounded oscillator simulator.",
    path: pragya.path,
  });
  return <article className="pragya-page">
    <section className="pragya-hero" aria-labelledby="pragya-title">
      <PragyaField className="pragya-hero-field"/>
      <div className="shell pragya-hero-content">
        <div className="pragya-hero-meta eyebrow"><Link to="/domains/software" className="u-link">Software / Project {pragya.index}</Link><span>RESEARCH INSTRUMENT / PRIVATE ALPHA</span></div>
        <MaskedTextReveal as="h1" id="pragya-title" lines={["PRAGYA"]} trigger="load" className="pragya-title"/>
        <Reveal className="pragya-hero-copy">
          <div><p className="eyebrow text-paper mb-7">SCIENTIFIC REASONING / VOGON 002</p><h2>Think further.<br/>See deeper.</h2></div>
          <div className="pragya-hero-intro"><p className="body-lg">A focused AI-assisted workspace for scientific questions, numerical calculation, function plotting and exploratory simulation.</p><div className="mt-7"><OpenPragya/></div><p className="eyebrow mt-4">Hosted alpha / Workspace access required</p></div>
        </Reveal>
        <div className="pragya-hero-footer eyebrow"><span>SOFTWARE 002 / MATHEMATICS × ENGINEERING × LIFE SCIENCES</span><a href="#pragya-overview" className="u-link">Explore the system ↓</a></div>
      </div>
    </section>
    <section id="pragya-overview" className="shell pragya-section" aria-labelledby="pragya-overview-title">
      <div className="grid-12 gap-y-12"><SectionEyebrow index="01" className="col-span-4 md:col-span-3">The instrument</SectionEyebrow><div className="col-span-4 md:col-span-9"><MaskedTextReveal id="pragya-overview-title" lines={["Questions deserve", "better instruments."]} className="display-lg"/><Reveal className="pragya-overview-copy"><p className="body-lg">{pragya.summary}</p><p className="body">Built around a clear distinction: AI can reason through an idea, while a numerical tool can compute a result. PRAGYA brings both into one private research workspace.</p></Reveal></div></div>
      <DrawRule className="mt-16 md:mt-24"/>
      <dl className="pragya-specs">{[["Programme", "Software 002"],["Stage", "Private alpha"],["Numerics", "Server computed"],["Access", "Authenticated"]].map(([name,value]) => <div key={name}><dt className="eyebrow">{name}</dt><dd>{value}</dd></div>)}</dl>
    </section>
    <section className="pragya-section pragya-capabilities" aria-labelledby="pragya-capabilities-title">
      <div className="shell grid-12 gap-y-14"><div className="col-span-4 md:col-span-4"><div className="md:sticky md:top-32"><SectionEyebrow index="02" className="mb-10">Inside the workspace</SectionEyebrow><MaskedTextReveal id="pragya-capabilities-title" lines={["Four ways", "to explore."]} className="display-lg"/><p className="body mt-8 max-w-xs">A research instrument for working through problems, not a substitute for independent scientific validation.</p></div></div><ol className="col-span-4 md:col-span-7 md:col-start-6">{capabilities.map(item => <Reveal as="li" key={item.index} className="pragya-capability"><span className="eyebrow">{item.index}</span><div><h3>{item.title}</h3><p className="body mt-5 max-w-xl">{item.text}</p><p className="eyebrow mt-7">{item.note}</p></div></Reveal>)}</ol></div>
    </section>
    <section className="shell pragya-section" aria-labelledby="pragya-access-title"><SectionEyebrow index="002" className="mb-10">VOGON / PRAGYA</SectionEyebrow><MaskedTextReveal id="pragya-access-title" lines={["A clearer view", "of complexity."]} className="display-xl"/><DrawRule className="mt-14 md:mt-20"/><div className="pragya-access-row"><p className="body max-w-md">Enter the private-alpha workspace to explore scientific reasoning and computation. Access may require Vercel authentication and the PRAGYA workspace key.</p><OpenPragya/></div><div className="mt-12"><AnimatedLink to="/domains/software" arrow="→">Back to Software</AnimatedLink></div></section>
  </article>;
}
