import {openPopup, closePopup} from './utils.js';
import Card from "./Card.js";
import FormValidator from './FormValidator.js';

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
//Контейнер с карточками
const cardContainer = document.querySelector('.elements__items');
//Все попапы
const popups = document.querySelectorAll('.popup');

// Функция добавления данных из формы для формирования карточки
function sendFormAddCardPlace (e) {
  e.preventDefault();
  const cardElement = new Card('#card', {name: nameInputImg.value, link: linkInput.value}).generateCard();
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
  const html = initialCards.map(card => {
    const cardItem = new Card('#card', card).generateCard();
    return cardItem;
  });
  cardContainer.append(...html);
}

renderCards();


// Событие клика для открытия попапа данных пользователя
editButton.addEventListener('click', () => {
  openPopup(popupUserInfo);
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;

  // Синхронизация состояния кнопки в зависимости от полей формы
  validationUserInfo().toggleButtonHandler();

  // Синхронизация ошибок в зависимости от полей формы
  const inputs = formUserInfo.querySelectorAll('.popup__input');
  inputs.forEach(input => validationUserInfo().hideErrorHandler(input));
});

// Событие клика для закрытия попапа данных пользователя
closeButtonUserInfo.addEventListener('click', () => {
  closePopup(popupUserInfo);
});

// Событие клика для открытия попапа добавления картинки
addButton.addEventListener('click', () => {
  openPopup(popupAddPlace);

  // Синхронизация состояния кнопки в зависимости от полей формы
  validationAddPlace().toggleButtonHandler();

  // Синхронизация ошибок в зависимости от полей формы
  const inputs = formAddPlace.querySelectorAll('.popup__input');
  inputs.forEach(input => validationAddPlace().hideErrorHandler(input));

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

// Функция влючения валидации формы данных пользователя
function validationUserInfo () {
  return new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_invalid',
  }, formUserInfo)
}

validationUserInfo().enableValidation();

// Функция влючения валидации формы добавления картинки
function validationAddPlace () {
  return new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_invalid',
  }, formAddPlace)
}

validationAddPlace().enableValidation();



