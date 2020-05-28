export default class UserInfo {
   constructor(nameContainer, infoContainer, editButton, popup, api) {
      this.nameContainer = nameContainer;
      this.infoContainer = infoContainer;
      this.api = api;
   }

   setUserInfo(name, info) {
     this.api.getUser()
         .then((res) => {
            this.nameContainer.textContent = res.name;
            this.infoContainer.textContent = res.about;
         })
         .catch((err) => {console.log(err)});
   }

   setListeners(editButton, popup) {
   
      editButton.addEventListener("click", event => popup.open(event, this.nameContainer.textContent, this.infoContainer.textContent));
   }

   updateUserInfo(name, about) {
      this.api
         .setUser(name, about)
         .then(res => {
            this.name = name;
            this.about = about;
            this.nameContainer.textContent = this.name;
            this.infoContainer.textContent = this.about;
         })
         .catch(err => {
            console.log(`Ошибка: ${err.status}`);
         });
   }
}