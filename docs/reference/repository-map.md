# Repository and runtime map

Cloning a repository for study does not make it part of the ONEComputer production build. A repository is a production input only when it is in the workspace, declared as a pinned dependency, or explicitly deployed as an OpenVTC/VTI service.

## Production application

| Path | Role | Built/hosted |
| --- | --- | --- |
| `onecomputer` | Portal, API, gateway, migrations, deployment, E2E | Yes |
| `apps/web` | Next.js portal and server routes | Built and hosted |
| `apps/gateway` | Rust policy and credential gateway | Built and hosted |
| `packages/api` | Workspace API/business services | Built as dependency |
| `packages/db` | Prisma client, schema, migrations | Built; PostgreSQL hosted |
| `deploy/`, `docker/`, `scripts/` | Runtime and operations | Validated and used as configured |

## Pinned or separately owned dependencies

- `@openvtc/rp-sdk`: relying-party verification SDK consumed through the lockfile;
- OpenVTC/VTI protocol schemas and fixtures: contract inputs, not a portal service;
- VTA wallet, mediator, TSP/DIDComm transport, and push gateway: separately owned trust-plane services;
- cryptography/DID libraries: pinned package or Cargo dependencies only.

## Study-only and prototype repositories

Older ONEComputer implementations, AppStream experiments, Windows experiments, provider prototypes, and general-purpose tooling remain useful references. They should not be recursively built, copied into the production image, or silently introduced as runtime dependencies.

## Rule of thumb

If a release cannot state which commit, package, image, or protocol version it consumed, it is not a controlled production dependency yet.
