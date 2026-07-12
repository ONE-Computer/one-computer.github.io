# Control plane and gateway

The ONEComputer control plane coordinates the workflow. The Rust gateway enforces the runtime boundary on the path where policy matters.

## Responsibility split

| Component | Owns | Does not own |
| --- | --- | --- |
| Web/API | users, organizations, policy configuration, sandbox lifecycle, business state, evidence views | private approval keys |
| Rust gateway | traffic policy, credential brokering, action holds, release verification hooks | organization identity root |
| Sandbox | Claude Desktop, Claude Code, files, tools, process runtime | company-wide policy authority |
| PostgreSQL | durable application state and audit records | cryptographic wallet custody |
| OpenVTC/VTI | verified identity, Trust Tasks, wallet custody, signed approval | ONEComputer business UI |

## Held-action lifecycle

```text
Agent action
  -> gateway classifies request
  -> policy says allow / deny / hold
  -> hold receives a stable request ID and trace ID
  -> Trust Task contains the exact action digest
  -> external wallet signs or denies
  -> verifier checks identity, signature, expiry, digest, and replay state
  -> gateway releases once or keeps the action blocked
```

The action digest is important: a manager must approve the request that was held, not a later or visually similar request.

## Failure behavior

- **No policy match:** use the configured company default; make the default visible.
- **Gateway unavailable:** fail closed for actions that require enforcement.
- **Trust Task delivery unavailable:** keep the hold durable and retry delivery; do not auto-release.
- **Wallet response expired:** reject it and require a new request.
- **Digest mismatch:** reject it as a security failure and preserve evidence.
- **Duplicate response:** accept at most one release transition.

## Current implementation boundary

The repository includes working development and compatibility paths, but not every path is production-complete. Treat a UI control, fixture, or simulator as evidence of shape—not proof of an end-to-end security guarantee—until it has a corresponding runtime test and an independently verifiable artifact.
