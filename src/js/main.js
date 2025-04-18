import '../styles/index.scss'

// import 'core-js/stable'
// import 'regenerator-runtime/runtime'
import Model from './components/Model'
import DrawingCanvas from './components/DrawingCanvas'
import upload from './components/upload'
import BarShell from './components/BarShell'

// Digit Prediction
const digitModel = new Model({
  modelPath: '/saved_models/digit_network_1/js_model/model.json',
  dims: 1,
})
const digitCanvas = new DrawingCanvas({
  canvSelector: '#draw_digit',
  canvSize: 418,
  cellCount: 28,
  cleanButtonSelector: '#clean_digit',
  dims: 1,
})
const digitBarShell = new BarShell({
  canvas: digitCanvas,
  titles: '0123456789',
})
upload({
  inputSelector: '#input_img_digit',
  createdButtonSelector: '#upload_digit',
  createdButtonText: 'Загрузить фото',
  canvas: digitCanvas,
  barShell: digitBarShell,
  extensions: ['.jpeg', '.jpg', '.png', '.JPEG', '.JPG', '.PNG'],
  model: digitModel,
})

digitCanvas.canv.addEventListener('mouseup', () => {
  showPredictions(digitCanvas, digitModel, digitBarShell)
})

digitCanvas.cleanButton.addEventListener('click', () => {
  showPredictions(digitCanvas, digitModel, digitBarShell)
})

// Letter Prediction

const letterModel = new Model({
  modelPath: '/saved_models/letter_network/js_model/model.json',
  dims: 1,
})
const letterCanvas = new DrawingCanvas({
  canvSelector: '#draw_letter',
  canvSize: 418,
  cellCount: 28,
  cleanButtonSelector: '#clean_letter',
  dims: 1,
})
const letterBarShell = new BarShell({
  canvas: letterCanvas,
  titles: 'ЁАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЫЪЭЮЯ',
})
upload({
  inputSelector: '#input_img_letter',
  createdButtonSelector: '#upload_letter',
  createdButtonText: 'Загрузить фото',
  canvas: letterCanvas,
  barShell: letterBarShell,
  extensions: ['.jpeg', '.jpg', '.png', '.JPEG', '.JPG', '.PNG'],
  model: letterModel,
})

letterCanvas.canv.addEventListener('mouseup', () => {
  showPredictions(letterCanvas, letterModel, letterBarShell)
})

letterCanvas.cleanButton.addEventListener('click', () => {
  showPredictions(letterCanvas, letterModel, letterBarShell)
})

// Another
async function showPredictions(canvas, model, barShell) {
  try {
    const imagePixelsData = canvas.getImagePixelsData()
    const preds = await model.getPredictions(imagePixelsData)
    barShell.setProgressValues(preds)
  } catch (err) {
    console.error(err)
  }
}

document.oncontextmenu = () => {
  return false
}
