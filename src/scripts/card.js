import Api from './Api.js';

class Card {
  constructor(text, imageLink, likes = [], ownerId, userId, cardId, templateSelector, handleCardClick, handleConfirm, api) {
    this._text = text;
    this._imageLink = imageLink;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._likes = likes; //Array de likes
    this._ownerId = ownerId; // ID del dueño de la tarjeta
    this._userId = userId; // ID del usuario
    this._cardId = cardId; // Id del la tarjeta
    this._handleConfirm = handleConfirm; // funcion que le paso para eliminar tarjetas
    this._api = api; // Instancia de la clase Api
    this._element = this._getTemplate();
    this._setEventListeners();
    this._verifyCardOwner();// Oculta el icono trash
    this._updateLikesCount();
    this._setLikeStatus();
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    return cardTemplate.cloneNode(true).children[0];
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__button")
      .addEventListener("click", () => this._handleLikeButton());
    this._element
      .querySelector(".element__trash")
      .addEventListener("click", () => this._handleConfirm(this._cardId));
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => this._handleCardClick(this._imageLink, this._text));
  }

  _handleLikeButton() {
    const likeButton = this._element.querySelector(".element__button");
    const isLiked = likeButton.classList.contains("active");

    if (isLiked) {
      this._api.removeLike(this._cardId)
        .then((updatedCard) => {
          this._likes = updatedCard.likes;
          this._updateLikesCount();
          likeButton.classList.remove("active");
        })
        .catch((error) => console.error(`Error al eliminar el like: ${error}`));
    } else {
      this._api.addLike(this._cardId)
        .then((updatedCard) => {
          this._likes = updatedCard.likes;
          this._updateLikesCount();
          likeButton.classList.add("active");
        })
        .catch((error) => console.error(`Error al añadir el like: ${error}`));
    }
  }

  _updateLikesCount() {
    const likesCountElement = this._element.querySelector(".element__likes-count");
    likesCountElement.textContent = this._likes.length;
  }

  _setLikeStatus() {
    const likeButton = this._element.querySelector(".element__button");
    const isLiked = this._likes.some(like => like._id === this._userId);
    if (isLiked) {
      likeButton.classList.add("active");
    }
  }

  _verifyCardOwner() {
    if (this._ownerId !== this._userId) {
      this._element.querySelector(".element__trash").style.display = "none";
    }
  }

  getCardElement() {
    this._element.querySelector(".element__image").src = this._imageLink;
    this._element.querySelector(".element__image").alt = this._text;
    this._element.querySelector(".element__text").textContent = this._text;

    this._element.setAttribute('data-id', this._cardId);

    this._updateLikesCount();

    return this._element;
  }
}

export default Card;
