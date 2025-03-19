import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, defaultText) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(".form");
    this.submitBtn = this._popup.querySelector(".form__save-btn");
    this._submitBtnText = this.submitBtn.textContent;
    this._handleFormSubmit = (e) => {
      e.preventDefault();
      this._renderLoading(true);
      handleFormSubmit(this._getInputValues())
        .then(() => {
          super.close();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this._renderLoading(false);
        });
    };
  }

  _renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this.submitBtn.textContent = loadingText;
    } else {
      this.submitBtn.textContent = this._submitBtnText;
    }
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
