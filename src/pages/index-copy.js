import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

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

const options = {
  formSelector: ".modal__form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-btn",
  inactiveButtonClass: "form__save-btn_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error-message_visible",
};

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
const forms = [...document.querySelectorAll(options.formSelector)];
const profileForm = document.forms["profile-form"];
const cardForm = document.forms["card-form"];
const formName = page.querySelector(".form__input#name");
const formCaption = page.querySelector(".form__input#caption");
const formTitle = page.querySelector(".form__input#title");
const formUrl = page.querySelector(".form__input#url");

// Templates:
const elementTemplate = page.querySelector("#element").content;
const elementContainer = page.querySelector(".elements__container");

function handleImageClick({ name, link }) {
  const imageInstance = new PopupWithImage("#image-modal");
  imageInstance.setEventListeners();
  imageInstance.open({ name, link });
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item, method = "prepend") => {
      const cardElement = new Card(item, "#element", handleImageClick);
      elementContainer[method](cardElement.createCard());
    },
  },
  ".elements__container"
);
cardSection.renderItems();

editBtn.addEventListener("click", () => {
  formName.value = profileName.textContent;
  formCaption.value = profileCaption.textContent;
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
  cardSection.addItem({ name: formTitle.value, link: formUrl.value });
  closePopup(cardModal);
  evt.target.reset();
}

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);

forms.forEach((form) => {
  const currentForm = new FormValidator(options, form);
  currentForm.enableValidation();
});
