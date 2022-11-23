
import {
    popupAdd, figcaption, popupImg, popupEdit, img,
    profileName, profileAbout, profileInfoTitle, profileInfoSubtitle, editForm, newPlaceForm,
    settings, popupAvatar
} from './utils';
import { hideInputError } from './validate';

export function openPopup(popup) {
    const openedForm = popup.querySelector('.popup__form');
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
    openedForm.reset();
    
};

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
};

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
};

export function openAddForm() {

    openPopup(popupAdd);
    revalidateForm({ formElement: newPlaceForm, ...settings });
};

export function closeAddForm() {
    closePopup(popupAdd);
};

export function openImg(event) {
    const image = event.currentTarget;
    const link = image.src;
    const name = image.alt;
    figcaption.innerText = name;
    img.src = link;
    img.alt = name;
    openPopup(popupImg);
};

export function closeProfileForm() {
    closePopup(popupEdit);
};

export function openProfileForm() {
    openPopup(popupEdit)
    profileName.value = profileInfoTitle.innerText;
    profileAbout.value = profileInfoSubtitle.innerText;
    revalidateForm({ formElement: editForm, ...settings });
};

export function saveProfileForm(event) {
    event.stopPropagation();
    event.preventDefault();

    function saveName(name) {
        profileInfoTitle.innerText = name;
    }

    function saveJob(job) {
        profileInfoSubtitle.innerText = job;
    }

    saveName(profileName.value);
    saveJob(profileAbout.value);
    closeProfileForm();
};

export function openAvatarEdit() {
    openPopup(popupAvatar);
}

export function closeAvatarForm() {
    closePopup(popupAvatar);
}

export function saveNewAvatar (event) {
    event.preventDefault();

    const avatarImage = document.querySelector('.profile__avatar');
    const idValue = document.getElementById('avatar-input');
    avatarImage.src = idValue.value;
    event.currentTarget.reset();
    closeAvatarForm();

}


