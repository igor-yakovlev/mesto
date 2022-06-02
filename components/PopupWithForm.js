import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
  const formData = {};
  console.log(this._form );
  // this._popup.querySelectorAll("input").forEach(item => {
  //   formData[item.name] = item.value
  // });

  return formData;
  }


  open() {
    super.open();
  }

  _setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
    });
  }

}


