import Popup from "./popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(".viewer__image");
    this._captionElement = this._popup.querySelector(".viewer__text");
    this._closeButton = this._popup.querySelector(".viewer__close");
  }

  open(link, name) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
