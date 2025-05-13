// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');    // Configure axios defaults
    axios.defaults.withCredentials = true;

    const Auth = async () => {
        try {
            // Get token from localStorage
            const token = localStorage.getItem('token');

            if (!token) {
                setIsLoggedIn(false);
                setUserName('');
                return;
            }

            // Set the authorization header
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const res = await axios.get('http://localhost:3000/api/');
            if (res.status === 200 && res.data.userDetails) {
                setUserName(res.data.userDetails.name);
                setIsLoggedIn(true);
            } else {
                setUserName('');
                setIsLoggedIn(false);
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.error('Auth Error:', error);
            setIsLoggedIn(false);
            setUserName('');
            localStorage.removeItem('token');
        }
    };

    // Check auth status periodically and on focus
    useEffect(() => {
        Auth(); // Initial check

        // Check auth when window gains focus
        const handleFocus = () => {
            Auth();
        };
        window.addEventListener('focus', handleFocus);

        // Periodic check every 5 minutes
        const interval = setInterval(Auth, 5 * 60 * 1000);

        return () => {
            window.removeEventListener('focus', handleFocus);
            clearInterval(interval);
        };
    }, []);

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            userName,
            refreshAuth: Auth
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};



