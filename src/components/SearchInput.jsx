import React, {useState} from "react";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";

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