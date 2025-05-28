
import { Router } from 'express';
import { Request, Response } from 'express';
import { register, login, changePasswordHandler } from '../controllers/auth.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    await register(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    await login(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]);
});

router.post('/change-password', verifyToken, async (req: Request, res: Response) => {
  try {
    await changePasswordHandler(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;

