
# Utilisez une image de base Node.js
FROM node:14

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie le package.json et le package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installe les dépendances du projet
RUN npm install

# Copie tous les fichiers du répertoire actuel dans le répertoire de travail du conteneur
COPY . .

# Définit les variables d'environnement pour la connexion à la base de données
ENV DB_HOST=localhost
ENV DB_PORT=3306
ENV DB_USER=root
ENV DB_PASSWORD=root
ENV DB_NAME=Webcand

# Exécute la commande pour démarrer l'application
CMD ["npm", "start"]
