let content = document.querySelector('.content');

window.onload = function() {
    fillProfile()
    drawCards()

    let EditButton = document.querySelector('.page .content .profile .profile__edit-button');
    EditButton.addEventListener('click', openProfileForm);

    let CloseButton = document.querySelector('.popup-edit .popup__close-button')
    CloseButton.addEventListener('click', closeProfileForm);

    let SaveButton = document.querySelector('.popup-edit .popup__submit-button')
    SaveButton.addEventListener('click', saveProfileForm);

    let AddButton = document.querySelector('.page .content .profile .profile__add-button');
    AddButton.addEventListener('click', openAddForm);

    let AddCardButton = document.querySelector('.popup-add .popup__submit-button');
    AddCardButton.addEventListener('click', AddCard);

    let CloseAddButton = document.querySelector('.popup-add .popup__close-button')
    CloseAddButton.addEventListener('click', closeAddForm);
    
    let CloseImgButton = document.querySelector('.popup-image .popup__close-button')
    CloseImgButton.addEventListener('click', closeImg);

}

const initialProfile = {
    name: 'Жак-Ив Кусто',
    job: 'Исследователь океана'
}

function fillProfile() {
    let ProfileName = document.querySelector('.profile__info-title');
    let ProfileJob = document.querySelector('.profile__info-subtitle')
    ProfileName.innerText = initialProfile.name;
    ProfileJob.innerText = initialProfile.job;

}

function openProfileForm() {
    let popup = document.querySelector('.popup-edit');
    popup.classList.add('popup_opened');
    let input = document.querySelectorAll('.popup .popup__form-field');
    let name = input[0];
    let job = input[1];
    name.value = initialProfile.name
    job.value = initialProfile.job
}

function openAddForm() {
    let popup = document.querySelector('.popup-add');
    popup.classList.add('popup_opened');

}

function closeProfileForm() {
    let popup = document.querySelector('.popup-edit');
    popup.classList.remove('popup_opened')

}

function closeAddForm() {
    let popup = document.querySelector('.popup-add');
    popup.classList.remove('popup_opened')

}


function closeImg() {
    let popup = document.querySelector('.popup-image');
    popup.classList.remove('popup_opened')

}

function saveProfileForm() {

    function saveName(name) {
        initialProfile.name = name;
    }

    function saveJob(job) {
        initialProfile.job = job;
    }

    let input = document.querySelectorAll('.popup-edit .popup__form-field');
    let name = input[0];
    let job = input[1];
    saveName(name.value);
    saveJob(job.value);
    closeProfileForm();
    fillProfile();
}

function AddCard() {
    const newCard = {}

    function saveName(name) {
        newCard.name = name;
    }

    function saveLink(link) {
        newCard.link = link;
    }

    let input = document.querySelectorAll('.popup-add .popup__form-field');
    let name = input[0];
    let link = input[1];
    saveName(name.value);
    saveLink(link.value);
    closeAddForm();
    initialCards.splice(0, 0, newCard);
    drawCards();
}

function deleteCardIndex(index) {
    initialCards.splice(index, 1);
    drawCards();
}

function Like(index) {
    let card = initialCards[index];
    let IsLiked = card.liked;
    if (IsLiked) {
        card.liked = false
    } else {
        card.liked = true
    }
    
    initialCards.splice(index, 1, card);
    drawCards();

}

function openImg(index) {
    let card = initialCards[index];
    let link = card.link;
    let img = document.querySelector('.popup-image img')
    let name = card.name;
    let figcaption = document.querySelector('.popup-image .element__image-name')
    figcaption.innerText = name;
    img.src = link;
    img.alt = name;
    let popup = document.querySelector('.popup-image');
    popup.classList.add('popup_opened');

}

const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    liked: false
}, {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    liked: false
}, {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    liked: false
}, {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    liked: false
}, {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    liked: false
}, {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    liked: false
}];

function drawCards() {
    const elementsList = document.querySelector('.elements__list');
    elementsList.innerHTML = '';
    for (let i = 0; i < initialCards.length; i = i + 1) {
        const card = initialCards[i];
        elementsList.innerHTML += `
        <li class="element">
          <img src="${card.link}" class="element__image" alt="${card.name}">
          <button aria-label="Delete" type="button" class="element__delete-button"></button>
          <div class="element__title-wrapper">
            <h2 class="element__title">${card.name}</h2>
            <button aria-label="Like" type="button" class="element__like-button${card.liked ? ' element__like-button_active' : ''}"></button>
          </div>
        </li>
`
    }
    const deleteButtons = document.querySelectorAll('.element__delete-button')
    for (let i = 0; i < deleteButtons.length; i = i + 1) {
        deleteButtons[i].addEventListener('click', (event)=>{
          event.stopPropagation()  
          deleteCardIndex(i)
        })
    }
    
    const LikeButtons = document.querySelectorAll('.element__like-button')
    for (let i = 0; i < LikeButtons.length; i = i + 1) {
        LikeButtons[i].addEventListener('click', (event)=>{
          event.stopPropagation()
          Like(i)
        })
    }
    
    const Cards = document.querySelectorAll('.element')
    for (let i = 0; i < Cards.length; i = i + 1) {
        Cards[i].addEventListener('click', ()=>openImg(i))
    }
}

