const btnajout = document.getElementById('btnajout');
const formulaire = document.getElementById('formulaire');
const annuler_btn = document.getElementById('annuler_btn');
const close_btn = document.getElementById('close_btn');
const ajout_exeprience = document.getElementById('ajout_exeprience');
const experiences = document.getElementById('experiences');
const sauvegarder = document.getElementById('sauvegarder');



// const ROLES = {
//     Manager:          { everywhere: true },
//     Receptionniste:   { zones: ['Réception'] },
//     Technicien IT:  { zones: ['Salle des serveurs'] },
//     Agent de securite: { zones: ['Salle de sécurité'] },
//     Nettoyage:        { everywhere: true, forbidden: ['Salle d\'archives'] },
//     Autre:            { everywhere: true, forbidden: ['Réception','Salle des serveurs','Salle de sécurité'] }
// };

// const ZONES = [
//     { id:'conf',   name:'Salle de conférence',   mandatory:false, max:10 },
//     { id:'rec',    name:'Reception',            mandatory:true,  max:2 },
//     { id:'serv',   name:'Salle des serveurs',   mandatory:true,  max:3 },
//     { id:'secu',   name:'Salle de sécurite',    mandatory:true,  max:2 },
//     { id:'pers',   name:'Salle du personnel',   mandatory:false, max:8 },
//     { id:'arch',   name:"Salle d'archives",    mandatory:true,  max:4 }
// ];

// let workers = [];          // all workers (assigned + unassigned)
// let assignments = {};      // zoneId → array of worker ids

ajout_exeprience.addEventListener('click', () => {
    const exp = document.createElement('div');
    exp.className = "row mb-2"
    exp.innerHTML = `
          
      <div class="col-6">
        <label class="form-label">Poste</label>
        <input type="text" class="form-control" name="expPoste">
      </div>

      <div class="col-6">
        <label class="form-label">Entreprise</label>
        <input type="text" class="form-control" name="expEntreprise">
      </div>

      <div class="col-6">
        <label class="form-label">Date start</label>
        <input type="date" class="form-control" name="dateStart">
      </div>

      <div class="col-6">
        <label class="form-label">Date fin</label>
        <input type="date" class="form-control" name="dateEnd">
      </div>

        `;

    experiences.appendChild(exp);
})
btnajout.addEventListener('click', () => {
    formulaire.classList.remove('d-none');
    inforole.textContent = "";
    infotele.textContent = "";
    infomail.textContent = "";
    infonom.textContent = "";
    experiences.innerHTML = "";
})
annuler_btn.addEventListener('click', () => {
    formulaire.classList.add('d-none');
})
close_btn.addEventListener('click', () => {
    formulaire.classList.add('d-none');
})
sauvegarder.addEventListener('click', () => {
    const nom = document.getElementById('nom').value
    const role = document.getElementById('role').value;
    const phone = document.getElementById('phone').value;
    const mail = document.getElementById('mail').value
    const urlimg = document.getElementById('urlimg').value;
    const inforole = document.getElementById('inforole')
    const infotele = document.getElementById('infotele')
    const infomail = document.getElementById('infomail');
    const infonom = document.getElementById('infonom');
    inforole.textContent = "";
    infotele.textContent = "";
    infomail.textContent = "";
    infonom.textContent = "";
    const regphone = /^(?:\+212|0)([5-7]\d{8})$/;
    // const regmail = /^[/
    const regnom = /^([a-z A-Z]){3-30}$/;
    console.log(role);
    console.log(regphone.test(phone))
    let erreur = false;
    if (!regphone.test(phone)) {
        erreur = true;
        infotele.textContent = "N° de téléphone invalide !";
    }
    if (role == "Choisir") {
        inforole.textContent = "Veuillez choisir le role";
        erreur = true;
    }
    if (!regnom.test(nom)) {
        infonom.textContent = "le nom est invalide ! ";
    }
    console.log("1" + erreur);

    if (!erreur) {
        console.log("64" + erreur);
        let persones = {
          
        }
    }



})