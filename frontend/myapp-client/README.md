
# MyApp - Frontend

## Description

Ce dossier contient l’application cliente (frontend) de MyApp, développée avec React et Vite. Elle permet aux utilisateurs d’interagir avec l’API backend et d’afficher les données de manière conviviale.

## Architecture

- **Frontend (ce projet)** : Application React qui consomme l’API backend.
- **Backend** : API REST (voir dossier backend) qui fournit les données et la logique métier.

## Installation et lancement

1. Cloner le dépôt
2. Ouvrir le dossier `frontend/myapp-client`
3. Installer les dépendances :
	```sh
	npm install
	```
4. Lancer l’application en développement :
	```sh
	npm run dev
	```
5. Accéder à l’application dans le navigateur (l’URL s’affiche dans la console, ex : http://localhost:5173)

## Notes

- Le frontend communique avec l’API backend via des requêtes HTTP.
- Adapter l’URL de l’API dans le code si besoin (selon l’environnement de développement ou de production).
