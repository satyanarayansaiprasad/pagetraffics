import pool from './db.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'pagetraffics_secure_jwt_secret_key_2026';

// Helper to extract authenticated user from header token
const getAuthUser = (req) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      return jwt.verify(token, JWT_SECRET);
    }
  } catch (e) {
    // token invalid or missing
  }
  return null;
};

export const handleProjects = async (req, res) => {
  const method = req.method;
  const user = getAuthUser(req);

  try {
    if (method === 'GET') {
      const userUid = req.query.userUid || user?.uid;
      const isAdmin = user?.role === 'admin';

      let rows;
      if (isAdmin && !req.query.userUid) {
        [rows] = await pool.query('SELECT * FROM projects ORDER BY id DESC');
      } else if (userUid) {
        [rows] = await pool.query('SELECT * FROM projects WHERE user_uid = ? ORDER BY id DESC', [userUid]);
      } else {
        [rows] = await pool.query('SELECT * FROM projects ORDER BY id DESC');
      }

      const projects = rows.map(r => ({
        id: r.project_id || r.id.toString(),
        db_id: r.id,
        userUid: r.user_uid,
        customerEmail: r.customerEmail,
        customerName: r.customerName,
        projectName: r.projectName,
        businessName: r.businessName,
        description: r.description,
        requirements: r.requirements,
        budget: r.budget,
        deadline: r.deadline,
        status: r.status,
        meetingUrl: r.meetingUrl,
        scheduledMeeting: typeof r.scheduledMeeting === 'string' ? JSON.parse(r.scheduledMeeting || 'null') : r.scheduledMeeting,
        acceptedPackage: typeof r.acceptedPackage === 'string' ? JSON.parse(r.acceptedPackage || 'null') : r.acceptedPackage,
        pricingOptions: typeof r.pricingOptions === 'string' ? JSON.parse(r.pricingOptions || 'null') : r.pricingOptions,
        agreement: typeof r.agreement === 'string' ? JSON.parse(r.agreement || 'null') : r.agreement,
        documents: typeof r.documents === 'string' ? JSON.parse(r.documents || 'null') : r.documents,
        notifications: typeof r.notifications === 'string' ? JSON.parse(r.notifications || 'null') : r.notifications,
        paymentHistory: typeof r.paymentHistory === 'string' ? JSON.parse(r.paymentHistory || 'null') : r.paymentHistory,
        createdAt: r.createdAt
      }));

      return res.status(200).json({ success: true, projects });

    } else if (method === 'POST') {
      const {
        projectName,
        businessName,
        description,
        requirements,
        budget,
        deadline,
        documents = []
      } = req.body;

      if (!projectName) {
        return res.status(400).json({ success: false, error: 'Project Name is required.' });
      }

      const project_id = 'proj_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
      const user_uid = user?.uid || req.body.userUid || 'guest';
      const customerEmail = user?.email || req.body.customerEmail || 'customer@example.com';
      const customerName = req.body.customerName || 'Valued Client';

      await pool.query(
        `INSERT INTO projects (project_id, user_uid, customerEmail, customerName, projectName, businessName, description, requirements, budget, deadline, status, documents)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          project_id,
          user_uid,
          customerEmail,
          customerName,
          projectName,
          businessName || '',
          description || '',
          requirements || '',
          budget || '',
          deadline || '',
          'Submitted',
          JSON.stringify(documents)
        ]
      );

      return res.status(201).json({ success: true, id: project_id, message: 'Project created successfully.' });

    } else if (method === 'PUT') {
      const projectId = req.body.id || req.body.projectId;
      if (!projectId) {
        return res.status(400).json({ success: false, error: 'Project ID is required.' });
      }

      const updates = [];
      const values = [];

      const fields = ['status', 'meetingUrl', 'scheduledMeeting', 'acceptedPackage', 'pricingOptions', 'agreement', 'documents', 'notifications', 'paymentHistory'];

      fields.forEach(f => {
        if (req.body[f] !== undefined) {
          updates.push(`${f} = ?`);
          values.push(typeof req.body[f] === 'object' ? JSON.stringify(req.body[f]) : req.body[f]);
        }
      });

      if (updates.length === 0) {
        return res.status(400).json({ success: false, error: 'No fields to update.' });
      }

      values.push(projectId);

      await pool.query(
        `UPDATE projects SET ${updates.join(', ')} WHERE project_id = ? OR id = ?`,
        [...values, projectId]
      );

      return res.status(200).json({ success: true, message: 'Project updated successfully.' });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed.' });
  } catch (error) {
    console.error('Projects API Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const handleUsers = async (req, res) => {
  try {
    const user = getAuthUser(req);
    if (req.method === 'GET') {
      const [rows] = await pool.query('SELECT uid, email, displayName, phone, role, createdAt FROM users ORDER BY id DESC');
      return res.status(200).json({ success: true, users: rows });
    } else if (req.method === 'PUT') {
      const { uid, role } = req.body;
      await pool.query('UPDATE users SET role = ? WHERE uid = ?', [role, uid]);
      return res.status(200).json({ success: true, message: 'Role updated.' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const handleTickets = async (req, res) => {
  try {
    const user = getAuthUser(req);
    if (req.method === 'GET') {
      const [rows] = await pool.query('SELECT * FROM support_tickets ORDER BY id DESC');
      return res.status(200).json({ success: true, tickets: rows });
    } else if (req.method === 'POST') {
      const { subject, category, priority, description } = req.body;
      const ticket_id = 'tkt_' + Date.now();
      await pool.query(
        'INSERT INTO support_tickets (ticket_id, user_uid, customerEmail, subject, category, priority, description, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [ticket_id, user?.uid || 'guest', user?.email || 'customer@example.com', subject, category, priority, description, 'Open']
      );
      return res.status(201).json({ success: true, ticket_id, message: 'Ticket created.' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
