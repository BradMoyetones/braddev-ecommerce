"use client"
// context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '@/config/clienteAxios';

interface User {
  name: string;
  username: string;
  email: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    setUser: React.Dispatch<React.SetStateAction<User | null>>; // Exporta setUser
    logout: () => void; // Añade la función logout en el contexto
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchUser = async () => {
            const token = Cookies.get('token'); // Obtener el token de las cookies
            if (token) {
                try {
                    const response = await api.get('/api/users/me'); // Usar Axios para la solicitud
                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching user:', error);
                    setUser(null);
                }
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    const logout = () => {
        // Elimina el token y el refreshToken de las cookies
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        // Actualiza el estado de usuario a null
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
