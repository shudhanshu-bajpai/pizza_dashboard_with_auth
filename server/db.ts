import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../shared/schema';

// For development, we'll use in-memory storage
// In production, you would use a real PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/pizza_dashboard',
});

export const db = drizzle(pool, { schema });