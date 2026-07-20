import { z } from 'zod';
import { createInscription, getInscriptions, getInscriptionById, updateInscriptionStatut, countInscriptions, getStats } from '../models/Inscription.js';

const inscriptionInputSchema = z.object({
  nom_complet: z.string().min(2).max(100),
  email: z.string().email(),
  telephone: z.string().min(8).max(20),
  niveau: z.enum(['L1', 'L2', 'L3', 'M1', 'M2']),
  filiere: z.string().min(2).max(100),
  mode_paiement: z.enum(['integral', 'mensuel', 'autre']).optional(),
  message: z.string().max(1000).optional()
});

export async function createInscriptionController(req, res) {
  try {
    const data = inscriptionInputSchema.parse(req.body);
    const id = createInscription(data);
    res.status(201).json({ success: true, message: 'Inscription enregistrée', id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: 'Données invalides', errors: error.flatten() });
    }
    console.error('Erreur inscription:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
}

export async function listInscriptionsController(req, res) {
  try {
    const { statut, filiere, niveau, page = 1, limit = 50 } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const offset = (pageNum - 1) * limitNum;

    const inscriptions = getInscriptions({ statut, filiere, niveau, limit: limitNum, offset });
    const total = countInscriptions({ statut, filiere, niveau });

    res.json({ success: true, data: inscriptions, pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) } });
  } catch (error) {
    console.error('Erreur liste inscriptions:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
}

export async function getStatsController(req, res) {
  try {
    const stats = getStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('Erreur stats:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
}

export async function getInscriptionController(req, res) {
  try {
    const inscription = getInscriptionById(req.params.id);
    if (!inscription) {
      return res.status(404).json({ success: false, message: 'Inscription non trouvée' });
    }
    res.json({ success: true, data: inscription });
  } catch (error) {
    console.error('Erreur get inscription:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
}

export async function updateStatutController(req, res) {
  try {
    const { statut } = req.body;
    const validStatuts = ['nouveau', 'en_cours', 'contacte', 'inscrit', 'refuse'];
    if (!validStatuts.includes(statut)) {
      return res.status(400).json({ success: false, message: 'Statut invalide' });
    }

    const result = updateInscriptionStatut(req.params.id, statut);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: 'Inscription non trouvée' });
    }

    res.json({ success: true, message: 'Statut mis à jour' });
  } catch (error) {
    console.error('Erreur update statut:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
}