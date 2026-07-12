# Current status

This page distinguishes what works today from what still needs to be integrated. The product direction is clear, but the complete production journey still depends on the full OpenVTC approval path.

## What works today

- local OSS installer and rerunnable setup path;
- Next.js web/API workspace;
- Rust gateway foundation;
- PostgreSQL-backed policy, sandbox, and evidence state;
- browser-accessible Claude sandbox path;
- CISO console, policy, approval, and audit presentation surfaces;
- deployment and runner tooling versioned with the application.

## What still needs to be completed

- OpenVTC-native login as the production identity authority;
- role projection from verified VMC/M-DID/VTC claims;
- real TSP-first / DIDComm fallback delivery;
- real external VTA wallet signing the exact held action;
- independent verifier coverage for expiry, replay, digest mismatch, and signer role;
- cross-repository protocol conformance CI;
- production-ready release evidence for the full admin → user → sandbox → Claude → hold → wallet → release journey.

## How to read “done”

Do not call an item complete because a screen exists or a local test returns success. It is complete only when the real system behaves as intended, the security rule is enforced, the test passes, and the resulting record agrees.

## North star

> Every employee can use the AI agent that fits their work in an isolated cloud computer, while company rules remain clear and important decisions stay with people through OpenVTC.
