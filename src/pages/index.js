import './index.css';
import {
    initialCards,
    initialValidationSettings,
    addCardPopup,
    addCardForm,
    profilePopup,
    profileForm,
    imagePopup,
    nameInput,
    nameAuthor,
    descriptionInput,
    descriptionAuthor,
    buttonOpeningPopupEditProfile,
    buttonOpeningPopupAddedCard,
    fieldCard,
    nameImg,
    linkImg,
    cardSelector
} from '../utils/initialData.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

const popupImage = new PopupWithImage(imagePopup);
popupImage.setEventListeners();

const cardList = new Section({
    renderer: (item) => {
        const cardElement = createCard(item, cardSelector);
        cardList.addItem(cardElement);
    },
}, fieldCard);

function createCard(item, cardSelector) {
    const card = new Card(item, cardSelector, () => {
        popupImage.open(item.name, item.link);
    });
    return card.generateCard();
};

cardList.renderItems(initialCards);

const userInfo = new UserInfo(nameAuthor, descriptionAuthor);

const popupProfile = new PopupWithForm(
    profilePopup, (data) => {
        userInfo.setUserInfo({ name: data.name, description: data.description });
        popupProfile.close();
    }
);

const profileFormValidation = new FormValidator(profileForm, initialValidationSettings);
popupProfile.setEventListeners();
profileFormValidation.enableValidaton();

buttonOpeningPopupEditProfile.addEventListener('click', () => {
    profileFormValidation.resetValidation();
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    descriptionInput.value = userData.description;
    popupProfile.open();
});

const popupNewCard = new PopupWithForm(
    addCardPopup, (data) => {
        cardList.addNewItem(createCard({ name: data.nameImg, link: data.linkImg }, cardSelector));
        popupNewCard.close();
    });11

const addCardFormValidation = new FormValidator(addCardForm, initialValidationSettings);
popupNewCard.setEventListeners();
addCardFormValidation.enableValidaton();

buttonOpeningPopupAddedCard.addEventListener('click', () => {
    addCardFormValidation.resetValidation();
    addCardFormValidation.toggleButtonState();
    popupNewCard.open();
});