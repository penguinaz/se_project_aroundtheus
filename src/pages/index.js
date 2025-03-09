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
function handleImageClick({ name, link }) {
  imageInstance.open({ name, link });
}

function renderLoading(isLoading, btn, defaultText) {
  if (isLoading) {
    btn.textContent = "Saving...";
    debugger;
  } else {
    btn.textContent = defaultText;
    debugger;
  }
}

function handleDeleteClick(evt) {
  const element = evt.currentTarget.closest(".element");
  console.log(element.id);
  const popupConfirmDelete = new PopupWithConfirm(
    "#delete-modal",
    (element) => {
      renderLoading(true, popupConfirmDelete.confirmBtn);
      api
        .deleteCard(element.id)
        .then((message) => {
          console.log(message);
          renderLoading(false, popupConfirmDelete.confirmBtn, "Yes");
        })
        .catch((err) => {
          console.error(err);
        });
      element.remove();
    }
  );
  popupConfirmDelete.setEventListeners(element);
  popupConfirmDelete.open();
}

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

api.getUserInfo().then((data) => {
  profileInfo.setUserInfo({
    name: data.name,
    caption: data.about,
    avatar: data.avatar,
  });
});

const avatarPopup = new PopupWithForm("#avatar-modal", (avatar) => {
  renderLoading(true, avatarPopup.submitBtn);
  profileInfo.setUserAvatar(avatar);
  api
    .patchUserAvatar(avatar)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
});
avatarPopup.setEventListeners();
penBtn.addEventListener("click", () => {
  avatarPopup.open();
});

// set up popup with profile form
const profilePopup = new PopupWithForm(
  "#profile-modal",
  ({ name, caption }) => {
    api
      .patchUserInfo({ name, about: caption })
      .then((data) => {
        profileInfo.setUserInfo({ name, caption, avatar: data.avatar });
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
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
  renderLoading(true, cardPopup.submitBtn);
  api
    .postNewCard({ name: title, link: url })
    .then((data) => {
      cardSection.addItem(data);
      cardPopup.resetForm();
      renderLoading(false, cardPopup.submitBtn, "Create");
    })
    .catch((err) => {
      console.error(err);
    });
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
