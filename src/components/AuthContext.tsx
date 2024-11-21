import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
    isAllowed: boolean;
    allowAccess: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAllowed, setIsAllowed] = useState<boolean>(false);

    const allowAccess = () => setIsAllowed(true);

    return (
        <AuthContext.Provider value={{ isAllowed, allowAccess }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
