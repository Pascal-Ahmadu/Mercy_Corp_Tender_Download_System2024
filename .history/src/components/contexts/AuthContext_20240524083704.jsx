// src/components/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import bcrypt from 'bcryptjs';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedUser.sessionToken}`;
    }
  }, []);

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .filter('email', 'ilike', email);

      if (error) throw error;

      if (data.length === 0) {
        throw new Error('User not registered');
      }

      const userData = data[0];

      if (bcrypt.compareSync(password, userData.password)) {
        const sessionToken = generateSessionToken();
        const user = { ...userData, sessionToken };
        const userDetails = await fetchUserDetails(email);

        if (userDetails) {
          user.name = userDetails.name;
        }

        setUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${sessionToken}`;

        setTimeout(() => {
          logout();
        }, 3600000); // 1 hour
      } else {
        throw new Error('Invalid  password');
      }
    } catch (error) {
      throw error;
    }
  };

  const fetchUserDetails = async (email) => {
    const { data, error } = await supabase
      .from('users')
      .select('name')
      .filter('email', 'ilike', email);

    if (error) throw error;
    return data[0];
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  const generateSessionToken = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 32;
    let token = '';
    for (let i = 0; i < length; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
