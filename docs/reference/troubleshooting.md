# Troubleshooting

## The installer stops because the directory exists

The installer will not treat a non-Git directory as a checkout. Choose another path or pass the real checkout explicitly:

```bash
./scripts/install.sh --source-dir /path/to/onecomputer
```

## Docker is unavailable

Start Docker Desktop or the Docker daemon, then retry the setup. PostgreSQL is managed through Docker Compose in the supported local path.

## The database is not ready

Check containers and logs:

```bash
docker compose ps
docker compose logs --tail=100 postgres
```

Then rerun the safe setup steps:

```bash
pnpm db:up
pnpm db:migrate
```

## A port is already in use

Find the process before stopping anything:

```bash
lsof -nP -iTCP:10254 -sTCP:LISTEN
lsof -nP -iTCP:10255 -sTCP:LISTEN
```

Prefer stopping the process that owns the port or changing the local configuration explicitly. Do not kill unrelated containers as a first response.

## The UI says an action is approved but the gateway did not release it

Treat the UI state as non-authoritative. Inspect the hold, Trust Task, verifier result, digest, expiry, and gateway logs. If the signed response cannot be independently verified, the action should remain blocked.

## The build passes but the E2E is not trustworthy

Check whether the test used a seeded approval, local adapter, simulator, skipped infrastructure, or an actual external wallet. Record the distinction in the release evidence and keep the E2E gate open until the real trust-plane path is exercised.

## Where to report a bug

Open a GitHub issue with:

- commit SHA;
- operating system and Node/pnpm versions;
- exact command;
- sanitized logs;
- expected and observed behavior;
- whether the issue is local, Azure, gateway, sandbox, or OpenVTC/VTI.

Never attach `.env`, wallet material, API keys, or raw sensitive prompts.
