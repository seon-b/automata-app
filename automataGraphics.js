const canvas = document.querySelector("#canvas");
const canvasContext = canvas.getContext("2d");

export class AutomataGraphics {
  constructor(automataType = "DFA") {
    this.automataType = automataType;
    this.context = canvasContext;
  }

  addText(text, xCoordinate, yCoordinate) {
    this.context.font = "20px serif";
    this.context.textAlign = "right-aligned";
    this.context.fillText(text, xCoordinate, yCoordinate);
  }

  clearAll() {
    this.context.clearRect(0, 0, canvas.width, canvas.height);
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
      this.context.lineWidth = 1;
      this.context.lineTo(xCoordinate2 + radius, yCoordinate2);
      this.context.stroke();
    } else {
      this.context.beginPath();
      this.context.moveTo(xCoordinate + radius, yCoordinate);
      this.context.lineWidth = 1;
      this.context.lineTo(xCoordinate2 - radius, yCoordinate2);
      this.context.lineTo(xCoordinate2 - radius - 10, yCoordinate2 + 6);
      this.context.moveTo(xCoordinate2 - radius, yCoordinate2);
      this.context.lineTo(xCoordinate2 - radius - 10, yCoordinate2 - 6);
      this.context.stroke();
    }

    this.addText(
      transitionValue,
      (xCoordinate + xCoordinate2) / 2,
      (yCoordinate + yCoordinate2) / 2
    );
  }
}
