import { Request, Response } from 'express';
import * as CandidatesService from '../services/CandidateService';
import { Candidate, Skill } from '../utils/interface';

export const createCandidate = async (req: Request, res: Response) => {
  try {
    const candidate: Candidate = req.body;
    const candidateId = await CandidatesService.createCandidate(candidate);
    res.status(201).json({ id: candidateId, message: 'Candidate created successfully' });
  } catch (error) {
    console.error('Error creating candidate:', error);
    res.status(500).json({ error: 'Internal server error. Unable to create candidate.' });
  }
};

export const addSkillToCandidate = async (req: Request, res: Response) => {
  try {
    const candidateId: number = parseInt(req.params.candidateId);
    const skill: Skill = req.body;
    await CandidatesService.addSkillToCandidate(candidateId, skill);
    res.status(200).json({ message: 'Skill added to candidate successfully' });
  } catch (error) {
    console.error('Error adding skill to candidate:', error);
    res.status(500).json({ error: 'Internal server error. Unable to add skill to candidate.' });
  }
};

export const deleteCandidate = async (req: Request, res: Response) => {
  try {
    const candidateId: number = parseInt(req.params.candidateId);
    await CandidatesService.deleteCandidate(candidateId);
    res.status(200).json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    console.error('Error deleting candidate:', error);
    res.status(500).json({ error: 'Internal server error. Unable to delete candidate.' });
  }
};

export const applyForCourse = async (req: Request, res: Response) => {
  try {
    const candidateId: number = parseInt(req.params.candidateId);
    const courseId: number = parseInt(req.params.courseId);
    const coverLetterId: number = parseInt(req.params.coverLetterId);
    const ResumeId: number = parseInt(req.params.ResumeId);

    const applicationId = await CandidatesService.applyForCourse(candidateId, courseId, coverLetterId, ResumeId);
    res.status(201).json({ id: applicationId, message: 'Application created successfully' });
  } catch (error) {
    console.error('Error applying for the course:', error);
    res.status(500).json({ error: 'Internal server error. Unable to apply for the course.' });
  }
};

export const deleteApplication = async (req: Request, res: Response) => {
  try {
    const applicationId: number = parseInt(req.params.applicationId);
    await CandidatesService.deleteApplication(applicationId);
    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ error: 'Internal server error. Unable to delete application.' });
  }
};

export const viewCompanyCatalog = async (req: Request, res: Response) => {
  try {
    const companyCatalog = await CandidatesService.viewCompanyCatalog();
    res.status(200).json(companyCatalog);
  } catch (error) {
    console.error('Error viewing the company catalog:', error);
    res.status(500).json({ error: 'Internal server error. Unable to view company catalog.' });
  }
};

export const viewCompanyProfile = async (req: Request, res: Response) => {
  try {
    const companyId: number = parseInt(req.params.companyId);
    const companyProfile = await CandidatesService.viewCompanyProfile(companyId);
    if (companyProfile) {
      res.status(200).json(companyProfile);
    } else {
      res.status(404).json({ error: 'Company not found' });
    }
  } catch (error) {
    console.error('Error viewing company profile:', error);
    res.status(500).json({ error: 'Internal server error. Unable to view company profile.' });
  }
};

export const viewOfferCatalog = async (req: Request, res: Response) => {
  try {
    const offerId: number = parseInt(req.params.offerId);
    const offer = await CandidatesService.viewOfferCatalog(offerId);
    if (offer) {
      res.status(200).json(offer);
    } else {
      res.status(404).json({ error: 'Offer not found' });
    }
  } catch (error) {
    console.error('Error viewing offer catalog:', error);
    res.status(500).json({ error: 'Internal server error. Unable to view offer catalog.' });
  }
};

export const addResume = async (req: Request, res: Response) => {
  try {
    const url: string = req.body.url;
    const resumeId = await CandidatesService.addResume(url);
    res.status(201).json({ id: resumeId, message: 'Resume added successfully' });
  } catch (error) {
    console.error('Error adding resume:', error);
    res.status(500).json({ error: 'Internal server error. Unable to add resume.' });
  }
};

export const editResume = async (req: Request, res: Response) => {
  try {
    const resumeId: number = parseInt(req.params.resumeId);
    const newURL: string = req.body.newURL;
    await CandidatesService.editResume(resumeId, newURL);
    res.status(200).json({ message: 'Resume updated successfully' });
  } catch (error) {
    console.error('Error editing resume:', error);
    res.status(500).json({ error: 'Internal server error. Unable to edit resume.' });
  }
};

export const deleteResume = async (req: Request, res: Response) => {
  try {
    const resumeId: number = parseInt(req.params.resumeId);
    await CandidatesService.deleteResume(resumeId);
    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).json({ error: 'Internal server error. Unable to delete resume.' });
  }
};
