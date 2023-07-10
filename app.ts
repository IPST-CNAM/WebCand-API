import express from 'express';
import dotenv from 'dotenv';
import candidatRouter from './src/api/routes/candidatRoutes';
import { setupDatabase } from './src/database/createDatabase';
import { createTables } from './src/database/createTables/databaseOperations';
import candidatAdmisRouter from './src/api/routes/candidatAdmis';
import responsablePedadogique from './src/api/routes/responsablePedadogiqueRoute';

dotenv.config();

setupDatabase
  .then(() => {
    // Connexion à la base de données
    console.log('Connecté à la base de données');
    createTables()
    .then(() => {
    }).catch((error) => {
      console.error('Erreur lors de la création des tables :', error);
      throw error;
    });

    // Création de l'application Express
    const app = express();
    app.use(express.json());

    // Routes
    app.use('/', candidatRouter);
    app.use('/', candidatAdmisRouter);
    app.use('/', responsablePedadogique);

    // Lancement du serveur
    app.listen(3000, () => {
      console.log('Serveur en écoute sur le port 3000');
    });
  })
  .catch((error) => {
    console.error('Erreur lors de la configuration de la base de données :', error);
  });
  
