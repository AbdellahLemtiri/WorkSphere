const btnajout = document.getElementById('btnajout');
const formulaire = document.getElementById('formulaire');
const annuler_btn = document.getElementById('annuler_btn');
const close_btn = document.getElementById('close_btn');
const ajout_exeprience = document.getElementById('ajout_exeprience');
const experiences = document.getElementById('experiences');
const sauvegarder = document.getElementById('sauvegarder');
const datestart = document.getElementById('datestart')
const datefin = document.getElementById('datefin')
const nom = document.getElementById('nom');
const role = document.getElementById('role');
const phone = document.getElementById('phone');
const mail = document.getElementById('mail');
const urlimg = document.getElementById('urlimg');
const inforole = document.getElementById('inforole')
const infotele = document.getElementById('infotele')
const infomail = document.getElementById('infomail');
const infonom = document.getElementById('infonom');
const infodate = document.getElementById('infodate');
let les_employees = JSON.parse(localStorage.getItem('worksphere_employees')) || [];
let id_emp;
if (les_employees.length <1 ){
id_emp=1;
}
else{
    id_emp= les_employees.length;
}
function sauvegarde_local() {
    localStorage.setItem('worksphere_employees', JSON.stringify(les_employees));
}

datestart.addEventListener('change', () => {
    const start = new Date(datestart.value);
    const end = new Date(datefin.value);
    const diff = end - start;
    console.log(diff);
    const jours = diff / (1000 * 60 * 60 * 24);
    console.log(jours);

});





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
    mail.value = "";
    phone.value = "";
    role.value = "Choisir";
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
    const regnom = /^[A-Za-z ]{3,30}$/;
    const regmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const les_sale = [

    { id: "salle_manger", nome: "Salle a manger", employees: [] , capacity: 4,},
    { id: "salon", nome: "Salon", capacity: 6, employees: [] },
    { id: "open_space", nome: "Open Space", employees: [], capacity: 10, },
    { id: "bureaux", nome: "Bureaux", employees: [],capacity: 3,  },
    { id: "salle_reunion", nome: "Salle de reunion", employees: [] , capacity: 8,},
    { id: "stockage", nome: "Stockage", employees: [],capacity: 2, },

];
    console.log(role);
    console.log(regphone.test(phone))
    let erreur = false;
    if (!regphone.test(phone)) {
        erreur = true;
        infotele.textContent = "N° de téléphone invalide !";
    }
    if (!regmail.test(mail.value)) {
        infomail.textContent = "Email est  invalide  !";
        erreur = true;
    }

    if (role.value === "Choisir") {
        inforole.textContent = "Veuillez choisir le role";
        erreur = true;
    }
    if (!regnom.test(nom)) {
        infonom.textContent = "le nom est invalide ! ";
    }
    console.log("1" + erreur);
    if (!datestart.value || !datefin.value) {
        erreur = true;
        infodate.textContent = "veuillez entre des dates valide !";


    }
    else {
        const start = new Date(datestart.value);
        const end = new Date(datefin.value);

        if (end <= start) {
            erreur = true;
            infodate.textContent = "veuillez entre des dates valide !";
        }
    }

    if (!erreur) {



        console.log("64" + erreur);
        const employe = {
            id: nextId++,
            nom: nom.value,
            role: role.value,
            email: mail.value,
            phone: phone.value,
            photo: urlimg.value,
            experiences: experiences,
            assignedTo: null
        };


document.querySelectorAll('.experience-item').forEach(div => {
    const poste = div.querySelector('.expPoste').value
    const entreprise = div.querySelector('.expEntreprise').value
    const debut = div.querySelector('.dateStart').value;
    const fin = div.querySelector('.dateEnd').value;
    if (poste || entreprise || debut || fin) {
        experiences.push({
            poste: poste,
            entreprise: entreprise,
            dateStart: debut,
            dateEnd: fin
        });
    }
});

console.log(experiences);


les_employees.push(employe);
console.log(les_employees);
    }



});