import { pool } from "../utils/db";

// Book an appointment
export const bookAppointment = async (candidateId: number, appointmentDate: number, appointmentTime: number): Promise<void> => {
  const query = 'INSERT INTO Appointment (appointment_date, appointment_time, id_registered_user) VALUES (?, ?, ?)';
  try {
    await pool.query(query, [appointmentDate, appointmentTime, candidateId]);
  } catch (error) {
    console.error('Error booking appointment:', error);
    throw error; 
  }
};

// Delete Resume
export const deleteResume = async (resumeId: number): Promise<void> => {
  const query = 'DELETE FROM Resume WHERE id_resume = ?';
  try {
    await pool.query(query, [resumeId]);
  } catch (error) {
    console.error('Error deleting resume:', error);
    throw error;
  }
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
  try {
    await pool.query(query, [contractStartDate, "Admitted"]);
  } catch (error) {
    console.error('Error filling contract for admitted candidate:', error);
    throw error;
  }
};

// Remove Application from Company Offer
export const removeApplicationFromCompanyOffer = async (applicationId: number): Promise<void> => {
  const query = 'DELETE FROM Application WHERE id_application = ?';
  try {
    await pool.query(query, [applicationId]);
  } catch (error) {
    console.error('Error removing application from company offer:', error);
    throw error;
  }
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
  try {
    await pool.query(query, [Date.now(), "Pending"]);
  } catch (error) {
    console.error('Error applying to a company offer:', error);
    throw error;
  }
};
