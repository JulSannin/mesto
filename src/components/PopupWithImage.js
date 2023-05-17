import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImgCard = this._popup.querySelector('.popup__img-card');
        this._popupImgCardName = this._popup.querySelector('.popup__img-card-name');
    };

    open(nameImage, linkImage) {
        this._popupImgCard.src = linkImage;
        this._popupImgCard.alt = nameImage;
        this._popupImgCard.title = nameImage;
        this._popupImgCardName.textContent = nameImage;
        super.open();
    };
};