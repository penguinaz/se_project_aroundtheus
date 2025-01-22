export default class FormValidator {
  constructor(options, form) {
    this._options = options;
    this._form = form;
  }

  _toggleSaveButton() {
    this._saveButton = this._form.querySelector(
      this._options.submitButtonSelector
    );
    if (this._inputList.some((input) => !input.validity.valid)) {
      this._saveButton.disabled = true;
      this._saveButton.classList.add(this._options.inactiveButtonClass);
    } else {
      this._saveButton.disabled = false;
      this._saveButton.classList.remove(this._options.inactiveButtonClass);
    }
  }

  _showInputError(input) {
    this._errorElement = this._form.querySelector(`#${input.id}-error`);
    this._errorElement.classList.add(this._options.errorClass);
    this._errorElement.textContent = input.validationMessage;
    input.classList.add(this._options.inputErorrClass);
  }

  _hideInputError(input) {
    this._errorElement = this._form.querySelector(`#${input.id}-error`);
    this._errorElement.classList.remove(this._options.errorClass);
    this._errorElement.textContent = "";
    input.classList.remove(this._options.inputErrorClass);
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", (evt) => {
        this._checkInputValidity(evt.target);
        this._toggleSaveButton();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._inputList = [
      ...this._form.querySelectorAll(this._options.inputSelector),
    ];
    document
      .querySelector(`#${this._form.id}-btn`)
      .addEventListener("click", () => {
        this._toggleSaveButton();
      });
    this._setEventListeners();
  }
}
