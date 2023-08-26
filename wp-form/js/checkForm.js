const firstName = document.getElementById("fName");
const lastName = document.getElementById("lName");
const email = document.getElementById("email");
const phone = document.getElementById("mobile");
const submitButton = document.getElementById("send-expketo-email");

function validateNameInput(input) {
  const namePattern = /^[A-Za-zА-Яа-я\s]+$/;
  return namePattern.test(input.value);
}

function validateEmailInput(input) {
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailPattern.test(input.value);
}

function validatePhoneInput(input) {
  const phonePattern = /^\d{7,9}$/;
  return phonePattern.test(input.value);
}

function updateSubmitButtonState() {
  const isFirstNameValid = validateNameInput(firstName);
  const isLastNameValid = validateNameInput(lastName);
  const isEmailValid = validateEmailInput(email);
  const isPhoneValid = validatePhoneInput(phone);

  if (
    firstName.value.trim() === "" ||
    lastName.value.trim() === "" ||
    email.value.trim() === "" ||
    phone.value.trim() === "" ||
    !isFirstNameValid ||
    !isLastNameValid ||
    !isEmailValid ||
    !isPhoneValid
  ) {
    submitButton.setAttribute("disabled", "disabled");
  } else {
    submitButton.removeAttribute("disabled");
  }
}

firstName.addEventListener("input", function () {
  if (validateNameInput(firstName)) {
    firstName.classList.remove("is-invalid");
    firstName.classList.add("is-valid");
  } else {
    firstName.classList.remove("is-valid");
    firstName.classList.add("is-invalid");
  }
  updateSubmitButtonState();
});

lastName.addEventListener("input", function () {
  if (validateNameInput(lastName)) {
    lastName.classList.remove("is-invalid");
    lastName.classList.add("is-valid");
  } else {
    lastName.classList.remove("is-valid");
    lastName.classList.add("is-invalid");
  }
  updateSubmitButtonState();
});

email.addEventListener("input", function () {
  if (validateEmailInput(email)) {
    email.classList.remove("is-invalid");
    email.classList.add("is-valid");
  } else {
    email.classList.remove("is-valid");
    email.classList.add("is-invalid");
  }
  updateSubmitButtonState();
});

phone.addEventListener("input", function () {
  if (validatePhoneInput(phone)) {
    phone.classList.remove("is-invalid");
    phone.classList.add("is-valid");
  } else {
    phone.classList.remove("is-valid");
    phone.classList.add("is-invalid");
  }
  updateSubmitButtonState();
});

submitButton.addEventListener("click", function (event) {
  if (this.hasAttribute("disabled")) {
    event.preventDefault();
  }
});

updateSubmitButtonState();
