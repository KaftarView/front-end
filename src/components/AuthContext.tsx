import React, { createContext, useContext, useState, ReactNode , useEffect } from 'react';
import { removeToken } from "../utils/jwt";

interface AuthContextType {
    isAllowed: boolean;
    allowAccess: () => void;
    isAuthenticated: boolean;  
    login: (user : User) => void;  
    logout: () => void;  
    getUserRoles : () => string[];
    getUserPermissions : () => string[];
    getUserUsername : () => string;
}

export interface User {  
    id: number;  
    userName: string;  
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

    const getUserRoles = (): string[] => {  
        const user = localStorage.getItem('user');  
        if (user) {  
            const parsedUser: User = JSON.parse(user);  
            return parsedUser.roles;
        }  
        return [];  
      }; 

      const getUserUsername = (): string => {
        const user = localStorage.getItem('user'); 
        console.log(user) 
        if (user) {  
            const parsedUser: User = JSON.parse(user);  
            return parsedUser.userName;
        }  
        return "";
      }
      const getUserPermissions = (): string[] => {  
        const user = localStorage.getItem('user');  
        if (user) {  
            const parsedUser: User = JSON.parse(user);  
            return parsedUser.permissions;
        }  
        return [];  
      }; 

    useEffect(() => {  
        const token = localStorage.getItem('token');  
        if (token) {  
            setIsAuthenticated(true);  
        }  
    }, []); 

    const allowAccess = () => setIsAllowed(true);

    return (
        <AuthContext.Provider value={{ isAllowed, allowAccess , isAuthenticated, login, logout ,getUserRoles , getUserPermissions , getUserUsername}}>
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