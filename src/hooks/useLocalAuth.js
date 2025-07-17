import { useState, useEffect } from "react";

// Hook personnalisé pour gérer une authentification locale avec localStorage
export const useLocalAuth = () => {
  const [user, setUser] = useState(null); // État de l'utilisateur actuel

  // Met à jour l'utilisateur local (modifie aussi localStorage)
  const updateUser = (updatedUser) => {
    // Sauvegarde l'utilisateur actuel dans le localStorage
    localStorage.setItem("currentLocalUser", JSON.stringify(updatedUser));

    // Met à jour la liste complète des utilisateurs
    const users = JSON.parse(localStorage.getItem("localUsers")) || [];
    const userIndex = users.findIndex(u => u.email === updatedUser.email);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem("localUsers", JSON.stringify(users));
    }

    setUser(updatedUser); // Met à jour l'état local
  };

  // Connecte un utilisateur local s'il existe et que le mot de passe est bon
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("localUsers")) || [];
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("currentLocalUser", JSON.stringify(foundUser));
      return { success: true, message: "Connexion réussie" };
    }
    return { success: false, message: "Identifiants incorrects" };
  };

  // Enregistre un nouvel utilisateur dans localStorage
  const register = (email, password, name) => {
    const users = JSON.parse(localStorage.getItem("localUsers")) || [];

    // Vérifie si l'email est déjà utilisé
    if (users.some((u) => u.email === email)) {
      return { success: false, message: "Cet email est déjà utilisé" };
    }

    const newUser = {
      email,
      password,
      name,
      image: "/default-user.png",
    };

    // Ajoute le nouvel utilisateur à la liste et le connecte
    users.push(newUser);
    localStorage.setItem("localUsers", JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem("currentLocalUser", JSON.stringify(newUser));

    return { success: true, message: "Inscription réussie" };
  };

  // Déconnecte l'utilisateur
  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentLocalUser");
  };

  // Charge l'utilisateur actuel depuis le localStorage au montage
  useEffect(() => {
    const savedUser = localStorage.getItem("currentLocalUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return { user, login, register, logout, updateUser };
};
