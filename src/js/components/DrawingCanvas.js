import cursorBrush from "../../assets/cursor30.svg";
import cursorRubber from "../../assets/cursor60.svg";

export default class DrawingCanvas {
  constructor(options = {}) {
    this.canv = document.querySelector(options.canvSelector);
    this.canv.width = this.canv.height = options.canvSize;
    this.cellCount = options.cellCount;
    this.cellSize = options.canvSize / options.cellCount;
    this.ctx = this.canv.getContext("2d");
    this.ctx.lineJoin = "round";
    this.ctx.lineCap = "round";
    this.cleanButton = document.querySelector(options.cleanButtonSelector);
    this.canv.addEventListener("mousemove", (event) => {
      this.drawByMouse(event);
    });

    this.cleanButton.addEventListener("click", () => {
      this.clean();
    });
  }
  isMouseDown = false;
  stroke = {
    style: {
      brush: "#111",
      rubber: "#fff",
    },
  };
  fill = {
    style: {
      rubber: "#fff",
    },
  };
  line = {
    width: {
      brush: 30,
      rubber: 60,
    },
  };
  cursor = {
    brush: `url("${cursorBrush}") 15 15, pointer`,
    rubber: `url("${cursorRubber}") 30 30, pointer`,
  };

  clean() {
    this.ctx.fillStyle = this.fill.style.rubber;
    this.ctx.fillRect(0, 0, this.canv.height, this.canv.height);
  }
  drawByMouse(event) {
    if (event.buttons === 1) {
      this.ctx.strokeStyle = this.stroke.style.brush;
      this.ctx.lineWidth = this.line.width.brush;
      this.canv.style.cursor = this.cursor.brush;
      this.ctx.beginPath();
      this.ctx.moveTo(event.offsetX, event.offsetY);
      this.ctx.lineTo(
        event.offsetX - event.movementX,
        event.offsetY - event.movementY
      );
      this.ctx.stroke();
      this.ctx.closePath();
    }
    if (event.buttons === 2) {
      this.ctx.strokeStyle = this.stroke.style.rubber;
      this.ctx.lineWidth = this.line.width.rubber;
      this.canv.style.cursor = this.cursor.rubber;

      this.ctx.beginPath();
      this.ctx.moveTo(event.offsetX, event.offsetY);
      this.ctx.lineTo(
        event.offsetX - event.movementX,
        event.offsetY - event.movementY
      );
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }
  getImagePixelsData() {
    const imagePixelsData = new Array(28).fill().map(() => Array(28).fill(0));
    let i = 0;
    for (let x = 0; x < this.canv.height; x += this.cellSize) {
      let j = 0;
      for (let y = 0; y < this.canv.width; y += this.cellSize) {
        const data = this.ctx.getImageData(x, y, this.cellSize, this.cellSize);
        this.ctx.putImageData(data, x, y);

        const grayScale = (
          r = data.data[0],
          g = data.data[1],
          b = data.data[2]
        ) => {
          return Math.round(r * 0.299 + g * 0.587 + b * 0.114) === 0
            ? 0
            : 255 - Math.round(r * 0.299 + g * 0.587 + b * 0.114);
        };
        imagePixelsData[j][i] = grayScale();
        j++;
      }
      i++;
    }
    return imagePixelsData;
  }
}
