import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import inscriptionRoutes from './routes/inscriptionRoutes.js';

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Trop de requêtes, réessayez plus tard' }
});
app.use(limiter);

app.use('/api', inscriptionRoutes);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'ECOB API operational', timestamp: new Date().toISOString() });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route non trouvée' });
});

app.use((err, req, res, next) => {
  console.error('Erreur:', err);
  res.status(500).json({ success: false, message: 'Erreur serveur interne' });
});

const PORT = process.env.PORT || 3001;

export function startServer() {
  app.listen(PORT, () => {
    console.log(`🚀 ECOB API démarrée sur http://localhost:${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  });
}

export default app;