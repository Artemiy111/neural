export default function upload(selector, canvas, options = {}) {
  const input = document.querySelector(selector);
  const download = document.createElement("button");

  download.classList.add("btn");
  download.setAttribute("id", "download");
  download.textContent = "Загрузить фото";
  input.insertAdjacentElement("afterend", download);

  if (options.extensions && Array.isArray(options.extensions)) {
    input.setAttribute("accept", options.extensions.join(","));
  }

  const inputClick = () => {
    input.click();
  };

  const changeHandler = (event) => {
    if (!event.target.files.length) {
      return;
    }
    const file = Array.from(event.target.files)[0];

    const reader = new FileReader();

    const img = new Image();
    reader.onload = (event) => {
      img.src = event.target.result;
      img.onload = () => {
        try {
          canvas.ctx.drawImage(
            img,
            0,
            0,
            canvas.canv.width,
            canvas.canv.height
          );

          let imagePixelsData = canvas.getImagePixelsData();
          getPredictions(imagePixelsData).then((data) => {
            setProgressValue(data);
          });
          img.src = "";
        } catch (err) {
          console.log("Img: ", err);
        }
      };
    };

    reader.readAsDataURL(file);
  };

  download.addEventListener("click", inputClick);
  input.addEventListener("change", changeHandler);
}
