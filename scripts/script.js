const content = document.querySelector('.content');
const profileTitle = document.querySelector('.profile__info-title');
const profileJob = document.querySelector('.profile__info-subtitle')
const editForm = document.querySelector('.popup__form[name="edit-profile"]')
const profileName = editForm.querySelector('[name="name"]');
const profileAbout = editForm.querySelector('[name="about"]');
const popupAdd = document.querySelector('.popup-add');
const popupEdit = document.querySelector('.popup-edit');
const popupImg = document.querySelector('.popup-image');
const img = document.querySelector('.popup-image img')
const figcaption = document.querySelector('.popup-image .element__image-name')
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

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function openProfileForm() {
    openPopup(popupEdit)

    profileName.value = profileInfoTitle.innerText;
    profileAbout.value = profileInfoSubtitle.innerText;
}

function closeProfileForm() {
    closePopup(popupEdit);
}

function openAddForm() {
    openPopup(popupAdd);
}

function closeAddForm() {
    closePopup(popupAdd);
}

function openImg(event) {
    const image = event.currentTarget;
    const link = image.src;
    const name = image.alt;
    figcaption.innerText = name;
    img.src = link;
    img.alt = name;
    openPopup(popupImg);
}

function saveProfileForm(event) {
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
}

function addCard(event) {  
    event.stopPropagation();
    event.preventDefault();

    elementsList.prepend(getCard(cardName.value , cardLink.value));
    
    event.currentTarget.reset();
    
    closeAddForm();
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

