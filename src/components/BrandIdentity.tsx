import type { CSSProperties } from "react";
import { OPEN_CONTOUR_PATHS, PRIMARY_WORD, SECONDARY_WORD, WORDMARK_GLYPHS } from "@/lib/brandGeometry";
import "./BrandIdentity.css";

type BrandProps = { className?: string; decorative?: boolean };

function ContourPaths() {
  return <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    {OPEN_CONTOUR_PATHS.map((path, index) => <path key={path.d} d={path.d} strokeWidth={path.width} pathLength="1" className={index ? "brand-contour-inner" : "brand-contour-outer"} />)}
  </g>;
}

/** Exact approved monogram; suitable for compact and static placements. */
export function OpenContour({ className = "", decorative = false }: BrandProps) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" className={`open-contour ${className}`} role={decorative ? undefined : "img"} aria-hidden={decorative || undefined} aria-label={decorative ? undefined : "Torall Ventures — Open Contour"}>
    <ContourPaths />
  </svg>;
}

function WordmarkPaths() {
  return <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <g transform="translate(0 0) scale(.67)" strokeWidth="3.3" className="brand-primary-word">
      {Array.from(PRIMARY_WORD).map((letter, index) => <g key={`${letter}-${index}`} transform={`translate(${index * 43} 0)`}><g className="brand-letter" style={{ "--letter": index } as CSSProperties}><path d={WORDMARK_GLYPHS[letter]} /></g></g>)}
    </g>
    <g transform="translate(0 41) scale(.23)" strokeWidth="4" className="brand-secondary-word">
      {Array.from(SECONDARY_WORD).map((letter, index) => <g key={`${letter}-${index}`} transform={`translate(${index * 97} 0)`}><g className="brand-letter" style={{ "--letter": index } as CSSProperties}><path d={WORDMARK_GLYPHS[letter]} /></g></g>)}
    </g>
  </g>;
}

/** Lettering is outlined, so no external typeface is required for the identity. */
export function TorallWordmark({ className = "", decorative = false }: BrandProps) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -3 172 57" width="172" height="57" className={`torall-wordmark ${className}`} role={decorative ? undefined : "img"} aria-hidden={decorative || undefined} aria-label={decorative ? undefined : "Torall Ventures"}><WordmarkPaths /></svg>;
}

export function BrandLockup({ className = "", decorative = false, animated = false }: BrandProps & { animated?: boolean }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 80" width="224" height="64" className={`brand-lockup ${animated ? "brand-introduction" : "brand-static"} ${className}`} role={decorative ? undefined : "img"} aria-hidden={decorative || undefined} aria-label={decorative ? undefined : "Torall Ventures"}>
    <g transform="translate(0 0) scale(.43)"><ContourPaths /></g>
    <g transform="translate(99 13)"><WordmarkPaths /></g>
  </svg>;
}

export function CompactMonogram(props: BrandProps) { return <OpenContour {...props} />; }
export function AnimatedBrandIntro(props: BrandProps) { return <BrandLockup {...props} animated />; }
export function StaticBrandLockup(props: BrandProps) { return <BrandLockup {...props} />; }
export function MobileBrandLockup(props: BrandProps) { return <BrandLockup {...props} className={`brand-mobile ${props.className || ""}`} />; }

/** Header typography follows the navigation; the approved symbol stays intact. */
export function HeaderBrandLockup() {
  return <span className="navigation-brand" aria-hidden="true">
    <OpenContour decorative />
    <span className="navigation-wordmark">{Array.from("TORALL VENTURES").map((letter, index) => <span key={index} className="brand-letter navigation-letter" style={{ "--letter": index } as CSSProperties}>{letter}</span>)}</span>
  </span>;
}
