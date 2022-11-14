import {
    popupAdd, figcaption, popupImg, popupEdit, img,
    profileName, profileAbout, profileInfoTitle, profileInfoSubtitle
} from './utils';

export function openPopup(popup) {
    popup.classList.add('popup_opened');
};

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

export function openAddForm() {
    openPopup(popupAdd);
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
