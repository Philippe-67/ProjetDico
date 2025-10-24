# 📚 Dictionnaire Multilingue

Une application web complète pour gérer un dictionnaire avec traductions entre différentes langues.

## 🎯 Fonctionnalités

- ✅ Ajout de mots avec traductions
- ✅ Recherche et consultation des mots
- ✅ Modification et suppression
- ✅ Support multilingue
- ✅ Interface utilisateur intuitive
- ✅ API REST complète

## 🏗️ Architecture

### Backend
- **Framework** : ASP.NET Core 8
- **Base de données** : MongoDB
- **Architecture** : Clean Architecture (Controller/Service/Repository)
- **Documentation** : Swagger/OpenAPI

### Frontend  
- **Framework** : React 19
- **Build Tool** : Vite
- **Styling** : CSS moderne

## 🚀 Installation et démarrage

### Prérequis
- .NET 8 SDK
- Node.js (v18+)
- MongoDB (local ou distant)

### Backend (API)
```bash
# Naviguer vers le backend
cd backend/MyApp.Api

# Restaurer les dépendances
dotnet restore

# Démarrer l'API
dotnet run
```

L'API sera accessible sur `https://localhost:7XXX` avec Swagger UI.

### Frontend (React)
```bash
# Naviguer vers le frontend
cd frontend/myapp-client

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`.

### Configuration MongoDB

Modifier `backend/MyApp.Api/appsettings.json` :
```json
{
  "MongoDb": {
    "ConnectionString": "mongodb://localhost:27017",
    "Database": "VotreBaseDeDonnees"
  }
}
```

## 📡 API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/word` | Récupérer tous les mots |
| GET | `/api/word/{id}` | Récupérer un mot spécifique |
| POST | `/api/word` | Créer un nouveau mot |
| PUT | `/api/word/{id}` | Modifier un mot existant |
| DELETE | `/api/word/{id}` | Supprimer un mot |

## 🧪 Tests

```bash
# Tests backend
cd backend/MyApp.Api
dotnet test

# Tests frontend
cd frontend/myapp-client  
npm test
```

## 🔧 Technologies utilisées

### Backend
- ASP.NET Core 8
- MongoDB.Driver
- Swagger/OpenAPI
- Microsoft.Extensions.Logging

### Frontend
- React 19
- Vite
- ESLint

## 📁 Structure du projet

```
ProjetDico/
├── backend/
│   └── MyApp.Api/
│       ├── Controllers/     # API Controllers
│       ├── Models/         # Data Models
│       ├── Repositories/   # Data Access Layer
│       ├── Services/       # Business Logic
│       └── Program.cs      # Application Entry Point
├── frontend/
│   └── myapp-client/
│       ├── src/
│       ├── public/
│       └── package.json
└── README.md
```

## 🤝 Contribution

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 License

Ce projet est sous license MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📧 Contact

Votre Nom - [@votre_twitter](https://twitter.com/votre_twitter) - email@example.com

Lien du projet : [https://github.com/votre_username/ProjetDico](https://github.com/votre_username/ProjetDico)

## 🎉 Remerciements

- [ASP.NET Core](https://docs.microsoft.com/aspnet/core)
- [React](https://reactjs.org)
- [MongoDB](https://www.mongodb.com)
- [Vite](https://vitejs.dev)