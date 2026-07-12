# ONEComputer landing page

This is the public landing page for [ONEComputer](https://github.com/ONE-Computer):
an open-source governed AI computer forked from ONECli and built as a thin
business layer over OpenVTC trust infrastructure.

The site is a Vite/React application deployed as static assets on GitHub Pages.
It uses real captures from the deployed ONEComputer product, the product's
Geist typography and UI tokens, and Framer Motion for scroll, state, and
security-flow animation. Raw test identifiers are covered by presentation-layer
labels; the source screenshots remain unchanged.

## Local development

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

## Deployment

The `pages.yml` workflow builds `dist/` with Node 22 and deploys it through
GitHub Pages after a push to `main`.
