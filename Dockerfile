
# Utilisez une image de base Node.js
FROM node:14-alpine

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie le package.json et le package-lock.json dans le répertoire de travail
COPY ./package*.json ./

COPY ./ ./

# Installe les dépendances du projet
RUN npm update -g
RUN npm install

EXPOSE 9000

# Définit les variables d'environnement pour la connexion à la base de données
ENV DB_HOST=localhost
ENV DB_PORT=3306
ENV DB_USER=user
ENV DB_PASSWORD=user
ENV DB_NAME=Webcand

RUN npm build

# Exécute la commande pour démarrer l'application
CMD ["npm", "run", "dev"]
