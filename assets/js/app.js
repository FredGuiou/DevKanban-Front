
// on objet qui contient des fonctions
const app = {

  addListenerToActions(){
    document.getElementById("addListButton").addEventListener("click", app.showAddListModal);
    
    const buttons = document.querySelectorAll(".modal");
    
    buttons.forEach(button => {
    button.addEventListener("click", app.hideModals);
    });
    

  },

  showAddListModal(){
    document.getElementById("addListModal").classList.add('is-active');
  },

  hideModals(){
    document.getElementById("addListModal").classList.remove('is-active');
  }

};

function init () {
  console.log("Welcome To O'kanban !");
  app.addListenerToActions();
};

init();

// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init );