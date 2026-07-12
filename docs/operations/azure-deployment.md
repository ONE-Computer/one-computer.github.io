# Azure deployment

The Azure VM is a production-like host for the ONEComputer application and its sandbox edge. It is not a reason to bundle the entire OpenVTC source tree into the ONEComputer image.

## Runtime topology

```text
Public TLS
  -> Nginx
      -> onecomputer-web.service
      -> onecomputer-gateway.service

ONEComputer services
  -> PostgreSQL
  -> Kasm sandbox containers
  -> LiteLLM / Presidio sidecars
  -> OpenVTC/VTI services at an explicit protocol boundary
```

## Services

| Unit | Purpose |
| --- | --- |
| `onecomputer-web.service` | Built Next.js portal and API |
| `onecomputer-gateway.service` | Rust policy and credential gateway |
| PostgreSQL | Application state, policy, and audit records |
| Kasm | Browser-accessible desktop sandbox |
| LiteLLM / Presidio | Model routing and data handling sidecars where configured |
| Nginx | TLS termination and reverse proxy |

## Deployment principles

- Build the exact merged commit selected by CI.
- Run verification before restart.
- Apply forward-only migrations as a guarded release step.
- Restart only the units required by the changed component.
- Run health checks after restart.
- Roll back the application checkout if build or health checks fail; do not automatically downgrade database schema.

## Bootstrap and operator paths

The repository contains the operational scripts under `scripts/onecomputer/` and deployment assets under `deploy/`. The Gitea runner bootstrap is intended for the Azure VM and must be reviewed before use:

```bash
sudo bash scripts/onecomputer/provision-gitea-runner.sh
```

The dedicated runner must separate pull-request validation from merge-to-main deployment. Pull-request jobs must not receive production credentials or the deploy label.

## Health checklist

After deployment, verify:

```bash
systemctl is-active onecomputer-web.service
systemctl is-active onecomputer-gateway.service
curl -fsS https://<host>/health
curl -fsS https://<host>/api/health
```

Then verify the user-visible flow: login, sandbox creation, gateway hold, external wallet decision, proof verification, and exactly-once release. A green systemd status alone is not an E2E proof.
