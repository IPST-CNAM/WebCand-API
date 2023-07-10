import { connection } from '../../database/createDatabase';
import { Candidat, Competence, Document } from '../utils/interfaces';

// Créer un candidat
export const createCandidat = async (candidat: Candidat) => {
  const query = `
    INSERT INTO Candidat (mail, motDePasse, nom, prenom, telephone, dateDeNaissance, genre)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    candidat.mail,
    candidat.motDePasse,
    candidat.nom,
    candidat.prenom,
    candidat.telephone,
    candidat.dateDeNaissance,
    candidat.genre
  ];

  return new Promise<number>((resolve, reject) => {
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Erreur lors de la création du candidat :', error);
        reject(error);
        return;
      }
      resolve(results.insertId);
    });
  });
};

export const ajouterCompetenceCandidat = async (candidatId: number, competence: Competence) => {
  const query = 'INSERT INTO competence VALUES (intitule, candidat_id) WHERE id = ?';

  const values = [
    competence.intitule,
    competence.candidat_id
  ];

  return new Promise<void>((resolve, reject) => {
    connection.query(query, [candidatId], (error) => {
      if (error) {
        console.error('Erreur lors de la suppression du candidat :', error);
        reject(error);
        return;
      }
      resolve();
    });
  });
};

// Supprimer un candidat
export const deleteCandidat = async (candidatId: number) => {
  const query = 'DELETE FROM Candidat WHERE id = ?';

  return new Promise<void>((resolve, reject) => {
    connection.query(query, [candidatId], (error) => {
      if (error) {
        console.error('Erreur lors de la suppression du candidat :', error);
        reject(error);
        return;
      }
      resolve();
    });
  });
};



// Candidater à une formation
export const candidaterFormation = async (candidatId: number, formationId: number, lettreMotivationId: number, cvId: number) => {
  const query = `
    INSERT INTO Candidature (date, status, candidat_id, formation_id, lettreMotivation_id, cv_id)
    VALUES (NOW(), 'En attente', ?, ?, ?, ?)
  `;
  const values = [candidatId, formationId, lettreMotivationId, cvId];

  return new Promise<number>((resolve, reject) => {
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Erreur lors de la candidature à la formation :', error);
        reject(error);
        return;
      }
      resolve(results.insertId);
    });
  });
};

// Supprimer une candidature d'une formation
export const deleteCandidatureFormation = async (candidatureId: number) => {
  const query = 'DELETE FROM Candidature WHERE id = ?';

  return new Promise<void>((resolve, reject) => {
    connection.query(query, [candidatureId], (error) => {
      if (error) {
        console.error('Erreur lors de la suppression de la candidature :', error);
        reject(error);
        return;
      }
      resolve();
    });
  });
};

// Déposer un document
export const deposerDocument = async (document: Document) => {
  const query = `
    INSERT INTO Document (nom, fichier, candidature_id)
    VALUES (?, ?, ?)
  `;
  const values = [document.nom, document.fichier, document.candidatureId];

  return new Promise<number>((resolve, reject) => {
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Erreur lors du dépôt du document :', error);
        reject(error);
        return;
      }
      resolve(results.insertId);
    });
  });
};

// Consulter le catalogue entreprise
export const consulterCatalogueEntreprise = async () => {
  const query = 'SELECT * FROM Entreprise';

  return new Promise<any[]>((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Erreur lors de la consultation du catalogue entreprise :', error);
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};

// Consulter une fiche entreprise
export const consulterFicheEntreprise = async (entrepriseId: number) => {
  const query = 'SELECT * FROM Entreprise WHERE id = ?';

  return new Promise<any>((resolve, reject) => {
    connection.query(query, [entrepriseId], (error, results) => {
      if (error) {
        console.error('Erreur lors de la consultation de la fiche entreprise :', error);
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

// Consulter le catalogue d'une offre
export const consulterCatalogueOffre = async (offreId: number) => {
  const query = 'SELECT * FROM OffreAlternance WHERE id = ?';

  return new Promise<any>((resolve, reject) => {
    connection.query(query, [offreId], (error, results) => {
      if (error) {
        console.error('Erreur lors de la consultation du catalogue offre :', error);
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

// Ajouter un CV pour un candidat
export const ajouterCV = async (cv: Document): Promise<number> => {
  const query = `
    INSERT INTO CV (contenu_fichier)
    VALUES (?)
  `;
  const values = [cv.contenu_fichier];

  return new Promise<number>((resolve, reject) => {
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Erreur lors de l\'ajout du CV :', error);
        reject(error);
        return;
      }
      resolve(results.insertId);
    });
  });
};

// Modifier un CV existant
export const modifierCV = async (cvId: number, nouveauContenu: string): Promise<void> => {
  const query = 'UPDATE CV SET contenu_fichier = ? WHERE id = ?';
  const values = [nouveauContenu, cvId];

  return new Promise<void>((resolve, reject) => {
    connection.query(query, values, (error) => {
      if (error) {
        console.error('Erreur lors de la modification du CV :', error);
        reject(error);
        return;
      }
      resolve();
    });
  });
};

// Supprimer un CV
export const supprimerCV = async (cvId: number) => {
  const query = 'DELETE FROM CV WHERE id = ?';

  return new Promise<void>((resolve, reject) => {
    connection.query(query, [cvId], (error) => {
      if (error) {
        console.error('Erreur lors de la suppression du CV :', error);
        reject(error);
        return;
      }
      resolve();
    });
  });
};




