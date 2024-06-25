import FiniteAutomata from "./automata.js";
import { AutomataGraphics } from "./automataGraphics.js";

const canvas = document.querySelector("#canvas");
let canvasRect = canvas.getBoundingClientRect();

let automataData = document.querySelector("#automataData");
let changeStateButton = document.querySelector("#changeStateButton");
let drawButton = document.querySelector("#drawButton");
let eraseButton = document.querySelector("#eraseButton");
let parseButton = document.querySelector("#parse");
let stateButton = document.querySelector("#stateButton");
let submitButton = document.querySelector("#submit");
let transitionButton = document.querySelector("#transitionButton");

let appState = {
  automataData: "",
  automataType: "",
  component: "state",
  drawButtonName: "Draw",
  eraseButtonName: "Erase",
  stateButtonName: "Final State",
  drawingMode: "active",
  eraseMode: "inactive",
  stateName: "undefined",
  stateRadius: 40,
  stateType: "non-final",
  nextXCanvasCoordinate: canvasRect.x,
  nextYCanvasCoordinate: canvasRect.y,
  xCanvasCoordinate: canvasRect.x,
  yCanvasCoordinate: canvasRect.y,
};

let newAutomataGraphics = new AutomataGraphics();

const setAppState = (stateName, newStateValue) => {
  if (stateName === "automataData") {
    appState = { ...appState, automataData: newStateValue };
  } else if (stateName === "automataType") {
    appState = { ...appState, automataType: newStateValue };
  } else if (stateName === "component") {
    appState = { ...appState, component: newStateValue };
  } else if (stateName === "drawingMode") {
    appState = { ...appState, drawingMode: newStateValue };
  } else if (stateName === "eraseMode") {
    appState = { ...appState, eraseMode: newStateValue };
  } else if (stateName === "stateName") {
    appState = { ...appState, stateName: newStateValue };
  } else if (stateName === "stateRadius") {
    appState = { ...appState, stateRadius: newStateValue };
  } else if (stateName === "stateType") {
    appState = { ...appState, stateType: newStateValue };
  } else if (stateName === "nextXCanvasCoordinate") {
    appState = { ...appState, nextXCanvasCoordinate: newStateValue };
  } else if (stateName === "nextYCanvasCoordinate") {
    appState = { ...appState, nextYCanvasCoordinate: newStateValue };
  } else if (stateName === "xCanvasCoordinate") {
    appState = { ...appState, xCanvasCoordinate: newStateValue };
  } else if (stateName === "yCanvasCoordinate") {
    appState = { ...appState, yCanvasCoordinate: newStateValue };
  } else {
  }
};

const getAutomataData = (e) => {
  let inputData = e.target.value;
  if (appState.component === "state") changePlaceHolderText("Enter state name");
  setAppState("automataData", inputData);
};
const getCoordinates = (e) => {
  setAppState("xCanvasCoordinate", e.clientX - canvasRect.x);
  setAppState("yCanvasCoordinate", e.clientY - canvasRect.y);
};

const selectStateComponent = () => {
  if (appState.component === "transition arrow") {
    setAppState("component", "state");
  }
};

const selectTransitionComponent = () => {
  if (appState.component === "state") {
    setAppState("component", "transition arrow");
  }
};

const changePlaceHolderText = (text) => {
  if (appState.component === "state") {
    automataData.getAttributeNode("placeholder").value = text;
  }
};

const drawAutomata = (e) => {
  if (appState.component === "state" && appState.drawingMode === "active") {
    getCoordinates(e);
    newAutomataGraphics.createState(
      appState.stateName,
      appState.stateType,
      appState.xCanvasCoordinate,
      appState.yCanvasCoordinate,
      appState.stateRadius
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

const toggleDrawingMode = () => {
  if (appState.drawingMode === "active") {
    setAppState("drawingMode", "inactive");
    setAppState("eraseMode", "active");
  } else {
    setAppState("drawingMode", "active");
    setAppState("eraseMode", "inactive");
  }
};

const toggleEraseMode = () => {
  if (appState.eraseMode === "active") {
    setAppState("eraseMode", "inactive");
    setAppState("drawingMode", "active");
  } else {
    setAppState("eraseMode", "active");
    setAppState("drawingMode", "inactive");
  }
};

const toggleStateType = () => {
  if (appState.stateType === "final") {
    setAppState("stateType", "non-final");
  } else {
    setAppState("stateType", "final");
  }
};

automataData.addEventListener("input", getAutomataData);
canvas.addEventListener("click", drawAutomata);
changeStateButton.addEventListener("click", toggleStateType);
drawButton.addEventListener("click", toggleDrawingMode);
eraseButton.addEventListener("click", toggleEraseMode);
stateButton.addEventListener("click", selectStateComponent);
transitionButton.addEventListener("click", selectTransitionComponent);
