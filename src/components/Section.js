export default class Section {
  _container;
  _renderer;

  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);

  }

  renderItems(items) {
    items.map(item => {
      return this._renderer(item);
    });
  }

  addItem(elem) {
    this._container.prepend(elem)
  }

}
