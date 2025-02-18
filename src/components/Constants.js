export const initialCards = [
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

export const options = {
  formSelector: ".modal__form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-btn",
  inactiveButtonClass: "form__save-btn_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error-message_visible",
};

// Modals:
const modals = document.querySelectorAll(".modal");
const profileModal = document.querySelector("#profile-modal");
const cardModal = document.querySelector("#card-modal");
const imageModal = document.querySelector("#image-modal");

// Buttons and other nodes:
export const editBtn = document.querySelector(".profile__edit-btn");
export const addBtn = document.querySelector(".profile__add-btn");
const closeBtns = document.querySelectorAll(".modal__exit-btn");
const profileName = document.querySelector(".profile__name");
const profileCaption = document.querySelector(".profile__caption");
export const imageModalPicture = document.querySelector(
  ".modal-image__picture"
);
export const imageModalCaption = document.querySelector(
  ".modal-image__caption"
);

// Forms and input fields:
export const forms = [...document.querySelectorAll(options.formSelector)];
const profileForm = document.forms["profile-form"];
const cardForm = document.forms["card-form"];
export const formName = document.querySelector(".form__input#name");
export const formCaption = document.querySelector(".form__input#caption");
export const formTitle = document.querySelector(".form__input#title");
export const formUrl = document.querySelector(".form__input#url");

// Templates:
const elementTemplate = document.querySelector("#element").content;
const elementContainer = document.querySelector(".elements__container");
