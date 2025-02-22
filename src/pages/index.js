import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {
  initialCards,
  options,
  formName,
  formCaption,
  forms,
  editBtn,
  addBtn,
} from "../utils/Constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// set up popups with images
const imageInstance = new PopupWithImage("#image-modal");
imageInstance.setEventListeners();
function handleImageClick({ name, link }) {
  imageInstance.open({ name, link });
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item, method = "prepend", elementContainer) => {
      const cardElement = new Card(item, "#element", handleImageClick);
      elementContainer[method](cardElement.createCard());
    },
  },
  ".elements__container"
);
cardSection.renderItems(); // generate default cards

// set up user profile
const profileInfo = new UserInfo({
  nameSelector: ".profile__name",
  captionSelector: ".profile__caption",
});

// set up popup with profile form
const profilePopup = new PopupWithForm(
  "#profile-modal",
  ({ name, caption }) => {
    profileInfo.setUserInfo(name, caption);
  }
);
profilePopup.setEventListeners();
editBtn.addEventListener("click", () => {
  const currentUserInfo = profileInfo.getUserInfo();
  formName.value = currentUserInfo.name;
  formCaption.value = currentUserInfo.caption;
  profilePopup.open();
});

// set up popup with form for adding a card
const cardPopup = new PopupWithForm("#card-modal", ({ title, url }) => {
  cardSection.addItem({ name: title, link: url });
  cardPopup.resetForm();
});
cardPopup.setEventListeners();
addBtn.addEventListener("click", () => {
  cardPopup.open();
});

// set up form validation
forms.forEach((form) => {
  const currentForm = new FormValidator(options, form);
  currentForm.enableValidation();
});
