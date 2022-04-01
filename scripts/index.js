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



// Функция открытия попапа
function openPopap () {
  popap.classList.add('popap_opened');
  // Отключение скролла
  mainPage.classList.add('page_scroll_off');
  mainPage.classList.remove('page_scroll_on');
  // Добавление данных пользователя в поля ввода
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
}

// Функция закрытия попапа
function closePopap () {
  popap.classList.remove('popap_opened');
  // Включение скролла
  mainPage.classList.add('page_scroll_on');
  mainPage.classList.remove('page_scroll_off');
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

