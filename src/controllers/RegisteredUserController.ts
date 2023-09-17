import { Request, Response } from 'express';
import { applyToCompanyOffer, bookAppointment, fillContractForAdmittedCandidate, removeApplicationFromCompanyOffer } from '../services/RegisteredUserServices';

export const fillContractForAdmittedCandidateController = async (req: Request, res: Response): Promise<void> => {
    try {
        const candidatId = Number(req.params.candidatId);
        const offreId = Number(req.params.offreId);
        const contractStartDate = req.body.contrat;
        const contractEndtDate = req.body.contrat;
        await fillContractForAdmittedCandidate(candidatId, offreId, contractStartDate, contractEndtDate);
        res.sendStatus(204);
    } catch (error) {
        console.error('Erreur lors du remplissage du contrat d\'alternance :', error);
        res.status(500).json({ message: 'Erreur lors du remplissage du contrat d\'alternance' });
    }
};

export const removeApplicationFromCompanyOfferController = async (req: Request, res: Response): Promise<void> => {
    try {
      const candidatureId = Number(req.params.candidatureId);
  
      await removeApplicationFromCompanyOffer(candidatureId);
      res.sendStatus(204);
    } catch (error) {
      console.error('Erreur lors de la suppression de la candidature d\'une offre d\'alternance :', error);
      res.status(500).json({ message: 'Erreur lors de la suppression de la candidature d\'une offre d\'alternance' });
    }
  };
  

  export const applyToCompanyOfferController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { candidatId, offreId, lettreMotivationId, cvId } = req.body;
      const candidatureId = await applyToCompanyOffer(candidatId, offreId, lettreMotivationId, cvId);
  
      res.status(201).json({ id: candidatureId });
    } catch (error) {
      console.error('Erreur lors de la candidature à une offre d\'alternance :', error);
      res.status(500).json({ message: 'Erreur lors de la candidature à une offre d\'alternance' });
    }
  };
  
