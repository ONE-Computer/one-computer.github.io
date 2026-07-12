# ONEComputer GitHub site

This is the public organization overview for [ONEComputer](https://github.com/ONE-Computer).
It is a static GitHub Pages site with no runtime secrets or build service.

## Local preview

```bash
python3 -m http.server 8080
```

Then open `http://127.0.0.1:8080`.

## Deployment

The `pages.yml` workflow publishes the repository through GitHub Pages after a
push to `main`.
