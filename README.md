# 🚂 RailRoad - Gestion des utilisateurs, trains, gares et réservations

Ce projet est une API REST développée avec Node.js et Express, connectée à une base de données MongoDB. L'API permet de gérer des utilisateurs, des trains, des gares, ainsi que les réservations de trajets. Elle inclut l'authentification avec JWT, des middlewares pour la validation des schémas et la gestion des rôles d'utilisateur, ainsi qu'une documentation interactive via Swagger.

## Fonctionnalités
- **Gestion des utilisateurs** (inscription, connexion, profil, rôle d’utilisateur)
- **Gestion des trains** (ajout, modification, suppression, recherche et filtrage)
- **Gestion des gares** (ajout, modification, suppression, recherche et tri)
- **Gestion des réservations** (création, annulation, validation)
- **Système d'authentification basé sur JWT**
- **Validation des données** avec des schémas (Zod)
- **Middleware de rôle** pour restreindre l'accès aux ressources
- **Documentation interactive avec Swagger**

## Technologies utilisées
- **Node.js** : Serveur backend
- **Express** : Framework pour Node.js
- **MongoDB** : Base de données NoSQL
- **Mongoose** : ORM pour MongoDB
- **JWT** : Authentification des utilisateurs
- **Multer** : Gestion de l'upload d'images pour les gares avec redimensionnement automatique
- **Zod** : Validation des schémas de données
- **Swagger** : Documentation interactive pour l’API

## ⚙️ Installation

1. Clonez ce dépôt
    ```bash
    git clone https://github.com/xSupr3me/RailRoad---MALZAC-MAZZON
    ```

2. Accédez au répertoire du projet
    ```bash
    cd RailRoad---MALZAC-MAZZON
    ```

3. Installez les dépendances
    ```bash
    npm install
    ```

4. Créez un fichier `.env` avec les configurations nécessaires :
    ```plaintext
    MONGO_URI=<votre_uri_mongodb>
    JWT_SECRET=<votre_clé_secrète_jwt>
    ```

5. Démarrez le serveur
    ```bash
    npm start
    ```

## 📌 Endpoints principaux

### 👤 Utilisateurs
- `POST /users/register` : Inscription d'un utilisateur
- `POST /users/login` : Connexion d'un utilisateur
- `GET /users/all` : Récupérer tous les utilisateurs (admin/employé)
- `GET /users/:id` : Récupérer le profil d'un utilisateur (admin/employé)
- `PUT /users/:id` : Mettre à jour un utilisateur (admin ou soi-même)
- `DELETE /users/:id` : Supprimer un utilisateur (admin ou soi-même)

### 🚆 Trains
- `GET /trains` : Récupérer tous les trains avec tri et filtrage par date, gare de départ et d'arrivée
- `GET /trains/:id` : Récupérer un train par son ID
- `POST /trains` : Ajouter un nouveau train (admin)
- `PUT /trains/:id` : Mettre à jour un train (admin)
- `DELETE /trains/:id` : Supprimer un train (admin)

### 🏢 Gares
- `GET /trainstations` : Récupérer toutes les gares avec tri par nom
- `GET /trainstations/:id` : Récupérer une gare par son ID
- `POST /trainstations` : Ajouter une nouvelle gare (admin)
- `PUT /trainstations/:id` : Mettre à jour une gare (admin)
- `DELETE /trainstations/:id` : Supprimer une gare avec gestion des trains associés (admin)

### 🎟 Réservations
- `POST /reservations` : Créer une réservation de trajet
- `GET /reservations` : Récupérer les réservations d'un utilisateur
- `GET /reservations/all` : Récupérer toutes les réservations (admin)
- `PUT /reservations/cancel/:id` : Annuler une réservation
- `PUT /reservations/validate/:id` : Valider une réservation (admin/employé)
- `DELETE /reservations/delete/:id` : Supprimer une réservation (admin)

## 🛡 Middleware et Sécurité
- **authMiddleware** : Vérifie si l'utilisateur est authentifié via JWT.
- **roleMiddleware** : Limite l'accès à certains endpoints en fonction du rôle de l'utilisateur (admin, employé).
- **restrictRoleMiddleware** : Empêche un utilisateur de s’attribuer un rôle d’admin ou d’employé.
- **validateSchemaMiddleware** : Valide les données envoyées dans les requêtes avec les schémas définis dans Zod.

## 🧪 Tests
Les tests sont cruciaux pour vérifier les fonctionnalités de base de l'API. Les tests incluent les aspects suivants :
- **Inscription et Connexion** : Vérifie les flux d'authentification
- **CRUD des trains, gares, et réservations** : Assure le bon fonctionnement des fonctionnalités principales.
- **Jest** : Outil de test pour les tests unitaires et d'intégration avec rapport de couverture de tests

## 📄 Documentation
La documentation complète de l’API est accessible avec Swagger. Accédez à `/api-docs` pour consulter et tester les endpoints. La documentation détaille les paramètres, les codes de retour pour les succès et erreurs, et les exemples de requêtes.

## 👥 Auteurs
- [MALZAC Mathis](https://github.com/xSupr3me)
- [MAZZON Paul](https://github.com/paulmzzn)
