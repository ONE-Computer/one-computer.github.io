# OpenVTC trust boundary

ONEComputer is intentionally a thin layer over OpenVTC. It owns the enterprise workflow and the runtime edge; OpenVTC owns the proof that a person or wallet authorized an action.

## What belongs in ONEComputer

- admin and user experience;
- organization policy and role projection;
- sandbox provisioning and session state;
- gateway enforcement and durable holds;
- business-level audit views and exports;
- release orchestration after proof verification.

## What belongs in OpenVTC/VTI

- verifiable identity and claims;
- VMC/M-DID/VTC role assertions;
- Trust Task schemas and delivery;
- DIDComm/TSP transport;
- wallet key custody;
- signed approval and denial responses;
- revocation, expiry, and replay protection.

## Approval rule

The ONEComputer web UI may show:

- what action is held;
- why policy held it;
- who is expected to decide;
- whether a signed response has arrived;
- whether verification succeeded.

It must not create the authoritative approval itself. A browser control that says “approve” is only a request to the external trust plane; the release decision is valid only after OpenVTC verification.

## Integration sequence

1. Define the canonical held-action envelope and digest.
2. Map the manager identity to verified OpenVTC claims.
3. Deliver the Trust Task through the agreed TSP-first / DIDComm fallback path.
4. Wake the wallet without putting sensitive approval content in a push notification.
5. Verify the signed response against the exact held-action digest.
6. Make release idempotent and record the evidence chain.

::: warning Compatibility harnesses are not production trust
Until a real VTA wallet, delivery path, and verifier are connected in the target environment, label local adapters and seeded approvals as compatibility or test infrastructure. Do not present them as equivalent to a live OpenVTC approval.
:::
