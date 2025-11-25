# WorkSphere – Gestion des Employés et des Zones

Application web permettant de gérer les employés et de les assigner aux différentes zones d’un espace de travail. L’interface est simple, visuelle et basée sur un plan interactif.

## 1. Fonctionnalités

- Gestion des employés (ajout, modification, suppression)
- Affectation des employés aux zones
- Affichage dynamique de l’état des zones
- Retrait des employés assignés
- Sauvegarde des données avec `localStorage`

## 2. Zones disponibles

- Salle de conférence
- Réception
- Salle des serveurs
- Salle de sécurité
- Salle du personnel
- Salle d’archives

## 3. Règles d’assignation

- **Salle de conférence** : 1 employé maximum
- **Réception** : au moins 1 employé requis
- **Salle des serveurs** : employés techniques uniquement
- **Salle de sécurité** : personnel de sécurité uniquement
- **Salle du personnel** : libre
- **Salle d’archives** : 1 employé maximum

## 4. Technologies utilisées

- HTML
- CSS / Bootstrap
- JavaScript
- LocalStorage
- Git & GitHub

## 5. Structure du projet

WorkSphere/
│── index.html
│── style/
│ └── style.css
│── script/
│ └── script.js
│── assets/
│ ├── images des salles
│ └── photos employés
└── README.md


## 6. Installation

git clone https://github.com/AbdellahLemtiri/WorkSphere.git