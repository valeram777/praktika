export default class FormValidator {
   constructor(form, submitButton, className) {
      if (form.classList.contains('edit') || form.classList.contains('popup')) { // Если передан popup
         this.form = form.querySelector('form');
      } else {
         this.form = form;
      }

      this.submitButton = submitButton;
      this.isValid = false;
      this.className = className;

      this.checkInputValidity = this.checkInputValidity.bind(this);

      this.setSubmitButtonState();
      this.setEventListeners();
   }

   checkInputValidity(event, isClosing) {
      let isInputsValid = [];

      for (let element of this.form.elements) {
         if (element.type === 'submit') continue; // Отключение валидации на кнопке

         const errorMessageElement = this.form.querySelector(`#error-${element.id}`);
         if (isClosing) { // Чистка ошибок при закрытии
            errorMessageElement.textContent = "";
            isInputsValid.push(false);
            continue;
         }

         if (element.validity.tooShort || element.validity.tooLong) {
            errorMessageElement.textContent = `Должно быть от ${element.minLength} до ${element.maxLength} символов`;
            isInputsValid.push(false);
         } else if (element.validity.valueMissing) {
            errorMessageElement.textContent = "Это обязательное поле";
            isInputsValid.push(false);
         }  else if (!element.validity.valid) {
            errorMessageElement.textContent = "Ошибка";
            isInputsValid.push(false);
         } else {
            errorMessageElement.textContent = "";
            isInputsValid.push(true);
         }
      }
      
      this.isValid = !isInputsValid.includes(false);

      this.setSubmitButtonState();
   }

   setSubmitButtonState() {
      if (this.isValid) {
         this.submitButton.classList.add(`${this.className}__button_active`);
         this.submitButton.disabled = false;
      }
      else {
         this.submitButton.classList.remove(`${this.className}__button_active`);
         this.submitButton.disabled = true;
      }
   }

   setEventListeners() {
      this.form.addEventListener("input", this.checkInputValidity);
      this.form.addEventListener("submit", this.checkInputValidity);
   }
}
