import '../pages/index.css';
import Api from "./Api";
import Card from "./Card";
import CardList from "./CardList";
import Popup from "./Popup";
import FormValidator from "./FormValidator";
import UserInfo from "./UserInfo";
const popupElement = document.querySelector(".popup");
const popupElementCon = document.querySelector(".popup__content");
const poButton = popupElement.querySelector(".popup__button");
const placesList = document.querySelector(".places-list");
const infoButton = document.querySelector(".user-info__button");
const popupButton = popupElement.querySelector(".popup__close");
const form = document.querySelector(".popup__form");
const edit = document.querySelector(".edit");
const editCon = document.querySelector(".edit__content");
const editButton = document.querySelector(".user-edit__button");
const closeEdit = edit.querySelector(".edit__close");
const editSave = edit.querySelector(".edit__button");
const editForm = document.querySelector(".edit__form");
const userName = document.querySelector(".user-info__name");
const userAbout = document.querySelector(".user-info__job");
const edit2 = document.querySelector(".edit2");
const edit2Con = edit2.querySelector(".edit2__content");
const edit2Close = edit2.querySelector(".edit2__close");
const inputName = editForm.querySelector(".edit__input_type_name");
const inputAbout = editForm.querySelector(".edit__input_type_link-about");
const editFormValidator = new FormValidator(edit, editSave, "edit");
const popupFormValidator = new FormValidator(popupElement, poButton, "popup");
const api = new Api();
const userInfo = new UserInfo(userName, userAbout, null, null, api);
const edit2Popup = new Popup({ container: edit2, content: edit2Con, closeButton: edit2Close },"edit2");
const cardList = new CardList({placesList: placesList, infoButton: infoButton}, edit2Popup, api);
const popup = new Popup(
  {
    container: popupElement,
    content: popupElementCon,
    closeButton: popupButton,
    form: form,
  },
  "popup",
  popupFormValidator,
  cardList
);
const editPopup = new Popup(
  {
    container: edit,
    content: editCon,
    closeButton: closeEdit,
    form: editForm,
    inputs: { inputName: inputName, inputInfo: inputAbout },
  },
  "edit",
  editFormValidator,
  null,
  userInfo
);

userInfo.setListeners(editButton, editPopup);
userInfo.setUserInfo(userName, userAbout);
cardList.setListeners(edit2Popup, popup);
cardList.render();