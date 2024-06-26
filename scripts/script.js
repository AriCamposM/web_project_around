let popupOpen = document.querySelector(".profile__button-edit");
let popupClose = document.querySelector(".popup__close-button");
let popup = document.querySelector(".popup");

let nameTitle = document.querySelector(".profile__title");
let aboutMe = document.querySelector(".profile__about");

let nameInput = document.querySelector(".popup__input-name");
let jobInput = document.querySelector(".popup__input-about");
let submitButton = document.querySelector(".popup__button");

function popupToggle() {
  popup.classList.toggle("popup_opened");
  nameInput.value = "";
  jobInput.value = "";
}

popupOpen.addEventListener("click", popupToggle);

popupClose.addEventListener("click", popupToggle);

function checkInput() {
  if (nameInput.value.trim() !== "" && jobInput.value.trim() !== "") {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

nameInput.addEventListener("input", checkInput);
jobInput.addEventListener("input", checkInput);

// Busquemos el formulario en el DOM
let formElement = document.querySelector(".popup__form"); // Utiliza el método querySelector()

// Lo siguiente es el manipulador (handler) de entrega de formularios, aunque
// no se enviará en ningún sitio todavía

// Observa que el nombre de la función comienza con un verbo
// y describe exactamente lo que hace la función
function handleProfileFormSubmit(evt) {
  // Esta línea impide que el navegador
  // entregue el formulario en su forma predeterminada.
  evt.preventDefault();
  // Una vez hecho esto, podemos definir nuestra propia forma de entregar el formulario.
  // Lo explicaremos todo con más detalle después.

  // Busquemos los campos del formulario en el DOM
  nameInput = document.querySelector(".popup__input-name"); // Utiliza el método querySelector()
  jobInput = document.querySelector(".popup__input-about"); // Utiliza el método querySelector()

  // Obtén los valores de cada campo desde la propiedad de valor correspondiente
  let newName = nameInput.value.trim();
  let newAboutMe = jobInput.value.trim();
  // Selecciona los elementos donde se introducirán los valores de los campos
  popup.classList.toggle("popup_opened");
  // Inserta nuevos valores utilizando el textContent
  nameTitle.textContent = newName;
  aboutMe.textContent = newAboutMe;
  // propiedad del método querySelector()
  nameInput.value = "";
  jobInput.value = "";
}

// Conecta el manipulador (handler) al formulario:
// se observará el evento de entrega
formElement.addEventListener("submit", handleProfileFormSubmit);
