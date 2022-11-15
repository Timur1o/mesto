import { addCard } from './card';
import {
    popupAdd, figcaption, popupImg, popupEdit, img,
    profileName, profileAbout, profileInfoTitle, profileInfoSubtitle, editForm, newPlaceForm
} from './utils';
import { revalidateForm } from './validate';

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
    document.addEventListener('keyup', submitByEnter);
};

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
    document.removeEventListener('keyup', submitByEnter);
};

function submitByEnter (evt) {
    if (evt.key === 'Enter') {
        document.querySelector(".popup__submit-button").click();
    }
}

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
};

export function openAddForm() {
    openPopup(popupAdd);
    revalidateForm(newPlaceForm);
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
    revalidateForm(editForm);
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
