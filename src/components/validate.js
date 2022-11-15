
export const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__form-field-error_active');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__form-field_type_error');
};

export const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__form-field-error_active');
  errorElement.classList.remove('popup__form-field_type_error');
  errorElement.textContent = '';
};

export const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  };

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
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
function getFormElements(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__form-field'));
  const buttonElement = formElement.querySelector('.popup__submit-button');
  return {inputList, buttonElement};
};

export const setEventListeners = (formElement) => {
  const {inputList, buttonElement} = getFormElements(formElement);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = (formElement) => {
  setEventListeners(formElement);
};

export function revalidateForm(formElement) {
  const {inputList, buttonElement} = getFormElements(formElement);
  toggleButtonState(inputList, buttonElement);
};
