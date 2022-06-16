export default class Card {
  _text
  _image;
  _cardSelector;
  _handleCardClick;
  _element;

  constructor({cardSelector, data, handleCardClick, handleCardDelete, handleUserData}) {
    this._cardSelector = cardSelector;
    this._text = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleUserData = handleUserData;
  }

  // Приватный метод создания разметки
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  // Приватный метод добавления лайка
  _setLike(e) {
    e.target.classList.add('card__like_active');
  }

  

  // Приватный метод удаления карточки
  _handleDelete() {
    this._handleCardDelete(this._element);
  }

  // Приватный метод добавления обработчиков событий
  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', this._setLike);

    this._deleteButton = this._element.querySelector('.card__delete');

    this._deleteButton.addEventListener('click', () => {
      this._handleDelete()
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._text, this._image);
    });

  }

  // Публичный метод возвращения карточки
  generateCard() {

    this._handleUserData()
      .then(res => {
        if (res._id === this._ownerId) {
          this._deleteButton.classList.add('card__delete_show');
        }
      })

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




