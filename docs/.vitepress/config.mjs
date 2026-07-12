import { defineConfig } from "vitepress";

export default defineConfig({
  title: "ONEComputer Docs",
  titleTemplate: "%s · ONEComputer",
  description:
    "Open-source documentation for secure cloud Claude workspaces, policy, and OpenVTC approvals.",
  base: "/docs/",
  cleanUrls: true,
  appearance: true,
  lastUpdated: true,
  outDir: "../dist/docs",
  themeConfig: {
    logo: "/favicon.svg",
    siteTitle: "ONEComputer",
    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "/" },
      { text: "Cloud console", link: "https://onecomputer-openvtc.eastus2.cloudapp.azure.com/console" },
      { text: "GitHub", link: "https://github.com/ONE-Computer/onecomputer" },
    ],
    sidebar: {
      "/getting-started/": [
        {
          text: "Getting started",
          items: [
            { text: "Overview", link: "/getting-started/" },
            { text: "Install ONEComputer", link: "/getting-started/installation" },
            { text: "Run the local quickstart", link: "/getting-started/quickstart" },
          ],
        },
      ],
      "/architecture/": [
        {
          text: "Architecture",
          items: [
            { text: "System overview", link: "/architecture/" },
            { text: "Control plane and gateway", link: "/architecture/control-plane" },
            { text: "OpenVTC trust boundary", link: "/architecture/openvtc-boundary" },
          ],
        },
      ],
      "/operations/": [
        {
          text: "Operations",
          items: [
            { text: "Local development", link: "/operations/local-development" },
            { text: "Azure deployment", link: "/operations/azure-deployment" },
            { text: "CI/CD and release gates", link: "/operations/ci-cd" },
          ],
        },
      ],
      "/governance/": [
        {
          text: "Governance",
          items: [
            { text: "Policy model", link: "/governance/policy" },
            { text: "External approvals", link: "/governance/approvals" },
            { text: "Evidence and audit", link: "/governance/evidence" },
          ],
        },
      ],
      "/reference/": [
        {
          text: "Reference",
          items: [
            { text: "Environment variables", link: "/reference/environment" },
            { text: "Repository and runtime map", link: "/reference/repository-map" },
            { text: "Troubleshooting", link: "/reference/troubleshooting" },
            { text: "Current status", link: "/reference/status" },
          ],
        },
      ],
    },
    search: { provider: "local" },
    outline: { level: [2, 3] },
    socialLinks: [
      { icon: "github", link: "https://github.com/ONE-Computer/onecomputer" },
    ],
    editLink: {
      pattern: "https://github.com/ONE-Computer/one-computer.github.io/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
    docFooter: { prev: "Previous", next: "Next" },
    footer: {
      message: "Open-source governed AI computers · forked from ONECli",
      copyright: "Released under the Apache-2.0 license",
    },
  },
});
