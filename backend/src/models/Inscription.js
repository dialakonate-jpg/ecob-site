import { resolve } from 'path';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

const dataDir = resolve(process.cwd(), 'data');
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

const dbFile = resolve(dataDir, 'ecob.json');

function readDb() {
  if (!existsSync(dbFile)) {
    writeFileSync(dbFile, JSON.stringify({ inscriptions: [] }, null, 2));
  }
  return JSON.parse(readFileSync(dbFile, 'utf-8'));
}

function writeDb(data) {
  writeFileSync(dbFile, JSON.stringify(data, null, 2));
}

export function createInscription(data) {
  const db = readDb();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const record = {
    id,
    ...data,
    statut: 'nouveau',
    created_at: now,
    updated_at: now
  };
  db.inscriptions.push(record);
  writeDb(db);
  return id;
}

export function getInscriptions({ statut = null, filiere = null, niveau = null, limit = 50, offset = 0 } = {}) {
  const db = readDb();
  let results = db.inscriptions;

  if (statut) {
    results = results.filter(i => i.statut === statut);
  }
  if (filiere) {
    results = results.filter(i => i.filiere === filiere);
  }
  if (niveau) {
    results = results.filter(i => i.niveau === niveau);
  }

  results = results
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(offset, offset + limit);

  return results;
}

export function getInscriptionById(id) {
  const db = readDb();
  return db.inscriptions.find(i => i.id === id) || null;
}

export function updateInscriptionStatut(id, statut) {
  const db = readDb();
  const idx = db.inscriptions.findIndex(i => i.id === id);
  if (idx === -1) return { changes: 0 };
  db.inscriptions[idx].statut = statut;
  db.inscriptions[idx].updated_at = new Date().toISOString();
  writeDb(db);
  return { changes: 1 };
}

export function countInscriptions({ statut = null, filiere = null, niveau = null } = {}) {
  const db = readDb();
  let results = db.inscriptions;

  if (statut) {
    results = results.filter(i => i.statut === statut);
  }
  if (filiere) {
    results = results.filter(i => i.filiere === filiere);
  }
  if (niveau) {
    results = results.filter(i => i.niveau === niveau);
  }

  return results.length;
}

export function getStats() {
  const db = readDb();
  const inscriptions = db.inscriptions;
  
  const total = inscriptions.length;
  const by_status = {
    nouveau: inscriptions.filter(i => i.statut === 'nouveau').length,
    en_cours: inscriptions.filter(i => i.statut === 'en_cours').length,
    contacte: inscriptions.filter(i => i.statut === 'contacte').length,
    inscrit: inscriptions.filter(i => i.statut === 'inscrit').length,
    refuse: inscriptions.filter(i => i.statut === 'refuse').length
  };
  
  // Estimation revenue: 650k par inscrit L1, 750k L3, 800k M1, 900k M2, etc.
  // Pour simplifier: 650k par inscription validée
  const revenue = inscriptions
    .filter(i => i.statut === 'inscrit')
    .reduce((sum, i) => {
      const base = i.niveau === 'M1' ? 800000 : i.niveau === 'M2' ? 900000 : i.niveau === 'L3' ? 750000 : 650000;
      return sum + base;
    }, 0);

  return {
    total_visits: 12450, // À remplacer par vraie analytics
    total_inscriptions: total,
    by_status,
    conversion_rate: total > 0 ? ((by_status.inscrit / 12450) * 100).toFixed(2) : 0,
    revenue
  };
}