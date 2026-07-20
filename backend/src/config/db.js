import Database from 'better-sqlite3';
import { resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';

const dbDir = resolve(process.cwd(), 'data');
if (!existsSync(dbDir)) {
  mkdirSync(dbDir, { recursive: true });
}

const dbPath = resolve(dbDir, 'ecob.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

export default db;