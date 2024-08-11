import Card from "./card.js";
import Section from "./section.js";
import PopupWithImage from "./popupWithImage.js";
import PopupWithForm from "./popupWithForm.js";
import { FormValidator } from "./FormValidator.js";
import { profileEditButton, profileAddButton, cardGallery, avatarEditButton } from "./utils.js";
import UserInfo from "./userInfo.js";
import Api from "./Api.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
//Webpack importacion de CSS
import "../pages/index.css"

// Variable
let userId = null;


//Función para crear tarjetas con propiedades de objeto
const createCard = (item) => {
  const card = new Card(
    item.name,
    item.link,
    item.likes,
    item.owner._id,
    userId,
    item._id,
    ".element__template",
    (link, name) => {
      popupWithImage.open(link, name);
    },
    (cardId)=>{
      popupConfirm.open(cardId);// funcion para abrir el formulario de borrar
      console.log("Si funciona el icono de trash en createcard")
    },
    api,
  );
  return card;
};

// const popupCard = new PopupWithForm("#popup-cards", (inputs) => {
//   console.log(inputs);
//   const newItem = {
//     name: inputs.name,
//     link: inputs.link,
//   };
//   const newCard = createCard(newItem);

//   cardGallery.prepend(newCard.getCardElement());
//   popupCard.close();
// });

// popupCard.setEventListeners();

// const popupProfile = new PopupWithForm("#popup-profile", (inputs) => {
//   console.log(inputs);

//   const userProfile = new UserInfo({
//     name: document.querySelector(".profile__title"),
//     about: document.querySelector(".profile__about"),
//   });

//   userProfile.setUserInfo({ name: inputs.name, about: inputs.about });
//   popupProfile.close();
// });
// popupProfile.setEventListeners();

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


// const section = new Section(
//   {
//     items: initialCards,
//     renderer: (item) => {
//       const newCard = createCard(item);
//       section.addItem(newCard.getCardElement());
//     },
//   },
//   ".elements"
// );

// // llamo al metodo renderItems para que renderize los elementos
// section.renderItems();

profileAddButton.addEventListener("click", () => {
  popupCard.open();
});

profileEditButton.addEventListener("click", () => {
  popupProfile.open();
});

avatarEditButton.addEventListener("click", () =>{
  popupAvatar.open()
})

const popupWithImage = new PopupWithImage(".viewer");
popupWithImage.setEventListeners();
/////////////////////////////////////////////////////////

// Instancia de Api
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_es_10",
  headers: {
    authorization: "92699bb5-75ce-4d70-95e1-51dbc7b5449b",
    "Content-Type": "application/json",
  },
});

// 1 -Cargar datos de usuario
api.getUserInfo()
  .then((userData) => {
    console.log(userData);
    userId = userData._id;
    const userProfile = new UserInfo({
      name: document.querySelector(".profile__title"),
      about: document.querySelector(".profile__about"),
      avatar: document.querySelector(".profile__image")
    });

    userProfile.setUserInfo({ name: userData.name, about: userData.about, avatar: userData.avatar });
  })
  .catch((error) => console.error(`Error al cargar el perfil: ${error}`));

// 2- Cargar tarjetas
api.getInitialCards()
  .then((cardsList) => {
    console.log(cardsList);

    const section = new Section({
      items: cardsList,
      renderer: (item) => {
        const newCard = createCard(item);
        section.addItem(newCard.getCardElement());
      },
    }, ".elements");
    section.renderItems();
  })
  .catch((error) => console.error(`Error al cargar las tarjetas: ${error}`));

// 3- Editar perfil
const popupProfile = new PopupWithForm("#popup-profile", (inputs) => {
  console.log(inputs);

  const submitButton = document.querySelector("#popup__button-profile")
  submitButton.textContent = "Guardando...";


  api.updateUserInfo({ name: inputs.name, about: inputs.about })
    .then(() => api.getUserInfo())
    .then((userData) => {
      console.log(userData);
      userId = userData._id;
      const userProfile = new UserInfo({
        name: document.querySelector(".profile__title"),
        about: document.querySelector(".profile__about"),
        avatar: document.querySelector(".profile__image")
      });
      popupProfile.close();
      userProfile.setUserInfo({ name: userData.name, about: userData.about });
    })
    .catch((error) => console.error(`Error al actualizar el perfil: ${error}`))
    .finally(() => {
      popupProfile.close()
      submitButton.textContent = "Guardar";
      submitButton.disabled = false;
    })
});

popupProfile.setEventListeners();

// 4- Añadir una nueva tarjeta
const popupCard = new PopupWithForm("#popup-cards", (inputs) => {
  console.log(inputs);

  const submitButton = document.querySelector("#popup__button-cards")
  submitButton.textContent = "Creando...";

  api.addNewCard({ name: inputs.name, link: inputs.link })
    .then((newCardData) => {
      const newCard = createCard(newCardData);
      cardGallery.prepend(newCard.getCardElement()); // Añade la nueva tarjeta al principio de la galería
    })
    .catch((error) => console.error(`Error al añadir la tarjeta: ${error}`))
    .finally(() => {
      submitButton.textContent = "Crear";
      submitButton.disabled = false;
      popupCard.close();
    });
});

popupCard.setEventListeners();

// 6 y 7 Ventanilla eliminar
const popupConfirm = new PopupWithConfirmation("#popup-confirmation", (cardId) => {
  const submitButton = document.querySelector("#confirm__button-delete");
  submitButton.textContent = "Eliminando Tarjeta...";

  api.deleteCard(cardId)
    .then(() => {
      const cardElement = document.querySelector(`[data-id="${cardId}"]`);
      if (cardElement) {
        cardElement.remove();
      } else {
        console.error(`No se encontró el elemento con data-id="${cardId}"`);
      }
    })
    .catch((error) => console.error(`Error al eliminar la tarjeta: ${error}`))
    .finally(() => {
      submitButton.textContent = "Sí";
      submitButton.disabled = false;
      popupConfirm.close();
    });
});
popupConfirm.setEventListeners();

// 9- Actualizar perfil
const popupAvatar = new PopupWithForm("#popup-avatar",(inputs) =>{
  console.log(inputs)
  console.log("funciona el submit")

  const submitButton = document.querySelector("#popup__button-avatar")
  submitButton.textContent = "Guardando...";



  api.updateAvatar(inputs.avatar)
  .then((data) =>{
    const userProfile = new UserInfo({
      name: document.querySelector(".profile__title"),
      about: document.querySelector(".profile__about"),
      avatar: document.querySelector(".profile__image")
    });
    userProfile.setUserAvatar(data.avatar)

  })
  .catch((err) =>{
    console.error(`Error updating avatar: ${err}`);
  })
  .finally(() => {
  submitButton.textContent = "Guardar";
  submitButton.disabled = false;
    popupAvatar.close()
  })
})
popupAvatar.setEventListeners()
