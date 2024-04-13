import {FaDownload} from "react-icons/fa6";
import React from "react";

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