export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._nameImage = data.name;
    this._imageLink = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._imagePopup = document.querySelector('.popup_card_opening-image');
    this._popupImgCard = this._imagePopup.querySelector('.popup__img-card');
    this._popupImgCardName = this._imagePopup.querySelector('.popup__img-card-name');
  };

  _getTemplate() {
    this._cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.elements__item').cloneNode(true);
    return this._cardTemplate;
  };

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardsElementImage = this._cardElement.querySelector('.elements__photo');
    this._cardsElementImage.src = this._imageLink;
    this._cardsElementImage.title = this._nameImage;
    this._cardsElementImage.alt = this._nameImage;
    this._cardElement.querySelector('.elements__place-name').textContent = this._nameImage;

    this._setEventListeners();

    return this._cardElement;
  };

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector('.elements__like-button');
    this._deleteButton = this._cardElement.querySelector('.elements__deleted-button');

    this._likeButton.addEventListener('click', (evt) => {
      this._handleLikeCLick(evt);
    })

    this._deleteButton.addEventListener('click', (evt) => {
      this._deleteCardclick(evt);
    })

    this._cardsElementImage.addEventListener('click', () => this._handleCardClick());
  };

  _handleLikeCLick() {
    this._likeButton.classList.toggle('elements__like-button_active');
  };

  _deleteCardclick() {
    this._cardElement = null;
  };
};