import { connection } from '../../database/createDatabase';
import { Contrat } from '../utils/interfaces';


export const prendreRDV = async (rdvId: number, candidatId: number) => {
    const query = 'UPDATE RendezVous SET estDisponible = false, candidat_id = ? WHERE id = ?';

    return new Promise<void>((resolve, reject) => {
        connection.query(query, [candidatId, rdvId], (error) => {
            if (error) {
                console.error('Erreur lors de la prise du rendez-vous :', error);
                reject(error);
                return;
            }
            resolve();
        });
    });
};
export const preRemplirConvention = async (cvId: number) => {
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

// Remplir un contrat d'alternance pour un candidat admis
export const remplirContratAlternance = async (
    candidatId: number,
    offreId: number,
    contrat: Contrat
  ): Promise<void> => {
    const query = `
      INSERT INTO Contrat (candidatAdmis_id, offreAlternance_id, dateDebut, dateFin, salaire)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      candidatId,
      offreId,
      contrat.dateDebut,
      contrat.dateFin,
      contrat.salaire
    ];
  
    return new Promise<void>((resolve, reject) => {
      connection.query(query, values, (error) => {
        if (error) {
          console.error('Erreur lors du remplissage du contrat d\'alternance :', error);
          reject(error);
          return;
        }
        resolve();
      });
    });
  };

  // Supprimer une candidature d'une offre d'alternance
export const supprimerCandidatureOffreAlternance = async (candidatureId: number): Promise<void> => {
    const query = 'DELETE FROM Candidature WHERE id = ?';
  
    return new Promise<void>((resolve, reject) => {
      connection.query(query, [candidatureId], (error) => {
        if (error) {
          console.error('Erreur lors de la suppression de la candidature d\'une offre d\'alternance :', error);
          reject(error);
          return;
        }
        resolve();
      });
    });
  };
  
  // Candidater à une offre d'alternance
  export const candidaterOffreAlternance = async (
    candidatId: number,
    offreId: number,
    lettreMotivationId: number,
    cvId: number
  ): Promise<number> => {
    const query = `
      INSERT INTO Candidature (date, status, candidat_id, offreAlternance_id, lettreMotivation_id, cv_id)
      VALUES (NOW(), 'En attente', ?, ?, ?, ?)
    `;
    const values = [candidatId, offreId, lettreMotivationId, cvId];
  
    return new Promise<number>((resolve, reject) => {
      connection.query(query, values, (error, results) => {
        if (error) {
          console.error('Erreur lors de la candidature à une offre d\'alternance :', error);
          reject(error);
          return;
        }
        resolve(results.insertId);
      });
    });
  };
  
  // Signer un contrat d'alternance
  export const signerContratAlternance = async (
    candidatId: number,
    offreId: number,
    contrat: Contrat
  ): Promise<void> => {
    const query = `
      INSERT INTO Contrat (candidatAdmis_id, offreAlternance_id, dateDebut, dateFin, salaire)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      candidatId,
      offreId,
      contrat.dateDebut,
      contrat.dateFin,
      contrat.salaire
    ];
  
    return new Promise<void>((resolve, reject) => {
      connection.query(query, values, (error) => {
        if (error) {
          console.error('Erreur lors de la signature du contrat d\'alternance :', error);
          reject(error);
          return;
        }
        resolve();
      });
    });
  };
  