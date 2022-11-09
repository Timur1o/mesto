import '../styles/index.css'; // добавьте импорт главного файла стилей
import {validateForm} from './validate.js'; 
import './card.js'; 
import {openPopup, closePopup, openAddForm, closeAddForm, openImg, closeProfileForm} from './modal.js'; 
import './utils.js'; 

const editForm = document.querySelector('.popup__form[name="edit-profile"]')
const profileName = editForm.querySelector('[name="name"]');
const profileAbout = editForm.querySelector('[name="about"]');
const popupEdit = document.querySelector('.popup-edit');
const elementsList = document.querySelector('.elements__list');
const newPlaceForm = document.querySelector('.popup__form[name="new-place"]')
const profileInfoTitle = document.querySelector('.profile__info-title');
const profileInfoSubtitle = document.querySelector('.profile__info-subtitle');
const template = document.querySelector('template');
const editProfileOpen = document.querySelector('.page .content .profile .profile__edit-button');
const cardName = newPlaceForm.querySelector('[name="name"]');
const cardLink = newPlaceForm.querySelector('[name="link"]');
const addCardForm = document.querySelector('.page .content .profile .profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const initialCards = [{
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

window.addEventListener('load', function() {
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

function openProfileForm() {
    openPopup(popupEdit)

    profileName.value = profileInfoTitle.innerText;
    profileAbout.value = profileInfoSubtitle.innerText;
}

function saveProfileForm(event) {
    event.stopPropagation();
    event.preventDefault();
    const formError = validateForm(event.currentTarget, [
        {selector: '#name' , regExp: new RegExp('^[А-Яа-яЁёA-Za-z\s]+$')},
        {selector: '#about' , regExp: new RegExp('^https?:\/\/.+$')},
    ]);
    const errorSpan = event.currentTarget.querySelector('span.error');
    errorSpan.textContent = formError;

    function saveName(name) {
        profileInfoTitle.innerText = name; 
    }

    function saveJob(job) {
        profileInfoSubtitle.innerText = job;
    }
   if(!formError) {
    saveName(profileName.value);
    saveJob(profileAbout.value);
    closeProfileForm();
   }
}

function addCard(event) {  
    event.stopPropagation();
    event.preventDefault();
    const formError = validateForm(event.currentTarget, [
        {selector: '#place-name' , regExp: new RegExp('^[А-Яа-яЁёA-Za-z\s]+$')},
        {selector: '#url-link' , regExp: new RegExp('^https?:\/\/.+$')},
    ]);
    const errorSpan = event.currentTarget.querySelector('span.error');
    errorSpan.textContent = formError;
    if(!formError) {

        elementsList.prepend(getCard(cardName.value , cardLink.value));
    
        event.currentTarget.reset();
        
        closeAddForm();
    }


}
function getCard(name, link) {
    const cardClone = template.content.firstElementChild.cloneNode(true);
    const elementImage = cardClone.querySelector('.element__image');
    elementImage.src = link;
    elementImage.alt = name;
    cardClone.querySelector('.element__title').textContent = name;
    elementImage.addEventListener('click', openImg);
    cardClone.querySelector('.element__like-button').addEventListener('click', like);
    cardClone.querySelector('.element__delete-button').addEventListener('click', removeCard);
    return cardClone;

}

function like(event) {
    event.currentTarget.classList.toggle('element__like-button_active');
}

function removeCard(event) {

    const button = event.currentTarget;
    const card = button.closest('.element');
    card.remove();
}

function drawInitialCards() {

    for (let i = 0; i < initialCards.length; i = i + 1) {
        const card = initialCards[i];
        elementsList.prepend(getCard(card.name, card.link));
    }

}

