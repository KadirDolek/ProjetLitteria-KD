import { useState, useEffect } from "react";

export const useLocalAuth = () => {
  const [user, setUser] = useState(null);

  const updateUser = (updatedUser) => {
    // Update in local storage
    localStorage.setItem("currentLocalUser", JSON.stringify(updatedUser));
    
    // Update in users list if needed
    const users = JSON.parse(localStorage.getItem("localUsers")) || [];
    const userIndex = users.findIndex(u => u.email === updatedUser.email);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem("localUsers", JSON.stringify(users));
    }
    
    setUser(updatedUser);
  };

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

  const register = (email, password, name) => {
    const users = JSON.parse(localStorage.getItem("localUsers")) || [];

    if (users.some((u) => u.email === email)) {
      return { success: false, message: "Cet email est déjà utilisé" };
    }

    const newUser = {
      email,
      password,
      name,
      image: "/default-user.png",
    };

    users.push(newUser);
    localStorage.setItem("localUsers", JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem("currentLocalUser", JSON.stringify(newUser));

    return { success: true, message: "Inscription réussie" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentLocalUser");
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("currentLocalUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return { user, login, register, logout, updateUser };
};