import { editAvatar, editProfileInfo } from './api';
import {
    popupAdd, figcaption, popupImg, popupEdit, img,
    profileName, profileAbout, profileInfoTitle, profileInfoSubtitle, editForm, newPlaceForm,
    settings, popupAvatar, profileAvatar, avatarImg, avatarEditForm
} from './utils';
import { revalidateForm } from './validate';

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
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

function resetForm(popup) {
    const openedForm = popup.querySelector('.popup__form');
    openedForm.reset();
};

export function openAddForm() {
    openPopup(popupAdd);
    revalidateForm({ formElement: newPlaceForm, ...settings });
    resetForm(popupAdd);
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

export async function saveProfileForm(event) {
    event.stopPropagation();
    event.preventDefault();
    newPlaceForm.querySelector(settings.popupSubmitButtonSelector).textContent = 'Сохранение...';
    const result = await editProfileInfo(profileName.value, profileAbout.value);
    profileInfoTitle.innerText = result.name;
    profileInfoSubtitle.innerText = result.about;
    closeProfileForm();
    editForm.querySelector(settings.popupSubmitButtonSelector).textContent = 'Сохранить';
};

export async function saveNewAvatar(event) {
    event.preventDefault();
    avatarEditForm.querySelector(settings.popupSubmitButtonSelector).textContent = 'Сохранение...';
    const result = await editAvatar(avatarImg.value)
    profileAvatar.src = result.avatar;
    event.target.reset();
    closeAvatarForm();
    avatarEditForm.querySelector(settings.popupSubmitButtonSelector).textContent = 'Сохранить';
}

export function openAvatarEdit() {
    openPopup(popupAvatar);
    resetForm(popupAvatar);
}

export function closeAvatarForm() {
    closePopup(popupAvatar);
}




