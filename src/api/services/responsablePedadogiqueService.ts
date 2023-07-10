import { connection } from '../../database/createDatabase';
import { genererMailInterne } from '../utils/generateurMail'

export const accepterCandidature = async (candidatureId: number): Promise<void> => {
    // Récupérer les informations de la candidature
    const candidatureQuery = 'SELECT * FROM Candidature WHERE id = ?';
    const candidatureValues = [candidatureId];

    const candidature = await new Promise<any>((resolve, reject) => {
        connection.query(candidatureQuery, candidatureValues, (error, results) => {
            if (error) {
                console.error('Erreur lors de la récupération de la candidature :', error);
                reject(error);
                return;
            }
            if (results.length === 0) {
                reject(new Error('Candidature introuvable'));
                return;
            }
            resolve(results[0]);
        });
    });

    // Insérer le candidat admis
    const candidatQuery = 'INSERT INTO CandidatAdmis (mailInterne, candidat_id) VALUES (?, ?)';
    const candidatValues = [await genererMailInterne(candidature.prenom, candidature.nom), candidature.candidat_id];

    await new Promise<void>((resolve, reject) => {
        connection.query(candidatQuery, candidatValues, (error) => {
            if (error) {
                console.error('Erreur lors de l\'insertion du candidat admis :', error);
                reject(error);
                return;
            }
            resolve();
        });
    });

    // Mettre à jour le statut de la candidature
    const updateQuery = 'UPDATE Candidature SET status = ? WHERE id = ?';
    const updateValues = ['Admis', candidatureId];

    await new Promise<void>((resolve, reject) => {
        connection.query(updateQuery, updateValues, (error) => {
            if (error) {
                console.error('Erreur lors de la mise à jour de la candidature :', error);
                reject(error);
                return;
            }
            resolve();
        });
    });
};

export const refuserCandidature = async (candidatureId: number): Promise<void> => {
    const updateQuery = 'UPDATE Candidature SET status = ? WHERE id = ?';
    const updateValues = ['Refusé', candidatureId];
  
    await new Promise<void>((resolve, reject) => {
      connection.query(updateQuery, updateValues, (error) => {
        if (error) {
          console.error('Erreur lors de la mise à jour de la candidature :', error);
          reject(error);
          return;
        }
        resolve();
      });
    });
  };


export const visualiserLettreMotivation = async (lettreMotivationId: number): Promise<any> => {
  const query = 'SELECT * FROM LettreMotivation WHERE id = ?';
  const values = [lettreMotivationId];

  return new Promise<any>((resolve, reject) => {
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Erreur lors de la récupération de la lettre de motivation :', error);
        reject(error);
        return;
      }
      if (results.length === 0) {
        resolve(null);
      } else {
        resolve(results[0]);
      }
    });
  });
};

export const visualiserCV = async (cvId: number): Promise<any> => {
  const query = 'SELECT * FROM CV WHERE id = ?';
  const values = [cvId];

  return new Promise<any>((resolve, reject) => {
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Erreur lors de la récupération du CV :', error);
        reject(error);
        return;
      }
      if (results.length === 0) {
        resolve(null);
      } else {
        resolve(results[0]);
      }
    });
  });
};

export const consulterDossier = async (candidatId: number): Promise<any> => {
  const candidatQuery = 'SELECT * FROM Candidat WHERE id = ?';
  const candidatValues = [candidatId];

  const lettreMotivationQuery = 'SELECT * FROM LettreMotivation WHERE candidat_id = ?';
  const lettreMotivationValues = [candidatId];

  const cvQuery = 'SELECT * FROM CV WHERE candidat_id = ?';
  const cvValues = [candidatId];

  const candidat = await new Promise<any>((resolve, reject) => {
    connection.query(candidatQuery, candidatValues, (error, results) => {
      if (error) {
        console.error('Erreur lors de la récupération du candidat :', error);
        reject(error);
        return;
      }
      if (results.length === 0) {
        resolve(null);
      } else {
        resolve(results[0]);
      }
    });
  });

  const lettreMotivation = await new Promise<any>((resolve, reject) => {
    connection.query(lettreMotivationQuery, lettreMotivationValues, (error, results) => {
      if (error) {
        console.error('Erreur lors de la récupération de la lettre de motivation :', error);
        reject(error);
        return;
      }
      if (results.length === 0) {
        resolve(null);
      } else {
        resolve(results[0]);
      }
    });
  });

  const cv = await new Promise<any>((resolve, reject) => {
    connection.query(cvQuery, cvValues, (error, results) => {
      if (error) {
        console.error('Erreur lors de la récupération du CV :', error);
        reject(error);
        return;
      }
      if (results.length === 0) {
        resolve(null);
      } else {
        resolve(results[0]);
      }
    });
  });

  return {
    nom: candidat?.nom,
    prenom: candidat?.prenom,
    lettre_motivation: lettreMotivation?.contenu,
    cv: cv?.contenu_fichier,
  };
};

export const afficherListeCandidatures = async (): Promise<any[]> => {
  const query = 'SELECT * FROM Candidature';

  return new Promise<any[]>((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Erreur lors de la récupération de la liste des candidatures :', error);
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};

