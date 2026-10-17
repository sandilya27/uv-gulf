import { MaskedHeading } from "@/components/site/MaskedHeading";
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ds";
import styles from "./NewsSection.module.css";

export function NewsSection({ id, eyebrow, title, intro, action, children }: { id: string; eyebrow: string; title: string; intro?: string; action?: ReactNode; children: ReactNode }) {
  return <section className="section" aria-labelledby={id}>
    <div className="wrap">
      <div className={styles.heading}>
        <div><Eyebrow>{eyebrow}</Eyebrow><MaskedHeading id={id} className="h2">{title}</MaskedHeading></div>
        {intro ? <p>{intro}</p> : null}
        {action}
      </div>
      {children}
    </div>
  </section>;
}
