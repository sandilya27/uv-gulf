import { Button, Eyebrow } from "@/components/ds";
import { PUBLISHED_TEAM, TEAM_PREVIEW } from "@/lib/team";
import ProfileCard from "./profile-card/ProfileCard";
import styles from "./TeamSection.module.css";

export function TeamSection({ variant = "full" }: { variant?: "compact" | "full" }) {
  const isPreview = !PUBLISHED_TEAM.length;
  const profiles = isPreview ? TEAM_PREVIEW : PUBLISHED_TEAM;
  const members = variant === "compact" ? profiles.slice(0, 3) : profiles;
  return <section id="team" className="section anchor" aria-labelledby="team-title">
    <div className="wrap stack-24">
      <Eyebrow>Our team</Eyebrow>
      <h2 id="team-title" className="h2">The people behind UV Gulf.</h2>
      {isPreview ? <p className={styles.notice}>Sample profiles — fictional names, bios and AI-generated portraits for layout review.</p> : null}
      <div className={styles.grid}>
        {members.map((member) => <article key={member.name} className={styles.profile}>
          <ProfileCard avatarUrl={member.portrait.src} avatarAlt={member.portrait.alt} name={member.name} title={member.role}
            iconUrl="/assets/uvgulf-mark-reversed.png" theme="dark" backdropColor="#092638" radius={18} holo={0.3} glare={0.18}
            tiltStrength={6} parallax={3} intro={false} enableMobileTilt={false} showUserInfo={false} />
          {variant === "full" ? <p className={styles.bio}>{member.bio}</p> : null}
        </article>)}
      </div>
      {variant === "compact" ? <div><Button variant="ghost" arrow href="/about#team">Meet the UV Gulf team</Button></div> : null}
    </div>
  </section>;
}
