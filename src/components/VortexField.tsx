import { useId } from "react";
import { cn } from "@/utils/cn";

/** Abstract fusion study, deliberately unrelated to real telemetry or geography. */
export function VortexField({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <div className={cn("vortex-field", className)} aria-hidden="true">
      <svg viewBox="0 0 800 800" fill="none" focusable="false">
        <defs>
          <radialGradient id={`${id}-halo`}>
            <stop stopColor="#d9e0e3" stopOpacity=".1" />
            <stop offset=".55" stopColor="#d9e0e3" stopOpacity=".025" />
            <stop offset="1" stopColor="#d9e0e3" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-orbit`} x1="140" y1="140" x2="660" y2="660" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f5f5f2" stopOpacity=".08" />
            <stop offset=".48" stopColor="#f5f5f2" stopOpacity=".6" />
            <stop offset="1" stopColor="#f5f5f2" stopOpacity=".04" />
          </linearGradient>
        </defs>
        <circle cx="400" cy="400" r="385" fill={`url(#${id}-halo)`} />
        <g stroke="#f5f5f2" strokeOpacity=".07" strokeWidth=".7">
          <path d="M0 400H800M400 0V800" />
          <circle cx="400" cy="400" r="315" strokeDasharray="1 9" />
          <circle cx="400" cy="400" r="220" />
          <circle cx="400" cy="400" r="125" />
          {Array.from({ length: 48 }, (_, i) => (
            <path key={i} d={`M400 65v${i % 4 === 0 ? 13 : 5}`} transform={`rotate(${i * 7.5} 400 400)`} />
          ))}
        </g>
        <g className="vortex-field-orbits">
          {[0, 60, 120].map((angle) => (
            <g key={angle} transform={`rotate(${angle} 400 400)`}>
              <ellipse cx="400" cy="400" rx="310" ry="106" stroke={`url(#${id}-orbit)`} strokeWidth=".9" />
              <ellipse cx="400" cy="400" rx="270" ry="82" stroke="#f5f5f2" strokeOpacity=".08" strokeWidth=".7" />
              <circle cx="90" cy="400" r="3" fill="#f5f5f2" fillOpacity=".7" />
            </g>
          ))}
          {Array.from({ length: 54 }, (_, i) => {
            const angle = i * 2.39996;
            const radius = 80 + ((i * 71) % 225);
            return <circle key={i} cx={400 + Math.cos(angle) * radius} cy={400 + Math.sin(angle) * radius} r={i % 7 === 0 ? 1.7 : .8} fill="#f5f5f2" fillOpacity={i % 7 === 0 ? .65 : .22} />;
          })}
        </g>
        <g stroke="#f5f5f2" strokeOpacity=".28" strokeWidth=".8">
          <path d="M389 400h22M400 389v22M170 254h-35v-35M630 546h35v35" />
          <circle cx="400" cy="400" r="27" />
          <path d="m427 400 92-92h104M373 400l-92 92H177" strokeOpacity=".15" />
        </g>
        <circle cx="400" cy="400" r="4" fill="#f5f5f2" />
        <circle cx="553" cy="264" r="14" stroke="#e8622c" strokeOpacity=".25" />
        <circle cx="553" cy="264" r="3.5" fill="#e8622c" />
      </svg>
    </div>
  );
}
