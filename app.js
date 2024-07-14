import FiniteAutomata from "./automata.js";
import { AutomataGraphics } from "./automataGraphics.js";
import {
  errorObject,
  isInputEmpty,
  isValidNumberOfStates,
  isValidNumberOfTransitions,
  setErrorObject,
  validateInput,
} from "./error.js";

const canvas = document.querySelector("#canvas");

let automataData = document.querySelector("#automataData");
let changeStateButton = document.querySelector("#changeStateButton");
let drawButton = document.querySelector("#drawButton");
let eraseButton = document.querySelector("#eraseButton");
let errorDisplay = document.querySelector("#errorDisplay");
let parseButton = document.querySelector("#parse");
let stateButton = document.querySelector("#stateButton");
let submitButton = document.querySelector("#submit");
let transitionArrowButton = document.querySelector("#transitionArrowButton");

let automataDataInput = document.querySelector("#automataData");
let inputStringData = document.querySelector("#inputStringData");

errorDisplay.style.height = "20px";
errorDisplay.style.width = "300px";
errorDisplay.style.padding = "10px";
errorDisplay.style.border = "2px";

let canvasRect = canvas.getBoundingClientRect();

let appState = {
  automataData: [],
  automataType: "",
  changeStateTypeButton: "Change State Type",
  component: "state",
  currentAutomataStates: [],
  drawButtonName: "Draw",
  eraseButtonName: "Erase",
  drawingMode: "active",
  eraseMode: "inactive",
  inputStringData: [],
  stateButtonName: "Final State",
  transitionArrowButtonName: "Transition Arrow",
  stateName: "",
  stateRadius: 40,
  stateType: "non-final",
  stateLimit: 5,
  selectedObject1: { xCoordinate: undefined, yCoordinate: undefined },
  selectedObject2: { xCoordinate: undefined, yCoordinate: undefined },
  selectStateButtonName: "Select State",
  symbols: "",
  xCanvasCoordinate: canvasRect.x,
  yCanvasCoordinate: canvasRect.y,
};

let newAutomataGraphics = new AutomataGraphics();

const setAppState = (stateName, newStateValue) => {
  if (stateName === "automataData") {
    appState = { ...appState, automataData: newStateValue };
  } else if (stateName === "automataType") {
    appState = { ...appState, automataType: newStateValue };
  } else if (stateName === "changeStateTypeButton") {
    appState = { ...appState, changeStateTypeButton: newStateValue };
  } else if (stateName === "component") {
    appState = { ...appState, component: newStateValue };
  } else if (stateName === "currentAutomataStates") {
    appState = { ...appState, currentAutomataStates: newStateValue };
  } else if (stateName === "drawButtonName") {
    appState = { ...appState, drawButtonName: newStateValue };
  } else if (stateName === "eraseButtonName") {
    appState = { ...appState, eraseButtonName: newStateValue };
  } else if (stateName === "drawingMode") {
    appState = { ...appState, drawingMode: newStateValue };
  } else if (stateName === "eraseMode") {
    appState = { ...appState, eraseMode: newStateValue };
  } else if (stateName === "inputStringData") {
    appState = { ...appState, inputStringData: newStateValue };
  } else if (stateName === "stateButtonName") {
    appState = { ...appState, stateButtonName: newStateValue };
  } else if (stateName === "transitionArrowButtonName") {
    appState = { ...appState, transitionArrowButtonName: newStateValue };
  } else if (stateName === "stateName") {
    appState = { ...appState, stateName: newStateValue };
  } else if (stateName === "stateRadius") {
    appState = { ...appState, stateRadius: newStateValue };
  } else if (stateName === "stateType") {
    appState = { ...appState, stateType: newStateValue };
  } else if (stateName === "stateLimit") {
    appState = { ...appState, stateLimit: newStateValue };
  } else if (stateName === "selectedObject1") {
    appState = { ...appState, selectedObject1: newStateValue };
  } else if (stateName === "selectedObject2") {
    appState = { ...appState, selectedObject2: newStateValue };
  } else if (stateName === "selectStateButtonName") {
    appState = { ...appState, selectStateButtonName: newStateValue };
  } else if (stateName === "symbols") {
    appState = { ...appState, symbols: newStateValue };
  } else if (stateName === "xCanvasCoordinate") {
    appState = { ...appState, xCanvasCoordinate: newStateValue };
  } else if (stateName === "yCanvasCoordinate") {
    appState = { ...appState, yCanvasCoordinate: newStateValue };
  } else {
  }
};

const getAutomataData = () => {
  if (isInputEmpty(automataDataInput.value) === true) {
    setErrorObject("cannot have empty input");
    displayError();
    return;
  }

  if (appState.component === "state") {
    let inputData = automataDataInput.value.split(" ");

    setAppState("automataData", inputData);
  } else if (appState.component === "transition arrow") {
    let inputData = automataDataInput.value.split("").filter((e) => e !== " ");
    if (
      isValidNumberOfTransitions(inputData.length, appState.stateLimit) === true
    ) {
      setAppState("automataData", inputData);
    } else {
      setAppState("automataData", []);
      setErrorObject(
        `cannot have more than ${appState.stateLimit - 1} transitions`
      );

      displayError();
    }
  } else {
  }
};

const getInputStringData = () => {
  if (isInputEmpty(inputStringData.value) === true) {
    setErrorObject("cannot have empty input");
    return;
  }

  let inputData = inputStringData.value;

  if (validateInput("input", inputData) === true) {
  } else {
    setAppState("inputStringData", inputData.split(""));
  }
};

const getCoordinates = (e) => {
  setAppState("xCanvasCoordinate", e.clientX - canvasRect.x);
  setAppState("yCanvasCoordinate", e.clientY - canvasRect.y);
};

const selectStateComponent = () => {
  if (appState.component === "transition arrow") {
    setAppState("component", "state");
    changePlaceHolderText("Enter state name");
  }
};

const selectTransitionComponent = () => {
  if (appState.component === "state") {
    setAppState("component", "transition arrow");
    changePlaceHolderText("Enter transition values");
  }
};

const changePlaceHolderText = (text) => {
  if (appState.component === "state") {
    automataData.getAttributeNode("placeholder").value = text;
  } else if (appState.component === "transition arrow") {
    automataData.getAttributeNode("placeholder").value = text;
  } else {
  }
};

const drawAutomata = (e) => {
  if (
    isValidNumberOfStates(
      appState.currentAutomataStates.length,
      appState.stateLimit
    ) === false
  ) {
    setErrorObject(`Cannot create more than ${appState.stateLimit} states`);
    displayError();
    return;
  }
  if (appState.component === "state" && appState.drawingMode === "active") {
    getCoordinates(e);
    let newState = {
      stateName: appState.stateName,
      stateType: appState.stateType,
      xCoordinate: appState.xCanvasCoordinate,
      yCoordinate: appState.yCanvasCoordinate,
      radius: appState.stateRadius,
      isConnectedToNextState: false,
      isConnectedToPreviousState: false,
    };
    storeAutomataState(newState);

    newAutomataGraphics.createState(
      appState.stateName,
      appState.stateType,
      appState.xCanvasCoordinate,
      appState.yCanvasCoordinate,
      appState.stateRadius
    );
    connectStates(appState.currentAutomataStates);
  } else if (
    appState.component === "transition arrow" &&
    appState.drawingMode === "active"
  ) {
    getCoordinates(e);

    // newAutomataGraphics.createNextTransition(
    //   "1",
    //   appState.selectedObject1.xCoordinate,
    //   appState.selectedObject1.yCoordinate,
    //   appState.selectedObject2.xCoordinate,
    //   appState.selectedObject2.yCoordinate,
    //   appState.stateRadius
    // );
  }
};

const displayError = () => {
  if (errorObject.errorMessage !== "") {
    errorDisplay.innerHTML = errorObject.errorMessage;
    errorDisplay.classList.add("errorStyle");
    updateCanvasRect();
    setTimeout(() => {
      setErrorObject("");
      updateCanvasRect();
      errorDisplay.innerHTML = errorObject.errorMessage;
      errorDisplay.classList.remove("errorStyle");
    }, 1000);
  }
};

const connectStates = () => {
  if (appState.currentAutomataStates === 0) return alert("No states present");

  let currentObject = {
    xCoordinate: "",
    yCoordinate: "",
  };

  let nextObject = {
    xCoordinate: "",
    yCoordinate: "",
  };

  let currentTransitionValue = "";

  for (let i = 0; i < appState.currentAutomataStates.length; i++) {
    if (
      appState.currentAutomataStates.length === 0 ||
      appState.currentAutomataStates.length === 1
    )
      return;

    currentObject.xCoordinate = appState.currentAutomataStates[i].xCoordinate;
    currentObject.yCoordinate = appState.currentAutomataStates[i].yCoordinate;
    nextObject.xCoordinate = appState.currentAutomataStates[i + 1].xCoordinate;
    nextObject.yCoordinate = appState.currentAutomataStates[i + 1].yCoordinate;

    setAppState("selectedObject1", currentObject);
    setAppState("selectedObject2", nextObject);

    if (appState.automataData.length === 0) {
      currentTransitionValue = "";
    } else {
      currentTransitionValue = appState.automataData[i];
    }

    newAutomataGraphics.createNextTransition(
      currentTransitionValue,
      appState.selectedObject1.xCoordinate,
      appState.selectedObject1.yCoordinate,
      appState.selectedObject2.xCoordinate,
      appState.selectedObject2.yCoordinate,
      appState.stateRadius
    );
  }
};

const selectState = (e) => {
  if (appState.currentAutomataStates === 0) return;
  let xCoordinate = e.clientX - canvasRect.x;
  let yCoordinate = e.clientY - canvasRect.y;
  return (
    xCoordinate < xCoordinate + appState.stateRadius &&
    yCoordinate < yCoordinate + appState.stateRadius
  );
};

const parse = () => {
  getInputStringData();
};

const storeAutomataState = (state) => {
  appState.currentAutomataStates.push(state);
};

const submit = () => {
  getAutomataData();
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

const updateCanvasRect = () => {
  canvasRect = canvas.getBoundingClientRect();
};

canvas.addEventListener("click", drawAutomata);
changeStateButton.addEventListener("click", toggleStateType);
drawButton.addEventListener("click", toggleDrawingMode);
eraseButton.addEventListener("click", toggleEraseMode);
parseButton.addEventListener("click", parse);
stateButton.addEventListener("click", selectStateComponent);
submitButton.addEventListener("click", submit);
transitionArrowButton.addEventListener("click", selectTransitionComponent);
