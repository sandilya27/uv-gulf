import type { Metadata } from "next";
import { ServiceDetail, ServiceDetailSection } from "@/components/inspection/ServiceDetail";

export const metadata: Metadata = {
  title: "Calibration",
  description: "Discuss pressure, temperature, flow, gas detection, dimensional and electrical calibration with UV Gulf, including site requirements, traceability and certificate details.",
};

export default function CalibrationPage() {
  return <ServiceDetail title="Calibration" lead="Plan instrument calibration around the measurement, operating conditions and records your application requires.">
    <ServiceDetailSection id="scope" eyebrow="Instrument scope" title="Start with what you need to measure.">
      <p>Share your instrument list so suitability, measurement points and the required calibration scope can be reviewed before work is agreed.</p>
      <article><h3>Pressure and temperature</h3><p>Enquiries may cover pressure gauges, transmitters, temperature sensors and indicators. Identify the measuring range, units and whether the sensor, display or complete measurement loop needs assessment.</p></article>
      <article><h3>Flow and gas detection</h3><p>For flow meters, provide the meter type, process medium and installation details. For gas detectors, identify the target gases, sensor configuration and required checks; a response or bump check is distinct from calibration.</p></article>
      <article><h3>Dimensional and electrical</h3><p>Identify dimensional measuring tools and the dimensions to be checked, or electrical instruments and their measurement functions. Required points, resolution and tolerances help define the assignment.</p></article>
      <p>Instrument types, ranges, tolerances and available delivery arrangements are confirmed during scope review.</p>
    </ServiceDetailSection>
    <ServiceDetailSection id="valves" eyebrow="Pressure relief valves" title="Define valve work as a separate scope.">
      <p>Pressure relief valve testing, set-pressure checks, adjustment and overhaul concern the valve’s protective function. They are separate from calibrating a pressure gauge or other measuring instrument.</p>
      <p>For valve enquiries, supply identification, service medium, set pressure, valve data and maintenance history. Agree the test procedure, acceptance criteria, repair responsibilities and required test records separately; a calibration certificate for test equipment does not certify the valve’s performance.</p>
    </ServiceDetailSection>
    <ServiceDetailSection id="applications" eyebrow="Applications" title="Match the work to the instrument’s role.">
      <p>Calibration enquiries may arise during commissioning, planned maintenance, shutdowns or investigation of an unexpected reading. Explain whether the instrument supports process monitoring, quality checks or a safety-related function.</p>
      <p>Calibration establishes the relationship between an instrument’s indication and a reference under specified conditions. Adjustment, repair and a decision on suitability for service are separate activities whose responsibilities and criteria should be agreed.</p>
    </ServiceDetailSection>
    <ServiceDetailSection id="delivery" eyebrow="Onshore & offshore" title="Agree the location and preparation.">
      <p>Discuss onshore or offshore requirements during enquiry. The instrument, reference equipment, environmental conditions and safe access determine whether work can be scoped at site or requires removal to a suitable facility.</p>
      <ul>
        <li>Provide the site location, instrument quantities, access window and permit or mobilisation requirements.</li>
        <li>Confirm isolation, depressurisation, decontamination and electrical disconnection responsibilities where relevant.</li>
        <li>Identify process connections, power supplies, environmental restrictions and any hazardous-area requirements.</li>
        <li>Agree removal, transport, reinstatement and functional checks, including who is responsible for each activity.</li>
      </ul>
    </ServiceDetailSection>
    <ServiceDetailSection id="records" eyebrow="Traceability & certificates" title="Specify the records you need.">
      <p>Agree the required measurement traceability and supporting evidence before work begins, including the reference standards and their calibration status. Any requested accreditation and its applicable scope must be confirmed for the assignment.</p>
      <p>Specify certificate contents during review: instrument identity, calibration date, method, measurement points, units, reference values, observed readings, results, relevant environmental conditions and measurement uncertainty. Request as-found and as-left results if adjustment is included.</p>
      <p>If a statement of conformity is needed, supply the tolerance or specification and agree the decision rule. Calibration results alone do not establish that an instrument meets every requirement of its application.</p>
    </ServiceDetailSection>
    <ServiceDetailSection id="enquiry-details" eyebrow="Prepare your enquiry" title="Send the details that define the job.">
      <ul>
        <li>Instrument tag, manufacturer, model, serial number and quantity.</li>
        <li>Measurement function, range, units, resolution and requested calibration points.</li>
        <li>Required tolerance, specification, certificate format and traceability requirements.</li>
        <li>Previous certificates, service history and any suspected damage or reading issues.</li>
        <li>Site or delivery location, requested dates and whether adjustment or repair should be considered.</li>
      </ul>
      <p>Include data sheets or photographs of nameplates where available so the scope and delivery requirements can be confirmed.</p>
    </ServiceDetailSection>
  </ServiceDetail>;
}
