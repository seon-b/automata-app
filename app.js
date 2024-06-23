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
  setAppState("xCanvasCoordinate", e.clientX);
  setAppState("yCanvasCoordinate", e.clientY);
};

const drawAutomata = (e) => {
  if (appState.component === "state") {
    getCoordinates(e);
    newAutomataGraphics.createState(
      appState.stateName,
      appState.stateType,
      appState.xCanvasCoordinate,
      appState.yCanvasCoordinate
    );
  }
};

canvas.addEventListener("click", drawAutomata);
