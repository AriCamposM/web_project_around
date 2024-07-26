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

  //el metodo renderItems se encarga de renderizar los elementos con el renderer que declaremos
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
  //este metodo se encarga de meter las tarjetas al contenedor
  addItem(element) {
    this._container.prepend(element);
  }
}
// creo la instacia de la clase Section, lo lleno con el array de datos,declaro con el metodo flecha
// y agrego la funcion flecha y el selector
