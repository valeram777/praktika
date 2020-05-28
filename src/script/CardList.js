import Card from './Card'

export default class CardList {
  constructor(blocks, imagePopup, api) {
    this.placesList = blocks.placesList;
    this.cards = [];
    this.api = api;

    this.imagePopup = imagePopup;
    this.infoButton = blocks.infoButton;
  }

  render() {
    let tt2 = [];
    this.api
      .getCards()
      .then((res) => {
        for (let i = 0; i < res.length; i++) {
          tt2.push({ name: res[i].name, link: res[i].link, id: res[i]._id, like: res[i].likes.length, alllike: res[i].likes, own: res[i].owner.name});
        }
        return tt2;
      })
      .then((res) => {
        tt2.forEach((item, i) => {
          const cardElement = new Card(
            item.name,
            item.link,
            item.id,
            this.imagePopup,
            this.api,
          ).create();
          this.placesList.appendChild(cardElement);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addCard({name, link}) {
    this.api.newCard(name, link)
      .then(res => {this.render();})
      .catch(err => {console.log(err);})
  }

  setListeners(imagePopup, addCardPopup) {
    this.imagePopup = imagePopup;
    this.infoButton.addEventListener("click", addCardPopup.open);
  }

}
