import { cardName, cardLink, elementsList, template, initialCards } from './utils';
import { closeAddForm, openImg } from './modal';
import { getCardsInfo } from './api';

export async function drawInitialCards() {
    const initialCards = await getCardsInfo();
    for (let i = 0; i < initialCards.length; i = i + 1) {
        const card = initialCards[i];
        elementsList.prepend(getCard(card.name, card.link, card.likes));
    }

};

export function addCard(event) {
    event.stopPropagation();
    event.preventDefault();
    elementsList.prepend(getCard(cardName.value, cardLink.value));
    event.currentTarget.reset();
    closeAddForm();

};

export function getCard(name, link) {
    const cardClone = template.content.firstElementChild.cloneNode(true);
    const elementImage = cardClone.querySelector('.element__image');
    elementImage.src = link;
    elementImage.alt = name;
    cardClone.querySelector('.element__title').textContent = name;
    elementImage.addEventListener('click', openImg);
    cardClone.querySelector('.element__like-button').addEventListener('click', like);
    cardClone.querySelector('.element__delete-button').addEventListener('click', removeCard);
    return cardClone;

};

export function like(event) {
    event.currentTarget.classList.toggle('element__like-button_active');
};

export function removeCard(event) {
    const button = event.currentTarget;
    const card = button.closest('.element');
    card.remove();
};
