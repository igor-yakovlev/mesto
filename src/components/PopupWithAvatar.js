import Popup from "./Popup.js";

export default class PopupWithAvatar extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll("input")
  }

  _getInputValues() {
  const formData = {};
  this._inputList.forEach(item => {
    formData[item.name] = item.value
  });

  return formData;
  }


  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name]
    })
  }


  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

}


