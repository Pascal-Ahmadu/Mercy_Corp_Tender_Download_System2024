import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import bcrypt from 'bcryptjs';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize user state (simulated session retrieval)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
    setIsAuthenticated(!!storedUser); // Set isAuthenticated based on whether storedUser is truthy
  }, []);

  // Login function with session token generation
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
      setIsAuthenticated(true); // User is authenticated
      localStorage.setItem('user', JSON.stringify(user));

      // Set axios authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${sessionToken}`;

      // Example usage of axios for subsequent requests
      axios.get('https://your-api-endpoint.com/some-data')
        .then(response => {
          // Handle response
        })
        .catch(error => {
          // Handle error
        });

      // Set token expiry (for example, after 1 hour)
      setTimeout(() => {
        logout();
      }, 3600000); // 1 hour in milliseconds
    } else {
      throw new Error('Invalid username or password');
    }
  };

  // Logout function
  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false); // User is no longer authenticated
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  // Function to generate a random session token
  const generateSessionToken = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 32; // Adjust the length of the token as needed
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
