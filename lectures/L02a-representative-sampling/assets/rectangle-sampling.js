(() => {
  function seededRandom(seed) {
    let value = seed >>> 0;
    return () => {
      value += 0x6d2b79f5;
      let result = value;
      result = Math.imul(result ^ (result >>> 15), result | 1);
      result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
      return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
    };
  }

  function mean(values) {
    return values.reduce((total, value) => total + value, 0) / values.length;
  }

  function createGroupedPopulation() {
    const random = seededRandom(5402);
    const groups = [
      { id: "A", size: 18, width: [3, 7], height: [2, 6] },
      { id: "B", size: 9, width: [7, 12], height: [6, 10] },
      { id: "C", size: 3, width: [18, 20], height: [13, 15] },
    ];
    let nextId = 1;

    return groups.flatMap((group) =>
      Array.from({ length: group.size }, () => {
        const width = group.width[0] + Math.floor(random() * (group.width[1] - group.width[0] + 1));
        const height = group.height[0] + Math.floor(random() * (group.height[1] - group.height[0] + 1));
        return {
          id: nextId++,
          group: group.id,
          width,
          height,
          area: width * height,
        };
      }),
    );
  }

  function addStyles() {
    if (document.querySelector("style[data-rectangle-sampling-styles]")) return;

    const style = document.createElement("style");
    style.dataset.rectangleSamplingStyles = "";
    style.textContent = `
      .rectangle-sampling-game {
        --game-coral: #ed4b2b;
        --game-coral-dark: #a92c18;
        --game-green: #176d60;
        --game-ink: #193330;
        --game-line: #b8c9c4;
        color: var(--game-ink);
        font-family: inherit;
        margin: 0 auto;
        max-width: 1100px;
      }

      .mean-comparison {
        display: grid;
        column-gap: 1.5rem;
        grid-template-columns: 1fr 1fr auto;
        grid-template-rows: auto auto;
        margin: 0 0 0.65rem;
      }

      .mean-readout {
        align-items: baseline;
        display: flex;
        flex-wrap: wrap;
        column-gap: 0.7rem;
        min-width: 0;
      }

      .mean-label {
        flex-basis: 100%;
        font-size: 18px;
        font-weight: 400;
        line-height: 1.15;
      }

      .mean-value {
        color: var(--game-green);
        font-family: "Crimson Pro", Georgia, serif;
        font-size: 48px;
        font-variant-numeric: lining-nums tabular-nums;
        font-weight: 650;
        line-height: 0.9;
      }

      .mean-readout--sample .mean-value {
        color: var(--game-coral);
      }

      .mean-delta {
        color: #536763;
        font-size: 18px;
        line-height: 1.1;
        min-height: 20px;
      }

      .mean-controls {
        align-items: center;
        align-self: end;
        display: flex;
        gap: 0.8rem;
        padding-bottom: 0.1rem;
      }

      .sample-count {
        color: var(--game-ink);
        font-size: 18px;
        font-variant-numeric: tabular-nums;
        font-weight: 700;
        white-space: nowrap;
      }

      .clear-selection {
        appearance: none;
        background: transparent;
        border: 0;
        color: var(--game-green);
        cursor: pointer;
        font: inherit;
        font-size: 18px;
        padding: 0.2rem 0;
        text-decoration: underline;
        text-decoration-thickness: 1px;
        text-underline-offset: 3px;
      }

      .clear-selection:disabled {
        cursor: default;
        opacity: 0.3;
        text-decoration: none;
      }

      .mean-scale {
        align-items: center;
        display: grid;
        grid-column: 1 / -1;
        grid-template-columns: max-content 1fr max-content;
        margin-top: 0.35rem;
      }

      .mean-track {
        height: 22px;
        margin: 0 0.55rem;
        position: relative;
      }

      .mean-track::before {
        background: var(--game-line);
        content: "";
        height: 2px;
        left: 0;
        position: absolute;
        right: 0;
        top: 10px;
      }

      .mean-gap {
        background: linear-gradient(90deg, var(--game-green), var(--game-coral));
        border-radius: 99px;
        height: 5px;
        position: absolute;
        top: 8.5px;
      }

      .mean-marker {
        position: absolute;
        top: 11px;
        transform: translate(-50%, -50%);
      }

      .mean-marker--population {
        background: var(--game-green);
        height: 12px;
        transform: translate(-50%, -50%) rotate(45deg);
        width: 12px;
      }

      .mean-marker--sample {
        background: var(--game-coral);
        border: 2px solid var(--game-coral-dark);
        border-radius: 50%;
        height: 15px;
        width: 15px;
      }

      .mean-axis-label,
      .mean-axis-caption {
        color: #60736f;
        font-size: 16px;
        font-variant-numeric: tabular-nums;
      }

      .mean-axis-caption {
        left: 50%;
        letter-spacing: 0.04em;
        position: absolute;
        top: 14px;
        transform: translateX(-50%);
        white-space: nowrap;
      }

      .rectangle-choice {
        align-items: center;
        appearance: none;
        background: transparent;
        border: 0;
        cursor: pointer;
        display: flex;
        height: 68px;
        justify-content: center;
        padding: 4px;
      }

      .rectangle-shape {
        background: white;
        border: 2px solid var(--game-ink);
        box-sizing: border-box;
        transition: background 120ms ease, border-color 120ms ease;
      }

      .rectangle-choice:hover .rectangle-shape {
        background: #ffd8cf;
        border-color: var(--game-coral-dark);
      }

      .rectangle-choice:focus-visible {
        outline: 3px solid var(--game-green);
        outline-offset: 1px;
      }

      .rectangle-choice[aria-pressed="true"] .rectangle-shape {
        background: var(--game-coral);
        border: 3px solid var(--game-coral-dark);
      }

      .stratified-bands {
        display: grid;
      }

      .stratified-bands--plain .stratum-band {
        border-top-color: transparent;
      }

      .stratified-bands--plain .stratum-label {
        visibility: hidden;
      }

      .stratum-band {
        align-items: center;
        border-top: 1px solid var(--game-line);
        display: grid;
        gap: 0.8rem;
        grid-template-columns: 155px 1fr;
        padding: 0.4rem 0;
      }

      .stratum-band:first-child {
        border-top: 0;
      }

      .stratum-label {
        display: grid;
        gap: 0.15rem;
      }

      .stratum-name {
        color: var(--game-ink);
        font-size: 18px;
        font-weight: 700;
        line-height: 1.15;
      }

      .stratum-count {
        color: #536763;
        font-size: 16px;
        font-variant-numeric: tabular-nums;
        font-weight: 400;
        line-height: 1.2;
      }

      .stratum-grid {
        display: grid;
        gap: 5px;
      }

      .stratum-band[data-stratum="A"] .stratum-grid,
      .stratum-band[data-stratum="B"] .stratum-grid {
        grid-template-columns: repeat(9, minmax(0, 1fr));
      }

      .stratum-band[data-stratum="C"] .stratum-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      @media (prefers-reduced-motion: reduce) {
        .rectangle-shape {
          transition: none;
        }
      }
    `;
    document.head.append(style);
  }

  function summaryMarkup(populationMean, axisMaximum) {
    const populationPosition = (populationMean / axisMaximum) * 100;
    return `
      <div class="mean-comparison" aria-label="Comparison of population and sample means">
        <div class="mean-readout">
          <span class="mean-label">Population mean</span>
          <strong class="mean-value">${populationMean.toFixed(1)}</strong>
        </div>
        <div class="mean-readout mean-readout--sample">
          <span class="mean-label">Sample mean</span>
          <strong class="mean-value" data-sample-mean aria-live="polite">&mdash;</strong>
          <span class="mean-delta" data-difference aria-live="polite"></span>
        </div>
        <div class="mean-controls">
          <span class="sample-count" data-count aria-live="polite">n = 0</span>
          <button class="clear-selection" type="button" data-reset disabled>Clear</button>
        </div>
        <div class="mean-scale" aria-hidden="true">
          <span class="mean-axis-label">0</span>
          <div class="mean-track">
            <span class="mean-gap" data-mean-gap hidden></span>
            <span class="mean-marker mean-marker--population" style="left: ${populationPosition}%"></span>
            <span class="mean-marker mean-marker--sample" data-sample-marker hidden></span>
            <span class="mean-axis-caption">rectangle area</span>
          </div>
          <span class="mean-axis-label">${axisMaximum}</span>
        </div>
      </div>
    `;
  }

  function createRectangleButton(rectangle, xScale, yScale, stratum = null) {
    const button = document.createElement("button");
    const stratumText = stratum ? ` in group ${stratum}` : "";
    button.className = "rectangle-choice";
    button.type = "button";
    button.dataset.rectangleId = String(rectangle.id);
    button.setAttribute("aria-label", `Rectangle${stratumText}, area ${rectangle.area} square units`);
    button.setAttribute("aria-pressed", "false");
    button.innerHTML = `
      <span
        class="rectangle-shape"
        aria-hidden="true"
        style="width: ${rectangle.width * xScale}px; height: ${rectangle.height * yScale}px"
      ></span>
    `;
    return button;
  }

  function connectSelection(root, population, selectionArea, selected, axisMaximum, afterRender = () => {}) {
    const populationMean = mean(population.map((rectangle) => rectangle.area));
    const sampleMeanValue = root.querySelector("[data-sample-mean]");
    const differenceValue = root.querySelector("[data-difference]");
    const sampleMarker = root.querySelector("[data-sample-marker]");
    const meanGap = root.querySelector("[data-mean-gap]");
    const count = root.querySelector("[data-count]");
    const resetButton = root.querySelector("[data-reset]");

    function render() {
      count.textContent = `n = ${selected.size}`;
      resetButton.disabled = selected.size === 0;

      root.querySelectorAll(".rectangle-choice").forEach((button) => {
        button.setAttribute("aria-pressed", String(selected.has(Number(button.dataset.rectangleId))));
      });

      if (selected.size === 0) {
        sampleMeanValue.textContent = "—";
        differenceValue.textContent = "";
        sampleMarker.hidden = true;
        meanGap.hidden = true;
        afterRender();
        return;
      }

      const sampleAreas = population
        .filter((rectangle) => selected.has(rectangle.id))
        .map((rectangle) => rectangle.area);
      const sampleMean = mean(sampleAreas);
      const difference = sampleMean - populationMean;
      const populationPosition = (populationMean / axisMaximum) * 100;
      const samplePosition = (sampleMean / axisMaximum) * 100;
      sampleMeanValue.textContent = sampleMean.toFixed(1);
      sampleMarker.style.left = `${samplePosition}%`;
      sampleMarker.hidden = false;
      meanGap.style.left = `${Math.min(populationPosition, samplePosition)}%`;
      meanGap.style.width = `${Math.abs(samplePosition - populationPosition)}%`;
      meanGap.hidden = false;

      if (Math.abs(difference) < 0.05) {
        differenceValue.textContent = "matches the population";
      } else {
        const direction = difference > 0 ? "higher" : "lower";
        differenceValue.textContent = `${Math.abs(difference).toFixed(1)} ${direction}`;
      }
      afterRender();
    }

    selectionArea.addEventListener("click", (event) => {
      const button = event.target.closest(".rectangle-choice");
      if (!button) return;

      const id = Number(button.dataset.rectangleId);
      if (selected.has(id)) {
        selected.delete(id);
      } else {
        selected.add(id);
      }
      render();
    });

    resetButton.addEventListener("click", () => {
      selected.clear();
      render();
    });

    render();
  }

  function initialisePopulation(root, showGroups) {
    if (root.dataset.initialised === "true") return;
    root.dataset.initialised = "true";

    const population = createGroupedPopulation();
    const populationMean = mean(population.map((rectangle) => rectangle.area));
    const axisMaximum = Math.ceil(Math.max(...population.map((rectangle) => rectangle.area)) / 25) * 25;
    const selected = new Set();
    const groups = ["A", "B", "C"];
    const plainClass = showGroups ? "" : " stratified-bands--plain";
    const populationLabel = showGroups ? "Population divided into three groups" : "Population of 30 rectangles";

    root.innerHTML = `${summaryMarkup(populationMean, axisMaximum)}<div class="stratified-bands${plainClass}" role="group" aria-label="${populationLabel}"></div>`;
    const bands = root.querySelector(".stratified-bands");

    groups.forEach((group) => {
      const groupPopulation = population.filter((rectangle) => rectangle.group === group);
      const band = document.createElement("div");
      band.className = "stratum-band";
      band.dataset.stratum = group;
      band.innerHTML = `
        <div class="stratum-label"${showGroups ? "" : ' aria-hidden="true"'}>
          <span class="stratum-name">Group ${group}</span>
          <span class="stratum-count" data-stratum-count>0 / ${groupPopulation.length} selected</span>
        </div>
        <div class="stratum-grid"${showGroups ? ` role="group" aria-label="Group ${group}, ${groupPopulation.length} rectangles"` : ""}></div>
      `;
      const grid = band.querySelector(".stratum-grid");
      groupPopulation.forEach((rectangle) => {
        grid.append(createRectangleButton(rectangle, 5, 4, showGroups ? group : null));
      });
      bands.append(band);
    });

    function updateStratumCounts() {
      groups.forEach((group) => {
        const total = population.filter((rectangle) => rectangle.group === group).length;
        const selectedInStratum = population.filter(
          (rectangle) => rectangle.group === group && selected.has(rectangle.id),
        ).length;
        root.querySelector(`[data-stratum="${group}"] [data-stratum-count]`).textContent = `${selectedInStratum} / ${total} selected`;
      });
    }

    connectSelection(root, population, bands, selected, axisMaximum, updateStratumCounts);
  }

  function initialise(root) {
    initialisePopulation(root, false);
  }

  function initialiseStratified(root) {
    initialisePopulation(root, true);
  }

  function start() {
    addStyles();
    document.querySelectorAll("[data-rectangle-sampling-game]").forEach(initialise);
    document.querySelectorAll("[data-stratified-rectangle-game]").forEach(initialiseStratified);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
