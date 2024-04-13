import React from "react";

export function TableContent({data, headers, rowClassName, cellClassName}) {
    const emptyRows = 5 - data.length;

    return (
        <tbody>
            {data.map((item, index) => (
                <tr key={index} className={`border-b last:border-b-0 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} ${rowClassName}`}>
                    {headers.map(header => (
                        <td key={`${header.key}-${index}`} className={`px-6 py-4 ${cellClassName}`}>
                            {item[header.key]}
                        </td>
                    ))}
                </tr>
            ))}
            {emptyRows > 0 && Array.from({length: emptyRows}).map((_, index) => (
                <tr key={`empty-${index}`} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                    <td colSpan={headers.length} className="h-14"></td>
                </tr>
            ))}
        </tbody>
    );
}
