const profileSection = document.querySelector(".profile");
const profileEditInfoBtn = profileSection.querySelector(".profile__info-btn");
const profileName = profileSection.querySelector(".profile__name");
const profileOccupation = profileSection.querySelector(".profile__about");

const gallerySection = document.querySelector(".gallery");
const galleryLikeBtn = gallerySection.querySelector(".gallery__element-icon");

const popupSection = document.querySelector(".popup");
const popupInputName = popupSection.querySelector(".popup__form-name");
const popupInputOccupation = popupSection.querySelector(
  ".popup__form-occupation"
);
const popupSaveBtn = popupSection.querySelector(".popup__form");
const popupCloseBtn = popupSection.querySelector(".popup__btn-close");

function handlePopupToggle() {
  popupSection.classList.toggle("popup__open");

  if (popupSection.classList.contains("popup__open")) {
    popupInputName.value = profileName.textContent;
    popupInputOccupation.value = profileOccupation.textContent;
  }
}

function handlePopupSubmit(event) {
  event.preventDefault();
  profileName.textContent = popupInputName.value;
  profileOccupation.textContent = popupInputOccupation.value;
  popupSection.classList.remove("popup__open");
}

profileEditInfoBtn.addEventListener("click", handlePopupToggle);
popupCloseBtn.addEventListener("click", handlePopupToggle);
popupSaveBtn.addEventListener("submit", handlePopupSubmit);
