import Card from "./card.js";
import { FormValidator } from "./FormValidator.js";
import {
  popupOpen,
  popupClose,
  popup,
  nameTitle,
  aboutMe,
  nameInput,
  jobInput,
  submitButton,
  popupFormElement,
  popupToggle,
  popupEventListeners,
  cardGallery,
  post,
  postOpen,
  postClose,
  titleInput,
  linkInput,
  postButton,
  formPost,
  postToggle,
  postEventListeners,
  viewer,
  viewerSource,
  viewerText,
  viewerClose,
  imageViewer,
} from "./utils.js";
popupEventListeners();

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value.trim();
  const newAboutMe = jobInput.value.trim();

  popup.classList.toggle("popup_opened");

  nameTitle.textContent = newName;
  aboutMe.textContent = newAboutMe;

  nameInput.value = "";
  jobInput.value = "";

  submitButton.disabled = true;
}

popupFormElement.addEventListener("submit", handleProfileFormSubmit);

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

postEventListeners();

function handleGalleryPostSubmit(evt) {
  evt.preventDefault();

  const templateSelector = ".element__template";

  const newCard = new Card(
    titleInput.value.trim(),
    linkInput.value.trim(),
    templateSelector
  );
  cardGallery.prepend(newCard.getCardElement());

  titleInput.value = "";
  linkInput.value = "";

  postButton.disabled = true;
  post.classList.toggle("post_opened");

  const viewer = document.querySelector(".viewer");
  const viewerSource = document.querySelector(".viewer__image");
  const viewerText = document.querySelector(".viewer__text");
  const imageViewer = document.querySelectorAll(".element__image");

  imageViewer.forEach((image) => {
    image.addEventListener("click", () => {
      viewer.classList.add("viewer_opened");
      viewerSource.src = image.src;
      viewerText.textContent = image.alt;
    });
  });
}

formPost.addEventListener("submit", handleGalleryPostSubmit);

initialCards.forEach((card) => {
  const newCard = new Card(card.name, card.link, ".element__template");
  cardGallery.append(newCard.getCardElement());
});

imageViewer.forEach((image) => {
  image.addEventListener("click", () => {
    viewer.classList.add("viewer_opened");
    viewerSource.src = image.src;
    viewerText.textContent = image.alt;
  });
});

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
