export default class UserInfo {
  constructor({ nameSelector, captionSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._caption = document.querySelector(captionSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      caption: this._caption.textContent,
    };
  }

  setUserInfo({ name, caption }) {
    this._name.textContent = name;
    this._caption.textContent = caption;
  }
}
