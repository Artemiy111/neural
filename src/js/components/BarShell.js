export default class BarShell {
  constructor(options = {}) {
    this.canvas = options.canvas;
    this.titles = Array.from(options.titles);
    this.barShell = this.canvas.canv.parentNode.nextElementSibling.children[0];
    this.createBars();
  }
  createBars() {
    for (let key in this.titles) {
      const bar = document.createElement("div");
      bar.classList.add("bar_shell__bar");
      this.barShell.insertAdjacentElement("beforeEnd", bar);

      const title = document.createElement("p");
      title.classList.add("bar__title");
      title.innerText = `${this.titles[key]}`;
      bar.insertAdjacentElement("afterbegin", title);

      const progress = document.createElement("div");
      progress.classList.add("progress");
      bar.insertAdjacentElement("beforeEnd", progress);

      const probabilityValue = document.createElement("p");
      probabilityValue.classList.add("probability_value");
      probabilityValue.innerText = `0%`;
      progress.insertAdjacentElement("afterbegin", probabilityValue);

      const progressValue = document.createElement("div");
      progressValue.classList.add("progress__value");
      progress.insertAdjacentElement("beforeEnd", progressValue);
    }
  }
  setProgressValues(preds) {
    const bars = this.barShell.children;
    for (let i = 0; i < bars.length; i++) {
      const pred = parseFloat(preds[i]);
      const bar = bars[i];
      const progress = bar.children[1];
      const probabilityValue = progress.children[0];
      const progressValue = progress.children[1];
      const color = "rgb(80, 214, 54)";
      probabilityValue.innerHTML = pred + "%";
      progressValue.style.width = pred + "%";
      const k = 1 - pred / 100;
      const [r, g, b] = color
        .slice(4, -2)
        .split(", ")
        .map((color) => parseInt(color));
      r = Math.round(r + (g - r) * k);
      g = Math.round(g + (b - g) * k);
      progressValue.style.backgroundColor = `rgb(${[r, g, b]})`;
    }
  }
}
