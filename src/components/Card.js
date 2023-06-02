export default class Card {
  constructor({data, cardSelector, userId, handleCardClick, handleLikeClick, handleRemoveClick}) {
    this._nameImage = data.name;
    this._imageLink = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._userId = userId;
    this._owner = data.owner._id;
    this._cardSelector = cardSelector;
    
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleRemoveClick = handleRemoveClick;

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
    this._likeButton = this._cardElement.querySelector('.elements__like-button')
    this._deleteButton = this._cardElement.querySelector('.elements__deleted-button')
    this._cardsElementImage = this._cardElement.querySelector('.elements__photo');

    this._cardsElementImage.src = this._imageLink;
    this._cardsElementImage.title = this._nameImage;
    this._cardsElementImage.alt = this._nameImage;
    this._cardElement.querySelector('.elements__place-name').textContent = this._nameImage;
    
    this._countLikeElement = this._cardElement.querySelector('.elements__like-counter')
    this._countLikeElement.textContent = this._likes.length;

    this._setEventListeners();
    this._toggleLikeCounter()

    return this._cardElement;
  };

  _setEventListeners() {
    this._likeButton.addEventListener('click', (evt) => {
      this._handleLikeClick(evt)
    })

    if (this._userId === this._owner) {
      this._deleteButton.addEventListener('click', (evt) => {
        this._handleRemoveClick(evt)
      })
    }
    else (
      this._deleteButton.remove()
    )

    this._cardsElementImage.addEventListener('click', () => this._handleCardClick());
  };

  _toggleLikeCounter() {
    if (this._checkUserLikes()) {
      this.setLike()
    }
    else {
      this.unsetLike
    }
  }

  _checkUserLikes() {
    return this._likes.some(item => item._id == this._userId)
  }

  setLike() {
    this._likeButton.classList.add('elements__like-button_active')
    this.isLiked = true
  }

  unsetLike() {
    this._likeButton.classList.remove('elements__like-button_active')
    this.isLiked = false
  }

  updateLikeCounter(data) {
    this._countLikeElement.textContent = data.length;
  }

  getCardId() {
    return this._cardId
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle('elements__like-button_active');
  };

  _deleteCardclick() {
    this._cardElement.remove();
    this._cardElement = null;
  };
};