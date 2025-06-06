import { Router } from 'express';
import { Request, Response } from 'express';
import { register, login, changePasswordHandler, getProfile, updateProfile, uploadProfilePhoto, forgotPasswordHandler } from '../controllers/auth.controller';
import { verifyToken } from '../middleware/auth.middleware';
import multer from 'multer';
import path from 'path';

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

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

router.get('/me', verifyToken, async (req: Request, res: Response) => {
    try {
        await getProfile(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.put('/profile', verifyToken, async (req: Request, res: Response) => {
    try {
        await updateProfile(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/profile/photo', verifyToken, upload.single('photo'), async (req: Request, res: Response) => {
    try {
        await uploadProfilePhoto(req, res);
    } catch (error) {
        console.error('Route upload profile photo error:', error);
        res.status(500).json({ message: 'Failed to upload profile photo.' });
    }
});

router.post('/forgot-password', async (req: Request, res: Response) => {
    try {
        await forgotPasswordHandler(req, res);
    } catch (error) {
        console.error('Route forgot password error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/logout', verifyToken, (req: Request, res: Response) => {
    console.log(`User ${ (req as any).userId } logged out.`);
    res.status(200).json({ message: 'Logged out successfully.' });
});

export default router;
