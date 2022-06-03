import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
  const formData = {};
  this._popup.querySelectorAll("input").forEach(item => {
    formData[item.name] = item.value
  });

  return formData;
  }


  open() {
    super.open();
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


