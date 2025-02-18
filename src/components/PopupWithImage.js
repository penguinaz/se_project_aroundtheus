import Popup from "./Popup.js";
import { imageModalCaption, imageModalPicture } from "./Constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(data) {
    imageModalPicture.src = data.link;
    imageModalPicture.alt = data.name;
    imageModalCaption.textContent = data.name;
    super.open();
  }
}
