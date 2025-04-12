import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleConfirmClick, renderLoading) {
    super(popupSelector);
    this.submitBtn = this._popup.querySelector("#delete-btn");
    this._renderLoading = renderLoading;
    this._handleConfirmClick = () => {
      this._renderLoading(true, this.submitBtn);
      handleConfirmClick(this._element)
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

  open(element) {
    this._element = element;
    this.submitBtn.addEventListener("click", this._handleConfirmClick);
    super.open();
  }

  close() {
    this.submitBtn.removeEventListener("click", this._handleConfirmClick);
    super.close();
  }
}
