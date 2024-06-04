const canvas = document.querySelector("#canvas");
const canvasContext = canvas.getContext("2d");

export class AutomataGraphics {
  constructor(automataType) {
    this.automataType = automataType;
    this.context = canvasContext;
  }

  createState(
    name = "undefined",
    xCoordinate,
    yCoordinate,
    symbolsArray = "undefined"
  ) {
    this.context.beginPath();
    this.context.arc(xCoordinate, yCoordinate, 25, 0, Math.PI * 2, false);
    this.context.stroke();
  }
}
