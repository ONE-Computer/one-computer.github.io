# Install ONEComputer

The recommended open-source install is a small, rerunnable shell bootstrap. It clones the public repository, delegates environment setup to the versioned setup script, and does not print or upload credentials.

## Prerequisites

Supported development environments are macOS, Linux, and WSL2. Install:

- Git;
- Node.js 22 or newer;
- Corepack with pnpm enabled;
- Docker Desktop or Docker Engine with Compose;
- a shell with `sh`, `curl`, and standard POSIX utilities.

Check the basics:

```bash
git --version
node --version
docker --version
docker compose version
```

## One-line install

```bash
curl -fsSL https://raw.githubusercontent.com/ONE-Computer/onecomputer/main/scripts/install.sh | sh
```

The default checkout is `~/.onecomputer/src`. The installer then prepares dependencies, local configuration, PostgreSQL, migrations, and the development processes.

## Useful options

Prepare the checkout without starting services:

```bash
curl -fsSL https://raw.githubusercontent.com/ONE-Computer/onecomputer/main/scripts/install.sh | sh -s -- --no-start
```

Preview the plan without cloning, installing, or changing files:

```bash
curl -fsSL https://raw.githubusercontent.com/ONE-Computer/onecomputer/main/scripts/install.sh | sh -s -- --dry-run
```

Choose an install directory or branch/tag:

```bash
curl -fsSL https://raw.githubusercontent.com/ONE-Computer/onecomputer/main/scripts/install.sh \
  | sh -s -- --dir "$HOME/work/onecomputer" --ref main
```

Use an existing checkout:

```bash
./scripts/install.sh --source-dir . --no-start
```

See every supported flag:

```bash
./scripts/install.sh --help
```

## What the installer does

1. Resolves a source directory, cloning `ONE-Computer/onecomputer` when needed.
2. Verifies that the checkout contains `package.json` and the versioned setup script.
3. Runs `scripts/onecomputer/setup.sh` with the selected start and dependency options.
4. Creates a local `.env` only when one does not already exist.
5. Installs locked dependencies and generates the Prisma client.
6. Starts PostgreSQL, applies migrations, and optionally starts local web/gateway processes.

It is intentionally conservative:

- it does not delete Docker volumes;
- it does not overwrite an existing `.env`;
- it does not upload credentials;
- it does not silently destroy an existing checkout;
- it can be rerun to converge a development machine.

## Ports

| Service | Default local address | Role |
| --- | --- | --- |
| Web dashboard/API | `http://localhost:10254` | Product UI and business API |
| Rust gateway | `http://localhost:10255` | Policy, credential, and held-action boundary |
| PostgreSQL | Docker Compose-managed | Application state, policy, and audit records |

## Security notes

The one-line install is convenient, but review the script before using it in a sensitive environment:

```bash
curl -fsSL https://raw.githubusercontent.com/ONE-Computer/onecomputer/main/scripts/install.sh \
  -o /tmp/onecomputer-install.sh
less /tmp/onecomputer-install.sh
sh /tmp/onecomputer-install.sh --dry-run
```

Pin a reviewed ref for repeatable setup:

```bash
curl -fsSL https://raw.githubusercontent.com/ONE-Computer/onecomputer/main/scripts/install.sh \
  | sh -s -- --ref <reviewed-branch-or-tag>
```

For production, use the CI/CD path rather than piping an installer into a privileged host shell. See [CI/CD and release gates](../operations/ci-cd).
