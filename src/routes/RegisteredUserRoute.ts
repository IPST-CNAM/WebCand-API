import express from 'express';
import {
  applyToCompanyOfferController,
  //bookAppointmentController,
  fillContractForAdmittedCandidateController,
  //signerContratAlternanceController,
  removeApplicationFromCompanyOfferController,
} from "../controllers/RegisteredUserController"; 
const registeredUserRouter = express.Router(); 


//registeredUserRouter.put('/appointments/:rdvId/candidates/:candidatId', bookAppointmentController);

registeredUserRouter.put('/admittedCandidates/:candidatId/contract', fillContractForAdmittedCandidateController);


registeredUserRouter.delete('/applications/:candidatureId', removeApplicationFromCompanyOfferController);


registeredUserRouter.post('/applications', applyToCompanyOfferController);


//registeredUserRouter.post('/contracts/:candidatId/:offreId', signerContratAlternanceController);

export default registeredUserRouter;
