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
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw error;

    if (data && bcrypt.compareSync(password, data.password)) {
      const sessionToken = generateSessionToken();
      const user = { ...data, sessionToken };
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(user));

      const userDetails = await fetchUserDetails(email);
      if (userDetails) {
        user.name = userDetails.name;
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      }

      axios.defaults.headers.common['Authorization'] = `Bearer ${sessionToken}`;
      setTimeout(() => {
        logout();
      }, 3600000);
    } else {
      throw new Error('Invalid username or password');
    }
  };

  const fetchUserDetails = async (email) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('name')
        .eq('email', email)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
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
