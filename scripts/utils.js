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

// Событие выключения попапа кнопкой "Escape"
function closeWithEscape (e) {
  if (e.code === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}



export {openPopup, closePopup, closeWithEscape}
