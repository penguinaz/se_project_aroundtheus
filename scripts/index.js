const initialCards = [
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

// Modals:
const modals = page.querySelectorAll(".modal");
const profileModal = page.querySelector("#profile-modal");
const cardModal = page.querySelector("#card-modal");
const imageModal = page.querySelector("#image-modal");

// Buttons and other nodes:
const editBtn = page.querySelector(".profile__edit-btn");
const addBtn = page.querySelector(".profile__add-btn");
const closeBtns = page.querySelectorAll(".modal__exit-btn");
const profileName = page.querySelector(".profile__name");
const profileCaption = page.querySelector(".profile__caption");
const imageModalPicture = page.querySelector(".modal-image__picture");
const imageModalCaption = page.querySelector(".modal-image__caption");

// Forms and input fields:
const profileForm = document.forms["profile-form"];
const cardForm = document.forms["card-form"];
const formName = page.querySelector(".form__input#name");
const formCaption = page.querySelector(".form__input#caption");
const formTitle = page.querySelector(".form__input#title");
const formUrl = page.querySelector(".form__input#url");

// Templates:
const elementTemplate = page.querySelector("#element").content;
const elementContainer = page.querySelector(".elements__container");

function openPopup(popup) {
  popup.classList.add("modal_opened");
  window.addEventListener("keyup", closeModalOnEsc);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  window.removeEventListener("keyup", closeModalOnEsc);
}

function closeModalOnEsc(evt) {
  if (evt.key == "Escape") {
    closePopup(page.querySelector(".modal_opened"));
  }
}

function getCardElement(data) {
  const cardElement = elementTemplate.querySelector(".element").cloneNode(true);
  const cardImage = cardElement.querySelector(".element__picture");
  cardImage.addEventListener("click", () => {
    imageModalPicture.src = data.link;
    imageModalPicture.alt = data.name;
    imageModalCaption.textContent = data.name;
    openPopup(imageModal);
  });
  const cardTitle = cardElement.querySelector(".element__title");
  const likeBtn = cardElement.querySelector(".element__like-btn");
  likeBtn.addEventListener("click", (evt) => {
    evt.currentTarget.classList.toggle("element__like-btn_active");
  });
  const trashBtn = cardElement.querySelector(".element__trash-btn");
  trashBtn.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  return cardElement;
}

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  elementContainer[method](cardElement);
}

initialCards.forEach((card) => {
  renderCard(card, "append");
});

editBtn.addEventListener("click", () => {
  formName.value = profileName.textContent;
  formCaption.value = profileCaption.textContent;
  // console.log("fields populated");
  openPopup(profileModal);
});

addBtn.addEventListener("click", () => {
  openPopup(cardModal);
});

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (
      e.target.classList.contains("modal_opened") ||
      e.target.classList.contains("modal__exit-btn")
    ) {
      closePopup(modal);
    }
  });
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileCaption.textContent = formCaption.value;
  closePopup(profileModal);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard({ name: formTitle.value, link: formUrl.value });
  closePopup(cardModal);
  evt.target.reset();
}

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);
