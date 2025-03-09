import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleConfirmClick) {
    super(popupSelector);
    this._handleConfirmClick = handleConfirmClick;
    this.confirmBtn = this._popup.querySelector("#delete-btn");
  }

  setEventListeners(element) {
    this.confirmBtn.addEventListener("click", () => {
      this._handleConfirmClick(element);
      super.close();
    });
    super.setEventListeners();
  }
}
