export default class Section {
  _renderedItems;
  _container;
  _renderer;

  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);

  }

  renderItems() {
    this._renderedItems.map(item => {
      return this._renderer(item);
    });
  }

  addItem(elem) {
    this._container.prepend(elem)
  }

}
