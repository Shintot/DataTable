import React, {useEffect, useMemo, useState} from "react";
import {FaDownload} from "react-icons/fa6";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";

/**
 * Composant ContainerTable qui enveloppe les éléments enfants avec une disposition spécifique.
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.className - Noms de classe supplémentaires pour le style.
 * @param {React.ReactNode} props.children - Les éléments enfants.
 * @returns {JSX.Element} L'élément conteneur.
 */
export function ContainerTable({className, children}) {
    return (
        <div className={`flex flex-col justify-between h-[450px] ${className}`}>
            {children}
        </div>
    );
}

/**
 * Displays a title for a table.
 * @param {Object} props - The component props.
 * @param {string} props.title - The text of the title.
 * @returns {JSX.Element} The title element.
 */
export function TitleTable({title}) {
    return <h1 className="text-xl text-left text-gray-800 font-semibold">{title}</h1>;
}

/**
 * Affiche un titre pour une table.
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.title - Le texte du titre.
 * @returns {JSX.Element} L'élément du titre.
 */

export function DataTable({className, children}) {
    return (
        <div className={`overflow-x-auto ${className}`} style={{maxHeight: '450px'}}>
            <table className="min-w-full">
                {children}
            </table>
        </div>
    );
}

/**
 * TableHeader rend une ligne d'en-tête pour une table avec des colonnes triables de manière interactive.
 * @param {Object} props - Les propriétés pour TableHeader.
 * @param {Array} props.headers - Tableau d'objets représentant les en-têtes de la table, chaque objet contenant une clé unique et une étiquette.
 * @param {string} [props.headerClassName] - Classe(s) CSS à appliquer sur la ligne d'en-tête entière pour un style supplémentaire.
 * @param {string} [props.cellClassName] - Classe(s) CSS à appliquer sur chaque cellule d'en-tête pour un style supplémentaire.
 * @param {function} props.onSort - Fonction à exécuter lorsqu'un en-tête est cliqué, utilisée pour trier les données.
 * @param {Object} props.sorting - Contient l'état actuel du tri, incluant la clé et la direction ('asc' ou 'desc').
 * @returns {JSX.Element} Une ligne d'en-tête de table avec des capacités de tri.
 */
export function TableHeader({headers, headerClassName, cellClassName, onSort, sorting}) {
    return (
        <thead>
        <tr className={`text-left ${headerClassName || "bg-gray-800 text-white"}`}>
            {headers.map((header) => (
                <th key={header.key}
                    className={`px-6 py-3 cursor-pointer ${cellClassName || "font-bold"}`}
                    onClick={() => onSort(header.key)}
                    style={{minHeight: '50px'}}>
                    {header.label}
                    {sorting.key === header.key ? (sorting.direction === 'desc' ? ' 🔽' : ' 🔼') : null}
                </th>
            ))}
        </tr>
        </thead>
    );
}

/**
 * TableContent rend le corps d'une table incluant les lignes de données et potentiellement des lignes vides pour maintenir une hauteur constante de la table.
 * @param {Object} props - Les propriétés pour TableContent.
 * @param {Array} props.data - Tableau d'objets de données qui seront rendus dans la table.
 * @param {Array} props.headers - Tableau d'informations d'en-têtes utilisé pour rendre chaque cellule dans les lignes de données.
 * @param {string} [props.rowClassName] - Classe(s) CSS à appliquer à chaque ligne pour un style supplémentaire.
 * @param {string} [props.cellClassName] - Classe(s) CSS à appliquer à chaque cellule pour un style supplémentaire.
 * @returns {JSX.Element} Un élément tbody contenant à la fois des lignes peuplées et potentiellement vides pour un affichage cohérent.
 */
export function TableContent({data, headers, rowClassName, cellClassName}) {
    const emptyRows = 5 - data.length;

    return (
        <tbody>
        {data.map((item, index) => (
            <tr key={index}
                className={`border-b last:border-b-0 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} ${rowClassName}`}>
                {headers.map(header => (
                    <td key={`${header.key}-${index}`} className={`px-6 py-4 ${cellClassName}`}>
                        {item[header.key]}
                    </td>
                ))}
            </tr>
        ))}
        {emptyRows > 0 && Array.from({length: emptyRows}).map((_, index) => (
            <tr key={`empty-${index}`} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} ${rowClassName}`}>
                <td colSpan={headers.length} className="h-14"></td>
            </tr>
        ))}

        </tbody>
    );
}

/**
 * PaginationControls affiche les contrôles de pagination pour naviguer entre les pages d'une table.
 * @param {Object} props - Les propriétés du composant.
 * @param {number} props.currentPage - La page actuelle, indexée à partir de 0.
 * @param {number} props.pageCount - Le nombre total de pages.
 * @param {Function} props.onPageChange - Fonction à exécuter lors du changement de page.
 * @returns {JSX.Element} - Un élément div contenant les boutons de pagination.
 */
export function PaginationControls({currentPage, pageCount, onPageChange}) {
    return (
        <div className="flex justify-between items-center mt-4">
            <button onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage <= 0}
                    className="px-4 py-2 ml-5 rounded bg-gray-700 text-white hover:bg-gray-800 disabled:bg-gray-300">
                Précédent
            </button>
            <span>Page {currentPage + 1} sur {pageCount}</span>
            <button onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= pageCount - 1}
                    className="px-4 py-2 mr-5 rounded bg-gray-700 text-white hover:bg-gray-800 disabled:bg-gray-300">
                Suivant
            </button>
        </div>
    );
}

/**
 * DownloadTableButton permet de télécharger les données de la table au format CSV.
 * @param {Object} props - Les propriétés du composant.
 * @param {Array} props.data - Les données de la table à exporter.
 * @param {Array} props.headers - Les en-têtes de la table, utilisés pour créer la première ligne du fichier CSV.
 * @returns {JSX.Element} - Un bouton permettant de télécharger les données de la table en format CSV.
 */
export function DownloadTableButton({data, headers}) {
    const downloadCSV = () => {
        const csvRows = [];
        const headersArray = headers.map(header => header.label);
        csvRows.push(headersArray.join(','));

        data.forEach(row => {
            const values = headers.map(header => `"${row[header.key].replace(/"/g, '""')}"`);
            csvRows.push(values.join(','));
        });

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], {type: 'text/csv'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'download.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <button onClick={downloadCSV} className="ml-5 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-900">
            <FaDownload className="text-white"/>
        </button>
    );
}

export function MobileTable({data, headers}) {
    return (
        <div className="flex flex-col space-y-4 p-2">
            {data.map((item, index) => (
                <div key={index} className="w-screen bg-white rounded-lg p-4 shadow">
                    {headers.map(header => (
                        <div key={header.key} className="flex  py-1">
                            <span className="font-bold">{header.label}:</span>
                            <span className="ml-3 text-gray-600">{item[header.key]}</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

/**
 * SearchInput représente un champ de saisie pour la recherche, intégrant un icône de loupe.
 * @param {Object} props - Les propriétés du composant.
 * @param {function} props.onSearchChange - Fonction à exécuter lorsque la valeur du champ de recherche change.
 * @returns {JSX.Element} Un champ de recherche stylisé avec une icône de loupe.
 */
export function SearchInput({onSearchChange}) {
    const [search, setSearch] = useState('');

    const handleChange = (e) => {
        setSearch(e.target.value);
        onSearchChange(e.target.value);
    };

    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-900"/>
            </div>
            <input
                type="text"
                value={search}
                onChange={handleChange}
                placeholder="Recherche..."
                className="pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
        </div>
    );
}

function IconView({data}) {
    return (
        <div className="flex flex-wrap justify-start items-center">
            {data.map((item, index) => (
                <div key={index}
                     className="m-2 w-40 h-40 flex flex-col items-center justify-center bg-gray-100 shadow rounded">
                    <img src={item.image} alt={`${item.firstName} ${item.lastName}`}
                         className="w-24 h-24 rounded-full"/>
                    <span>{item.firstName} {item.lastName}</span>
                </div>
            ))}
        </div>
    );
}


function CardView({data}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {data.map((item, index) => (
                <div key={index} className="bg-white shadow rounded p-4">
                    <h5 className="text-lg font-bold">{item.firstName} {item.lastName}</h5>
                    <p>{item.email}</p>
                    <p className="text-gray-600">{item.infos}</p>
                </div>
            ))}
        </div>
    );
}


/**
 * Composant FilteredPaginatedTable qui gère une table avec filtration, tri, et pagination.
 * @param {Object} props - Les propriétés du composant.
 * @param {Array} props.data - Les données à afficher dans la table.
 * @param {Array} props.headers - Les en-têtes de la table, utilisés pour le tri et l'affichage.
 * @param {React.SetStateAction} setSearch - Fonction pour définir la chaîne de recherche.
 * @param {React.SetStateAction} setCurrentPage - Fonction pour définir la page courante.
 * @param {React.SetStateAction} setSorting - Fonction pour définir le tri.
 * @param {number} pageSize - Le nombre d'éléments par page.
 * @param {React.SetStateAction} setIsMobile - Fonction pour ajuster l'affichage en fonction de la taille de l'écran.
 * Utilise useEffect pour gérer les événements de redimensionnement et les changements de recherche.
 * Utilise useMemo pour recalculer les données triées et filtrées lorsque nécessaire.
 * @returns {JSX.Element} Le composant de table paginé et filtré avec gestion du responsive.
 */
export function FilteredPaginatedTable({data, headers}) {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [sorting, setSorting] = useState({key: '', direction: 'asc'});
    const [viewMode, setViewMode] = useState('table'); // Vue par défaut
    const [pageSizeTable, setPageSizeTable] = useState(5);
    const [pageSizeIcon, setPageSizeIcon] = useState(12);
    const [pageSizeCard, setPageSizeCard] = useState(8);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setCurrentPage(0);
    }, [search, viewMode]);

    const handleSort = (key) => {
        setSorting(prev => {
            if (prev.key === key) {
                return {key, direction: prev.direction === 'asc' ? 'desc' : 'asc'};
            }
            return {key, direction: 'asc'};
        });
    };

    const sortedData = useMemo(() => {
        return data.filter(item => item.firstName.toLowerCase().includes(search.toLowerCase()) ||
            item.lastName.toLowerCase().includes(search.toLowerCase()) ||
            item.email.toLowerCase().includes(search.toLowerCase()) ||
            item.infos.toLowerCase().includes(search.toLowerCase()) ||
            item.username.toLowerCase().includes(search.toLowerCase())
        ).sort((a, b) => {
            if (sorting.key && a[sorting.key] !== b[sorting.key]) {
                return sorting.direction === 'asc' ? a[sorting.key].localeCompare(b[sorting.key]) : b[sorting.key].localeCompare(a[sorting.key]);
            }
            return 0;
        });
    }, [data, search, sorting]);

    const currentData = useMemo(() => {
        let effectivePageSize = pageSizeTable;
        if (viewMode === 'icon') {
            effectivePageSize = pageSizeIcon;
        } else if (viewMode === 'card') {
            effectivePageSize = pageSizeCard;
        }
        return sortedData.slice(currentPage * effectivePageSize, (currentPage + 1) * effectivePageSize);
    }, [currentPage, sortedData, viewMode, pageSizeTable, pageSizeIcon, pageSizeCard]);

    const pageCount = useMemo(() => {
        let effectivePageSize = pageSizeTable;
        if (viewMode === 'icon') {
            effectivePageSize = pageSizeIcon;
        } else if (viewMode === 'card') {
            effectivePageSize = pageSizeCard;
        }
        return Math.ceil(sortedData.length / effectivePageSize);
    }, [sortedData, viewMode, pageSizeTable, pageSizeIcon, pageSizeCard]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <ContainerTable className="w-[1200px] p-3 m-3">
            <div className="flex justify-between mb-4">
                <TitleTable title="Mon Tableau"/>
                <div className="flex">
                    <button className="bg-gray-800 p-3 text-white rounded mx-2 " onClick={() => setViewMode('table')}>Table</button>
                    <button className="bg-gray-800 p-3 text-white rounded mx-2" onClick={() => setViewMode('icon')}>Icons</button>
                    <button className="bg-gray-800 p-3 text-white rounded mx-2" onClick={() => setViewMode('card')}>Cards</button>
                    <SearchInput onSearchChange={setSearch}/>
                    <DownloadTableButton data={sortedData} headers={headers}/>
                </div>
            </div>
            {viewMode === 'table' ?
                <ContainerTable className="w-[1200px] p-3 m-3">
                    {isMobile ? (
                        <MobileTable data={currentData} headers={headers}/>
                    ) : (
                        <DataTable>
                            <TableHeader headers={headers} headerClassName="bg-gray-800 text-white"
                                         cellClassName="font-bold"
                                         onSort={handleSort} sorting={sorting}/>
                            <TableContent data={currentData} headers={headers} rowClassName=""
                                          cellClassName="text-gray-900"/>
                        </DataTable>
                    )}
                </ContainerTable> : null}
            {viewMode === 'icon' ? <IconView data={currentData}/> : null}
            {viewMode === 'card' ? <CardView data={currentData}/> : null}
            <PaginationControls currentPage={currentPage} pageCount={pageCount} onPageChange={handlePageChange}/>
        </ContainerTable>
    );
}

