// src/context/AuthContext.tsx - Version i plotësuar
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  uid: string;
  email: string;
  displayName: string;
  // Shto properties të reja për profile
  name?: string;
  phone?: string;
  profession?: string;
  location?: string;
  bio?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean; // Shto këtë për të kontrolluar lehtësisht auth
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, displayName: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<boolean>; // Shto këtë
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('jobTracker_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user:', error);
      }
    }
  }, []);

  const saveUser = (userData: User | null) => {
    if (userData) {
      localStorage.setItem('jobTracker_user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('jobTracker_user');
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulim i API (mock)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user me të gjitha properties
      const mockUser: User = {
        uid: 'mock-uid-' + Date.now(),
        email,
        displayName: email.split('@')[0],
        name: 'John Doe',
        phone: '+1 (555) 123-4567',
        profession: 'Software Developer',
        location: 'New York, NY',
        bio: 'Passionate software developer with 5+ years of experience in React, TypeScript, and Node.js. Always eager to learn new technologies and solve challenging problems.',
        linkedin: 'https://linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        website: 'https://johndoe.dev',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=random`
      };

      setUser(mockUser);
      saveUser(mockUser);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (
    email: string,
    password: string,
    displayName: string
  ): Promise<boolean> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser: User = {
        uid: 'mock-uid-' + Date.now(),
        email,
        displayName,
        name: displayName,
        phone: '',
        profession: '',
        location: '',
        bio: '',
        linkedin: '',
        github: '',
        website: '',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`
      };

      setUser(mockUser);
      saveUser(mockUser);
      return true;
    } catch (err) {
      console.error("Register failed:", err);
      return false;
    }
  };

  // FUNKSIONI I RI: Update Profile
  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    try {
      if (!user) return false;
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Krijo user të ri me updates
      const updatedUser: User = {
        ...user,
        ...updates,
        // Sigurohu që displayName mbetet nëse nuk ndryshohet
        displayName: updates.name || user.displayName,
      };
      
      setUser(updatedUser);
      saveUser(updatedUser);
      return true;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    saveUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, // Llogarit isAuthenticated
      login, 
      register, 
      logout,
      updateProfile // Shto updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Eksporto tipin për përdorim në komponentë të tjerë
export type { User, AuthContextType };