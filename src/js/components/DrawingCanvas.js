import cursorBrush from "../../assets/cursor30.svg";
import cursorRubber from "../../assets/cursor60.svg";

export default class DrawingCanvas {
  constructor(canv, canvSize, cellCount) {
    this.canv = canv;
    this.canv.width = this.canv.height = canvSize;
    this.cellCount = cellCount;
    this.cellSize = canvSize / cellCount;
    this.ctx = this.canv.getContext("2d");
    this.ctx.lineJoin = "round";
    this.ctx.lineCap = "round";
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
  // drawLine(x1, y1, x2, y2, strokeStyle = this.stroke.style.brush) {
  //   let strkStyle = this.ctx.strokeStyle;
  //   this.ctx.strokeStyle = strokeStyle;
  //   this.ctx.beginPath();
  //   this.ctx.moveTo(x1, y1);
  //   this.ctx.lineTo(x2, y2);
  //   this.ctx.stroke();
  //   this.ctx.fill();
  //   this.ctx.strokeStyle = strkStyle;
  // }
  // drawCell() {
  //   for (let x = this.cellSize; x < this.canv.height; x += this.cellSize) {
  //     this.drawLine(x, 0, x, this.canv.height);
  //   }
  //   for (let y = this.cellSize; y < this.canv.width; y += this.cellSize) {
  //     this.drawLine(0, y, this.canv.width, y);
  //   }
  // }
  drawByMouse() {
    this.canv.addEventListener(
      "mousemove",
      ((self) => (event) => {
        if (event.buttons === 1) {
          self.ctx.strokeStyle = self.stroke.style.brush;
          self.ctx.lineWidth = self.line.width.brush;
          self.canv.style.cursor = self.cursor.brush;
          self.ctx.beginPath();
          self.ctx.moveTo(event.offsetX, event.offsetY);
          self.ctx.lineTo(
            event.offsetX - event.movementX,
            event.offsetY - event.movementY
          );
          self.ctx.stroke();
          self.ctx.closePath();
        }
        if (event.buttons === 2) {
          self.ctx.strokeStyle = self.stroke.style.rubber;
          self.ctx.lineWidth = self.line.width.rubber;
          self.canv.style.cursor = self.cursor.rubber;

          self.ctx.beginPath();
          self.ctx.moveTo(event.offsetX, event.offsetY);
          self.ctx.lineTo(
            event.offsetX - event.movementX,
            event.offsetY - event.movementY
          );
          self.ctx.stroke();
          self.ctx.closePath();
        }
      })(this)
    );
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
