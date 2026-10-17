"use client";

import { animate, stagger, utils } from "animejs";
import { usePathname } from "next/navigation";
import { Children, cloneElement, Fragment, isValidElement, useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { createViewportMotion } from "@/lib/viewport-motion";
import styles from "./MaskedHeading.module.css";

function maskWords(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      return String(child).split(/(\s+)/).map((part, index) => /^\s+$/.test(part) ? (
        <Fragment key={index}>{part}</Fragment>
      ) : (
        <span key={index} className={styles.mask}><span data-masked-word className={styles.word}>{part}</span></span>
      ));
    }
    if (isValidElement<{ children?: ReactNode }>(child) && child.props.children != null) {
      return cloneElement(child, {}, maskWords(child.props.children));
    }
    return child;
  });
}

/** Server-readable words; only the mounted entrance owns their transforms. */
export function MaskedHeading({ children, className = "h2", ...props }: HTMLAttributes<HTMLHeadingElement>) {
  const heading = useRef<HTMLHeadingElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const words = heading.current?.querySelectorAll<HTMLElement>("[data-masked-word]");
    if (!words?.length) return;
    return createViewportMotion(heading.current, {
      prepare: () => { utils.set(words, { translateY: "0.9em" }); },
      play: () => {
        animate(words, {
          translateY: "0em",
          duration: 650,
          delay: stagger(Math.min(45, 550 / Math.max(1, words.length - 1))),
          ease: "outCubic",
        });
      },
    });
  }, [pathname]);

  return (
    <h2 {...props} ref={heading} className={`${className} ${styles.heading}`}>
      {maskWords(children)}
    </h2>
  );
}
