# 🥖 Le Fournil de la Gère

Site vitrine de démonstration pour une boulangerie-pâtisserie artisanale.
Réalisé en **HTML, CSS et JavaScript**, sans framework ni dépendance : il suffit d'ouvrir `index.html` dans un navigateur.

> ⚠️ Projet de démonstration : l'adresse, le téléphone, l'email, les prix et les avis sont fictifs.

---

## ✨ Fonctionnalités

- **Accueil plein écran** avec une photo qui zoome doucement et un badge **« Ouvert / Fermé »** mis à jour selon l'heure réelle
- **Compteurs animés** (années, heures de fermentation, farines locales)
- **Catalogue de produits** filtrable par catégorie : Pains, Viennoiseries, Pâtisseries
- **Section savoir-faire** avec photos superposées et badge animé
- **Bandeau** pour les commandes de gâteaux, avec effet de profondeur au défilement
- **Galerie photo** en mosaïque, avec agrandissement plein écran (fermeture avec `Échap`)
- **Carrousel d'avis clients** qui défile automatiquement
- **Horaires** avec le jour actuel surligné
- **Formulaire de contact** qui vérifie les champs obligatoires (envoi simulé)
- **Responsive** : adapté au mobile, avec menu burger
- **Apparition des éléments au défilement**, désactivée si l'utilisateur a choisi de réduire les animations dans son système

## 📁 Structure

```
├── index.html   # Structure et contenu de la page
├── style.css    # Design (couleurs, typographie, mise en page, responsive)
├── script.js    # Interactions et animations
└── README.md
```

## 🚀 Lancer le site

Ouvrez simplement `index.html` dans votre navigateur.

Ou, pour un petit serveur local :

```bash
npx serve .
```

## 🎨 Personnaliser pour un client

| À modifier | Où |
|---|---|
| Nom, textes, produits, prix | `index.html` |
| Adresse, téléphone, email | `index.html`, section `#contact` |
| Horaires | le tableau `#hours` dans `index.html` **et** l'objet `HOURS` dans `script.js` |
| Couleurs | les variables en haut de `style.css` (`--crust`, `--brown`, `--cream`…) |
| Polices | le lien Google Fonts dans `index.html` + `--serif` / `--sans` dans `style.css` |
| Images | les attributs `src` des balises `<img>`, et les `url(...)` de `.hero__bg` et `.banner__bg` dans `style.css` |

### Rendre le formulaire fonctionnel

Pour l'instant, le formulaire n'envoie rien : il affiche seulement un message de confirmation.
Pour recevoir les messages par email, branchez-le sur un service comme [Formspree](https://formspree.io) ou [Web3Forms](https://web3forms.com).

## 🌐 Mise en ligne

Le site est 100 % statique et peut être hébergé gratuitement sur **GitHub Pages**, **Netlify** ou **Vercel**.

Avec GitHub Pages : *Settings → Pages → Branch `main` / root → Save*.

## 📷 Crédits

- Photos : [Unsplash](https://unsplash.com) (licence Unsplash, utilisation libre)
- Polices : [Fraunces](https://fonts.google.com/specimen/Fraunces) et [Inter](https://fonts.google.com/specimen/Inter), via Google Fonts

Pour un vrai site client, il vaut mieux télécharger les images et les héberger avec le site, ou les remplacer par les photos de la boulangerie.
