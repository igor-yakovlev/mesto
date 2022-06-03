export default class UserInfo {
  constructor({userName, userDescription}) {
    this._name = document.querySelector(userName);
    this._info = document.querySelector(userDescription);
    this._nameInput = document.querySelector('#name-input');
    this._descriptionInput = document.querySelector('#description-input');
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
