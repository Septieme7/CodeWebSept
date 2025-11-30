# 🔥 CodeWebSept - Portfolio Professionnel

![Version](https://img.shields.io/badge/version-1.0.0-red)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

> 🌐 Site vitrine professionnel de **Ben Astier** - Concepteur-Développeur Web/Mobile & Technicien Informatique

---

## 📋 Table des matières

- [🎯 Présentation](#-présentation)
- [✨ Fonctionnalités](#-fonctionnalités)
- [📁 Structure du projet](#-structure-du-projet)
- [🚀 Installation](#-installation)
- [🎨 Personnalisation](#-personnalisation)
- [📱 Responsive Design](#-responsive-design)
- [🔧 Technologies utilisées](#-technologies-utilisées)
- [📞 Contact](#-contact)
- [📄 Licence](#-licence)

---

## 🎯 Présentation

**CodeWebSept** est un site portfolio moderne au style **Cyberpunk** présentant les compétences et services de Ben Astier dans le domaine informatique :

- 💻 Développement Web & Mobile
- 🔧 Maintenance et réparation PC/Mac
- 📱 Réparation smartphones Android
- 🌐 Configuration réseaux LAN/WLAN
- 💡 Installation Fibre Optique (FTTH)
- 🐧 Installation systèmes (Windows, Linux, macOS)

---

## ✨ Fonctionnalités

### 🖼️ Effets visuels
- 🎨 **Canvas animé** avec particules géométriques
- 🖼️ **Images flottantes** en arrière-plan (triosphères)
- 🖱️ **Curseur personnalisé** qui suit la souris
- ✨ **Effet glitch** sur le logo
- 🌟 **Animations au scroll** pour les cartes

### 🎛️ Contrôles utilisateur
- 🌓 **Thème sombre/clair** avec sauvegarde
- 🖥️ **Mode plein écran**
- ⬆️ **Bouton retour en haut**
- 📱 **Menu hamburger** sur mobile

### 📧 Contact
- ✉️ **Mailto stylisé** avec animation
- 📲 **Lien WhatsApp** direct
- 🎨 **Cartes de contact** avec effets de survol

---

## 📁 Structure du projet

```
CodeWebSept/
│
├── 📄 index.html              # Page principale
├── 📄 .gitignore              # Fichiers ignorés par Git
├── 📄 README.md               # Documentation
│
└── 📂 assets/
    │
    ├── 📂 css/
    │   └── 📄 style.css       # Feuille de style principale
    │
    ├── 📂 js/
    │   └── 📄 script.js       # Script JavaScript
    │
    ├── 📂 images/
    │   ├── 🖼️ picSept1.png    # Image flottante 1
    │   ├── 🖼️ picSept2.png    # Image flottante 2
    │   ├── 🖼️ picSept3.png    # Image flottante 3
    │   ├── 🖼️ picSept4.png    # Image flottante 4
    │   ├── 🖼️ picSept5.png    # Image flottante 5
    │   └── 🖼️ footsept1.png   # Image de fond footer
    │
    ├── 📂 icon/
    │   ├── 🍎 apple-touch-icon.png
    │   ├── 🔲 favicon-16x16.png
    │   ├── 🔲 favicon-32x32.png
    │   ├── 🤖 android-chrome-192x192.png
    │   ├── 🤖 android-chrome-512x512.png
    │   └── ⭐ favicon.ico
    │
    ├── 📂 manifest/
    │   └── 📄 site.webmanifest # Configuration PWA
    │
    ├── 📂 html/               # Pages additionnelles (optionnel)
    │
    └── 📂 sound/              # Fichiers audio (optionnel)
```

---

## 🚀 Installation

### Prérequis
- Un navigateur web moderne (Chrome, Firefox, Edge, Safari)
- Un serveur local (optionnel mais recommandé)

### Étapes

1️⃣ **Cloner le dépôt**
```bash
git clone https://github.com/votre-username/codewebsept.git
cd codewebsept
```

2️⃣ **Ajouter vos images**
Placez vos images dans le dossier `assets/images/` :
- `picSept1.png` à `picSept5.png` (images flottantes)
- `footsept1.png` (fond du footer)

3️⃣ **Ajouter vos favicons**
Placez vos icônes dans le dossier `assets/icon/`

4️⃣ **Lancer le site**
- Ouvrez `index.html` dans votre navigateur
- Ou utilisez un serveur local :
```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (npx)
npx serve
```

---

## 🎨 Personnalisation

### 🎨 Couleurs Cyberpunk

Les couleurs sont définies dans `assets/css/style.css` :

```css
:root {
    --cyber-black: #0a0a0a;      /* Noir profond */
    --cyber-dark: #1a0a0a;       /* Noir rouge */
    --cyber-red: #ff0033;        /* Rouge vif */
    --cyber-orange: #ff6600;     /* Orange */
    --cyber-yellow: #ffcc00;     /* Jaune */
}
```

### 📝 Informations personnelles

Modifiez dans `index.html` :
- Nom et prénom
- Adresse email
- Numéro WhatsApp
- Compétences et services

### 🖼️ Images

Remplacez les images dans `assets/images/` par les vôtres en gardant les mêmes noms de fichiers.

---

## 📱 Responsive Design

Le site s'adapte à toutes les tailles d'écran :

| 📱 Appareil | 📐 Breakpoint |
|-------------|---------------|
| 🖥️ Desktop | > 992px |
| 📱 Tablette | 768px - 992px |
| 📱 Mobile | 480px - 768px |
| 📱 Petit mobile | < 480px |

---

## 🔧 Technologies utilisées

| Technologie | Utilisation |
|-------------|-------------|
| ![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white) | Structure sémantique |
| ![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white) | Styles et animations |
| ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black) | Interactivité et canvas |
| ![Canvas API](https://img.shields.io/badge/-Canvas_API-000?logo=html5&logoColor=white) | Animations de fond |

### 📚 APIs utilisées
- **Canvas 2D** - Animations géométriques
- **Fullscreen API** - Mode plein écran
- **LocalStorage** - Sauvegarde du thème
- **Intersection Observer** - Animations au scroll

---

## 📞 Contact

| 📧 Email | 📱 WhatsApp |
|----------|-------------|
| [codewebsept@gmail.com](mailto:codewebsept@gmail.com) | [06 17 01 57 65](https://wa.me/33617015765) |

---

## 📄 Licence

© 2024 **CodeWebSept** - **By Seven** - Tous droits réservés.

---

<div align="center">

### 🔥 Made with ❤️ by Seven 🔥

![Cyberpunk](https://img.shields.io/badge/Style-Cyberpunk-ff0033)
![Responsive](https://img.shields.io/badge/Responsive-100%25-ff6600)
![SEO](https://img.shields.io/badge/SEO-Optimized-ffcc00)

</div>
