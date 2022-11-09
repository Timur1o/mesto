const popupAdd = document.querySelector('.popup-add');
const popupImg = document.querySelector('.popup-image');
const img = document.querySelector('.popup-image img');
const figcaption = document.querySelector('.popup-image .element__image-name');
const popupEdit = document.querySelector('.popup-edit');


export function openPopup(popup) {
    popup.classList.add('popup_opened');
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

export function openAddForm() {
    openPopup(popupAdd);
}

export function closeAddForm() {
    closePopup(popupAdd);
}

export function openImg(event) {
    const image = event.currentTarget;
    const link = image.src;
    const name = image.alt;
    figcaption.innerText = name;
    img.src = link;
    img.alt = name;
    openPopup(popupImg);
}

export function closeProfileForm() {
    closePopup(popupEdit);
}


