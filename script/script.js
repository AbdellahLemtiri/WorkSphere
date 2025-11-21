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
  const regphone = /^(05|06|07)[0-9]{8}$/;
  const regnom = /^[A-Za-z ]{3,30}$/;
  const regmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
      .querySelectorAll("#experiences .experience-item")
      .forEach((une_exp) => {
        const poste =
          une_exp.querySelector('input[name="expPoste"]')?.value || "";
        const entreprise =
          une_exp.querySelector('input[name="expEntreprise"]')?.value || "";
        const date_start =
          une_exp.querySelector('input[name="dateStart"]')?.value || "";
        const date_fin =
          une_exp.querySelector('input[name="dateEnd"]')?.value || "";

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
    formulaire.classList.add("d-none");
    experiences.innerHTML = "";
    rest_formulaire();
    afficher_non_assigne();
  }
});

function afficheradmis(liste, zone) {
  const container = document.getElementById("admis");
  container.innerHTML = "";

  liste.forEach((emp) => {
    const li = document.createElement("li");
    li.className =
      "mt-2 bg-light list-group-item d-flex justify-content-between align-items-center gap-2 p-2";

    li.innerHTML = `
            <img class="rounded-4" src="${emp.photo}" width="50" height="50">
            <div class="d-flex flex-column flex-grow-1 mx-2">
                <div class="fw-bold">${emp.nom}</div>
                <div class="text-secondary">${emp.role}</div>
            </div>
            <button class="btn-pr p-2  assign-btn" data-id="${emp.id}" data-zone="${zone}">
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
    container.appendChild(li);
  });
}

function afficher_non_assigne() {
  list_employee_non_assignes.innerHTML = "";
  les_employees.forEach((emp) => {
    if (emp.assignedTo == null || emp.assignedTo == "") {
      const li = document.createElement("li");

      li.className =
        "mt-2 bg-light list-group-item d-flex justify-content-between align-items-center gap-2 p-2";
      li.innerHTML = `
                <img class="rounded-4" src="${
                  emp.photo || "plan-69159a65c5684763515973.jpg"
                }" width="50" height="50" alt="">
                <div class="d-flex flex-column flex-grow-1 mx-2">
                    <div class="fw-bold">${emp.nom}</div>
                    <div class="text-secondary">${emp.role}</div>
                </div>
               
            `;

      list_employee_non_assignes.appendChild(li);
    }
  });
}

function est_admis(role, zone) {
  if (role === "Manager") {
    return true;
  }

  if (role === "Nettoyage" && zone === "archives") {
    return false;
  }

  if (zone === "reception") {
    return role === "Receptionniste";
  }

  if (zone === "serveurs") {
    return role === "Technicien IT";
  }

  if (zone === "securite") {
    return role === "Agent de securite";
  }

  return true;
}

btn_personnel.addEventListener("click", () => {
  const les_admis = les_employees.filter(
    (emp) => emp.assignedTo === null && est_admis(emp.role, "personnel")
  );
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
    (emp) => emp.assignedTo === null && est_admis(emp.role, "salleserveurs")
  );
  afficheradmis(les_admis, "salleserveurs");
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

const zonesmax = {
  reception: {
    min: 0,
    max: 2,
  },
  salleserveurs: { min: 0, max: 4 },
  securite: { min: 0, max: 2 },
  archives: { min: 0, max: 2 },
  conference: { min: 0, max: 12 },
  personnel: { min: 0, max: 5 },
};

const compt_zones = [
  (reception = 0),
  (salleserveurs = 0),
  (securite = 0),
  (archives = 0),
  (conference = 0),
  (personnel = 0),
];

function assignfx(id, zone) {
  if (compt_zones[zone] >= zonesmax[zone].max) {
    console.log("Le salle est plein");
    return;
  }

  for (let emp of les_employees) {
    if (emp.id === id && !emp.assignedTo) {
      emp.assignedTo = zone;
      compt_zones[zone]++;
      localStorage.setItem(
        "worksphere_employees",
        JSON.stringify(les_employees)
      );
      afficher_non_assigne();
      break;
    }
  }
}
console.log(compt_zones.reception);
console.log(compt_zones.personnel);
console.log(compt_zones.securite);
console.log(compt_zones.conference);

document
  .getElementById("vue_conference")
  .addEventListener("click", () => afficherAssignes("conference"));

document
  .getElementById("vue_Reception")
  .addEventListener("click", () => afficherAssignes("reception"));

document
  .getElementById("vue_serveurs")
  .addEventListener("click", () => afficherAssignes("salleserveurs"));

document
  .getElementById("vue_securite")
  .addEventListener("click", () => afficherAssignes("securite"));

document
  .getElementById("vue_personnel")
  .addEventListener("click", () => afficherAssignes("manager"));

document
  .getElementById("vue_darchives")
  .addEventListener("click", () => afficherAssignes("archives"));

function afficherAssignes(zone) {
  const container = document.getElementById("admis");
  container.innerHTML = "";

  const assignes = les_employees.filter((emp) => emp.assignedTo === zone);

  if (assignes.length === 0) {
    container.innerHTML = `<li class="text-warning list-group-item">Aucun employé assigné</li>`;
    return;
  }

  assignes.forEach((emp) => {
    const li = document.createElement("li");
    li.className =
      "mt-2 bg-light list-group-item d-flex justify-content-between align-items-center gap-2 p-2";

    li.innerHTML = `
      <div class="d-flex align-items-center w-100">
  <img class="rounded-4" src="${emp.photo}" width="50" height="50">
  <div class="d-flex flex-column flex-grow-1 mx-2">
    <div class="fw-bold">${emp.nom}</div>
    <div class="text-secondary">${emp.role}</div>
  </div>
  <button class="suppremerass btn btn-danger btn-sm ms-2">
    <i class="bi bi-x-octagon"></i>
  </button>
   <button class="suppremerass btn btn-danger btn-sm ms-2">
    <i class="bi bi-x-octagon"></i>
  </button>
</div>

    `;

    li.querySelector(".suppremerass").addEventListener("click", () => {
      emp.assignedTo = null;
      sauvegarde_local();
      afficherAssignes(zone);
      afficher_non_assigne();
    });

    container.appendChild(li);
  });
}
// function verifierzone(){
//  let tabb =
// }
