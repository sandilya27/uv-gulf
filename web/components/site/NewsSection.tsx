import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ds";
import styles from "./NewsSection.module.css";

export function NewsSection({ id, eyebrow, title, intro, children }: { id: string; eyebrow: string; title: string; intro?: string; children: ReactNode }) {
  return <section className="section" aria-labelledby={id}>
    <div className="wrap">
      <div className={styles.heading}>
        <div><Eyebrow>{eyebrow}</Eyebrow><h2 id={id} className="h2">{title}</h2></div>
        {intro ? <p>{intro}</p> : null}
      </div>
      {children}
    </div>
  </section>;
}
