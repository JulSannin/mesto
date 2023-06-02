import './index.css';
import {
    initialValidationSettings,
    addCardPopup,
    addCardForm,
    profilePopup,
    profileForm,
    avatarPopup,
    avatarForm,
    imagePopup,
    deletePopup,
    nameInput,
    nameAuthor,
    descriptionInput,
    descriptionAuthor,
    buttonOpeningPopupEditProfile,
    buttonOpeningPopupAddedCard,
    buttonOpeningPopupEditAvatarProfile,
    fieldCard,
    cardSelector,
    userAvatar
} from '../utils/initialData.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirm from '../components/PopupWithConfirm';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
    headers: {
        authorization: '18bfdc4b-0532-41bf-ac65-1c418f0be0ca',
        'Content-Type': 'application/json',
    }
});

const userInfo = new UserInfo(nameAuthor, descriptionAuthor, userAvatar);

const cardList = new Section({
    renderer: (item) => {
        const cardElement = createCard(item, cardSelector);
        cardList.addItem(cardElement);
    },
}, fieldCard);


function createCard(data, cardSelector) {
    const card = new Card({
        data: data, cardSelector, userId: userInfo.getUserId(),
        handleCardClick: () => {
            popupImage.open(data.name, data.link)
        },
        handleLikeClick: () => {
            if (card.isLiked) {
                api.removeLike(card.getCardId())
                    .then((data) => {
                        card.unsetLike()
                        card.updateLikeCounter(data.likes)
                    })
                    .catch((err) => {
                        console.error(err)
                    })
            }
            else {
                api.addLike(card.getCardId())
                    .then((data) => {
                        card.setLike()
                        card.updateLikeCounter(data.likes)
                    })
                    .catch((err) => {
                        console.error(err)
                    })
            }
        },
        handleRemoveClick: (evt) => {
            const cardElement = evt.target.closest('.elements__item')
            popupDeletingCard.open(() => {
                api.deleteCard(card.getCardId())
                    .then(() => {
                        cardElement.remove()
                        popupDeletingCard.close()
                    })
                    .catch((err) => {
                        console.error(err)
                    })
            })
        }
    }
    );
    return card.generateCard();
};

const popupDeletingCard = new PopupWithConfirm(deletePopup);
popupDeletingCard.setEventListeners();

const avatarProfile = new PopupWithForm(
    avatarPopup, (data) => {
        avatarProfile.isLoadingMessage(true);
        api.setAvatar(data)
            .then((data) => {
                userInfo.setUserAvatar({ avatarLink: data.avatar })
                avatarProfile.close()
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                avatarProfile.isLoadingMessage(false);
            })
    }
)

const avatarProfileFormValidation = new FormValidator(avatarForm, initialValidationSettings);
avatarProfile.setEventListeners();
avatarProfileFormValidation.enableValidaton();

buttonOpeningPopupEditAvatarProfile.addEventListener('click', () => {
    avatarProfileFormValidation.resetValidation();
    avatarProfile.open();
});

const popupProfile = new PopupWithForm(
    profilePopup, (data) => {
        popupProfile.isLoadingMessage(true);
        api.setUser(data)
            .then((data) => {
                userInfo.setUserInfo({ name: data.name, description: data.about });
                popupProfile.close();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                popupProfile.isLoadingMessage(false);
            })
    }
);

const popupImage = new PopupWithImage(imagePopup);
popupImage.setEventListeners();

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
        popupNewCard.isLoadingMessage(true)
        api.addNewCard(data)
            .then((data) => {
                cardList.addNewItem(createCard(data, cardSelector));
                popupNewCard.close();
            })
            .catch((err) => {
                console.error(err);
            }).finally(() => {
                popupNewCard.isLoadingMessage(false);
            });
    });

const addCardFormValidation = new FormValidator(addCardForm, initialValidationSettings);
popupNewCard.setEventListeners();
addCardFormValidation.enableValidaton();

buttonOpeningPopupAddedCard.addEventListener('click', () => {
    addCardFormValidation.resetValidation();
    addCardFormValidation.toggleButtonState();
    popupNewCard.open();
});

api.getAppInfo()
    .then((result) => {
        const [cardData, userData] = result;
        userInfo.setUserInfo({ name: userData.name, description: userData.about })
        userInfo.setUserAvatar({ avatarLink: userData.avatar })
        userInfo.saveUserId(userData._id)
        cardList.renderItems(cardData)
    })
    .catch((err) => {
        console.error(err)
    })