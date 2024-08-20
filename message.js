export let messageObject = {
  errorMessage: "",
  successMessage: "",
};

export function isInputEmpty(input) {
  let regExPattern = /^\s*$/;
  return regExPattern.test(input);
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

export function isValidStateName(stateName) {
  if (stateName.length > 2) {
    return false;
  } else {
    return true;
  }
}

export function isValidSymbol(input) {
  let regExPattern = /^[A-Za-z0-9]*$/;
  return regExPattern.test(input);
}

export function setMessageObject(type, message) {
  if (type === "error") {
    messageObject = { ...messageObject, errorMessage: message };
  } else if (type === "success") {
    messageObject = { ...messageObject, successMessage: message };
  } else {
  }
}
