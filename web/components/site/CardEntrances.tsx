"use client";

import { animate, utils } from "animejs";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { createViewportMotion } from "@/lib/viewport-motion";

/** Direct children own entrances; nested cards retain their hover transforms. */
export function CardEntrances({ children, className, as: Tag = "div" }: {
  children: ReactNode;
  className?: string;
  as?: "div" | "dl";
}) {
  const root = useRef<HTMLDivElement & HTMLDListElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const group = root.current;
    if (!group) return;
    const owners = new Map<HTMLElement, () => void>();
    const sync = () => {
      for (const [card, dispose] of owners) {
        if (card.parentElement !== group) { dispose(); owners.delete(card); }
      }
      Array.from(group.children).forEach((child) => {
        if (!(child instanceof HTMLElement) || owners.has(child)) return;
        const dispose = createViewportMotion(child, {
          prepare: () => {
            // Never conceal a link that already has keyboard focus during setup.
            if (!child.contains(document.activeElement)) utils.set(child, { opacity: 0, translateY: 20 });
          },
          play: () => {
            const top = child.offsetTop;
            // Stagger within the current visual row, independently of lower rows.
            const preceding = Array.from(group.children).filter((peer) => {
              return peer instanceof HTMLElement && Math.abs(peer.offsetTop - top) < 4 && peer.offsetLeft < child.offsetLeft;
            }).length;
            animate(child, { opacity: 1, translateY: 0, duration: 600,
              delay: Math.min(preceding * 80, 400), ease: "outCubic" });
          },
        });
        owners.set(child, dispose);
        if (child.contains(document.activeElement)) dispose();
      });
    };
    const onFocus = (event: FocusEvent) => {
      for (const [card, dispose] of owners) {
        if (event.target instanceof Node && card.contains(event.target)) dispose();
      }
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(group, { childList: true });
    group.addEventListener("focusin", onFocus);
    return () => {
      observer.disconnect();
      group.removeEventListener("focusin", onFocus);
      owners.forEach((dispose) => dispose());
    };
  }, [pathname]);

  return <Tag ref={root} className={className}>{children}</Tag>;
}
