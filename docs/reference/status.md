# Current status

This page keeps the public docs honest. ONEComputer is under active integration work; the product direction is clear, but the complete production E2E is gated on the OpenVTC trust-plane path.

## Working product surfaces

- local OSS installer and rerunnable setup path;
- Next.js web/API workspace;
- Rust gateway foundation;
- PostgreSQL-backed policy, sandbox, and evidence state;
- browser-accessible Claude sandbox path;
- CISO console, policy, approval, and audit presentation surfaces;
- deployment and runner tooling versioned with the application.

## Open gates

- OpenVTC-native login as the production identity authority;
- role projection from verified VMC/M-DID/VTC claims;
- real TSP-first / DIDComm fallback delivery;
- real external VTA wallet signing the exact held action;
- independent verifier coverage for expiry, replay, digest mismatch, and signer role;
- cross-repository protocol conformance CI;
- production-ready release evidence for the full admin → user → sandbox → Claude → hold → wallet → release journey.

## How to read “done”

Do not mark a gate complete because a screen exists, a fixture passes, a local adapter returns success, or a manually seeded record appears in the UI. A gate is complete when the runtime behavior, security invariant, test, and evidence artifact agree.

## North star

> Enterprises can give every team a secure Claude workspace while keeping identity, policy, approval authority, and evidence explicit—and OpenVTC remains the independent trust layer underneath.
