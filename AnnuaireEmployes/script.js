const form = document.getElementById("employeForm");
const list = document.getElementById("employeList");

let employees = JSON.parse(localStorage.getItem("employees")) || [];

function saveToLocalStorage() {
  localStorage.setItem("employees", JSON.stringify(employees));
}

function listEmployes() {
  list.innerHTML = "";
  employees.forEach((emp, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>NOM(S) et PRENOM(S): ${emp.lastName} ${emp.firstName}</strong><br>
        <strong>EMAIL : </strong> ${emp.email} <br>
        <strong>POSTE : </strong>${emp.poste}
      </div>
      <button onclick="deleteEmploye(${index})">Supprimer</button>
    `;
    list.appendChild(li);
  });
}

function deleteEmploye(index) {
    const emp = employees[index];
    if (confirm(`Voulez-vous vraiment supprimer  l'employé ${emp.firstName} ${emp.lastName} ?`)) {
        employees.splice(index, 1);
        saveToLocalStorage();
        listEmployes();
    }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const lastName = document.getElementById("lastName").value.trim();
  const firstName = document.getElementById("firstName").value.trim();
  const email = document.getElementById("email").value.trim();
  const poste = document.getElementById("poste").value.trim();

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

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// affichage initial de la liste des employés
listEmployes();
