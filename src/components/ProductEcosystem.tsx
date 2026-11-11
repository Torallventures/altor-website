import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import "./ProductEcosystem.css";

/** Original illustrative product interfaces, connected in one restrained motion cycle. */
export function ProductEcosystem() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let inView = true;
    const update = () => { stage.dataset.visible = String(inView && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); }, { threshold: .05 });
    observer.observe(stage);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);

  return (
    <div ref={stageRef} className="product-ecosystem" data-paused={paused} data-visible="true">
      <div aria-hidden="true" className="ecosystem-art">
        <div className="ecosystem-halo" />
        <svg viewBox="0 0 640 660" fill="none" className="ecosystem-svg" aria-hidden="true">
          <defs>
            <linearGradient id="eco-surface" x1="0" y1="0" x2="640" y2="660" gradientUnits="userSpaceOnUse"><stop stopColor="#332e3b" /><stop offset="1" stopColor="#17141e" /></linearGradient>
            <linearGradient id="eco-glass" x1="0" y1="0" x2="0" y2="300"><stop stopColor="#a4c68a" stopOpacity=".12" /><stop offset="1" stopColor="#777180" stopOpacity=".02" /></linearGradient>
            <linearGradient id="eco-chart" x1="0" y1="0" x2="0" y2="200"><stop stopColor="#A4C68A" stopOpacity=".28" /><stop offset="1" stopColor="#A4C68A" stopOpacity="0" /></linearGradient>
            <clipPath id="eco-photo"><rect x="62" y="147" width="370" height="146" rx="3" /></clipPath>
          </defs>
          <g stroke="#777180" strokeOpacity=".14">
            <ellipse cx="337" cy="335" rx="278" ry="235" transform="rotate(-22 337 335)" />
            <ellipse cx="337" cy="335" rx="305" ry="266" transform="rotate(-22 337 335)" strokeDasharray="2 10" />
            <path d="M28 330H614M330 25V628" strokeDasharray="2 10" />
          </g>
          <g className="eco-connections" stroke="#A4C68A" strokeOpacity=".25" strokeWidth="1.5">
            <path d="M300 275H520V420H355V518" />
            <path d="M180 285V475H420" />
            <path className="eco-signal" d="M300 275H520V420H355V518" pathLength="100" strokeOpacity=".9" />
            <path className="eco-signal eco-signal-two" d="M180 285V475H420" pathLength="100" strokeOpacity=".9" />
          </g>
          <g className="eco-website">
            <rect x="34" y="79" width="426" height="280" rx="13" fill="#050407" opacity=".35" transform="translate(0 15)" />
            <rect x="34" y="79" width="426" height="280" rx="13" fill="url(#eco-surface)" stroke="#777180" strokeOpacity=".65" />
            <path d="M34 109H460" stroke="#777180" strokeOpacity=".35" />
            {[51, 62, 73].map(x => <circle key={x} cx={x} cy="94" r="2.3" fill="#777180" />)}
            <rect x="174" y="88" width="150" height="12" rx="4" fill="#ffffff05" />
            <text x="227" y="96" fill="#aaa4b2" fontSize="5.5" letterSpacing=".6">YOUR NEXT DIGITAL EXPERIENCE</text>
            <g className="eco-build-nav">
              <text x="62" y="132" fill="#f0f0ec" fontSize="12" letterSpacing="2">AURELIA</text>
              <path d="M330 128H351M363 128H384M396 128H431" stroke="#aaa4b2" strokeWidth="2" />
            </g>
            <g className="eco-build-image">
              <image href="/media/torall-lumera-poster.jpg" x="62" y="147" width="370" height="146" preserveAspectRatio="xMidYMid slice" clipPath="url(#eco-photo)" />
              <rect x="62" y="147" width="370" height="146" fill="#100d17" fillOpacity=".3" />
              <rect x="62" y="147" width="370" height="146" fill="url(#eco-glass)" />
            </g>
            <g className="eco-build-content">
              <text x="81" y="176" fill="#e2edda" fontSize="6" letterSpacing="1.7">A MORE CONNECTED COMMUNITY</text>
              <text x="81" y="209" fill="white" fontSize="26">Welcome to</text>
              <text x="81" y="237" fill="white" fontSize="26">what’s next.</text>
              <rect x="81" y="255" width="86" height="21" rx="3" fill="#A4C68A" />
              <text x="94" y="269" fill="#1b2118" fontSize="7" fontWeight="700" letterSpacing=".5">EXPLORE YOUR WORLD</text>
              <path d="M62 315H175M62 327H150" stroke="#777180" strokeWidth="3" />
              <rect x="329" y="310" width="103" height="24" rx="4" fill="#A4C68A" fillOpacity=".08" stroke="#A4C68A" strokeOpacity=".2" />
              <text x="344" y="325" fill="#b7c9a8" fontSize="7" letterSpacing=".5">BUILT AROUND YOU</text>
            </g>
          </g>
          <g className="eco-dashboard">
            <rect x="68" y="395" width="370" height="215" rx="12" fill="#070509" opacity=".45" transform="translate(0 12)" />
            <rect x="68" y="395" width="370" height="215" rx="12" fill="url(#eco-surface)" stroke="#777180" strokeOpacity=".7" />
            <path d="M68 425H438M104 425V610" stroke="#777180" strokeOpacity=".25" />
            <circle cx="85" cy="411" r="3" fill="#A4C68A" />
            <text x="117" y="414" fill="#a9a1b2" fontSize="6" letterSpacing="1.3">YOUR BUSINESS. ONE WORKSPACE.</text>
            {[444, 464, 484, 504].map((y,i) => <rect key={y} x="81" y={y} width="10" height="8" rx="2" fill={i ? '#777180' : '#A4C68A'} fillOpacity={i ? '.4' : '.8'} />)}
            <text x="121" y="449" fill="#eeecef" fontSize="15">Everything in view.</text>
            <g className="eco-dashboard-data">
              {[0,1,2].map((n) => <g key={n}><rect x={120+n*101} y="465" width="90" height="38" rx="5" fill="#777180" fillOpacity=".1" stroke="#777180" strokeOpacity=".22" /><text x={130+n*101} y="480" fill="#aaa3b2" fontSize="6">{['PROJECTS','ACTIVITY','WORKFLOWS'][n]}</text><text x={130+n*101} y="495" fill="#A4C68A" fontSize="12">{['24','86','12'][n]}</text></g>)}
              <path d="M121 573H417" stroke="#777180" strokeOpacity=".4" />
              <path d="M122 560L160 553L198 562L236 537L274 542L312 521L350 534L391 515L417 519V573H122Z" fill="url(#eco-chart)" />
              <path className="eco-chart-line" d="M122 560L160 553L198 562L236 537L274 542L312 521L350 534L391 515L417 519" stroke="#A4C68A" strokeWidth="2" pathLength="100" />
              <circle className="eco-status" cx="410" cy="441" r="3" fill="#A4C68A" />
              <text x="121" y="593" fill="#a59cab" fontSize="6" letterSpacing=".8">LESS FRICTION. MORE POSSIBILITY.</text>
            </g>
          </g>
          <g className="eco-phone">
            <rect x="449" y="237" width="147" height="280" rx="24" fill="#08060d" opacity=".5" transform="translate(0 12)" />
            <rect x="449" y="237" width="147" height="280" rx="24" fill="#211d2a" stroke="#96909e" strokeOpacity=".65" />
            <rect x="455" y="243" width="135" height="268" rx="19" fill="#15121c" />
            <rect x="503" y="248" width="40" height="5" rx="3" fill="#777180" fillOpacity=".4" />
            <text x="468" y="277" fill="#A4C68A" fontSize="7" letterSpacing="1.5">MY COMMUNITY</text>
            <text x="468" y="302" fill="#ece9ef" fontSize="16">A little more</text><text x="468" y="321" fill="#ece9ef" fontSize="16">connected.</text>
            <rect x="468" y="338" width="109" height="57" rx="7" fill="url(#eco-glass)" stroke="#777180" strokeOpacity=".25" />
            <path d="M481 377V355H496V377M499 377V349H514V377M517 377V359H532V377M477 378H539" stroke="#A4C68A" strokeWidth="1.2" strokeOpacity=".7" />
            <text x="468" y="417" fill="#9f97aa" fontSize="6" letterSpacing="1">BOOK AN AMENITY</text>
            <g className="eco-app-booking">
              <rect x="468" y="427" width="109" height="29" rx="5" fill="#777180" fillOpacity=".13" stroke="#777180" strokeOpacity=".3" />
              <text x="478" y="440" fill="#e0dae6" fontSize="8">Rooftop lounge</text><text x="478" y="450" fill="#a79daf" fontSize="6">Tomorrow · 6:00 pm</text>
              <rect x="468" y="468" width="109" height="24" rx="4" fill="#A4C68A" />
              <text x="492" y="483" fill="#1b2118" fontSize="7" fontWeight="700" letterSpacing=".7">RESERVE SPACE</text>
            </g>
            <g className="eco-app-confirmed">
              <rect x="468" y="427" width="109" height="65" rx="6" fill="#A4C68A" fillOpacity=".1" stroke="#A4C68A" strokeOpacity=".3" />
              <circle cx="522" cy="447" r="9" stroke="#A4C68A" /><path d="M518 447L521 450L527 443" stroke="#A4C68A" strokeWidth="1.5" />
              <text x="488" y="470" fill="#e3ebdd" fontSize="9">You’re all set.</text><text x="482" y="482" fill="#9eaf92" fontSize="6">A smoother everyday.</text>
            </g>
            <path d="M506 502H540" stroke="#777180" strokeWidth="2" strokeLinecap="round" />
          </g>
          <g fill="#A4C68A"><circle className="eco-status" cx="180" cy="380" r="3" /><circle className="eco-status" cx="520" cy="201" r="3" /></g>
        </svg>
      </div>
      <div className="ecosystem-caption"><span>WEBSITES<span className="eco-separator">/</span>APPS<span className="eco-separator">/</span>CUSTOM SYSTEMS</span><button type="button" onClick={() => setPaused(v => !v)} aria-label={paused ? 'Play product animation' : 'Pause product animation'} aria-pressed={paused} className="ecosystem-playback">{paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}</button></div>
      <span className="sr-only">Illustrative website, community booking app, and business dashboard connected into one digital system.</span>
    </div>
  );
}
