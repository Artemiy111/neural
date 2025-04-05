export default class BarShell {
  constructor(options = {}) {
    this.canvas = options.canvas
    this.titles = Array.from(options.titles)
    this.barShell = this.canvas.canv.parentNode.nextElementSibling.children[0]
    this.createBars()
  }
  createBars() {
    for (let key in this.titles) {
      const bar = `
      <div class="bar_shell__bar">
        <p class="bar__title">${this.titles[key]}</p>
        <div class="progress">
          <p class="probability_value">0%</p>
          <div class="progress__value"></div>
        </div>
      </div>
      `
      this.barShell.insertAdjacentHTML('beforeEnd', bar)
    }
  }
  setProgressValues(preds) {
    const bars = this.barShell.children
    for (let i = 0; i < bars.length; i++) {
      const pred = parseFloat(preds[i])
      const bar = bars[i]
      const progress = bar.children[1]
      const probabilityValue = progress.children[0]
      const progressValue = progress.children[1]
      const color = 'rgb(80, 214, 54)'
      probabilityValue.innerHTML = pred + '%'
      progressValue.style.width = pred + '%'
      const k = 1 - pred / 100
      let [r, g, b] = color
        .slice(4, -2)
        .split(', ')
        .map(color => parseInt(color))
      r = Math.round(r + (g - r) * k)
      g = Math.round(g + (b - g) * k)
      progressValue.style.backgroundColor = `rgb(${[r, g, b]})`
    }
  }
}
