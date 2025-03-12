import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, renderLoading, defaultText) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(".form");
    this.submitBtn = document.querySelector(".form__save-btn");
    this._renderLoading = renderLoading;
    this._handleFormSubmit = (e) => {
      e.preventDefault();
      this._renderLoading(true, this.submitBtn);
      handleFormSubmit(this._getInputValues())
        .then(() => {
          super.close();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this._renderLoading(false, this.submitBtn, defaultText);
        });
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
