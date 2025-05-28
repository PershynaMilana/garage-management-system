import sql from '../config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (name: string, email: string, phone: string, password: string) => {
  const hashed = await bcrypt.hash(password, 10);

  const request = new sql.Request();
  request.input('name', sql.NVarChar, name);
  request.input('email', sql.NVarChar, email);
  request.input('phone', sql.NVarChar, phone);
  request.input('passwordHash', sql.NVarChar, hashed);

  const result = await request.query(`
    INSERT INTO Users (name, email, phone, passwordHash, registrationDate, userStatus)
    VALUES (@name, @email, @phone, @passwordHash, GETDATE(), 'active')
  `);

  return result;
};

export const loginUser = async (email: string, password: string) => {
  const request = new sql.Request();
  request.input('email', sql.NVarChar, email);

  const result = await request.query(`SELECT * FROM Users WHERE email = @email`);
  const user = result.recordset[0];

  if (!user || !user.passwordHash) return null;

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return null;

  const token = jwt.sign(
    { userId: user.userId, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  return { token };
};

export const changePassword = async (
  userId: number,
  oldPassword: string,
  newPassword: string
) => {
  const req = new sql.Request();
  req.input('userId', sql.Int, userId);
  const result = await req.query(`SELECT passwordHash FROM Users WHERE userId = @userId`);
  const user = result.recordset[0];
  if (!user) throw new Error('User not found');

  const ok = await bcrypt.compare(oldPassword, user.passwordHash);
  if (!ok) throw new Error('Old password is incorrect');

  const newHash = await bcrypt.hash(newPassword, 10);
  const upd = new sql.Request();
  upd.input('userId', sql.Int, userId);
  upd.input('newHash', sql.NVarChar, newHash);
  await upd.query(`
    UPDATE Users 
    SET passwordHash = @newHash 
    WHERE userId = @userId
  `);

  return true;
};