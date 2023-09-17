import { pool } from './db'; // make sure to import the correct pool

// Generate internal email for an admitted candidate
export const generateInternalEmail = async (firstName: string, lastName: string): Promise<string> => {
  let internalEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}.auditeur@lecnam.net`;

  // Check if there's another candidate with the same first and last name
  const query = 'SELECT COUNT(*) AS count FROM AdmittedCandidate WHERE internalEmail LIKE ?';
  const values = [`${firstName.toLowerCase()}.${lastName.toLowerCase()}%`];

  const existingCount = await new Promise<number>((resolve, reject) => {
    pool.query(query, values)
      .then(results => resolve(results[0].count))
      .catch(error => {
        console.error('Error while fetching admitted candidates:', error);
        reject(error);
      });
  });

  // If a candidate with the same first and last name exists, increment a number
  if (existingCount > 0) {
    let increment = 1;
    let tempInternalEmail = internalEmail;
    
    while (existingCount > 0) {
      const query = 'SELECT COUNT(*) AS count FROM AdmittedCandidate WHERE internalEmail = ?';
      const values = [tempInternalEmail];

      const count = await new Promise<number>((resolve, reject) => {
        pool.query(query, values)
          .then(results => resolve(results[0].count))
          .catch(error => {
            console.error('Error while fetching admitted candidates:', error);
            reject(error);
          });
      });

      if (count === 0) {
        internalEmail = tempInternalEmail;
        break;
      }

      increment++;
      tempInternalEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${increment}.auditor@lecnam.net`;
    }
  }

  return internalEmail;
};
