# Spécifications du Projet

## Solution de Gestion des Utilisateurs

### Fonctionnalités :
- **CRUD Utilisateur**
  <!-- - Créer, lire, mettre à jour, supprimer un utilisateur.
  - Attributs de l'utilisateur : `{id, email, pseudo, mot de passe, rôle}`. -->

### Contrôle d'Accès :
<!-- - Les utilisateurs normaux ne peuvent pas lire les informations d'un autre utilisateur, mais un employé peut vérifier ces informations.
- Il est possible de créer un nouvel utilisateur sans être connecté.
- Les utilisateurs ne peuvent mettre à jour que leur propre information. Les administrateurs peuvent mettre à jour n'importe quel utilisateur.
- Les utilisateurs ne peuvent supprimer que leur propre compte. Les administrateurs peuvent supprimer n'importe quel utilisateur. -->

### Authentification :
<!-- - Implémentation de l'authentification avec des jetons JWT (recommandé). -->

## Point de Terminaison Train

### Fonctionnalités :
- **Lister les Trains**
  <!-- - Permet de trier par date, gare de départ, gare d'arrivée. -->
  - Limite par défaut de 10 résultats, modifiable via un paramètre.

- **CRUD Train**
  <!-- - Attributs du train : `{id, name, start_station, end_station, time_of_departure}`. -->

### Contrôle d'Accès :
<!-- - Seul un administrateur peut créer, mettre à jour ou supprimer un train. -->

## Point de Terminaison Gare

### Fonctionnalités :
- **Lister les Gares**
  <!-- - Permet de trier par nom. -->

- **CRUD Gare**
  <!-- - Attributs de la gare : `{id, name, open_hour, close_hour, image}`.
  - L'image doit être redimensionnée à 200x200 pixels si le téléchargement est trop volumineux. -->

### Contrôle d'Accès :
<!-- - Seul un administrateur peut créer, mettre à jour ou supprimer une gare.
- Considérations nécessaires lors de la suppression d'une gare pour gérer les associations avec les trains. -->

## Point de Terminaison Réservation de Billet

### Fonctionnalités :
<!-- - Endpoint pour réserver un billet et le valider. -->

## Validation et Retours
<!-- - Implémentation de la validation avec une bibliothèque telle que Joi, Yup ou AJV. -->
- Utilisation de codes HTTP appropriés lors du renvoi de réponses aux utilisateurs.

## Tests
- Les tests sont essentiels. Implémenter des tests axés sur les fonctionnalités principales du projet.
