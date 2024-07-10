'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

const LoadingContext = createContext({
    loading: false,
    setLoading: (loading: boolean) => { },
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};