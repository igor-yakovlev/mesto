export default class Card {
  _text
  _image;
  _cardSelector;
  _handleCardClick;
  _element;

  constructor(cardSelector, data, handleCardClick) {
    this._cardSelector = cardSelector;
    this._text = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
  }

  // Приватный метод создания разметки
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  // Приватный метод добавления лайка
  _handleLike(e) {
    e.target.classList.toggle('card__like_active')
  }
  // Приватный метод удаления карточки
  _handleDelete() {
    this._element.remove();
  }

  // Приватный метод добавления обработчиков событий
  _setEventListeners() {

    this._element.querySelector('.card__like').addEventListener('click', this._handleLike);

    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._handleDelete()
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._text, this._image);
    });

  }

  // Публичный метод возвращения карточки
  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.card__image');

    this._cardImage.src = this._image;
    this._cardImage.alt = this._text;
    this._element.querySelector('.card__title').textContent = this._text;
    this._element.querySelector('.card__likes-count').textContent = this._likes.length;

    this._setEventListeners();

    return this._element;
  }

}




