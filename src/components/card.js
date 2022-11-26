import { cardName, cardLink, elementsList, template, settings, newPlaceForm } from './utils';
import { closeAddForm, openImg } from './modal';
import { getCardsInfo, addNewCard, config, dislike, like, deleteCard } from './api';

export async function drawInitialCards() {
    const initialCards = await getCardsInfo();
    initialCards.sort(function (a, b) {
        if (new Date(a.createdAt) > new Date(b.createdAt)) {
            return 1
        }
        if (new Date(a.createdAt) < new Date(b.createdAt)) {
            return -1
        }
        return 0;
    })
    for (let i = 0; i < initialCards.length; i = i + 1) {
        const card = initialCards[i];
        const newCard = getCard(card);
        elementsList.prepend(newCard);
    }
};

export async function addCard(event) {
    event.stopPropagation();
    event.preventDefault();
    newPlaceForm.querySelector(settings.popupSubmitButtonSelector).textContent = 'Сохранение...';
    const addCard = await addNewCard(cardName.value, cardLink.value);
    elementsList.prepend(getCard(addCard));
    event.target.reset();
    closeAddForm();
    newPlaceForm.querySelector(settings.popupSubmitButtonSelector).textContent = 'Создать';
};

export async function removeCard(cardId) {
    await deleteCard(cardId);
    const deletedCard = elementsList.querySelector(`li[data-id="${cardId}"]`);
    deletedCard.remove();
};

export function getCard(cardData) {
    const { name, link, _id: cardId, likes, owner } = cardData;
    const cardClone = template.content.firstElementChild.cloneNode(true);
    cardClone.dataset.id = cardId;
    const elementImage = cardClone.querySelector('.element__image');
    elementImage.src = link;
    elementImage.alt = name;
    cardClone.querySelector('.element__title').textContent = name;
    cardClone.querySelector('.element__like-count').textContent = likes.length;
    elementImage.addEventListener('click', openImg);
    const isLiked = likes.some(like => config.currentUser._id === like._id);
    const likeBtn = cardClone.querySelector('.element__like-button');
    likeBtn.classList.toggle('element__like-button_active', isLiked);
    cardClone.querySelector('.element__like-button').addEventListener('click', (event) => toggleLike(isLiked, cardId));
    const isMyCard = (owner._id === config.currentUser._id);
    if (!isMyCard) {
        cardClone.querySelector('.element__delete-button').remove();
    } else {
        cardClone.querySelector('.element__delete-button').addEventListener('click', (event) => removeCard(cardId));
    }
    return cardClone;

};

export async function toggleLike(isLiked, cardId) {
    const cardData = isLiked ? await dislike(cardId) : await like(cardId);
    const newCard = getCard(cardData);
    const oldCard = elementsList.querySelector(`li[data-id="${cardId}"]`);
    oldCard.replaceWith(newCard);
};


