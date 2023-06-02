export const initialValidationSettings = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-saved',
    inactiveButtonClass: 'popup__button-saved_inactive',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error_active'
};

export const addCardPopup = document.querySelector('.popup_card_adding-card');
export const addCardForm = addCardPopup.querySelector('.popup__form');
export const deletePopup = document.querySelector('.popup_card_deleting-image');
export const profilePopup = document.querySelector('.popup_profile_editing-profile');
export const profileForm = profilePopup.querySelector('.popup__form');
export const avatarPopup = document.querySelector('.popup_profile_editing-avatar')
export const avatarForm = avatarPopup.querySelector('.popup__form');
export const imagePopup = document.querySelector('.popup_card_opening-image');
export const nameInput = profilePopup.querySelector('.popup__input_type_name');
export const nameAuthor = document.querySelector('.profile__author');
export const descriptionInput = profilePopup.querySelector('.popup__input_type_description');
export const descriptionAuthor = document.querySelector('.profile__competention');
export const buttonOpeningPopupEditProfile = document.querySelector('.profile__edit-button');
export const buttonOpeningPopupAddedCard = document.querySelector('.profile__add-button');
export const buttonOpeningPopupEditAvatarProfile = document.querySelector('.profile__avatar-edit-button')
export const fieldCard = document.querySelector('.elements');
export const cardSelector = '#card-template';
export const userAvatar = document.querySelector('.profile__avatar-image');