const content = document.querySelector('.content');
const profileName = document.querySelector('.profile__info-title');
const profileJob = document.querySelector('.profile__info-subtitle')
const popup = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupEdit = document.querySelector('.popup-edit');
const popupImg = document.querySelector('.popup-image');
const img = document.querySelector('.popup-image img')
const figcaption = document.querySelector('.popup-image .element__image-name')
const elementsList = document.querySelector('.elements__list');
const editForm = document.querySelector('.popup__form[name="edit-profile"]')
const newPlaceForm = document.querySelector('.popup__form[name="new-place"]')
const profileInfoTitle = document.querySelector('.profile__info-title');
const profileInfoSubtitle = document.querySelector('.profile__info-subtitle');
const template = document.querySelector('template');
const editProfileOpen = document.querySelector('.page .content .profile .profile__edit-button');
const editProfileClose = document.querySelector('.popup-edit .popup__close-button');
const addCardForm = document.querySelector('.page .content .profile .profile__add-button');
const addCardButton = document.querySelector('.popup-add .popup__submit-button');
const closeAddCardForm = document.querySelector('.popup-add .popup__close-button')
const closeImgButton = document.querySelector('.popup-image .popup__close-button')
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
    editProfileClose.addEventListener('click', closeProfileForm);
    editForm.addEventListener('submit', saveProfileForm);
    newPlaceForm.addEventListener('submit', addCard);
    addCardForm.addEventListener('click', openAddForm);
    addCardButton.addEventListener('click', addCard);
    closeAddCardForm.addEventListener('click', closeAddForm);
    closeImgButton.addEventListener('click', closeImg);
})

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function openProfileForm() {
    openPopup(popupEdit)
    let name = editForm.querySelector('[name="name"]');
    let job = editForm.querySelector('[name="about"]');
    name.value = profileInfoTitle.innerText;
    job.value = profileInfoSubtitle.innerText;
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
    const card = event.currentTarget;
    const image = card.querySelector('.element__image');
    const link = image.src;
    const name = image.alt;
    figcaption.innerText = name;
    img.src = link;
    img.alt = name;
    openPopup(popupImg);
}

function closeImg() {
    closePopup(popupImg);
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

    let name = editForm.querySelector('[name="name"]');
    let job = editForm.querySelector('[name="about"]');
    saveName(name.value);
    saveJob(job.value);
    closeProfileForm();
}

function addCard(event) {  
    event.stopPropagation();
    event.preventDefault();

    let name = newPlaceForm.querySelector('[name="name"]');
    let link = newPlaceForm.querySelector('[name="link"]');
    createCard(name.value , link.value);
    
    name.value = '';
    link.value = '';

    closeAddForm();
}
function createCard(name, link) {
    const cardClone = template.content.firstElementChild.cloneNode(true);
    const elementImage = cardClone.querySelector('.element__image');
    elementImage.src = link;
    elementImage.alt = name;
    cardClone.querySelector('.element__title').textContent = name;
    cardClone.addEventListener('click', openImg);
    cardClone.querySelector('.element__like-button').addEventListener('click', like);
    cardClone.querySelector('.element__delete-button').addEventListener('click', removeCard);
    elementsList.prepend(cardClone);
}

function like(event) {
    event.stopPropagation();
    event.preventDefault();

    const button = event.currentTarget;

    const isLiked = button.classList.contains('element__like-button_active');
    if (isLiked) {
        button.classList.remove('element__like-button_active')
    } else {
        button.classList.add('element__like-button_active')
    }
    
}

function removeCard(event) {
    event.stopPropagation();
    event.preventDefault();

    const button = event.currentTarget;
    const card = button.closest('.element');
    card.remove();
}

function drawInitialCards() {

    for (let i = 0; i < initialCards.length; i = i + 1) {
        const card = initialCards[i];
        createCard(card.name, card.link)
    }

}

