
// on objet qui contient des fonctions
const app = {

  addListenerToActions(){
    document.getElementById("addListButton").addEventListener("click", app.showAddListModal);
  },

  showAddListModal(){
    document.getElementById("addListModal").classList.add('is-active');
  }

};

function init () {
  console.log('app.init !');
  app.addListenerToActions();
}

init();

// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init );