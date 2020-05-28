export default class Api {
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  getUser() {
    return fetch("https://praktikum.tk/cohort10/users/me", {
      method: "GET",
      headers: {
        authorization: "51657109-8f1a-4ffd-9429-31b160baaac0",
      },
    }).then((res) => {     
      return this._getResponseData(res);
    });
  }

  setUser(name, about) {
    return fetch("https://praktikum.tk/cohort10/users/me", {
      method: "PATCH",
      headers: {
        authorization: "51657109-8f1a-4ffd-9429-31b160baaac0",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getCards() {
    return fetch("https://praktikum.tk/cohort10/cards", {
      method: "GET",
      headers: {
        authorization: "51657109-8f1a-4ffd-9429-31b160baaac0",
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  newCard(name, link) {
    return fetch("https://praktikum.tk/cohort10/cards/", {
      method: "POST",
      headers: {
        authorization: "51657109-8f1a-4ffd-9429-31b160baaac0",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  deleteCard(idCard) {
    return fetch(`https://praktikum.tk/cohort10/cards/${idCard}`, {
      method: "DELETE",
      headers: {
        authorization: "51657109-8f1a-4ffd-9429-31b160baaac0",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  putLike(idCard) {
   // console.log("Есть контакт. Отправили");
    return fetch(`https://praktikum.tk/cohort10/cards/like/${idCard}`, {
      method: "PUT",
      headers: {
        authorization: "51657109-8f1a-4ffd-9429-31b160baaac0",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  deleteLike(idCard){
   // console.log("Есть контакт");
    return fetch(`https://praktikum.tk/cohort10/cards/like/${idCard}`, {
      method: "DELETE",
      headers: {
        authorization: "51657109-8f1a-4ffd-9429-31b160baaac0",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  avatar(avatar) {
    return fetch(`https://praktikum.tk/cohort10/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: "51657109-8f1a-4ffd-9429-31b160baaac0",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}
