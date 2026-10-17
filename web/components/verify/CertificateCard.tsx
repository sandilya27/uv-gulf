import { Icon, VERIFY_STATUS, type CertificateRecord, type VerifyStatus } from "@/components/ds";

export function CertificateCard({ record, status }: { record: CertificateRecord; status: VerifyStatus }) {
  const outcome = VERIFY_STATUS[status];
  const inspection = record.type === "inspection";
  const training = record.type === "training";
  const title = inspection ? "Certificate of inspection" : training ? "Certificate of training" : "Certificate record";
  return (
    <article className={`certificate-card certificate-card--${status}`} aria-label="UV Gulf certificate record">
      <header className="certificate-header">
        <img src="/assets/uvgulf-logo.png" alt="UV Gulf Inspection & Training" width="160" />
        <span className="certificate-edition">Digital certificate record<br />United Vetting Gulf Co. Ltd.</span>
      </header>
      <div className="certificate-body">
        <img className="certificate-watermark" src="/assets/uvgulf-mark-reversed.png" alt="" aria-hidden="true" />
        <span className="certificate-kicker">UV GULF · {inspection ? "INSPECTION" : training ? "TRAINING" : "VERIFICATION"}</span>
        <h2>{title}</h2>
        <p className="certificate-intro">{inspection ? "Inspected asset / equipment" : "This certificate is issued to"}</p>
        <p className="certificate-holder">{(inspection ? record.asset : record.holder) || "See original certificate"}</p>
        {inspection && record.client ? <p className="certificate-client">Client: {record.client}</p> : null}
        <div className="certificate-rule" />
        <p className="certificate-intro">{inspection ? "Inspection scope" : training ? "Training course" : "Course / scope"}</p>
        <p className="certificate-course">{(inspection ? record.scope : record.course || record.scope) || "See original certificate"}</p>
        <dl className="certificate-dates">
          <div><dt>Issue date</dt><dd>{record.issued || "—"}</dd></div>
          {record.expires ? <div><dt>Expiry date</dt><dd>{record.expires}</dd></div> : null}
        </dl>
        <div className="certificate-seal" aria-hidden="true"><Icon name="shield" size={32} /><span>UV GULF</span><small>ISSUER RECORD</small></div>
      </div>
      <footer className="certificate-footer">
        <div><span className="certificate-label">Certificate number</span><strong className="certificate-number">{record.number}</strong></div>
        <span className="certificate-status"><Icon name={outcome.icon} size={18} />{outcome.title}</span>
      </footer>
      <p className="certificate-note" role="status">{outcome.msg}</p>
    </article>
  );
}
