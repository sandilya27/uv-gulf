import { Button, Eyebrow } from "@/components/ds";
import { PUBLISHED_TEAM } from "@/lib/team";
import styles from "./TeamSection.module.css";

export function TeamSection({ variant = "full" }: { variant?: "compact" | "full" }) {
  if (!PUBLISHED_TEAM.length) return null;
  const members = variant === "compact" ? PUBLISHED_TEAM.slice(0, 3) : PUBLISHED_TEAM;
  return <section id="team" className="section anchor" aria-labelledby="team-title">
    <div className="wrap stack-24">
      <Eyebrow>Our team</Eyebrow>
      <h2 id="team-title" className="h2">The people behind UV Gulf.</h2>
      <div className={styles.grid}>
        {members.map((member) => <article key={member.id} className={styles.profile}>
          <img className={styles.portrait} src={member.portrait.src} alt={member.portrait.alt} loading="lazy" decoding="async" />
          <div className="stack-12">
            <h3>{member.name}</h3>
            <p className={styles.role}>{member.role}</p>
            {variant === "full" ? <p>{member.bio}</p> : null}
          </div>
        </article>)}
      </div>
      {variant === "compact" ? <div><Button variant="ghost" arrow href="/about#team">Meet the UV Gulf team</Button></div> : null}
    </div>
  </section>;
}
