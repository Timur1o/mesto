
export const showInputError = (settings, inputElement, errorMessage) => {
  const { popupFormFieldError, popupFormFieldTypeError, formElement } = settings;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(popupFormFieldError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(popupFormFieldTypeError);
};

export const hideInputError = (settings, inputElement) => {
  const { popupFormFieldError, popupFormFieldTypeError, formElement } = settings;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(popupFormFieldError);
  errorElement.classList.remove(popupFormFieldTypeError);
  errorElement.textContent = '';
};

export const isValid = (settings, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  };

  if (!inputElement.validity.valid) {
    showInputError(settings, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(settings, inputElement);
  };
};

export const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

export const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('disabled');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('disabled');
  }
};

function getFormElements(settings) {
  const { formElement, popupSubmitButtonSelector, popupFormField } = settings;
  const inputList = Array.from(formElement.querySelectorAll(popupFormField));
  const buttonElement = formElement.querySelector(popupSubmitButtonSelector);
  return { inputList, buttonElement };
};

export const setEventListeners = (settings) => {
  const { inputList, buttonElement } = getFormElements(settings);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(settings, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = (settings) => {
  setEventListeners(settings);
};

export function revalidateForm(settings) {
  const { inputList, buttonElement } = getFormElements(settings);
  toggleButtonState(inputList, buttonElement);
};
