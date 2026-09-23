# Jagadish B — Cyberpunk Portfolio

A responsive, dependency-light portfolio website built from the provided resume.

## Files
- `index.html` — page structure/content placeholders
- `style.css` — cyberpunk visual design, responsive layout, effects
- `script.js` — edit mode, local browser saving, current-work toggle, export/reset

## How to use
1. Open `index.html` in a modern browser.
2. Click **EDIT MODE**.
3. Click any highlighted text and change it.
4. Toggle **SHOW CURRENT WORK** to reveal the current-work section.
5. Fill in the current role/company/date/description directly on the page.
6. Click **SAVE**. Changes persist in that browser via local storage.
7. Use **EXPORT DATA** to download a JSON backup of your edited content.
8. Use **↺** to reset back to the original resume-based content.

## Permanent/manual edits
For a developer workflow, the default resume content is centralized in `script.js` inside the `DEFAULTS` object. This makes it easy to edit the text without changing the design.

## Deployment
This is a static website. It can be deployed to GitHub Pages, Netlify, Vercel, or any regular web host by uploading these files.
