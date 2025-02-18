export default class UserInfo {
  constructor({ nameSelector, captionSelector }) {
    this._name = document.querySelector(nameSelector);
    this._caption = document.querySelector(captionSelector);
  }

  getUserInfo() {
    return { name: this._name.textContent, caption: this._caption.textContent };
  }

  setUserInfo(nameValue, captionValue) {
    this._name.textContent = nameValue;
    this._caption.textContent = captionValue;
  }
}
