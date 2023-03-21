let nameInput = document.querySelector('.popup__form_name'); 
let nameAuthor = document.querySelector('.profile__author'); 
let descriptionInput = document.querySelector('.popup__form_description'); 
let descriptionAuthor = document.querySelector('.profile__competention'); 
let openPopup = document.querySelector('.popup'); 
let buttonOpenedPop = document.querySelector('.profile__edit-button'); 
let buttonClosedPop = document.querySelector('.popup__button-closed'); 
let formElement = document.querySelector('.popup__form');

// let likeButton = document.querySelectorAll('.elements__like-button');

function ExportValue() { 
    nameInput.value = nameAuthor.textContent; 
    descriptionInput.value = descriptionAuthor.textContent; 
    return nameInput, descriptionInput; 
}

function Opening() {
    openPopup.classList.add('popup_opened'); 
}

function Closing() {
    openPopup.classList.remove('popup_opened');
}

function OpeningClosing() { 
    buttonOpenedPop.addEventListener('click', function () { 
        Opening();
        ExportValue(); 
    }) 
    buttonClosedPop.addEventListener('click', function () { 
        Closing()
    }) 
}

function handleFormSubmit(evt) { 
    evt.preventDefault(); 
    nameAuthor.textContent = nameInput.value; 
    descriptionAuthor.textContent = descriptionInput.value; 
    Closing()
} 

// function buttons() { 
//     likeButton.forEach(button => 
//         button.addEventListener('click', (e) => { 
//             e.target.classList.toggle('elements__like-button_active') 
//         }) 
//     ); 
// }

OpeningClosing();
formElement.addEventListener('submit', handleFormSubmit); 