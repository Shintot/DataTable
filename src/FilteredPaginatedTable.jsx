import React, {useEffect, useMemo, useState} from 'react';
import {ContainerTable} from "./components/ContainerTable";
import {DataTable} from "./components/DataTable";
import {TableHeader} from "./components/TableHeader";
import {TableContent} from "./components/TableContent";
import {MobileTable} from "./components/MobileTable";
import {SearchInput} from "./components/SearchInput";
import {DownloadTableButton} from "./components/DownloadTableButton";
import {TitleTable} from "./components/TitleTable";
import {PaginationControls} from "./components/PaginationControls";


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
                    <DownloadTableButton data={sortedData} headers={headers}/>
                </div>
            </div>
            {isMobile ? (
                <MobileTable data={currentData} headers={headers}/>
            ) : (
                <DataTable>
                    <TableHeader headers={headers} headerClassName="bg-gray-800 text-white" cellClassName="font-bold"
                                 onSort={handleSort} sorting={sorting}/>
                    <TableContent data={currentData} headers={headers} rowClassName="" cellClassName="text-gray-900"/>
                </DataTable>
            )}
            <PaginationControls currentPage={currentPage} pageCount={pageCount} onPageChange={handlePageChange}/>
        </ContainerTable>
    );
}



