export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    // .bind es para asegurarse que se vincule a la instancia de la clase
  }

  open() {
    this._popup.classList.add("popup_opened");
    this._popup.classList.add("viewer_opened");
    this._popup.classList.add("confirm_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._popup.classList.remove("viewer_opened");
    this._popup.classList.remove("confirm_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("popup__close-button") ||
        event.target === this._popup
      ) {
        this.close();
      }
    });
  }
}
