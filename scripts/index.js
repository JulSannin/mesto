import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, initialValidationSettings } from './initialData.js';

const addCardPopup = document.querySelector('.popup_card_adding-card');
const profilePopup = document.querySelector('.popup_profile_editing-profile');
const imagePopup = document.querySelector('.popup_card_opening-image');

const imagePopupLink = imagePopup.querySelector('.popup__img-card');
const imagePopupName = imagePopup.querySelector('.popup__img-card-name');

const nameInput = profilePopup.querySelector('.popup__input_type_name');
const nameAuthor = document.querySelector('.profile__author');
const descriptionInput = profilePopup.querySelector('.popup__input_type_description');
const descriptionAuthor = document.querySelector('.profile__competention');

// Переменные, содержащие кнопки, открывающие  Попаы редактирования профиля и добавления карточки
const buttonOpeningPopupEditProfile = document.querySelector('.profile__edit-button');
const buttonOpeningPopupAddedCard = document.querySelector('.profile__add-button');

// Переменная, куда будут карточки прогружаться
const fieldCard = document.querySelector('.elements');

const nameImg = document.querySelector('.popup__input_type_name-img');
const linkImg = document.querySelector('.popup__input_type_link-img');

// Функция создания карточки
const renderInitialCards = () => {
    initialCards.forEach((item) => {
        const card = createCard(item);
    });

};

function createCard(item) {
    const card = new Card(item, '#card-template', handleCardClick);
    fieldCard.prepend(card.generateCard()); 
}

// Функция обработчик формы добавления карточки
const handleNewCardAdd = (evt) => {
    evt.preventDefault();
    const newCard = {
        name: nameImg.value,
        link: linkImg.value
    }
    createCard(newCard, '#card-template', handleCardClick);
    closePopup(addCardPopup);
}

const initPopupListeners = () => {
    const popups = document.querySelectorAll('.popup');
    const profileForm = profilePopup.querySelector('.popup__form');
    const addCardForm = addCardPopup.querySelector('.popup__form');

    profileForm.addEventListener('submit', editingProfile);
    addCardForm.addEventListener('submit', handleNewCardAdd);

    const profileFormValidation = new FormValidator(profileForm, initialValidationSettings);
    const addCardFormValidation = new FormValidator(addCardForm, initialValidationSettings);

    profileFormValidation.enableValidaton();
    addCardFormValidation.enableValidaton();

    // Открытие Попапа редактирования профиля
    buttonOpeningPopupEditProfile.addEventListener('click', () => {
        openPopup(profilePopup);
        profileForm.reset();
        profileFormValidation.resetValidation();
        fillProfilePopupInputs();
    });

    // Открытие попапа добавления карточки
    buttonOpeningPopupAddedCard.addEventListener('click', () => {
        openPopup(addCardPopup);
        addCardForm.reset();
        addCardFormValidation.resetValidation();
    });

    //Закрытие для всех Попапов
    popups.forEach((popup) => {
        // на кнопку-крестик
        popup.querySelector('.popup__button-closed').addEventListener('click', () => closePopup(popup));
        // на клик по оверлею
        popup.addEventListener('click', (e) => {
            if (e.target.classList.contains('popup')) {
                closePopup(popup);
            }
        });
    });

};

// Функция для открытия Попапа
export const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeOnKeyDown);
};

// Функция для закрытия Попапа
const closePopup = (popup) => {
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', closeOnKeyDown);
};

// Функция закрытия Попапа клавишей ESC 
const closeOnKeyDown = (e) => {
    if (e.key === "Escape") {
        closePopup(document.querySelector('.popup_opened'));
    }
};

const fillProfilePopupInputs = () => {
    nameInput.value = nameAuthor.textContent;
    descriptionInput.value = descriptionAuthor.textContent;
};

// Функция замены имени и профессии автора при нажатии на submit
const editingProfile = (evt) => {
    evt.preventDefault();
    nameAuthor.textContent = nameInput.value;
    descriptionAuthor.textContent = descriptionInput.value;
    closePopup(profilePopup);
};

function handleCardClick(name, link) {
    openPopup(imagePopup);
    imagePopupLink.src = link;
    imagePopupLink.alt = name;
    imagePopupLink.title = name;
    imagePopupName.textContent = name;
}

initPopupListeners();
renderInitialCards();