//Хотелось бы создать отдельный файл с константами, но я использовал utils

export const popupAdd = document.querySelector('.popup-add');
export const popupImg = document.querySelector('.popup-image');
export const img = document.querySelector('.popup-image img');
export const popupAvatar = document.querySelector('.popup-avatar');
export const avatarEditForm = document.querySelector('.popup__form[name="avatar"]');
export const profileAvatar = document.querySelector('.profile__avatar');
export const avatarImg = avatarEditForm.querySelector('[name="avatar"]');
export const avatarOverlay = document.querySelector('.profile__edit-overlay');
export const figcaption = document.querySelector('.popup-image .element__image-name');
export const editForm = document.querySelector('.popup__form[name="edit-profile"]')
export const profileName = editForm.querySelector('[name="name"]');
export const profileAbout = editForm.querySelector('[name="about"]');
export const popupEdit = document.querySelector('.popup-edit');
export const elementsList = document.querySelector('.elements__list');
export const newPlaceForm = document.querySelector('.popup__form[name="new-place"]')
export const profileInfoTitle = document.querySelector('.profile__info-title');
export const profileInfoSubtitle = document.querySelector('.profile__info-subtitle');
export const editProfileOpen = document.querySelector('.page .content .profile .profile__edit-button');
export const addCardForm = document.querySelector('.page .content .profile .profile__add-button');
export const cardName = newPlaceForm.querySelector('[name="name"]');
export const cardLink = newPlaceForm.querySelector('[name="link"]');
export const template = document.querySelector('template');
export const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
}, {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
}, {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
}, {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
}, {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
}, {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
}];

export const settings = {
    popupSubmitButtonSelector: '.popup__submit-button',
    popupFormField: '.popup__form-field',
    popupFormFieldError: 'popup__form-field-error_active',
    popupFormFieldTypeError: 'popup__form-field_type_error'
}


