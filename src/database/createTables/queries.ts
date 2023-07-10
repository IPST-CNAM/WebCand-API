import { Query } from './Query';

const queryList = new Query();
const candidatTableName = 'Candidat';
queryList.addQuery(candidatTableName, () => `
  CREATE TABLE IF NOT EXISTS ${candidatTableName} (
    id INT PRIMARY KEY AUTO_INCREMENT,
    mail VARCHAR(50) UNIQUE,
    motDePasse VARCHAR(100),
    nom VARCHAR(50),
    prenom VARCHAR(50),
    telephone VARCHAR(20),
    dateDeNaissance DATE,
    genre ENUM('M', 'F')
  )
`);

const noteScolaireTableName = 'NoteScolaire';
queryList.addQuery(noteScolaireTableName, () => `
  CREATE TABLE IF NOT EXISTS ${noteScolaireTableName} (
    id INT PRIMARY KEY AUTO_INCREMENT,
    matiere VARCHAR(100),
    note DOUBLE PRECISION,
    candidat_id INT,
    FOREIGN KEY (candidat_id) REFERENCES Candidat(id) ON DELETE SET NULL
  )
`);

const entrepriseTableName = 'Entreprise';
queryList.addQuery(entrepriseTableName, () => `
  CREATE TABLE IF NOT EXISTS ${entrepriseTableName} (
    id INT PRIMARY KEY AUTO_INCREMENT,
    mailEntreprise VARCHAR(50) UNIQUE,
    telephone VARCHAR(50),
    domaineActivite VARCHAR(50),
    taille VARCHAR(50)
  )
`);

const candidatAdmisTableName = 'CandidatAdmis';
queryList.addQuery(candidatAdmisTableName, () => `
  CREATE TABLE IF NOT EXISTS ${candidatAdmisTableName} (
    id INT PRIMARY KEY AUTO_INCREMENT,
    mailInterne VARCHAR(50),
    candidat_id INT,
    FOREIGN KEY (candidat_id) REFERENCES Candidat(id) ON DELETE SET NULL
  )
`);

const experienceProTableName = 'ExperiencePro';
queryList.addQuery(experienceProTableName, () => `
  CREATE TABLE IF NOT EXISTS ${experienceProTableName} (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(50),
    description TEXT,
    candidat_id INT,
    FOREIGN KEY (candidat_id) REFERENCES Candidat(id) ON DELETE SET NULL
  )
`);

const competenceTableName = 'Competence';
queryList.addQuery(competenceTableName, () => `
  CREATE TABLE IF NOT EXISTS ${competenceTableName} (
    id INT PRIMARY KEY AUTO_INCREMENT,
    intitule VARCHAR(100),
    candidat_id INT,
    FOREIGN KEY (candidat_id) REFERENCES Candidat(id) ON DELETE SET NULL
  )
`);

const formationTableName = 'Formation';
queryList.addQuery(formationTableName, () => `
  CREATE TABLE IF NOT EXISTS ${formationTableName} (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(50)
  )
`);

const administratifTableName = 'Administratif';
queryList.addQuery(administratifTableName, () => `
CREATE TABLE IF NOT EXISTS ${administratifTableName} (
  id INT PRIMARY KEY AUTO_INCREMENT,
  mail VARCHAR(50) UNIQUE,
  nom VARCHAR(50),
  prenom VARCHAR(50),
  telephone VARCHAR(20),
  dateDeNaissance DATE
)
`);

const offreAlternanceTableName = 'OffreAlternance';
queryList.addQuery(offreAlternanceTableName, () => `
  CREATE TABLE IF NOT EXISTS ${offreAlternanceTableName} (
    id INT PRIMARY KEY AUTO_INCREMENT,
    intitule VARCHAR(100),
    description TEXT,
    duree INT,
    dateDebut DATE,
    niveauEtudeRequis VARCHAR(100),
    entreprise_id INT,
    FOREIGN KEY (entreprise_id) REFERENCES Entreprise(id) ON DELETE SET NULL
  )
`);

const lettreMotivationTableName = 'LettreMotivation';
queryList.addQuery(lettreMotivationTableName, () => `
  CREATE TABLE IF NOT EXISTS ${lettreMotivationTableName} (
    id INT PRIMARY KEY AUTO_INCREMENT
  )
`);

const cvTableName = 'CV';
queryList.addQuery(cvTableName, () => `
  CREATE TABLE IF NOT EXISTS ${cvTableName} (
    id INT PRIMARY KEY AUTO_INCREMENT,
    contenu_fichier LONGBLOB
  )
`);

const candidatureTableName = 'Candidature';
queryList.addQuery(candidatureTableName, () => `
  CREATE TABLE IF NOT EXISTS ${candidatureTableName} (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE,
    status VARCHAR(50),
    candidat_id INT,
    formation_id INT,
    lettreMotivation_id INT,
    cv_id INT,
    estAdmis BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (candidat_id) REFERENCES Candidat(id) ON DELETE SET NULL,
    FOREIGN KEY (formation_id) REFERENCES Formation(id) ON DELETE SET NULL,
    FOREIGN KEY (lettreMotivation_id) REFERENCES LettreMotivation(id) ON DELETE SET NULL,
    FOREIGN KEY (cv_id) REFERENCES CV(id) ON DELETE SET NULL
  )
`);

const rendezvousTableName = 'RendezVous';
queryList.addQuery(rendezvousTableName, () => `
  CREATE TABLE IF NOT EXISTS ${rendezvousTableName} (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE,
    heure TIME,
    estDisponible BOOLEAN DEFAULT TRUE,
    candidat_id INT,
    FOREIGN KEY (candidat_id) REFERENCES Candidat(id) ON DELETE SET NULL
  )
`);

const contratTableName = 'Contrat';
queryList.addQuery(contratTableName, () => `
  CREATE TABLE IF NOT EXISTS ${contratTableName} (
    id INT PRIMARY KEY AUTO_INCREMENT,
    candidatAdmis_id INT,
    offreAlternance_id INT,
    dateDebut DATE,
    dateFin DATE,
    salaire DECIMAL(10,2),
    FOREIGN KEY (candidatAdmis_id) REFERENCES CandidatAdmis(id) ON DELETE CASCADE,
    FOREIGN KEY (offreAlternance_id) REFERENCES OffreAlternance(id) ON DELETE CASCADE
  )
`);

export default queryList;
