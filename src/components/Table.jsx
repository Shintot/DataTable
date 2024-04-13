import React, {useEffect, useMemo, useState} from 'react';
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import {FaDownload} from "react-icons/fa6";

export function ContainerTable({className, children}) {
    return (
        <div className={`flex flex-col justify-between h-[450px] ${className}`}>
            {children}
        </div>
    );
}


export function DataTable({className, children}) {
    return (
        <table className={`w-full min-h-[450px]" ${className}`}>
            {children}
        </table>
    );
}


export function TableHeader({headers, headerClassName, cellClassName, onSort, sorting}) {
    return (
        <thead>
        <tr className={`text-left ${headerClassName || "bg-gray-800 text-white"}`}>
            {headers.map((header) => (
                <th key={header.key} className={`px-6 py-3 cursor-pointer ${cellClassName || "font-bold"}`}
                    onClick={() => onSort(header.key)}>
                    {header.label}
                    {sorting.key === header.key ? (sorting.direction === 'desc' ? ' 🔽' : ' 🔼') : null}
                </th>
            ))}
        </tr>
        </thead>
    );
}


export function TableContent({data, rowClassName, cellClassName}) {
    const emptyRows = 5 - data.length;

    return (
        <tbody>
        {data.map((item, index) => (
            <tr key={index}
                className={`border-b last:border-b-0 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} ${rowClassName}`}>
                <td className={`px-6 py-4 ${cellClassName}`}>{item.firstName}</td>
                <td className={`px-6 py-4 ${cellClassName}`}>{item.lastName}</td>
                <td className={`px-6 py-4 ${cellClassName}`}>{item.email}</td>
                <td className={`px-6 py-4 ${cellClassName}`}>{item.infos}</td>
                <td className={`px-6 py-4 ${cellClassName}`}>{item.username}</td>
            </tr>
        ))}
        {emptyRows > 0 && Array.from({length: emptyRows}).map((_, index) => (
            <tr key={`empty-${index}`} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                <td colSpan="5" className="h-14"></td>
            </tr>
        ))}
        </tbody>
    );
}


export function MobileTable({ data, headers }) {
    return (
        <div className="flex flex-col space-y-2 p-2">
            {data.map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
                    {headers.map(header => (
                        <div key={header.key} className="py-1">
                            <span className="text-sm text-gray-500">{header.label}:</span>
                            <span className="text-sm text-gray-900 block ml-2">{item[header.key]}</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}


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

export function DownloadTableButton({data, headers}) {
    const downloadCSV = () => {
        const csvRows = [];
        // Headers
        const headersArray = headers.map(header => header.label);
        csvRows.push(headersArray.join(','));

        // Rows
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


export function TitleTable({title}) {
    return <h1 className="text-xl text-left text-gray-800 font-semibold">{title}</h1>;
}


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

export function FilteredPaginatedTable({data, headers}) {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [sorting, setSorting] = useState({key: '', direction: 'asc'});
    const pageSize = 5;
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
    }, [search]);

    const handleSort = (key) => {
        setSorting(prev => {
            if (prev.key === key) {
                if (prev.direction === 'desc') return {key: '', direction: ''};
                return {key, direction: prev.direction === 'asc' ? 'desc' : 'asc'};
            }
            return {key, direction: 'asc'};
        });
    };

    const sortedData = useMemo(() => {
        let sortableData = [...data.filter(item =>
            item.firstName.toLowerCase().includes(search.toLowerCase()) ||
            item.lastName.toLowerCase().includes(search.toLowerCase()) ||
            item.email.toLowerCase().includes(search.toLowerCase()) ||
            item.infos.toLowerCase().includes(search.toLowerCase()) ||
            item.username.toLowerCase().includes(search.toLowerCase())
        )];

        if (sorting.key) {
            sortableData.sort((a, b) => {
                if (a[sorting.key] < b[sorting.key]) {
                    return sorting.direction === 'asc' ? -1 : 1;
                }
                if (a[sorting.key] > b[sorting.key]) {
                    return sorting.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableData;
    }, [data, search, sorting]);

    const pageCount = Math.ceil(sortedData.length / pageSize);
    const currentData = sortedData.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <ContainerTable>
            <div className="flex justify-between mb-4">
                <TitleTable title="Mon Tableau"/>
                <div className="flex">
                    <SearchInput onSearchChange={setSearch}/>
                    <DownloadTableButton data={currentData} headers={headers}/>
                </div>
            </div>
            {isMobile ? (
                <MobileTable data={currentData} headers={headers}/>
            ) : (
                <DataTable>
                    <TableHeader headers={headers} headerClassName="bg-gray-800 text-white" cellClassName="font-bold"
                                 onSort={handleSort} sorting={sorting}/>
                    <TableContent data={currentData} rowClassName="" cellClassName="text-gray-900"/>
                </DataTable>
            )}
            <PaginationControls currentPage={currentPage} pageCount={pageCount} onPageChange={handlePageChange}/>
        </ContainerTable>
    );
}



