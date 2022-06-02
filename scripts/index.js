import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/popupWithForm.js";

// Кнопка открытия попапа данных пользователя
const editButton = document.querySelector('.profile__edit-button');
// Кнопка открытия попапа добавления картинки
const addButton = document.querySelector('.profile__add-button');
// Попап данных пользователя
const popupUserInfo = document.querySelector('.popup_user-info');
// Попап добавления картинки
const popupAddPlace = document.querySelector('.popup_add-place');
// Попап картинки
const popupImagePlace = document.querySelector('.popup_image-place');
// Элемент картинки в попапе картинки
const popupImage = popupImagePlace.querySelector('.popup__image');
// Элемент описания в попапе картинки
const popupDescription = popupImagePlace.querySelector('.popup__description');
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

const popup = new Popup('.popup')
popup.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_image-place');
popupWithImage.setEventListeners();



// const popupPlace = new PopupWithForm({popupSelector: '.popup_add-place', formSelector: 'popupFormAddPlace' , handleFormSubmit: () => {

// }});




// Функция открытия попапа
// function openPopup (popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown',  closeWithEscape);
// }

// Функция закрытия попапа
// function closePopup (popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown',  closeWithEscape);
// }

// функция выключения попапа кнопкой "Escape"
// function closeWithEscape (e) {
//   if (e.code === 'Escape') {
//     const activePopup = document.querySelector('.popup_opened');
//     closePopup(activePopup);
//   }
// }

// Функция открытия попапа картинки
// function handleCardClick(name, link) {
//   popupImage.src = link;
//   popupImage.alt = name;
//   popupDescription.textContent = name;
//   openPopup(popupImagePlace);
// }




// Функция добавления данных из формы для формирования карточки
function sendFormAddCardPlace (e) {
  e.preventDefault();
  const cardElement = new Card('#card', {name: nameInputImg.value, link: linkInput.value}, popupWithImage.open()).generateCard();
  cardContainer.prepend(cardElement);
  popup.close();
  // closePopup(popupAddPlace);
  formAddPlace.reset();
}

// Функция добавления данных из формы для редактирования профиля пользователя
function sendFormUserInfo (e) {
  e.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  // closePopup(popupUserInfo);
  popup.close();
}


// Класс отрисовки карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card('#card', item, () => {
      popupWithImage.open(item);
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, '.elements__items');
cardList.renderItems();


// Событие клика для открытия попапа данных пользователя
editButton.addEventListener('click', () => {
  // openPopup(popupUserInfo);
  popup.open();
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;

  // Синхронизация состояния кнопки в зависимости от полей формы
  formValidators['popupFormUserInfo'].resetValidation();

});


// Событие клика для открытия попапа добавления картинки
addButton.addEventListener('click', () => {
  // openPopup(popupAddPlace);
  popupPlace.open();
  // Синхронизация состояния кнопки в зависимости от полей формы
  formValidators['popupFormAddPlace'].resetValidation();
  formAddPlace.reset();
});


// Событие отправки формы данных пользователя
formUserInfo.addEventListener('submit', sendFormUserInfo);

// Событие отправки формы добавления картинки
formAddPlace.addEventListener('submit', sendFormAddCardPlace);


// Перебор всех попапов и добавление события закрытия попапа при клике на крестик или оверлей
// popups.forEach(popup => {
//   popup.addEventListener('mousedown', (e) => {
//     if (e.target.classList.contains('popup_opened')) {
//       closePopup(popup);
//     }
//     if (e.target.classList.contains('popup__close-cross')) {
//       closePopup(popup);
//     }
//   })
// })

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_invalid',
}

const formValidators = {};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;

    validator.enableValidation();
  })
}

enableValidation(settings);




