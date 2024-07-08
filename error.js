const isInputEmpty = (input) => {
  let isAllEmptyString = false;

  for (let i = 0; i < input.length; i++) {
    if (input[i] !== "") {
      return false;
    } else {
      isAllEmptyString = true;
    }
  }

  return isAllEmptyString;
};

const isValidNumberOfStates = (numberOfStates, stateLimit) => {
  if (numberOfStates > stateLimit) {
    return false;
  } else {
    return true;
  }
};

const isValidNumberOfTransitions = (numberOfTransitionValues, stateLimit) => {
  if (numberOfTransitionValues >= stateLimit) {
    return false;
  } else {
    return true;
  }
};

export function validateInput(validationType, input) {
  if (validationType === "empty lnput") {
    return isInputEmpty(input);
  } else if (validationType === "state limit") {
    return isValidNumberOfStates(input.numberOfStates, input.stateLimit);
  } else if (validationType === "transition limit") {
    return isValidNumberOfTransitions(input.transitionValues, input.stateLimit);
  }
}
