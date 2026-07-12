# Environment variables

Environment variables are deployment inputs, not source code. Keep `.env` files local or in the approved secret manager; never commit credentials to Git.

## Local configuration

Start from the checked-in template:

```bash
cp .env.example .env
chmod 600 .env
```

The installer creates a local `.env` when needed and preserves an existing file. Inspect the source repository's `.env.example` for the exact current variable names; the set changes as services move behind OpenVTC seams.

## Configuration categories

| Category | Examples | Handling |
| --- | --- | --- |
| Runtime | `NODE_ENV`, ports, public origin | non-secret deployment config |
| Database | PostgreSQL URL, migration settings | secret in shared environments |
| Gateway | policy and credential broker settings | secret where credentials are involved |
| Sandbox | provider endpoint, image, session settings | environment-specific |
| OpenVTC | RP configuration, mediator/TSP endpoints, wallet references | trust-plane owned; do not invent local authority |
| Observability | log level, trace/export settings | avoid sensitive payloads |

## Secret handling rules

- Do not print secret values during setup or CI.
- Do not put API keys in URLs, screenshots, tickets, or public documentation.
- Use separate values for local, staging, and production.
- Rotate credentials after accidental exposure.
- Prefer short-lived credentials and workload identity on Azure.
