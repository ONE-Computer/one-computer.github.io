# External approvals

Approvals are deliberately outside the ONEComputer web UI. This reduces the risk that a compromised or spoofed portal can manufacture its own authorization.

## End-to-end sequence

1. A user or agent attempts a consequential action.
2. The gateway classifies the action and creates a durable hold.
3. ONEComputer records the exact request, digest, policy snapshot, and trace ID.
4. OpenVTC delivers a Trust Task to the manager's wallet.
5. The manager reviews the request in the wallet or an approved VTI client.
6. The wallet signs an approval or denial response.
7. ONEComputer verifies signer identity, signature, expiry, digest, and replay state.
8. The gateway releases once or keeps the action blocked.

## Push notifications

A push notification should wake the manager and point to the wallet. It should not contain enough sensitive content to become an approval channel by itself. The wallet retrieves or resolves the Trust Task through the trusted transport and presents the canonical request for decision.

## Security invariants

- The portal cannot approve an action by changing its own UI state.
- A response for a different action cannot be substituted.
- An expired response cannot be accepted.
- A valid response cannot be replayed for a second release.
- The private signing key remains outside ONEComputer.
- Denial and timeout are explicit, durable outcomes.

## Test cases

At minimum, test:

- valid signature and matching digest;
- invalid signature;
- wrong signer role;
- digest mismatch;
- expired Trust Task;
- duplicate response;
- release retry after a process restart;
- wallet unavailable while a hold remains durable.
