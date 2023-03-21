let nameInput = document.querySelector('.popup__form-name');
let nameAuthor = document.querySelector('.profile__author');

let descriptionInput = document.querySelector('.popup__form-description');
let descriptionAuthor = document.querySelector('.profile__competention');

let openPopup = document.querySelector('.popup');
let openOverlay = document.querySelector('.overlay');
let buttonOpenedPop = document.querySelector('.profile__edit-button');
let buttonClosedPop = document.querySelector('.popup__button-closed');

let formElement = document.querySelector('.popup__form');

let likeButton = document.querySelectorAll('.elements__like-button')

function ExportValue() {
    nameInput.value = nameAuthor.innerHTML;
    descriptionInput.value = descriptionAuthor.innerHTML;
    return nameInput, descriptionInput;
}

function OpeningClosing() {
    buttonOpenedPop.addEventListener('click', function () {
        openPopup.classList.add('popup_opened');
        openOverlay.classList.add('overlay_opened');
        ExportValue();
    })

    buttonClosedPop.addEventListener('click', function () {
        openPopup.classList.remove('popup_opened');
        openOverlay.classList.remove('overlay_opened');
    })
}

function buttons() {
    likeButton.forEach(button =>
        button.addEventListener('click', (e) => {
            e.target.classList.toggle('elements__like-button_active')
        })
    );
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    nameAuthor.innerHTML = nameInput.value;
    descriptionAuthor.innerHTML = descriptionInput.value;
}

OpeningClosing();
buttons();
formElement.addEventListener('submit', handleFormSubmit);