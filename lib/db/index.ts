import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  // Eğer burada hata fırlatırsak, sorunun tam olarak nerede olduğunu anlarız
  throw new Error("HATA: DATABASE_URL tanımlı değil!");
}

const sql = neon(connectionString);
export const db = drizzle(sql, { schema });