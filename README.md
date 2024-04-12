# Projet Table React avec Pagination et Filtrage
Ce projet React illustre l'implémentation d'une table avec pagination et filtrage, utilisant Tailwind CSS pour le style. Le tableau affiche des données dynamiques et permet aux utilisateurs de filtrer et naviguer à travers des pages de résultats.

## Fonctionnalités

- **Filtrage Dynamique** : Les utilisateurs peuvent entrer des termes de recherche pour filtrer les rangées de la table selon les correspondances.
- **Pagination** : Navigation paginée pour parcourir les données lorsqu'elles dépassent le nombre de rangées défini par page.
- **Style Moderne** : Utilisation de Tailwind CSS pour un design responsive et moderne.

## Démarrage rapide

Suivez ces étapes pour configurer et exécuter le projet localement.

### Prérequis

Assurez-vous d'avoir Node.js installé sur votre machine. Si ce n'est pas le cas, vous pouvez le télécharger et l'installer depuis [nodejs.org](https://nodejs.org/).

### Installation

1. **Clonez le dépôt** :
   ```bash
   git clone https://github.com/Shintot/DataTable.git

Installez les dépendances :

    npm install



Lancez l'application :

    npm start

L'application sera alors accessible à l'adresse http://localhost:3000 dans votre navigateur.
Structure du projet

    src/components/Table/: Contient tous les composants liés à la table, y compris la table elle-même, l'en-tête de la table, le contenu de la table, etc.
    src/App.js: Le composant racine qui utilise le FilteredPaginatedTable pour afficher les données.

