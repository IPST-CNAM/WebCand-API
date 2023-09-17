export interface Candidate {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    birthDate: string;
    gender: 'M' | 'F';
}

export interface Skill {
    id: number;
    title: number;
    candidateId: number;
}

export interface Document {
    id: number;
    name: string;
    file: string;
    fileContent: string;
    applicationId: number;
}

export interface Contract {
    id: number;
    admittedCandidateId: number;
    alternateOfferId: number;
    startDate: string;
    endDate: string;
    salary: number;
}
