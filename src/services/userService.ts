/* // userService.ts

import { pool } from "../utils/db";
import { RegisteredUser } from '../utils/interface';

// Récupérez tous les utilisateurs sans l'ID
export const getAllUsers = async (): Promise<RegisteredUser[]> => {
  try {
    const query = `
      SELECT email, password, first_name, last_name, phone_number, birth_date
      FROM RegisteredUser
    `;

    const [users] = await pool.query(query);

    // users contiendra tous les utilisateurs avec uniquement les colonnes spécifiées (email, password, first_name, last_name, phone_number, birth_date)
    return users;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    throw error;
  }
};

// Exportez explicitement la fonction getAllUsers
//export { getAllUsers };
 */