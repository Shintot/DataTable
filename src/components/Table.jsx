import React, {useMemo, useState} from 'react';
import {flexRender} from '@tanstack/react-table';
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";

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


export function TableHeader({headers, headerClassName, cellClassName}) {
    return (
        <thead>
        <tr className={`text-left ${headerClassName || "bg-gray-800 text-white"}`}>
            {headers.map((header, index) => (
                <th key={index} className={`px-6 py-3 ${cellClassName || "font-bold"}`}>
                    {header}
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
            <tr key={index} className={`border-b last:border-b-0 ${rowClassName}`}>
                <td className={`px-6 py-4 ${cellClassName}`}>{item.firstName}</td>
                <td className={`px-6 py-4 ${cellClassName}`}>{item.lastName}</td>
                <td className={`px-6 py-4 ${cellClassName}`}>{item.email}</td>
                <td className={`px-6 py-4 ${cellClassName}`}>{item.infos}</td>
                <td className={`px-6 py-4 ${cellClassName}`}>{item.username}</td>
            </tr>
        ))}
        {emptyRows > 0 && Array.from({length: emptyRows}).map((_, index) => (
            <tr key={`empty-${index}`}>
                <td colSpan="5" className="h-14"></td>
            </tr>
        ))}
        </tbody>
    );
}


export function SearchInput({search, setSearch, className}) {
    return (
        <div className={`relative ${className}`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-900"/>
            </div>
            <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Recherche..."
                className="pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
        </div>
    );
}


export function TitleTable({title}) {
    return <h1 className="text-xl text-left text-gray-800 font-semibold">{title}</h1>;
}


export function FilteredPaginatedTable({data, headers}) {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 5;

    const filteredData = useMemo(() => {
        return data.filter(item =>
            item.firstName.toLowerCase().includes(search.toLowerCase()) ||
            item.lastName.toLowerCase().includes(search.toLowerCase()) ||
            item.email.toLowerCase().includes(search.toLowerCase()) ||
            item.infos.toLowerCase().includes(search.toLowerCase()) ||
            item.username.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, data]);

    const pageCount = Math.ceil(filteredData.length / pageSize);
    const currentData = filteredData.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

    function nextPage() {
        setCurrentPage((prev) => (prev + 1 < pageCount ? prev + 1 : prev));
    }

    function previousPage() {
        setCurrentPage((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
    }

    return (
        <>
            <div className="flex justify-between mb-4">
                <TitleTable title="Mon Tableau"/>
                <SearchInput search={search} setSearch={setSearch} />
            </div>
            <DataTable>
                <TableHeader headers={headers} headerClassName="bg-gray-800 text-white" cellClassName="font-bold"/>
                <TableContent data={currentData} rowClassName="" cellClassName="text-gray-900 dark:text-gray-900"/>
            </DataTable>
            <div className="flex justify-between items-center mt-4">
                <button onClick={previousPage} disabled={currentPage <= 0}
                        className="px-4 py-2 ml-5 rounded bg-gray-700 text-white hover:bg-gray-800 disabled:bg-gray-300">
                    Précédent
                </button>
                <span>Page {currentPage + 1} sur {pageCount}</span>
                <button onClick={nextPage} disabled={currentPage >= pageCount - 1}
                        className="px-4 py-2 mr-5 rounded bg-gray-700 text-white hover:bg-gray-800 disabled:bg-gray-300">
                    Suivant
                </button>
            </div>

        </>
    );
}
