import Card from "./card.js";
import Section from "./section.js";
import PopupWithImage from "./popupWithImage.js";
import PopupWithForm from "./popupWithForm.js";
import { FormValidator } from "./FormValidator.js";
import { profileEditButton, profileAddButton, cardGallery } from "./utils.js";
import UserInfo from "./userInfo.js";
//Webpack importacion de CSS
import "../pages/index.css"

//Función para crear tarjetas con propiedades de objeto
const createCard = (item) => {
  const card = new Card(
    item.name,
    item.link,
    ".element__template",
    (link, name) => {
      popupWithImage.open(link, name);
    }
  );
  return card;
};

const popupCard = new PopupWithForm("#popup-cards", (inputs) => {
  console.log(inputs);
  const newItem = {
    name: inputs.name,
    link: inputs.link,
  };
  const newCard = createCard(newItem);

  cardGallery.prepend(newCard.getCardElement());
  popupCard.close();
});

popupCard.setEventListeners();

const popupProfile = new PopupWithForm("#popup-profile", (inputs) => {
  console.log(inputs);

  const userProfile = new UserInfo({
    name: document.querySelector(".profile__title"),
    about: document.querySelector(".profile__about"),
  });

  userProfile.setUserInfo({ name: inputs.name, about: inputs.about });
  popupProfile.close();
});
popupProfile.setEventListeners();

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];


const configPopup = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const configPost = {
  formSelector: ".post__form",
  inputSelector: ".post__input",
  submitButtonSelector: ".post__button",
  inactiveButtonClass: "post__button_disabled",
  inputErrorClass: "post__input_type_error",
  errorClass: "post__error_visible",
};

const initializeValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(formElement, config);
    formValidator.enableValidation();
  });
};

initializeValidation(configPopup);
initializeValidation(configPost);


const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = createCard(item);
      section.addItem(newCard.getCardElement());
    },
  },
  ".elements"
);

// llamo al metodo renderItems para que renderize los elementos
section.renderItems();

profileAddButton.addEventListener("click", () => {
  popupCard.open();
});

profileEditButton.addEventListener("click", () => {
  popupProfile.open();
});

const popupWithImage = new PopupWithImage(".viewer");
popupWithImage.setEventListeners();
