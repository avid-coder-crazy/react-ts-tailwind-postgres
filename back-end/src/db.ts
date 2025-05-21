import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  // connectionString: process.env.DATABASE_URL,
  user: 'postgres',
  host: '127.0.0.1', // 👈 MUST BE THIS
  database: 'cloth_designer',
  password: 'jupiter414',
  port: 5432,
});

export default pool;
