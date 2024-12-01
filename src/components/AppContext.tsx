import React, { createContext, useContext, useState, ReactNode } from 'react';  

// Define the shape of your context  
interface AppContextType {  
    backendUrl: string;  
    setBackendUrl: (url: string) => void;  
}  

// Create the context  
const AppContext = createContext<AppContextType | undefined>(undefined);  

// Create a provider component  
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {  
    const [backendUrl, setBackendUrl] = useState<string>('https://f4de-194-225-232-244.ngrok-free.app');

    return (  
        <AppContext.Provider value={{ backendUrl, setBackendUrl }}>  
            {children}  
        </AppContext.Provider>  
    );  
};  

// Create a custom hook to use the context  
export const useAppContext = (): AppContextType => {  
    const context = useContext(AppContext);  
    if (!context) {  
        throw new Error('useAppContext must be used within an AppProvider');  
    }  
    return context;  
};