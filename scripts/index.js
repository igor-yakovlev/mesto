// Кнопка открытия попапа данных пользователя
const editButton = document.querySelector('.profile__edit-button');
// Кнопка закрытия попапа данных пользователя
const closeButtonUserInfo = document.querySelector('.popup__close-cross_user-info');
// Кнопка открытия попапа добавления картинки
const addButton = document.querySelector('.profile__add-button');
// Кнопка закрытия попапа добавления картинки
const closeButtonAddPlace = document.querySelector('.popup__close-cross_add-place');
// Кнопка закрытия попапа картинки
const closeButtonImagePlace = document.querySelector('.popup__close-cross_image-place');
// Попап данных пользователя
const popupUserInfo = document.querySelector('.popup_user-info');
// Попап добавления картинки
const popupAddPlace = document.querySelector('.popup_add-place');
// Попап картинки
const popupImagePlace = document.querySelector('.popup_image-place');
// Элемент вывода имени пользователя
const userName = document.querySelector('.profile__name');
// Элемент вывода описания пользователя
const userDescription = document.querySelector('.profile__description');
// Форма редактирования данных пользователя
const formUserInfo = document.forms['popupFormUserInfo'];
// Поле ввода имени
const nameInput = formUserInfo.querySelector('#name-input');
// Поле ввода описания
const descriptionInput = formUserInfo.querySelector('#description-input');
// Форма добавления картинки
const formAddPlace = document.forms['popupFormAddPlace'];
// Поле ввода названия картинки
const nameInputImg = formAddPlace.querySelector('#name-place-input');
// Поле ввода описания
const linkInput = formAddPlace.querySelector('#link-input');
//  Шаблон карточки
const cardTemplate = document.querySelector('#card').content;
//Контейнер с карточками
const cardContainer = document.querySelector('.elements__items');
//Картинка в попапе картинки
const popupImage = popupImagePlace.querySelector('.popup__image');
//Все попапы
const popups = document.querySelectorAll('.popup');

// Функция открытия попапа
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown',  closeWithEscape);
}

// Функция закрытия попапа
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown',  closeWithEscape);
}


// Функция создания карточки
function createCard ({link, name}) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const image = cardElement.querySelector('.card__image');
  const title = cardElement.querySelector('.card__title');

  image.src = link;
  image.alt = name;
  title.textContent = name;

  // Кнопка добавления лайка
  const like = cardElement.querySelector('.card__like');
  // Событие добавление лайка на карточке
  like.addEventListener('click', (e) => {
    e.target.classList.toggle('card__like_active');
  });

  // Кнопка удаления
  const del = cardElement.querySelector('.card__delete');

  // Событие удаления карточки
  del.addEventListener('click', (e) => {
    const delCard = e.target.closest('.card');
    delCard.remove();
  });

  // Событие открытия попапа картинки
  image.addEventListener('click', (e) => {
    openPopup(popupImagePlace);
    popupImage.src = e.target.src;
    popupImage.alt = e.target.alt;
    const popupDescription = popupImagePlace.querySelector('.popup__description');
    popupDescription.textContent = e.target.alt;
  });

  return cardElement;
}

// Функция добавления данных из формы для формирования карточки
function sendFormAddCardPlace (e) {
  e.preventDefault();

  const cardElement = createCard({link: linkInput.value, name: nameInputImg.value});
  cardContainer.prepend(cardElement);
  closePopup(popupAddPlace);
  formAddPlace.reset();
}


// Функция добавления данных из формы для редактирования профиля пользователя
function sendFormUserInfo (e) {
  e.preventDefault();

  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  closePopup(popupUserInfo);

}


// Функция отрисовки карточек
function renderCards () {
  const html = initialCards.map(createCard);
  cardContainer.append(...html);
}
renderCards();


// Событие клика для открытия попапа данных пользователя
editButton.addEventListener('click', () => {
  openPopup(popupUserInfo);

  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;

  // Синхронизация состояния кнопки в зависимости от полей формы
  toggleButton(formUserInfo, '.popup__button', '.popup__input', 'popup__button_disabled');

  // Синхронизация ошибок в зависимости от полей формы
  const inputs = formUserInfo.querySelectorAll('.popup__input');
  inputs.forEach(input => hideError(input, 'popup__input_invalid'));
});

// Событие клика для закрытия попапа данных пользователя
closeButtonUserInfo.addEventListener('click', () => {
  closePopup(popupUserInfo);
});

// Событие клика для открытия попапа добавления картинки
addButton.addEventListener('click', () => {
  openPopup(popupAddPlace);

  // Синхронизация состояния кнопки в зависимости от полей формы
  toggleButton(formAddPlace, '.popup__button', '.popup__input', 'popup__button_disabled');

  // Синхронизация ошибок в зависимости от полей формы
  const inputs = formAddPlace.querySelectorAll('.popup__input');
  inputs.forEach(input => hideError(input, 'popup__input_invalid'));

  formAddPlace.reset();

});

// Событие клика для закрытия попапа добавления картинки
closeButtonAddPlace.addEventListener('click', () => {
  closePopup(popupAddPlace);
});

// Событие клика для закрытия попапа картинки
closeButtonImagePlace.addEventListener('click', () => {
  closePopup(popupImagePlace);
});


// Событие отправки формы данных пользователя
formUserInfo.addEventListener('submit', sendFormUserInfo);

// Событие отправки формы добавления картинки
formAddPlace.addEventListener('submit', sendFormAddCardPlace);


// Перебор всех попапов и добавление события закрытия попапа
popups.forEach(popup => {
  popup.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  })
})

// Событие выключения попапа кнопкой "Escape"
function closeWithEscape (e) {
    if (e.code === 'Escape') {
      const activePopup = document.querySelector('.popup_opened');
      closePopup(activePopup);
    }
}



