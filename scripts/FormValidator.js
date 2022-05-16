
export default class FormValidator {
  _config;
  _formElement;

  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;

  }

  // Приватный метод проверки валидации поля формы
  _handleForInput(e) {
    e.preventDefault();
    const input = e.target;
    if (input.validity.valid) {
      this.hideErrorHandler(input);
    } else {
      this._performErrorHandler(input);
    }
    this.toggleButtonHandler();
    }

    // Приватный метод включения ошибки полей формы
  _performErrorHandler(inputElement) {
    const errorNode = document.querySelector(`#${inputElement.id}-error`);
    errorNode.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._config.inputErrorClass);
  }

  // Приватный метод проверки валидации поля формы
  _hasInvalidInputHandler(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  // Публичный метод отключения ошибки полей формы
  hideErrorHandler(inputElement) {
    const errorNode = document.querySelector(`#${inputElement.id}-error`);
    errorNode.textContent = '';
    inputElement.classList.remove(this._config.inputErrorClass);
  }

  // Публичный метод включения и отключения кнопки формы
  toggleButtonHandler() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    const button = this._formElement.querySelector(this._config.submitButtonSelector);
    if (this._hasInvalidInputHandler(inputList)) {
      button.disabled = true;
      button.classList.add(this._config.inactiveButtonClass);
    } else {
      button.disabled = false;
      button.classList.remove(this._config.inactiveButtonClass);
    }
  }

  // Публичный метод проверки валидации формы
  enableValidation() {
    const inputs = this._formElement.querySelectorAll(this._config.inputSelector);
    inputs.forEach(input => {
      input.addEventListener('input', (e) => this._handleForInput(e));
    });
    this.toggleButtonHandler(this._config.submitButtonSelector, this._config.inputSelector , this._config.inactiveButtonClass);
  }

}
