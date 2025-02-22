import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(".form");
    this._handleFormSubmit = (e) => {
      e.preventDefault();
      handleFormSubmit(this._getInputValues());
      super.close();
    };
  }

  _getInputValues() {
    return Object.fromEntries(new FormData(this._formElement));
  }

  resetForm() {
    this._formElement.reset();
  }

  setEventListeners() {
    this._popup.addEventListener("submit", this._handleFormSubmit);
    super.setEventListeners();
  }
}
