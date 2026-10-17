"use client";

import { animate, stagger, utils } from "animejs";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef } from "react";
import { createViewportMotion } from "@/lib/viewport-motion";
import styles from "./MaskedHeading.module.css";

/** Server-readable words; only the mounted entrance owns their transforms. */
export function MaskedHeading({ children }: { children: string }) {
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
  }, [pathname, children]);

  return (
    <h2 ref={heading} className={`h2 ${styles.heading}`}>
      {children.split(/(\s+)/).map((part, index) => /^\s+$/.test(part) ? (
        <Fragment key={index}>{part}</Fragment>
      ) : (
        <span key={index} className={styles.mask}><span data-masked-word className={styles.word}>{part}</span></span>
      ))}
    </h2>
  );
}
