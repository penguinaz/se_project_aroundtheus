import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageModalPicture = document.querySelector(".modal-image__picture");
    this._imageModalCaption = document.querySelector(".modal-image__caption");
  }

  open(data) {
    this._imageModalPicture.src = data.link;
    this._imageModalPicture.alt = data.name;
    this._imageModalCaption.textContent = data.name;
    super.open();
  }
}
