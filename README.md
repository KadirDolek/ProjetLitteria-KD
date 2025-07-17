
## Deploy on Vercel

# 📚 Litteria - Librairie en ligne

Litteria est une application web de vente de livres en ligne développée avec Next.js, offrant une expérience utilisateur moderne et intuitive pour découvrir et acheter des livres.

## 🚀 Fonctionnalités

- **Catalogue de livres** : Parcours d'une large collection de livres avec système de pagination
- **Authentification** : Connexion via Google (NextAuth) et système d'authentification locale
- **Panier d'achat** : Gestion complète du panier avec ajout/suppression d'articles
- **Historique d'achats** : Suivi des commandes par utilisateur
- **Système de notation** : Mise en avant des livres les mieux notés
- **Design responsive** : Interface adaptée à tous les écrans
- **Animations fluides** : Utilisation de Framer Motion pour une UX améliorée

## 🛠️ Technologies utilisées

- **Framework** : Next.js 14 (App Router)
- **Styling** : Tailwind CSS
- **State Management** : Redux Toolkit
- **Authentification** : NextAuth.js
- **Animations** : Framer Motion
- **Fonts** : Google Fonts (Merienda, Ubuntu Sans)
- **Icons** : FontAwesome, Boxicons

## 📁 Structure du projet

```
litteria/
├── app/
│   ├── api/
│   │   └── auth/
│   ├── collection/
│   ├── details/
│   ├── dystopie/
│   ├── login/
│   ├── orderhistory/
│   ├── panier/
│   ├── payment/
│   ├── recently/
│   ├── romance/
│   ├── school/
│   ├── search/
│   └── userinfo/
├── components/
├── hooks/
├── store/
│   ├── bookSlice.js
│   ├── cartSlice.js
│   ├── historySlice.js
│   └── store.js
└── utils/
    └── LocalAuth.js
```

## 🎨 Design

Le design de Litteria a été conçu avec une attention particulière portée à l'expérience utilisateur :

- **Palette de couleurs** : Tons chauds et ambrés évoquant l'univers du livre
- **Typographie** : Police Merienda pour les titres, Ubuntu Sans pour le contenu
- **Animations** : Transitions fluides et micro-interactions
- **Layout** : Design responsive avec navigation intuitive

## 🔧 Installation et configuration

1. **Cloner le repository**
```bash
git clone [ProjetLitteria-KD]
cd litteria
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration des variables d'environnement**
Créer un fichier `.env.local` :
```env
NEXTAUTH_URL=https://projetlitteria-kadirdolek.vercel.app/
NEXTAUTH_SECRET=(je dis paaaas)
GOOGLE_CLIENT_ID=1079590955921-2utlv1bjl77tuv5ggqo5e4jhkde9k7a3.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
```

4. **Lancer l'application**
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`
et via `https://projetlitteria-kadirdolek.vercel.app/`

## 📱 Fonctionnalités détaillées

### Authentification
- **Google OAuth** : Connexion rapide via compte Google
- **Authentification locale** : Système d'inscription/connexion traditionnel
- **Gestion de session** : Persistance des données utilisateur

### Gestion du panier
- Ajout/suppression d'articles
- Modification des quantités
- Calcul automatique du total
- Persistance entre les sessions

### Historique d'achats
- Suivi des commandes par utilisateur
- Détails des achats précédents
- Stockage local sécurisé

### Catalogue
- Filtrage par genre (dystopie, romance, école, etc.)
- Système de recherche
- Pagination intelligente
- Détails complets pour chaque livre

## 🎯 Pages principales

- **Accueil** : Carousel, livres populaires, sélection J.K. Rowling
- **Collection** : Catalogue complet avec filtres
- **Détails** : Page produit avec informations complètes
- **Panier** : Gestion des articles sélectionnés
- **Profil** : Informations utilisateur et historique
- **Paiement** : Processus de commande simplifié

## 🌐 Liens utiles

- **Documentation** : Accessible via pdf dans le footer
- **Maquette Figma** : [(https://www.figma.com/design/5a2ozTQznFnfG5uFYDQXTm/Projet-Front?node-id=0-1&p=f&t=v6FgzuAKE1bQD5s7-0)]
- **LinkedIn** : [(https://www.linkedin.com/in/kadir-d%C3%B6lek-572975226/)]
- **GitHub** : [(https://github.com/KadirDolek)]
- **Notion** : [https://www.notion.so/Litteria-2334d615f32f80cda549d25847d196c1]
- **Source** : [https://tailwindcss.com/],[https://nextjs.org/docs]µ et Claude. 

## 📊 API et données

L'application utilise l'API `https://example-data.draftbit.com/books` pour récupérer les données des livres avec :
- Informations complètes (titre, auteur, description, etc.)
- Système de prix avec promotions aléatoires
- Ratings et images de couverture

## 🚀 Déploiement

Le projet est optimisé pour le déploiement sur Vercel avec configuration automatique des cookies et gestion des sessions.


*Développé avec seum par Kadir Dolek*