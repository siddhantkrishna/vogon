/** VOGON crawler-readable HTML snapshots for known public routes.
 * Vite still serves the interactive React SPA; React replaces the initial
 * semantic snapshot at startup. This is not SSR or full static prerendering.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");
const sourceHtml = readFileSync(join(dist, "index.html"), "utf8");
const domain = "https://www.vogon.in";
const mainImage = `${domain}/images/hero.jpg`;
const assets = [...sourceHtml.matchAll(/<(?:script|link)\b[^>]*\/assets\/[^>]*>(?:<\/script>)?/g)].map(m => m[0]);
if (!assets.some(s => s.includes('type="module"')) || !assets.some(s => s.includes('stylesheet'))) {
  throw new Error("Vite build asset tags not found. Refusing to generate incomplete SEO HTML.");
}
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const json = value => JSON.stringify(value).replace(/</g, "\\u003c");
const founderBio = "Siddhant Krishna is the founder and chief engineer of VOGON, an India-based technology initiative exploring aerospace, autonomous systems, artificial intelligence and advanced engineering software. His interests include physics, astronomy, rocket systems and scientific computing. He also founded Spark Labs, an initiative focused on practical AI education.";
const routes = [
  { path:"/", title:"VOGON — Advanced Defence & Aerospace Technology", description:"VOGON is an Indian engineering initiative exploring aerospace technology, autonomous systems, artificial intelligence, robotics and scientific software.", heading:"VOGON. Engineering the next frontier.", copy:["VOGON is an Indian technology initiative working at the intersection of autonomous systems, aerospace engineering, applied AI and advanced robotics.","Explore VOGON's technology directions, engineering philosophy and early-stage software research."], links:[["Technology focus areas","/technologies"],["VOGON Software","/domains/software"],["Founder — Siddhant Krishna","/founder"],["Company","/company"]] },
  { path:"/founder", title:"Siddhant Krishna | Founder & Chief Engineer — VOGON", description:"Meet Siddhant Krishna, founder and chief engineer of VOGON. Explore his background in physics, aerospace, scientific AI and engineering software.", heading:"Siddhant Krishna — Founder & Chief Engineer", copy:[founderBio,"At VOGON, Siddhant develops early-stage research tools including VORTEX, an industrial software and simulation concept, and PRAGYA, a scientific AI reasoning and computation workspace.","He approaches complex technical problems through first-principles thinking, modeling, prototyping and evidence-driven iteration."], links:[["Read more about VOGON","/company"],["PRAGYA","/pragya"],["VORTEX","/vortex"],["Siddhant's personal website","https://www.siddhantkrishna.com/"]] },
  { path:"/company", title:"About VOGON — Company, Mission & Founder", description:"Learn about VOGON, its engineering mission, responsible research philosophy and founder Siddhant Krishna.", heading:"About VOGON — An Independent Engineering Initiative", copy:["VOGON explores aerospace technology, intelligent autonomous systems, artificial intelligence and advanced robotics in India.","The company emphasizes first principles, evidence, disciplined systems engineering and responsibility in early-stage research."], links:[["Meet founder Siddhant Krishna","/founder"],["Engineering capabilities","/capabilities"],["Contact VOGON","/contact"]] },
  { path:"/domains/software", title:"VOGON Software — VORTEX & PRAGYA", description:"Explore VOGON's VORTEX industrial software vision and PRAGYA scientific AI reasoning workspace. Early-stage engineering software and research.", heading:"VOGON Software — VORTEX and PRAGYA", copy:["VOGON's software research includes VORTEX, an industrial operating-system vision with a private simulation laboratory, and PRAGYA, an AI-assisted scientific reasoning and numerical computing workspace.","These systems are at an early research or private-alpha stage; described capabilities are not claims of deployed operational defence products."], links:[["VORTEX — Software 001","/vortex"],["PRAGYA — Software 002","/pragya"],["VOGON founder","/founder"]] },
  { path:"/vortex", title:"VORTEX — Industrial Software & Simulation | VOGON", description:"VORTEX by VOGON: an industrial operating-system vision and private synthetic scenario research laboratory. Industrial ERP modules are in development.", heading:"VORTEX — Industrial Operating System Vision", copy:["VORTEX combines a vision for production, machinery, inventory, workforce, finance and energy visibility with an existing private simulation laboratory for synthetic scenarios.","The industrial ERP components are under development. The research laboratory is not a fielded defence surveillance platform."], links:[["Explore VOGON Software","/domains/software"],["PRAGYA","/pragya"]] },
  { path:"/pragya", title:"PRAGYA — Scientific AI & Numerical Computing | VOGON", description:"PRAGYA is VOGON's private-alpha scientific reasoning workspace for mathematics, engineering and life sciences with numerical tools, plotting and simulation.", heading:"PRAGYA — Scientific Reasoning by VOGON", copy:["PRAGYA brings together AI-assisted analysis, server-computed scientific calculations, bounded matrix operations, interactive function plots and a numerical oscillator simulation.","PRAGYA is a private alpha. Scientific outputs should be checked independently; advanced models do not replace expert validation."], links:[["Explore PRAGYA","https://pragya.vogon.in"],["VOGON Software","/domains/software"]] },
  { path:"/technologies", title:"VOGON Technologies — Autonomy, Aerospace, AI & Robotics", description:"VOGON's technology focus areas include autonomous systems, aerospace engineering, artificial intelligence and advanced robotics.", heading:"Technologies — Intelligence Meets Engineering", copy:["VOGON studies autonomous navigation, airframe and flight systems, machine intelligence, robotic control and related engineering challenges.","These are research interests and intended development directions rather than claims of fielded products."], links:[["Autonomous systems","/technologies/autonomous-systems"],["Aerospace","/technologies/aerospace-technologies"],["Artificial intelligence","/technologies/artificial-intelligence"],["Robotics","/technologies/advanced-robotics"]] },
  { path:"/technologies/autonomous-systems", title:"Autonomous Systems Research — VOGON", description:"VOGON explores sensing, navigation, perception and control challenges in autonomous physical systems.", heading:"Autonomous Systems Research", copy:["Research directions include multi-sensor perception, localization, planning, fault tolerance and control for autonomous platforms."], links:[["All technologies","/technologies"],["Capabilities","/capabilities"]] },
  { path:"/technologies/aerospace-technologies", title:"Aerospace Technologies — VOGON", description:"Explore VOGON's aerospace technology interests: airframes, flight dynamics, propulsion integration and systems engineering.", heading:"Aerospace Technologies", copy:["VOGON explores the technical constraints of efficient airframes, flight-control integration, structures and aerospace systems."], links:[["All technologies","/technologies"],["Founder","/founder"]] },
  { path:"/technologies/artificial-intelligence", title:"Artificial Intelligence Engineering — VOGON", description:"Applied artificial intelligence, computer vision, edge inference and engineering decision support are among VOGON's focus areas.", heading:"Artificial Intelligence Engineering", copy:["VOGON's AI research direction focuses on evaluation, machine perception, edge deployment and careful boundaries around automated decisions."], links:[["All technologies","/technologies"],["PRAGYA","/pragya"]] },
  { path:"/technologies/advanced-robotics", title:"Advanced Robotics & Control — VOGON", description:"VOGON explores robotics, mechatronics, manipulation, autonomous mobility and real-time control.", heading:"Advanced Robotics & Control", copy:["The research direction includes sensing, actuation, mechatronics, motion planning and reliable control in physical environments."], links:[["All technologies","/technologies"],["Capabilities","/capabilities"]] },
  { path:"/capabilities", title:"Engineering Capabilities — VOGON", description:"Explore VOGON's intended engineering capabilities in aerospace, embedded systems, machine intelligence, autonomy, simulation and robotics.", heading:"VOGON Engineering Capabilities", copy:["VOGON's focus areas include AI and machine intelligence, autonomous navigation, embedded systems, robotics and control, aerospace and simulation.","These represent engineering priorities and intended capabilities, not independently validated fielded systems."], links:[["Technology focus","/technologies"],["About VOGON","/company"]] },
  { path:"/research/pluto", title:"Project Pluto — Autonomous Flight Research | VOGON", description:"Project Pluto is a conceptual VOGON research direction exploring high-altitude autonomous flight and long-endurance aerospace systems.", heading:"Project Pluto — Autonomous Flight Research", copy:["Project Pluto explores long-endurance autonomous flight at high altitude, combining efficient airframe design with onboard decision-making.","This is a conceptual research direction and sample project, not a fielded aircraft, operational programme or verified research achievement."], links:[["Research directions","/research"],["Aerospace technologies","/technologies/aerospace-technologies"]] },
  { path:"/research", title:"Research Directions — VOGON", description:"Explore VOGON's conceptual research directions in autonomous flight, perception, navigation and advanced robotics.", heading:"VOGON Research & Development", copy:["VOGON presents conceptual study directions around autonomous flight, perception, navigation and robotics.","Concept projects are examples of possible research trajectories; they are not operational systems or verified research achievements."], links:[["Explore technologies","/technologies"],["Software research","/domains/software"]] },
  { path:"/careers", title:"Careers at VOGON — Engineering & Research", description:"Discover VOGON's engineering philosophy and future opportunities across aerospace, software, autonomy and AI.", heading:"Careers at VOGON", copy:["VOGON values careful experimentation, technical ownership and rigorous engineering across software and intelligent physical systems.","Current verified job openings, if any, are published on the live careers page."], links:[["Company","/company"],["Contact","/contact"]] },
  { path:"/contact", title:"Contact VOGON — Engineering & Research Inquiries", description:"Contact VOGON about engineering, research, software collaboration and company inquiries.", heading:"Contact VOGON", copy:["Reach the VOGON team regarding aerospace, autonomous systems, scientific software, research collaboration and general inquiries."], links:[["Company","/company"],["Founder","/founder"]] },
  { path:"/doccumentation", title:"VOGON Documentation & Research Notes", description:"Access the VOGON documentation library, technical notes and publicly available research materials.", heading:"VOGON Documentation Library", copy:["VOGON publishes public documents and research materials in its online documentation library. Browse the live page for currently available files."], links:[["Research","/research"],["Company","/company"]] },
  { path:"/domains/air", title:"Air Systems Research — VOGON", description:"VOGON explores aerial autonomy, sensing and flight control as early-stage technology directions.", heading:"VOGON — Air", copy:["Exploring autonomous flight, aerospace systems, sensing and control technologies for complex aerial environments."], links:[["Aerospace technologies","/technologies/aerospace-technologies"]] },
  { path:"/domains/land", title:"Land Robotics & Intelligent Systems — VOGON", description:"Explore VOGON's interests in terrestrial robotics, machine perception and intelligent physical systems.", heading:"VOGON — Land", copy:["Exploring robotics, machine perception and intelligent physical systems for challenging terrestrial environments."], links:[["Advanced robotics","/technologies/advanced-robotics"]] },
  { path:"/domains/sea", title:"Maritime Autonomous Systems — VOGON", description:"VOGON explores maritime sensing, autonomy and reliable engineering for demanding operating environments.", heading:"VOGON — Sea", copy:["Exploring engineering challenges in maritime sensing, autonomous navigation and reliable systems in demanding environments."], links:[["Technology directions","/technologies"]] },
];

function metadata(route) {
  const url = domain + (route.path === "/" ? "/" : route.path);
  const organization = { "@type":"Organization", "@id":`${domain}/#organization`, name:"VOGON", url:`${domain}/`, description:"Independent Indian technology initiative exploring autonomous systems, aerospace, artificial intelligence, robotics and scientific computing.", logo:`${domain}/brand/vogon-original.png`, founder:{"@id":`${domain}/founder#person`} };
  const entities = [ {"@type":"WebSite","@id":`${domain}/#website`, name:"VOGON",url:`${domain}/`,publisher:{"@id":`${domain}/#organization`} }, organization,
    {"@type":"WebPage","@id":`${url}#webpage`, url, name:route.title, description:route.description, isPartOf:{"@id":`${domain}/#website`}, inLanguage:"en-IN"} ];
  if (route.path === "/founder") entities.push({"@type":"Person","@id":`${domain}/founder#person`, name:"Siddhant Krishna", url:`${domain}/founder`, mainEntityOfPage:{"@id":`${url}#webpage`}, jobTitle:"Founder & Chief Engineer", worksFor:{"@id":`${domain}/#organization`}, founder:{"@id":`${domain}/#organization`}, sameAs:["https://www.siddhantkrishna.com/"], description:founderBio, knowsAbout:["Aerospace engineering","Scientific computing","Artificial intelligence","Autonomous systems","Physics"] });
  return `<meta name="robots" content="index,follow,max-image-preview:large" />
<title>${esc(route.title)}</title>
<meta name="description" content="${esc(route.description)}" />
<link rel="canonical" href="${esc(url)}" />
<meta property="og:type" content="${route.path === '/founder' ? 'profile':'website'}" />
<meta property="og:site_name" content="VOGON" />
<meta property="og:locale" content="en_IN" />
<meta property="og:title" content="${esc(route.title)}" />
<meta property="og:description" content="${esc(route.description)}" />
<meta property="og:url" content="${esc(url)}" />
<meta property="og:image" content="${mainImage}" />
<meta property="og:image:alt" content="VOGON aerospace and engineering visual" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(route.title)}" />
<meta name="twitter:description" content="${esc(route.description)}" />
<meta name="twitter:image" content="${mainImage}" />
<script type="application/ld+json">${json({"@context":"https://schema.org","@graph":entities})}</script>`;
}

function staticBody(route) {
 const links = route.links || [];
 return `<main class="seo-seed" id="seo-seed" aria-label="${esc(route.heading)}">
  <div class="seo-seed-top"><a href="/" aria-label="VOGON home">VOGON</a><span>ENGINEERING / INDIA</span></div>
  <div class="seo-seed-content"><p class="seo-seed-kicker">VOGON / ${route.path === '/founder' ? 'FOUNDER' : 'ENGINEERING'}</p><h1>${esc(route.heading)}</h1>
  ${route.copy.map(t=>`<p>${esc(t)}</p>`).join("\n")}
  <nav aria-label="Explore VOGON">${links.map(([name,href])=>`<a href="${esc(href)}">${esc(name)} ↗</a>`).join("\n")}</nav></div>
  <div class="seo-seed-footer">VOGON / AUTONOMY · AEROSPACE · SOFTWARE</div></main>`;
}
const preloadStyle = `<style id="seo-seed-style">.seo-seed{background:#050505;color:#f5f5f2;min-height:100vh;padding:32px clamp(20px,4vw,64px);font-family:Inter,system-ui,sans-serif}.seo-seed-top,.seo-seed-footer{display:flex;justify-content:space-between;font:11px 'IBM Plex Mono',monospace;letter-spacing:.12em;color:#999}.seo-seed-top a{color:#fff;text-decoration:none;font-size:17px;font-weight:700}.seo-seed-content{max-width:970px;padding:clamp(80px,12vw,190px) 0}.seo-seed-kicker{font:11px monospace;letter-spacing:.13em;color:#aaa}.seo-seed h1{font:700 clamp(46px,7vw,112px)/.99 'Inter Tight',Inter,sans-serif;letter-spacing:-.06em;margin:24px 0 44px}.seo-seed-content>p:not(.seo-seed-kicker){max-width:760px;font:clamp(16px,1.8vw,22px)/1.65 Inter,system-ui,sans-serif;color:#bdbdbd;margin:0 0 22px}.seo-seed nav{display:flex;flex-wrap:wrap;gap:24px;margin-top:52px}.seo-seed nav a{font:13px monospace;border-bottom:1px solid #777;color:#fff;padding-bottom:12px;text-decoration:none}@media(max-width:600px){.seo-seed-top span{display:none}}</style>`;
const fontHead = `<link rel="icon" type="image/png" href="/favicon.png" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />`;
function createHtml(route) {
 return `<!doctype html>\n<html lang="en-IN"><head><meta charset="UTF-8" />\n<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />\n<meta name="theme-color" content="#050505" />\n<meta name="color-scheme" content="dark" />\n${metadata(route)}\n${fontHead}\n${route.path === "/" ? '<link rel="preload" as="image" href="/images/hero.jpg" fetchpriority="high" />' : ""}\n${assets.join("\n")}\n${preloadStyle}</head><body><div id="root">${staticBody(route)}</div></body></html>`;
}

for (const route of routes) {
  const file = route.path === "/" ? join(dist,"index.html") : join(dist,route.path.slice(1),"index.html");
  mkdirSync(dirname(file),{recursive:true});
  writeFileSync(file,createHtml(route),"utf8");
}
// Keep the committed public sitemap aligned with the prerendered public routes.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(r=>`  <url><loc>${domain}${r.path}</loc></url>`).join("\n")}\n</urlset>\n`;
writeFileSync(join(dist,"sitemap.xml"),sitemap);
console.log(`Generated ${routes.length} crawler-readable HTML snapshots and sitemap.xml`);
