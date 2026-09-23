import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sendEmailHandler from './api/send-email.js';
import razorpayHandler from './api/razorpay.js';
import { initDbTables } from './api/db.js';
import { registerUser, loginUser, getMe, updateProfile } from './api/auth.js';
import { handleProjects, handleUsers, handleTickets } from './api/projects.js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Initialize MySQL Tables
initDbTables();

// Auth REST API Routes
app.post('/api/auth/register', (req, res) => registerUser(req, res));
app.post('/api/auth/login', (req, res) => loginUser(req, res));
app.get('/api/auth/me', (req, res) => getMe(req, res));
app.put('/api/auth/profile', (req, res) => updateProfile(req, res));

// Projects & Operations REST API Routes
app.all('/api/projects', (req, res) => handleProjects(req, res));
app.all('/api/users', (req, res) => handleUsers(req, res));
app.all('/api/tickets', (req, res) => handleTickets(req, res));

// Resend Email & Razorpay Routes
app.all('/api/send-email', (req, res) => sendEmailHandler(req, res));
app.all('/api/razorpay', (req, res) => razorpayHandler(req, res));

// Serve Vite Static Production Build
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Fallback to index.html for React Router SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 PageTraffics Production Express Server with MySQL DB running on port ${PORT}`);
});
