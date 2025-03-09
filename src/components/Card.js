import Api from "./Api";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5e8acbbd-4426-43e4-895b-01bd99bee13b",
    "Content-Type": "application/json",
  },
});

export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteClick
  ) {
    this.name = name;
    this.link = link;
    this.id = _id;
    this.isLiked = isLiked;
    this.api = api;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".element__picture");
    this._likeBtn = this._cardElement.querySelector(".element__like-btn");
  }

  _handleLikeClick(evt) {
    const element = evt.currentTarget.closest(".element");
    evt.currentTarget.classList.toggle("element__like-btn_active");
    if (element.isLiked) {
      api.unlikeCard(element.id).catch((err) => {
        console.error(err);
      });
      element.isLiked = false;
    } else {
      api.likeCard(element.id).catch((err) => {
        console.error(err);
      });
      element.isLiked = true;
    }
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
    this._cardElement.isLiked = this.isLiked;
    if (this.isLiked) {
      this._likeBtn.classList.add("element__like-btn_active");
    }
    this._cardElement.id = this.id;
    return this._cardElement;
  }
}
