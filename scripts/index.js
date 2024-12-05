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
const modal = page.querySelector(".modal");
const closeBtn = modal.querySelector(".modal__exit-btn");
const form = modal.querySelector(".form");
const formTitle = form.querySelector(".form__title");
const formName = form.querySelector(".form__input#title");
const formCaption = form.querySelector(".form__input#caption");
const saveBtn = form.querySelector(".form__save-btn");

/*
i noticed the forms have identical design, so instead of using 2 different forms, i am going to use
functions to repurpose the forms for certain tasks. i tried using templates instead, but after a few hours
of trying i reverted back to my previous commit.
*/
let formPurpose = 0; // if formPurpose == 0, opens form to edit profile, if formPurpose == 1, opens form to add picture

const elementTemplate = page.querySelector("#element").content;
const elementContainer = page.querySelector(".elements__container");

function getCardElement(data) {
  let cardElement = elementTemplate.querySelector(".element").cloneNode(true);
  let cardImage = cardElement.querySelector(".element__picture");
  let cardTitle = cardElement.querySelector(".element__title");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  return cardElement;
}

initialCards.forEach((card) => {
  let currentCard = getCardElement(card);
  elementContainer.append(currentCard);
});

function populateForm(title, firstField, secondField, btn) {
  formTitle.textContent = title;
  formName.placeholder = firstField;
  formCaption.placeholder = secondField;
  saveBtn.textContent = btn;
}

editBtn.addEventListener("click", function () {
  populateForm("Edit profile", "Name", "Description", "Save");
  formPurpose = 0; // when the edit button is clicked, the form is repurposed to edit the profile
  formName.value = profileName.textContent;
  formCaption.value = profileCaption.textContent;
  modal.classList.add("modal_opened");
});

addBtn.addEventListener("click", function () {
  populateForm("New place", "Title", "Image link", "Create");
  formPurpose = 1; // when the add button is clicked, the form is repurposed to add a picture
  formName.value = "";
  formCaption.value = "";
  modal.classList.add("modal_opened");
});

closeBtn.addEventListener("click", function () {
  modal.classList.remove("modal_opened");
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  if (formPurpose == 0) {
    // 0 means the form is for profile editing
    profileName.textContent = formName.value;
    profileCaption.textContent = formCaption.value;
  } else if (formPurpose == 1) {
    // 1 means the form is for adding a picture
    console.log("Add picture");
    initialCards.unshift({ name: formName.value, link: formCaption.value });
    elementContainer.prepend(getCardElement(initialCards[0]));
  }
  modal.classList.remove("modal_opened");
}

form.addEventListener("submit", handleProfileFormSubmit);
