import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import { connectToDb } from './config/db';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // для запросов с клиента
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/test', (req, res) => {
  res.send('API is working!');
});

const PORT = process.env.PORT || 3000;

connectToDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
