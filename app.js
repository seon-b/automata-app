import FiniteAutomata from "./automata.js";
import { AutomataGraphics } from "./automataGraphics.js";
import {
  messageObject,
  isInputEmpty,
  isValidNumberOfStates,
  isValidNumberOfTransitions,
  isValidStateName,
  isValidSymbol,
  setMessageObject,
} from "./message.js";

const canvas = document.querySelector("#canvas");

const automataData = document.querySelector("#automataData");
const changeStateButton = document.querySelector("#changeStateButton");
const clearCanvasButton = document.querySelector("#clearCanvas");
const drawButton = document.querySelector("#drawButton");
const eraseButton = document.querySelector("#eraseButton");
const messageDisplay = document.querySelector("#messageDisplay");
const parseButton = document.querySelector("#parse");
const stateButton = document.querySelector("#stateButton");
const submitButton = document.querySelector("#submit");
const transitionArrowButton = document.querySelector("#transitionArrowButton");
const connectStatesButton = document.querySelector("#connectStatesButton");

const automataDataInput = document.querySelector("#automataData");
const inputStringData = document.querySelector("#inputStringData");

const buttonList = document.querySelectorAll("button");

messageDisplay.style.height = "20px";
messageDisplay.style.width = "300px";
messageDisplay.style.padding = "10px";
messageDisplay.style.border = "2px";

let canvasRect = canvas.getBoundingClientRect();

let appState = {
  automataData: [],
  automataType: "",
  changeStateTypeButton: "Change State Type",
  component: "transition arrow",
  currentAutomataStates: [],
  currentTransitionValues: [],
  drawButtonName: "Draw",
  eraseButtonName: "Erase",
  drawingMode: "active",
  eraseMode: "inactive",
  inputStringData: [],
  parsedString: "",
  selectedObject1: { xCoordinate: undefined, yCoordinate: undefined },
  selectedObject2: { xCoordinate: undefined, yCoordinate: undefined },
  selectStateButtonName: "Select State",
  stateButtonName: "Final State",
  stateLimit: 5,
  stateName: "",
  stateRadius: 40,
  stateType: "non-final",
  symbols: "",
  transitionArrowButtonName: "Transition Arrow",
  xCanvasCoordinate: canvasRect.x,
  yCanvasCoordinate: canvasRect.y,
};

let newAutomataGraphics = new AutomataGraphics();
let newFiniteAutomata = new FiniteAutomata();
newFiniteAutomata.pop();

function setAppState(stateName, newStateValue) {
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
  } else if (stateName === "currentTransitionValues") {
    appState = { ...appState, currentTransitionValues: newStateValue };
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
  } else if (stateName === "parsedString") {
    appState = { ...appState, parsedString: newStateValue };
  } else if (stateName === "selectedObject1") {
    appState = { ...appState, selectedObject1: newStateValue };
  } else if (stateName === "selectedObject2") {
    appState = { ...appState, selectedObject2: newStateValue };
  } else if (stateName === "selectStateButtonName") {
    appState = { ...appState, selectStateButtonName: newStateValue };
  } else if (stateName === "stateButtonName") {
    appState = { ...appState, stateButtonName: newStateValue };
  } else if (stateName === "stateLimit") {
    appState = { ...appState, stateLimit: newStateValue };
  } else if (stateName === "stateName") {
    appState = { ...appState, stateName: newStateValue };
  } else if (stateName === "stateRadius") {
    appState = { ...appState, stateRadius: newStateValue };
  } else if (stateName === "stateType") {
    appState = { ...appState, stateType: newStateValue };
  } else if (stateName === "symbols") {
    appState = { ...appState, symbols: newStateValue };
  } else if (stateName === "transitionArrowButtonName") {
    appState = { ...appState, transitionArrowButtonName: newStateValue };
  } else if (stateName === "xCanvasCoordinate") {
    appState = { ...appState, xCanvasCoordinate: newStateValue };
  } else if (stateName === "yCanvasCoordinate") {
    appState = { ...appState, yCanvasCoordinate: newStateValue };
  } else {
  }
}

function addSelectedButtonStyle(buttonId) {
  buttonList.forEach((button) => {
    if (button.id === buttonId) {
      button.classList.add("selectedButtonStyle");
    }
  });
}

function changePlaceHolderText(text) {
  if (appState.component === "state") {
    automataData.getAttributeNode("placeholder").value = text;
  } else if (appState.component === "transition arrow") {
    automataData.getAttributeNode("placeholder").value = text;
  } else {
  }
}

function clearCanvas() {
  newAutomataGraphics.clearAll();
  setAppState("currentAutomataStates", []);
  setAppState("currentTransitionValues", []);
  setAppState("automataData", []);
}

function clearInputField(inputField) {
  if (inputField === "automataDataInput") {
    automataDataInput.value = "";
  } else if (inputField === "inputStringData") {
    inputStringData.value = "";
  } else {
  }
}

function connectStates() {
  if (appState.component !== "transition arrow") {
    setMessageObject("error", "cannot connect states in this mode");
    displayError();
    return;
  }

  if (appState.currentAutomataStates.length === 0) {
    setMessageObject("error", "no states present");
    displayError();
    return;
  }

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

    if (i === appState.currentAutomataStates.length - 1) {
    } else {
      nextObject.xCoordinate =
        appState.currentAutomataStates[i + 1].xCoordinate;
      nextObject.yCoordinate =
        appState.currentAutomataStates[i + 1].yCoordinate;
    }

    setAppState("selectedObject1", currentObject);
    setAppState("selectedObject2", nextObject);

    if (appState.currentTransitionValues.length === 0) {
      currentTransitionValue = "";
    } else {
      currentTransitionValue = appState.currentTransitionValues[i];
    }

    if (i === appState.currentAutomataStates.length - 1) {
      let tempName = "q" + i;

      newAutomataGraphics.addText(
        tempName,
        appState.currentAutomataStates[i].xCoordinate,
        appState.currentAutomataStates[i].yCoordinate
      );
    } else {
      newAutomataGraphics.createNextTransition(
        currentTransitionValue,
        appState.selectedObject1.xCoordinate,
        appState.selectedObject1.yCoordinate,
        appState.selectedObject2.xCoordinate,
        appState.selectedObject2.yCoordinate,
        appState.stateRadius
      );

      let tempName = "q" + i;

      newAutomataGraphics.addText(
        tempName,
        appState.currentAutomataStates[i].xCoordinate,
        appState.currentAutomataStates[i].yCoordinate
      );
    }
  }

  let newFiniteAutomataStates = newFiniteAutomata.getAllStates();
  let i = 0;

  while (i < newFiniteAutomataStates.length - 1) {
    if (i === newFiniteAutomataStates.length) {
    } else {
      newFiniteAutomata.setNextTransitionValue(
        appState.currentTransitionValues[i],
        newFiniteAutomataStates[i].name
      );
    }
    i++;
  }
}

function displayError() {
  if (messageObject.errorMessage !== "") {
    messageDisplay.innerHTML = messageObject.errorMessage;
    messageDisplay.classList.add("errorStyle");
    updateCanvasRect();
    setTimeout(() => {
      setMessageObject("error", "");
      updateCanvasRect();
      messageDisplay.innerHTML = messageObject.errorMessage;
      messageDisplay.classList.remove("errorStyle");
    }, 1000);
  }
}

function displaySuccess() {
  if (messageObject.successMessage !== "") {
    messageDisplay.innerHTML = messageObject.successMessage;
    messageDisplay.classList.add("successStyle");
    updateCanvasRect();
    setTimeout(() => {
      setMessageObject("success", "");
      updateCanvasRect();
      messageDisplay.innerHTML = messageObject.successMessage;
      messageDisplay.classList.remove("successStyle");
    }, 1000);
  }
}

function drawAutomata(e) {
  if (
    isValidNumberOfStates(
      appState.currentAutomataStates.length,
      appState.stateLimit
    ) === false
  ) {
    setMessageObject(
      "error",
      `Cannot create more than ${appState.stateLimit} states`
    );
    displayError();
    return;
  }
  if (appState.component === "state" && appState.drawingMode === "active") {
    if (appState.currentTransitionValues.length === 0) {
      setMessageObject(
        "error",
        "cannot create state without transition values"
      );
      displayError();
      return;
    }
    getCoordinates(e);

    if (appState.currentAutomataStates.length === 0) {
      setAppState("stateType", "start");
    } else {
      setAppState("stateType", "non-final");
    }

    let newStartState = {
      stateName: appState.stateName,
      stateType: appState.stateType,
      xCoordinate: appState.xCanvasCoordinate,
      yCoordinate: appState.yCanvasCoordinate,
      radius: appState.stateRadius,
      isConnectedToNextState: false,
      isConnectedToPreviousState: false,
    };

    let newState = {};

    if (appState.currentAutomataStates.length === 0) {
      newState = newStartState;
    } else if (
      appState.currentAutomataStates.length ===
      appState.stateLimit - 1
    ) {
      newState = {
        stateName: appState.stateName,
        stateType: "final",
        xCoordinate: appState.xCanvasCoordinate,
        yCoordinate: formatGraphics().yAxisAlignment,
        radius: appState.stateRadius,
        isConnectedToNextState: false,
        isConnectedToPreviousState: false,
      };
    } else {
      newState = {
        stateName: appState.stateName,
        stateType: appState.stateType,
        xCoordinate: appState.xCanvasCoordinate,
        yCoordinate: formatGraphics().yAxisAlignment,
        radius: appState.stateRadius,
        isConnectedToNextState: false,
        isConnectedToPreviousState: false,
      };
    }

    storeAutomataState(newState);

    newAutomataGraphics.createState(
      newState.stateName,
      newState.stateType,
      newState.xCoordinate,
      newState.yCoordinate,
      newState.radius
    );

    newFiniteAutomata.addState(
      newState.stateName,
      newState.radius,
      newState.stateType,
      newState.xCoordinate,
      newState.yCoordinate
    );

    newFiniteAutomata.setStateName(
      newState.xCoordinate,
      newState.yCoordinate,
      newState.stateName
    );
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
}

function enableDrawingMode() {
  if (appState.drawingMode === "inactive") {
    addSelectedButtonStyle(drawButton.id);
    removeSelectedButtonStyle(eraseButton.id);
    setAppState("drawingMode", "active");
    setAppState("eraseMode", "inactive");
  }
}

function enableEraseMode() {
  if (appState.eraseMode === "inactive") {
    addSelectedButtonStyle(eraseButton.id);
    removeSelectedButtonStyle(drawButton.id);
    setAppState("eraseMode", "active");
    setAppState("drawingMode", "inactive");
  }
}

function eraseStateNameByCoordinates(xCoordinate, yCoordinate) {
  newAutomataGraphics.clear(xCoordinate, yCoordinate, 45, 30);
}

function eraseStateNames() {
  if (appState.currentAutomataStates.length === 0) {
    setMessageObject("error", "No states present");
    displayError();
    return;
  }

  for (let i = 0; i < appState.currentAutomataStates.length; i++) {
    newAutomataGraphics.clear(
      appState.currentAutomataStates[i].xCoordinate,
      appState.currentAutomataStates[i].yCoordinate,
      45,
      30
    );
  }
}

function formatGraphics() {
  if (appState.currentAutomataStates[0].stateType !== "start") {
    setMessageObject("error", "Error,canvas is empty");
    displayError();
    return;
  }
  let formatObject = {
    xAxisAlignment: appState.currentAutomataStates[0].xCoordinate,
    yAxisAlignment: appState.currentAutomataStates[0].yCoordinate,
  };

  return formatObject;
}

function generateAutomata(automataStates, transitionArrowValues) {
  for (let i = 0; i < automataStates.length; i++) {
    newFiniteAutomata.addState(
      automataStates[i].stateName,
      automataStates[i].radius,
      automataStates[i].statetype,
      automataStates[i].xCoordinate,
      automataStates[i].yCoordinate
    );
  }
}

function getAutomataData() {
  if (isInputEmpty(automataDataInput.value)) {
    setMessageObject("error", "cannot have empty input");
    displayError();
    return;
  }

  if (appState.component === "state") {
    let inputData = automataDataInput.value.split(" ");
    for (let i = 0; i < inputData.length; i++) {
      if (isValidStateName(inputData[i]) === false) {
        setMessageObject("error", "Invalid state name");
        displayError();
        return;
      }
    }

    setAppState("automataData", inputData);
    setStateNames();
  } else if (appState.component === "transition arrow") {
    let inputData = automataDataInput.value.split("").filter((e) => e !== " ");
    clearCanvas();
    newFiniteAutomata.clearAutomata();
    setAppState("stateLimit", inputData.length + 1);

    if (
      isValidNumberOfTransitions(inputData.length, appState.stateLimit) === true
    ) {
      setAppState("currentTransitionValues", inputData);
    } else {
      setAppState("automataData", []);
      setAppState("currentTransitionValues", []);
      setMessageObject(
        "error",
        `cannot have more than ${appState.stateLimit - 1} transitions`
      );

      displayError();
    }
  } else {
  }
}

function getCoordinates(e) {
  setAppState("xCanvasCoordinate", e.clientX - canvasRect.x);
  setAppState("yCanvasCoordinate", e.clientY - canvasRect.y);
}

function selectStateComponent() {
  if (appState.component === "transition arrow") {
    setAppState("component", "state");
    changePlaceHolderText("Enter state name");
    addSelectedButtonStyle(stateButton.id);
    removeSelectedButtonStyle(transitionArrowButton.id);
  }
}

function selectState(e) {
  if (appState.currentAutomataStates === 0) return;
  let xCoordinate = e.clientX - canvasRect.x;
  let yCoordinate = e.clientY - canvasRect.y;
  return (
    xCoordinate < xCoordinate + appState.stateRadius &&
    yCoordinate < yCoordinate + appState.stateRadius
  );
}

function selectTransitionComponent() {
  if (appState.component === "state") {
    setAppState("component", "transition arrow");
    changePlaceHolderText("Enter transition values");
    addSelectedButtonStyle(transitionArrowButton.id);
    removeSelectedButtonStyle(stateButton.id);
  }
}

function setStateNames() {
  if (appState.currentAutomataStates.length === 0) {
    setMessageObject("error", "No states present");
    displayError();
    return;
  }

  if (appState.areTransitionValuesSet === true) {
    setMessageObject("error", "");
    displayError();
    return;
  }

  if (appState.currentAutomataStates.length < appState.stateLimit) {
    if (appState.stateLimit === 1) {
      setMessageObject(
        "error",
        `Cannot have less than ${appState.stateLimit} name`
      );
    } else {
      setMessageObject(
        "error",
        `Cannot have less than ${appState.stateLimit} names`
      );
    }

    displayError();
    return;
  }

  if (appState.currentAutomataStates.length > appState.stateLimit) {
    if (appState.stateLimit === 1) {
      setMessageObject(
        "error",
        `Cannot have more than ${appState.stateLimit} name`
      );
    } else {
      setMessageObject(
        "error",
        `Cannot have more than ${appState.stateLimit} names`
      );
    }
    displayError();
    return;
  }

  for (let i = 0; i < appState.currentAutomataStates.length; i++) {
    appState.currentAutomataStates[i].stateName = appState.automataData[i];

    if (appState.currentAutomataStates[i].stateName === "") {
      let tempName = "q" + i;

      newAutomataGraphics.addText(
        tempName,
        appState.currentAutomataStates[i].xCoordinate,
        appState.currentAutomataStates[i].yCoordinate
      );
    } else {
      if (appState.currentAutomataStates[i].stateName === undefined) {
      } else {
        eraseStateNameByCoordinates(
          appState.currentAutomataStates[i].xCoordinate,
          appState.currentAutomataStates[i].yCoordinate
        );
        newAutomataGraphics.addText(
          appState.currentAutomataStates[i].stateName,
          appState.currentAutomataStates[i].xCoordinate,
          appState.currentAutomataStates[i].yCoordinate
        );
      }
    }

    newFiniteAutomata.setStateName(
      appState.currentAutomataStates[i].xCoordinate,
      appState.currentAutomataStates[i].yCoordinate,
      appState.currentAutomataStates[i].stateName
    );
  }
}

function storeAutomataState(state) {
  appState.currentAutomataStates.push(state);
}

function parse() {
  if (appState.currentAutomataStates.length === 0) {
    setMessageObject("error", "No states present");
    displayError();
    return;
  }

  if (isInputEmpty(inputStringData.value)) {
    setMessageObject("error", "cannot have empty input");
    displayError();
    return;
  }

  if (!isValidSymbol(inputStringData.value)) {
    setMessageObject("error", "invalid input symbol");
    displayError();
    return;
  }

  setAppState("parsedString", inputStringData.value);
  clearInputField("inputStringData");

  if (newFiniteAutomata.parse(appState.parsedString) === true) {
    setMessageObject("success", "The string is accepted");
    displaySuccess();
  } else {
    setMessageObject("success", "The string is not accepted");
    displaySuccess();
  }
  setAppState("parsedString", "");
  setAppState("inputStringData", []);
}

function removeSelectedButtonStyle(buttonId) {
  buttonList.forEach((button) => {
    if (button.id === buttonId) button.classList.remove("selectedButtonStyle");
  });
}

function submit() {
  getAutomataData();
  clearInputField("automataDataInput");
}

function toggleStateType() {
  if (appState.stateType === "final") {
    setAppState("stateType", "non-final");
  } else {
    setAppState("stateType", "final");
  }
}

function updateCanvasRect() {
  canvasRect = canvas.getBoundingClientRect();
}

canvas.addEventListener("click", drawAutomata);
changeStateButton.addEventListener("click", toggleStateType);
clearCanvasButton.addEventListener("click", clearCanvas);
connectStatesButton.addEventListener("click", connectStates);
drawButton.addEventListener("click", enableDrawingMode);
eraseButton.addEventListener("click", enableEraseMode);
parseButton.addEventListener("click", parse);
stateButton.addEventListener("click", selectStateComponent);
submitButton.addEventListener("click", submit);
transitionArrowButton.addEventListener("click", selectTransitionComponent);
