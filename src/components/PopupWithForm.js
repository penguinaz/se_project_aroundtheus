import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = (e) => {
      e.preventDefault();
      handleFormSubmit(this._getInputValues());
      super.close();
    };
  }

  _getInputValues() {
    return Object.fromEntries(new FormData(this._popup.querySelector(".form")));
  }

  setEventListeners() {
    this._popup.addEventListener("submit", this._handleFormSubmit);
    super.setEventListeners();
  }
}
