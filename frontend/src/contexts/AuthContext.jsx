import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCurrentUser(null);
      setUserData(null);
      setLoading(false);
      return null;
    }

    try {
      const response = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success && response.data.user) {
        const user = response.data.user;
        setCurrentUser({ uid: user.uid, email: user.email, displayName: user.displayName });
        setUserData(user);
        return user;
      }
    } catch (error) {
      console.warn('Session expired or invalid token:', error.response?.data?.error || error.message);
      localStorage.removeItem('token');
      setCurrentUser(null);
      setUserData(null);
    } finally {
      setLoading(false);
    }
    return null;
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      if (response.data.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
        const user = response.data.user;
        setCurrentUser({ uid: user.uid, email: user.email, displayName: user.displayName });
        setUserData(user);
        return { user };
      }
      throw new Error(response.data.error || 'Login failed.');
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Login failed.';
      throw new Error(msg);
    }
  };

  const registerCustomer = async ({ email, password, name, phone }) => {
    try {
      const response = await axios.post('/api/auth/register', { email, password, name, phone, role: 'customer' });
      if (response.data.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
        const user = response.data.user;
        setCurrentUser({ uid: user.uid, email: user.email, displayName: user.displayName });
        setUserData(user);
        return { user };
      }
      throw new Error(response.data.error || 'Registration failed.');
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Registration failed.';
      throw new Error(msg);
    }
  };

  const resetPassword = async (email) => {
    return Promise.resolve(true);
  };

  const triggerVerificationEmail = async () => {
    return Promise.resolve(true);
  };

  const updateUserProfileData = async (updates) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No active login token.');

    try {
      await axios.put('/api/auth/profile', updates, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchUserData();
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Update failed.';
      throw new Error(msg);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setUserData(null);
    return Promise.resolve();
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const value = {
    currentUser,
    userData,
    role: userData?.role || 'customer',
    isAdmin: userData?.role === 'admin',
    isCustomer: userData?.role === 'customer' || !userData?.role,
    fetchUserData,
    login,
    registerCustomer,
    resetPassword,
    triggerVerificationEmail,
    updateUserProfileData,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
