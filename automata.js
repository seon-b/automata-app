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

export default class DFA {
  constructor(name = "undefined") {
    let newState = new State(name);
    this.startState = newState;
    this.lastState = newState;
    this.length = 1;
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

  displayStates() {
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

    let currentState = this.startState;

    while (currentState !== null) {
      if (currentState.name === stateName) {
        return currentState;
      }
      currentState = currentState.transitionArrow.nextState;
    }

    return undefined;
  }

  setNextTransitionValue(value, stateName) {
    let state = this.findState(stateName);
    state.transitionArrow.nextTransitionValue = value;
  }

  setPreviousTransitionValue(value, stateName) {
    let state = this.findState(stateName);
    state.transitionArrow.previousTransitionValue = value;
  }
}
