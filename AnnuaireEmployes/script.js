const form = document.getElementById("employeForm");
const list = document.getElementById("employeList");

let employees = JSON.parse(localStorage.getItem("employees")) || [];

// fonction pour enregistrer la liste des employés dans le localStorage
function saveToLocalStorage() {
  localStorage.setItem("employees", JSON.stringify(employees));
}

// fonction pour lister les employés sur la page
function listEmployes() {
  list.innerHTML = "";
  employees.forEach((emp, index) => {
    // Création d'un élément li pour chaque employé
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>NOM(S) et PRENOM(S): ${emp.lastName} ${emp.firstName}</strong><br>
        <strong>EMAIL : </strong> ${emp.email} <br>
        <strong>POSTE : </strong>${emp.poste}
      </div>
      <button onclick="deleteEmploye(${index})">Supprimer</button>
    `;
    // Ajout de l'élément li à la liste
    list.appendChild(li);
  });
}

// fonction pour supprimmer un employé
function deleteEmploye(index) {
    const emp = employees[index];
    // Confirmation avant la suppression
    if (confirm(`Voulez-vous vraiment supprimer  l'employé ${emp.firstName} ${emp.lastName} ?`)) {
        // Suppression de l'employé de la liste
        employees.splice(index, 1);
        // Mise à jour du localStorage et de l'affichage
        alert(`L'employé ${emp.firstName} ${emp.lastName} a été supprimé.`);
        saveToLocalStorage();
        listEmployes();
    }
}

// Gestion de l'envoi du formulaire : valide les champs, ajoute l'employé à la liste, met à jour le localStorage et réinitialise le formulaire.
form.addEventListener("submit", (e) => {
  e.preventDefault();
    // Récupération des valeurs des champs du formulaire
  const lastName = document.getElementById("lastName").value.trim();
  const firstName = document.getElementById("firstName").value.trim();
  const email = document.getElementById("email").value.trim();
  const poste = document.getElementById("poste").value.trim();
    // Validation des champs
  if (!lastName || !firstName || !email || !poste || !validateEmail(email)) {
    alert("Veuillez remplir tous les champs correctement.");
    return;
  }
  
  const newEmployee = { lastName, firstName, email, poste };
  employees.push(newEmployee);
  saveToLocalStorage();
  listEmployes();

  form.reset();
});

// fonction pour valider l'email
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// affichage initial de la liste des employés
listEmployes();
