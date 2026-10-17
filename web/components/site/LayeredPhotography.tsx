"use client";

import { animate, stagger, utils } from "animejs";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { createViewportMotion } from "@/lib/viewport-motion";
import styles from "./LayeredPhotography.module.css";

type Photo = { src: string; alt: string };

/** Reserved, server-visible image slots; this component owns only their entrance. */
export function LayeredPhotography({ photos }: { photos: readonly [Photo, Photo] }) {
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const layers = root.current?.querySelectorAll<HTMLElement>("[data-photo-layer]");
    if (!layers?.length) return;
    return createViewportMotion(root.current, {
      prepare: () => { utils.set(layers, { opacity: 0, translateY: 24 }); },
      play: () => {
        animate(layers, {
          opacity: 1, translateY: 0, duration: 700,
          delay: stagger(100), ease: "outCubic",
        });
      },
    });
  }, [pathname]);

  return <div ref={root} className={styles.composition}>
    {photos.map((photo) => <div key={photo.src} data-photo-layer className={styles.layer}>
      <img src={photo.src} alt={photo.alt} width={1600} height={900} loading="lazy" decoding="async" />
    </div>)}
  </div>;
}
