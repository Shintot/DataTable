
<img width="1258" alt="Capture d’écran 2024-04-13 à 00 42 58" src="https://github.com/Shintot/DataTable/assets/85890290/9cabfca3-8dbd-4178-901a-753d4de3a26f">

# Table avec Pagination et Filtrage
Ce projet React illustre l'implémentation d'une table avec pagination et filtrage, utilisant Tailwind CSS pour le style. Le tableau affiche des données dynamiques et permet aux utilisateurs de filtrer et naviguer à travers des pages de résultats.

## Fonctionnalités

- **Filtrage Dynamique** : Les utilisateurs peuvent entrer des termes de recherche pour filtrer les rangées de la table selon les correspondances.
- **Pagination** : Navigation paginée pour parcourir les données lorsqu'elles dépassent le nombre de rangées défini par page.
- **Style Moderne** : Utilisation de Tailwind CSS pour un design responsive et moderne.

## Utilisation

Pour intégrer `FilteredPaginatedTable` dans votre projet, suivez ces étapes simples :

1. **Intégration du composant** :
   - Copiez le fichier `Table.jsx` depuis `src/components/Table/` dans le dossier de composants de votre projet.

2. **Utilisation du composant dans votre application** :
   - Importez et utilisez le composant `FilteredPaginatedTable` dans votre application en passant les données et les en-têtes comme props :
     ```jsx
     import FilteredPaginatedTable from './components/FilteredPaginatedTable';

     const data = [...]; // Vos données
     const headers = [...]; // Les en-têtes de votre tableau

     function exemple() {
       return <FilteredPaginatedTable data={data} headers={headers} />;
     }
     ```

## Structure du Projet

- `src/components/Table/`: Contient tous les composants liés à la table, y compris la table elle-même, l'en-tête de la table, le contenu de la table, etc.
- `src/App.js`: Le composant racine qui utilise le `FilteredPaginatedTable` pour afficher les données.
