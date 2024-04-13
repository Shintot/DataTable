import React from "react";

export function ContainerTable({className, children}) {
    return (
        <div className={`flex flex-col justify-between h-[450px] ${className}`}>
            {children}
        </div>
    );
}