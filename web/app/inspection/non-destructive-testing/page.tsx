import type { Metadata } from "next";
import { ServiceDetail, ServiceDetailSection } from "@/components/inspection/ServiceDetail";
import { METHODS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Non-Destructive Testing",
  description: "Explore NDT methods for welds, pipework and vessels. Discuss method selection, site preparation, acceptance criteria and reporting with UV Gulf.",
};

const limitations: Record<string, string> = {
  VT: "Requires adequate lighting and a clear view of the examination area; hidden internal defects need other methods.",
  UT: "Suitability depends on material, geometry, surface condition and sound access. Coupling and reference calibration must be planned.",
  RT: "Requires radiation controls and an exclusion area. Access, material thickness and defect orientation affect suitability and detection.",
  ET: "Applies to electrically conductive materials. Geometry, conductivity and probe access influence results and examination depth.",
  MT: "Applies only to ferromagnetic materials. Surface preparation, magnetisation direction and any demagnetisation requirements must be considered.",
  PT: "Reveals only defects open to the surface. The surface must be clean and non-porous; coatings, contamination and temperature can restrict use.",
  AE: "Requires a controlled loading or operating condition and assessment of background noise. Indications may need follow-up with another method to locate and characterise a defect.",
  LT: "The technique depends on the required sensitivity, test medium and system boundaries. Isolation, pressure conditions and safe access must be agreed; leak sizing is technique-dependent.",
};

export default function NonDestructiveTestingPage() {
  return <ServiceDetail title="Non-Destructive Testing" lead="Examine materials and components without destructive sampling, with the method and examination scope agreed for each asset.">
    <ServiceDetailSection id="scope" eyebrow="Scope & applications" title="Understand the asset before selecting the test.">
      <p>NDT enquiries may cover weld examination, pipework condition and vessel components during fabrication, maintenance or condition assessment. Share the material, geometry, service history and suspected defect so the examination can be scoped.</p>
      <article><h3>Welds</h3><p>Identify the joint type, thickness, weld preparation and accessible surfaces. The likely defect type and orientation help determine which methods, or combination of methods, are appropriate.</p></article>
      <article><h3>Pipework and vessels</h3><p>Provide drawings, inspection history and areas of concern, such as corrosion or leakage. Insulation, coatings, internal access and operating conditions affect the examination coverage.</p></article>
      <p>Non-destructive testing does not mean equipment can always remain in service. Shutdown, isolation, cleaning or removal of coatings may be needed. Method availability and suitability are confirmed during scope review.</p>
    </ServiceDetailSection>
    <ServiceDetailSection id="methods" eyebrow="Methods & limitations" title="Different methods answer different questions.">
      {METHODS.map(method => <article key={method.code}>
        <h3>{method.label} testing ({method.code})</h3>
        <p>{method.desc} {limitations[method.code]}</p>
      </article>)}
    </ServiceDetailSection>
    <ServiceDetailSection id="selection" eyebrow="Method selection" title="Match the method to the inspection objective.">
      <ol>
        <li><strong>Define the question.</strong> Specify whether the examination concerns surface cracking, internal discontinuities, remaining wall thickness or leakage.</li>
        <li><strong>Review the asset.</strong> Confirm material, thickness, geometry, surface condition, temperature and access to the test area.</li>
        <li><strong>Agree the technical basis.</strong> Supply the specification, requested code or standard and edition, examination extent and acceptance criteria.</li>
        <li><strong>Confirm the plan.</strong> Agree the method, procedure, coverage, safety arrangements and reporting before work begins. Complementary methods may be required.</li>
      </ol>
    </ServiceDetailSection>
    <ServiceDetailSection id="preparation" eyebrow="Site access & preparation" title="Prepare the area for a meaningful examination.">
      <ul>
        <li>Share asset identification, drawings, location, quantities and requested dates.</li>
        <li>Identify access restrictions, work at height, confined spaces and permit requirements.</li>
        <li>Agree cleaning, coating or insulation removal and any reinstatement responsibilities.</li>
        <li>Confirm operating temperature, pressure, isolation and shutdown requirements for the selected method.</li>
        <li>Arrange safe access and any radiation exclusion area or controlled loading needed for the examination.</li>
      </ul>
    </ServiceDetailSection>
    <ServiceDetailSection id="reporting" eyebrow="Reporting & acceptance" title="Findings with a defined technical basis.">
      <p>Agree the report format and supporting records before the assignment. Reporting may include asset and examination area identification, method and procedure, coverage, test conditions, recorded indications or measurements, and access or technique limitations.</p>
      <p>Assessment against acceptance criteria requires an agreed specification and applicable code or standard. A recorded indication does not by itself establish acceptance or fitness for continued service. Clarify evaluation responsibilities and any further examination required during scope review.</p>
    </ServiceDetailSection>
  </ServiceDetail>;
}
