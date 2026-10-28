import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

const isProduction = process.env.NODE_ENV === 'production';

const cookieOptions = {
  httpOnly: true,
  sameSite: isProduction ? 'none' : 'lax',
  secure: isProduction,
  maxAge: 1000 * 60 * 60 * 24 * 7,
};

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
  );
}

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must contain at least 6 characters.' });
  }

  try {
    const userExists = await pool.query('SELECT id FROM users WHERE email = $1', [email.trim().toLowerCase()]);

    if (userExists.rowCount > 0) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name.trim(), email.trim().toLowerCase(), passwordHash],
    );

    const user = result.rows[0];
    const token = signToken(user);
    res.cookie('auth_token', token, cookieOptions);

    return res.status(201).json({ user, message: 'Account created successfully.' });
  } catch (error) {
    console.error('Signup failed:', error);
    return res.status(500).json({ message: 'Unable to create account.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const result = await pool.query(
      'SELECT id, name, email, password_hash FROM users WHERE email = $1',
      [email.trim().toLowerCase()],
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = signToken({ id: user.id, email: user.email, name: user.name });
    res.cookie('auth_token', token, cookieOptions);

    return res.json({ user: { id: user.id, name: user.name, email: user.email }, message: 'Login successful.' });
  } catch (error) {
    console.error('Login failed:', error);
    return res.status(500).json({ message: 'Unable to log in.' });
  }
});

router.get('/me', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [req.user.id]);

    if (!result.rowCount) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('User fetch failed:', error);
    return res.status(500).json({ message: 'Unable to fetch user profile.' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('auth_token', { ...cookieOptions, maxAge: 0 });
  return res.json({ message: 'Logged out successfully.' });
});

export default router;
