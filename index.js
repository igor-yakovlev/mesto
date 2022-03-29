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
const form = document.querySelector('.popap__form');
// Поле ввода имени
const nameInput = document.querySelector('#name');
// Поле ввода описания
const descriptionInput = document.querySelector('#description');




// Функция открытия попапа
function openPopap () {
  popap.classList.add('popap_opened');
  // Отключение скролла
  document.body.style.overflow = 'hidden';
  // Добавление данных пользователя в поля ввода
  nameInput.value = userName.innerHTML;
  descriptionInput.value = userDescription.innerHTML;
}

// Функция закрытия попапа
function closePopap () {
  popap.classList.remove('popap_opened');
  // Включение скролла
  document.body.style.overflow = '';
}


// Функция добавления данных из формы
function formSubmitHandler (e) {
  e.preventDefault();

  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  closePopap();

}

// Событие клика для открытия попапа
editButton.addEventListener('click', openPopap);

// Событие клика для закрытия попапа
closeButton.addEventListener('click', closePopap);

// Событие нажатия на клавишу для закрытия попапа
window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    closePopap();
  }
});

form.addEventListener('submit', formSubmitHandler);



// Иконки like
const likes = document.querySelectorAll('.element__svg-image');

//Событие заполнения иконки при нажатии
likes.forEach(like => {
  like.addEventListener('click', () => {
    like.classList.toggle('element__svg-image_active');
  })
})

