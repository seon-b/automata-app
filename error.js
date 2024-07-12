export const isInputEmpty = (input) => {
  let regExPattern = /^\s*$/;

  return regExPattern.test(input);
};

export const isValidNumberOfStates = (numberOfStates, stateLimit) => {
  if (numberOfStates < stateLimit) {
    return true;
  } else {
    return false;
  }
};

export const isValidNumberOfTransitions = (
  numberOfTransitionValues,
  stateLimit
) => {
  if (numberOfTransitionValues > stateLimit - 1) {
    return false;
  } else {
    return true;
  }
};

export function validateInput(validationType, input) {
  if (validationType === "input") {
    return isInputEmpty(input);
  } else {
  }
}
