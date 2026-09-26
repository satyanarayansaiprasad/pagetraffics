import db from './db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'pagetraffics_secure_jwt_secret_key_2026';

export const registerUser = async (req, res) => {
  try {
    const { email, password, name, phone, role = 'customer' } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }

    // Check if user already exists
    const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    if (existing && existing.length > 0) {
      return res.status(400).json({ success: false, error: 'User with this email already exists.' });
    }

    const uid = 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const password_hash = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString();

    await db.query(
      'INSERT INTO users (uid, email, password_hash, displayName, phone, role) VALUES (?, ?, ?, ?, ?, ?)',
      [uid, email.toLowerCase().trim(), password_hash, name || '', phone || '', role]
    );

    const userProfile = {
      uid,
      email: email.toLowerCase().trim(),
      displayName: name || '',
      phone: phone || '',
      role,
      emailVerified: true,
      createdAt
    };

    const token = jwt.sign({ uid, email: userProfile.email, role }, JWT_SECRET, { expiresIn: '7d' });

    return res.status(201).json({
      success: true,
      token,
      user: userProfile
    });
  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Registration failed.' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }

    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    if (!rows || rows.length === 0) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    const userRow = rows[0];
    const isMatch = await bcrypt.compare(password, userRow.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    const userProfile = {
      uid: userRow.uid,
      email: userRow.email,
      displayName: userRow.displayName || '',
      phone: userRow.phone || '',
      role: userRow.role || 'customer',
      emailVerified: true,
      createdAt: userRow.createdAt || new Date().toISOString()
    };

    const token = jwt.sign({ uid: userProfile.uid, email: userProfile.email, role: userProfile.role }, JWT_SECRET, { expiresIn: '7d' });

    return res.status(200).json({
      success: true,
      token,
      user: userProfile
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Login failed.' });
  }
};

export const getMe = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'No authorization token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const [rows] = await db.query('SELECT * FROM users WHERE uid = ?', [decoded.uid]);
    if (!rows || rows.length === 0) {
      return res.status(404).json({ success: false, error: 'User account not found.' });
    }

    const userRow = rows[0];
    const userProfile = {
      uid: userRow.uid,
      email: userRow.email,
      displayName: userRow.displayName || '',
      phone: userRow.phone || '',
      role: userRow.role || 'customer',
      emailVerified: true,
      createdAt: userRow.createdAt || new Date().toISOString()
    };

    return res.status(200).json({ success: true, user: userProfile });
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Invalid or expired token.' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const { displayName, phone } = req.body;

    await db.query(
      'UPDATE users SET displayName = ?, phone = ? WHERE uid = ?',
      [displayName || '', phone || '', decoded.uid]
    );

    return res.status(200).json({ success: true, message: 'Profile updated successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
