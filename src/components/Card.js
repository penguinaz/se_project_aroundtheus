export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this.name = name;
    this.link = link;
    this.id = _id;
    this.isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = () => {
      handleLikeClick(this.id, this.isLiked).then(() => {
        this._likeBtn.classList.toggle("element__like-btn_active");
      });
    };
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".element__picture");
    this._likeBtn = this._cardElement.querySelector(".element__like-btn");
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
