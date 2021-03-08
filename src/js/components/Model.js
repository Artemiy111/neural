import * as tf from "@tensorflow/tfjs";

const modelPath = "../assets/saved_models/digit_network_1/js_model/model.json";

export default class Model {
  constructor(options = {}) {
    this.modelPath = options.modelPath;
    // console.log(this.modelPaths);
  }

  async loadModel() {
    try {
      const model = await tf.loadLayersModel(modelPath);
      return model;
    } catch (err) {
      console.error(err);
    }
  }

  async getPredictions(imageData) {
    const model = await this.loadModel();
    try {
      const predictions = tf.tidy(() => {
        let img = tf.tensor4d(imageData.flat(), [1, 28, 28, 1]);
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
