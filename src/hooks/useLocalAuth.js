import { useState, useEffect } from 'react';

export const useLocalAuth = () => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Vérification des identifiants (simplifiée)
    const users = JSON.parse(localStorage.getItem('localUsers')) || [];
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentLocalUser', JSON.stringify(foundUser));
      return { success: true, message: 'Connexion réussie' };
    }
    return { success: false, message: 'Identifiants incorrects' };
  };

  const register = (email, password, name) => {
    const users = JSON.parse(localStorage.getItem('localUsers')) || [];
    
    if (users.some(u => u.email === email)) {
      return { success: false, message: 'Cet email est déjà utilisé' };
    }
    
    const newUser = {
      email,
      password,
      name,
      image: '/default-user.png' // Image par défaut
    };
    
    users.push(newUser);
    localStorage.setItem('localUsers', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('currentLocalUser', JSON.stringify(newUser));
    
    return { success: true, message: 'Inscription réussie' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentLocalUser');
  };

  // Vérifie si un utilisateur est déjà connecté au chargement
  useEffect(() => {
    const savedUser = localStorage.getItem('currentLocalUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return { user, login, register, logout };
};