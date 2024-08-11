export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar
  }

  getUserInfo() {
    return { name: this._name.textContent, about: this._about.textContent };
  }

  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._about.textContent = about;
    if (avatar) {
      this._avatar.src = avatar; // Actualiza la imagen del avatar si se proporciona
    }
  }

  setUserAvatar(avatarLink){
    this._avatar.src = avatarLink;
  }
}

