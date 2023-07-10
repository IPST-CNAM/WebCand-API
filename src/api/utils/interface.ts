export interface Candidat {
    id: number;
    mail: string;
    motDePasse: string;
    nom: string;
    prenom: string;
    telephone: string;
    dateDeNaissance: string;
    genre: 'M' | 'F';
}

export interface Competence {
    id: number;
    intitule: number;
    candidat_id: number;
}

export interface Document {
    id: number;
    nom: string;
    fichier: string;
    contenu_fichier: string;
    candidatureId: number;
}
export interface Contrat {
    id: number;
    candidatAdmis_id: number;
    offreAlternance_id: number;
    dateDebut: string;
    dateFin: string;
    salaire: number;
}