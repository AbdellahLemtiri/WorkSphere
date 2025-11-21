const btnajout = document.getElementById("btnajout");
const formulaire = document.getElementById("formulaire");
const annuler_btn = document.getElementById("annuler_btn");
const close_btn = document.getElementById("close_btn");
const ajout_exeprience = document.getElementById("ajout_exeprience");
const experiences = document.getElementById("experiences");
const sauvegarder = document.getElementById("sauvegarder");
const datestart = document.getElementById("datestart");
const datefin = document.getElementById("datefin");
const nom = document.getElementById("nom");
const role = document.getElementById("role");
const phone = document.getElementById("phone");
const mail = document.getElementById("mail");
const urlimg = document.getElementById("urlimg");
const inforole = document.getElementById("inforole");
const infotele = document.getElementById("infotele");
const infomail = document.getElementById("infomail");
const infonom = document.getElementById("infonom");
// const infodate = document.getElementById('infodate');
const cont_admis=document.getElementById('cont_admis');
const close_admis= document.getElementById('close_admis')
const admis = document.getElementById('admis');
const profile = document.getElementById("profile_zone");
const zoneConference = document.querySelector(".conference");
const zoneReception = document.querySelector(".reception");
const zoneServeurs = document.querySelector(".serveurs");
const zoneSecurite = document.querySelector(".securite");
const zonePersonnel = document.querySelector(".personnel");
const zoneArchives = document.querySelector(".darchives");
const btn_darchives = document.getElementById("btn_darchives");
const btn_personnel = document.getElementById("btn_personnel");
const btn_securite = document.getElementById("btn_securite");
const btn_Reception = document.getElementById("btn_Reception");
const btn_conference = document.getElementById("btn_conference");
const btn_serveurs = document.getElementById("btn_serveurs");

const list_employee_non_assignes = document.getElementById(
  "list_employee_non_assignes"
);

let les_employees =
  JSON.parse(localStorage.getItem("worksphere_employees")) || [];
function sauvegarde_local() {
  localStorage.setItem("worksphere_employees", JSON.stringify(les_employees));
}
const zonesmax = {
  reception: { max: 2 },
  serveurs: { max: 4 },
  securite: { max: 2 },
  archives: { max: 2 },
  conference: { max: 12 },
  personnel: { max: 5 },
};

afficher_non_assigne();
let max_id = 0;
for (let emp of les_employees) {
  if (emp.id > max_id) {
    max_id = emp.id;
  }
}

function rest_formulaire() {
  inforole.textContent = "";
  infotele.textContent = "";
  infomail.textContent = "";
  infonom.textContent = "";
  experiences.innerHTML = "";
  nom.value = "";
  datefin.value = "";
  datestart.value = "";
  mail.value = "";
  phone.value = "";
  role.value = "Choisir";
}
let id_emp = max_id + 1;
datestart.addEventListener("change", () => {
  const start = new Date(datestart.value);
  const end = new Date(datefin.value);
  const diff = end - start;
  console.log(diff);
  const jours = diff / (1000 * 60 * 60 * 24);
  console.log(jours);
});

ajout_exeprience.addEventListener("click", () => {
  const exp = document.createElement("div");
  exp.className = "row mb-2 experience-item";
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
});

document.getElementById("close_profile_modal").addEventListener("click", () => {
  document.getElementById("profile_zone_sss").classList.add("d-none");
});

document.getElementById("profile_zone_sss").addEventListener("click", (e) => {
  if (e.target === document.getElementById("profile_zone_sss")) {
    document.getElementById("profile_zone_sss").classList.add("d-none");
  }
});
btnajout.addEventListener("click", () => {
  formulaire.classList.remove("d-none");
  rest_formulaire();
});

annuler_btn.addEventListener("click", () => {
  formulaire.classList.add("d-none");
});
close_btn.addEventListener("click", () => {
  formulaire.classList.add("d-none");
});
sauvegarder.addEventListener("click", () => {
  inforole.textContent = "";
  infotele.textContent = "";
  infomail.textContent = "";
  infonom.textContent = "";
  const regphone = /^(05|06|07|212)[0-9]{8}$/;
  const regnom = /^[A-Za-z ]{3,30}$/;
  const regmail = /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/;

  let erreur = false;
  if (!regphone.test(phone.value)) {
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
  if (!regnom.test(nom.value)) {
    infonom.textContent = "le nom est invalide ! ";
    erreur = true;
  }

  console.log("1" + erreur);
  // if (!datestart.value || !datefin.value) {
  //     erreur = true;
  //     infodate.textContent = "veuillez entre des dates valide !";

  // }
  // else {
  //     const start = new Date(datestart.value);
  //     const end = new Date(datefin.value);

  //     if (end <= start) {
  //         erreur = true;
  //         infodate.textContent = "veuillez entre des dates valide !";
  //     }
  // }

  if (!erreur) {
    const employe = {
      id: id_emp++,
      nom: nom.value,
      role: role.value,
      email: mail.value,
      phone: phone.value,
      photo: urlimg.value || "plan-69159a65c5684763515973.jpg",
      experiences: [],
      assignedTo: null,
    };

    const toutes_les_experiences = [];

    document
      .querySelectorAll("#experiences .experience-item").forEach((une_exp) => {
         const poste = une_exp.querySelector('input[name="expPoste"]')?.value || "";
        const entreprise =une_exp.querySelector('input[name="expEntreprise"]')?.value || "";
        const date_start = une_exp.querySelector('input[name="dateStart"]')?.value || "";
        const date_fin = une_exp.querySelector('input[name="dateEnd"]')?.value || "";

        if (poste || entreprise || date_start || date_fin) {
          toutes_les_experiences.push({
            poste: poste,
            entreprise: entreprise,
            dateStart: date_start,
            dateEnd: date_fin,
          });
        }
      });

    employe.experiences = toutes_les_experiences;

    les_employees.push(employe);
    sauvegarde_local();
    calcule_zone();
    formulaire.classList.add("d-none");
    experiences.innerHTML = "";
    rest_formulaire();
    afficher_non_assigne();
  }
});
let compt_zones = {};

function calcule_zone() {
  compt_zones.reception = les_employees.filter(
    (emp) => emp.assignedTo === "reception"
  ).length;
  compt_zones.serveurs = les_employees.filter(
    (emp) => emp.assignedTo === "serveurs"
  ).length;
  compt_zones.securite = les_employees.filter(
    (emp) => emp.assignedTo === "securite"
  ).length;
  compt_zones.archives = les_employees.filter(
    (emp) => emp.assignedTo === "archives"
  ).length;
  compt_zones.conference = les_employees.filter(
    (emp) => emp.assignedTo === "conference"
  ).length;
  compt_zones.personnel = les_employees.filter(
    (emp) => emp.assignedTo === "personnel"
  ).length;
}
calcule_zone();
function afficheradmis(liste, zone) {
  verifier_zon();
  calcule_zone();
  if(liste.length === 0){
  cont_admis.classList.remove('d-none')
   admis.innerHTML = `<li class="text-warning list-group-item">Aucun employe est admis a cette zone</li>`; 
        return;
  }
  admis.innerHTML = "";
  cont_admis.classList.remove('d-none')
  liste.forEach((emp) => {
    const li = document.createElement("li");
    li.className =
      "mt-2 bg-light  d-flex justify-content-between align-items-center gap-2 p-2";

    li.innerHTML = `
            <img class="rounded-4" src="${emp.photo}">
            <div class="d-flex flex-column flex-grow-1 mx-2">
                <div class="fw-bold">${emp.nom}</div>
                <div class="text-secondary">${emp.role}</div>
            </div>
            <button class="btn-pr p-2  assign-btn">
              <i class="bi bi-person-plus-fill"></i>
            </button>
        `;
    li.querySelector(".assign-btn").addEventListener("click", () => {
      assignfx(emp.id, zone);
      console.log(emp.id);
      console.log(zone);
      const nouvelle_list = les_employees.filter(
        (emp) => emp.assignedTo === null && est_admis(emp.role, zone)
      );
      afficheradmis(nouvelle_list, zone);
    });
    admis.appendChild(li);
  });
}

function afficher_non_assigne() {
  verifier_zon();
  list_employee_non_assignes.innerHTML = "";
  for (let i = 0; i < les_employees.length; i++) {
    if (
      les_employees[i].assignedTo == null ||
      les_employees[i].assignedTo == ""
    ) 
    {
      const li = document.createElement("li");

      li.className =
        "mt-2 bg-light d-flex justify-content-between align-items-center gap-2 p-2";

      li.innerHTML = `
      <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-3 flex-grow-1">
                <img src="${
                  les_employees[i].photo || "plan-69159a65c5684763515973.jpg"
                }" 
                     class=" rounded-4 object-fit-cover" 
                     width="50" height="50" alt="${les_employees[i].nom}">
                <div>
                    <div class="fw-bold text-dark">${les_employees[i].nom}</div>
                    <div class="text-secondary small">${
                      les_employees[i].role
                    }</div>
                </div>
            </div>
        </div>
    `;
      list_employee_non_assignes.appendChild(li);
      li.addEventListener("click", () => {
        console.log("heloo ba abdellah");
        document.getElementById("profile_zone_sss").classList.remove("d-none");
        affichier_ProfileCard(i);
      });
    }
  }
}

function est_admis(role, zone) {
  if (role === "Manager") {
    return true;
  }

  if (zone === "reception" && role === "Receptionniste") {
    return true;
  }
  if (zone === "serveurs" && role === "Technicien IT") {
    return true;
  }
  if (zone === "securite" && role === "Agent de securite") {
    return true;
  }
  if (role === "Nettoyage" && zone != "archives") {
    return true;
  }
  if (role === "Autre") {
    if (zone != "reception" || zone != "serveurs" || zone != "securite") {
      return true;
    }
  }
  return false;
}

btn_personnel.addEventListener("click", () => {
  const les_admis = les_employees.filter((emp) => emp.assignedTo === null && est_admis(emp.role, "personnel"));
  afficheradmis(les_admis, "personnel");
});

btn_Reception.addEventListener("click", () => {
  const les_admis = les_employees.filter(
    (emp) => emp.assignedTo === null && est_admis(emp.role, "reception")
  );
  afficheradmis(les_admis, "reception");
});

btn_serveurs.addEventListener("click", () => {
  const les_admis = les_employees.filter(
    (emp) => emp.assignedTo === null && est_admis(emp.role, "serveurs")
  );
  afficheradmis(les_admis, "serveurs");
});

btn_darchives.addEventListener("click", () => {
  const les_admis = les_employees.filter(
    (emp) => emp.assignedTo === null && est_admis(emp.role, "archives")
  );
  afficheradmis(les_admis, "archives");
});

btn_securite.addEventListener("click", () => {
  const les_admis = les_employees.filter(
    (emp) => emp.assignedTo === null && est_admis(emp.role, "securite")
  );
  afficheradmis(les_admis, "securite");
});

btn_conference.addEventListener("click", () => {
  const les_admis = les_employees.filter(
    (emp) => emp.assignedTo === null && est_admis(emp.role, "conference")
  );
  afficheradmis(les_admis, "conference");
});

function assignfx(id, zone) {
  calcule_zone();
  if (compt_zones[zone] >= zonesmax[zone].max) {
    alert("Le salle est plein le max et ", zonesmax[zone].max);
    return;
  }

  for (let emp of les_employees) {
    if (emp.id === id && !emp.assignedTo) {
      emp.assignedTo = zone;
      sauvegarde_local();
      calcule_zone()
      document.getElementById("admis").innerHTML = "";
      afficher_non_assigne();
      verifier_zon();

      break;
    }
  }

  console.log("428  " + zonesmax[zone].max);
}

document
  .getElementById("vue_conference")
  .addEventListener("click", () =>afficherAssignes("conference"));
document
  .getElementById("vue_Reception")
  .addEventListener("click", () =>afficherAssignes("reception"));
document
  .getElementById("vue_serveurs")
  .addEventListener("click", () =>afficherAssignes("serveurs"));
document
  .getElementById("vue_securite")
  .addEventListener("click", () =>afficherAssignes("securite"));
document
  .getElementById("vue_personnel")
  .addEventListener("click", () =>afficherAssignes("personnel"));
document
  .getElementById("vue_darchives")
  .addEventListener("click", () =>afficherAssignes("archives"));
close_admis.addEventListener('click',() => {
cont_admis.classList.add('d-none')
})
function afficherAssignes(zone) {
    calcule_zone(); 
    verifier_zon();
    cont_admis.classList.remove('d-none');
    admis.innerHTML = "";

    const assignes = les_employees.filter((emp) => emp.assignedTo === zone);

    if (assignes.length === 0) {
        admis.innerHTML = `<li class="text-warning list-group-item">Aucun employe assigne</li>`; 
        return;
    }

    assignes.forEach((emp) => { 
        const li = document.createElement("li");
        li.className = "card_ass p-2 mt-2 bg-light list-group-item"; 

        li.innerHTML = `
            <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center gap-3 flex-grow-1">
                    <img src="${
                        emp.photo || "plan-69159a65c5684763515973.jpg"
                    }" 
                        class=" rounded-4 object-fit-cover" 
                        width="50" height="50" alt="${emp.nom}">
                    <div>
                        <div class="fw-bold text-dark">${emp.nom}</div>
                        <div class="text-secondary small">${emp.role}</div>
                    </div>
                </div>
                <button class="suppremerass btn btn-danger btn-sm ms-2">
                    <i class="bi bi-x-octagon"></i>
                </button>
            </div>
        `;

        li.querySelector(".suppremerass").addEventListener("click", () => {
            emp.assignedTo = null; 
            sauvegarde_local();
            calcule_zone();
            afficher_non_assigne();
            verifier_zon();
            afficherAssignes(zone);
        });
        
        admis.appendChild(li);
    });
}function verifier_zon() {
  const nbReception = les_employees.filter(
    (e) => e.assignedTo === "reception"
  ).length;
  const nbServeurs = les_employees.filter(
    (e) => e.assignedTo === "serveurs"
  ).length;
  const nbSecurite = les_employees.filter(
    (e) => e.assignedTo === "securite"
  ).length;
  const nbArchives = les_employees.filter(
    (e) => e.assignedTo === "archives"
  ).length;
  if (nbReception === 0) {
    zoneReception.classList.remove("bg_one");
    zoneReception.classList.add("bg_tow");
  } else {
    zoneReception.classList.remove("bg_tow");
    zoneReception.classList.add("bg_one");
  }
  if (nbServeurs === 0) {
    zoneServeurs.classList.remove("bg_one");
    zoneServeurs.classList.add("bg_tow");
  } else {
    zoneServeurs.classList.remove("bg_tow");
    zoneServeurs.classList.add("bg_one");
  }

  if (nbSecurite === 0) {
    zoneSecurite.classList.remove("bg_one");
    zoneSecurite.classList.add("bg_tow");
  } else {
    zoneSecurite.classList.remove("bg_tow");
    zoneSecurite.classList.add("bg_one");
  }
  if (nbArchives === 0) {
    zoneArchives.classList.remove("bg_one");
    zoneArchives.classList.add("bg_tow");
  } else {
    zoneArchives.classList.remove("bg_tow");
    zoneArchives.classList.add("bg_one");
  }
}
verifier_zon();

