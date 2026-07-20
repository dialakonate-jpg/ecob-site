import express from 'express';
const app = express();
app.get('/test', (req, res) => res.json({ok: true}));
app.listen(3002, '127.0.0.1', () => console.log('Server running on 127.0.0.1:3002'));