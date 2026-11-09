import { type ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

/**
 * Scroll-reveal wrapper: fades/slides content in when it enters the
 * viewport. `left` slides from the left instead of rising.
 */
export function Reveal({
  delay = 0,
  left = false,
  className = "",
  children,
}: {
  delay?: number;
  left?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const ref = useReveal<HTMLDivElement>(delay);
  return (
    <div ref={ref} className={`${left ? "reveal-left" : "reveal"} ${className}`}>
      {children}
    </div>
  );
}
