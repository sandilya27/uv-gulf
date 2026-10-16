"use client";

// Course list with category filter; cards stagger back in after each filter change.
import { useRef, useState } from "react";
import { CourseCard } from "@/components/ds";
import { COURSES, enquiryHref, type CourseCategory } from "@/lib/content";

const FILTERS: ("All" | CourseCategory)[] = ["All", "Lifting", "Scaffolding", "Safety"];

export function CourseGrid() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const grid = useRef<HTMLDivElement>(null);
  const shown = COURSES.filter((c) => filter === "All" || c.cat === filter);

  const choose = (f: (typeof FILTERS)[number]) => {
    setFilter(f);
    requestAnimationFrame(() => {
      if (!grid.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      Array.from(grid.current.children).forEach((c, i) => c.animate(
        [{ opacity: 0, transform: "translateY(14px)" }, { opacity: 1, transform: "none" }],
        { duration: 450, delay: i * 70, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" }));
    });
  };

  return (
    <section className="section">
      <div className="wrap">
        <div data-reveal="1" className="section-head" style={{ marginBottom: "var(--space-8)" }}>
          <div className="courses-title">
            <h2 className="h2">Courses</h2>
            <span className="courses-count">{String(shown.length).padStart(2, "0") + (shown.length === 1 ? " course" : " courses")}</span>
          </div>
          <div className="segmented" role="group" aria-label="Filter courses">
            {FILTERS.map((f) => (
              <button key={f} type="button" className={f === filter ? "is-active" : undefined} aria-pressed={f === filter} onClick={() => choose(f)}>{f}</button>
            ))}
          </div>
        </div>
        <div ref={grid} className="course-grid">
          {shown.map((c) => (
            <div key={c.title} className="grid-cell">
              <CourseCard title={c.title} body={c.body} summary={c.summary} audience={c.audience} duration={c.duration} format={c.format} href={enquiryHref("Training")} cta="Enquire about this course" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
