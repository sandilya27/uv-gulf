import { Button, Eyebrow } from "@/components/ds";
import { PUBLISHED_TEAM, TEAM_PREVIEW } from "@/lib/team";
import styles from "./TeamSection.module.css";

export function TeamSection({ variant = "full" }: { variant?: "compact" | "full" }) {
  const members = variant === "compact" ? PUBLISHED_TEAM.slice(0, 3) : PUBLISHED_TEAM;
  return <section id="team" className="section anchor" aria-labelledby="team-title">
    <div className="wrap stack-24">
      <Eyebrow>Our team</Eyebrow>
      <h2 id="team-title" className="h2">The people behind UV Gulf.</h2>
      {!members.length ? <>
        <p className={styles.notice}>Sample profiles — fictional names and bios for layout review.</p>
        <div className={styles.grid}>
          {TEAM_PREVIEW.map((item) => <article key={item.name} className={styles.profile}>
            <div className={styles.placeholder} role="img" aria-label={`Portrait placeholder for sample profile ${item.name}`}>
              <svg viewBox="0 0 160 180" fill="none" aria-hidden="true"><circle cx="80" cy="56" r="32" fill="currentColor" /><path d="M16 172v-20a64 64 0 0 1 128 0v20" fill="currentColor" /></svg>
              <span>Portrait placeholder</span>
            </div>
            <div className={`stack-12 ${styles.details}`}>
              <h3>{item.name}</h3>
              <p className={styles.role}>{item.role}</p>
              {variant === "full" ? <p>{item.bio}</p> : null}
            </div>
          </article>)}
        </div>
      </> : null}
      {members.length ? <div className={styles.grid}>
        {members.map((member) => <article key={member.id} className={styles.profile}>
          <img className={styles.portrait} src={member.portrait.src} alt={member.portrait.alt} loading="lazy" decoding="async" />
          <div className="stack-12">
            <h3>{member.name}</h3>
            <p className={styles.role}>{member.role}</p>
            {variant === "full" ? <p>{member.bio}</p> : null}
          </div>
        </article>)}
      </div> : null}
      {variant === "compact" ? <div><Button variant="ghost" arrow href="/about#team">Meet the UV Gulf team</Button></div> : null}
    </div>
  </section>;
}
