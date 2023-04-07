const nameInput = document.querySelector('.popup__input_type_name');
const nameAuthor = document.querySelector('.profile__author');
const descriptionInput = document.querySelector('.popup__input_type_description');
const descriptionAuthor = document.querySelector('.profile__competention');
const buttonOpeningPopupEditProfile = document.querySelector('.profile__edit-button');
const buttonOpeningPopupAddedCard = document.querySelector('.profile__add-button');
const buttonsClosingPopups = document.querySelectorAll('.popup__button-closed');
const nameImg = document.querySelector('.popup__input_type_name-img');
const linkImg = document.querySelector('.popup__input_type_link-img')
const popupImgCard = document.querySelector('.popup__img-card');
const popupImgCardName = document.querySelector('.popup__img-card-name');
const profilePopup = document.querySelector('.popup_profile_editing-profile');
const addCardPopup = document.querySelector('.popup_card_adding-card');
const imagePopup = document.querySelector('.popup_card_opening-image');

function exportValue() {
    nameInput.value = nameAuthor.textContent;
    descriptionInput.value = descriptionAuthor.textContent;
    return nameInput, descriptionInput;
}

//Функция для открытия Попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

//Функция закрытия Попапа клавишей ESC
function closeOnKeyDown (e) {
    if (e.keyCode == 27) {
        document.querySelector('.popup_opened').classList.remove('popup_opened');
    } 
}

//Функция для закрытия Попапа
function closePopup(popup) {
    popup.target.closest('.popup').classList.remove('popup_opened');
}

// Функция замены имени и профессии автора при нажатии на submit
function editingProfile(evt) {
    evt.preventDefault();
    nameAuthor.textContent = nameInput.value;
    descriptionAuthor.textContent = descriptionInput.value;
    closePopup(evt);
}

//Переменная обращенная к template карточек
const cardTemplate = document.querySelector("#card-template").content;

// Переменная, куда будут карточки прогружаться
const fieldCard = document.querySelector(".elements"); 

// Функция, создающая версту карточки из данных
function renderCard({ name, link }) {
    const placeElement = cardTemplate.querySelector(".elements__item").cloneNode(true);
    placeElement.querySelector('.elements__place-name').textContent = name;
    const elementPhoto = placeElement.querySelector('.elements__photo');
    elementPhoto.src = link;
    elementPhoto.alt = name;
    elementPhoto.title = name;
    const likeButton = placeElement.querySelector('.elements__like-button');
    const deleteButton = placeElement.querySelector('.elements__deleted-button');

    // Отслеживание события - лайк на карточке
    likeButton.addEventListener('click', (e) => {
        e.target.classList.toggle('elements__like-button_active');
    });

    // Отслеживание события - удаление карточки
    deleteButton.addEventListener('click', (e) => {
        e.target.closest('.elements__item').remove();
    });

    //Отслеживание события - открытие попапа изображения карточки 
    elementPhoto.addEventListener('click', (e) => {
        popupImgCard.src = link;
        popupImgCard.title = name;
        popupImgCardName.textContent = name;
        openPopup(imagePopup);
    })

    return placeElement;
}

// Функция создания карточки
function rendered() {
    initialCards.forEach(item => {
        const card = renderCard(item);
        addCard(card)
    });

}

//Функция, добавляющая карточку в верстку
function addCard(card) {
    fieldCard.prepend(card);
}

//Функция обработчик формы добавления карточки
function addingCard(evt) {
    evt.preventDefault();
    const newCard = {
        name: nameImg.value,
        link: linkImg.value
    }
    addCard(renderCard(newCard));
    closePopup(evt);
}

rendered();

//Открытие Попапа редактирования профиля и Попапа добавления карточки
buttonOpeningPopupEditProfile.addEventListener('click', () => openPopup(profilePopup, document.addEventListener('keydown', closeOnKeyDown), exportValue()));
buttonOpeningPopupAddedCard.addEventListener('click', () => openPopup(addCardPopup, document.addEventListener('keydown', closeOnKeyDown), addCardPopup.querySelector('.popup__form').reset()));

// Слушатель событий форм
profilePopup.querySelector('.popup__form').addEventListener('submit', editingProfile);
addCardPopup.querySelector('.popup__form').addEventListener('submit', addingCard);

//Закрытие Попапа при нажатии на кнопку-крестик
buttonsClosingPopups.forEach((btn) => {
    btn.addEventListener('click', closePopup)
});