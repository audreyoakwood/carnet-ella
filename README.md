# 🌸 Mon carnet

Une petite application web (PWA) de **suivi du cycle menstruel**, pensée pour être simple, rassurante et jolie. On touche un jour du calendrier, on renseigne l'intensité du flux, et c'est tout.

---

## ✨ Fonctionnalités

- **Calendrier mensuel** — navigation mois par mois + bouton « Aujourd'hui ».
- **Saisie du flux** en un geste : Léger / Moyen / Abondant (1, 2 ou 3 gouttes).
- **Récapitulatif** du mois en cours (nombre de jours notés).
- **Synchronisation cloud** via [JSONBin.io](https://jsonbin.io), avec repli automatique sur le stockage local (`localStorage`) si le réseau est indisponible.
- **Indicateur de synchronisation** discret (Synchro / Synchro… / Hors ligne).
- **Bloc d'infos repliable** (ouvrable/fermable via le bouton « i »).
- **Export** des données au format JSON.
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

## 🚀 Lancer en local

L'app est 100 % front-end (aucun serveur à installer). Comme elle charge des fichiers `.js` séparés et un `manifest.json`, il faut la servir via un petit serveur HTTP local (l'ouverture directe du fichier `index.html` peut poser problème selon le navigateur) :

```bash
# Avec Python 3
python3 -m http.server 8000

# ou avec Node
npx serve .
```

Puis ouvrir <http://localhost:8000> dans le navigateur.

---

## ⚙️ Configuration (JSONBin)

Les données sont stockées dans un « bin » JSONBin. La configuration se trouve dans **`config.js`** :

```js
var BIN_ID  = '...';            // identifiant du bin
var API_KEY = '...';            // clé d'accès JSONBin
var API_URL = 'https://api.jsonbin.io/v3/b/' + BIN_ID;
```

Pour utiliser ton propre stockage :

1. Créer un compte sur [jsonbin.io](https://jsonbin.io).
2. Créer un bin et récupérer son **BIN ID** ainsi qu'une **clé d'accès (X-Access-Key)**.
3. Reporter ces valeurs dans `config.js`.

> ⚠️ **Note de sécurité.** Cette app étant entièrement côté client, la clé API présente dans `config.js` est visible par quiconque a accès au code (ou au site déployé). C'est inhérent à une application front-end sans serveur. Garde le dépôt **privé** et n'y stocke pas de données sensibles. Pour un vrai cloisonnement, il faudrait passer par un back-end (proxy) qui garde la clé côté serveur.

---

## 📲 Installation en PWA

L'app peut être ajoutée à l'écran d'accueil :

- **iOS (Safari)** : bouton Partager → « Sur l'écran d'accueil ».
- **Android (Chrome)** : menu ⋮ → « Ajouter à l'écran d'accueil » / « Installer l'application ».

> L'icône est mise en cache par le système à l'installation. Après une mise à jour de l'icône, il faut **retirer puis ré-ajouter** l'app pour la voir changer. Le contenu de l'app, lui, se met à jour à la prochaine ouverture (pas de service worker qui bloque).

---

## 💾 Données & confidentialité

- Les données saisies (dates + intensité) sont enregistrées sur JSONBin **et** en local sur l'appareil.
- Aucune donnée n'est envoyée ailleurs.
- Le bouton **« exporter mes données »** (en bas de l'app) télécharge une sauvegarde JSON, utile en cas de changement d'appareil.

---

## 🛠️ Technologies

- HTML / CSS / JavaScript **vanilla** (aucune dépendance, aucun build).
- [JSONBin.io](https://jsonbin.io) pour la synchronisation.
- API Web : `fetch`, `localStorage`, manifest PWA.

---

## 🌐 Compatibilité

- Navigateurs mobiles récents (iOS Safari, Android Chrome) : rendu complet.
- Anciens Android : des **fallbacks CSS** sont prévus (fonds opaques si `backdrop-filter` non supporté, hauteur fixe des cases si `aspect-ratio` non supporté).
