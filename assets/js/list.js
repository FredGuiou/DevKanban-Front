const listModule = {
    /**
     * Ouvre une modale pour ajouter une liste
     */
    showAddModal(event) {
        // je reset l'input du nom
        document.querySelector("#addListModal input[name='name']").value = "";

        // j'affiche la modale
        document.getElementById("addListModal").classList.add("is-active");
    },
    /**
   * Gestion du formulaire d'ajout d'une liste
   * @param {*} event - événement d'envoi du formulaire
   */
    async handleAddForm(event) {
        event.preventDefault();

        // event.target est le formulaire concerné
        const data = new FormData(event.target);

        // je viens enregistrer la nouvelle liste en BDD via l'API
        const urlToCall = app.base_url + "/lists";
        const fetchOptions = {
            method: "POST",
            body: data // les données à envoyer à l'API
        };
        const response = await fetch(urlToCall, fetchOptions);

        if (response.ok) {
            const list = await response.json();
            // data va contenir les informations des inputs du formulaire
            listModule.makeInDOM(list.name, list.id);
        }
        else {
            // j'informe l'utilisateur qu'il y a eu un problème dans l'enregistrement de la liste
        }


    },
    /**
 * Ajouter une nouvelle liste à notre liste de listes
 * @param {*} listName - nom de la liste 
 * @param {*} listId - id de la liste 
 */
    makeInDOM(listName, listId) {
        // 1. je récupère le template
        const template = document.querySelector("#listTemplate");

        // 2. je clone (copie) le template
        const clone = document.importNode(template.content, true);

        // 3. je mets à jour le nom de la liste dans le clone
        clone.querySelector("h2").textContent = listName;

        // 4. je mets à jour l'id de la liste
        clone.querySelector("[data-list-id]").dataset.listId = listId;
        app.nextListPosition++;

        clone.querySelector("input[name=list-id]").value = listId;
        // 5. j'ajoute l'événement du click sur ma nouvelle liste
        clone.querySelector(".is-pulled-right").addEventListener("click", cardModule.showAddModal);

        clone.querySelector("h2").addEventListener("dblclick", listModule.showform);

        clone.querySelector("form").addEventListener("submit", listModule.editList)

        // 6. j'insère la liste au bon endroit
        document.querySelector(".card-lists").append(clone);

        app.hideModals();


    },

    showform(e) {
        const h2Element = e.target;
        // console.log(h2Element);
        h2Element.classList.toggle("is-hidden");
        /*On sélectionne l'élément HTML à coté de l'élément appelé par e.target avec nextElmentSibling*/
        const formElement = h2Element.nextElementSibling;
        formElement.classList.toggle("is-hidden");
        // console.log(formElement);
    },

    async editList(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const urlID = formData.get("list-id");
        const urlToCall = app.base_url + "/lists/" + `${urlID}`;
        // console.log(urlToCall);
        const fetchOptions = {
            method: "PATCH",
            body: formData // les données à envoyer à l'API
        };
        const response = await fetch(urlToCall, fetchOptions);

        if (response.ok) {
            const list = await response.json();
            
            // data va contenir les informations des inputs du formulaire

            //CA BLOQUE ENCORE ON A UNE ERREUR !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            const newList = listModule.makeInDOM(newList.name, newList.id);
            console.log(newList);
        }
        else {
            // j'informe l'utilisateur qu'il y a eu un problème dans l'enregistrement de la liste
        }
    } 

};
