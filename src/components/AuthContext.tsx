import React, { createContext, useContext, useState, ReactNode , useEffect } from 'react';
import { removeToken } from "../utils/jwt";

interface AuthContextType {
    isAllowed: boolean;
    allowAccess: () => void;
    isAuthenticated: boolean;  
    login: (user : User) => void;  
    logout: () => void;  
}

export interface User {  
    id: number;  
    username: string;  
    email: string;  
    roles: string[];
    permissions : string[];
}  

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAllowed, setIsAllowed] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);  

    const login = (user : User) => {  
        setIsAuthenticated(true);  
        localStorage.setItem('user', JSON.stringify(user));
    };  

    const logout = () => {  
        setIsAuthenticated(false); 
        localStorage.removeItem('user'); 
        removeToken() ;
    };  

    useEffect(() => {  
        const token = localStorage.getItem('token');  
        if (token) {  
            setIsAuthenticated(true);  
        }  
    }, []); 

    const allowAccess = () => setIsAllowed(true);

    return (
        <AuthContext.Provider value={{ isAllowed, allowAccess , isAuthenticated, login, logout }}>
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
