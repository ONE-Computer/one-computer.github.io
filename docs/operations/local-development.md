# Local development

The local environment is optimized for fast iteration on the web/API, gateway, policy, and database layers.

## Repository layout

```text
apps/web/                 Next.js portal and API routes
apps/gateway/             Rust policy and credential gateway
packages/api/             API/business services
packages/db/              Prisma schema, client, and migrations
packages/ui/              shared UI primitives
docker/                   local runtime containers
deploy/                   systemd, Nginx, OpenVTC deployment assets
scripts/onecomputer/      setup, E2E, evidence, and deployment tooling
docs/                     operational and architecture documentation
```

## Development loop

```bash
git switch -c codex/my-change
pnpm install --frozen-lockfile
pnpm db:generate
pnpm db:up
pnpm db:migrate
pnpm dev
```

In a second shell:

```bash
pnpm check-types
pnpm lint
pnpm build
git diff --check
```

## Database discipline

- Use migrations for schema changes; do not edit production tables manually.
- Keep local development data disposable and never copy production secrets into `.env`.
- Treat a failed forward migration as a release failure to investigate, not as permission to silently downgrade the schema.
- Do not mark a feature complete because a test skipped itself due to missing infrastructure.

## Working with sandboxes

Sandbox creation is a runtime concern, not a reason to recursively build every cloned repository in the workspace. Keep provider adapters, images, and session contracts explicit. The current product path uses the deployed sandbox runtime; provider replacement belongs behind a documented seam.
