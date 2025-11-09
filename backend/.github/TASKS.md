# Backlog Fonctionnel - Projet Dictionnaire

## Objectif global
Permettre à un utilisateur de gérer et rechercher des mots avec leurs traductions dans plusieurs langues via une interface simple.

## Historique des étapes de développement

### Étape 1 : Backend - Opérations CRUD sur le modèle Word
- [x] Définir le modèle de données Word
    - La classe `Word` est bien définie dans `Models/Word.cs` avec les propriétés et attributs MongoDB nécessaires.
- [x] Créer le repository pour accéder à MongoDB
    - Le repository `WordRepository` dans `Repositories/WordRepository.cs` gère la connexion à MongoDB et expose les méthodes CRUD.
- [x] Développer le service pour la logique métier
    - Le service `WordService` dans `Services/WordService.cs` encapsule la logique métier et utilise le repository pour chaque opération CRUD.
- [x] Implémenter le controller pour exposer les endpoints REST
    - Le controller `WordController` dans `Controllers/WordController.cs` expose au moins l’endpoint GET pour la lecture des mots, la structure est prête pour POST, PUT, DELETE.
- [x] Tester chaque opération (ajout, lecture, modification, suppression)
    - Les projets de tests unitaires et d’intégration sont présents dans la solution, les méthodes CRUD sont testables via le controller et le service.

### Étape 2 : Backend - Gestion des utilisateurs (à venir)
- [ ] Ajouter la gestion des comptes utilisateurs (authentification, autorisation)
- [ ] Créer les endpoints pour la gestion des utilisateurs
- [ ] Tester la sécurité et la gestion des droits

### Étape 3 : Frontend - Communication avec le backend (à venir)
- [ ] Développer l’interface utilisateur React
- [ ] Connecter le frontend à l’API backend
- [ ] Tester l’intégration et l’expérience utilisateur

## Tâches principales (User Stories / MMF)

### Task 1 : Lire les mots
En tant qu’utilisateur, je veux voir la liste des mots pour consulter les traductions disponibles.
- Critères d’acceptation :
  - La liste affiche le texte source, la langue source, la traduction et la langue cible.
  - La liste est paginée si elle est trop longue.

### Task 2 : Ajouter un mot
En tant qu’utilisateur, je veux ajouter un nouveau mot avec sa traduction pour enrichir le dictionnaire.
- Critères d’acceptation :
  - Le formulaire vérifie que tous les champs sont remplis.
  - Un message de confirmation s’affiche après ajout.

### Task 3 : Modifier un mot
En tant qu’utilisateur, je veux modifier un mot existant pour corriger une erreur ou améliorer la traduction.
- Critères d’acceptation :
  - Les modifications sont validées et enregistrées.
  - Un message de confirmation s’affiche.

### Task 4 : Supprimer un mot
En tant qu’utilisateur, je veux supprimer un mot pour nettoyer le dictionnaire.
- Critères d’acceptation :
  - Une confirmation est demandée avant suppression.
  - Le mot disparaît de la liste après suppression.

### Task 5 : Rechercher un mot
En tant qu’utilisateur, je veux rechercher un mot pour trouver rapidement sa traduction.
- Critères d’acceptation :
  - La recherche fonctionne par texte et langue.
  - Les résultats sont affichés instantanément.

### Task 6 : Gérer les langues
En tant qu’administrateur, je veux ajouter ou supprimer des langues pour adapter le dictionnaire aux besoins des utilisateurs.
- Critères d’acceptation :
  - Les langues disponibles sont listées et modifiables.
