export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this.name = name;
    this.link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".element__picture");
  }

  _handleLikeClick(evt) {
    evt.currentTarget.classList.toggle("element__like-btn_active");
  }

  _handleDeleteClick(evt) {
    evt.currentTarget.closest(".element").remove();
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".element__like-btn")
      .addEventListener("click", this._handleLikeClick);
    this._cardElement
      .querySelector(".element__trash-btn")
      .addEventListener("click", this._handleDeleteClick);
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  createCard() {
    this._cardImage.src = this.link;
    this._cardImage.alt = this.name;
    this._cardElement.querySelector(".element__title").textContent = this.name;
    this._setEventListeners();
    return this._cardElement;
  }
}
