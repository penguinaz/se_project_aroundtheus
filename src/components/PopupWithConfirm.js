import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleConfirmClick) {
    super(popupSelector);
    this._handleConfirmClick = handleConfirmClick;
    this._confirmBtn = this._popup.querySelector("#delete-btn");
  }

  setEventListeners(element) {
    this._confirmBtn.addEventListener("click", () => {
      this._handleConfirmClick(element);
      super.close();
    });
    super.setEventListeners();
  }
}
