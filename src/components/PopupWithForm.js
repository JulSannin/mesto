import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._submitButtonSelector = this._popup.querySelector('.popup__button-saved');
        this._submitButtonText = this._submitButtonSelector.textContent;
        this._handleFormSubmit = handleFormSubmit;
    };

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    };

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    };

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    };

    close() {
        super.close();
        this._form.reset();
    };
};