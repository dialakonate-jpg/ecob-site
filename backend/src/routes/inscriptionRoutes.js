import express from 'express';
import { createInscriptionController, listInscriptionsController, getStatsController, getInscriptionController, updateStatutController } from '../controllers/inscriptionController.js';
import { validateInscription } from '../middleware/validation.js';

const router = express.Router();

// Public
router.post('/inscriptions', validateInscription, createInscriptionController);

// Admin (à protéger avec auth ultérieurement)
router.get('/inscriptions/stats', getStatsController);
router.get('/inscriptions', listInscriptionsController);
router.get('/inscriptions/:id', getInscriptionController);
router.patch('/inscriptions/:id/statut', updateStatutController);

export default router;