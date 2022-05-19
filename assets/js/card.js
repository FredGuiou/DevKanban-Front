const cardModule = {
    /**
   * Ouvre une modale pour ajouter une carte à une liste
   */
    showAddModal(event) {
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
   * Gestion du formulaire d'ajout d'une carte dans une liste
   * @param {*} event - événement d'envoi du formulaire
   */
    async handleAddForm(event) {
        event.preventDefault();

        // event.target est le formulaire concerné
        const data = new FormData(event.target);

        // je viens enregistrer la nouvelle liste en BDD via l'API
        const urlToCall = app.base_url + "/cards";
        const fetchOptions = {
            method: "POST",
            body: data // les données à envoyer à l'API
        };
        const response = await fetch(urlToCall, fetchOptions);

        if (response.ok) {

            // data va contenir les informations des inputs du formulaire
            cardModule.makeInDOM(data.get("name"), data.get("list_id"));
        }
        else {
            // j'informe l'utilisateur qu'il y a eu un problème dans l'enregistrement de la liste
        }
    },

    /**
   * Ajouter une nouvelle carte à notre liste
   * @param {string} cardName - nom de la carte 
   * @param {int} listId - id de la liste parent
   */
    makeInDOM(cardName, listId) {
        console.log("cardName", cardName);
        console.log("listId", listId);

        // 1. je récupère le template
        const template = document.querySelector("#cardTemplate");

        // 2. je clone (copie) le template
        const clone = document.importNode(template.content, true);

        // 3. je mets à jour le nom de la carte dans le clone
        clone.querySelector(".card-name").textContent = cardName;

        // 4. j'insère la carte au bon endroit
        console.log("le bon endroit :", document.querySelector("[data-list-id='" + listId + "'] .panel-block"));
        document.querySelector("[data-list-id='" + listId + "'] .panel-block").append(clone);
        // écriture équivalente
        //document.querySelector(`[data-list-id='${listId}'] .panel-block`).append(clone);

        app.hideModals();
    },
};