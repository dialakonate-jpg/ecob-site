import { resolve } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

const dataDir = resolve(process.cwd(), 'data');
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

const dbFile = resolve(dataDir, 'ecob.json');
if (!existsSync(dbFile)) {
  writeFileSync(dbFile, JSON.stringify({ inscriptions: [] }, null, 2));
}

console.log('Base de données JSON initialisée:', dbFile);