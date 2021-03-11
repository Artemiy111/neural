import * as tf from "@tensorflow/tfjs";

export default class Model {
  constructor(options = {}) {
    this.modelPath = options.modelPath;
    this.dims = options.dims;
  }

  async loadModel() {
    try {
      const model = await tf.loadLayersModel(this.modelPath);
      return model;
    } catch (err) {
      console.error(err);
    }
  }

  async getPredictions(imageData) {
    try {
      const model = await this.loadModel();
      const predictions = tf.tidy(() => {
        let img = tf.tensor4d(imageData.flat().flat(), [1, 28, 28, this.dims]);
        const output = Array.from(model.predict(img).dataSync()).map((data) =>
          (data * 100).toFixed(2)
        );
        return output;
      });
      return predictions;
    } catch (err) {
      console.error(err);
    }
  }
}
