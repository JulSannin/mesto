import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._confirmButton = popupSelector.querySelector('.popup__button-saved')
    };
    open(callBack) {
        super.open()
        this._confirmButton.onclick = callBack
    }
}