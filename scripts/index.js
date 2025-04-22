import { enableValidation, toggleButtonState } from "./validate.js";

// Seccion del Perfil
const profileSection = document.querySelector(".profile");
const profileEditInfoBtn = profileSection.querySelector(".profile__info-btn");
const profileName = profileSection.querySelector(".profile__name");
const profileOccupation = profileSection.querySelector(".profile__about");
const profileAddImgBtn = profileSection.querySelector(".profile__add-btn");

// Seccion de la Galeria
const gallerySection = document.querySelector(".gallery");

// Seccion de el Formulario de Edicion del Perfil
const popupSection = document.querySelector(".popup");
const popupInputName = popupSection.querySelector(".popup__form-name");
const popupInputOccup = popupSection.querySelector(".popup__form-occupation");
const popupSaveBtn = popupSection.querySelector(".popup__form");
const popupCloseBtn = popupSection.querySelector(".popup__btn-close");

// Seccion de el formulario para agregar imagenes a la Galería (Popup-add form)
const popupAddSection = document.querySelector(".popup-add");
const popupAddImgTitle = popupAddSection.querySelector(".popup-add__form-name");
const popupAddLink = popupAddSection.querySelector(".popup-add__form-link");
const popupAddSaveBtn = popupAddSection.querySelector(".popup-add__form");
const popupAddCloseBtn = popupAddSection.querySelector(
  ".popup-add__form_close-btn"
);

// Section de Visualizacion de Imagenes Completas
const popupImageSection = document.querySelector(".popup__img");
const popupContainer = popupImageSection.querySelector(
  ".popup__image-container"
);
const popupImgCloseBtn = popupImageSection.querySelector(
  ".popup__image_btn-close"
);
const popupImage = popupImageSection.querySelector(".popup__image");
const popupImgText = popupImageSection.querySelector(".popup__image-text");

// Overlay
const overlay = document.querySelector(".overlay");

// Arreglo para las imagenes predeterminadas de la Seccion de Galeria
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

// SECTION DE POPUP
// Funcion - Botones de abrir y cerrar el Popup para la edicion de la Seccion de Profile.
function handlePopupToggle() {
  popupSection.classList.toggle("popup__open");
  overlay.classList.toggle("overlay_open");

  if (popupSection.classList.contains("popup__open")) {
    popupInputName.value = profileName.textContent;
    popupInputOccup.value = profileOccupation.textContent;

    const fieldset = popupSection.querySelector(".form__set");
    const inputs = Array.from(fieldset.querySelectorAll(".form__input"));
    const button = popupSection.querySelector(".form__submit");

    toggleButtonState(inputs, button);
  }
}

// Funcion - Submit para el formulario para actualizar nombre y occupacion de la Seccion de Profile.
function handlePopupSubmit() {
  profileName.textContent = popupInputName.value;
  profileOccupation.textContent = popupInputOccup.value;
  popupSection.classList.remove("popup__open");
  overlay.classList.remove("overlay_open");
}

// SECCION DE GALLERY-ADD (Agregar imagenes a la galeria)
// Funcion - Crear una card para la galeria y la agrega al inicio de la seccion de Galería.
function addCards() {
  initialCards.forEach(function (item) {
    const card = createGalleryCard(item.name, item.link);
    gallerySection.append(card);
  });
}

// Funcion - Crear tarjeta de Galería y agregar controlador de eventos
function createGalleryCard(title, link) {
  const galleryTemplate = document.querySelector("#gallery-template").content;
  const card = galleryTemplate.querySelector(".gallery__card").cloneNode(true);
  const cardImage = card.querySelector(".gallery__card-image");
  const cardDeleteBTn = card.querySelector(".gallery__card_delete-btn");
  const cardTitle = card.querySelector(".gallery__card-title");
  const cardLikeBtn = card.querySelector(".gallery__card-icon");

  cardTitle.textContent = title;
  cardImage.alt = title;
  cardImage.src = link;

  cardImage.addEventListener("click", () => {
    openImagePopup(title, link);
  });

  cardDeleteBTn.addEventListener("click", () => {
    card.remove();
  });

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("gallery__card_icon-active");
  });

  return card;
}

// SECCION DE POPUP ADD
// Funcion - Botones abrir y cerrar el Formulario de agregar imagenes.
function handlePopupAddToggle(event) {
  event.preventDefault();
  popupAddSection.classList.toggle("popup-add_open");
  overlay.classList.toggle("overlay_open");

  // Si lo estás abriendo, reseteamos los campos y forzamos validación
  if (popupAddSection.classList.contains("popup-add_open")) {
    popupAddImgTitle.value = "";
    popupAddLink.value = "";

    // Limpia errores visuales anteriores
    const fieldset = popupAddSection.querySelector(".form__set");
    const inputs = Array.from(fieldset.querySelectorAll(".form__input"));
    const button = popupAddSection.querySelector(".form__submit");

    inputs.forEach((input) => {
      input.classList.remove("form__input_type_error");
      const errorSpan = fieldset.querySelector(`.${input.id}-error`);
      if (errorSpan) {
        errorSpan.textContent = "";
        errorSpan.classList.remove("form__input-error_active");
      }
    });

    // Forzamos el estado correcto del botón al abrir
    toggleButtonState(inputs, button);
  }
}

// Funcion - Submit para agregar tarjeta de Imagen nueva a la Galeria.
function handlePopupAddSubmit() {
  const card = createGalleryCard(popupAddImgTitle.value, popupAddLink.value);
  gallerySection.prepend(card);
  popupAddSection.classList.remove("popup-add_open");
  overlay.classList.remove("overlay_open");
}

// Funcion - Visualizar las imagenes en un POPUP y tamaño grande.
function openImagePopup(title, link) {
  popupImage.src = link;
  popupImage.alt = title;
  popupImgText.textContent = title;
  popupImageSection.classList.add("popup__img_open");
  overlay.classList.add("overlay_open");
}

popupImgCloseBtn.addEventListener("click", () => {
  popupImageSection.classList.remove("popup__img_open");
  overlay.classList.remove("overlay_open");
});

addCards();

// Cerrar cualquier popup al hacer clic en el overlay (fondo oscuro)

// Función que cierra todos los popups
function closeAllPopups() {
  popupSection.classList.remove("popup__open");
  popupAddSection.classList.remove("popup-add_open");
  popupImageSection.classList.remove("popup__img_open");
  overlay.classList.remove("overlay_open");
}

// Evento para cerrar los popups con el botón "Escape" o "Esc".
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllPopups();
  }
});

// Eventos para el POPUP para Editar la Section Profile
profileEditInfoBtn.addEventListener("click", handlePopupToggle);
popupCloseBtn.addEventListener("click", handlePopupToggle);
popupSaveBtn.addEventListener("submit", handlePopupSubmit);

// Eventos para el POPUP ADD para Agregar imagenes a la Section Gallery
profileAddImgBtn.addEventListener("click", handlePopupAddToggle);
popupAddCloseBtn.addEventListener("click", handlePopupAddToggle);
popupAddSaveBtn.addEventListener("submit", handlePopupAddSubmit);

// Evento para cerrar los Popups al hacer click en el fondo
overlay.addEventListener("click", closeAllPopups);

enableValidation();

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
