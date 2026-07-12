# Evidence and audit

Evidence connects what the user saw to what the runtime enforced and what the trust plane verified.

## Minimum evidence chain

```text
request
  -> policy decision
  -> held action + digest
  -> Trust Task delivery
  -> wallet response
  -> verifier result
  -> release / denial
```

Each event should have a stable trace ID and enough metadata to answer:

- who initiated the action;
- which sandbox and agent were involved;
- which policy snapshot applied;
- what exact action was held;
- which Trust Task and wallet response corresponded;
- when the decision expired or was released;
- whether the action was released exactly once.

## Evidence should be append-only

Do not rewrite history to make a demo look cleaner. If an event is corrected, append a correction or superseding event and preserve the original. Exported evidence packs should include the release commit, environment, policy version, and verification outcome.

## What evidence is not

A screenshot, green UI badge, or manually edited audit row is not cryptographic proof. Screenshots are useful product evidence; signed responses and verifier logs are security evidence.
