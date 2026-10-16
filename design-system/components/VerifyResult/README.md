# VerifyResult

The outcome panel of a certificate lookup, with four states: valid, expired, not found and unavailable.

Provide `status` from the verification API response and a `record` holding only the fields UV Gulf has approved for public display. Every state shows a word and an icon as well as colour, so it reads without colour vision. Never show internal error codes; the `unavailable` message points to sales@uvgulf.com.
