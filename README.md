# Portfolio — React + Vite

Portfolio personnel développé avec React 18 et Vite. Toutes les données sont centralisées dans un seul fichier JSON.

---

## 🚀 Démarrage rapide

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

---

## 📂 Architecture du projet

```
portfolio/
├── index.html                    # Point d'entrée HTML
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                  # Point d'entrée React
    ├── App.jsx                   # Composant racine — assemble les sections
    │
    ├── data/
    │   └── portfolio.json        # ✅ SOURCE UNIQUE — toutes vos données ici
    │
    ├── styles/
    │   └── globals.css           # Variables CSS, reset, utilitaires globaux
    │
    └── components/
        ├── layout/
        │   ├── Navbar.jsx        # Navigation fixe avec scroll actif
        │   └── Footer.jsx        # Pied de page
        │
        ├── ui/
        │   └── index.jsx         # Composants réutilisables:
        │                         #   SectionDivider, SectionHeader,
        │                         #   Avatar, Tag, TagList, SocialLinks
        │
        └── sections/
            ├── Hero.jsx          # Section héro (nom, titre, stats)
            ├── About.jsx         # À propos, photo, infos personnelles
            ├── Skills.jsx        # Compétences avec filtre par catégorie
            ├── Projects.jsx      # Projets avec toggle "voir plus"
            ├── Timeline.jsx      # Expérience + Formation (timeline partagée)
            ├── Certifications.jsx# Certifications professionnelles
            └── Contact.jsx       # Formulaire de contact + infos
```

---

## ✏️ Personnaliser votre portfolio

**Tout se passe dans `src/data/portfolio.json`.**

### Profil & coordonnées
```json
"profile": {
  "name": "Votre Nom",
  "title": "Votre poste",
  "bio": "Votre bio courte...",
  "email": "vous@exemple.fr",
  "phone": "+33 6 ...",
  "location": "Ville, Pays",
  "available": true,
  "avatar": "https://URL-de-votre-photo.jpg",
  "photo": "https://URL-de-votre-grande-photo.jpg",
  "cvLink": "https://lien-vers-votre-cv.pdf",
  "social": {
    "github":   "https://github.com/vous",
    "linkedin": "https://linkedin.com/in/vous",
    "twitter":  "https://twitter.com/vous"
  }
}
```
> Laissez `avatar` ou `photo` vides (`""`) pour afficher les initiales / l'emoji par défaut.

### Stats héro
```json
"hero": {
  "greeting": "Hey, je suis",
  "stats": [
    { "id": 1, "value": "12+", "label": "Projets réalisés" }
  ]
}
```

### Compétences
Chaque compétence a une `category` qui alimente le filtre automatiquement.
```json
{ "id": 1, "name": "React", "icon": "⚛️", "level": 92, "category": "Frontend" }
```

### Projets
Mettez `"featured": true` pour afficher le badge ★ sur la carte.
Les `links.demo` ou `links.github` vides (`""`) cachent automatiquement le bouton.

### Expériences & Formations
Même structure — `title`/`degree`, `company`/`school`, `period`, `description`, `tags`.

### Certifications
Laissez `"link": ""` pour masquer le lien "Voir le certificat".

---

## 🎨 Personnaliser le design

Les tokens de design sont dans `src/styles/globals.css` :

```css
:root {
  --accent:     #00e5c3;   /* Couleur principale */
  --bg-base:    #0a0e14;   /* Fond principal */
  --font-display: 'Syne', sans-serif;
  /* ... */
}
```

---

## 📦 Déploiement

```bash
npm run build
# → dossier dist/ prêt à déployer sur Vercel, Netlify, GitHub Pages...
```

Sur **Vercel** ou **Netlify** : connectez votre repo GitHub, la commande de build est `npm run build` et le dossier de sortie est `dist`.
