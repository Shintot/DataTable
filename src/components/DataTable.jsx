import React from "react";

export function DataTable({ className, children }) {
    return (
        <div className={`overflow-x-auto ${className}`}>
            <table className="min-w-full overflow-y-auto">
                {children}
            </table>
        </div>
    );
}