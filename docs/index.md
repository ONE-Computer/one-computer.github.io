---
layout: home
title: ONEComputer Docs
titleTemplate: Safe cloud workspaces for AI agents
description: Learn how to install ONEComputer, run safe AI workspaces, and connect human approval through OpenVTC.
hero:
  name: ONEComputer Docs
  text: Build a safe place for AI agents to work.
  tagline: Install ONEComputer locally, understand how OpenVTC keeps approval separate, and follow the path from an employee workspace to a signed human decision.
  actions:
    - theme: brand
      text: Install ONEComputer
      link: /getting-started/installation
    - theme: alt
      text: See how it works
      link: /architecture/
features:
  - title: A computer for each employee
    details: Give people an isolated cloud workspace with the AI agents and tools their work requires.
  - title: Clear company rules
    details: Decide what agents can access, what stays blocked, and which actions need a person.
  - title: Approval outside the application
    details: Use OpenVTC to keep identity, signing keys, and important decisions in a separate wallet.
---

<div class="docs-home">
  <p class="eyebrow">Documentation · open source · built for enterprise use</p>
  <h2>From your first local workspace to a production deployment.</h2>
  <p class="lede">
    These docs explain how to run ONEComputer, how its safeguards work, and
    which parts of the complete OpenVTC integration are available today.
  </p>

  <div class="doc-grid">
    <a class="doc-card" href="./getting-started/installation">
      <span>01 · Start here</span>
      <b>Install ONEComputer</b>
      <p>Use the one-line installer or prepare an existing checkout without losing local state.</p>
    </a>
    <a class="doc-card" href="./getting-started/quickstart">
      <span>02 · Build</span>
      <b>Run the local quickstart</b>
      <p>Start the database, prepare its tables, and run the portal and policy gateway.</p>
    </a>
    <a class="doc-card" href="./architecture/openvtc-boundary">
      <span>03 · Trust</span>
      <b>Understand OpenVTC approval</b>
      <p>Understand why approval happens in an external wallet and how the signed result returns.</p>
    </a>
    <a class="doc-card" href="./operations/azure-deployment">
      <span>04 · Operate</span>
      <b>Deploy to Azure</b>
      <p>See how the services fit together, how releases are checked, and how to monitor their health.</p>
    </a>
    <a class="doc-card" href="./governance/policy">
      <span>05 · Set rules</span>
      <b>Design clear company policy</b>
      <p>Choose what is allowed, blocked, recorded, or sent to a person for review.</p>
    </a>
    <a class="doc-card" href="./reference/status">
      <span>06 · Reality check</span>
      <b>Know the current status</b>
      <p>See what works today, what is still being integrated, and how completion is verified.</p>
    </a>
  </div>

  <div class="boundary-note">
    <p>
      <strong>One rule we do not compromise:</strong> ONEComputer may show an
      approval request, but it cannot approve that request itself. A separate
      OpenVTC wallet signs the manager's decision, and ONEComputer checks that
      decision before the action continues.
    </p>
  </div>
</div>
