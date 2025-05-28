import { Request, Response } from 'express';
import { registerUser, loginUser, changePassword } from '../services/auth.service';
import jwt from 'jsonwebtoken';


export const register = async (req: Request, res: Response) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required' });
  }

  try {
    await registerUser(name, email, phone, password);
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error: any) {
    if (error?.originalError?.info?.number === 2627) { // унікальність email
      return res.status(409).json({ message: 'Email already exists' });
    }

    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const result = await loginUser(email, password);
    if (!result) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json({ token: result.token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Login failed' });
  }
};

export const changePasswordHandler = async (req: Request, res: Response) => {
  try {
   
    const userId = (req as any).userId as number;
    const { oldPassword, newPassword } = req.body;
    await changePassword(userId, oldPassword, newPassword);
    res.json({ message: 'Password updated successfully' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

