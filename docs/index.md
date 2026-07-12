---
layout: home
title: ONEComputer Docs
titleTemplate: Secure cloud workspaces for Claude
description: Install, operate, and extend ONEComputer.
hero:
  name: ONEComputer Docs
  text: The open-source control plane for secure Claude workspaces.
  tagline: Install the stack locally, understand the OpenVTC boundary, and operate the enterprise path from sandbox to verified approval.
  actions:
    - theme: brand
      text: Install ONEComputer
      link: /getting-started/installation
    - theme: alt
      text: Understand the architecture
      link: /architecture/
features:
  - title: Cloud workspaces
    details: Give teams an isolated computer with Claude Desktop and Claude Code available in the runtime.
  - title: Enterprise controls
    details: Apply policy, gateway holds, evidence, and operator workflows around agentic work.
  - title: Open trust boundary
    details: Keep identity, wallet custody, Trust Tasks, and signed approval in OpenVTC—not inside the portal.
---

<div class="docs-home">
  <p class="eyebrow">Documentation · open source · enterprise runtime</p>
  <h2>From first install to governed production work.</h2>
  <p class="lede">
    ONEComputer is a thin business and enforcement layer over an open trust
    plane. These docs explain what is real today, how to run it, and where the
    remaining OpenVTC integration work belongs.
  </p>

  <div class="doc-grid">
    <a class="doc-card" href="./getting-started/installation">
      <span>01 · Start here</span>
      <b>Install the OSS stack</b>
      <p>Use the one-line installer or prepare an existing checkout without losing local state.</p>
    </a>
    <a class="doc-card" href="./getting-started/quickstart">
      <span>02 · Build</span>
      <b>Run the local quickstart</b>
      <p>Bring up PostgreSQL, migrations, the portal, and the Rust policy gateway.</p>
    </a>
    <a class="doc-card" href="./architecture/openvtc-boundary">
      <span>03 · Trust</span>
      <b>Read the OpenVTC boundary</b>
      <p>Understand why approval happens in an external wallet and how the signed result returns.</p>
    </a>
    <a class="doc-card" href="./operations/azure-deployment">
      <span>04 · Operate</span>
      <b>Deploy to Azure</b>
      <p>See the service topology, systemd units, release gates, and health checks.</p>
    </a>
    <a class="doc-card" href="./governance/policy">
      <span>05 · Govern</span>
      <b>Design policy safely</b>
      <p>Separate business policy from cryptographic authority and keep defaults explicit.</p>
    </a>
    <a class="doc-card" href="./reference/status">
      <span>06 · Reality check</span>
      <b>Know the current status</b>
      <p>Track the verified implementation, the compatibility harnesses, and the E2E gaps.</p>
    </a>
  </div>

  <div class="boundary-note">
    <p>
      <strong>Security invariant:</strong> ONEComputer may display an approval
      request and its state, but it must never be the approval authority. The
      external OpenVTC wallet signs the exact held action; ONEComputer verifies
      the result before release.
    </p>
  </div>
</div>
