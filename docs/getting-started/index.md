# Getting started

ONEComputer gives an enterprise a controlled computer for Claude: a browser-accessible sandbox, a policy and gateway boundary, and a separate trust plane for identity and approval.

This section gets a contributor from zero to a local development environment.

## Choose your path

| You want to… | Start here |
| --- | --- |
| Install a clean local checkout | [Install ONEComputer](./installation) |
| Understand what the installer changes | [Install ONEComputer → installer behavior](./installation#what-the-installer-does) |
| Run the services after cloning | [Local quickstart](./quickstart) |
| Work on Azure or production-like infrastructure | [Azure deployment](../operations/azure-deployment) |
| Understand identity and approval | [OpenVTC trust boundary](../architecture/openvtc-boundary) |

## What you will have locally

The supported local path prepares:

- the ONEComputer workspace and locked JavaScript dependencies;
- a mode-600 local `.env` file with development-only secrets;
- PostgreSQL through Docker Compose;
- Prisma client generation and migrations;
- the Next.js web/API process;
- the Rust policy gateway process.

The local path is a development environment. It is not a production identity authority and it does not turn a local simulator into a cryptographic OpenVTC approval flow.

::: warning Know the boundary
The portal can be used to request and display an approval. A real production approval must be signed by an external OpenVTC wallet and independently verified before release.
:::
