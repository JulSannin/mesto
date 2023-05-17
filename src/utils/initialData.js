export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const initialValidationSettings = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-saved',
    inactiveButtonClass: 'popup__button-saved_inactive',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error_active'
};

export const addCardPopup = document.querySelector('.popup_card_adding-card');
export const addCardForm = addCardPopup.querySelector('.popup__form');
export const profilePopup = document.querySelector('.popup_profile_editing-profile');
export const profileForm = profilePopup.querySelector('.popup__form');
export const imagePopup = document.querySelector('.popup_card_opening-image');
export const nameInput = profilePopup.querySelector('.popup__input_type_name');
export const nameAuthor = document.querySelector('.profile__author');
export const descriptionInput = profilePopup.querySelector('.popup__input_type_description');
export const descriptionAuthor = document.querySelector('.profile__competention');
export const buttonOpeningPopupEditProfile = document.querySelector('.profile__edit-button');
export const buttonOpeningPopupAddedCard = document.querySelector('.profile__add-button');
export const fieldCard = document.querySelector('.elements');
export const nameImg = document.querySelector('.popup__input_type_name-img');
export const linkImg = document.querySelector('.popup__input_type_link-img');
export const cardSelector = '#card-template';