export default class Card {
  _text
  _image;
  _cardSelector;
  _handleCardClick;
  _element;

  constructor({cardSelector, data, handleCardClick, handleCardDelete, handleCardLike, handleUserData}) {
    this._cardSelector = cardSelector;
    this._text = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._handleUserData = handleUserData;
  }

  // Приватный метод создания разметки
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }


  // Приватный метод добавления лайка
  setLike(likes) {
    this._likeButton.classList.add('card__like_active');
    this._isLiked = true;
    this._element.querySelector('.card__likes-count').textContent = likes.length;

  }

  removeLike(likes) {
    this._likeButton.classList.remove('card__like_active');
    this._isLiked = false;
    this._element.querySelector('.card__likes-count').textContent = likes.length;
  }

  // Приватный метод удаления карточки
  _handleDelete() {
    this._handleCardDelete(this._element);
  }

  // Приватный метод добавления обработчиков событий
  _setEventListeners() {
    this._likeButton = this._element.querySelector('.card__like');
    this._likeButton.addEventListener('click', () => {
      this._handleCardLike();
    });

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
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.card__image');

    this._cardImage.src = this._image;
    this._cardImage.alt = this._text;
    this._element.querySelector('.card__title').textContent = this._text;
    this._element.querySelector('.card__likes-count').textContent = this._likes.length;

    this._setEventListeners();

    if (this._handleUserData._id === this._ownerId) {
      this._deleteButton.classList.add('card__delete_show');
    }

    if (this._likes.some(item => item._id === this._handleUserData._id)) {
      this._isLiked = true;
      this._likeButton.classList.add('card__like_active');
    } else {
      this._isLiked = false;
    }


    return this._element;
  }

}




