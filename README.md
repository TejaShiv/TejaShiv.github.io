# tejashiv.github.io

Source for three sites, built and deployed together from this one repository.

| Path | Lives in | Built with |
|---|---|---|
| `/` | `site/` | Vanilla HTML, CSS and JavaScript. No build step. |
| `/portfolio/` | `portfolio/` | Vite, React and TypeScript. |
| `/learntej/` | `site/learntej/` | Static. Served as-is. |

## Deploying

Push to `main`. The workflow in `.github/workflows/deploy.yml` builds the
React app, assembles all three into one tree, and publishes it to GitHub
Pages. Nothing built is committed.

## Working locally

The root site needs no tooling:

    cd site && python3 -m http.server 8080

The React app has a dev server:

    cd portfolio && npm install && npm run dev

To check the whole thing as it will be served, build the React app and
drop it into the root site the way the workflow does:

    cd portfolio && npm run build
    cp -R dist ../site/portfolio
    cd ../site && python3 -m http.server 8080

`site/portfolio/` is gitignored, so that copy is local only.
