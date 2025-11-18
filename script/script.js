const btnajout = document.getElementById('btnajout');
const formulaire = document.getElementById('formulaire');
const annuler_btn = document.getElementById('annuler_btn');
const close_btn = document.getElementById('close_btn');
const nom = document.getElementById('nom');
const role = document.getElementById('role');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const urlimg = document.getElementById('urlimg');
const ajout_exeprience = document.getElementById('ajout_exeprience');
const experiences = document.getElementById('experiences');
const sauvegarder = document.getElementById('sauvegarder');
ajout_exeprience.addEventListener('click',()=>{
   const exp = document.createElement('div');
   exp.className = "row mb-2"
    exp.innerHTML =  `
            <div class="col-md-5"><input type="text" class="form-control" placeholder="Poste" name="expTitle"></div>
            <div class="col-md-5"><input type="text" class="form-control" placeholder="Entreprise" name="expCompany"></div>
            <div class="col-md-2"><input type="text" class="form-control" placeholder="Années" name="expYears"></div>
        `;

    experiences.appendChild(exp);
})
btnajout.addEventListener('click', () => {
    formulaire.classList.remove('d-none');
})
annuler_btn.addEventListener('click', () => {
    formulaire.classList.add('d-none');
})
close_btn.addEventListener('click', () => {
    formulaire.classList.add('d-none');
})
sauvegarder.addEventListener('click',()=>{
    
})