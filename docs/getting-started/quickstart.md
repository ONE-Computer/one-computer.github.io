# Run the local quickstart

After installation, the shortest path to the local product is:

```bash
cd ~/.onecomputer/src
pnpm dev
```

Open the dashboard/API at `http://localhost:10254` and the gateway health
surface at `http://localhost:10255`.

## Manual setup

If you skipped dependencies or prefer explicit commands:

```bash
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env
pnpm db:generate
pnpm db:up
pnpm db:migrate
pnpm dev
```

Do not commit `.env`. Keep local secrets local and use separate values for every environment.

## Verify the workspace

Run the repository checks before making changes:

```bash
pnpm check-types
pnpm lint
pnpm build
```

For a release-shaped check, also run the relevant gateway tests:

```bash
pnpm --filter @onecli/gateway check-types
pnpm --filter @onecli/gateway test
```

## Make a safe first change

Use a branch, make one bounded change, and verify it before moving to the next layer:

```bash
git switch -c codex/my-onecomputer-change
pnpm lint
pnpm build
git diff --check
git status --short
```

The workspace still contains internal `@onecli/*` package scopes. That is an intentional compatibility boundary; do not perform a broad rename while changing product behavior.

## What local development does not prove

Local success proves that the selected code path builds and can run against local dependencies. It does not prove:

- production OpenVTC identity;
- delivery to a real manager wallet;
- cryptographic signing of the exact held action;
- Azure systemd/Nginx configuration;
- sandbox isolation under production load.

Those are separate readiness gates, documented in [Current status](../reference/status) and [Azure deployment](../operations/azure-deployment).
