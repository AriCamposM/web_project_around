import Popup from "./popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._form = this._popup.querySelector(".confirm__form");
    this._closeButton = this._popup.querySelector(".confirm__close-button");
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleConfirm(this._cardId);
    });

    this._closeButton.addEventListener("click", () => {
      this.close();
    });
  }

  open(cardId) {
    this._cardId = cardId; // Guardar el cardId cuando se abre el popup
    super.open();
  }

  close() {
    super.close();
    this._cardId = null;
  }
}
