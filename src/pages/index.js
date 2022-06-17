import './index.css';

import initialCards from "../data/initialCards.js";
import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/popupWithForm.js";
import UserInfo from '../components/UserInfo.js';
import settings from '../utils/constants.js';
import Api from './../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

/**
 *  Кнопка открытия попапа данных пользователя
 */
const editButton = document.querySelector('.profile__edit-button');
/**
 *  Кнопка открытия попапа добавления картинки
 */
const addButton = document.querySelector('.profile__add-button');


/**
 *  Класс запроса к серверу
 */
 const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: '08cab31c-489e-4687-b8a9-d71a23c1df31',
    'Content-type': 'application/json'
  }
});

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([userData, cardInfo]) => {

  /**
   *  Функция создания карточки
   */
  function createCard(item) {
    const cardElement = new Card({cardSelector: '#card', data: item,
    handleCardClick:  () => {
      popupWithImage.open(item);
    },
    handleCardDelete: (elem) => {
      popupConfirm.open();
      popupConfirm.setSubmitHandler(
        () => {
          api.deleteCard(item._id)
          .then(res => {
            elem.remove();
            popupConfirm.close();
          })
        }
      )
    },
    handleCardLike: () => {
      if (cardElement._isLiked) {
        api.deleteLike(item._id)
        .then(res => {
          cardElement._removeLike(res.likes)
        })
      } else {
        api.setLike(item._id)
          .then(res => {
            cardElement._setLike(res.likes)
          })
      }
    },
    handleUserData: userData
  })

    return cardElement.generateCard();
  }

  const cardList = new Section(
    (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    }, '.elements__items');

  /**
   *  Класс для появления диалогового окна удаления карточки
   */
  const popupConfirm = new PopupWithConfirmation('.popup_confirm');
  popupConfirm.setEventListeners();


  /**
   *  Класс для открытия попапа картинки
   */
  const popupWithImage = new PopupWithImage('.popup_image-place');
  popupWithImage.setEventListeners();


  /**
   *  Класс для формы отправки данных и создания картинки
   */
  const popupPlace = new PopupWithForm({popupSelector: '.popup_add-place', formSelector: 'popupFormAddPlace' , handleFormSubmit: (data) => {
    api.setCard({
      name: data.name,
      link: data.link
    })
    .then(res => {
      const cardElement = createCard(res);
      cardList.addItem(cardElement);
      popupPlace.close();
    })

    }
  });
  popupPlace.setEventListeners();


  /**
   *  Класс для данных пользователя
   */
  const userInfo = new UserInfo({userName : '.profile__name', userDescription: '.profile__description', userAvatar: '.profile__avatar'});

  /**
   *  Класс для формы отправки данных пользователя
   */
  const popupUser = new PopupWithForm({popupSelector: '.popup_user-info', formSelector: 'popupFormUserInfo', handleFormSubmit: (data) => {
    api.setUser({
      name: data.name,
      about: data.description
    })
    .then(res => {
      userInfo.setUserInfo(res);
      popupUser.close();
    })

    }
  });
  popupUser.setEventListeners();

  /**
   *  Событие клика для открытия попапа данных пользователя
   */
  editButton.addEventListener('click', () => {
    popupUser.open();
    const data =  userInfo.getUserInfo();
    popupUser.setInputValues(data);
    /**
     *  Синхронизация состояния кнопки в зависимости от полей формы
     */
    formValidators['popupFormUserInfo'].resetValidation();

  });

  /**
   *  Событие клика для открытия попапа добавления картинки
   */
  addButton.addEventListener('click', () => {
    popupPlace.open();
    /**
     *  Синхронизация состояния кнопки в зависимости от полей формы
     */
    formValidators['popupFormAddPlace'].resetValidation();
  });


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


    cardList.renderItems(cardInfo);

    const { name, about, avatar} = userData;
    userInfo.setUserInfo({name: name, about: about, avatar: avatar});
  });
