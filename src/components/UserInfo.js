export default class UserInfo {
  constructor({ nameSelector, captionSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._caption = document.querySelector(captionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      caption: this._caption.textContent,
      avatar: this._avatar.src,
    };
  }

  setUserInfo({ name, caption, avatar }) {
    this._name.textContent = name;
    this._caption.textContent = caption;
    this._avatar.src = avatar;
  }

  setUserAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}
