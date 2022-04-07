// Кнопка открытия попапа
const editButton = document.querySelector('.profile__edit-button');
// Кнопка закрытия попапа
const closeButton = document.querySelector('.popap__close-cross');
// Попап
const popap = document.querySelector('.popap');
// Элемент вывода имени пользователя
const userName = document.querySelector('.profile__name');
// Элемент вывода описания пользователя
const userDescription = document.querySelector('.profile__description');
// Форма
const form = document.forms['popapForm'];
// Поле ввода имени
const nameInput = document.querySelector('#name');
// Поле ввода описания
const descriptionInput = document.querySelector('#description');
//  Основная страница
const mainPage = document.querySelector('.page');
//  Шаблон карточки
const cardTemplate = document.querySelector('#card').content;
//Контейнер с карточками
const cardContainer = document.querySelector('.elements__items');


// Функция открытия попапа
function openPopap () {
  popap.classList.add('popap_opened');
  // Добавление данных пользователя в поля ввода
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
}

// Функция закрытия попапа
function closePopap () {
  popap.classList.remove('popap_opened');
}


// Функция добавления данных из формы
function sendFormData (e) {
  e.preventDefault();

  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  closePopap();

}

// Событие клика для открытия попапа
editButton.addEventListener('click', openPopap);

// Событие клика для закрытия попапа
closeButton.addEventListener('click', closePopap);

// Событие отправки данных формы
form.addEventListener('submit', sendFormData);




// Данные для карточек
const initialCards = [
  {
    name: 'Карачаевск',
    link: './images/elements/__item/karachaevsk.jpg'

  },
  {
    name: 'Гора Эльбрус',
    link: './images/elements/__item/gora_elbrus.png'

  },
  {
    name: 'Домбай',
    link: './images/elements/__item/dombai.jpg'

  },
  {
    name: 'Адыл-Су',
    link: 'https://risk.ru/u/img/319/318712.jpeg'

  },
  {
    name: 'Кавказские горы',
    link: './images/elements/__item/gori_kavkaz.jpg'

  },
  {
    name: 'Голубые озера в Кабардино-Балкарии',
    link: './images/elements/__item/golubie_ozera.jpg'

  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Функция добавления карточки
function addCard (data) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = data.link;
  cardElement.querySelector('.card__title').textContent = data.name;
  cardContainer.append(cardElement);

}


// Цикл, добавляющий карточки в соответствии с данными
for (card of initialCards) {
  addCard(card);
}






