# MixAI Frontend

MixAI Frontend est une application Angular permettant d'interagir avec le backend de MixAI, gérer les utilisateurs et leurs discussions avec les IA de Gemini. Cette application inclut une interface utilisateur pour renseigner une clé API Gemini et discuter avec les différents modèles d'IA de Google : Gemini. **La principale différence avec les interfaces web actuelles d'Intelligence Artificielle est que MixAI permet de changer de modèle au cours d'une même discussion.** Cela est particulièrement utile pour toujours converser avec le modèle expert approprié au fil de la discussion. Ce projet a été réalisé dans le cadre de l'unité d'enseignement : "Programmation Web", dirigé par Baptiste Roux, durant mon cursus d'ingénieur de spécialité Systèmes Embarqués Communicants à l'École Centrale de Nantes.

## Prérequis

- **Node.js** : Version 16 ou supérieure.
- **Angular CLI** : Installé globalement pour faciliter le développement.
- **Clé API Gemini** : Obligatoire pour l'utilisation des services Gemini, veuillez vous en procurer une à cette page : https://ai.google.dev/gemini-api/docs/api-key .

## Installation

1. Clonez le répertoire du projet :
   ```bash
   git clone https://github.com/BNJ02/MixAI_front.git
   cd MixAI_front
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

## Fonctionnalités

### 1. **Connexion et gestion des utilisateurs**
- Interface pour s'inscrire et se connecter.
- Gestion des profils utilisateurs.

### 2. **Discussions avec les IA de Gemini**
- Envoi de messages aux IA via l'API backend.
- Historique des discussions affiché en temps réel.
- Interface intuitive pour visualiser les réponses des IA.

### 3. **Personnalisation avec la clé API Gemini**
- Formulaire pour renseigner ou modifier la clé API Gemini.
- Validation et sauvegarde locale de la clé API en base de données.

## Lancer le projet

### En mode développement

1. Lancez le projet avec Angular CLI :
   ```bash
   ng serve
   ```

2. Accédez à l'application via :
   ```
   http://localhost:4200
   ```

### En mode production

1. Construisez l'application :
   ```bash
   ng build --prod
   ```

2. Servez les fichiers statiques avec un serveur comme `http-server` ou Nginx :
   ```bash
   npx http-server ./dist/mixai-frontend
   ```

## Structure du projet

```
src/
|   index.html
|   main.ts
|   structure_projet.txt
|   styles.scss
|   
+---app
|   |   app.component.html
|   |   app.component.scss
|   |   app.component.spec.ts
|   |   app.component.ts
|   |   app.config.ts
|   |   app.routes.ts
|   |   
|   +---alert
|   |       alert.component.html
|   |       alert.component.scss
|   |       alert.component.spec.ts
|   |       alert.component.ts
|   |       
|   +---animations
|   |       animations.ts
|   |       
|   +---chat
|   |       chat.component.html
|   |       chat.component.scss
|   |       chat.component.spec.ts
|   |       chat.component.ts
|   |       
|   +---connexion
|   |       connexion.component.html
|   |       connexion.component.scss
|   |       connexion.component.spec.ts
|   |       connexion.component.ts
|   |       
|   +---guards
|   |       anonymous.guard.ts
|   |       auth.guard.ts
|   |       
|   +---inscription
|   |       inscription.component.html
|   |       inscription.component.scss
|   |       inscription.component.spec.ts
|   |       inscription.component.ts
|   |       
|   +---interceptor
|   |       token.interceptor.ts
|   |       
|   +---profile
|   |       profile.component.html
|   |       profile.component.scss
|   |       profile.component.spec.ts
|   |       profile.component.ts
|   |       
|   +---services
|   |       auth.service.ts
|   |       discussion.service.ts
|   |       gemini.service.ts
|   |       signinSuccess.service.ts
|   |       signupSuccess.service.ts
|   |       user.service.ts
|   |       
|   +---types
|           discussion.interface.ts
|           entire_discussion.interface.ts
|           loginResponse.interface.ts
|           signinSuccess.interface.ts
|           signupSuccess.interface.ts
|           user.interface.ts
|           
+---assets
|   +---icones
|   |       carbage.png
|   |       fleche-droite.png
|   |       fleche-gauche.png
|   |       logout.png
|   |       plus.png
|   |       send.png
|   |       
|   +---images
|           logo_MixAI.png
|           logo_MixAI_comp.png
|           
+---environments
        environment.ts
```

## Contributions

Les contributions sont les bienvenues !

1. Forkez le projet.
2. Créez une nouvelle branche :
   ```bash
   git checkout -b feature/your-feature
   ```
3. Faites vos modifications et validez-les :
   ```bash
   git commit -m "Add your feature"
   ```
4. Poussez les modifications :
   ```bash
   git push origin feature/your-feature
   ```
5. Créez une pull request.
