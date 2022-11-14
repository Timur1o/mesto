import '../styles/index.css';
import { enableValidation } from './validate';
import { addCard, drawInitialCards } from './card';
import { closePopup, openAddForm, openProfileForm, saveProfileForm } from './modal';
import {
    popupAdd, popupImg, editForm,
    popupEdit, newPlaceForm,
    editProfileOpen, addCardForm, closeButtons
} from './utils';

window.addEventListener('load', function () {
    drawInitialCards()
    editProfileOpen.addEventListener('click', openProfileForm);
    editForm.addEventListener('submit', saveProfileForm);
    newPlaceForm.addEventListener('submit', addCard);
    addCardForm.addEventListener('click', openAddForm);
    closeButtons.forEach((button) => {
        const popup = button.closest('.popup');
        button.addEventListener('click', () => closePopup(popup));
    });
})

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { // 
        closePopup(popupAdd);
        closePopup(popupEdit);
        closePopup(popupImg);
    }
});

document.addEventListener('click', (e) => {
    if (e.target === popupAdd) {
        closePopup(popupAdd);
    }
    if (e.target === popupEdit) {
        closePopup(popupEdit);
    }
    if (e.target === popupImg) {
        closePopup(popupImg);
    }
});

enableValidation();

