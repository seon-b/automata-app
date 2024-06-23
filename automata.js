class State {
  constructor(name = "undefined", type = "non-final") {
    this.name = name;
    this.type = type;
    this.transitionArrow = {
      nextState: null,
      presentState: null,
      previousState: null,
      nextTransitionValue: undefined,
      presentTransitionValue: undefined,
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

  getAllTransitionValues(index) {
    let currentState = this.getState(index);
    let listOfTransitionValues = [];
    if (currentState.transitionArrow.nextTransitionValue !== undefined)
      listOfTransitionValues.push(
        currentState.transitionArrow.nextTransitionValue
      );

    if (currentState.transitionArrow.presentTransitionValue !== undefined)
      listOfTransitionValues.push(
        currentState.transitionArrow.presentTransitionValue
      );

    if (currentState.transitionArrow.previousTransitionValue !== undefined)
      listOfTransitionValues.push(
        currentState.transitionArrow.previousTransitionValue
      );

    return listOfTransitionValues;
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

  isFinalState(stateName) {
    let index = this.findState(stateName);
    let currentState = this.getState(index);
    return currentState.type === "final";
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

    if (state.type === "non-final") {
      state.type = "final";
    } else {
      state.type = "non-final";
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
