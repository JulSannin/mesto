const nameInput = document.querySelector('.popup__input_type_name');
const nameAuthor = document.querySelector('.profile__author');
const descriptionInput = document.querySelector('.popup__input_type_description');
const descriptionAuthor = document.querySelector('.profile__competention');
const openPopups = document.querySelectorAll('.popup');
const buttonOpeningPopupEditProfile = document.querySelector('.profile__edit-button');
const buttonOpeningPopupAddedCard = document.querySelector('.profile__add-button');
const buttonsClosingPopups = document.querySelectorAll('.popup__button-closed');
const nameImg = document.querySelector('.popup__input_type_name-img');
const linkImg = document.querySelector('.popup__input_type_link-img')
const popupImgCard = document.querySelector('.popup__img-card');
const popupImgCardName = document.querySelector('.popup__img-card-name');
const profilePopup = document.querySelector('.popup_editing-profile');
const addCardPopup = document.querySelector('.popup_adding-card');
const imagePopup = document.querySelector('.popup_image-card');


function exportValue() {
    nameInput.value = nameAuthor.textContent;
    descriptionInput.value = descriptionAuthor.textContent;
    return nameInput, descriptionInput;
}

//Функция открытия Попапа
function openPopup(e) {
    e.classList.add('popup_opened');
    document.addEventListener('keydown', closeOnKeyDown);
    addCardPopup.querySelector('.popup__form').reset();
    exportValue();
}

//Функция закрытия Попапа клавишей ESC
function closeOnKeyDown (e) {
    if (e.keyCode == 27) {
        document.querySelector('.popup_opened').classList.remove('popup_opened');
    } 
}

//Функция закрытия Попапа
function closePopup(e) {
    e.target.closest('.popup').classList.remove('popup_opened');
}

//Открытие Попапа редактирования профиля и Попапа добавления карточки
buttonOpeningPopupEditProfile.addEventListener('click', () => openPopup(profilePopup), exportValue());
buttonOpeningPopupAddedCard.addEventListener('click', () => openPopup(addCardPopup));

//Закрытие Попапа при нажатии на кнопку-крестик
buttonsClosingPopups.forEach((btn) => {
    btn.addEventListener('click', closePopup)
});

// Функция замены имени и профессии автора при нажатии на submit
function profileEditingHandler(evt) {
    evt.preventDefault();
    nameAuthor.textContent = nameInput.value;
    descriptionAuthor.textContent = descriptionInput.value;
    closePopup(evt);
}

//Переменная обращенная к template карточек
const cardTemplate = document.querySelector("#card-template").content;

// Переменная, куда будут карточки прогружаться
const fieldCard = document.querySelector(".elements"); 

// Функция, добавляющая карточку в elements
function renderCard({ name, link }) {
    const placeElement = cardTemplate.querySelector(".elements__item").cloneNode(true);
    placeElement.querySelector('.elements__place-name').textContent = name;
    const elementPhoto = placeElement.querySelector('.elements__photo');
    elementPhoto.src = link;
    elementPhoto.alt = name;
    elementPhoto.title = name;
    const likeButton = placeElement.querySelector('.elements__like-button');
    const deleteButton = placeElement.querySelector('.elements__deleted-button');
    const buttonOpeningPopupCard = placeElement.querySelector('.elements__photo');

    // Отслеживание события - лайк на карточке
    likeButton.addEventListener('click', (e) => {
        e.target.classList.toggle('elements__like-button_active');
    });

    // Отслеживание события - удаление карточки
    deleteButton.addEventListener('click', (e) => {
        e.target.closest('.elements__item').remove();
    });

    //Отслеживание события - открытие попапа изображения карточки 
    buttonOpeningPopupCard.addEventListener('click', (e) => {
        popupImgCard.src = '';
        popupImgCard.src = link;
        popupImgCard.title = name;
        popupImgCard.link = name;
        popupImgCardName.textContent = name;
        openPopup(imagePopup);
    })

    return fieldCard.prepend(placeElement);
}

// Функция создания карточек
function rendered() {
    initialCards.forEach(renderCard);
}

//Функция обработчик формы добавления карточки
function renderFormSubmit(enl) {
    enl.preventDefault();
    const newCard = {
        name: nameImg.value,
        link: linkImg.value
    }
    renderCard(newCard);
    closePopup(enl);
    addCardPopup.querySelector('.popup__form').reset();
}

rendered();
// Слушатель событий форм
profilePopup.addEventListener('submit', profileEditingHandler);
addCardPopup.addEventListener('submit', renderFormSubmit);
