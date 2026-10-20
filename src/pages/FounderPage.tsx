import { Link } from "react-router-dom";
import { DrawRule, MaskedTextReveal, Reveal } from "@/components/motion";
import { AnimatedLink, SectionEyebrow, useSeo } from "@/components/ui";
import { VogonIcon } from "@/components/VogonIcon";

const projects = [
  {
    number: "001",
    title: "VORTEX",
    label: "Industrial software / Simulation research",
    description: "An industrial operating-system vision with a private laboratory for synthetic scenarios and evidence-linked analysis.",
    to: "/vortex",
  },
  {
    number: "002",
    title: "PRAGYA",
    label: "Scientific AI / Numerical tools",
    description: "A scientific reasoning workspace combining AI-assisted analysis, verified numerical calculations, plots and exploratory simulation.",
    to: "/pragya",
  },
];

const principles = [
  { no: "01", title: "Begin with physics.", text: "Understand the constraints of a system before optimizing the design." },
  { no: "02", title: "Build to understand.", text: "Turn hypotheses into working software, numerical models and experiments." },
  { no: "03", title: "Keep claims accountable.", text: "Separate a concept from a prototype, a simulation from a fielded system, and an estimate from a measurement." },
];

function FounderGeometry() {
  return (
    <div className="founder-geometry" aria-hidden="true">
      <svg viewBox="0 0 680 680" role="presentation" focusable="false">
        <defs>
          <linearGradient id="founder-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity=".68" />
            <stop offset="1" stopColor="#fff" stopOpacity=".06" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#founder-line)" strokeWidth=".75">
          <circle cx="340" cy="340" r="230" className="founder-geometry-orbit" />
          <circle cx="340" cy="340" r="158" strokeDasharray="3 9" />
          <circle cx="340" cy="340" r="85" strokeOpacity=".48" />
          <ellipse cx="340" cy="340" rx="300" ry="100" transform="rotate(-32 340 340)" className="founder-geometry-orbit-reverse" />
          <ellipse cx="340" cy="340" rx="300" ry="100" transform="rotate(32 340 340)" className="founder-geometry-orbit" />
          <path d="M0 340H680M340 0V680" strokeDasharray="3 10" strokeOpacity=".32" />
          <path d="M106 106H574V574H106Z" strokeOpacity=".14" />
          <path d="M120 560L560 120" strokeOpacity=".15" />
        </g>
        <g fill="#eee"><circle cx="340" cy="340" r="4"/><circle cx="550" cy="245" r="3"/><circle cx="144" cy="461" r="2.5" /></g>
        <g fill="#aaa" fontFamily="monospace" fontSize="10" letterSpacing="2">
          <text x="19" y="29">VOGON / ENGINEERING</text>
          <text x="483" y="655">FIG / 01.0</text>
          <text x="350" y="326">ORIGIN</text>
          <text x="20" y="654">MODEL → BUILD → TEST</text>
        </g>
      </svg>
    </div>
  );
}

export default function FounderPage() {
  useSeo({
    title: "Siddhant Krishna | Founder & Chief Engineer",
    description: "Meet Siddhant Krishna, founder and chief engineer of VOGON, an Indian technology initiative exploring aerospace, autonomous systems, scientific AI and engineering software.",
    path: "/founder",
  });

  return (
    <article className="founder-page">
      <section className="founder-hero" aria-labelledby="founder-title">
        <FounderGeometry />
        <div className="shell founder-hero-inner">
          <div className="founder-hero-kicker eyebrow">
            <Link className="u-link" to="/company">VOGON / COMPANY</Link>
            <span>FOUNDER PROFILE / 001</span>
          </div>
          <div className="founder-hero-heading">
            <p className="founder-overline">FOUNDER &amp; CHIEF ENGINEER</p>
            <MaskedTextReveal as="h1" id="founder-title" trigger="load" lines={["SIDDHANT", "KRISHNA."]} className="founder-title" />
            <Reveal className="founder-hero-subline">
              <p>Building from first principles.</p>
              <a className="founder-scroll" href="#founder-about">DISCOVER THE WORK <span aria-hidden="true">↓</span></a>
            </Reveal>
          </div>
          <div className="founder-hero-foot eyebrow"><span>VOGON / INDIA</span><span>SCIENCE · SYSTEMS · ENGINEERING</span></div>
        </div>
      </section>

      <section id="founder-about" className="shell founder-block" aria-labelledby="founder-about-title">
        <div className="grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-3"><SectionEyebrow index="01">Biography</SectionEyebrow></div>
          <div className="col-span-4 md:col-span-8 md:col-start-5">
            <MaskedTextReveal as="h2" id="founder-about-title" lines={["An engineer's", "way of thinking."]} className="display-lg" />
            <Reveal className="founder-bio-grid">
              <p className="founder-lead">Siddhant Krishna is the founder and chief engineer of VOGON, an India-based technology initiative exploring aerospace, autonomous systems, artificial intelligence and advanced engineering software.</p>
              <div className="founder-bio-side">
                <p>His work brings together an interest in physics, astronomy and rocket systems with practical software development and scientific computing. At VOGON, he is developing early-stage concepts and research tools, including VORTEX and PRAGYA.</p>
                <p>He also founded Spark Labs, an initiative focused on hands-on AI education, and has worked on technology projects spanning automation, software products and digital experiences.</p>
                <p>His approach is grounded in first principles: understand the problem, build a testable system, measure what works and improve it.</p>
                <a className="founder-external" href="https://www.siddhantkrishna.com/" target="_blank" rel="noopener noreferrer">EXPLORE PERSONAL WEBSITE <VogonIcon name="arrow-up-right" /></a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="founder-principles" aria-labelledby="founder-principles-title">
        <div className="shell founder-block">
          <SectionEyebrow index="02" className="mb-10">Working method</SectionEyebrow>
          <MaskedTextReveal as="h2" id="founder-principles-title" lines={["Curiosity is a start.", "Evidence is the work."]} className="display-lg" />
          <div className="founder-principle-grid">
            {principles.map((principle) => <Reveal as="article" key={principle.no} className="founder-principle">
              <p className="eyebrow">{principle.no} / PRINCIPLE</p>
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
            </Reveal>)}
          </div>
        </div>
      </section>

      <section className="shell founder-block" aria-labelledby="founder-projects-title">
        <div className="founder-project-heading">
          <SectionEyebrow index="03">Selected work at VOGON</SectionEyebrow>
          <MaskedTextReveal as="h2" id="founder-projects-title" lines={["Systems in", "development."]} className="display-lg" />
        </div>
        <DrawRule />
        {projects.map((project) => <Link key={project.number} to={project.to} className="founder-project-link">
          <span className="eyebrow">{project.number}</span>
          <div><h3>{project.title}</h3><span className="eyebrow">{project.label}</span><p>{project.description}</p></div>
          <span className="founder-project-arrow" aria-hidden="true">↗</span>
        </Link>)}
        <p className="founder-caveat eyebrow">VOGON's software and aerospace work is early-stage. The research directions presented here are not claims of deployed defence systems.</p>
      </section>

      <section className="founder-outro" aria-labelledby="founder-outro-title">
        <div className="shell founder-block">
          <SectionEyebrow index="04" className="mb-10">Continue exploring</SectionEyebrow>
          <MaskedTextReveal as="h2" id="founder-outro-title" lines={["The work", "is the proof."]} className="display-xl" />
          <div className="founder-outro-links"><AnimatedLink to="/company" arrow="→">About VOGON</AnimatedLink><AnimatedLink to="/domains/software" arrow="→">Explore software</AnimatedLink><a href="https://www.siddhantkrishna.com/" target="_blank" rel="noopener noreferrer">Personal website ↗</a></div>
        </div>
      </section>
    </article>
  );
}
