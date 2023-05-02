import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, initialValidationSettings} from './initialData.js';

const addCardPopup = document.querySelector('.popup_card_adding-card');
const profilePopup = document.querySelector('.popup_profile_editing-profile');

const nameInput = profilePopup.querySelector('.popup__input_type_name');
const nameAuthor = document.querySelector('.profile__author');
const descriptionInput = profilePopup.querySelector('.popup__input_type_description');
const descriptionAuthor = document.querySelector('.profile__competention');

// Переменные, содержащие кнопки, открывающие  Попаы редактирования профиля и добавления карточки
const buttonOpeningPopupEditProfile = document.querySelector('.profile__edit-button');
const buttonOpeningPopupAddedCard = document.querySelector('.profile__add-button');

// Переменные, для очистки полей ввода и ошибок
const errorArray = document.querySelectorAll('.popup__error');
const inputErrorArray = document.querySelectorAll('.popup__input');

// Функция создания карточки
const renderInitialCards = () => {
    initialCards.forEach(item => {
        const card = new Card(item);
        addCard(card);
    });

};

// Функция, добавляющая карточку в верстку
const addCard = (card) => {
    // Переменная, куда будут карточки прогружаться
    const fieldCard = document.querySelector('.elements');
    fieldCard.prepend(card.generateCard());
};

// Функция обработчик формы добавления карточки
const handleNewCardAdd = (evt) => {
    const nameImg = document.querySelector('.popup__input_type_name-img');
    const linkImg = document.querySelector('.popup__input_type_link-img');
    evt.preventDefault();
    const newCard = {
        name: nameImg.value,
        link: linkImg.value
    }
    addCard(new Card(newCard));
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

    // Открытие Попапа редактирования профиля
    buttonOpeningPopupEditProfile.addEventListener('click', () => {
        openPopup(profilePopup);
        profileFormValidation.enableValidaton();
        profileFormValidation.removingErrors();
        fillProfilePopupInputs();
        disabledButton(profileForm);
    });

    // Открытие попапа добавления карточки
    buttonOpeningPopupAddedCard.addEventListener('click', () => {
        openPopup(addCardPopup);
        addCardFormValidation.enableValidaton();
        addCardFormValidation.removingErrors();
        addCardForm.reset();
        disabledButton(addCardForm);
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

const disabledButton = (form) => {
    const button = form.querySelector('.popup__button-saved');
    button.classList.add('popup__button-saved_inactive');
    button.setAttribute("disabled", true);
}

initPopupListeners();
renderInitialCards();