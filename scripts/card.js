class Card {
  constructor(text, imageLink, templateSelector, handleCardClick) {
    this._text = text;
    this._imageLink = imageLink;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._setEventListeners();
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    return cardTemplate.cloneNode(true).children[0];
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });
    this._element
      .querySelector(".element__trash")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._imageLink, this._text);
      });
  }

  _handleLikeButton() {
    this._element.querySelector(".element__button").classList.toggle("active");
  }

  _handleDeleteButton() {
    this._element.remove();
  }

  _handleLikeButton() {
    this._element.querySelector(".element__button").classList.toggle("active");
  }

  getCardElement() {
    this._element.querySelector(".element__image").src = this._imageLink;
    this._element.querySelector(".element__image").alt = this._text;
    this._element.querySelector(".element__text").textContent = this._text;

    return this._element;
  }
}

export default Card;
