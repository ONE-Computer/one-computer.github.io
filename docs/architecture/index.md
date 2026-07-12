# System overview

ONEComputer is the business application and enforcement edge for governed AI work. It provisions or connects users to a computer, applies company policy, and coordinates holds, evidence, and release. OpenVTC is the trust plane that proves identity and owns external approval authority.

```text
Browser
  |
  v
Azure Nginx / local dev server
  |
  +--> ONEComputer web + API
  |       |
  |       +--> PostgreSQL: users, policy, sandbox state, audit records
  |       +--> Rust gateway: policy, credential injection, held actions
  |       +--> Sandbox: Claude Desktop / Claude Code runtime
  |
  +--> OpenVTC / VTI trust plane
          |
          +--> verified identity
          +--> Trust Task delivery
          +--> external wallet custody
          +--> signed approval response
```

## North-star user journey

The business acceptance path is:

1. Admin signs in.
2. Admin sets the company policy floor.
3. Admin adds a user and assigns the appropriate role.
4. User signs in and starts an isolated cloud workspace.
5. User works in Claude Desktop or Claude Code.
6. A consequential action reaches the policy gateway.
7. The gateway holds the action and emits a Trust Task.
8. A manager receives the alert in an external VTI wallet.
9. The wallet signs the exact request.
10. ONEComputer verifies the proof and releases the action exactly once.

## Design principles

### The workspace is real

Claude needs a computer, not only a chat box. The runtime must provide files, tools, network boundaries, and a predictable session lifecycle.

### The control plane is explicit

Policy, sandbox state, approvals, and evidence are visible to the business and security operators. The portal should make the state legible without becoming a second trust authority.

### Trust is outside the portal

The cryptographic signer and private key do not live in the ONEComputer web UI. OpenVTC owns the identity and wallet boundary.

### Evidence is a product primitive

Every held action should be traceable to its policy snapshot, runtime event, Trust Task, signed response, and final release or denial.
