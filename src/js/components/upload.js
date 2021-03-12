import Model from "./Model";

export default function upload(options = {}) {
  const input = document.querySelector(options.inputSelector);
  const canvas = options.canvas;
  const barShell = options.barShell;
  const uploadButton = document.createElement("button");
  const model = options.model;

  uploadButton.classList.add("btn");
  uploadButton.setAttribute("id", options.createdButtonSelector.slice(1));
  uploadButton.textContent = options.createdButtonText;
  input.insertAdjacentElement("afterend", uploadButton);

  if (options.extensions && Array.isArray(options.extensions)) {
    input.setAttribute("accept", options.extensions.join(","));
  }

  const inputClick = () => {
    input.click();
  };

  const img = new Image();
  const changeHandler = (input) => {
    const reader = new FileReader();
    // console.log(new Blob([file], { type: "image" }));
    input.addEventListener("change", (event) => {
      if (!event.target.files.length) {
        return;
      }
      const file = Array.from(event.target.files)[0];
      reader.addEventListener("load", (event) => {
        img.src = event.target.result;
        img.onload = drawImage;
      });
      reader.readAsDataURL(file);
    });

    async function drawImage() {
      try {
        canvas.ctx.drawImage(img, 0, 0, canvas.canv.width, canvas.canv.height);
        const imagePixelsData = canvas.getImagePixelsData();
        const preds = await model.getPredictions(imagePixelsData);
        barShell.setProgressValues(preds);
      } catch (err) {
        console.error("Img: ", err);
      }
    }
  };

  uploadButton.addEventListener("click", inputClick);
  input.addEventListener("click", changeHandler.bind(null, input));
}
