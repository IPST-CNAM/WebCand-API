/* import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { RegisteredUser } from '../utils/interface';

// Contrôleur pour gérer les opérations liées aux utilisateurs
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: RegisteredUser[] = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
 */