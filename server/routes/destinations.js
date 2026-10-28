import express from 'express';
import { pool } from '../config/db.js';

const router = express.Router();

router.get('/destinations', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, slug, name, category, description, duration, price, image, image_alt AS "imageAlt" FROM destinations ORDER BY id ASC',
    );

    return res.json(result.rows);
  } catch (error) {
    console.error('Destination query failed:', error);
    return res.status(500).json({ message: 'Unable to fetch destinations.' });
  }
});

export default router;
