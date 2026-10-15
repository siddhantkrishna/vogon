/**
 * VOGON — central content configuration.
 *
 * Everything the site says lives here so it can be replaced by a CMS later.
 * RULE: never fabricate products, customers, contracts, certifications or results.
 * Values set to `null` are intentionally unverified and are hidden from the UI
 * (or rendered as clearly marked placeholders) until real data is supplied.
 */

export const img = (name: string) => `/images/${name}.jpg`;

export const site = {
  name: "VOGON",
  domain: "https://vogon.in",
  tagline: "Defence Technology. Aerospace. Autonomous Systems.",
  description:
    "VOGON is an Indian technology startup exploring autonomous systems, aerospace engineering, artificial intelligence, and advanced robotics.",
  country: "India",
  /** Verified company facts — keep null until confirmed. */
  facts: {
    founded: null as string | null,
    headquarters: null as string | null,
    contactEmail: null as string | null,
    social: [] as { label: string; href: string }[],
  },
  /** Endpoint for form submissions. Serverless handler lives in /api/contact.js */
  formEndpoint: (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) || "/api/contact",
};

export const nav = [
  { label: "Technologies", to: "/technologies" },
  { label: "Capabilities", to: "/capabilities" },
  { label: "Company", to: "/company" },
  { label: "Careers", to: "/careers" },
];

/* ------------------------------------------------------------------ */
/* Technology focus areas (proposed focus — not existing products)    */
/* ------------------------------------------------------------------ */

export type Technology = {
  slug: string;
  index: string;
  title: string;
  kicker: string;
  short: string;
  image: string;
  imageAlt: string;
  overview: string[];
  challenges: { title: string; text: string }[];
  disciplines: string[];
  approach: { step: string; title: string; text: string }[];
  related: string[];
};

export const technologies: Technology[] = [
  {
    slug: "autonomous-systems",
    index: "01",
    title: "Autonomous Systems",
    kicker: "Machines that decide in real time",
    short:
      "Platforms that sense, reason and act with minimal human input — designed for environments where communication is limited and conditions change fast.",
    image: img("autonomous"),
    imageAlt: "Conceptual render of an unmarked autonomous aircraft over a desert test range at dusk",
    overview: [
      "Autonomy is a systems problem. It joins perception, state estimation, planning and control into a single loop that must hold up under noise, latency and uncertainty.",
      "VOGON's focus is on the full stack of that loop — from sensor fusion at the edge to mission-level decision logic — engineered to fail safely and degrade gracefully.",
    ],
    challenges: [
      { title: "Degraded environments", text: "Operating with intermittent GNSS, limited bandwidth and adverse weather." },
      { title: "Verifiable behaviour", text: "Making autonomous decisions inspectable, testable and bounded." },
      { title: "Edge compute limits", text: "Running perception and planning within tight power and thermal budgets." },
    ],
    disciplines: ["State estimation", "Motion planning", "Sensor fusion", "Control theory", "Safety engineering", "Embedded software"],
    approach: [
      { step: "01", title: "Model", text: "Define the operating envelope and failure modes before writing code." },
      { step: "02", title: "Simulate", text: "Exercise behaviour across thousands of synthetic scenarios." },
      { step: "03", title: "Field", text: "Validate on hardware in controlled, instrumented conditions." },
    ],
    related: ["aether", "vector"],
  },
  {
    slug: "aerospace-technologies",
    index: "02",
    title: "Aerospace Technologies",
    kicker: "Airframes, propulsion, flight",
    short:
      "Exploring efficient airframes, propulsion integration and flight systems for unmanned platforms operating across demanding altitudes and ranges.",
    image: img("aerospace"),
    imageAlt: "Close-up of precision turbine blades under a single directional light",
    overview: [
      "Aerospace engineering rewards discipline. Every gram, watt and joint matters, and every design decision carries consequences through the whole vehicle.",
      "VOGON is exploring aerodynamics, structures and flight-control integration for unmanned platforms — with a bias toward manufacturability and maintainability.",
    ],
    challenges: [
      { title: "Weight and endurance", text: "Balancing structural integrity against range and payload." },
      { title: "Thermal management", text: "Dissipating heat from dense electronics in confined airframes." },
      { title: "Certification readiness", text: "Building with documentation and traceability from day one." },
    ],
    disciplines: ["Aerodynamics", "Structural analysis", "Composites", "Propulsion integration", "Flight dynamics", "CFD"],
    approach: [
      { step: "01", title: "Analyse", text: "First-principles sizing and computational aerodynamics." },
      { step: "02", title: "Prototype", text: "Rapid fabrication of sub-scale and component test articles." },
      { step: "03", title: "Iterate", text: "Close the loop between test data and design models." },
    ],
    related: ["aether"],
  },
  {
    slug: "artificial-intelligence",
    index: "03",
    title: "Artificial Intelligence",
    kicker: "Applied machine intelligence",
    short:
      "Applied machine learning for perception, prediction and decision support — built to run reliably on real hardware, not only in the lab.",
    image: img("intelligence"),
    imageAlt: "Rows of compute racks receding into darkness",
    overview: [
      "Useful AI is measured in the field: on constrained processors, against unfamiliar data, under time pressure.",
      "VOGON's focus is applied intelligence — computer vision, multi-sensor learning and decision support — with rigorous evaluation and clear boundaries of competence.",
    ],
    challenges: [
      { title: "Distribution shift", text: "Models that remain dependable when the world differs from the training set." },
      { title: "Explainability", text: "Outputs operators can understand, question and override." },
      { title: "Efficient inference", text: "Compressing models for deterministic latency at the edge." },
    ],
    disciplines: ["Computer vision", "Deep learning", "Model compression", "Data engineering", "Evaluation", "MLOps"],
    approach: [
      { step: "01", title: "Data", text: "Curate representative, well-labelled, versioned datasets." },
      { step: "02", title: "Evaluate", text: "Measure against adversarial and out-of-distribution sets." },
      { step: "03", title: "Deploy", text: "Optimise for target hardware and monitor in operation." },
    ],
    related: ["vector"],
  },
  {
    slug: "advanced-robotics",
    index: "04",
    title: "Advanced Robotics",
    kicker: "Precision in physical systems",
    short:
      "Robotic platforms and manipulation systems engineered for precision, robustness and safe interaction with complex physical environments.",
    image: img("robotics"),
    imageAlt: "Industrial robotic arm under a single overhead spotlight",
    overview: [
      "Robotics is where software meets friction, backlash and gravity. Precision depends on mechanics, sensing and control working as one.",
      "VOGON is exploring robust mobile and manipulation platforms, with attention to modular hardware, real-time control and field serviceability.",
    ],
    challenges: [
      { title: "Unstructured terrain", text: "Mobility and stability outside controlled factory floors." },
      { title: "Contact-rich tasks", text: "Safe, compliant interaction with objects and surfaces." },
      { title: "Reliability", text: "Hardware that survives dust, vibration and temperature extremes." },
    ],
    disciplines: ["Mechatronics", "Kinematics", "Real-time control", "Actuation", "ROS 2", "Mechanical design"],
    approach: [
      { step: "01", title: "Design", text: "Modular mechanical architecture with serviceability in mind." },
      { step: "02", title: "Integrate", text: "Tight coupling of actuation, sensing and control software." },
      { step: "03", title: "Stress", text: "Environmental and endurance testing to expose weak points." },
    ],
    related: ["atlas"],
  },
];

/* ------------------------------------------------------------------ */
/* Capabilities — framed as areas of focus                            */
/* ------------------------------------------------------------------ */

export type Capability = { index: string; title: string; text: string; image: string; points: string[] };

export const capabilities: Capability[] = [
  {
    index: "01",
    title: "AI & Machine Intelligence",
    text: "Perception, prediction and decision-support models engineered for constrained, real-world deployment.",
    image: img("intelligence"),
    points: ["Computer vision", "Multi-sensor learning", "Edge inference", "Model evaluation"],
  },
  {
    index: "02",
    title: "Autonomous Navigation",
    text: "Localisation, mapping and planning designed to remain dependable when external signals are unreliable.",
    image: img("perception"),
    points: ["Visual-inertial odometry", "SLAM", "Path planning", "GNSS-denied navigation"],
  },
  {
    index: "03",
    title: "Embedded Systems",
    text: "Deterministic, power-efficient electronics and firmware for flight, mobility and sensing hardware.",
    image: img("engineering"),
    points: ["Flight controllers", "RTOS firmware", "FPGA / SoC", "Hardware-in-the-loop"],
  },
  {
    index: "04",
    title: "Robotics & Control",
    text: "Mechatronic design and real-time control for precise, robust physical systems.",
    image: img("robotics"),
    points: ["Kinematics", "Motion control", "Actuation", "System identification"],
  },
  {
    index: "05",
    title: "Aerospace Engineering",
    text: "Aerodynamics, structures and integration for efficient unmanned airframes.",
    image: img("aerospace"),
    points: ["Aerodynamic design", "Composite structures", "Propulsion integration", "Flight testing"],
  },
  {
    index: "06",
    title: "Simulation & Digital Systems",
    text: "High-fidelity simulation and digital engineering to compress the path from idea to field test.",
    image: img("horizon"),
    points: ["Physics simulation", "Synthetic data", "Digital twins", "Scenario testing"],
  },
];

/* ------------------------------------------------------------------ */
/* Research — SAMPLE / CONCEPTUAL PLACEHOLDERS                        */
/* Replace with real initiatives before launch.                       */
/* ------------------------------------------------------------------ */

export type Project = {
  slug: string;
  name: string;
  category: string;
  status: string;
  placeholder: boolean;
  summary: string;
  image: string;
  imageAlt: string;
  sections: { title: string; text: string }[];
  technologies: string[];
};

export const projects: Project[] = [
  {
    slug: "aether",
    name: "Project Aether",
    category: "Autonomous Flight Research",
    status: "Concept",
    placeholder: true,
    summary:
      "A conceptual research direction exploring long-endurance autonomous flight at high altitude, combining efficient airframe design with onboard decision-making.",
    image: img("hero"),
    imageAlt: "Conceptual artwork of an unmarked aircraft above Earth's horizon",
    sections: [
      { title: "Research question", text: "How far can onboard autonomy extend mission endurance when communication is intermittent?" },
      { title: "Areas of exploration", text: "High-aspect-ratio airframes, energy-aware path planning and fault-tolerant flight control." },
      { title: "Intended method", text: "Simulation-first development, followed by sub-scale instrumented flight experiments." },
    ],
    technologies: ["autonomous-systems", "aerospace-technologies"],
  },
  {
    slug: "vector",
    name: "Project Vector",
    category: "Perception & Navigation Systems",
    status: "Concept",
    placeholder: true,
    summary:
      "A conceptual programme investigating vision-based navigation and scene understanding for platforms operating without reliable satellite positioning.",
    image: img("perception"),
    imageAlt: "Grayscale aerial terrain with contour overlay",
    sections: [
      { title: "Research question", text: "Can lightweight visual and inertial sensing deliver dependable navigation in GNSS-denied conditions?" },
      { title: "Areas of exploration", text: "Terrain-relative navigation, learned feature matching and uncertainty-aware fusion." },
      { title: "Intended method", text: "Benchmark against public datasets, then validate on recorded flight and ground data." },
    ],
    technologies: ["autonomous-systems", "artificial-intelligence"],
  },
  {
    slug: "atlas",
    name: "Project Atlas",
    category: "Advanced Robotic Platforms",
    status: "Concept",
    placeholder: true,
    summary:
      "A conceptual study of modular robotic platforms for precise manipulation and mobility in unstructured environments.",
    image: img("robotics"),
    imageAlt: "Robotic arm in a dark laboratory",
    sections: [
      { title: "Research question", text: "What modular architecture best balances precision, robustness and field serviceability?" },
      { title: "Areas of exploration", text: "Compliant actuation, real-time whole-body control and swappable tool interfaces." },
      { title: "Intended method", text: "Bench-top prototypes progressing to integrated platform trials." },
    ],
    technologies: ["advanced-robotics"],
  },
];

/* ------------------------------------------------------------------ */
/* Careers — no roles are listed until real openings exist            */
/* ------------------------------------------------------------------ */

export type Role = { title: string; team: string; location: string; type: string; href?: string };
export const roles: Role[] = [];

/* Company — optional verified data. Empty arrays render nothing. */
export const team: { name: string; role: string }[] = [];
export const milestones: { year: string; text: string }[] = [];
