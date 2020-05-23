export default class Card {
   constructor(name, link, id, imagePopup, api) {
      this.name = name;
      this.link = link;
      this.id = id;
      this.imagePopup = imagePopup;
      this.api = api;

      this.removeElement = this.removeElement.bind(this)
   }

   like(event) {
      event.target.classList.toggle('place-card__like-icon_liked');
   }

   removeElement(event) {
      event.stopPropagation();
      const card = event.target.closest('.place-card');
      const card2 = (event.target.closest('.place-card__image')).getAttribute("id");
      this.api.deleteCard(card2).then(() => {card.parentNode.removeChild(card)}).catch((res) => {console.log(res)});
   }

   create() {
      const template = document.createElement("div");
      template.insertAdjacentHTML('beforeend', `
      <div class="place-card">
            <div class="place-card__image">
               <button class="place-card__delete-icon"></button>
            </div>
            <div class="place-card__description">
               <h3 class="place-card__name"></h3>
               <button class="place-card__like-icon"></button>
            </div>
      </div>`);
      const placeCard = template.firstElementChild;

      placeCard.querySelector(".place-card__name").textContent = this.name;
      placeCard.querySelector(".place-card__image").style.backgroundImage = `url(${this.link})`;
      placeCard.querySelector(".place-card__image").addEventListener("click", this.imagePopup.open);
      placeCard.querySelector(".place-card__image").setAttribute("id", this.id);
      placeCard.querySelector(".place-card__like-icon").addEventListener("click", this.like);
      placeCard.querySelector(".place-card__delete-icon").addEventListener("click", this.removeElement);

      return placeCard;
   }
}