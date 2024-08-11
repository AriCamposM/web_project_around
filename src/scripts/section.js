// La clase section se basa de un array de objetos y
//un renderer que se encarga de renderizar los elementos, el renderer lo hacemos en la
// instancia de section y containerSelector es el selector del contenedor
//donde se renderizan los elementos.
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }


  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}

