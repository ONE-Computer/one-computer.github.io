# OpenVTC trust boundary

ONEComputer is intentionally a thin layer over OpenVTC. It owns the enterprise workflow and the runtime edge; OpenVTC owns the proof that a person or wallet authorized an action.

## Why this boundary exists

An agent is not only a model. It is a model connected to an environment, tools, data, and permissions. Model-level safeguards remain important, but they cannot by themselves determine what a deployed agent can reach or prove that a human authorized a particular real-world action.

ONEComputer therefore combines three layers:

1. **Contained runtime** — isolate the agent, its files, credentials, tools, and network reach.
2. **Explicit policy** — inherit a company floor, add stricter team policy, and attach the resulting policy to each workspace.
3. **Verifiable authority** — use OpenVTC/VTI to bind a human decision to the exact held action and return independently verifiable evidence.

The application requesting authority must not be able to manufacture that authority for itself.

## Vocabulary

- **OpenVTC** is the open ecosystem for first-person identity, verifiable trust relationships, and Verifiable Trust Communities.
- **VTI** is the Verifiable Trust Infrastructure that provides identity, secure transport, Trust Tasks, verification, and related services.
- **VTA wallet** is the holder-side agent that keeps private signing material outside ONEComputer and signs approval or denial responses.
- **Trust Task** identifies the exact operation and protocol contract being requested. For ONEComputer approvals, the task is also bound to the held action digest, policy context, intended signer, and expiry.

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

## Enterprise journey

1. An enterprise administrator provisions the organization and sets the minimum security policy.
2. A manager adds a stricter team policy for repositories, data, connectors, and higher-risk operations.
3. An employee launches an isolated sandbox with the effective inherited policy already attached.
4. Claude, OpenClaw, Codex, or another approved agent performs routine work inside that boundary.
5. The gateway freezes a consequential request and stores its canonical payload, digest, policy snapshot, trace ID, expiry, and required signer role.
6. VTI transports the Trust Task to the manager's external wallet.
7. The manager approves or denies the canonical request; the wallet signs the response with a key that does not live in ONEComputer.
8. ONEComputer verifies identity, signature, task, digest, expiry, and replay state, then releases once or keeps the request blocked.

## Enterprise integration seams

Planned integrations such as Microsoft Purview DLP, Microsoft Intune device compliance, EDR/network controls, and SIEM/OpenTelemetry should provide policy or posture signals through explicit adapters. These systems do not replace OpenVTC as the authority for verifiable identity and signed human decisions.

::: warning Compatibility harnesses are not production trust
Until a real VTA wallet, delivery path, and verifier are connected in the target environment, label local adapters and seeded approvals as compatibility or test infrastructure. Do not present them as equivalent to a live OpenVTC approval.
:::
