import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

// Créer une nouvelle connexion sans spécifier la base de données
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

const setupDatabase = new Promise<void>((resolve, reject) => {
  connection.connect((error) => {
    if (error) {
      console.error('Erreur lors de la connexion à la base de données :', error);
      reject(error);
      return;
    }

    // Créer la base de données
    connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`, (error) => {
      if (error) {
        console.error('Erreur lors de la création de la base de données :', error);
        reject(error);
        return;
      }
      console.log(`Base de données ${process.env.DB_DATABASE} créée ou existante`);

      // Changer la connexion pour utiliser la nouvelle base de données
      connection.changeUser({ database: process.env.DB_DATABASE }, (error) => {
        if (error) {
          console.error('Erreur lors de la sélection de la base de données :', error);
          reject(error);
          return;
        }
        console.log(`Connecté à la base de données ${process.env.DB_DATABASE}`);
        resolve();
      });
    });
  });
});

export { connection, setupDatabase };
