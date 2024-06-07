class State {
  constructor(name = "undefined", type = "non-final") {
    this.name = name;
    this.type = type;
    this.transitionArrow = {
      nextState: null,
      previousState: null,
      nextTransitionValue: undefined,
      previousTransitionValue: undefined,
    };
  }
}

export default class FiniteAutomata {
  constructor(name = "undefined", automataType = "DFA") {
    let newState = new State(name);
    this.startState = newState;
    this.lastState = newState;
    this.length = 1;
    this.automataType = automataType;
    return this;
  }

  addState(name) {
    let newState = new State(name);

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

  removeNextTransitionValue(stateName) {
    let state = this.findState(stateName);
    state.transitionArrow.nextTransitionValue = undefined;
  }

  removePreviousTransitionValue(stateName) {
    let state = this.findState(stateName);
    state.transitionArrow.previousTransitionValue = undefined;
  }

  removeState(stateName) {
    if (!this.startState) return null;

    let index = this.findState(stateName);
    if (index === 0) return this.unShift();

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

  setNextTransitionValue(value, stateName) {
    let index = this.findState(stateName);
    let state = this.getState(index);
    state.transitionArrow.nextTransitionValue = value;
  }

  setPreviousTransitionValue(value, stateName) {
    let index = this.findState(stateName);
    let state = this.getState(index);
    state.transitionArrow.previousTransitionValue = value;
  }

  testString(inputString) {
    if (inputString.length === 0) return "Error";
    let symbolsArray = [];
    let currentStates = this.getAllStates();

    for (let i = 0; i < inputString.length; i++) {
      symbolsArray.push(inputString[i]);
    }

    symbolsArray.reverse();

    for (let j = 0; j < currentStates.length; j++) {
      if (
        symbolsArray[j] === currentStates[j].transitionArrow.nextTransitionValue
      ) {
        symbolsArray.pop();
      } else {
        return false;
      }
    }

    return symbolsArray.length === 0;
  }

  pop() {
    if (!this.startState) return null;
    if (this.startState.transitionArrow.nextState === null) {
      return this.unShift();
    }

    let currentState = this.getState(this.length - 2);
    this.lastState = currentState;
    currentState = currentState.transitionArrow.nextState;
    this.lastState.transitionArrow.nextState = null;
    this.length--;
    return currentState;
  }

  unShift() {
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
