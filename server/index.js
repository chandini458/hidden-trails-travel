import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import destinationsRoutes from './routes/destinations.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Hidden Trails API is running.' });
});

app.use('/api/auth', authRoutes);
app.use('/api', destinationsRoutes);

app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ message: 'Server error.' });
});

app.listen(port, () => {
  console.log(`Hidden Trails API running on http://localhost:${port}`);
});
