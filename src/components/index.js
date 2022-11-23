import '../styles/index.css';
import { enableValidation } from './validate';
import { addCard, drawInitialCards } from './card';
import { closePopup, openAddForm, openProfileForm, saveProfileForm , openAvatarEdit, saveNewAvatar} from './modal';
import { editForm, newPlaceForm, editProfileOpen, addCardForm, settings , avatarEditForm, avatarOverlay} from './utils';


window.addEventListener('load', function () {
    drawInitialCards()
    editProfileOpen.addEventListener('click', openProfileForm);
    editForm.addEventListener('submit', saveProfileForm);
    newPlaceForm.addEventListener('submit', addCard);
    addCardForm.addEventListener('click', openAddForm);
    avatarOverlay.addEventListener('click', openAvatarEdit)
    avatarEditForm.addEventListener('submit', saveNewAvatar)
    const popups = document.querySelectorAll('.popup');
    popups.forEach((popup) => {
        popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                closePopup(popup);
            }
            if (evt.target.classList.contains('popup__close-button')) {
                closePopup(popup);
            }
        })
    })
    enableValidation({ formElement: editForm, ...settings });
    enableValidation({ formElement: newPlaceForm, ...settings });
    enableValidation({ formElement: avatarEditForm, ...settings });
});




