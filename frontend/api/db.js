import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'u865727365_pageTraffics',
  password: process.env.DB_PASSWORD || 'Satya@540720',
  database: process.env.DB_NAME || 'u865727365_pageTraffics',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 5000
};

const pool = mysql.createPool(dbConfig);

// In-memory fallback database for local environment if MySQL is unreachable
const memoryDb = {
  users: [],
  projects: [],
  support_tickets: [],
  inquiries: []
};

// Initialize MySQL Tables
export const initDbTables = async () => {
  try {
    const connection = await pool.getConnection();

    // 1. Users Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        uid VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        displayName VARCHAR(255) DEFAULT '',
        phone VARCHAR(50) DEFAULT '',
        role VARCHAR(50) DEFAULT 'customer',
        emailVerified TINYINT(1) DEFAULT 1,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 2. Projects Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        project_id VARCHAR(255) UNIQUE NOT NULL,
        user_uid VARCHAR(255) NOT NULL,
        customerEmail VARCHAR(255) NOT NULL,
        customerName VARCHAR(255) DEFAULT '',
        projectName VARCHAR(255) NOT NULL,
        businessName VARCHAR(255) DEFAULT '',
        description TEXT,
        requirements TEXT,
        budget VARCHAR(100) DEFAULT '',
        deadline VARCHAR(100) DEFAULT '',
        status VARCHAR(100) DEFAULT 'Submitted',
        meetingUrl VARCHAR(500) DEFAULT '',
        scheduledMeeting JSON DEFAULT NULL,
        acceptedPackage JSON DEFAULT NULL,
        pricingOptions JSON DEFAULT NULL,
        agreement JSON DEFAULT NULL,
        documents JSON DEFAULT NULL,
        notifications JSON DEFAULT NULL,
        paymentHistory JSON DEFAULT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 3. Support Tickets Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS support_tickets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ticket_id VARCHAR(255) UNIQUE NOT NULL,
        user_uid VARCHAR(255) NOT NULL,
        customerEmail VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        category VARCHAR(100) DEFAULT 'Technical Support',
        priority VARCHAR(50) DEFAULT 'Medium',
        description TEXT,
        status VARCHAR(50) DEFAULT 'Open',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 4. Inquiries Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        inquiry_id VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) DEFAULT '',
        subject VARCHAR(255) DEFAULT '',
        message TEXT,
        status VARCHAR(50) DEFAULT 'New',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    connection.release();
    console.log('✅ MySQL Database connected & tables initialized successfully.');
  } catch (err) {
    console.warn('⚠️ MySQL Database Notice (using memory DB fallback):', err.message);
  }
};

// Safe query executor with MySQL + Memory Fallback
export const query = async (sql, params = []) => {
  try {
    return await pool.query(sql, params);
  } catch (err) {
    console.warn('⚠️ Primary MySQL Query Notice:', err.message);
    
    // In-Memory Fallback Handling
    const sqlUpper = sql.trim().toUpperCase();

    if (sqlUpper.startsWith('SELECT * FROM USERS WHERE EMAIL =')) {
      const emailParam = (params[0] || '').toLowerCase().trim();
      const matched = memoryDb.users.filter((u) => u.email.toLowerCase() === emailParam);
      return [matched, []];
    }

    if (sqlUpper.startsWith('SELECT * FROM USERS WHERE UID =')) {
      const uidParam = params[0] || '';
      const matched = memoryDb.users.filter((u) => u.uid === uidParam);
      return [matched, []];
    }

    if (sqlUpper.startsWith('INSERT INTO USERS')) {
      const newUser = {
        id: memoryDb.users.length + 1,
        uid: params[0],
        email: params[1],
        password_hash: params[2],
        displayName: params[3] || '',
        phone: params[4] || '',
        role: params[5] || 'customer',
        emailVerified: 1,
        createdAt: new Date().toISOString()
      };
      memoryDb.users.push(newUser);
      return [{ affectedRows: 1, insertId: newUser.id }, []];
    }

    if (sqlUpper.startsWith('UPDATE USERS SET DISPLAYNAME')) {
      const displayName = params[0];
      const phone = params[1];
      const uid = params[2];
      const user = memoryDb.users.find((u) => u.uid === uid);
      if (user) {
        user.displayName = displayName;
        user.phone = phone;
      }
      return [{ affectedRows: 1 }, []];
    }

    if (sqlUpper.startsWith('SELECT * FROM PROJECTS')) {
      return [memoryDb.projects, []];
    }

    if (sqlUpper.startsWith('INSERT INTO PROJECTS')) {
      const newProj = {
        id: memoryDb.projects.length + 1,
        project_id: params[0],
        user_uid: params[1],
        customerEmail: params[2],
        projectName: params[4],
        status: 'Submitted',
        createdAt: new Date().toISOString()
      };
      memoryDb.projects.push(newProj);
      return [{ affectedRows: 1 }, []];
    }

    return [[], []];
  }
};

export default { query, initDbTables };
