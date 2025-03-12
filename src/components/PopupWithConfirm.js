import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(
    popupSelector,
    handleConfirmClick,
    elementToRemove,
    renderLoading
  ) {
    super(popupSelector);
    this.submitBtn = this._popup.querySelector("#delete-btn");
    this.element = elementToRemove;
    this._renderLoading = renderLoading;
    this._handleConfirmClick = () => {
      this._renderLoading(true, this.submitBtn);
      handleConfirmClick(this.element)
        .then(() => {
          this.close();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this._renderLoading(false, this.submitBtn, "Yes");
        });
    };
  }

  _setEventListeners() {
    this.submitBtn.addEventListener("click", this._handleConfirmClick);
    super.setEventListeners();
  }

  open() {
    this._setEventListeners();
    super.open();
  }

  close() {
    this.submitBtn.removeEventListener("click", this._handleConfirmClick);
    super.close();
  }
}
