import { Router } from 'express';
import pool from '../db';

const router = Router();

interface User {
  id: number;
  name: string;
  email: string;
}

router.post('/', async (req, res) => {
  const { name, email } = req.body;

  try {
    const result = await pool.query<User>(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Insert failed', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

export default router;
