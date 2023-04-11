const nameInput = document.querySelector('.popup__input_type_name');
const nameAuthor = document.querySelector('.profile__author');
const descriptionInput = document.querySelector('.popup__input_type_description');
const descriptionAuthor = document.querySelector('.profile__competention');

// Переменные, содержащие кнопки, открывающие  Попаы редактирования профиля и добавления карточки
const buttonOpeningPopupEditProfile = document.querySelector('.profile__edit-button');
const buttonOpeningPopupAddedCard = document.querySelector('.profile__add-button');

const buttonsClosingPopups = document.querySelectorAll('.popup__button-closed');

//Переменные, для очистки полей ввода и ошибок
const errorArray = document.querySelectorAll('.popup__error');
const inputErrorArray = document.querySelectorAll('.popup__input');

const removingErrors= () => {
    errorArray.forEach((evt) => {
        evt.classList.remove('popup__error_active');
    });
    inputErrorArray.forEach((evt) => {
        evt.classList.remove('popup__input_error');
    });
};

// Функция, создающая версту карточки из данных
const renderCard = ({ name, link }) => {
    // Клонирование карточки с template
    const placeElement = (document.querySelector('#card-template')).content.querySelector('.elements__item').cloneNode(true);
    const elementName = placeElement.querySelector('.elements__place-name');
    const elementPhoto = placeElement.querySelector('.elements__photo');
    const likeButton = placeElement.querySelector('.elements__like-button');
    const deleteButton = placeElement.querySelector('.elements__deleted-button');
    elementName.textContent = name;
    elementPhoto.src = link;
    elementPhoto.alt = name;
    elementPhoto.title = name;

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
        const popupImgCard = document.querySelector('.popup__img-card');
        const popupImgCardName = document.querySelector('.popup__img-card-name');
        const imagePopup = document.querySelector('.popup_card_opening-image');
        popupImgCard.src = link;
        popupImgCard.title = name;
        popupImgCardName.textContent = name;
        openPopup(imagePopup);
    })

    return placeElement;
};

// Функция создания карточки
const rendered = () => {
    initialCards.forEach(item => {
        const card = renderCard(item);
        addCard(card);
    });

};

//Функция, добавляющая карточку в верстку
const addCard = (card) => {
    // Переменная, куда будут карточки прогружаться
    const fieldCard = document.querySelector('.elements');
    fieldCard.prepend(card);
};

//Функция обработчик формы добавления карточки
const addingCard = (evt) => {
    const nameImg = document.querySelector('.popup__input_type_name-img');
    const linkImg = document.querySelector('.popup__input_type_link-img');
    evt.preventDefault();
    const newCard = {
        name: nameImg.value,
        link: linkImg.value
    }
    addCard(renderCard(newCard));
    closePopup(evt);
}

rendered();

//Функция для открытия Попапа
const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeOnKeyDown);
    closePopupOverlay();
};

//Функция для закрытия Попапа
const closePopup = (popup) => {
    popup.target.closest('.popup').classList.remove('popup_opened');
    removingErrors();
};

//Функция закрытия Попапа клавишей ESC
const closeOnKeyDown = (e) => {
    if (e.keyCode == 27) {
        document.querySelector('.popup_opened').classList.remove('popup_opened');
        removingErrors();
    }
};

//Функция для закрытия Попапа при нажатии на оверлей
const closePopupOverlay = () => {
    const overlay = document.querySelectorAll('.popup');
    overlay.forEach((item) => {
        item.addEventListener('click', closePopup);
        item.querySelector('.popup__container').addEventListener('click', (e) =>{
            e.stopPropagation();
        });
    });
};

//Закрытие Попапа при нажатии на кнопку-крестик
buttonsClosingPopups.forEach((evt) => {
    evt.addEventListener('click', closePopup);
});

// Функция замены имени и профессии автора при нажатии на submit
function editingProfile(evt) {
    evt.preventDefault();
    nameAuthor.textContent = nameInput.value;
    descriptionAuthor.textContent = descriptionInput.value;
    closePopup(evt);
};

function exportValue() {
    nameInput.value = nameAuthor.textContent;
    descriptionInput.value = descriptionAuthor.textContent;
};

//Открытие Попапа редактирования профиля
buttonOpeningPopupEditProfile.addEventListener('click', () => {
    const profilePopup = document.querySelector('.popup_profile_editing-profile');
    openPopup(profilePopup);
    exportValue();
    // Слушатель событий формы
    profilePopup.querySelector('.popup__form').addEventListener('submit', editingProfile);
});

//Открытие попапа добавления карточки
buttonOpeningPopupAddedCard.addEventListener('click', () => {
    const addCardPopup = document.querySelector('.popup_card_adding-card');
    openPopup(addCardPopup);
    addCardPopup.querySelector('.popup__form').reset();
    // Слушатель событий формы
    addCardPopup.querySelector('.popup__form').addEventListener('submit', addingCard);
});