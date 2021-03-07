import "core-js/stable";
import "regenerator-runtime/runtime";

import "../scss/index.scss";
import Model from "./components/Model";
import DrawingCanvas from "./components/DrawingCanvas";
import upload from "./components/upload";

const model = new Model();

const canvas = new DrawingCanvas({
  canv: document.querySelector("#draw_picture"),
  canvSize: 420,
  cellCount: 28,
  cleanButton: document.querySelector("#clean"),
});

upload({
  inputSelector: "#file",
  createdButtonSelector: "#upload",
  createdButtonText: "Загрузить фото",
  canvas: canvas,
  extensions: [".jpeg", ".jpg", ".png", ".JPEG", ".JPG", ".PNG"],
});

canvas.canv.addEventListener("mouseup", async () => {
  const imagePixelsData = canvas.getImagePixelsData();
  const preds = await model.getPredictions(imagePixelsData);
  canvas.setProgressValues(preds);
});

document.oncontextmenu = () => {
  return false;
};
