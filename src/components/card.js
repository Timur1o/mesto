import { cardName, cardLink, elementsList, template, newPlaceForm, renderLoading, renderLoaded, currentUser } from './utils';
import { closeAddForm, openImg } from './modal';
import { getCardsInfo, addNewCard, config, dislike, like, deleteCard } from './api';

export async function drawInitialCards() {
    try {
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
    }
    catch (error) {
        return Promise.reject(error);
    }
};

export async function addCard(event) {
    try {
        event.stopPropagation();
        event.preventDefault();
        renderLoading(newPlaceForm);
        const addCard = await addNewCard(cardName.value, cardLink.value);
        elementsList.prepend(getCard(addCard));
        closeAddForm();
    }
    catch (error) {
        return Promise.reject(error);
    }
    finally {
        renderLoaded(newPlaceForm);
    }
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
    const isLiked = likes.some(like => currentUser._id === like._id);
    const likeBtn = cardClone.querySelector('.element__like-button');
    likeBtn.classList.toggle('element__like-button_active', isLiked);
    cardClone.querySelector('.element__like-button').addEventListener('click', (event) => toggleLike(cardId));
    const isMyCard = (owner._id === currentUser._id);
    if (!isMyCard) {
        cardClone.querySelector('.element__delete-button').remove();
    } else {
        cardClone.querySelector('.element__delete-button').addEventListener('click', (event) => removeCard(cardId));
    }
    return cardClone;
};

export async function toggleLike(cardId) {
    try {
        const oldCard = elementsList.querySelector(`li[data-id="${cardId}"]`);
        const likeBtn = oldCard.querySelector('.element__like-button');
        const isLiked = likeBtn.classList.contains('element__like-button_active')
        const cardData = isLiked ? await dislike(cardId) : await like(cardId);
        oldCard.querySelector('.element__like-count').textContent = cardData.likes.length;
        const newIsLiked = cardData.likes.some(like => currentUser._id === like._id);
        likeBtn.classList.toggle('element__like-button_active', newIsLiked);
    }
    catch (error) {
        return Promise.reject(error);
    }
};




