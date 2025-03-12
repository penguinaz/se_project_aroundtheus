import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {
  options,
  formName,
  formCaption,
  forms,
  editBtn,
  addBtn,
  penBtn,
} from "../utils/Constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

function renderLoading(isLoading, btn, defaultText) {
  if (isLoading) {
    btn.textContent = "Saving...";
  } else {
    btn.textContent = defaultText;
  }
}

function handleDeleteClick(evt) {
  const element = evt.currentTarget.closest(".element");
  const popupConfirmDelete = new PopupWithConfirm(
    "#delete-modal",
    (element) => {
      return api.deleteCard(element.id).then(() => {
        element.remove();
      });
    },
    element,
    renderLoading
  );
  popupConfirmDelete.open();
}

function handleImageClick({ name, link }) {
  imageInstance.open({ name, link });
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5e8acbbd-4426-43e4-895b-01bd99bee13b",
    "Content-Type": "application/json",
  },
});

// set up popups with images
const imageInstance = new PopupWithImage("#image-modal");
imageInstance.setEventListeners();

// set up section with card elements
const cardSection = new Section(
  {
    items: [],
    renderer: (item, method = "prepend", elementContainer) => {
      const cardElement = new Card(
        item,
        "#element",
        handleImageClick,
        handleDeleteClick
      );
      elementContainer[method](cardElement.createCard());
    },
  },
  ".elements__container"
);
// populate the card section with cards from server
api
  .getInitialCards()
  .then((data) => {
    cardSection.renderItems(data);
  })
  .catch((err) => {
    console.error(err);
  });

// set up user profile
const profileInfo = new UserInfo({
  nameSelector: ".profile__name",
  captionSelector: ".profile__caption",
  avatarSelector: ".profile__picture",
});
// populate user profile with data from server
api.getUserInfo().then((data) => {
  profileInfo.setUserInfo({
    name: data.name,
    caption: data.about,
    avatar: data.avatar,
  });
});

const avatarPopup = new PopupWithForm(
  "#avatar-modal",
  ({ avatar }) => {
    return api.patchUserAvatar({ avatar }).then((data) => {
      profileInfo.setUserAvatar({ avatar: data.avatar });
    });
  },
  renderLoading,
  "Save"
);
avatarPopup.setEventListeners();
penBtn.addEventListener("click", () => {
  avatarPopup.open();
});

// set up popup with profile form
const profilePopup = new PopupWithForm(
  "#profile-modal",
  ({ name, caption }) => {
    return api.patchUserInfo({ name, about: caption }).then((data) => {
      profileInfo.setUserInfo({ name, caption, avatar: data.avatar });
    });
  },
  renderLoading,
  "Save"
);
profilePopup.setEventListeners();
editBtn.addEventListener("click", () => {
  const currentUserInfo = profileInfo.getUserInfo();
  formName.value = currentUserInfo.name;
  formCaption.value = currentUserInfo.caption;
  profilePopup.open();
});

// set up popup with form for adding a card
const cardPopup = new PopupWithForm(
  "#card-modal",
  ({ title, url }) => {
    return api.postNewCard({ name: title, link: url }).then((data) => {
      cardSection.addItem(data);
      cardPopup.resetForm();
    });
  },
  renderLoading,
  "Create"
);
cardPopup.setEventListeners();
addBtn.addEventListener("click", () => {
  cardPopup.open();
});

// set up form validation
forms.forEach((form) => {
  const currentForm = new FormValidator(options, form);
  currentForm.enableValidation();
});
