import { useId } from "react";

const tracks = [
  "M1010 420V298Q1010 278 990 278H946",
  "M1080 470H1180Q1200 470 1200 490V535",
  "M975 505H854Q834 505 834 525V620H880",
  "M1040 520V690Q1040 710 1060 710H1255",
];

/** Decorative blueprint of connected digital products. No animation render loop. */
export function HeroCanvas() {
  const id = useId().replace(/:/g, "");
  return (
    <div aria-hidden="true" className="systems-scene pointer-events-none absolute inset-0 overflow-hidden">
      <style>{`
        .systems-scene { color: var(--brand-green); }
        .systems-map { width: 100%; height: 100%; }
        .systems-float { animation: systems-drift 12s ease-in-out infinite; }
        .systems-flow { stroke-dasharray: 12 188; animation: systems-flow 7s linear infinite; }
        .systems-beacon { transform-box: fill-box; transform-origin: center; animation: systems-beacon 5s ease-in-out infinite; }
        @keyframes systems-drift { 50% { transform: translateY(-12px); } }
        @keyframes systems-flow { to { stroke-dashoffset: -200; } }
        @keyframes systems-beacon { 50% { opacity: .3; transform: scale(.88); } }
        @media (max-width: 767px) { .systems-map { opacity: .65; } }
        @media (prefers-reduced-motion: reduce) {
          .systems-float, .systems-flow, .systems-beacon { animation: none; }
        }
      `}</style>
      <svg className="systems-map" viewBox="0 0 1440 900" preserveAspectRatio="xMaxYMid slice" fill="none">
        <defs>
          <pattern id={`${id}-grid`} width="54" height="54" patternUnits="userSpaceOnUse" patternTransform="rotate(-18)">
            <path d="M54 0H0V54" stroke="var(--brand-violet)" strokeOpacity=".14" strokeWidth=".7" />
          </pattern>
          <radialGradient id={`${id}-fade`}><stop stopColor="white" /><stop offset="1" stopColor="black" /></radialGradient>
          <mask id={`${id}-mask`}><ellipse cx="1050" cy="450" rx="570" ry="520" fill={`url(#${id}-fade)`} /></mask>
          <linearGradient id={`${id}-panel`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#292430" /><stop offset="1" stopColor="#111017" /></linearGradient>
          <radialGradient id={`${id}-glow`}><stop stopColor="currentColor" stopOpacity=".14" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></radialGradient>
        </defs>
        <rect width="1440" height="900" fill={`url(#${id}-grid)`} mask={`url(#${id}-mask)`} />
        <ellipse cx="1040" cy="460" rx="370" ry="360" fill={`url(#${id}-glow)`} />
        <g className="systems-float">
          <g stroke="var(--brand-violet)" strokeOpacity=".24">
            <circle cx="1030" cy="470" r="225" strokeDasharray="3 10" />
            <circle cx="1030" cy="470" r="310" strokeDasharray="1 14" />
            <path d="M720 470H1340M1030 160V780" strokeDasharray="3 12" />
          </g>
          {tracks.map((d, index) => <g key={d}>
            <path d={d} stroke="currentColor" strokeOpacity=".2" />
            <path d={d} pathLength="200" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="systems-flow" style={{ animationDelay: `${index * -1.8}s` }} />
          </g>)}
          <g transform="translate(760 185) rotate(-7 120 90)">
            <rect width="240" height="180" rx="15" fill={`url(#${id}-panel)`} stroke="var(--brand-violet)" strokeOpacity=".65" />
            <path d="M0 30H240" stroke="var(--brand-violet)" strokeOpacity=".4" />
            {[16, 28, 40].map(x => <circle key={x} cx={x} cy="15" r="2" fill="currentColor" opacity=".6" />)}
            <rect x="18" y="49" width="90" height="7" rx="3" fill="currentColor" opacity=".7" />
            <rect x="18" y="67" width="63" height="4" rx="2" fill="var(--brand-violet)" />
            <rect x="18" y="84" width="100" height="54" rx="5" fill="currentColor" fillOpacity=".07" stroke="currentColor" strokeOpacity=".25" />
            <path d="M142 65H218M142 80H203M142 95H215" stroke="var(--brand-violet)" strokeWidth="4" strokeLinecap="round" />
            <rect x="142" y="119" width="54" height="17" rx="4" fill="currentColor" fillOpacity=".25" />
            <text x="18" y="163" fill="currentColor" opacity=".65" fontSize="8" fontFamily="monospace" letterSpacing="2">WEBSITES</text>
          </g>
          <g transform="translate(1030 470) rotate(45)">
            <rect x="-64" y="-64" width="128" height="128" rx="22" fill={`url(#${id}-panel)`} stroke="currentColor" strokeOpacity=".6" />
            <rect x="-49" y="-49" width="98" height="98" rx="16" stroke="currentColor" strokeOpacity=".16" />
            <rect className="systems-beacon" x="-25" y="-25" width="50" height="50" rx="9" fill="currentColor" fillOpacity=".1" stroke="currentColor" />
            <path d="M-12 0H12M0-12V12" stroke="currentColor" strokeWidth="2" />
          </g>
          <g transform="translate(1170 235) rotate(8 59 110)">
            <rect width="118" height="215" rx="22" fill={`url(#${id}-panel)`} stroke="var(--brand-violet)" strokeOpacity=".7" />
            <path d="M42 15H76" stroke="var(--brand-violet)" strokeWidth="4" strokeLinecap="round" />
            <rect x="15" y="40" width="88" height="51" rx="8" fill="currentColor" fillOpacity=".08" />
            <path d="M27 77L40 66L53 72L69 54L90 58" stroke="currentColor" strokeWidth="1.5" />
            {[107, 131, 155].map(y => <g key={y}><rect x="16" y={y} width="13" height="13" rx="4" stroke="currentColor" strokeOpacity=".5" /><path d={`M40 ${y + 6}H94`} stroke="var(--brand-violet)" strokeWidth="3" strokeLinecap="round" /></g>)}
            <text x="17" y="195" fill="currentColor" opacity=".65" fontSize="7" fontFamily="monospace" letterSpacing="1.5">APPLICATIONS</text>
          </g>
          <g transform="translate(1100 540) rotate(-5 125 90)">
            <rect width="250" height="175" rx="15" fill={`url(#${id}-panel)`} stroke="var(--brand-violet)" strokeOpacity=".65" />
            <path d="M0 30H250M45 30V175" stroke="var(--brand-violet)" strokeOpacity=".35" />
            <circle cx="21" cy="15" r="3" fill="currentColor" />
            <path d="M17 52H28M17 69H28M17 86H28" stroke="var(--brand-violet)" strokeWidth="3" strokeLinecap="round" />
            {[65, 122, 179].map(x => <rect key={x} x={x} y="47" width="43" height="27" rx="5" stroke="currentColor" strokeOpacity=".25" fill="currentColor" fillOpacity=".04" />)}
            <path d="M65 132H226" stroke="var(--brand-violet)" strokeOpacity=".35" />
            {[24, 39, 32, 48, 57, 69].map((h, i) => <rect key={i} x={70 + i * 25} y={132 - h * .6} width="12" height={h * .6} rx="3" fill="currentColor" opacity={.22 + i * .1} />)}
            <text x="65" y="157" fill="currentColor" opacity=".65" fontSize="8" fontFamily="monospace" letterSpacing="2">CONNECTED SYSTEMS</text>
          </g>
          <g stroke="currentColor" strokeOpacity=".4">
            <rect x="880" y="599" width="43" height="43" rx="10" fill={`url(#${id}-panel)`} />
            <path d="M891 620L898 613M891 620L898 627M913 620L906 613M913 620L906 627" />
            <circle cx="1255" cy="710" r="4" fill="currentColor" />
          </g>
        </g>
      </svg>
    </div>
  );
}
