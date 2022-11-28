import { editAvatar, editProfileInfo } from './api';
import {
    popupAdd, figcaption, popupImg, popupEdit, img,
    profileName, profileAbout, profileInfoTitle, profileInfoSubtitle, editForm, newPlaceForm,
    settings, popupAvatar, avatarImg, avatarEditForm, renderLoading, renderLoaded, setUserInfo, setCurrentUser
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
    resetForm(popupAdd);
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

export async function saveProfileForm(event) {
    try {
        event.stopPropagation();
        event.preventDefault();
        renderLoading(editForm);
        setCurrentUser(await editProfileInfo(profileName.value, profileAbout.value));
        setUserInfo();
        closeProfileForm();
    }
    catch (error) {
        return Promise.reject(error);
    }
    finally {
        renderLoaded(editForm);
    }
};

export async function saveNewAvatar(event) {
    try {
        event.preventDefault();
        renderLoading(avatarEditForm);
        setCurrentUser(await editAvatar(avatarImg.value));
        setUserInfo();
        closeAvatarForm();
    }
    catch (error) {
        return Promise.reject(error);
    }
    finally {
        renderLoaded(avatarEditForm);
    }
};

export function openAvatarEdit() {
    openPopup(popupAvatar);
    resetForm(popupAvatar);
    revalidateForm({ formElement: avatarEditForm, ...settings });
 
};

export function closeAvatarForm() {
    closePopup(popupAvatar);
};




