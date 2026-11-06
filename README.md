# Rodolphe Duperray — portfolio

Un carnet personnel qui réunit bande dessinée, apps Apple et ingénierie pour la transition énergétique. Deux pages HTML complètes : français à la racine, anglais dans `en/`.

## Aperçu local

Depuis ce dossier :

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Ouvrir <http://127.0.0.1:4173/> ou <http://127.0.0.1:4173/en/>.

Le site ne nécessite aucune installation, aucun framework, aucun service distant ni clé. Les pages et la navigation principale restent utilisables sans JavaScript. JavaScript ajoute les fiches projet, la galerie avec agrandissement, l’ambiance jour/nuit de la scène énergétique et les apparitions au défilement. Les 44 pages du carnet restent accessibles sans JavaScript, grâce aux liens directs et à un volet natif qui déplie les 32 dernières pages. Les effets respectent la préférence de réduction des animations. Tous les médias et styles sont locaux ; aucun cookie, traceur ou appel réseau applicatif.

## Modifier

- `content.py` : les textes français et anglais, regroupés par entrée.
- `template.html` : la structure commune aux deux langues.
- `energy-scene.html` : la scène énergétique en SVG : deux maisons avec panneaux solaires, une batterie, une voiture, le réseau et une ambiance jour/nuit.
- `dist/styles.css` : la mise en page responsive et les animations.
- `dist/app.js` : les fiches et la galerie, navigable au clavier.
- `dist/assets/` : les copies optimisées des visuels. Les originaux iCloud ne sont jamais modifiés.

Après un changement de textes ou de structure :

```sh
python3 build.py
```

Ce générateur utilise uniquement la bibliothèque standard de Python 3. Il écrit `dist/index.html` et `dist/en/index.html`. Il n’est pas utilisé par le navigateur.

## Publication GitHub Pages

- Site : <https://rodo79.github.io/portfolio/>
- Dépôt : <https://github.com/rodo79/portfolio>
- `main` contient les sources et les fichiers générés dans `dist/`.
- `gh-pages` contient uniquement le site statique, à la racine de la branche.

GitHub Pages utilise **Deploy from a branch → gh-pages → / (root)**. La publication n’a besoin ni de serveur applicatif ni de workflow personnalisé.

Pour mettre le site à jour depuis la racine du dépôt :

```sh
python3 build.py
git add build.py content.py template.html energy-scene.html dist README.md
git commit -m "Update portfolio"
git push origin main
git subtree push --prefix dist origin gh-pages
```

Les liens relatifs permettent de publier sous `/portfolio/`, avec la version anglaise dans `/portfolio/en/`.

## Contenus et provenance

Les textes sont une proposition éditoriale à relire avec Rodolphe, en particulier les formulations à la première personne. Aucun résultat chiffré, témoignage ou prix n’a été inventé.

- Portrait : photographie fournie par Rodolphe, copiée telle quelle dans `assets/rodolphe-duperray.jpg` et placée dans « À propos », avec ses textes alternatifs FR/EN.
- Dessins : les 44 pages numérotées du dossier TIFF fourni. `assets/notebook/` contient 44 images de lecture (1 800 pixels sur le grand côté) et 44 vignettes légères. La première page est l’illustration en couleur, les autres sont les planches en noir et blanc. Les TIFF originaux restent inchangés et ne sont pas publiés.
- [Orbital Puck](https://github.com/rodo79/orbital-puck-site) : captures, icône, présentation des neuf adversaires et commandes.
- [Bastion Protocol](https://github.com/rodo79/bastion-protocol-site) : capture, icône, présentation et aperçu navigateur. Le site de référence ne fournit pas de lien App Store ; le portfolio renvoie vers son site et sa démo.
- [Timeglass](https://github.com/rodo79/timeglass) : icône, captures française et anglaise, fonctionnalités et lien App Store.
- [Lexilo](https://github.com/rodo79/lexilo) : icône, capture, fonctionnalités et lien App Store.
- Homsphere : rôle et périmètre détaillés fournis directement par Rodolphe dans la conversation. Le [site officiel](https://homsphere.com/fr/solution/) confirme le contexte produit.
- Wakanda / 4D : responsabilités et contributions détaillées fournies par Rodolphe dans la conversation ; [article du Monde Informatique daté du 17 juin 2011](https://www.lemondeinformatique.fr/actualites/lire-4d-livre-une-preview-de-wakanda-pour-developper-en-javascript-33990.html) pour le contexte historique. Le dessin du Model Editor est une évocation, pas une capture de l’interface originale.
- [LinkedIn](https://www.linkedin.com/in/rduperray/) : lien vers le parcours et point de contact.

Le visuel et le diagramme Homsphere sont des schémas de principe créés pour ce portfolio ; ils ne montrent ni une interface réelle, ni des données opérationnelles, ni une architecture interne.

Les dessins et médias gardent leurs droits d’origine. Ce dépôt n’attribue pas de licence ouverte aux œuvres.

La scène énergétique est volontairement illustrative : quelques points lumineux suivent les liaisons existantes, du solaire vers les usages et le stockage le jour, puis de la batterie vers les usages la nuit. Aucun fléchage ni panneau de pilotage n’est ajouté. Les points sont masqués si le visiteur préfère réduire les animations. Le motif rouge du site représente deux petites cases de BD superposées (`assets/ink-mark.svg`).
