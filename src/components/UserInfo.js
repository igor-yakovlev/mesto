export default class UserInfo {
  _name;
  _info;
  _avatar
  constructor({userName, userDescription, userAvatar}) {
    this._name = document.querySelector(userName);
    this._info = document.querySelector(userDescription);
    this._avatar = document.querySelector(userAvatar);
  }

  getUserInfo() {
    const data = {};
    data.name = this._name.textContent;
    data.description = this._info.textContent;

    return data;
  }

  setUserInfo({name, about, avatar}) {
    this._name.textContent = name;
    this._info.textContent = about;
    this._avatar.src = avatar;
  }

  changeAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
