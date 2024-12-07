let initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const page = document.querySelector(".page");
const editBtn = page.querySelector(".profile__edit-btn");
const addBtn = page.querySelector(".profile__add-btn");
const profileName = page.querySelector(".profile__name");
const profileCaption = page.querySelector(".profile__caption");
const profileModal = page.querySelector("#profile-modal");
const cardModal = page.querySelector("#card-modal");
const imageModal = page.querySelector("#image-modal");
const imageModalPicture = page.querySelector(".modal-image__picture");
const imageModalCaption = page.querySelector(".modal-image__caption");
const closeBtns = page.querySelectorAll(".modal__exit-btn");
const profileForm = page.querySelector("#profile-form");
const cardForm = page.querySelector("#card-form");
const formName = page.querySelector(".form__input#name");
const formCaption = page.querySelector(".form__input#caption");
const formTitle = page.querySelector(".form__input#title");
const formUrl = page.querySelector(".form__input#url");
const saveBtn = page.querySelector(".form__save-btn#save");
const createBtn = page.querySelector(".form__create-btn#create");

const elementTemplate = page.querySelector("#element").content;
const elementContainer = page.querySelector(".elements__container");

function getCardElement(data) {
  let cardElement = elementTemplate.querySelector(".element").cloneNode(true);
  let cardImage = cardElement.querySelector(".element__picture");
  cardImage.addEventListener("click", () => {
    imageModalPicture.src = data.link;
    imageModalPicture.alt = data.name;
    imageModalCaption.textContent = data.name;
    imageModal.classList.add("modal_opened");
  });
  let cardTitle = cardElement.querySelector(".element__title");
  let likeBtn = cardElement.querySelector(".element__like-btn");
  likeBtn.addEventListener("click", (evt) => {
    evt.currentTarget.classList.toggle("element__like-btn_active");
  });
  let trashBtn = cardElement.querySelector(".element__trash-btn");
  trashBtn.addEventListener("click", () => {
    trashBtn.closest(".element").remove();
  });
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  return cardElement;
}

initialCards.forEach((card) => {
  let currentCard = getCardElement(card);
  elementContainer.append(currentCard);
});

editBtn.addEventListener("click", () => {
  formName.value = profileName.textContent;
  formCaption.value = profileCaption.textContent;
  profileModal.classList.add("modal_opened");
});

addBtn.addEventListener("click", () => {
  cardModal.classList.add("modal_opened");
});

closeBtns.forEach((button) => {
  button.addEventListener("click", (evt) => {
    evt.currentTarget.closest(".modal").classList.remove("modal_opened");
  });
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileCaption.textContent = formCaption.value;
  profileModal.classList.remove("modal_opened");
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  initialCards.unshift({ name: formTitle.value, link: formUrl.value });
  elementContainer.prepend(getCardElement(initialCards[0]));
  cardModal.classList.remove("modal_opened");
}

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);
