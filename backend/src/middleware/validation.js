import { z } from 'zod';

export const inscriptionSchema = z.object({
  nom_complet: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100),
  email: z.string().email('Email invalide'),
  telephone: z.string().min(8, 'Numéro de téléphone invalide').max(20),
  niveau: z.enum(['L1', 'L2', 'L3', 'M1', 'M2'], { message: 'Niveau invalide' }),
  filiere: z.string().min(2).max(100),
  mode_paiement: z.enum(['integral', 'mensuel', 'autre']).optional(),
  message: z.string().max(1000).optional()
});

export function validateInscription(req, res, next) {
  const result = inscriptionSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: 'Données invalides',
      errors: result.error.flatten().fieldErrors
    });
  }
  req.validatedData = result.data;
  next();
}