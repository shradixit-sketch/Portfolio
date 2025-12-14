
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { User, AuthContextType } from '../types';
import { ADMIN_USERNAME, ADMIN_PASSWORD, LOCAL_STORAGE_AUTH_KEY } from '../constants';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage, using null.", error);
      return null;
    }
  });

  const isAuthenticated = !!user;

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    // Simulate API call for login
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const loggedInUser: User = { id: '1', username: ADMIN_USERNAME, role: 'admin' };
      setUser(loggedInUser);
      localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(loggedInUser));
      return true;
    } else {
      setUser(null);
      localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
  }, []);

  const contextValue = React.useMemo(() => ({
    user,
    login,
    logout,
    isAuthenticated,
  }), [user, login, logout, isAuthenticated]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
