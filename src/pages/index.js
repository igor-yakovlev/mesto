import './index.css';


import initialCards from "../data/initialCards.js";
import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/popupWithForm.js";
import UserInfo from '../components/UserInfo.js';

// Кнопка открытия попапа данных пользователя
const editButton = document.querySelector('.profile__edit-button');
// Кнопка открытия попапа добавления картинки
const addButton = document.querySelector('.profile__add-button');
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

// Класс для закрытия всех попапов
const popup = new Popup('.popup')
popup.setEventListeners();

// Класс для открытия попапа картинки
const popupWithImage = new PopupWithImage('.popup_image-place');
popupWithImage.setEventListeners();


// Класс для формы отправки данных и создания картинки
const popupPlace = new PopupWithForm({popupSelector: '.popup_add-place', formSelector: 'popupFormAddPlace' , handleFormSubmit: (data) => {
  const cardElement = new Card('#card', {name: nameInputImg.value, link: linkInput.value},  () => { popupWithImage.open(data)}).generateCard();
  cardList.addItem(cardElement);
  popupPlace.close()
  }
});
popupPlace.setEventListeners();

// Класс для данных пользователя
const userInfo = new UserInfo({userName : '.profile__name', userDescription: '.profile__description'});

// Класс для формы отправки данных пользователя
const popupUser = new PopupWithForm({popupSelector: '.popup_user-info', formSelector: 'popupFormUserInfo', handleFormSubmit: (data) => {
  userInfo.setUserInfo(data);
  popupUser.close()
  }
});
popupUser.setEventListeners();


// Событие клика для открытия попапа данных пользователя
editButton.addEventListener('click', () => {
  popupUser.open();
  const {name, description} =  userInfo.getUserInfo();
  nameInput.value = name;
  descriptionInput.value = description;
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




