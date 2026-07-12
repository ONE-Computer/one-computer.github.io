# CI/CD and release gates

The source repository is the release source of truth. A successful local build is useful evidence, but production deployment must be tied to a reviewed merge commit and a repeatable verification job.

## Required gates

1. Dependency installation from the lockfile.
2. Type checks and lint.
3. Web and gateway builds.
4. Unit and integration tests for changed boundaries.
5. Database migration checks when the schema changes.
6. E2E or contract tests for the affected OpenVTC seam.
7. Health checks after deployment.

## Runner separation

Use a dedicated Azure-hosted runner for deployment:

- `onecomputer-ci`: pull-request checks with no production credentials;
- `onecomputer-deploy`: merge-to-main deployment with a narrow allowlist.

Do not give untrusted pull-request code access to the deploy label, the production `.env`, or the deployment sudo wrapper.

## Release evidence

Every release should record:

- merge commit SHA;
- workflow run URL;
- build/test commands and outcomes;
- migration status;
- deployed service versions;
- health-check results;
- remaining known blockers.

Do not claim that the full investor E2E is complete when the environment only exercised a local adapter, seeded approval, or UI simulation.
