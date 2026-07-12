# Policy model

Policy is the company-controlled floor for AI work. It decides whether an action is allowed, denied, or held for a separate decision.

## Recommended decision order

```text
Company default
  -> organization rule
  -> role / user scope
  -> sandbox or connector scope
  -> action-specific hold
```

Stricter scopes may narrow permissions. A child scope must not silently weaken the company default.

## Policy outcomes

| Outcome | Meaning | Required evidence |
| --- | --- | --- |
| Allow | The request can proceed under the current policy snapshot | policy version, subject, action, trace ID |
| Deny | The request is blocked without an approval path | policy version, reason, trace ID |
| Hold | The request pauses until an external decision is verified | held-action digest, Trust Task ID, expiry |

## Policy design rules

- Default to explicit, reviewable behavior.
- Make the policy snapshot immutable for a held action.
- Keep secrets out of logs and Trust Task content unless the protocol explicitly protects them.
- Prefer stable action categories and digests over UI labels.
- Record policy changes as auditable events.
- Fail closed when the enforcement boundary is unavailable for a high-risk action.

## Current implementation note

The policy screen and gateway paths are real product surfaces, but the security guarantee depends on the runtime path being wired to enforcement. A policy artifact or simulator is not sufficient proof by itself; pair it with a negative test that demonstrates the request is actually blocked.
