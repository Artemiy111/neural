import "core-js/stable";
import "regenerator-runtime/runtime";
import * as tf from "@tensorflow/tfjs";

import "../scss/index.scss";
import DrawingCanvas from "./components/DrawingCanvas";
import upload from "./components/upload";

const modelPath = "../assets/saved_models/digit_network_1/js_model/model.json";

async function loadModel() {
  try {
    const model = await tf.loadLayersModel(modelPath);
    return model;
  } catch (err) {
    console.error(err);
  }
}

async function getPredictions(imageData) {
  const model = await loadModel();
  try {
    const predictions = tf.tidy(() => {
      let img = tf.tensor4d(imageData.flat(), [1, 28, 28, 1]);
      const output = Array.from(model.predict(img).dataSync()).map((data) =>
        (data * 100).toFixed(2)
      );
      return output;
    });
    console.log(predictions);
    return predictions;
  } catch (err) {
    console.error(err);
  }
}

const canvas = new DrawingCanvas(
  document.querySelector("#draw_picture"),
  420,
  28
);

upload("#file", canvas, {
  extensions: [".jpeg", ".jpg", ".png", ".JPEG", ".JPG", ".PNG"],
});

canvas.drawByMouse();

function setProgressValue(pred) {
  const probabilities = [...document.getElementsByClassName("probability")];
  const progressValues = [
    ...document.getElementsByClassName("progress__value"),
  ];
  const color = "rgb(80, 214, 54)";
  for (let i = 0; i < pred.length; i++) {
    progressValues[i].style.width = `${pred[i]}%`;
    probabilities[i].innerHTML = `${pred[i]}%`;
    let k = 1 - pred[i] / 100;
    let [r, g, b] = color
      .slice(4, -2)
      .split(", ")
      .map((color) => parseInt(color));
    r = Math.round(r + (g - r) * k);
    g = Math.round(g + (b - g) * k);
    progressValues[i].style.backgroundColor = `rgb(${[r, g, b]})`;
  }
}

const buttonClean = document.querySelector("#clean");

canvas.canv.addEventListener("mouseup", (event) => {
  let imagePixelsData = canvas.getImagePixelsData();
  getPredictions(imagePixelsData).then((data) => {
    setProgressValue(data);
  });
});

buttonClean.addEventListener("click", () => {
  canvas.ctx.fillStyle = canvas.fill.style.rubber;
  canvas.ctx.fillRect(0, 0, canvas.canv.height, canvas.canv.height);
});
