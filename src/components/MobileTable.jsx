import React from "react";

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