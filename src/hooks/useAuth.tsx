// src/hooks/useAuth.tsx
import { useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Kontrollo nëse ka të dhëna të ruajtura në localStorage
    const checkAuthStatus = () => {
      try {
        const storedUser = localStorage.getItem('jobTracker_user');
        const storedToken = localStorage.getItem('jobTracker_token');
        
        if (storedUser && storedToken) {
          const user = JSON.parse(storedUser);
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState(prev => ({
            ...prev,
            isLoading: false,
          }));
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Failed to load authentication data',
        });
      }
    };

    checkAuthStatus();
  }, []);

  // Login me email dhe password
  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simuloni API call - në praktikë këtu do të bëni një kërkesë reale
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Këtu vendosni logjikën tuaj reale të login
      if (email && password) {
        const mockUser: User = {
          id: '1',
          name: 'John Doe',
          email: email,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=random`,
          role: 'user',
        };
        
        const mockToken = 'mock_jwt_token_' + Date.now();
        
        localStorage.setItem('jobTracker_user', JSON.stringify(mockUser));
        localStorage.setItem('jobTracker_token', mockToken);
        
        setAuthState({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        
        return true;
      } else {
        throw new Error('Please provide email and password');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return false;
    }
  };

  // Register (krijoni llogari të re)
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simuloni API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (name && email && password) {
        const mockUser: User = {
          id: Date.now().toString(),
          name: name,
          email: email,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
          role: 'user',
        };
        
        const mockToken = 'mock_jwt_token_' + Date.now();
        
        localStorage.setItem('jobTracker_user', JSON.stringify(mockUser));
        localStorage.setItem('jobTracker_token', mockToken);
        
        setAuthState({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        
        return true;
      } else {
        throw new Error('Please provide all required fields');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return false;
    }
  };

  // Logout
  const logout = (): void => {
    localStorage.removeItem('jobTracker_user');
    localStorage.removeItem('jobTracker_token');
    
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  // Update profile
  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!authState.user) return false;
    
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simuloni API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = {
        ...authState.user,
        ...updates,
      };
      
      localStorage.setItem('jobTracker_user', JSON.stringify(updatedUser));
      
      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
        isLoading: false,
        error: null,
      }));
      
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return false;
    }
  };

  // Check if user has specific role (opsionale)
  const hasRole = (role: string): boolean => {
    return authState.user?.role === role;
  };

  // Get user initials for avatar
  const getUserInitials = (): string => {
    if (!authState.user?.name) return 'U';
    return authState.user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return {
    ...authState,
    login,
    register,
    logout,
    updateProfile,
    hasRole,
    getUserInitials,
  };
};

// Opsionale: Krijo një hook më të thjeshtë nëse doni mock të thjeshtë
export const useMockAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simuloni kontrollin e login-it nga localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Simuloni login
    if (email && password) {
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: email,
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string): boolean => {
    // Simuloni regjistrim
    if (name && email && password) {
      const mockUser = {
        id: '1',
        name: name,
        email: email,
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = (): void => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
  };
};

// Eksporti i tipit për përdorim në komponentë të tjerë
export type AuthHookReturn = ReturnType<typeof useAuth>;