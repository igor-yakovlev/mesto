
// Функция проверки валидации формы
function  enableValidation  (config) {
  const form = document.querySelector(config.formSelector);
  const inputs = form.querySelectorAll(config.formInput);

  inputs.forEach(input => {
    input.addEventListener('change', (e) => handleForInput(e, config, form));
  });

  toggleButton(form, config.formButton, config.formInput);
}

// Функция проверки валидации поля формы
function handleForInput(e, config, form) {
  e.preventDefault();
  const input = e.target;
  if (input.validity.valid) {
    hideError(input);
  } else {
    performError(input);
  }
  toggleButton(form, config.formButton, config.formInput)
}

// Функция проверки валидации поля формы
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

// Функция включения и отключения кнопки формы
function toggleButton (form, formButton, formInput) {
  const inputList = Array.from(form.querySelectorAll(formInput));
  const button = form.querySelector(formButton);
  if (hasInvalidInput(inputList)) {
    button.disabled = true;
    button.classList.add('popap__button_disabled');
  } else {
    button.disabled = false;
    button.classList.remove('popap__button_disabled');
  }

}

// Функция включения ошибки полей формы
function performError (inputElement) {
  const errorNode = document.querySelector(`#${inputElement.id}-error`);
  errorNode.textContent = inputElement.validationMessage;
  inputElement.classList.add('popap__input_invalid');
}

// Функция отключения ошибки полей формы
function hideError (inputElement) {
  const errorNode = document.querySelector(`#${inputElement.id}-error`);
  errorNode.textContent = '';
  inputElement.classList.remove('popap__input_invalid');
}

enableValidation ({
  formSelector: '.popap__form_add-place',
  formInput: '.popap__input',
  formButton: '.popap__button',
});


enableValidation ({
  formSelector: '.popap__form_user-info',
  formInput: '.popap__input',
  formButton: '.popap__button',
});

