import type { ElementType, ReactNode } from "react";
import Reveal from "./Reveal";

type SectionProps = {
  children: ReactNode;
  as?: ElementType;
  id?: string;
  /** Constrain content to the page container width (default true). */
  contained?: boolean;
  /** Wrap children in the scroll-reveal utility (default true). */
  reveal?: boolean;
  /** Extra classes on the outer <section>. */
  className?: string;
  /** Extra classes on the inner container. */
  innerClassName?: string;
};

/**
 * Standard section wrapper: consistent vertical rhythm, optional page
 * container, and an optional scroll-reveal on the content. This is the
 * building block every page section composes from.
 */
export default function Section({
  children,
  as,
  id,
  contained = true,
  reveal = true,
  className = "",
  innerClassName = "",
}: SectionProps) {
  const Tag = (as ?? "section") as ElementType;
  const inner = (
    <div
      className={`${contained ? "container-page" : ""} ${innerClassName}`.trim()}
    >
      {children}
    </div>
  );

  return (
    <Tag
      id={id}
      className={`py-[var(--spacing-section)] ${className}`.trim()}
    >
      {reveal ? <Reveal>{inner}</Reveal> : inner}
    </Tag>
  );
}
