import { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from 'frontend/frontend/src/services/api.js';

const AuthContext = createContext(null)

export const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

         if (token && savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const register = async(userData) => {
        try {
            const response = await authAPI.register(userData);
            const {token, ...userInfo } = response.data

            localStorage.setItem('token', `Bearer ${token}`);
            localStorage.setItem('user', JSON.stringify(userInfo));
            setUser(userInfo);
            return { success: true };


        }catch (error) {
            return {success: false, message: error.response?.data?.message || 'Registration failed' };
        }
    };

    const login = async(credentials) => {
        try {
            const response = await authAPI.login(credentials);
            const {token, ...userInfo } = response.data;

            localStorage.setItem('token', `Bearer ${token}`);
            localStorage.setItem('user', JSON.stringify(userInfo));
            setUser(userInfo);

            return { success: true };
        } catch (error) {
              return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, login , register, logout, loading}}>
            {children}
        </AuthContext.Provider>
    ); 
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}