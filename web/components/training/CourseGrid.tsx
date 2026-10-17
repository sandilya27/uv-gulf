"use client";

import { MaskedHeading } from "@/components/site/MaskedHeading";

import { CardEntrances } from "@/components/site/CardEntrances";
import { useState } from "react";
import { CourseCard } from "@/components/ds";
import { COURSES, enquiryHref, type CourseCategory } from "@/lib/content";

const FILTERS: ("All" | CourseCategory)[] = ["All", "Lifting", "Scaffolding", "Safety"];

export function CourseGrid() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const shown = COURSES.filter((c) => filter === "All" || c.cat === filter);


  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head" style={{ marginBottom: "var(--space-8)" }}>
          <div className="courses-title">
            <MaskedHeading className="h2">Courses</MaskedHeading>
            <span className="courses-count">{String(shown.length).padStart(2, "0") + (shown.length === 1 ? " course" : " courses")}</span>
          </div>
          <div data-reveal="1" className="segmented" role="group" aria-label="Filter courses">
            {FILTERS.map((f) => (
              <button key={f} type="button" className={f === filter ? "is-active" : undefined} aria-pressed={f === filter} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
        </div>
        <CardEntrances className="course-grid">
          {shown.map((c) => (
            <div key={c.slug} className="grid-cell">
              <CourseCard title={c.title} body={c.body} summary={c.summary} audience={c.audience} duration={c.duration} format={c.format} href={c.href ?? enquiryHref("Training")} cta={c.href ? `Explore ${c.title}` : "Enquire about this course"} />
            </div>
          ))}
        </CardEntrances>
      </div>
    </section>
  );
}
