# l3m-tp1-2023-2024

## Configuration de votre github

Nous allons configurer votre github pour lui faire générer le site correspondant à votre projet.
Pour cela, nous nous appuierons sur les github pages et les github actions. 
A chaque fois que vous pousserez une nouvelle version de votre code sur le dépôt, il sera compilé via une github action et le résultat de la compilation sera mis en ligne sur github pages.

Rendez-vous à l'adresse de votre dépôt github, puis cliquez sur le bouton `Settings` en haut à droite.
Dans le menu à gauche, cliquez sur `Pages`, puis configurer comme suit :

* Source : `Deploy from a branch`
* Branch : `gh-pages`  /  `root`
* Puis cliquez sur `Save`

## Instruction

Commencez par installez les dépendances du projet (à faire une seul fois après avoir cloné le projet)

```bash
npm install
```

Editez le fichier **`app/tp1.ts`** pour réaliser les exercices.
N'oubliez pas de sauvegarder votre travail régulièrement et de le commiter.

Utilisez le script de test pour vérifier votre travail.

```bash
npm run test
```

## Soumettre son travail

Pour soumettre votre travail, il faut le pousser sur votre dépôt github.

```bash
git push
```
