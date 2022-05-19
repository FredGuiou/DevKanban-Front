
// on objet qui contient des fonctions
const app = {

  // prochain listId à attribuer
  nextListPosition: 1,
  // adresse de notre API (faite en S06)
  base_url: "http://localhost:4001",

  // fonction d'initialisation, lancée au chargement de la page
  init() {
    console.log('app.init !');
    app.addListenerToActions();
    app.getListsFromAPI();
  },

  /**
   * Méthode pour initialiser les événements de ma page
   */
  addListenerToActions() {
    document.getElementById("addListButton").addEventListener("click", listModule.showAddModal);

    document.querySelectorAll(".close").forEach(closeButton => closeButton.addEventListener("click", app.hideModals));

    // #addListModal permet de cibler la div qui a l'id addListModal
    // le fai de rajouter form après, indique que nous souhaitons trouver un form dans les enfants de la div
    document.querySelector("#addListModal form").addEventListener("submit", listModule.handleAddForm);

    // je mets en place un événement sur les boutons + des listes
    // [data-list-id] précise que je souhaite que l'attribut data-list-id soit présent
    // je viens ensuite préciser la class is-pull-right pour cibler directement le +
    //document.querySelectorAll("[data-list-id] .is-pulled-right").forEach(button => button.addEventListener("click", app.showAddModal));

    document.querySelector("#addCardModal form").addEventListener("submit", cardModule.handleAddForm);
  },

  /**
   * Masque toutes les modales
   */
  hideModals() {
    document.querySelectorAll(".modal").forEach(modal => modal.classList.remove("is-active"));
  },

  async getListsFromAPI() {
    // 1. je vais récupérer mes listes depuis l'API
    // fetch a deux paramètres, le premier c'est l'URL appelée et le deuxième (optionnel) les paramètres de la requête
    // 1.1 je crèe une variable qui va contenir l'url appelée
    //const urlToCall = app.base_url+'/lists';
    const urlToCall = `${app.base_url}/lists`;

    // 1.2 je fais l'appel fetch
    const response = await fetch(urlToCall);

    // 1.3 je vérifie que tout s'est bien passé
    if (response.ok) {
      // 2. je vais ajouter les les listes à la page HTML
      const lists = await response.json();
      for (const list of lists) {
        listModule.makeInDOM(list.name, list.id);
        // je boucle sur les cartes pour les afficher
        for (const card of list.cards) {
          cardModule.makeInDOM(card.name, list.id);
        }
      }
    }
    else {
      // l'API ne répond pas ou répond mal, il faut informer l'utilisateur
    }


  }
};


// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init);