class State {
  constructor(
    name = "",
    radius,
    stateType = "non-final",
    xCoordinate,
    yCoordinate
  ) {
    this.name = name;
    this.radius = radius;
    this.transitionArrow = {
      nextState: null,
      presentState: null,
      previousState: null,
      nextTransitionValue: undefined,
      presentTransitionValue: undefined,
      previousTransitionValue: undefined,
    };
    this.stateType = stateType;
    this.xCoordinate = xCoordinate;
    this.yCoordinate = yCoordinate;
  }
}

export default class FiniteAutomata {
  constructor(
    automataType = "DFA",
    name = "",
    radius,
    stateType = "non-final",
    xCoordinate,
    yCoordinate
  ) {
    let newState = new State(name, radius, stateType, xCoordinate, yCoordinate);
    this.startState = newState;
    this.lastState = newState;
    this.length = 1;
    this.automataType = automataType;
    return this;
  }

  addState(
    name = "",
    radius,
    stateType = "non-final",
    xCoordinate,
    yCoordinate
  ) {
    let newState = new State(name, radius, stateType, xCoordinate, yCoordinate);

    if (!this.startState) {
      this.startState = newState;
      this.lastState = newState;
      this.length++;
    } else {
      this.lastState.transitionArrow.nextState = newState;
      this.lastState = newState;
      this.length++;
    }

    return this;
  }

  clearAutomata() {
    while (this.startState) {
      this.pop();
    }
    return this;
  }

  containsDuplicates(transitionArrowValues) {
    if (transitionArrowValues.length < 2) return false;
    for (let i = 0; i < transitionArrowValues.length; i++) {
      for (let j = i + 1; j < transitionArrowValues.length; j++) {
        if (transitionArrowValues[i] === transitionArrowValues[j]) return true;
      }
    }

    return false;
  }

  findState(stateName) {
    if (!this.startState) return undefined;

    let index = 0;

    let currentState = this.startState;

    while (currentState !== null) {
      if (currentState.name === stateName) {
        return index;
      }
      currentState = currentState.transitionArrow.nextState;
      index++;
    }

    return -1;
  }

  findStateByCoordinates(xCoordinate, yCoordinate) {
    if (!this.startState) return undefined;

    let index = 0;

    let currentState = this.startState;

    while (currentState !== null) {
      if (
        currentState.xCoordinate === xCoordinate &&
        currentState.yCoordinate === yCoordinate
      ) {
        return index;
      }
      currentState = currentState.transitionArrow.nextState;
      index++;
    }

    return -1;
  }

  getAllStates() {
    if (!this.startState) return "No Data";

    let listOfStates = [];

    let currentState = this.startState;

    while (currentState !== null) {
      listOfStates.push(currentState);
      currentState = currentState.transitionArrow.nextState;
    }
    return listOfStates;
  }

  getAllStateCoordinates() {
    let listOfStates = this.getAllStates();

    let state = {
      name: "",
      xCoordinate: "",
      yCoordinate: "",
    };

    let coordinatesList = [];

    for (let i = 0; i < listOfStates.length; i++) {
      state = {
        ...state,
        name: listOfStates[i].name,
        xCoordinate: listOfStates[i].xCoordinate,
        yCoordinate: listOfStates[i].yCoordinate,
      };

      coordinatesList.push(state);
    }

    return coordinatesList;
  }

  getAllTransitionArrowCoordinates() {
    let listOfAllCoordinates = this.getAllStateCoordinates();
    let listOfTransitionValues = [];
    let index;

    for (let i = 0; i < listOfAllCoordinates.length; i++) {
      index = this.findStateByCoordinates(
        listOfAllCoordinates[i].xCoordinate,
        listOfAllCoordinates[i].yCoordinate
      );

      listOfTransitionValues.push(this.getAllTransitionValues(index));
    }

    let transitionArrow = {
      nextTransitionValue: "",
      presentTransitionValue: "",
      previousTransitionValue: "",
      transitionArrowName: "",
      xCoordinateStart: "",
      xCoordinateEnd: "",
      yCoordinateStart: "",
      yCoordinateEnd: "",
    };

    let listOfTransitionArrowCoordinates = [];

    for (let j = 0; j < listOfTransitionValues.length - 1; j++) {
      if (j === listOfTransitionValues.length - 2) {
        transitionArrow = {
          ...transitionArrow,
          transitionArrowName:
            listOfTransitionValues[j].name +
            "/" +
            listOfAllCoordinates[listOfTransitionValues.length - 1].name,
          nextTransitionValue: listOfTransitionValues[j].nextTransitionValue,
          presentTransitionValue:
            listOfTransitionValues[j].presentTransitionValue,
          previousTransitionValue:
            listOfTransitionValues[j].previousTransitionValue,
          xCoordinateStart: listOfAllCoordinates[j].xCoordinate,
          xCoordinateEnd: listOfAllCoordinates[j + 1].xCoordinate,
          yCoordinateStart: listOfAllCoordinates[j].yCoordinate,
          yCoordinateEnd: listOfAllCoordinates[j + 1].yCoordinate,
        };
      } else {
        transitionArrow = {
          ...transitionArrow,
          transitionArrowName:
            listOfTransitionValues[j].name +
            "/" +
            listOfTransitionValues[j + 1].name,
          nextTransitionValue: listOfTransitionValues[j].nextTransitionValue,
          presentTransitionValue:
            listOfTransitionValues[j].presentTransitionValue,
          previousTransitionValue:
            listOfTransitionValues[j].previousTransitionValue,
          xCoordinateStart: listOfAllCoordinates[j].xCoordinate,
          xCoordinateEnd: listOfAllCoordinates[j + 1].xCoordinate,
          yCoordinateStart: listOfAllCoordinates[j].yCoordinate,
          yCoordinateEnd: listOfAllCoordinates[j + 1].yCoordinate,
        };
      }

      listOfTransitionArrowCoordinates.push(transitionArrow);
    }

    return listOfTransitionArrowCoordinates;
  }

  getAllTransitionValues(index) {
    let currentState = this.getState(index);

    let transitionObject = {
      name: "",
      nextTransitionValue: undefined,
      presentTransitionValue: undefined,
      previousTransitionValue: undefined,
    };

    if (currentState.transitionArrow.nextTransitionValue !== undefined) {
      transitionObject = {
        ...transitionObject,
        name: currentState.name,
        nextTransitionValue: currentState.transitionArrow.nextTransitionValue,
      };
    }

    if (currentState.transitionArrow.presentTransitionValue !== undefined) {
      transitionObject = {
        ...transitionObject,
        name: currentState.name,
        nextTransitionValue:
          currentState.transitionArrow.presentTransitionValue,
      };
    }

    if (currentState.transitionArrow.previousTransitionValue !== undefined) {
      transitionObject = {
        ...transitionObject,
        name: currentState.name,
        nextTransitionValue:
          currentState.transitionArrow.previousTransitionValue,
      };
    }
    return transitionObject;
  }

  getTransitionArrowByName(transitionArrowName) {
    let listOfTransitionArrowCoordinates =
      this.getAllTransitionArrowCoordinates();

    let transitionArrow = listOfTransitionArrowCoordinates.find(
      (transitionArrow) =>
        transitionArrow.transitionArrowName === transitionArrowName
    );

    return transitionArrow;
  }

  getTransitionArrowByCoordinates(xCoordinate, yCoordinate) {
    let listOfTransitionArrowCoordinates =
      this.getAllTransitionArrowCoordinates();

    let transitionArrow = listOfTransitionArrowCoordinates.find(
      (transitionArrow) =>
        transitionArrow.xCoordinateStart === xCoordinate &&
        transitionArrow.yCoordinateStart === yCoordinate
    );

    return transitionArrow;
  }

  getState(index) {
    if (index === -1 || index > this.length) {
      return undefined;
    } else {
      let currentState = this.startState;

      for (let i = 0; i < index; i++) {
        currentState = currentState.transitionArrow.nextState;
      }

      return currentState;
    }
  }

  getStateName(xCoordinate, yCoordinate) {
    let index = this.findStateByCoordinates(xCoordinate, yCoordinate);
    let stateName = this.getState(index);

    return stateName.name;
  }

  isFinalState(stateName) {
    let index = this.findState(stateName);
    let currentState = this.getState(index);
    return currentState.stateType === "final";
  }

  removeNextTransitionValue(stateName) {
    let index = this.findState(stateName);
    let state = this.getState(index);
    state.transitionArrow.nextTransitionValue = undefined;
  }

  removePresentTransitionValue(stateName) {
    let index = this.findState(stateName);
    let state = this.getState(index);
    state.transitionArrow.presentTransitionValue = undefined;
  }

  removePreviousTransitionValue(stateName) {
    let index = this.findState(stateName);
    let state = this.getState(index);
    state.transitionArrow.previousTransitionValue = undefined;
  }

  removePresentState(stateName) {
    let index = this.findState(stateName);
    let state = this.getState(index);
    state.transitionArrow.presentState = null;
  }

  removeState(stateName) {
    if (!this.startState) return null;

    let index = this.findState(stateName);
    if (index === 0) return this.shift();

    if (index === this.length - 1) {
      return this.pop();
    } else {
      let stateToBeRomoved = this.getState(this.findState(stateName));
      let previousState = this.getState(this.findState(stateName) - 1);

      previousState.transitionArrow.nextState =
        stateToBeRomoved.transitionArrow.nextState;
      stateToBeRomoved.transitionArrow.nextState = null;
      this.length--;
      return stateToBeRomoved;
    }
  }

  setAutomataType(automataType) {
    this.automataType = automataType;
  }

  setNextState(stateName, nextStateName) {
    let currentStateIndex = this.findState(stateName);
    let currentState = this.getState(currentStateIndex);
    let nextStateIndex = this.findState(nextStateName);
    let nextState = this.getState(nextStateIndex);

    if (!(currentState && nextState))
      throw new Error("One or both states do not exist");

    currentState.transitionArrow.nextState = nextState;
  }

  setNextTransitionValue(value, stateName) {
    if (this.lastState.name === stateName)
      throw new Error("Cannot transition beyond the last state");
    let index = this.findState(stateName);
    let state = this.getState(index);
    state.transitionArrow.nextTransitionValue = value;
  }

  setPresentState(stateName) {
    let index = this.findState(stateName);
    let state = this.getState(index);
    state.transitionArrow.presentState = state;
  }

  setPreviousState(stateName, previousStateName) {
    let currentStateIndex = this.findState(stateName);
    let currentState = this.getState(currentStateIndex);
    let previousStateIndex = this.findState(previousStateName);
    let previousState = this.getState(previousStateIndex);

    if (!(currentState && previousState))
      throw new Error("One or both states do not exist");

    currentState.transitionArrow.previousState = previousState;
  }

  setPresentTransitionValue(value, stateName) {
    let index = this.findState(stateName);
    let state = this.getState(index);
    if (state.transitionArrow.presentState === state) {
      state.transitionArrow.presentTransitionValue = value;
    } else {
      throw new Error("Present state does not exist");
    }
  }

  setPreviousTransitionValue(value, stateName) {
    let index = this.findState(stateName);
    let state = this.getState(index);
    state.transitionArrow.previousTransitionValue = value;
  }

  setStateName(xCoordinate, yCoordinate, newStateName = "q") {
    if (newStateName === "") {
      let index = this.findStateByCoordinates(xCoordinate, yCoordinate);
      let state = this.getState(index);
      state.name = "q" + index;
    } else {
      let index = this.findStateByCoordinates(xCoordinate, yCoordinate);
      let state = this.getState(index);
      state.name = newStateName;
    }
  }

  parse(inputString) {
    if (inputString.length === 0) return "Error";
    let currentStatePtr = this.startState;

    let i = 0;
    if (
      this.automataType === "DFA" &&
      this.containsDuplicates(this.getAllTransitionValues(this.startState.name))
    ) {
      throw new Error("automata is not a DFA");
    } else {
      while (i < inputString.length) {
        if (
          currentStatePtr.transitionArrow.nextTransitionValue === undefined &&
          this.lastState === currentStatePtr
        )
          return false;
        if (
          currentStatePtr.transitionArrow.presentTransitionValue ===
          inputString[i]
        ) {
          currentStatePtr = currentStatePtr.transitionArrow.presentState;
        } else if (
          currentStatePtr.transitionArrow.nextTransitionValue === inputString[i]
        ) {
          currentStatePtr = currentStatePtr.transitionArrow.nextState;
        } else if (
          currentStatePtr.transitionArrow.previousTransitionValue ===
          inputString[i]
        ) {
          currentStatePtr = currentStatePtr.transitionArrow.previousState;
        } else {
        }
        i++;
      }
    }

    return this.isFinalState(currentStatePtr.name);
  }

  toggleStateType(stateName) {
    let index = this.findState(stateName);
    let state = this.getState(index);

    if (state.stateType === "non-final") {
      state.stateType = "final";
    } else {
      state.stateType = "non-final";
    }
  }

  pop() {
    if (!this.startState) return null;
    if (this.startState.transitionArrow.nextState === null) {
      return this.shift();
    }

    let currentState = this.getState(this.length - 2);
    this.lastState = currentState;
    currentState = currentState.transitionArrow.nextState;
    this.lastState.transitionArrow.nextState = null;
    this.length--;
    return currentState;
  }

  shift() {
    if (!this.startState) return null;

    if (this.startState.transitionArrow.nextState === null) {
      let currentState = this.startState;
      this.startState = null;
      this.lastState = null;
      this.length--;

      return currentState;
    } else {
      let currentState = this.startState;
      this.startState = this.startState.transitionArrow.nextState;
      currentState.transitionArrow.nextState = null;
      this.length--;

      return currentState;
    }
  }
}
