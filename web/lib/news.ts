/** Published educational articles; unpublished editorial notes belong in page-plans. */
export type NewsArticle = {
  slug: string;
  title: string;
  category: "News" | "Insight";
  summary: string;
  /** ISO calendar date: YYYY-MM-DD. */
  publishedAt: string;
  body: readonly { heading: string; paragraphs: readonly string[] }[];
  author?: string;
  image?: { src: string; alt: string; caption?: string };
};

export const NEWS_ARTICLES: readonly NewsArticle[] = [
  {
    slug: "preparing-an-inspection-enquiry",
    title: "What to prepare before an inspection enquiry",
    category: "Insight",
    publishedAt: "2026-10-17",
    summary: "A clear equipment list, available records and site context give an inspection discussion a useful starting point.",
    body: [
      { heading: "Identify the equipment and the question", paragraphs: ["Start with the equipment name, identification number, location and intended use. Explain why an inspection is being considered: a fabrication stage, a maintenance activity, a change in condition or a project requirement. A precise question helps the team discuss an appropriate scope.", "If several assets are involved, prepare a register that connects each item to its drawings and records. Highlight equipment with missing identification or incomplete history so these gaps can be discussed before attendance."] },
      { heading: "Bring the available records", paragraphs: ["Useful documents may include drawings, specifications, previous reports and records of repairs or alterations. Share the project requirements and any proposed acceptance criteria. The inspection scope and reporting basis need to be agreed for the assignment; an enquiry alone does not establish compliance.", "Describe any observed damage or areas of concern and provide clear photographs where permitted. Images can support planning, but they do not replace an examination or a review of the relevant records."] },
      { heading: "Explain the site arrangements", paragraphs: ["Include the site location, preferred timing, access restrictions and whether the equipment will be operating or isolated. Identify the site contact responsible for permits, safe access and coordination with other work.", "Before scheduling, confirm the agreed scope, responsibilities, preparation and expected report. Keeping these points together helps both teams identify unanswered questions while there is still time to resolve them."] },
    ],
  },
  {
    slug: "preparing-a-calibration-enquiry",
    title: "A practical starting point for calibration enquiries",
    category: "Insight",
    publishedAt: "2026-10-17",
    summary: "Record instrument identification, working ranges and intended use before discussing calibration requirements.",
    body: [
      { heading: "Build an instrument list", paragraphs: ["Record each instrument's type, manufacturer, model and serial number, together with its location and measurement range. Include the units used and any accessories or connections that affect how the instrument is handled.", "Group similar instruments where useful, but keep their individual identification. A shared description is helpful for planning; the resulting records still need to be traceable to the correct item."] },
      { heading: "Describe how the measurement is used", paragraphs: ["Explain the normal working range and the process or task that depends on the reading. Share required tolerances, proposed measurement points and relevant project specifications for review. The full scale printed on an instrument may not describe the range that matters in daily use.", "Provide previous calibration records where available and mention unstable readings, damage or recent repair. Agree what is required if an instrument needs adjustment or further work; calibration and repair should not be assumed to be the same service."] },
      { heading: "Agree arrangements and records", paragraphs: ["Discuss whether the proposed work can be performed at the site or requires another location. Confirm availability, safe removal where applicable, connections, preparation and the records expected for the agreed scope.", "Any requirements for traceability, uncertainty or an accredited scope should be stated explicitly and confirmed before work is booked. Do not infer those attributes from a general service description. Keep the completed records with the instrument history for future review."] },
    ],
  },
  {
    slug: "planning-an-industrial-training-enquiry",
    title: "Planning an industrial training enquiry around the work",
    category: "Insight",
    publishedAt: "2026-10-17",
    summary: "Define job tasks, participant experience and site requirements to make a training discussion more focused.",
    body: [
      { heading: "Start with the tasks people perform", paragraphs: ["Describe the work participants carry out and the equipment or work environment involved. For rigging, scaffolding or occupational health and safety enquiries, the job context helps frame a discussion about relevant learning needs.", "Separate an introduction to a topic from refresher needs or a specific project requirement. Share any employer or client requirements so the proposed course can be reviewed against them before enrolment."] },
      { heading: "Describe the participant group", paragraphs: ["Include the anticipated group size, job roles, previous training and practical experience. Explain language and accessibility needs early so suitable delivery arrangements can be discussed.", "Ask for confirmation of prerequisites, course scope, duration, delivery format and any practical activities. These details should come from the confirmed course information rather than assumptions based on the course name."] },
      { heading: "Confirm assessment and documentation", paragraphs: ["Before booking, clarify how learning will be assessed, what completion documentation is issued and who issues it. If a qualification, awarding body or validity period is required, obtain confirmation for the exact course being considered.", "Discuss how the employer will follow up learning in the workplace. Training can support learning, while site authorization and decisions about competence require the responsible organization's own processes and the requirements of the task."] },
    ],
  },
];

export function getNewsArticles(): NewsArticle[] {
  return [...NEWS_ARTICLES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return NEWS_ARTICLES.find((article) => article.slug === slug);
}

export function articleHref(article: NewsArticle): `/news-insights/${string}` {
  return `/news-insights/${article.slug}`;
}

export function formatArticleDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}
