export default class UserInfo {
  _name;
  _info
  constructor({userName, userDescription}) {
    this._name = document.querySelector(userName);
    this._info = document.querySelector(userDescription);
  }

  getUserInfo() {
    const data = {};
    data.name = this._name.textContent;
    data.description = this._info.textContent;

    return data;
  }

  setUserInfo({name, description}) {
    this._name.textContent = name;
    this._info.textContent = description;
  }
}
