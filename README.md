# 🚆 Projet API RailRoad Ltd

## 📅 Dates Importantes
- **Ouvert le** : Mercredi 9 octobre 2024, 16:00
- **À rendre** : Samedi 26 octobre 2024, 23:59

---

## 📋 Vue d'ensemble du projet

RailRoad Ltd est une entreprise qui vise à améliorer l'expérience des trajets locaux et nationaux. La tâche consiste à créer une API complète en utilisant **Node.js** et **Express.js** pour permettre aux utilisateurs d'accéder aux informations sur les gares et de réserver des billets de train. L'API doit également offrir une interface pour les employés afin de vérifier la validité des billets.

L'API doit être conforme aux principes REST (méthodes, points de terminaison, etc.).

**Note** : Ce projet concerne uniquement la création de l'API ; aucun frontend n'est requis.

---

## 🎯 Missions du Projet

### 1. Fonctionnalités principales

#### 1.1 Gestion des utilisateurs
- **Fonctionnalités CRUD** (Créer, Lire, Mettre à jour, Supprimer) pour les utilisateurs.
- Les utilisateurs doivent avoir au moins les propriétés suivantes :
  - `id`
  - `email`
  - `pseudo`
  - `mot de passe`
  - `rôle`
- Restrictions :
  - Les utilisateurs normaux ne peuvent pas lire les informations d'autres utilisateurs, mais un employé peut.
  - La création d'un nouvel utilisateur est possible sans être connecté.
  - Chaque utilisateur peut seulement mettre à jour ou supprimer son propre compte (sauf si admin).

#### 1.2 Authentification
- Mettre en place une authentification (utilisation recommandée de JWT).
- Tous les points de terminaison en lecture pour les données de train doivent être accessibles sans authentification.
- Tous les points de terminaison d'écriture (POST, PUT, DELETE) nécessitent une authentification.

#### 1.3 Gestion des trains
- Lister tous les trains avec la possibilité de trier par date, gare de départ, gare d'arrivée, avec une limite par défaut de 10 (modifiable via paramètre).
- Fonctionnalités CRUD pour les trains, avec les propriétés suivantes :
  - `id`
  - `nom`
  - `gare de départ`
  - `gare d'arrivée`
  - `heure de départ`
- Seul un administrateur peut créer, mettre à jour ou supprimer un train.

#### 1.4 Gestion des gares
- Lister toutes les gares et permettre le tri par nom.
- Fonctionnalités CRUD pour les gares, avec les propriétés suivantes :
  - `id`
  - `nom`
  - `heure d'ouverture`
  - `heure de fermeture`
  - `image` (doit être redimensionnée à 200x200 pixels si le téléchargement est trop grand).
- Seul un administrateur peut créer, mettre à jour ou supprimer une gare (attention lors de la suppression d'une gare, il faut prendre en compte les trains associés).

#### 1.5 Réservation et validation des billets
- Mettre en place un point de terminaison pour réserver un billet entre deux stations et valider cette réservation.
- Implémenter une validation robuste pour les entrées utilisateur en utilisant une solution comme **ZOD**.
- Utiliser les codes HTTP appropriés lors de la réponse à l'utilisateur.

---

## 📝 Détails Techniques

### 1. Authentification
- Pas besoin d'une solution OAuth complète, juste un moyen de générer un token.
- Utilisation possible de **PassportJS** avec la stratégie **passport-local-mongoose**.
- Pour tester un token JWT, vous pouvez utiliser [jwt.io](https://jwt.io).

### 2. Validation des données
- Utiliser **ZOD** pour la validation des données des utilisateurs.
- Créer des middlewares pour automatiser la validation sur certaines routes.

### 3. Documentation
- La documentation doit être conforme aux standards **Swagger/OpenAPI**.
- Utiliser [editor.swagger.io](https://editor.swagger.io) pour simplifier la rédaction.
- Définir les points de terminaison avec leurs valeurs d'entrée (URL, corps de la requête, etc.) et les réponses possibles (succès, erreur).

---

## 📦 Livrables
Vous devez soumettre une archive contenant :
- Le code source du projet.
- La documentation de l'API (Swagger/OpenAPI ou autre standard précisé).
- Un fichier **README** avec les étapes d'installation et pour pouvoir exécuter votre projet.

---

## 📊 Critères d'évaluation
- Architecture globale du projet : 4 points
- Authentification : 3 points
- Fonctionnalités liées aux trains :
  - Opérations par un administrateur : 4 points
  - Recherche d’une gare ou d’un train : 4 points
  - Vérification de la validité d’un billet : 3 points
- Documentation et tests : 2 points

**Remarque** : Ne pas fournir de documentation ou de tests de base peut entraîner des pénalités (jusqu’à -2 points).

**Important** : Jusqu'à 50 % des points pour chaque catégorie peuvent être perdus pour des problèmes de qualité de code et/ou de sécurité. Vous devez travailler comme vous le feriez dans une entreprise, avec un impact sur les clients ou les finances !
