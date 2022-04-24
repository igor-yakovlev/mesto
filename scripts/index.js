// Кнопка открытия попапа данных пользователя
const editButton = document.querySelector('.profile__edit-button');
// Кнопка закрытия попапа данных пользователя
const closeButtonUserInfo = document.querySelector('.popap__close-cross_user-info');
// Кнопка открытия попапа добавления картинки
const addButton = document.querySelector('.profile__add-button');
// Кнопка закрытия попапа добавления картинки
const closeButtonAddPlace = document.querySelector('.popap__close-cross_add-place');
// Кнопка закрытия попапа картинки
const closeButtonImagePlace = document.querySelector('.popap__close-cross_image-place');
// Попап данных пользователя
const popapUserInfo = document.querySelector('.popap_user-info');
// Попап добавления картинки
const popapAddPlace = document.querySelector('.popap_add-place');
// Попап картинки
const popapImagePlace = document.querySelector('.popap_image-place');
// Элемент вывода имени пользователя
const userName = document.querySelector('.profile__name');
// Элемент вывода описания пользователя
const userDescription = document.querySelector('.profile__description');
// Форма редактирования данных пользователя
const formUserInfo = document.forms['popapFormUserInfo'];
// Поле ввода имени
const nameInput = formUserInfo.querySelector('#name-input');
// Поле ввода описания
const descriptionInput = formUserInfo.querySelector('#description-input');
// Форма добавления картинки
const formAddPlace = document.forms['popapFormAddPlace'];
// Поле ввода названия картинки
const nameInputImg = formAddPlace.querySelector('#name-place-input');
// Поле ввода описания
const linkInput = formAddPlace.querySelector('#link-input');
//  Шаблон карточки
const cardTemplate = document.querySelector('#card').content;
//Контейнер с карточками
const cardContainer = document.querySelector('.elements__items');
//Картинка в попапе картинки
const popapImage = popapImagePlace.querySelector('.popap__image');
//Все попапы
const popaps = document.querySelectorAll('.popap');

// Функция открытия попапа
function openPopap (popap) {
  popap.classList.add('popap_opened');
}

// Функция закрытия попапа
function closePopap (popap) {
  popap.classList.remove('popap_opened');
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
    openPopap(popapImagePlace);
    popapImage.src = e.target.src;
    popapImage.alt = e.target.alt;
    const popapDescription = popapImagePlace.querySelector('.popap__description');
    popapDescription.textContent = e.target.alt;
  });

  return cardElement;
}

// Функция добавления данных из формы для формирования карточки
function sendFormAddCardPlace (e) {
  e.preventDefault();

  const cardElement = createCard({link: linkInput.value, name: nameInputImg.value});
  cardContainer.prepend(cardElement);
  closePopap(popapAddPlace);
  formAddPlace.reset();
}


// Функция добавления данных из формы для редактирования профиля пользователя
function sendFormUserInfo (e) {
  e.preventDefault();

  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  closePopap(popapUserInfo);

}


// Функция отрисовки карточек
function renderCards () {
  const html = initialCards.map(createCard);
  cardContainer.append(...html);
}
renderCards();


// Событие клика для открытия попапа данных пользователя
editButton.addEventListener('click', () => {
  openPopap(popapUserInfo);

  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;

  // Синхронизация состояния кнопки в зависимости от полей формы
  toggleButton(formUserInfo, '.popap__button', '.popap__input');

  // Синхронизация ошибок в зависимости от полей формы
  const inputs = formUserInfo.querySelectorAll('.popap__input');
  inputs.forEach(input => hideError(input));
});

// Событие клика для закрытия попапа данных пользователя
closeButtonUserInfo.addEventListener('click', () => {
  closePopap(popapUserInfo);
});

// Событие клика для открытия попапа добавления картинки
addButton.addEventListener('click', () => {
  openPopap(popapAddPlace);

  // Синхронизация состояния кнопки в зависимости от полей формы
  toggleButton(formAddPlace, '.popap__button', '.popap__input');

  // Синхронизация ошибок в зависимости от полей формы
  const inputs = formAddPlace.querySelectorAll('.popap__input');
  inputs.forEach(input => hideError(input));

  formAddPlace.reset();

});

// Событие клика для закрытия попапа добавления картинки
closeButtonAddPlace.addEventListener('click', () => {
  closePopap(popapAddPlace);
});

// Событие клика для закрытия попапа картинки
closeButtonImagePlace.addEventListener('click', () => {
  closePopap(popapImagePlace);
});


// Событие отправки формы данных пользователя
formUserInfo.addEventListener('submit', sendFormUserInfo);

// Событие отправки формы добавления картинки
formAddPlace.addEventListener('submit', sendFormAddCardPlace);


// Перебор всех попапов и добавление события закрытия попапа  
popaps.forEach(popap => {
  popap.addEventListener('click', (e) => {
    if (e.target.classList.contains('popap_opened')) {
      closePopap(popap);
    }
  })
})

// Событие выключения попапа кнопкой "Escape"
document.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    console.log(e.key);
    popaps.forEach(popap => {
      if (popap.classList.contains('popap_opened')) {
        closePopap(popap);
      }
    });
  }
});
