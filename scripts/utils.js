export const popupOpen = document.querySelector(".profile__button-edit");
export const popupClose = document.querySelector(".popup__close-button");
export const popup = document.querySelector(".popup");

export const nameTitle = document.querySelector(".profile__title");
export const aboutMe = document.querySelector(".profile__about");

export const nameInput = document.querySelector(".popup__input-name");
export const jobInput = document.querySelector(".popup__input-about");
export const submitButton = document.querySelector(".popup__button");

export const popupFormElement = document.querySelector(".popup__form");

export function popupToggle() {
  popup.classList.toggle("popup_opened");
  nameInput.value = "";
  jobInput.value = "";
}

export function popupEventListeners() {
  popupOpen.addEventListener("click", popupToggle);
  popupClose.addEventListener("click", popupToggle);
}

export const cardGallery = document.querySelector(".elements");

export const post = document.querySelector(".post");
export const postOpen = document.querySelector(".profile__button-add");
export const postClose = document.querySelector(".post__close-button");
export const titleInput = document.querySelector(".post__input-title");
export const linkInput = document.querySelector(".post__input-link");
export const postButton = document.querySelector(".post__button");
export const formPost = document.querySelector(".post__form");

export function postToggle() {
  post.classList.toggle("post_opened");
  titleInput.value = "";
  linkInput.value = "";
}

export function postEventListeners() {
  postOpen.addEventListener("click", postToggle);
  postClose.addEventListener("click", postToggle);
}

export const viewer = document.querySelector(".viewer");
export const viewerSource = document.querySelector(".viewer__image");
export const viewerText = document.querySelector(".viewer__text");
export const viewerClose = document.querySelector(".viewer__close");
export const imageViewer = document.querySelectorAll(".element__image");

viewerClose.addEventListener("click", () => {
  viewer.classList.remove("viewer_opened");
});

//Seccion click fuera del form y ESC para cerrar ventana
popup.addEventListener("click", function (event) {
  if (event.target === popup) {
    popupToggle();
  }
});

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    if (popup.classList.contains("popup_opened")) {
      popupToggle();
    }

    if (post.classList.contains("post_opened")) {
      postToggle();
    }

    if (viewer.classList.contains("viewer_opened")) {
      viewer.classList.remove("viewer_opened");
    }
  }
});

post.addEventListener("click", function (evt) {
  if (evt.target === post) {
    postToggle();
  }
});

viewer.addEventListener("click", function (evt) {
  if (evt.target === viewer) {
    viewer.classList.remove("viewer_opened");
  }
});
