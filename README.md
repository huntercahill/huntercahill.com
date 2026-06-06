# huntercahill.com

Static site for Hunter Cahill. Plain HTML/CSS/JS — no build step, no framework, no dependencies to install.

## Structure

```
huntercahill.com/
├── index.html          # the whole site (single page, anchor nav)
├── css/styles.css      # all styling
├── js/main.js          # nav, mobile menu, scroll reveals
├── assets/
│   ├── favicon.svg
│   └── img/            # drop og-image.jpg + any photos here
├── CNAME               # custom domain (used by GitHub Pages)
├── robots.txt
└── sitemap.xml
```

## Editing

- **Tracklist** — edit the `<ol class="tracklist">` in `index.html`. Each `<li>` is one track.
- **Album title / about copy** — in `index.html`, the `#music` and `#about` sections.
- **Press** — the `<ul class="press__list">`.
- **Colors / fonts** — the `:root` variables at the top of `css/styles.css`.
- **Contact email** — search `contact@huntercahill.com` in `index.html` and set the real address.

## Preview locally

```
cd huntercahill.com
python3 -m http.server 8000
# open http://localhost:8000
```

(Use a server, not file://, so the absolute `/css`, `/js` paths resolve.)

## Deploy

### Cloudflare Pages (recommended — unlimited bandwidth, free TLS)
1. Push this folder to a GitHub or GitLab repo.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → connect the repo.
3. Build settings: **Framework preset: None. Build command: (blank). Output dir: /**
4. Add custom domain `huntercahill.com` (and `www`) under the project's Custom Domains tab.

### GitHub Pages (simplest if you already live in GitHub)
1. Push to a repo, e.g. `huntercahill.com`.
2. Repo → Settings → Pages → Source: deploy from branch `main`, folder `/ (root)`.
3. The included `CNAME` file points it at `huntercahill.com` automatically; set the DNS records GitHub shows you.

## Domain note

`huntercahill.com` is currently registered through Squarespace. Before you cancel
Squarespace, transfer the domain out (Cloudflare Registrar is at-cost; Porkbun/
Namecheap also fine) or it will lapse with the subscription. Then point DNS at
whichever host you chose above.

## Fonts

Loaded from Google Fonts (Fraunces + Newsreader) via `<link>` in `index.html`.
To self-host them later for zero third-party requests, download the WOFF2 files
into `assets/fonts/` and swap the `<link>` for an `@font-face` block.
