import { pool } from "../utils/db";


// Book an appointment
export const bookAppointment = async (candidateId: number, appointmentDate: number, appointmentTime: number): Promise<void> => {
    const query = 'INSERT INTO Appointment (appointment_date, appointment_time, id_registered_user) VALUES (?, ?, ?, ?, ?)';
    const [rows] = await pool.execute(query, [appointmentDate, appointmentTime, candidateId]);
  };
  
  
  // Delete Resume
  export const deleteResume = async (resumeId: number): Promise<void> => {
    const query = 'DELETE FROM Resume WHERE id_resume = ?';
    const [rows] = await pool.execute(query, [resumeId]);
  };
  
  // Fill Contract for Admitted Candidate
  export const fillContractForAdmittedCandidate = async (
    candidateId: number,
    offerId: number,
    contractStartDate: number,
    contractEndDate: number
  ): Promise<void> => {
    const query = `
      INSERT INTO Application (application_date, status)
      VALUES (?, ?)
    `;
    const [rows] = await pool.execute(query, [contractStartDate, "Admitted"]);
  };
  
  // Remove Application from Company Offer
  export const removeApplicationFromCompanyOffer = async (applicationId: number): Promise<void> => {
    const query = 'DELETE FROM Application WHERE id_application = ?';
    const [rows] = await pool.execute(query, [applicationId]);
  };
  
  // Apply to a Company Offer
  export const applyToCompanyOffer = async (
    candidateId: number,
    offerId: number,
    coverLetterId: number,
    resumeId: number
  ): Promise<void> => {
    const query = `
      INSERT INTO Application (application_date, status)
      VALUES (?, ?)
    `;
    const [rows] = await pool.execute(query, [Date.now(), "Pending"]);
  };
  

  
