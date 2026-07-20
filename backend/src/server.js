import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import inscriptionRoutes from './routes/inscriptionRoutes.js';

const app = express();
const PORT = process.env.PORT || 3002;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api', inscriptionRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route non trouvée' });
});

app.use((err, req, res, next) => {
  console.error('Erreur:', err);
  res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
});

export function startServer() {
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Serveur ECOB démarré sur http://localhost:${PORT}`);
    console.log(`📡 API disponible sur http://localhost:${PORT}/api`);
    console.log(`🌐 Frontend autorisé: ${FRONTEND_URL}`);
  });
  server.on('error', (err) => console.error('Server error:', err));
}

startServer();

export default app;