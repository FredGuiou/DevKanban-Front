
// on objet qui contient des fonctions
const app = {

  init () {
    console.log("Welcome To O'kanban !");
    app.addListenerToActions();
  },

  addListenerToActions(){
    document.getElementById("addListButton").addEventListener("click", app.showAddListModal);
    
    const buttons = document.querySelectorAll(".close");

    buttons.forEach(button => {
    button.addEventListener("click", app.hideModals);
    });
    
    const isSuccess = document.querySelector('#addListModal form')
    isSuccess.addEventListener("submit", app.handleAddListForm);

  },

  showAddListModal(){
    document.getElementById("addListModal").classList.add('is-active');
  },

  hideModals(){
    document.getElementById("addListModal").classList.remove('is-active');
  },

  handleAddListForm(event){
    
    event.preventDefault();

    const formData = new FormData(event.target);

    console.log(formData);
    console.log(formData.get("name"));
  }

};

app.init();

// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init );