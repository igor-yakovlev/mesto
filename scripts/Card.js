import {openPopup} from './utils.js';

const popupImagePlace = document.querySelector('.popup_image-place');
const popupImage = popupImagePlace.querySelector('.popup__image');
const popupDescription = popupImagePlace.querySelector('.popup__description');

export default class Card {
  _text
  _image;
  _cardSelector;
  _element;

  constructor(cardSelector, data) {
    this._cardSelector = cardSelector;
    this._text = data.name;
    this._image = data.link;
  }

  // Приватный метод создания разметки
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  // Приватный метод добавления лайка
  _likeClickHandler(e) {
    e.target.classList.toggle('card__like_active')
  }
  // Приватный метод удаления карточки
  _delClickHandler() {
    this._element.remove();
  }

  // Приватный метод открытия попапа картинки
  _openPopupHandler() {
    openPopup(popupImagePlace);
  }

  // Приватный метод добавления обработчиков событий
  _setEventListeners() {

    this._element.querySelector('.card__like').addEventListener('click', this._likeClickHandler);

    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._delClickHandler()
    });

    this._element.querySelector('.card__image').addEventListener('click', (e) => {
      popupImage.src = e.target.src;
      popupImage.alt = e.target.alt;
      popupDescription.textContent = e.target.alt;
      this._openPopupHandler();
    });

  }

  // Публичный метод возвращения карточки
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__image').alt = this._text;
    this._element.querySelector('.card__title').textContent = this._text;

    this._setEventListeners();

    return this._element;
  }

}




