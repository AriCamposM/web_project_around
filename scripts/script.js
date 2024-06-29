let popupOpen = document.querySelector(".profile__button-edit");
let popupClose = document.querySelector(".popup__close-button");
let popup = document.querySelector(".popup");

let nameTitle = document.querySelector(".profile__title");
let aboutMe = document.querySelector(".profile__about");

let nameInput = document.querySelector(".popup__input-name");
let jobInput = document.querySelector(".popup__input-about");
let submitButton = document.querySelector(".popup__button");

let formElement = document.querySelector(".popup__form");

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

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  nameInput = document.querySelector(".popup__input-name");
  jobInput = document.querySelector(".popup__input-about");

  let newName = nameInput.value.trim();
  let newAboutMe = jobInput.value.trim();

  popup.classList.toggle("popup_opened");

  nameTitle.textContent = newName;
  aboutMe.textContent = newAboutMe;

  nameInput.value = "";
  jobInput.value = "";

  submitButton.disabled = true;
}

formElement.addEventListener("submit", handleProfileFormSubmit);

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

const cardGallery = document.querySelector(".elements");

initialCards.forEach((card) => {
  const cardTemplate = document.querySelector(".element__template").content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector(".element__image").src = card.link;
  cardElement.querySelector(".element__image").alt = card.name;
  cardElement.querySelector(".element__text").textContent = card.name;

  cardGallery.append(cardElement);
});

const post = document.querySelector(".post");
const postOpen = document.querySelector(".profile__button-add");
const postClose = document.querySelector(".post__close-button");
const titleInput = document.querySelector(".post__input-title");
const linkInput = document.querySelector(".post__input-link");
const postButton = document.querySelector(".post__button");
const formPost = document.querySelector(".post__form");

function postToggle() {
  post.classList.toggle("post_opened");
  titleInput.value = "";
  linkInput.value = "";
}

postOpen.addEventListener("click", postToggle);
postClose.addEventListener("click", postToggle);

function checkInputPost() {
  if (titleInput.value.trim() !== "" && linkInput.value.trim() !== "") {
    postButton.disabled = false;
  } else {
    postButton.disabled = true;
  }
}

titleInput.addEventListener("input", checkInputPost);
linkInput.addEventListener("input", checkInputPost);

function handleGalleryPostSubmit(evt) {
  evt.preventDefault();
  const cardTemplate = document.querySelector(".element__template").content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector(".element__image").src = linkInput.value.trim();
  cardElement.querySelector(".element__image").alt = titleInput.value.trim();
  cardElement.querySelector(".element__text").textContent =
    titleInput.value.trim();

  cardGallery.append(cardElement);

  linkInput.value = "";
  titleInput.value = "";

  postButton.disabled = true;
  post.classList.toggle("post_opened");

  const deletuButtonCard = document.querySelectorAll(".element__trash");

  deletuButtonCard.forEach((trash) => {
    trash.addEventListener("click", () => {
      trash.closest(".element").remove();
    });
  });

  const viewer = document.querySelector(".viewer");
  const viewerSource = document.querySelector(".viewer__image");
  const viewerText = document.querySelector(".viewer__text");
  const viewerClose = document.querySelector(".viewer__close");
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

const likeButton = document.querySelectorAll(".element__button");

likeButton.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
  });
});

const deletuButtonCard = document.querySelectorAll(".element__trash");

deletuButtonCard.forEach((trash) => {
  trash.addEventListener("click", () => {
    trash.closest(".element").remove();
  });
});

const viewer = document.querySelector(".viewer");
const viewerSource = document.querySelector(".viewer__image");
const viewerText = document.querySelector(".viewer__text");
const viewerClose = document.querySelector(".viewer__close");
const imageViewer = document.querySelectorAll(".element__image");

imageViewer.forEach((image) => {
  image.addEventListener("click", () => {
    viewer.classList.add("viewer_opened");
    viewerSource.src = image.src;
    viewerText.textContent = image.alt;
  });
});

viewerClose.addEventListener("click", () => {
  viewer.classList.remove("viewer_opened");
});
