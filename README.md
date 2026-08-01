# BIOL2022 2026 Lectures

Consolidated Quarto lecture project. One shared ochre theme; one lecture per folder under `lectures/`.

## Render

- One lecture: `quarto render lectures/L01-intro-exp-design-analysis/index.qmd`
- Public site: `bash scripts/render-public.sh`
- Publish: push to `main`; GitHub Pages uses the same clean public build.

Draft lectures remain editable with a one-file render, but only lectures listed under `project.render` in `_quarto.yml` are included in the public site. To release a lecture, remove `draft: true`, add it to `project.render`, and enable its link on the landing page.

## Theme

Edit `_extensions/ochre/`. Every lecture inherits the change — no sync step.

## Adding a lecture

1. `cp -R lectures/L01-intro-exp-design-analysis lectures/L0X-new-slug`
2. Edit `index.qmd`; set `format: ochre-revealjs`.
3. Add a non-clickable “Coming soon” card on `index.qmd`.
4. When the lecture is ready, follow the release steps above.

## Freeze

`_freeze/` is committed so CI renders without R. Note: `quarto render <one-file.qmd>` ignores freeze and re-executes R; only whole-project renders honour freeze.
