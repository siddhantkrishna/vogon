import { useId } from "react";
import { cn } from "@/utils/cn";

/** Abstract mathematical composition, not live model output. */
export function PragyaField({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const wave = Array.from({ length: 121 }, (_, i) => {
    const x = 60 + i * 7.3;
    const u = (x - 500) / 150;
    const y = 315 - (Math.sin(u * 3.5) * Math.exp(-u * u * 0.18) * 88 + Math.cos(u * 1.4) * 22);
    return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
  return (
    <div className={cn("pragya-field", className)} aria-hidden="true">
      <svg viewBox="0 0 1000 620" fill="none" focusable="false">
        <defs>
          <radialGradient id={`${id}-glow`}><stop stopColor="#e9ebeb" stopOpacity=".12"/><stop offset="1" stopColor="#e9ebeb" stopOpacity="0"/></radialGradient>
          <linearGradient id={`${id}-trace`} x1="90" y1="280" x2="920" y2="360" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f1f1ee" stopOpacity=".06"/><stop offset=".5" stopColor="#f1f1ee" stopOpacity=".9"/><stop offset="1" stopColor="#f1f1ee" stopOpacity=".12"/>
          </linearGradient>
          <pattern id={`${id}-grid`} width="38" height="38" patternUnits="userSpaceOnUse"><path d="M38 0H0V38" stroke="#f1f1ee" strokeOpacity=".085" strokeWidth=".7"/></pattern>
        </defs>
        <rect width="1000" height="620" fill={`url(#${id}-grid)`}/>
        <circle cx="510" cy="300" r="320" fill={`url(#${id}-glow)`}/>
        <g stroke="#f1f1ee" strokeWidth=".8" strokeOpacity=".16">
          <path d="M0 315H1000M510 0V620" strokeDasharray="3 8"/>
          <circle cx="510" cy="315" r="176"/>
          <circle cx="510" cy="315" r="260" strokeDasharray="2 9"/>
          <ellipse cx="510" cy="315" rx="345" ry="105" transform="rotate(-24 510 315)"/>
        </g>
        <g className="pragya-field-orbit" stroke="#f1f1ee" strokeOpacity=".3">
          <ellipse cx="510" cy="315" rx="286" ry="118" transform="rotate(31 510 315)" strokeWidth="1.1"/>
          <circle cx="796" cy="315" r="5" fill="#f1f1ee" stroke="none"/>
        </g>
        <path d={wave} stroke="#f1f1ee" strokeOpacity=".12" strokeWidth="5"/>
        <path className="pragya-field-trace" d={wave} stroke={`url(#${id}-trace)`} strokeWidth="1.7"/>
        {Array.from({ length: 11 }, (_, i) => <g key={i} transform={`translate(${145 + i * 73} 0)`} stroke="#f1f1ee" strokeOpacity=".2"><path d="M0 304v22"/><circle cx="0" cy="315" r="2" fill="#f1f1ee" stroke="none"/></g>)}
        <g stroke="#f1f1ee" strokeOpacity=".55" strokeWidth="1">
          <path d="M496 315h28M510 301v28"/>
          <circle cx="510" cy="315" r="17"/>
          <path d="M800 152h35v-35M205 477h-35v35" strokeOpacity=".35"/>
        </g>
        <circle cx="510" cy="315" r="2.8" fill="#f1f1ee"/>
        <g fill="#f1f1ee" fillOpacity=".45" fontFamily="monospace" fontSize="10" letterSpacing="2">
          <text x="45" y="46">REASONING FIELD / P-002</text>
          <text x="745" y="573">MATHEMATICS · MODELS · SCIENCE</text>
          <text x="527" y="294">0,0</text>
        </g>
      </svg>
    </div>
  );
}
