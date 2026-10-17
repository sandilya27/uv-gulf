import { MaskedHeading } from "@/components/site/MaskedHeading";
import { Eyebrow } from "@/components/ds";
import styles from "./CourseFacts.module.css";

export function CourseFacts({ facts }: { facts: { label: string; value: string }[] }) {
  return <section className={styles.band} aria-labelledby="course-facts">
    <div className="wrap">
      <Eyebrow>At a glance</Eyebrow>
      <MaskedHeading id="course-facts" className={styles.title}>Plan your training.</MaskedHeading>
      <p className={styles.note}>Draft for client review — all course details below are illustrative and require client approval before booking.</p>
      <dl className={styles.facts}>{facts.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    </div>
  </section>;
}
