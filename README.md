# 🌸 Mon carnet

Une petite application web (PWA) de **suivi du cycle menstruel**, pensée pour être simple, rassurante et jolie. On touche un jour du calendrier, on renseigne l'intensité du flux, et c'est tout.

---

## ✨ Fonctionnalités

- **Calendrier mensuel** — navigation mois par mois + bouton « Aujourd'hui ».
- **Saisie du flux** en un geste : Léger / Moyen / Abondant (1, 2 ou 3 gouttes).
- **Récapitulatif** du mois en cours (nombre de jours notés).
- **Design « fluid »** : dégradés, effet verre dépoli (glassmorphism), animations douces.
- **Installable** sur l'écran d'accueil (iOS et Android) grâce au manifest PWA et à une icône maskable.
- **Accessibilité** : contrastes de texte conformes WCAG AA sur les éléments essentiels.

---

## 🗂️ Structure du projet

```
carnet-ella/
├── index.html      # Structure de la page
├── style.css       # Tout le style (design fluide + fallbacks)
├── app.js          # Logique : calendrier, saisie, synchronisation, export
├── config.js       # Configuration : identifiants JSONBin (clé API, bin id)
├── manifest.json   # Manifest PWA (nom, couleurs, icônes)
├── icon.png        # Fleur source (192×192)
├── icon-192.png    # Icône PWA 192×192
└── icon-512.png    # Icône PWA 512×512 (dont maskable)
```

---

## 📲 Installation en PWA

L'app peut être ajoutée à l'écran d'accueil :

- **iOS (Safari)** : bouton Partager → « Sur l'écran d'accueil ».
- **Android (Chrome)** : menu ⋮ → « Ajouter à l'écran d'accueil » / « Installer l'application ».

> L'icône est mise en cache par le système à l'installation. Après une mise à jour de l'icône, il faut **retirer puis ré-ajouter** l'app pour la voir changer. Le contenu de l'app, lui, se met à jour à la prochaine ouverture (pas de service worker qui bloque).


## 🌐 Compatibilité

- Navigateurs mobiles récents (iOS Safari, Android Chrome) : rendu complet.
- Anciens Android : des **fallbacks CSS** sont prévus (fonds opaques si `backdrop-filter` non supporté, hauteur fixe des cases si `aspect-ratio` non supporté).
