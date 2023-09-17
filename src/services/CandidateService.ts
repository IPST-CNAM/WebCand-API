import { pool } from "../utils/db";
import { Candidate, Skill, Document } from '../utils/interface';



// Create a candidate
export const createCandidate = async (candidate: Candidate): Promise<number> => {
    const query = `
      INSERT INTO RegisteredUser (email, password, first_name, last_name, phone_number, birth_date)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      candidate.email,
      candidate.password,
      candidate.first_name,
      candidate.last_name,
      candidate.phone_number,
      candidate.birth_date
    ];
  
    return new Promise<number>((resolve, reject) => {
      pool.query(query, values)
        .then(result => resolve(result.insertId))
        .catch(error => {
          console.error('Error during the candidate creation:', error);
          reject(error);
        });
    });
  };
  
  // Add skill to a candidate
  export const addSkillToCandidate = async (candidateId: number, skill: Skill): Promise<void> => {
    const query = 'INSERT INTO Skill (title, candidate_id) VALUES (?, ?)';
    const values = [skill.title, candidateId];
  
    return new Promise<void>((resolve, reject) => {
      pool.query(query, values)
        .then(() => resolve())
        .catch(error => {
          console.error('Error during adding skill to candidate:', error);
          reject(error);
        });
    });
  };
  
  // Delete a candidate
  export const deleteCandidate = async (candidateId: number): Promise<void> => {
    const query = 'DELETE FROM RegisteredUser WHERE id_registered_user = ?';
  
    return new Promise<void>((resolve, reject) => {
      pool.query(query, [candidateId])
        .then(() => resolve())
        .catch(error => {
          console.error('Error during the candidate deletion:', error);
          reject(error);
        });
    });
  };


  export const applyForCourse = async (candidateId: number, courseId: number, coverLetterId: number, ResumeId: number): Promise<number> => {
    const query = `
      INSERT INTO Application (date, status, candidate_id, course_id, coverLetter_id, Resume_id)
      VALUES (NOW(), 'Pending', ?, ?, ?, ?)
    `;
    const values = [candidateId, courseId, coverLetterId, ResumeId];
  
    return new Promise<number>((resolve, reject) => {
      pool.query(query, values)
        .then(results => resolve(results.insertId))
        .catch(error => {
          console.error('Error while applying for the course:', error);
          reject(error);
        });
    });
  };
  
  // Delete an application
  export const deleteApplication = async (applicationId: number): Promise<void> => {
    const query = 'DELETE FROM Application WHERE id = ?';
  
    return new Promise<void>((resolve, reject) => {
      pool.query(query, [applicationId])
        .then(() => resolve())
        .catch(error => {
          console.error('Error while deleting the application:', error);
          reject(error);
        });
    });
  };
  
  // View company catalog
  export const viewCompanyCatalog = async (): Promise<any[]> => {
    const query = 'SELECT * FROM Company';
  
    return new Promise<any[]>((resolve, reject) => {
      pool.query(query)
        .then(results => resolve(results))
        .catch(error => {
          console.error('Error while viewing the company catalog:', error);
          reject(error);
        });
    });
  };
  
  // View company profile
  export const viewCompanyProfile = async (companyId: number): Promise<any> => {
    const query = 'SELECT * FROM Company WHERE id = ?';
  
    return new Promise<any>((resolve, reject) => {
      pool.query(query, [companyId])
        .then(results => resolve(results[0] ?? null))
        .catch(error => {
          console.error('Error while viewing the company profile:', error);
          reject(error);
        });
    });
  };
  
  // View offer catalog
  export const viewOfferCatalog = async (offerId: number): Promise<any> => {
    const query = 'SELECT * FROM CompanyOffer WHERE id = ?';
  
    return new Promise<any>((resolve, reject) => {
      pool.query(query, [offerId])
        .then(results => resolve(results[0] ?? null))
        .catch(error => {
          console.error('Error while viewing the offer catalog:', error);
          reject(error);
        });
    });
  };
  
  // Add a Resume for a candidate
  export const addResume = async (url: String): Promise<number> => {
    const query = 'INSERT INTO Resume (url) VALUES (?)';
    const values = [url];
  
    return new Promise<number>((resolve, reject) => {
      pool.query(query, values)
        .then(results => resolve(results.insertId))
        .catch(error => {
          console.error('Error while adding the Resume:', error);
          reject(error);
        });
    });
  };
  
  // Edit an existing Resume
  export const editResume = async (id: number, newURL: string): Promise<void> => {
    const query = 'UPDATE Resume SET url = ? WHERE id_resume = ?';
    const values = [newURL, id];
  
    return new Promise<void>((resolve, reject) => {
      pool.query(query, values)
        .then(() => resolve())
        .catch(error => {
          console.error('Error while editing the Resume:', error);
          reject(error);
        });
    });
  };
  
  // Delete a Resume
  export const deleteResume = async (ResumeId: number): Promise<void> => {
    const query = 'DELETE FROM Resume WHERE id_resume = ?';
  
    return new Promise<void>((resolve, reject) => {
      pool.query(query, [ResumeId])
        .then(() => resolve())
        .catch(error => {
          console.error('Error while deleting the Resume:', error);
          reject(error);
        });
    });
  };
