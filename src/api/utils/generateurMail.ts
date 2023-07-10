import { connection } from '../../database/createDatabase';

// Générer le mail interne d'un candidat admis
export const genererMailInterne = async (prenom: string, nom: string): Promise<string> => {
  let mailInterne = `${prenom.toLowerCase()}.${nom.toLowerCase()}.auditeur@lecnam.net`;

  // Vérifier s'il y a un candidat avec le même prénom et nom
  const query = 'SELECT COUNT(*) AS count FROM CandidatAdmis WHERE mailInterne LIKE ?';
  const values = [`${prenom.toLowerCase()}.${nom.toLowerCase()}%`];

  const existingCount = await new Promise<number>((resolve, reject) => {
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Erreur lors de la récupération des candidats admis :', error);
        reject(error);
        return;
      }
      resolve(results[0].count);
    });
  });

  // Si un candidat avec le même prénom et nom existe, incrémenter un nombre
  if (existingCount > 0) {
    let increment = 1;
    let tempMailInterne = mailInterne;
    
    while (existingCount > 0) {
      const query = 'SELECT COUNT(*) AS count FROM CandidatAdmis WHERE mailInterne = ?';
      const values = [tempMailInterne];

      const count = await new Promise<number>((resolve, reject) => {
        connection.query(query, values, (error, results) => {
          if (error) {
            console.error('Erreur lors de la récupération des candidats admis :', error);
            reject(error);
            return;
          }
          resolve(results[0].count);
        });
      });

      if (count === 0) {
        mailInterne = tempMailInterne;
        break;
      }

      increment++;
      tempMailInterne = `${prenom.toLowerCase()}.${nom.toLowerCase()}${increment}.auditeur@lecnam.net`;
    }
  }

  return mailInterne;
};
