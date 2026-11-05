# Vanina Greco, portfolio

Personal design portfolio, published with GitHub Pages at <https://vaninagreco.github.io/>.

Plain HTML and CSS. No build step, no framework, no analytics.

## Structure

```
index.html                  Home
case-studies/               One HTML page per case study
assets/css/styles.css       All styles (design tokens at the top)
assets/fonts/               Poppins (Latin subset, self-hosted)
assets/img/                 Optimised images (WebP)
assets/Vanina-Greco-CV.pdf  CV
404.html                    Not-found page
archive/                    Previous version of the site (kept, not indexed)
aerolab.html                Old application page, kept at its original URL
```

## Run locally

```
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Images

| Image | Export size | Ratio |
|---|---|---|
| `cover-*` (trio cards) | 1200 × 750 | 16:10 |
| `cover-ai-agent` (featured card) | 1400 × 746 | about 15:8 |
| `hero-ai-agent` (case study hero) | 1600 × 853 | 15:8 |
| `sketch-hero` | 800 × 602 or larger | 4:3 |
| `hobby-ceramic`, `hobby-journal`, `hobby-drawing` | 800 × 800 | 1:1 |

Use lowercase file names with hyphens. WebP, quality 80–85, under about 200 KB each. Strip EXIF from photos before publishing.

## Publishing a new case study

1. Copy `case-studies/ai-agent.html` to a new file and replace the copy and images.
2. Make the matching card on the home page a link (replace the `Coming soon` label with a `more` link).
3. Add the page to `sitemap.xml` and remove its `noindex` tag once the copy is final.
