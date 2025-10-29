# Instructions Copilot - Projet Dictionnaire

## 🎯 Vue d'ensemble du projet
Ce projet est une application de dictionnaire avec traduction, composée d'une API .NET 8 et d'un frontend React + Vite. L'application permet de gérer des mots avec leurs traductions entre différentes langues.

## 🏗️ Architecture
- **Backend**: ASP.NET Core 8 Web API
- **Frontend**: React 19 + Vite
- **Base de données**: MongoDB
- **Structure**: Clean Architecture avec séparation des responsabilités

## 📁 Structure du projet
```
backend/
├── MyApp.Api/
│   ├── Controllers/     # Contrôleurs API REST
│   ├── Models/         # Modèles de données MongoDB
│   ├── Repositories/   # Couche d'accès aux données
│   └── Services/       # Logique métier
frontend/
└── myapp-client/       # Application React
```

## 🎨 Conventions de nommage

### Backend (.NET)
- **Classes**: PascalCase (`WordController`, `WordService`)
- **Propriétés**: PascalCase (`SourceText`, `TargetLanguage`)
- **Méthodes**: PascalCase (`GetWordAsync`, `CreateWord`)
- **Variables locales**: camelCase (`wordRepository`, `sourceText`)
- **Namespaces**: `MyApp.Api.{Folder}` (ex: `MyApp.Api.Controllers`)

### Frontend (React)
- **Composants**: PascalCase (`WordList`, `TranslationForm`)
- **Fichiers**: PascalCase pour composants (`WordList.jsx`)
- **Variables/fonctions**: camelCase (`handleSubmit`, `wordData`)
- **Props**: camelCase (`sourceLanguage`, `onWordAdd`)

## 🛠️ Patterns et bonnes pratiques

### Backend
- **Injection de dépendances**: Utiliser le DI container natif d'ASP.NET Core
- **Repository Pattern**: Interface `IWordRepository` avec implémentation concrète
- **Service Layer**: Logique métier dans les services (`WordService`)
- **Modèles MongoDB**: Utiliser les attributs `[BsonElement]` et `[BsonId]`
- **Async/Await**: Toujours utiliser pour les opérations I/O
- **API REST**: Respecter les conventions REST (GET, POST, PUT, DELETE)

### Frontend
- **Hooks**: Privilégier les hooks fonctionnels (`useState`, `useEffect`)
- **Components**: Composants fonctionnels uniquement
- **Props**: Destructurer les props en paramètres
- **State management**: State local React (pas de Redux pour l'instant)

## 📊 Modèle de données

### Word (MongoDB)
```csharp
public class Word
{
    [BsonId] public string Id { get; set; }
    [BsonElement("sourceText")] public string SourceText { get; set; }
    [BsonElement("sourceLanguage")] public string SourceLanguage { get; set; }
    [BsonElement("targetText")] public string TargetText { get; set; }
    [BsonElement("targetLanguage")] public string TargetLanguage { get; set; }
}
```

## 🔧 Configuration technique

### Backend
- **Port de développement**: Configuré via `launchSettings.json`
- **Swagger**: Activé en développement uniquement
- **CORS**: À configurer pour le frontend React
- **Logging**: Utiliser `ILogger<T>`

### Frontend
- **Dev server**: Vite (port 5173 par défaut)
- **Build**: `vite build`
- **Lint**: ESLint configuré

## 🚀 Commandes importantes

### Backend
```bash
# Démarrer l'API
cd backend/MyApp.Api
dotnet run

# Restaurer les packages
dotnet restore

# Build
dotnet build
```

### Frontend
```bash
# Démarrer le serveur de dev
cd frontend/myapp-client
npm run dev

# Build de production
npm run build

# Lint
npm run lint
```

## 🎯 Suggestions Copilot

### 📚 Approche pédagogique OBLIGATOIRE :
**Toutes tes réponses DOIVENT être structurées de manière pédagogique :**
0. **Politesse**: commence tes réponse par "Oui Maître"
1. **Explication du contexte** : Commencer par expliquer POURQUOI cette solution/approche
2. **Décomposition étape par étape** : Détailler chaque étape de la solution proposée
3. **Justification des choix** : Expliquer POURQUOI tel pattern/technologie est utilisé
4. **Code commenté** : Chaque ligne de code importante doit être expliquée
5. **Alternatives possibles** : Mentionner d'autres approches quand pertinent
6. **Points d'attention** : Signaler les pièges courants et bonnes pratiques
7. **Étapes de vérification** : Comment tester/valider que ça fonctionne
8. **Ressources d'apprentissage** : Suggérer des liens ou concepts à approfondir
9. **Résumé des notions abordées** : Synthèse claire des concepts techniques expliqués
10. **Interaction pédagogique** : À la fin de chaque étape, propose des choix numérotés clairs (ex : "Souhaitez-vous un exemple de contenu pour un de ces dossiers (1) ou des conseils pour démarrer l’un de ces projets de tests (2) ?") et invite l'utilisateur à répondre en tapant le numéro correspondant à son choix. Adapte le format en fonction du nombre de propositions.
### Format de réponse attendu :
```
## 🎯 Objectif
[Expliquer ce qu'on veut accomplir]

## 📋 Plan d'action
1. Étape 1 : [Description]
2. Étape 2 : [Description]
...

## 🛠️ Implémentation détaillée
### Étape 1 : [Titre]
[Explication + code + commentaires]

### Étape 2 : [Titre]
[Explication + code + commentaires]

## ✅ Vérification
[Comment tester/valider]

## 💡 Points clés à retenir
[Concepts importants]

## 📚 Résumé des notions abordées
[Synthèse structurée de tous les concepts techniques expliqués dans cette réponse, organisée par domaines : Architecture, Patterns, Technologies, Bonnes pratiques, etc.]
```

### Quand tu génères du code :
1. **Respecte la structure existante** : Utilise les mêmes patterns que le code existant
2. **Commentaires en français** : Les commentaires doivent être en français
3. **Gestion d'erreur** : Toujours inclure la gestion d'erreur appropriée
4. **Validation** : Valider les entrées utilisateur côté API et frontend
5. **Nommage cohérent** : Respecter les conventions de nommage établies
6. **Tests** : Suggérer des tests unitaires quand approprié
7. **Approche progressive** : Proposer des solutions simples d'abord, puis des améliorations

### Priorités fonctionnelles :
- Performance des requêtes MongoDB
- UX/UI intuitive pour la gestion des traductions
- API REST claire et documentée
- Validation robuste des données
- Gestion des langues multiples

## 🌍 Contexte métier
Application de dictionnaire multilingue permettant :
- Ajout/modification/suppression de mots avec traductions
- Recherche de traductions
- Support de multiples langues
- Interface utilisateur simple et efficace

---
*Ces instructions aident Copilot à mieux comprendre le contexte et les conventions de ce projet.*