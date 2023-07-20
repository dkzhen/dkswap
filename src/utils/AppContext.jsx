import React, { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [chainId, setChainId] = useState(1);

    return (
        <AppContext.Provider value={{ chainId, setChainId }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
