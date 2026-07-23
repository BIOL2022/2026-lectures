# BIOL2022 2026 Lectures

Consolidated Quarto lecture project. One shared ochre theme; one lecture per folder under `lectures/`.

## Render

- One lecture: `quarto render lectures/L01-intro-exp-design-analysis/index.qmd`
- Whole site: `quarto render`
- Publish: `quarto render && quarto publish gh-pages`

## Theme

Edit `_extensions/ochre/`. Every lecture inherits the change — no sync step.

## Adding a lecture

1. `cp -R lectures/L01-intro-exp-design-analysis lectures/L0X-new-slug`
2. Edit `index.qmd`; set `format: ochre-revealjs`.
3. Add a link on `index.qmd`.

## Freeze

`_freeze/` is committed so CI renders without R. Note: `quarto render <one-file.qmd>` ignores freeze and re-executes R; only whole-project renders honour freeze.
