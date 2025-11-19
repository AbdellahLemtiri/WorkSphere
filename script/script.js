const btnajout = document.getElementById('btnajout');
const formulaire = document.getElementById('formulaire');
const annuler_btn = document.getElementById('annuler_btn');
const close_btn = document.getElementById('close_btn');
const ajout_exeprience = document.getElementById('ajout_exeprience');
const experiences = document.getElementById('experiences');
const sauvegarder = document.getElementById('sauvegarder');
const datestart = document.getElementById('datestart')
const datefin = document.getElementById('datefin')
const nom = document.getElementById('nom').value
const role = document.getElementById('role').value;
const phone = document.getElementById('phone').value;
const mail = document.getElementById('mail').value
const urlimg = document.getElementById('urlimg').value;
const inforole = document.getElementById('inforole')
const infotele = document.getElementById('infotele')
const infomail = document.getElementById('infomail');
const infonom = document.getElementById('infonom');
datestart.addEventListener('change', () => {
    const start = new Date(datestart.value);
    const end = new Date(datefin.value);
    const diff = end - start;
    console.log(diff);
    const jours = diff / (1000 * 60 * 60 * 24);
    console.log(jours);


});



// const ROLES = {
//     Manager:          { everywhere: true },
//     Receptionniste:   { zones: ['Réception'] },
//     Technicien IT:  { zones: ['Salle des serveurs'] },
//     Agent de securite: { zones: ['Salle de sécurité'] },
//     Nettoyage:        { everywhere: true, forbidden: ['Salle d\'archives'] },
//     Autre:            { everywhere: true, forbidden: ['Réception','Salle des serveurs','Salle de sécurité'] }
// };

const les_sale = [
  { id: "salle_manger", name: "Salle à manger", capacity: 4, employees: [] },
  { id: "salon", name: "Salon", capacity: 6, employees: [] },
  { id: "open_space", name: "Open Space", capacity: 10, employees: [] },
  { id: "bureaux", name: "Bureaux", capacity: 3, employees: [] },
  { id: "salle_reunion", name: "Salle de réunion", capacity: 8, employees: [] },
  { id: "stockage", name: "Stockage", capacity: 2, employees: [] },
];

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
    nom.value = "";
    datefin.value = ""
    datestart.value = ""
    mail.value="";
    phone.value="";
    role.value="Choisir";
})
annuler_btn.addEventListener('click', () => {
    formulaire.classList.add('d-none');
})
close_btn.addEventListener('click', () => {
    formulaire.classList.add('d-none');
})
sauvegarder.addEventListener('click', () => {
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
            nom: nom,
            role: role,
            telephone: tele,
            email: mail,
            phone: urlimg,
            experiences: []

        }

    }



})