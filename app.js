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
  stateLocationCoordinates: [],
  stateName: "undefined",
  stateRadius: 40,
  stateType: "non-final",
  stateLimit: 5,
  selectedObject1: { xCoordinate: undefined, yCoordinate: undefined },
  selectedObject2: { xCoordinate: undefined, yCoordinate: undefined },
  selectedObjectCount: 0,
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
  } else if (stateName === "selectedObject1") {
    appState = { ...appState, selectedObject1: newStateValue };
  } else if (stateName === "selectedObject2") {
    appState = { ...appState, selectedObject2: newStateValue };
  } else if (stateName === "selectedObjectCount") {
    appState = { ...appState, selectedObjectCount: newStateValue };
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

const getCoordinates = (coordinateType, e) => {
  if (coordinateType === "canvas coordinates") {
    setAppState("xCanvasCoordinate", e.clientX - canvasRect.x);
    setAppState("yCanvasCoordinate", e.clientY - canvasRect.y);
  } else if (coordinateType === "object coordinates") {
    let currentObject = {
      xCoordinate: e.clientX - canvasRect.x,
      yCoordinate: e.clientY - canvasRect.y,
    };
    if (appState.selectedObjectCount === 0) {
      setAppState("selectedObject1", currentObject);
    } else if (appState.selectedObjectCount === 1) {
      setAppState("selectedObject2", currentObject);
    } else {
    }
  } else {
  }
};

// const getObjectLocations = ()=>{

// }

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
  if (appState.stateLocationCoordinates.length === appState.stateLimit)
    return alert(`Cannot create more than ${appState.stateLimit} states`);
  if (appState.component === "state" && appState.drawingMode === "active") {
    getCoordinates("canvas coordinates", e);
    let newState = {
      stateName: appState.stateName,
      stateType: appState.stateType,
      xCoordinate: appState.xCanvasCoordinate,
      yCoordinate: appState.yCanvasCoordinate,
      radius: appState.stateRadius,
    };
    appState.stateLocationCoordinates.push(newState);

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
    getCoordinates("object coordinates", e);
    modifySelectedObjectCount();
    newAutomataGraphics.createNextTransition(
      "1",
      appState.selectedObject1.xCoordinate,
      appState.selectedObject1.yCoordinate,
      appState.selectedObject2.xCoordinate,
      appState.selectedObject2.yCoordinate
    );
    if (appState.selectedObjectCount === 1) appState.selectedObjectCount = 2;
    if (appState.selectedObjectCount > 1) {
      let currentObject = {
        xCoordinate: undefined,
        yCoordinate: undefined,
      };

      setAppState("selectedObject1", currentObject.xCoordinate);
      setAppState("selectedObject1", currentObject.yCoordinate);
      setAppState("selectedObject2", currentObject.xCoordinate);
      setAppState("selectedObject2", currentObject.yCoordinate);
    }
  }
};

const modifySelectedObjectCount = (currentCount) => {
  if (
    appState.component === "transition arrow" &&
    appState.drawingMode === "active"
  ) {
    if (currentCount === 0) return 0;

    currentCount++;

    return currentCount;
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
