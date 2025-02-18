export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item, "append", this._container);
    });
  }

  addItem(item, method = "prepend") {
    this._renderer(item, method, this._container);
  }
}
