# ONEComputer landing page

This is the public landing page for [ONEComputer](https://github.com/ONE-Computer):
an open-source governed AI computer forked from ONECli and built as a thin
business layer over OpenVTC trust infrastructure.

It is a static GitHub Pages site with no runtime secrets or build service. The
visual system uses JetBrains Mono + IBM Plex Sans, a dark security-blue palette,
inline SVG-free CSS primitives, accessible focus states, and reduced-motion
support. `framer-motion` is included for future component work without making
the public page dependent on a JavaScript runtime.

## Local preview

```bash
python3 -m http.server 8080
```

Then open `http://127.0.0.1:8080`.

## Deployment

The `pages.yml` workflow publishes the repository through GitHub Pages after a
push to `main`.
