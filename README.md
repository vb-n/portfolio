# Veera Naidu — Portfolio

A quiet, single-page portfolio for platform engineering leadership. The page uses a light, low-contrast palette and keeps the focus on experience, outcomes, and education.

## Content

The portfolio content is maintained in [`profile.yaml`](./profile.yaml). Update that file to change the introduction, skills, roles, or education. The page reads the YAML file when it loads.

Website-specific role summaries live under `website.experience_summaries`. This keeps the portfolio's concise paragraphs separate from the detailed `achievements` used for resume content. Add a matching company and role entry there to show a summary for each role on the website.

## Preview locally

Run a static web server from this directory so the browser can load `profile.yaml`:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Files

- `index.html` — page structure and metadata
- `css/k8s.css` — layout, colors, and responsive styles
- `js/app.js` — YAML loading and page rendering
- `profile.yaml` — portfolio content
