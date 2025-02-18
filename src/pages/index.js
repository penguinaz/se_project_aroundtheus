import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {
  initialCards,
  options,
  formName,
  formCaption,
  formTitle,
  formUrl,
  forms,
  editBtn,
  addBtn,
} from "../components/Constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// set up popups with images
function handleImageClick({ name, link }) {
  const imageInstance = new PopupWithImage("#image-modal");
  imageInstance.setEventListeners();
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
const profilePopup = new PopupWithForm("#profile-modal", () => {
  profileInfo.setUserInfo(formName.value, formCaption.value);
});
editBtn.addEventListener("click", () => {
  const currentUserInfo = profileInfo.getUserInfo();
  formName.value = currentUserInfo.name;
  formCaption.value = currentUserInfo.caption;
  profilePopup.setEventListeners();
  profilePopup.open();
});

// set up popup with form for adding a card
const cardPopup = new PopupWithForm("#card-modal", (evt) => {
  cardSection.addItem({ name: formTitle.value, link: formUrl.value });
  // evt.target.reset(); for some reason, this won't work
});
addBtn.addEventListener("click", () => {
  formTitle.value = "";
  formUrl.value = "";
  cardPopup.setEventListeners();
  cardPopup.open();
});

// set up form validation
forms.forEach((form) => {
  const currentForm = new FormValidator(options, form);
  currentForm.enableValidation();
});
