const config = {
  formSelector: ".modal__form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-btn",
  inactiveButtonClass: "form__save-btn_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error-message_visible",
};

const toggleSaveButton = (form, inputList, options) => {
  saveButton = form.querySelector(options.submitButtonSelector);
  if (inputList.some((input) => !input.validity.valid)) {
    saveButton.disabled = true;
    saveButton.classList.add(options.inactiveButtonClass);
  } else {
    saveButton.disabled = false;
    saveButton.classList.remove(options.inactiveButtonClass);
  }
};

const showInputError = (form, input, options) => {
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.classList.add(options.errorClass);
  errorElement.textContent = input.validationMessage;
  input.classList.add(options.inputErrorClass);
};

const hideInputError = (form, input, options) => {
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = "";
  input.classList.remove(options.inputErrorClass);
};

const checkInputValidity = (form, input, options) => {
  if (!input.validity.valid) {
    showInputError(form, input, options);
  } else {
    hideInputError(form, input, options);
  }
};

const setEventListeners = (form, inputList, options) => {
  inputList.forEach((input) => {
    input.addEventListener("input", (e) => {
      checkInputValidity(form, e.target, options);
      toggleSaveButton(form, inputList, options);
    });
    input.addEventListener("change", (e) => {
      checkInputValidity(form, e.target, options);
      toggleSaveButton(form, inputList, options);
    });
  });
};

const enableValidation = (options) => {
  const forms = [...document.querySelectorAll(options.formSelector)];
  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    const inputList = [...form.querySelectorAll(options.inputSelector)];
    document.querySelector(`#${form.id}-btn`).addEventListener("click", () => {
      toggleSaveButton(form, inputList, options);
    });

    setEventListeners(form, inputList, options);
  });
};

enableValidation(config);
