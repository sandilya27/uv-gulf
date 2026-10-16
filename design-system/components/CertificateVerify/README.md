# CertificateVerify

The certificate verification form: one certificate-number field, a Verify button and the result panel below.

Provide `onVerify(number)` to call the server-side verification endpoint, then pass back `status` and `record`. Normalise the input (trim, uppercase) before sending. The certificate number format shown (`UVG-TR-2026-000000`) is a placeholder until the real format is confirmed with the verification API. Use it on /verify and as a compact block on the Training landing page.
