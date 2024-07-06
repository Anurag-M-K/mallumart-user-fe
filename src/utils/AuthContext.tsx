// app/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
    user: any | null;
    login: (user: any) => void;
    logout: () => void;
    setUser: React.Dispatch<React.SetStateAction<any | null >>;
   
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any | null>(null);


   useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse stored user data:", error);
            }
        }
    }, []);

    const login = (user: any) => {
        setUser(user);
        localStorage.setItem("user",JSON.stringify(user))
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("accessToken")
        localStorage.removeItem("user")
        window.location.href = "/"
        // window.location.reload()
    };
    

    return (
        <AuthContext.Provider value={{ user, login, logout ,setUser}}>
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
