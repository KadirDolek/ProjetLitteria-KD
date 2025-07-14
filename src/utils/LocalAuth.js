export const localAuth = {
  // Récupérer tous les utilisateurs
  getUsers: () => {
    if (typeof window === 'undefined') return [];
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  },

  // Sauvegarder les utilisateurs
  saveUsers: (users) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('users', JSON.stringify(users));
  },

  // Inscrire un nouvel utilisateur
  register: (email, password) => {
    const users = localAuth.getUsers();
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return { success: false, message: 'Cet email est déjà utilisé' };
    }

    // Créer un nouvel utilisateur
    const newUser = {
      id: Date.now().toString(),
      email,
      password, // En production, il faudrait hasher le mot de passe
      name: email.split('@')[0], // Utiliser la partie avant @ comme nom
      image: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localAuth.saveUsers(users);
    
    return { success: true, message: 'Inscription réussie', user: newUser };
  },

  // Connexion utilisateur
  login: (email, password) => {
    const users = localAuth.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Sauvegarder la session
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true, message: 'Connexion réussie', user };
    }
    
    return { success: false, message: 'Email ou mot de passe incorrect' };
  },

  // Déconnexion
  logout: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('currentUser');
  },

  // Récupérer l'utilisateur actuel
  getCurrentUser: () => {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  },

  // Vérifier si l'utilisateur est connecté
  isLoggedIn: () => {
    return localAuth.getCurrentUser() !== null;
  }
};