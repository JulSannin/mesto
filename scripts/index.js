let nameInput = document.querySelector('.popup__name'); 
let nameAuthor = document.querySelector('.profile__author'); 
let descriptionInput = document.querySelector('.popup__description'); 
let descriptionAuthor = document.querySelector('.profile__competention'); 
let openPopup = document.querySelector('.popup'); 
let buttonOpenedPop = document.querySelector('.profile__edit-button'); 
let buttonClosedPop = document.querySelector('.popup__button-closed'); 
let formElement = document.querySelector('.popup__form');

// let likeButton = document.querySelectorAll('.elements__like-button');

function exportValue() { 
    nameInput.value = nameAuthor.textContent; 
    descriptionInput.value = descriptionAuthor.textContent; 
    return nameInput, descriptionInput; 
}

function opening() {
    openPopup.classList.add('popup_opened'); 
}

function closing() {
    openPopup.classList.remove('popup_opened');
}

function openingClosing() { 
    buttonOpenedPop.addEventListener('click', function () { 
        opening();
        exportValue(); 
    }) 
    buttonClosedPop.addEventListener('click', function () { 
        closing()
    }) 
}

function handleFormSubmit(evt) { 
    evt.preventDefault(); 
    nameAuthor.textContent = nameInput.value; 
    descriptionAuthor.textContent = descriptionInput.value; 
    closing()
} 

// function buttons() { 
//     likeButton.forEach(button => 
//         button.addEventListener('click', (e) => { 
//             e.target.classList.toggle('elements__like-button_active') 
//         }) 
//     ); 
// }

openingClosing();
formElement.addEventListener('submit', handleFormSubmit); 