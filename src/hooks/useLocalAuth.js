import { useState, useEffect } from 'react';
import { localAuth } from '../utils/LocalAuth';

export const useLocalAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = localAuth.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const result = localAuth.login(email, password);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  };

  const register = (email, password) => {
    const result = localAuth.register(email, password);
    if (result.success) {
      setUser(result.user);
      // Ca permet de se connecter qd on finit l'inscription
      localAuth.login(email, password);
    }
    return result;
  };

  const logout = () => {
    localAuth.logout();
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isLoggedIn: !!user
  };
};
