export default class Popup {
  constructor(blocks, className, formValidator, cardList, userInfo) {
    this.container = blocks.container;
    this.content = blocks.content;
    this.closeButton = blocks.closeButton;
    this.form = blocks.form;
    this.className = className;
    this.formValidator = formValidator;
    this.cardList = cardList;
    this.userInfo = userInfo;
    if (blocks.inputs) {
      this.inputName = blocks.inputs.inputName;
      this.inputInfo = blocks.inputs.inputInfo;
    }

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);

    this.closeButton.addEventListener("click", () => {
      this.close();
      if (this.formValidator) this.formValidator.checkInputValidity(null, true);
    });

    if (this.form) {
      this.form.addEventListener("submit", this.submit);
    }
  }

  open(event, name, info) {
    this.container.classList.add(`${this.className}_is-opened`);
    this.content.style.backgroundImage = event.target.style.backgroundImage;
    if (name && info) {
      this.inputName.value = name;
      this.inputInfo.value = info;
    }
  }

  close() {
    this.container.classList.remove(`${this.className}_is-opened`);
    if (this.form) this.form.reset();
  }

  submit(event) {
    event.preventDefault();
    if (this.formValidator.isValid) {
      switch (this.className) {
        case "popup":
          this.submitCard();
          break;
        case "edit":
          this.submitEditForm();
      }
    }
    this.form.reset();
    this.close();
  }

  submitCard() {
    this.cardList.addCard({
      name: this.form.elements.name.value,
      link: this.form.elements.link.value,
    });
  }

  submitEditForm() {
    this.userInfo.updateUserInfo(this.form.elements.name.value, this.form.elements.about.value)
  }
}
