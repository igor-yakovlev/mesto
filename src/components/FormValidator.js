
export default class FormValidator {
  _config;
  _formElement;

  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);

  }

  // Приватный метод проверки валидации поля формы
  _handleForInput(e) {
    e.preventDefault();
    const input = e.target;
    if (input.validity.valid) {
      this._hideError(input);
    } else {
      this._performError(input);
    }
    this._toggleButton();
    }

    // Приватный метод включения ошибки полей формы
  _performError(inputElement) {
    const errorNode = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorNode.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._config.inputErrorClass);
  }

  // Приватный метод проверки валидации поля формы
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  // Приватный метод отключения ошибки полей формы
  _hideError(inputElement) {
    const errorNode = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorNode.textContent = '';
    inputElement.classList.remove(this._config.inputErrorClass);
  }

  // Приватный метод включения и отключения кнопки формы
  _toggleButton() {
    if (this._hasInvalidInput(this._inputList)) {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._config.inactiveButtonClass);
    } else {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
    }
  }

  // Публичный метод включения и отключения кнопки и синхронизации полей формы
  resetValidation() {
    this._toggleButton();
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement)
    });
  }

  // Публичный метод проверки валидации формы
  enableValidation() {
    this._inputList.forEach(input => {
      input.addEventListener('input', (e) => this._handleForInput(e));
    });
  }

}
