// Функция проверки валидации формы
function  enableValidation  (config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach(form => {
    const inputs = form.querySelectorAll(config.inputSelector);

  inputs.forEach(input => {
    input.addEventListener('input', (e) => handleForInput(e, config, form));
  });

  toggleButton(form, config.submitButtonSelector, config.inputSelector , config.inactiveButtonClass);
  });

}

// Функция проверки валидации поля формы
function handleForInput(e, config, form) {
  e.preventDefault();
  const input = e.target;
  if (input.validity.valid) {
    hideError(input, config.inputErrorClass);
  } else {
    performError(input, config.inputErrorClass);
  }
  toggleButton(form, config.submitButtonSelector, config.inputSelector, config.inactiveButtonClass);
}

// Функция проверки валидации поля формы
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

// Функция включения и отключения кнопки формы
function toggleButton (form, submitButtonSelector, inputSelector, inactiveButtonClass) {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const button = form.querySelector(submitButtonSelector);
  if (hasInvalidInput(inputList)) {
    button.disabled = true;
    button.classList.add(inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(inactiveButtonClass);
  }
}

// Функция включения ошибки полей формы
function performError (inputElement, inputErrorClass) {
  const errorNode = document.querySelector(`#${inputElement.id}-error`);
  errorNode.textContent = inputElement.validationMessage;
  inputElement.classList.add(inputErrorClass);
}

// Функция отключения ошибки полей формы
function hideError (inputElement, inputErrorClass) {
  const errorNode = document.querySelector(`#${inputElement.id}-error`);
  errorNode.textContent = '';
  inputElement.classList.remove(inputErrorClass);
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_invalid',
});
