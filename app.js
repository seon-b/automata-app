import FiniteAutomata from "./automata.js";
import { AutomataGraphics } from "./automataGraphics.js";

const canvas = document.querySelector("#canvas");
let canvasRect = canvas.getBoundingClientRect();

let appState = {
  component: "state",
  drawingMode: "active",
  stateName: "undefined",
  stateRadius: 40,
  stateType: "non-final",
  xCanvasCoordinate: canvasRect.x,
  yCanvasCoordinate: canvasRect.y,
  nextXCanvasCoordinate: canvasRect.x,
  nextYCanvasCoordinate: canvasRect.y,
};

let newAutomataGraphics = new AutomataGraphics();

const setAppState = (stateName, newStateValue) => {
  if (stateName === "xCanvasCoordinate") {
    appState = { ...appState, xCanvasCoordinate: newStateValue };
  } else if (stateName === "yCanvasCoordinate") {
    appState = { ...appState, yCanvasCoordinate: newStateValue };
  } else if (stateName === "drawingMode") {
    appState = { ...appState, drawingMode: newStateValue };
  } else if (stateName === "component") {
    appState = { ...appState, component: newStateValue };
  }
};

const getCoordinates = (e) => {
  setAppState("xCanvasCoordinate", e.clientX - canvasRect.x);
  setAppState("yCanvasCoordinate", e.clientY - canvasRect.y);
};

const drawAutomata = (e) => {
  if (appState.component === "state" && appState.drawingMode === "active") {
    getCoordinates(e);
    newAutomataGraphics.createState(
      appState.stateName,
      appState.stateType,
      appState.xCanvasCoordinate,
      appState.yCanvasCoordinate
    );
  } else if (
    appState.component === "transition arrow" &&
    appState.drawingMode === "active"
  ) {
    let currentXCoordinate = appState.xCanvasCoordinate;
    let currentYCoordinate = appState.yCanvasCoordinate;
    newAutomataGraphics.createNextTransition();
  }
};

canvas.addEventListener("click", drawAutomata);
