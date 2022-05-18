
// on objet qui contient des fonctions
const app = {

  // prochain listId à attribuer
  nextListId:3,

  // fonction d'initialisation, lancée au chargement de la page
  init() {
    console.log('app.init !');
    app.addListenerToActions();
  },

  /**
   * Méthode pour initialiser les événements de ma page
   */
  addListenerToActions() {
    document.getElementById("addListButton").addEventListener("click", app.showAddListModal);

    document.querySelectorAll(".close").forEach(closeButton => closeButton.addEventListener("click", app.hideModals));

    // #addListModal permet de cibler la div qui a l'id addListModal
    // le fai de rajouter form après, indique que nous souhaitons trouver un form dans les enfants de la div
    document.querySelector("#addListModal form").addEventListener("submit", app.handleAddListForm);

    // je mets en place un événement sur les boutons + des listes
    // [data-list-id] précise que je souhaite que l'attribut data-list-id soit présent
    // je viens ensuite préciser la class is-pull-right pour cibler directement le +
    document.querySelectorAll("[data-list-id] .is-pulled-right").forEach(button => button.addEventListener("click", app.showAddCardModal));

    document.querySelector("#addCardModal form").addEventListener("submit", app.handleAddCardForm);
  },

  /**
   * Ouvre une modale pour ajouter une liste
   */
  showAddListModal(event) {
    // je reset l'input du nom
    document.querySelector("#addListModal input[name='name']").value = "";

    // j'affiche la modale
    document.getElementById("addListModal").classList.add("is-active");
  },

  /**
 * Ouvre une modale pour ajouter une carte à une liste
 */
  showAddCardModal(event) {
    // je récupère le list_id
    const listId = event.target.closest("[data-list-id]").dataset.listId;

    // je reset l'input du nom
    document.querySelector("#addCardModal input[name='name']").value = "";

    // je mets à jour mon champs input
    document.querySelector("#addCardModal input[type='hidden']").value = listId;

    // j'affiche la modale
    document.getElementById("addCardModal").classList.add("is-active");
  },

  /**
   * Masque toutes les modales
   */
  hideModals() {
    document.querySelectorAll(".modal").forEach(modal => modal.classList.remove("is-active"));
  },

  /**
   * Gestion du formulaire d'ajout d'une liste
   * @param {*} event - événement d'envoi du formulaire
   */
  handleAddListForm(event) {
    event.preventDefault();

    // event.target est le formulaire concerné
    const data = new FormData(event.target);
    // data va contenir les informations des inputs du formulaire
    app.makeListInDOM(data.get("name"));
  },

  /**
   * Ajouter une nouvelle liste à notre liste de listes
   * @param {*} listName - nom de la liste 
   */
  makeListInDOM(listName) {
    // 1. je récupère le template
    const template = document.querySelector("#listTemplate");

    // 2. je clone (copie) le template
    const clone = document.importNode(template.content, true);

    // 3. je mets à jour le nom de la liste dans le clone
    clone.querySelector("h2").textContent = listName;

    // 4. je mets à jour l'id de la liste
    clone.querySelector("[data-list-id]").dataset.listId = app.nextListId;
    app.nextListId++;

    // 5. j'ajoute l'événement du click sur ma nouvelle liste
    clone.querySelector(".is-pulled-right").addEventListener("click", app.showAddCardModal);

    // 6. j'insère la liste au bon endroit
    document.querySelector(".card-lists").append(clone);

    app.hideModals();
  },

  /**
 * Gestion du formulaire d'ajout d'une carte dans une liste
 * @param {*} event - événement d'envoi du formulaire
 */
  handleAddCardForm(event) {
    event.preventDefault();

    // event.target est le formulaire concerné
    const data = new FormData(event.target);
    // data va contenir les informations des inputs du formulaire
    app.makeCardInDOM(data.get("name"),data.get("list_id"));
  },

  /**
 * Ajouter une nouvelle carte à notre liste
 * @param {string} cardName - nom de la carte 
 * @param {int} listId - id de la liste parent
 */
  makeCardInDOM(cardName,listId) {
    console.log("cardName",cardName);
    console.log("listId",listId);

    // 1. je récupère le template
    const template = document.querySelector("#cardTemplate");

    // 2. je clone (copie) le template
    const clone = document.importNode(template.content, true);

    // 3. je mets à jour le nom de la carte dans le clone
    clone.querySelector(".card-name").textContent = cardName;

    // 4. j'insère la carte au bon endroit
    console.log("le bon endroit :",document.querySelector("[data-list-id='"+listId+"'] .panel-block"));
    document.querySelector("[data-list-id='"+listId+"'] .panel-block").append(clone);
    // écriture équivalente
    //document.querySelector(`[data-list-id='${listId}'] .panel-block`).append(clone);

    app.hideModals();
  },

};


// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init);