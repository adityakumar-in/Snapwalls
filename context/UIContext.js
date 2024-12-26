'use client';
import { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export function UIProvider({ children }) {
    const [isSuggestionsActive, setIsSuggestionsActive] = useState(false);

    return (
        <UIContext.Provider value={{ isSuggestionsActive, setIsSuggestionsActive }}>
            {children}
        </UIContext.Provider>
    );
}

export function useUI() {
    const context = useContext(UIContext);
    if (!context) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
}
