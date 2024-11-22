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
const profileName = page.querySelector(".profile__name");
const profileCaption = page.querySelector(".profile__caption");
const modal = page.querySelector(".modal");
const closeBtn = modal.querySelector(".modal__exit-btn");
const form = modal.querySelector(".form");
const formName = form.querySelector(".form__input#title");
const formCaption = form.querySelector(".form__input#caption");
const saveBtn = form.querySelector(".form__save-btn");

editBtn.addEventListener("click", function () {
  formName.value = profileName.textContent;
  formCaption.value = profileCaption.textContent;
  modal.classList.add("modal_opened");
});

closeBtn.addEventListener("click", function () {
  modal.classList.remove("modal_opened");
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileCaption.textContent = formCaption.value;
  modal.classList.remove("modal_opened");
}

form.addEventListener("submit", handleProfileFormSubmit);
