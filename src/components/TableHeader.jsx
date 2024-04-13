import React from "react";

export function TableHeader({headers, headerClassName, cellClassName, onSort, sorting}) {
    return (
        <thead>
            <tr className={`text-left ${headerClassName || "bg-gray-800 text-white"}`}>
                {headers.map((header) => (
                    <th key={header.key}
                        className={`px-6 py-3 cursor-pointer ${cellClassName || "font-bold"}`}
                        onClick={() => onSort(header.key)}>
                        {header.label}
                        {sorting.key === header.key ? (sorting.direction === 'desc' ? ' 🔽' : ' 🔼') : null}
                    </th>
                ))}
            </tr>
        </thead>
    );
}
