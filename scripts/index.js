const nameInput = document.querySelector('.popup__input_type_name');
const nameAuthor = document.querySelector('.profile__author');
const descriptionInput = document.querySelector('.popup__input_type_description');
const descriptionAuthor = document.querySelector('.profile__competention');
const openPopup = document.querySelectorAll('.popup');
const buttonOpenedPopSecond = document.querySelector('.profile__edit-button');
const buttonOpenedPopFirst = document.querySelector('.profile__add-button');
const buttonClosedPop = document.querySelectorAll('.popup__button-closed');
const formElement = document.querySelectorAll('.popup__form');
const nameImg = document.querySelector('.popup__input_type_name-img');
const linkImg = document.querySelector('.popup__input_type_link-img')

function exportValue() {
    nameInput.value = nameAuthor.textContent;
    descriptionInput.value = descriptionAuthor.textContent;
    return nameInput, descriptionInput;
}

function choiceForm(index) {
    let form = formElement[index];
    return form;
}

function openedPopup(index) {
    openPopup[index].classList.add("popup_opened");
}

function closedPopup(index) {
    openPopup[index].classList.remove("popup_opened");
}

buttonOpenedPopSecond.addEventListener('click', () => openedPopup(0), exportValue());

buttonClosedPop.forEach((btn) => {
    btn.addEventListener('click', () => closedPopup(0))
});

buttonOpenedPopFirst.addEventListener('click', () => openedPopup(1));

buttonClosedPop.forEach((btn) => {
    btn.addEventListener('click', () => closedPopup(1))
});

buttonClosedPop.forEach((btn) => {
    btn.addEventListener('click', () => closedPopup(2))
});

//Закрытие попапов через кнопку esc
window.onkeydown = function (event) {
    if (event.keyCode == 27) {
        choiceForm(1).reset();
        closedPopup(0) || closedPopup(1) || closedPopup(2);
    }
};

// Функция замены имени и профессии автора при нажатии на submit
function handleFormSubmit(evt) {
    evt.preventDefault();
    nameAuthor.textContent = nameInput.value;
    descriptionAuthor.textContent = descriptionInput.value;
    closedPopup(0);
}

// Добавление карточек из массива с обьектами, и их свойствами 
const initialCards = [
    {
        name: 'Архыз',
        link: '../images/__img1.png'
    },
    {
        name: 'Челябинская область',
        link: '../images/__img2.png'
    },
    {
        name: 'Иваново',
        link: '../images/__img3.png'
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

const cardTemplate = document.querySelector("#card-template").content; //Переменная обращенная к template карточек
const fieldCards = document.querySelector(".elements"); // Переменная, куда будут карточки прогружаться

//Перебор массива со свойствами для карточек
const cardInfo = initialCards.map(function (item) {
    return {
        name: item.name,
        link: item.link
    };
});

// Функция, добавляющая карточку в elements
function renderCard({ name, link }) {
    const placeElement = cardTemplate.querySelector(".elements__item").cloneNode(true);
    placeElement.querySelector('.elements__place-name').textContent = name;
    placeElement.querySelector('.elements__photo').src = link;
    placeElement.querySelector('.elements__photo').alt = name;
    placeElement.querySelector('.elements__photo').title = name;
    const likeButton = placeElement.querySelectorAll('.elements__like-button');
    const deletedButton = placeElement.querySelectorAll('.elements__deleted-button');
    const buttonOpenedPopThrird = placeElement.querySelectorAll('.elements__photo');

    // Функция лайка на карточке
    function likeButtons() {
        likeButton.forEach(button =>
            button.addEventListener('click', (e) => {
                e.target.classList.toggle('elements__like-button_active');
            })
        );
    }

    // Функция удаления карточки
    function removeButtons(e) {
        deletedButton.forEach(button =>
            button.addEventListener('click', (e) => {
                e.target.closest('.elements__item').remove();
            }))
    }

    //Функция открытия попапа карточки 
    function openedCard(e) { 
        buttonOpenedPopThrird.forEach(button =>
            button.addEventListener('click', (e) => {
                const imgCard = document.querySelector('.popup__img-card');
                const imgCardName = document.querySelector('.popup__img-card-name');
                imgCard.src = link;
                imgCard.title = name;
                imgCard.link = name;
                imgCardName.textContent = name; 
                openedPopup(2);
            }))
    }

    likeButtons();
    removeButtons();
    openedCard()

    fieldCards.prepend(placeElement);
}

// Функция создания карточек
function rendered() {
    cardInfo.forEach(renderCard);
}

rendered();

//Функция обработчик формы добавления карточки
function renderFormSubmit(enl) {
    enl.preventDefault();
    const newCard = {
        name: nameImg.value,
        link: linkImg.value
    }
    renderCard(newCard);
    closedPopup(1);
    choiceForm(1).reset();
}

// Слушатель событий форм
choiceForm(0).addEventListener('submit', handleFormSubmit);
choiceForm(1).addEventListener('submit', renderFormSubmit);