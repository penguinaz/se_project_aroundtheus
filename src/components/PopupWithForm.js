import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = (e) => {
      e.preventDefault();
      handleFormSubmit();
      super.close();
      this._popup.removeEventListener("submit", this._handleFormSubmit);
    };
  }

  close() {
    super.close();
  }

  _getInputValues() {
    return Object.fromEntries(new FormData(this._popup.querySelector(".form")));
  }

  setEventListeners() {
    this._popup.addEventListener("submit", this._handleFormSubmit);
    super.setEventListeners();
  }
}
