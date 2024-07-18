export let errorObject = {
  errorMessage: "",
};

export function isInputEmpty(input) {
  let regExPattern = /^\s*$/;
  if (regExPattern.test(input) === true) return regExPattern.test(input);
}

export function isValidNumberOfStates(numberOfStates, stateLimit) {
  if (numberOfStates < stateLimit) {
    return true;
  } else {
    return false;
  }
}

export function isValidNumberOfTransitions(
  numberOfTransitionValues,
  stateLimit
) {
  if (numberOfTransitionValues > stateLimit - 1) {
    return false;
  } else {
    return true;
  }
}

export function setErrorObject(message) {
  errorObject = { ...errorObject, errorMessage: message };
}

export function validateInput(validationType, input) {
  if (validationType === "input") {
    return isInputEmpty(input);
  } else {
  }
}
