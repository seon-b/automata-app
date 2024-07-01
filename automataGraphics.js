const canvas = document.querySelector("#canvas");
const canvasContext = canvas.getContext("2d");

export class AutomataGraphics {
  constructor(automataType = "DFA") {
    this.automataType = automataType;
    this.context = canvasContext;
  }

  createState(name, stateType, xCoordinate, yCoordinate, radius) {
    if (stateType === "final") this.context.lineWidth = 5;
    if (stateType === "non-final") this.context.lineWidth = 1;
    this.context.beginPath();
    this.context.arc(xCoordinate, yCoordinate, radius, 0, Math.PI * 2, false);
    this.context.stroke();
  }

  createNextTransition(
    transitionValue,
    xCoordinate,
    yCoordinate,
    xCoordinate2,
    yCoordinate2,
    radius
  ) {
    if (xCoordinate > xCoordinate2) {
      this.context.beginPath();
      this.context.moveTo(xCoordinate - radius, yCoordinate);
      this.context.lineTo(xCoordinate2 + radius, yCoordinate2);
      this.context.stroke();
    } else {
      this.context.beginPath();
      this.context.moveTo(xCoordinate + radius, yCoordinate);
      this.context.lineTo(xCoordinate2 - radius, yCoordinate2);
      this.context.stroke();
    }
  }
}
