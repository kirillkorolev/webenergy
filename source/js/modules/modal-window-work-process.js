const openModalButton = document.querySelector(`.js-open-modal`);
const modal = document.querySelector(`.modal`);

const closeModalButton = modal.querySelector(`.js-close-modal`);
const blackout = document.querySelector(`.blackout`);

const nameInput = modal.querySelector(`#user-name`);
const phoneInput = modal.querySelector(`#user-phone`);
const emailInput = modal.querySelector(`#user-email`);
const textarea = modal.querySelector(`.modal__textarea`);

const resetErrorOnInput = (input, errorClass) => {
  if (input.classList.contains(errorClass)) {
    input.classList.remove(errorClass);
  }
};

const modalInputs = modal.querySelectorAll(`.modal__input`);

const resetForm = () => {
  modalInputs.forEach((input) => {
    input.value = ``;
    resetErrorOnInput(input, `modal__input--error`);
    input.setAttribute(`placeholder`, ``);
  });
  textarea.value = ``;
};

const ESC_KEYCODE = 27;
const bodyGlobal = document.querySelector(`body`);

const form = modal.querySelector(`.modal__form`);

const showBlackout = () => {
  if (blackout.classList.contains(`blackout--hidden`)) {
    blackout.classList.remove(`blackout--hidden`);
  }
};

const hideBlackout = () => {
  if (!blackout.classList.contains(`blackout--hidden`)) {
    blackout.classList.add(`blackout--hidden`);
  }
};

const blockBackground = () => {
  bodyGlobal.style.overflow = `hidden`;
  bodyGlobal.style.touchAction = `none`;
};

const unBlockBackground = () => {
  bodyGlobal.style.overflow = ``;
  bodyGlobal.style.touchAction = ``;
};


const openModal = () => {
  if (modal.classList.contains(`modal--hidden`)) {
    modal.classList.remove(`modal--hidden`);
    blockBackground();
    showBlackout();

    document.addEventListener(`keydown`, closeModalWithEsc);
    blackout.addEventListener(`click`, () => {
      closeModal();
    });
  }
};

const closeModal = () => {
  if (!modal.classList.contains(`modal--hidden`)) {
    modal.classList.add(`modal--hidden`);
    unBlockBackground();

    document.removeEventListener(`keydown`, closeModalWithEsc);
    blackout.addEventListener(`click`, closeModal);
    resetForm();
    hideBlackout();
  }
};

const closeModalWithEsc = (evt) => {
  if (evt.keyCode === ESC_KEYCODE) {
    closeModal();
  }
};

const validateEmail = (input, errorClass) => {
  const mail = input.value;
  const regEx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (regEx.test(mail) === false) {

    if (!input.classList.contains(errorClass)) {
      input.classList.add(`modal__input--shake`);
      setTimeout(() => resetErrorOnInput(input, `modal__input--shake`), 1500);
    }

    input.classList.add(errorClass);
    input.setAttribute(`placeholder`, `Поле обязательно для заполнения`);

    return false;
  } else {

    input.setAttribute(`placeholder`, `Поле обязательно для заполнения`);
    resetErrorOnInput(input, errorClass);

    return true;
  }
};

const validateText = (input, errorClass) => {
  const name = input.value;

  if (!name) {
    if (!input.classList.contains(errorClass)) {
      input.classList.add(`modal__input--shake`);
      setTimeout(() => resetErrorOnInput(input, `modal__input--shake`), 1500);
    }

    input.classList.add(errorClass);
    input.setAttribute(`placeholder`, `Поле обязательно для заполнения`);

    return false;
  } else {

    input.setAttribute(`placeholder`, `Поле обязательно для заполнения`);
    resetErrorOnInput(input, errorClass);

    return true;
  }
};

const validatePhone = (input, errorClass) => {
  const phone = input.value;
  const regEx = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

  if (regEx.test(phone) === false) {

    if (!input.classList.contains(errorClass)) {
      input.classList.add(`modal__input--shake`);
      setTimeout(() => resetErrorOnInput(input, `modal__input--shake`), 1500);
    }

    input.classList.add(errorClass);
    input.setAttribute(`placeholder`, `Поле обязательно для заполнения`);
    return false;
  } else {

    input.setAttribute(`placeholder`, `Поле обязательно для заполнения`);
    resetErrorOnInput(input, errorClass);

    return true;
  }
};

const modalWindowWorkProcess = () => {
  openModalButton.addEventListener(`click`, () => {
    openModal();
  });

  closeModalButton.addEventListener(`click`, () => {
    closeModal();
  });

  form.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    validateText(nameInput, `modal__input--error`);
    validateEmail(emailInput, `modal__input--error`);
    validatePhone(phoneInput, `modal__input--error`);
  });
};

export {modalWindowWorkProcess};
