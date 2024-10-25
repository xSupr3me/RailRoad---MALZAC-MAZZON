# **🚂 RailRoad - Gestion des utilisateurs, trains, gares et réservations**

Ce projet est une API REST développée avec Node.js et Express, connectée à une base de données MongoDB. L'API permet de gérer des utilisateurs, des trains, des gares, ainsi que les réservations de trajets. Elle inclut l'authentification avec JWT, des middlewares pour la validation des schémas et la gestion des rôles d'utilisateur.

## Fonctionnalités

- Gestion des utilisateurs (inscription, connexion, profil)
- Gestion des trains (ajout, modification, suppression, recherche)
- Gestion des gares (ajout, modification, suppression, recherche)
- Gestion des réservations (création, annulation, validation)
- Système d'authentification basé sur JWT
- Validation des données avec des schémas (Zod)
- Middleware de rôle pour restreindre l'accès aux ressources

## Technologies utilisées

- **Node.js**: Serveur backend
- **Express**: Framework pour Node.js
- **MongoDB**: Base de données NoSQL
- **Mongoose**: ORM pour MongoDB
- **JWT**: Authentification des utilisateurs
- **Multer**: Gestion de l'upload de fichiers (images de gares)
- **Zod**: Validation des schémas de données

##⚙️ Installation

1. Clonez ce dépôt

   ```bash
   git clone https://github.com/xSupr3me/RailRoad
   ```

2. Accédez au répertoire du projet

   ```bash
   cd RailRoad
   ```

3. Installez les dépendances

   ```bash
   npm install
   ```

4. Démarrez le serveur

   ```bash
   npm start
   ```

##📌 Endpoints principaux

###👤 Utilisateurs

- `POST /users/register`: Inscription d'un utilisateur
- `POST /users/login`: Connexion d'un utilisateur
- `GET /users/all`: Récupérer tous les utilisateurs (admin/employé)
- `GET /users/:id`: Récupérer le profil d'un utilisateur (admin/employé)
- `PUT /users/:id`: Mettre à jour un utilisateur (admin)
- `DELETE /users/:id`: Supprimer un utilisateur (admin)

###🚆 Trains

- `GET /trains`: Récupérer tous les trains
- `GET /trains/:id`: Récupérer un train par son ID
- `POST /trains`: Ajouter un nouveau train (admin)
- `PUT /trains/:id`: Mettre à jour un train (admin)
- `DELETE /trains/:id`: Supprimer un train (admin)

###🏢 Gares

- `GET /trainstations`: Récupérer toutes les gares
- `GET /trainstations/:id`: Récupérer une gare par son ID
- `POST /trainstations`: Ajouter une nouvelle gare (admin)
- `PUT /trainstations/:id`: Mettre à jour une gare (admin)
- `DELETE /trainstations/:id`: Supprimer une gare (admin)

###🎟 Réservations

- `POST /reservations`: Créer une réservation (admin/employé)
- `GET /reservations`: Récupérer les réservations d'un utilisateur (admin/employé)
- `GET /reservations/all`: Récupérer toutes les réservations (admin)
- `PUT /reservations/cancel/:id`: Annuler une réservation (admin/employé)
- `PUT /reservations/validate/:id`: Valider une réservation (admin/employé)
- `DELETE /reservations/delete/:id`: Supprimer une réservation (admin)

##🛡 Middleware et Sécurité

- **authMiddleware**: Vérifie si l'utilisateur est authentifié grâce à un token JWT.
- **roleMiddleware**: Restreint l'accès à certains endpoints en fonction du rôle de l'utilisateur (admin, employé).
- **validateSchemaMiddleware**: Valide les données envoyées dans les requêtes avec les schémas définis.


## Auteurs

- [MALZAC Mathis](https://github.com/xSupr3me)
- [MAZZON Paul](https://github.com/paulmzzn)

