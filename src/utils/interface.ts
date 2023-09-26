// Interface pour décrire la structure d'un utilisateur enregistré
export interface RegisteredUser {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    birth_date: string; // Vous pouvez utiliser le type Date si vous le préférez
  }
  
  // Interface pour décrire la structure d'une compétence (skill)
  export interface Skill {
    title: string;
    // Vous pouvez ajouter d'autres propriétés au besoin
  }
  
  // Interface pour décrire la structure d'un document
  export interface Document {
    // Définissez la structure de votre document ici
  }
  