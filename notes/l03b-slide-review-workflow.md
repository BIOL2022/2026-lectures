# L03b slide review workflow

A living record of the agreed human-in-the-loop workflow for revising the L03b lecture deck. It documents how author and reviewer collaborate so that a future skill can be designed from observed practice rather than assumption.

## Workflow

1. **Survey before editing.** Inspect the whole deck and its project or configuration files first, so the overall diagnosis sits in the background. Do not act on the survey yet.
2. **Advance one rendered slide at a time.** Work slowly through the deck in order, including section dividers. Each slide is reviewed on its own terms before moving on.
3. **Rolling preload and privacy.** The parent keeps whole-deck context private, sends to the author only the current slide, and preloads recommendations for the current slide plus the next four via read-only subagents.
4. **For each slide:**
   - identify the slide's current purpose in one or two sentences;
   - offer at least three concrete before/after choices, written in the author's natural academic voice;
   - ask one small focused question to guide the decision;
   - wait for an explicit decision before advancing to the next slide.
5. **Preload cadence.** Start a new five-slide preload batch only after the fifth reviewed slide has been processed.
6. **Do not overwhelm.** No ahead-of-time critique of slides not yet reached, and no forcing of global choices when a local decision suffices.
7. **Keep an approved-decision record.** Record each decision as it is made, and implement only what the author explicitly chose.
8. **Verification is targeted.** Use source review for content questions; render or inspect in a browser only when a visual property or a Reveal.js behaviour must be confirmed.

## Style checks for every mock-up

- No slogans and no forced symmetry.
- No em dashes; no contractions.
- Australian spelling throughout.
- Technical precision without unnecessary jargon.

## Observed decisions
- **L04a title slide:** approved to retain the technical title and use the code-free subtitle `BIOL2022`.
- **L04a learning objectives:** approved to retain the checkbox format and tighten the five objectives using direct action-oriented wording.
- **L04a opening quote:** approved to retain the bilingual quote, with the English translation and attribution revealed together in one fragment.
- **L04a penguin prompt:** approved a titled, photograph-first prompt with meaningful alternative text and two concise discussion questions.
- **L04a expanding a model:** the author directly revised the source after approval; the current three-fragment slide is the source of truth unless this slide is revisited.
- **L04a review cadence:** review an adaptive group of one to five rendered slides per round, chosen for topic coherence; whole-deck context remains in the background.
- **L04a prediction slide:** approved a distinction between explanatory and predictive modelling, with prediction evaluated on new data.
- **L04a mockup preference:** present concise CLI-style text mockups with explicit `1` and `2` labels, without explanatory prose or vertical slide borders; keep every compared mockup at the same fixed height. Render images only to verify approved visual changes.
- **L04a multiple-predictor models:** approved mockup 2, focusing on conditional coefficients, interactions, correlated predictors, and model checking.
- **L04a worked-example divider:** approved mockup 1 with the title `Worked example: Palmer penguins` and no subtitle.
- **L04a simple linear-regression workflow:** approved mockup 2, including a question-led framing and an explicit assumption check before revision.

- **Objectives slide:** the objectives were revised per the author's approved wording and retain checkbox list markers.
- **Section divider:** the `# Comparing means` divider heading was replaced with `# When is a difference in means meaningful?`.
- **Gentoo slide:** approved as photograph-first, with the image treated as decorative using empty alternative text, and the question updated to ask whether male and female Gentoo penguins differ in body mass.
- **Baby-food slide:** the slide now presents a real product label, Smiling Tums Apple and Banana with Oats, with the nutrition-information panel as the main visual. Local copies of the cited Open Food Facts label photographs are stored in the lecture assets folder, and the label value is framed as a reference value against which the sampled pouches are compared.
- **Baby-food slide review:** structural or visual slide changes must be rendered and inspected on the target slide before acceptance, because source structure alone cannot reveal clipping or overflow.

- **Overview slide:** the author revised the overview slide directly during review, and such direct author edits are now treated as the current source of truth for that slide before review continues.
- **History slide:** the author revised the history slide directly during review, and the review continues from that author-updated version.
- **Distribution-definition slide:** the slide now introduces the normal and *t*-distributions through a visual direct comparison of the two curves, reserving explanation of the distribution's changing shape for the following slide.
- **Sample-size slide:** the slide now emphasises the main contrast between smaller and larger samples rather than showing the full progression of degrees of freedom.
- **Signal-to-noise slide:** the slide now introduces the *t*-statistic conceptually as a comparison of a difference with its uncertainty, defines signal in a generalisable way that applies to all mean-comparison designs, and defers the full two-sample formula to later material.
- **Critical-region slide:** the older critical-value workflow slide and its one- and two-tailed diagram were removed because they are not needed for this model-oriented lecture sequence. The source image remains in the lecture assets folder, unused, for now.

## Release policy

- **L03b-alt deck:** the redesigned deck now lives at `lectures/L03b-alt-ttests/` as the unlisted, future-semester version; the live `lectures/L03b-ttests/` deck remains the current-semester version. L03b-alt may be committed and pushed now, but it must not be linked from student navigation until an explicit later decision allows it.
## For later skill design

This note is a living project record, updated after each slide decision. No skill has been created from it yet.
